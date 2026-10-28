import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const isComingSoonActive =
    process.env.NEXT_PUBLIC_COMING_SOON === 'true' ||
    process.env.COMING_SOON === 'true';

  // Preview bypass secret (default: llemwell2026 or from env)
  const previewSecret = process.env.PREVIEW_SECRET || 'llemwell2026';
  const previewQuery = searchParams.get('preview');
  const previewCookie = request.cookies.get('llemwell_preview')?.value;

  const hasPreviewBypass =
    previewCookie === 'allowed' || previewQuery === previewSecret;

  // Handle coming-soon mode
  if (isComingSoonActive && !hasPreviewBypass) {
    // If not already on /coming-soon, rewrite internally to /coming-soon
    if (pathname !== '/coming-soon') {
      const url = request.nextUrl.clone();
      url.pathname = '/coming-soon';
      const response = NextResponse.rewrite(url);

      // If user provided valid preview query, grant cookie for subsequent visits
      if (previewQuery === previewSecret) {
        response.cookies.set('llemwell_preview', 'allowed', {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }); 
      }
      return response;
    }
  }

  // If user provided valid preview query while browsing normally, set cookie
  const response = await updateSession(request);
  if (previewQuery === previewSecret) {
    response.cookies.set('llemwell_preview', 'allowed', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, product-images, assets
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|images|product-images|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|otf|ttf|woff|woff2)$).*)',
  ],
};
