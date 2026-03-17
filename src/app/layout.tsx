import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { LayoutShell } from "@/widgets/layout";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "프롬마켓 - AI 프롬프트 마켓플레이스",
    template: "%s — 프롬마켓",
  },
  description:
    "검증된 AI 프롬프트를 구매하고 판매하세요. Midjourney, ChatGPT, DALL-E, Claude 등 30+ AI 모델 지원.",
  keywords: [
    "AI 프롬프트",
    "프롬프트 마켓",
    "Midjourney 프롬프트",
    "ChatGPT 프롬프트",
    "DALL-E 프롬프트",
    "AI 이미지 생성",
    "프롬프트 엔지니어링",
    "prompt marketplace",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "프롬마켓",
    title: "프롬마켓 - AI 프롬프트 마켓플레이스",
    description:
      "검증된 AI 프롬프트를 구매하고 판매하세요. Midjourney, ChatGPT, DALL-E, Claude 등 30+ AI 모델 지원.",
  },
  twitter: {
    card: "summary_large_image",
    title: "프롬마켓 - AI 프롬프트 마켓플레이스",
    description:
      "검증된 AI 프롬프트를 구매하고 판매하세요. 30+ AI 모델 지원.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
