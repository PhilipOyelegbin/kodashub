import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from "./utils/AuthProvider";
import { getServerSession } from "next-auth";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata = {
  metadataBase: new URL(process.env.HOST_URI),
  title: "KodasHub",
  description:
    "In an era marked by technological advancements, it is time for Nigeria to embrace a transformative solution that has the potential to reshape democratic processes - remote voting",
  favicon: "/favicon.png",
  type: "website",
  openGraph: {
    title: "KodasHub",
    description:
      "In an era marked by technological advancements, it is time for Nigeria to embrace a transformative solution that has the potential to reshape democratic processes - remote voting",
    url: process.env.HOST_URI,
    type: "website",
    locale: "en_US",
    images: "/opengraph-image.png",
    site_name: "Eagle Ballot",
  },
  twitter: {
    handle: "@KodasHub",
    site: "@KodasHub",
    images: "/opengraph-image.png",
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
    icon: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={poppins.className}>
        <AuthProvider session={session}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
