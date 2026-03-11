import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez-moi pour discuter de votre projet. Disponible pour des missions freelance en développement full-stack, cloud engineering et DevOps.",
  openGraph: {
    title: "Contact | Chawki Tariq",
    description:
      "Disponible pour des missions freelance — discutons de votre projet.",
    url: "/home/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
