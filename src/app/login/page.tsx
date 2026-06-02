import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const params = await searchParams;

  if (session?.user) redirect(params.callbackUrl ?? "/");

  return (
    <div className="max-w-360 mx-auto px-6 lg:px-16 py-12">
      <div className="max-w-md mx-auto bg-card rounded-card p-8 lg:p-10">
        <h1 className="text-secondary-500 text-2xl font-bold mb-2">
          Tekrar hoş geldiniz
        </h1>
        <p className="text-secondary-300 text-sm mb-6">
          Hesabınıza giriş yaparak araç kiralamaya devam edin.
        </p>

        <LoginForm
          callbackUrl={params.callbackUrl ?? "/"}
          initialError={params.error}
        />

        <p className="mt-6 text-center text-sm text-secondary-400">
          Hesabınız yok mu?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}