import Link from "next/link";
import { Button } from "@/shared/ui/button";

export function SellerCTABanner() {
  return (
    <section className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12 text-center text-white">
      <h2 className="text-2xl font-bold">프롬프트를 판매하세요</h2>
      <p className="mt-2 text-white/80">2분이면 시작</p>
      <Button
        asChild
        size="lg"
        className="mt-6 bg-white text-foreground hover:bg-white/90"
      >
        <Link href="/sell">판매 시작하기</Link>
      </Button>
    </section>
  );
}
