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

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL
  ? new URL(process.env.NEXT_PUBLIC_APP_URL)
  : new URL("https://portfolio.chawkitariq.fr");

export const metadata: Metadata = {
  metadataBase: BASE_URL,
  title: {
    default: "Chawki Tariq — Full-Stack Cloud Engineer",
    template: "%s | Chawki Tariq",
  },
  description:
    "Développeur Full-Stack & Cloud Engineer freelance — React, Next.js, NestJS, AWS, Terraform, Docker. Je conçois et déploie des applications web modernes et des infrastructures cloud scalables.",
  authors: [{ name: "Chawki Tariq" }],
  keywords: [
    "Full-Stack",
    "Cloud Engineer",
    "freelance",
    "React",
    "Next.js",
    "NestJS",
    "AWS",
    "Terraform",
    "Docker",
    "Kubernetes",
    "TypeScript",
    "DevOps",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Chawki Tariq",
    title: "Chawki Tariq — Full-Stack Cloud Engineer",
    description:
      "Développeur Full-Stack & Cloud Engineer freelance — React, Next.js, NestJS, AWS, Terraform, Docker.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Chawki Tariq — Full-Stack Cloud Engineer",
    description:
      "Développeur Full-Stack & Cloud Engineer freelance — React, Next.js, NestJS, AWS, Terraform, Docker.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
