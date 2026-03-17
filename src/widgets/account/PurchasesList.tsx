import Link from "next/link";
import { Download } from "lucide-react";
import { MOCK_PROMPTS, MOCK_PURCHASED_IDS } from "@/shared/lib/mocks";
import { Button } from "@/shared/ui/button";

export function PurchasesList() {
  const purchased = MOCK_PROMPTS.filter((p) =>
    (MOCK_PURCHASED_IDS as readonly string[]).includes(p.id)
  );

  if (purchased.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        구매한 프롬프트가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {purchased.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-4 rounded-lg border border-border p-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted text-xl">
            {p.type === "IMAGE" ? "🖼️" : p.type === "VIDEO" ? "🎬" : "📝"}
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/prompt/${p.slug}`}
              className="text-sm font-medium hover:text-primary"
            >
              {p.title}
            </Link>
            <div className="text-xs text-muted-foreground">
              @{p.sellerUsername} · {p.isFree ? "무료" : `$${p.price.toFixed(2)}`}
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link href={`/prompt/${p.slug}`}>
              <Button size="sm" variant="outline" className="gap-1">
                <Download className="h-3 w-3" />
                프롬프트 보기
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
