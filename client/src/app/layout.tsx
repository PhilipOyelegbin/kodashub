import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_HOST_URI || "http://localhost:3000",
  ),
  title: "KodasHub - Instant Help for Server, Hosting & DNS Errors",
  description:
    "KodasHub offers web and infrastructure support, domain registration, cloud services, and DevOps solutions",
  type: "website",
  author: "KodasHub",
  openGraph: {
    title: "KodasHub - Instant Help for Server, Hosting & DNS Errors",
    description:
      "KodasHub offers web and infrastructure support, domain registration, cloud services, and DevOps solutions",
    url: process.env.NEXT_PUBLIC_HOST_URI,
    type: "website",
    locale: "en_US",
    images: "../../public/opengraph-image.png",
    siteName: "KodasHub",
  },
  twitter: {
    handle: "@KodasHub",
    site: "@KodasHub",
    images: "../../public/opengraph-image.png",
    cardType: "summary_large_image",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "../../public/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "../../public/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "../../public/apple-touch-icon.png",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-(--font-plus-jakarta-sans)">
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
