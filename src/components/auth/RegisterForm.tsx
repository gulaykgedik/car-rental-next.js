"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const initial: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [topError, setTopError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTopError(null);
    setErrors({});
    setPending(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: { message?: string; details?: Record<string, string> } }
          | null;
        if (body?.error?.details) {
          setErrors(body.error.details as Partial<Record<keyof FormValues, string>>);
        }
        setTopError(body?.error?.message ?? "Kayıt sırasında bir hata oluştu.");
        setPending(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      setPending(false);

      if (!signInResult || signInResult.error) {
        setTopError("Hesap oluşturuldu ancak giriş yapılamadı. Lütfen giriş sayfasından deneyin.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setPending(false);
      setTopError("Beklenmeyen bir hata oluştu.");
    }
  }

  function onGoogle() {
    setGooglePending(true);
    void signIn("google", { callbackUrl: "/" });
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onGoogle}
        disabled={googlePending}
        className="h-11 rounded-pill border border-border text-secondary-500 text-sm font-semibold inline-flex items-center justify-center gap-3 hover:bg-secondary-300/10 disabled:opacity-60"
      >
        <GoogleIcon />
        {googlePending ? "Yönlendiriliyor..." : "Google ile kayıt ol"}
      </button>

      <div className="flex items-center gap-3 text-secondary-300 text-xs">
        <span className="h-px flex-1 bg-border" />
        veya
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Ad"
            type="text"
            value={values.firstName}
            onChange={(v) => update("firstName", v)}
            error={errors.firstName}
            autoComplete="given-name"
            required
          />
          <Field
            label="Soyad"
            type="text"
            value={values.lastName}
            onChange={(v) => update("lastName", v)}
            error={errors.lastName}
            autoComplete="family-name"
            required
          />
        </div>

        <Field
          label="E-posta"
          type="email"
          value={values.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          autoComplete="email"
          placeholder="ornek@email.com"
          required
        />
        <Field
          label="Telefon"
          type="tel"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+90 555 555 55 55"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Şifre"
            type="password"
            value={values.password}
            onChange={(v) => update("password", v)}
            error={errors.password}
            autoComplete="new-password"
            required
          />
          <Field
            label="Şifre (Tekrar)"
            type="password"
            value={values.confirmPassword}
            onChange={(v) => update("confirmPassword", v)}
            error={errors.confirmPassword}
            autoComplete="new-password"
            required
          />
        </div>

        {topError && (
          <p className="text-sm text-discount" role="alert">
            {topError}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-pill bg-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  type: "text" | "email" | "password" | "tel";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  required,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-secondary-500 text-sm font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        className={`h-11 px-4 rounded-pill border bg-card text-sm text-secondary-500 placeholder:text-secondary-300 outline-none focus:border-primary ${
          error ? "border-discount" : "border-border"
        }`}
      />
      {error && <span className="text-xs text-discount">{error}</span>}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3 14.7 2 12 2 6.9 2 2.7 6.1 2.7 12s4.2 10 9.3 10c5.4 0 8.9-3.8 8.9-9.1 0-.6-.1-1.1-.2-1.7H12z" />
    </svg>
  );
}