import PortfolioHeader from "@/components/portfolio/header";
import PortfolioFooter from "@/components/portfolio/footer";
import { Toaster } from "sonner";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PortfolioHeader />
      <main className="flex-1">{children}</main>
      <Toaster />
      <PortfolioFooter />
    </div>
  );
}
