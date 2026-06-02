"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Receipt, User as UserIcon } from "lucide-react";

function getInitial(name?: string | null, email?: string | null): string {
  const source = (name ?? email ?? "?").trim();
  return source.charAt(0).toUpperCase() || "?";
}

export default function AuthMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (status === "loading") {
    return <div className="size-11 rounded-full border border-border bg-secondary-300/20 animate-pulse" aria-hidden />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="h-11 px-5 rounded-pill border border-border text-secondary-500 text-sm font-semibold inline-flex items-center hover:bg-secondary-300/10"
        >
          Giriş Yap
        </Link>
        <Link
          href="/register"
          className="h-11 px-5 rounded-pill bg-primary text-white text-sm font-semibold inline-flex items-center hover:opacity-90"
        >
          Kayıt Ol
        </Link>
      </div>
    );
  }

  const { user } = session;
  const displayName = user.name ?? user.email ?? "Kullanıcı";
  const initial = getInitial(displayName, user.email);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="size-11 rounded-full overflow-hidden border border-border bg-primary/10 text-primary text-base font-bold flex items-center justify-center"
        aria-label="Hesap"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={displayName || "Profil"}
            width={44}
            height={44}
            className="size-11 object-cover"
          />
        ) : (
          <span aria-hidden>{initial}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-card bg-card border border-border shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-secondary-500 text-sm font-semibold truncate">{displayName || "Kullanıcı"}</p>
            <p className="text-secondary-300 text-xs truncate">{user.email}</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm text-secondary-500 hover:bg-secondary-300/10"
            onClick={() => setOpen(false)}
          >
            <UserIcon size={16} strokeWidth={2} />
            Profilim
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-3 px-4 py-3 text-sm text-secondary-500 hover:bg-secondary-300/10 border-t border-border"
            onClick={() => setOpen(false)}
          >
            <Receipt size={16} strokeWidth={2} />
            Siparişlerim
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-secondary-500 hover:bg-secondary-300/10 border-t border-border"
          >
            <LogOut size={16} strokeWidth={2} />
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}