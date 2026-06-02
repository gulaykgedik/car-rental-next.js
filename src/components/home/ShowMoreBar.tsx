import Link from "next/link";

type ShowMoreBarProps = {
  total: number;
};

export default function ShowMoreBar({ total }: ShowMoreBarProps) {
  return (
    <div className="relative flex items-center justify-center py-4">
      <button className="bg-primary hover:opacity-90 text-white text-sm font-semibold px-5 h-11 rounded">
        <Link href="/cars">Daha Fazla Araç Göster</Link>
      </button>
      <span className="absolute right-0 text-secondary-300 text-sm font-semibold">{total} Araç</span>
    </div>
  );
}