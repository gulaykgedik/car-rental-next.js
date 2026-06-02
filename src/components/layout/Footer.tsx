import Link from "next/link";

const sections = [
  {
    title: "Hakkında",
    links: ["Nasıl Çalışır", "Öne Çıkanlar", "Ortaklık", "İş İlişkileri"],
  },
  {
    title: "Topluluk",
    links: ["Etkinlikler", "Blog", "Podcast", "Arkadaş Davet Et"],
  },
  {
    title: "Sosyal Ağlar",
    links: ["Discord", "Instagram", "Twitter", "Facebook"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-card mt-16 px-6 lg:px-16 pt-16 pb-8">
      <div className="max-w-360 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-16">
          <div className="max-w-sm">
            <Link href="/" className="text-primary text-[32px] font-bold leading-none">
              MORENT
            </Link>
            <p className="mt-6 text-secondary-400 text-sm font-medium leading-6">
              Vizyon, kolaylık sağlamak ve satış işletmenizi artırmaya yardımcı olmak.
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-secondary-500 text-base font-semibold mb-7">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-5">
                {section.links.map((label) => (
                  <li key={label}>
                    <Link href="#" className="text-secondary-400 text-sm font-medium hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-secondary-500 text-sm font-semibold">
          <p>©2022 MORENT. Tüm hakları saklıdır</p>
          <div className="flex gap-9">
            <Link href="#" className="hover:text-primary">Gizlilik &amp; İlke</Link>
            <Link href="#" className="hover:text-primary">Şartlar &amp; Koşullar</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}