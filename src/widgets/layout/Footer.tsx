import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "마켓플레이스",
    links: [
      { label: "프롬프트 찾기", href: "/marketplace" },
      { label: "카테고리", href: "/marketplace" },
      { label: "트렌딩", href: "/marketplace?sort=trending" },
    ],
  },
  {
    title: "크리에이터",
    links: [
      { label: "프롬프트 판매", href: "/sell" },
      { label: "Hire", href: "/hire" },
      { label: "판매자 랭킹", href: "/leaderboard" },
    ],
  },
  {
    title: "서비스",
    links: [
      { label: "이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "문의하기", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-primary">프롬마켓</p>
            <p className="mt-2 text-[13px] text-muted-foreground">
              AI 프롬프트 마켓플레이스
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold">{section.title}</p>
              <ul className="mt-2 space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} 프롬마켓. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
