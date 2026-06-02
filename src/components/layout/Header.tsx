import Link from "next/link";
import { Bell, Search, Settings, SlidersHorizontal } from "lucide-react";
import AuthMenu from "@/components/layout/AuthMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-360 mx-auto px-6 lg:px-16 py-5 flex flex-col md:flex-row lg:items-center gap-4 lg:gap-16">
        <div className="flex items-center justify-between lg:justify-start lg:w-50">
          <Link href="/" className="text-primary text-[28px] lg:text-[32px] font-bold leading-none">
            MORENT
          </Link>
          <div className="md:hidden">
            <AuthMenu />
          </div>
        </div>

        <div className="flex-1 max-w-123">
          <label className="flex items-center h-11 w-full rounded-pill border border-border px-5 gap-3">
            <span className="text-secondary-300">
              <Search size={20} strokeWidth={2} />
            </span>
            <input
              type="search"
              placeholder="Bir şey arayın"
              className="flex-1 bg-transparent text-sm text-secondary-500 placeholder:text-secondary-300 outline-none"
            />
            <button type="button" className="text-secondary-300" aria-label="Filters">
              <SlidersHorizontal size={20} strokeWidth={2} />
            </button>
          </label>
        </div>

        <div className="hidden md:flex md:flex-1  md:justify-end items-center gap-5">
          <button
            type="button"
            className="size-11 rounded-pill border border-border flex items-center justify-center text-secondary-300 relative"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-discount" />
          </button>
          <button
            type="button"
            className="size-11 rounded-pill border border-border flex items-center justify-center text-secondary-300"
            aria-label="Settings"
          >
            <Settings size={20} strokeWidth={2} />
          </button>
          <AuthMenu />
        </div>
      </div>
    </header>
  );
}