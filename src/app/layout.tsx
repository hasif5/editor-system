import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hasif's Test Project — PDF Editor",
  description: "Create and export beautiful, editable single-page PDFs with questions and MCQs",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-blue-50`}>        
        <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-7 h-7 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600"></span>
              <span className="font-semibold text-slate-800">Hasif&apos;s Test Project</span>
            </div>
            <nav className="text-sm text-slate-500">
              <span className="hidden sm:inline">PDF Editor</span>
            </nav>
          </div>
        </header>
        <main className="py-6">{children}</main>
      </body>
    </html>
  );
}
