// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

type ExtendedUser = {
  id: string
  email: string
  display_name?: string
}

type AuthContextType = {
  user: ExtendedUser | null
}

const AuthContext = createContext<AuthContextType>({ user: null })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null)

  useEffect(() => {
    // Initial check
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email ?? '',
          display_name: user.user_metadata?.display_name ?? '',
        })
      }
    })

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          display_name: session.user.user_metadata?.display_name ?? '',
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
