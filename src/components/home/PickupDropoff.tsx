import { ArrowUpDown, ChevronDown } from "lucide-react";

type Field = { label: string; placeholder: string };

const fields: Field[] = [
  { label: "Konumlar", placeholder: "Şehrinizi seçin" },
  { label: "Tarih", placeholder: "Tarihini seçin" },
  { label: "Saat", placeholder: "Saati seçin" },
];

function Panel({ kind }: { kind: "Teslim Al - Çıkış" | "Geri Teslim - Dönüş" }) {
  const dotColor = kind === "Teslim Al - Çıkış" ? "bg-primary" : "bg-primary-hover";
  return (
    <div className="bg-card rounded-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className={`size-4 rounded-full ${dotColor} ring-4 ring-primary/20`} />
        <span className="text-secondary-500 text-base font-semibold">{kind}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:divide-x divide-border">
        {fields.map((f) => (
          <button
            type="button"
            key={f.label}
            className="text-left md:px-5 first:md:pl-0 last:md:pr-0 flex flex-col gap-2"
          >
            <span className="text-secondary-500 text-base font-bold">{f.label}</span>
            <span className="flex items-center justify-between text-secondary-300 text-xs font-medium">
              {f.placeholder}
              <ChevronDown size={12} strokeWidth={2.5} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PickupDropoff() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-6">
      <Panel kind="Teslim Al - Çıkış" />
      <button
        type="button"
        className="size-14 self-center justify-self-center bg-primary text-white rounded-card flex items-center justify-center shadow-[0_25px_60px_rgba(53,99,233,0.3)] rotate-90 lg:rotate-0"
        aria-label="Teslim alma ve geri dönüş değiştir"
      >
        <ArrowUpDown size={22} strokeWidth={2.5} />
      </button>
      <Panel kind="Geri Teslim - Dönüş" />
    </section>
  );
}