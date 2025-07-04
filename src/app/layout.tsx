import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers/providers";
import { Suspense } from "react";
import Loading from "./loading";
import type { ThemeProviderProps } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: enable after goes to production
// export const metadata: Metadata = {
//   title: "DineHub - Restaurant & Venue Booking Platform",
//   description: "Your ultimate platform for dining experiences, restaurant bookings, and venue reservations.",
//   keywords: "restaurant, booking, reservation, venue, food delivery, dining",
// };

// Constants for theme settings to prevent unnecessary re-renders
const THEME_SETTINGS: Pick<ThemeProviderProps, 'attribute' | 'defaultTheme' | 'enableSystem' | 'storageKey'> = {
  attribute: "class",
  defaultTheme: "dark",
  enableSystem: false,
  storageKey: "s-theme"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50`}
      >
        {/* {process.env.NODE_ENV === "development" && (
          <script
            defer
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )} */}
        <Providers>
          <ThemeProvider
            {...THEME_SETTINGS}
          >
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
