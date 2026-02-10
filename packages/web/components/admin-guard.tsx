"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/sign-in");
    }
  }, [accessToken, router]);

  return children;
}
