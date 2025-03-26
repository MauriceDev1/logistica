"use client"

import {
  // BadgeCheck,
  // Bell,
  ChevronsUpDown,
  // CreditCard,
  LogOut,
  // Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { logOut } from "@/app/lib/firebase/auth"
import Cookies from 'js-cookie';

export function NavUser({ email }: {email: string}) {
  const router = useRouter();
  const { isMobile } = useSidebar()

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

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="Avatar Image" alt="Maurice" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Maurice</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="Avatar Image" alt="Maurice" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Maurice</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
