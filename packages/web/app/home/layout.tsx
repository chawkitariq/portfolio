import PortfolioHeader from "@/components/portfolio/header";
import PortfolioFooter from "@/components/portfolio/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PortfolioHeader />
      <main className="flex-1">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}
