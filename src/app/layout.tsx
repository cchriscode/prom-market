import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { LayoutShell } from "@/widgets/layout";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "프롬마켓 - AI 프롬프트 마켓플레이스",
  description:
    "검증된 AI 프롬프트를 구매하고 판매하세요. Midjourney, ChatGPT, DALL-E, Claude 등 30+ AI 모델 지원.",
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
      </body>
    </html>
  );
}
