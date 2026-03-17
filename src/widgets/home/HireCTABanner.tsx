import Link from "next/link";
import { Button } from "@/shared/ui/button";

export function HireCTABanner() {
  return (
    <section className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-12 text-center text-white">
      <h2 className="text-2xl font-bold">
        전문 프롬프트 엔지니어에게 맡기세요
      </h2>
      <p className="mt-2 text-white/80">
        맞춤형 프롬프트를 전문가에게 의뢰하세요
      </p>
      <Button
        asChild
        size="lg"
        className="mt-6 bg-white text-foreground hover:bg-white/90"
      >
        <Link href="/hire">크리에이터 찾기</Link>
      </Button>
    </section>
  );
}
