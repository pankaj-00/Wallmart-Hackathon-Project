import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      await supabase.auth.signOut()
    }

    return NextResponse.redirect(new URL('/', req.url), {
      status: 302,
    })
  } catch (e) {
    console.log("Error in the logout route: ", e);
  }
}