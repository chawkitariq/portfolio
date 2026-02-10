import { useAuthStore } from "@/stores/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = useAuthStore.getState().accessToken;

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
