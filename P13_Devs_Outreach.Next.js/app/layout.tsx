import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Store from "./Store";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Script from "next/script";


// import { createContext } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "devs_outreach – Social Platform for Developers",
    template: "%s | devs_outreach",
  },

  description:
    "devs_outreach is a developer-focused social media platform to connect, share projects, discuss ideas, and grow together.",

  keywords: [
    "developers",
    "social media for developers",
    "dev community",
    "programming",
    "software engineering",
    "tech community",
    "developer networking",
  ],

  authors: [{ name: "devs_outreach Team" }],

  creator: "devs_outreach",

  openGraph: {
    title: "devs_outreach – Built for Developers",
    description:
      "Connect with developers, showcase your work, and participate in meaningful tech discussions.",
    url: "https://devsoutreach.com",
    siteName: "devs_outreach",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "devs_outreach – Developer Social Platform",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "devs_outreach – Social Platform for Developers",
    description:
      "A social media platform designed exclusively for developers.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}





export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">

      <head>

        <Script
          id="gtm-script"
          strategy="afterInteractive"
        >
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-W8PLFNWR');
  `}
        </Script>


      </head>




      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8PLFNWR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>


        <ToastContainer />

        <ThemeProvider>


          <Store>
            {children}
          </Store>
          <Footer />
        </ThemeProvider>


      </body>
    </html>
  );
}
