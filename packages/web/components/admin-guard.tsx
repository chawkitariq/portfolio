"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { useEffect, useState } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (!isAuthenticated) {
    return redirect("/sign-in");
  }

  return children;
}
