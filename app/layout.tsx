import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nltools.net"),
  title: {
    default: "온라인 계산기 모음 - 무료 계산 도구",
    template: "%s | 온라인 계산기",
  },
  description:
    "대출이자, BMI, 단위변환 등 다양한 무료 온라인 계산기를 제공합니다.",
  keywords: "온라인계산기, 무료계산기, 대출계산기, 단위변환, 계산도구",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5468583242806327"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${notoSansKR.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
