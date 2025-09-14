"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LayoutDashboard,
  LayoutDashboardIcon,
  LogInIcon,
  LogOut,
  LogOutIcon,
  SettingsIcon,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function NavAdmin() {
  const { isMobile } = useSidebar();
  const { data: session } = useSession();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem hidden={session?.user ? false : true}>
          <SidebarMenuButton asChild>
            <Link href="/admin">
              <LayoutDashboardIcon />
              Dashboard
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem hidden={session?.user ? false : true}>
          <SidebarMenuButton asChild>
            <Link href="/admin/settings">
              <SettingsIcon />
              Settings
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          {session?.user ? (
            <SidebarMenuButton asChild>
              <Link href="/api/auth/signout">
                <LogOutIcon />
                Logout
              </Link>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton asChild>
              <Link href="/api/auth/signin">
                <LogInIcon />
                Login
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
