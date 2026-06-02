import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { badRequest, serverError } from "@/lib/api/errors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

type RegisterBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  password?: unknown;
  confirmPassword?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as RegisterBody;

    const firstName = asString(body.firstName);
    const lastName = asString(body.lastName);
    const email = asString(body.email).toLowerCase();
    const phone = asString(body.phone);
    const password = typeof body.password === "string" ? body.password : "";
    const confirmPassword =
      typeof body.confirmPassword === "string" ? body.confirmPassword : "";

    const errors: Record<string, string> = {};
    if (firstName.length < 2) errors.firstName = "Ad en az 2 karakter olmalı.";
    if (lastName.length < 2) errors.lastName = "Soyad en az 2 karakter olmalı.";
    if (!EMAIL_RE.test(email)) errors.email = "Geçerli bir e-posta giriniz.";
    if (phone && !PHONE_RE.test(phone)) errors.phone = "Geçerli bir telefon giriniz.";
    if (password.length < 8) errors.password = "Şifre en az 8 karakter olmalı.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Şifreler eşleşmiyor.";

    if (Object.keys(errors).length > 0) {
      return badRequest("Doğrulama hatası", errors);
    }

    await connectDB();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return badRequest("Bu e-posta zaten kayıtlı.", { email: "Bu e-posta zaten kayıtlı." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const created = await User.create({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      password: hashed,
      provider: "credentials",
    });

    return Response.json(
      {
        data: {
          _id: String(created._id),
          firstName: created.firstName,
          lastName: created.lastName,
          email: created.email,
          phone: created.phone ?? null,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/auth/register]", err);
    return serverError("Kayıt sırasında bir hata oluştu.");
  }
}