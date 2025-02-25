"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { LogIn, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface AuthNavProps {
  role?: string;
}

const AuthNav: React.FC<AuthNavProps> = ({ role }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated either from props or cookies
    if (role === 'authenticated') {
      setIsLoggedIn(true)
    } else {
      // Check cookie as fallback
      const authCookie = Cookies.get('isAuthenticated')
      setIsLoggedIn(authCookie === 'true')
    }
  }, [role])

  const handleLogout = async () => {
    // Use js-cookie for better cross-browser compatibility
    await fetch("/auth/signout", { method: "POST" });
    setIsLoggedIn(false)
    router.refresh() // Refresh the page to update server components
  }

  if (isLoggedIn) {
    return (
      <div className="flex gap-2">
        <Link href="/profile">
          <Button variant="outline" className="flex gap-2">
            Profile <User />
          </Button>
        </Link>
        <Button onClick={handleLogout} className="flex gap-2">
          Logout <LogOut />
        </Button>
      </div>
    )
  }

  return (
    <Link href="/login">
      <Button className="flex gap-2">
        Login <LogIn />
      </Button>
    </Link>
  )
}

export default AuthNav
