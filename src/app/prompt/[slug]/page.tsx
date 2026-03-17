import { PromptDetailWidget } from "@/widgets/prompt-detail";

export const metadata = {
  title: "프롬프트 상세 — 프롬마켓",
};

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PromptDetailWidget slug={slug} />;
}
