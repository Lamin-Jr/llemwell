import { createClient } from '@/src/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    // Sync the user with our backend database on their first verification
    if (!error && data.session) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/users/sync`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${data.session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: data.user.email })
        })
      } catch (err) {
        console.error('Failed to sync user with backend after email confirm', err)
      }
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/`)
}
