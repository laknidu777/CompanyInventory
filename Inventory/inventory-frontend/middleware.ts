import { NextResponse } from "next/server";

export function middleware(request: Request) {
  // No redirection for now
  return NextResponse.next();
}
