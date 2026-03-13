import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TasteTrove - AI Recipes Platform",
  description: "TasteTrove is an AI-powered recipe platform that helps you discover new recipes and create your own",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme: neobrutalism}}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        {/* Footer */}
        <footer className="py-8 px-4 border-t">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/orange-logo.png" alt="TasteTrove Logo" width={48} height={48} className="w-14" />
            </div>
            <p className="text-stone-500 text-sm">Made with 💗 by Manish Kumar</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
