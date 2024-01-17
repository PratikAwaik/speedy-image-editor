import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import Navbar from "@/components/navbar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Speedy Image Editor",
  description: "Edit images blazingly fast",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "w-screen h-screen overflow-hidden sm:p-4 p-2"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="w-full h-full flex items-center justify-start">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
