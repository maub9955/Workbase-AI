import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workbase-AI",
  description: "팀을 위한 올인원 문서 · 캘린더 · 파일 허브"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased text-slate-900 bg-slate-50">{children}</body>
    </html>
  );
}
