'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from "../../@types/supabase";
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id as string)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    fullname,
    username,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="border flex flex-row w-3/5 bg-white rounded">
        <div className="flex flex-col justify-center w-1/2 bg-[url('/profileBg.png')]">
          <img src={avatar_url || ''} alt="user_avatar" className="w-16 h-16 rounded-full mx-auto" />
          <h2 className='text-center font-bold mx-auto text-white flex flex-col'>
            {fullname ? (
              fullname.split(" ").map((name, index) => (
                <span key={index}>{name}</span>
              ))
            ) : null}
          </h2>
        </div>

        <div className="w-1/2">
          <div className='bg-[#0072E1] text-white text-center py-4'>
            <h2 className='text-2xl font-semibold tracking-widest'>
              PROFILE
            </h2>
          </div>
          <div className="px-8">
            <div className='m-8'>
              <label className='font-bold' htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullname || ''}
                onChange={(e) => setFullname(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div className='m-8'>
              <label className='font-bold' htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div className='m-8'>
              <label className='font-bold' htmlFor="email">Email</label>
              <input
                id="email"
                type="mail"
                value={session?.user.email}
                className="border rounded-lg p-2 w-full"
                disabled
              />
            </div>

            <div className='my-2 flex justify-center'>
              <button
                className={`tracking-widest bg-[#8CEF7C] font-bold px-4 py-2 rounded hover:bg-[#6ce15a]`}
                onClick={() => updateProfile({ fullname, username, avatar_url })}
              >
                UPDATE
              </button>
            </div>

            <div className='my-4 flex justify-center'>
              <form action="/auth/logout" method="post">
                <button className="tracking-widest px-4 font-bold py-2 rounded bg-red-500 text-white hover:bg-red-700" type="submit">
                  SIGN OUT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}