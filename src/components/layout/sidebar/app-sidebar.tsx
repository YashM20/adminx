"use client"

import { Command } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/layout/sidebar/nav-user"
import Loading from "@/app/loading"
import { Suspense, memo } from "react"
import { AppSidebarContent } from "@/components/layout/sidebar/app-sidebar-content"

function AppSidebarComponent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[var(--header-height)] !h-[calc(100svh-var(--header-height))]"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Dashboard</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <AppSidebarContent />
      <SidebarFooter>
        <Suspense fallback={<Loading />}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  )
}

export const AppSidebar = memo(AppSidebarComponent) 