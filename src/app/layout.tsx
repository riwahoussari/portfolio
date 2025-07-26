import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { HoverProvider } from "./hooks/HoverContext";
import { LenisScrollWrapper } from "./components/Global/LenisScrollWrapper";

export const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/NeueMontreal/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/NeueMontreal/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NeueMontreal/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NeueMontreal/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans/GeneralSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riwa Houssari - A High-End Web Designer & Developer",
  description: "Portfolio of web designer & developper Riwa Houssari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${generalSans.variable} ${neueMontreal.className} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <HoverProvider>
            <LenisScrollWrapper>{children}</LenisScrollWrapper>
          </HoverProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
