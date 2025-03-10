import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

import { Inter, JetBrains_Mono, Outfit } from "next/font/google";

import Toaster from "@/components/atoms/toaster";
import ThemeProvider from "@/components/theme-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ahmad Zain Azharul Falah - Frontend Engineer",
  description: "Portfolio website of Ahmad Zain Azharul Falah, a Frontend Engineer with expertise in React.js, Next.js, React Native, and TypeScript",
  generator: "Next.js",
  authors: [{ name: "Ahmad Zain Azharul Falah" }],
  creator: "Ahmad Zain Azharul Falah",
  keywords: ["frontend engineer", "react", "next.js", "typescript", "portfolio", "cyberpunk"],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
