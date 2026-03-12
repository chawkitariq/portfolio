"use client";

import { AdminGuard } from "@/components/admin-guard";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
    mutations: {
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <QueryClientProvider client={queryClient}>
            <SiteHeader />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </div>
          </QueryClientProvider>
        </SidebarProvider>
        <Toaster />
      </div>
    </AdminGuard>
  );
}
