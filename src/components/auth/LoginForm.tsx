"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type LoginFormProps = {
  callbackUrl: string;
  initialError?: string;
};

export default function LoginForm({ callbackUrl, initialError }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    initialError ? "Giriş başarısız oldu, bilgilerinizi kontrol edin." : null,
  );
  const [pending, setPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setPending(false);

    if (!result || result.error) {
      setError("E-posta veya şifre hatalı.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  function onGoogle() {
    setGooglePending(true);
    void signIn("google", { callbackUrl });
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
        {googlePending ? "Yönlendiriliyor..." : "Google ile devam et"}
      </button>

      <div className="flex items-center gap-3 text-secondary-300 text-xs">
        <span className="h-px flex-1 bg-border" />
        veya
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Field
          label="E-posta"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="ornek@email.com"
          autoComplete="email"
          required
        />
        <Field
          label="Şifre"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="text-sm text-discount" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-pill bg-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
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
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({ label, type, value, onChange, placeholder, autoComplete, required }: FieldProps) {
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
        className="h-11 px-4 rounded-pill border border-border bg-card text-sm text-secondary-500 placeholder:text-secondary-300 outline-none focus:border-primary"
      />
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