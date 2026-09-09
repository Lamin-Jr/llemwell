import { createClient } from '@/src/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { headers } from 'next/headers'

export default async function SignupPage(props: {
  searchParams: Promise<{ message: string }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = (await headers()).get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Signup error:', error.message)
      return redirect(`/signup?message=${encodeURIComponent(error.message)}`)
    }

    // If Email Confirmations are turned OFF in Supabase, signUp returns a session immediately.
    // We need to sync them to the backend and redirect to home.
    if (data.session) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/users/sync`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${data.session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: data.user?.email })
        })
      } catch (err) {
        console.error('Failed to sync user with backend on signup', err)
      }
      
      return redirect('/')
    }

    return redirect('/signup?message=Check your email to continue sign in process')
  }

  return (
    <div className="flex min-h-screen w-full bg-white text-gray-900 font-sans flex-row-reverse">
      {/* Right side: Premium Image Banner */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-100">
        <Image 
          src="/auth-banner.jpg" 
          alt="LLEMWELL Editorial Fashion" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-12 right-12 text-white text-right">
          <h2 className="text-4xl font-light mb-2 tracking-wide font-serif">LLEMWELL</h2>
          <p className="text-sm font-light tracking-widest uppercase">Join the elite</p>
        </div>
      </div>

      {/* Left side: Signup Form */}
      <div className="flex flex-1 flex-col justify-center items-center px-8 sm:px-12 lg:px-24">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{' '}
            Return to Store
          </Link>

          <form action={signUp} className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-normal mb-2 tracking-tight">Create an account</h1>
              <p className="text-gray-500 font-light">Join LLEMWELL for exclusive access to premium collections.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                className="rounded-none border-b border-gray-300 px-0 py-2 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-none border-b border-gray-300 px-0 py-2 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button className="mt-4 bg-black text-white rounded-none px-4 py-3 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors w-full">
              Create Account
            </button>

            {searchParams?.message && (
              <p className={`mt-2 p-3 text-sm border rounded text-center ${searchParams.message.includes('Check') ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                {searchParams.message}
              </p>
            )}

            <p className="text-sm text-center mt-6 text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="text-black font-medium underline underline-offset-4 hover:text-gray-600 transition-colors">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
