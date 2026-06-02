import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import RegisterForm from "@/components/auth/RegisterForm";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="max-w-360 mx-auto px-6 lg:px-16 py-12">
      <div className="max-w-lg mx-auto bg-card rounded-card p-8 lg:p-10">
        <h1 className="text-secondary-500 text-2xl font-bold mb-2">
          Hesap oluşturun
        </h1>
        <p className="text-secondary-300 text-sm mb-6">
          Birkaç dakika içinde kayıt olun ve araç kiralamaya başlayın.
        </p>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-secondary-400">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}