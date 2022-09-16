import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return null;
  // return NextResponse.redirect(new URL('/about-2', request.url))
}

export const config = {
  matcher: ['/team-cart'],
};
