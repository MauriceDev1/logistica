"use client"

import Link from 'next/link'
import { Button } from './ui/button'
import { LogIn, LogOut, User } from 'lucide-react'
import { logOut } from '@/app/lib/firebase/auth'; // Adjust the import path
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthNavProps {
  email?: string | null;
}

const AuthNav: React.FC<AuthNavProps> = ({ email }) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call the logout function from your auth utilities
      const { error } = await logOut();

      if (error) {
        // Handle any logout errors
        console.error('Logout failed:', error);
        alert('Failed to log out. Please try again.');
        return;
      }

      // Remove authentication cookie
      Cookies.remove('isAuthenticated');

      // Refresh the page to update server components and clear any user-specific state
      router.push('/'); // Optionally redirect to home page
      router.refresh();
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  if (email) {
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
