import Image from "next/image";

type Banner = {
  title: string;
  body: string;
  bg: string;
  carImg: string;
  btn: string;
};

const banners: Banner[] = [
  {
    title: "Araç Kiralama için En İyi Platform",
    body: "Güvenli ve güvenilir bir şekilde araç kiralama kolaylığı. Elbette düşük bir fiyatla.",
    bg: "bg-primary-hover",
    carImg: "/hero-1.png",
    btn: "bg-primary",
  },
  {
    title: "Düşük fiyatla araç kiralama kolay yol",
    body: "Ucuz araç kiralama hizmetleri ve güvenli ve rahat tesisler sağlama.",
    bg: "bg-primary",
    carImg: "/hero-2.png",
    btn: "bg-blue-400",
  },
];

function WaveBg() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
      viewBox="0 0 406 232"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <path d="M-50 232C-50 124 50 36 156 36S362 124 362 232" stroke="white" strokeWidth="2" />
      <path d="M-50 232C-50 84 60 -10 184 -10s234 94 234 242" stroke="white" strokeWidth="2" />
      <path d="M-50 232C-50 160 30 96 116 96s166 64 166 136" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export default function HeroBanners() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {banners.map((b, key) => (
        <article
          key={b.title}
          className={`relative overflow-hidden rounded-card ${b.bg} text-white p-6 lg:p-10 min-h-70 flex flex-col ${key === 1 ? "max-md:hidden" : ""} `}
        >
          <WaveBg />
          <div className="relative z-10 max-w-71 flex flex-col gap-4">
            <h2 className="text-[24px] lg:text-[32px] font-semibold leading-tight">{b.title}</h2>
            <p className="text-sm lg:text-base font-medium opacity-90 leading-6">{b.body}</p>
            <button
              type="button"
              className={`self-start mt-2 ${b.btn} hover:opacity-90 text-white text-sm font-semibold px-5 h-11 rounded`}
            >
              Araç Kirala
            </button>
          </div>
          <div className="relative z-10 mt-auto self-end pointer-events-none">
            <Image
              src={b.carImg}
              alt=""
              width={300}
              height={108}
              className="object-contain w-55 lg:w-75"
              style={{ height: "auto" }}
              unoptimized
            />
          </div>
        </article>
      ))}
    </section>
  );
}