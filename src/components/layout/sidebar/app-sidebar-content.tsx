"use client"
import { memo } from "react"
import { SidebarContent } from "@/components/ui/sidebar"
import { useSidebarData } from "@/components/layout/sidebar/sidebar-data"
import dynamic from "next/dynamic"
const NavMain = dynamic(() => import("@/components/layout/sidebar/nav-main").then(mod => mod.NavMain), { ssr: false, })
const NavProducts = dynamic(() => import("@/components/layout/sidebar/nav-projects").then(mod => mod.NavProducts), { ssr: false, })
const NavSecondary = dynamic(() => import("@/components/layout/sidebar/nav-secondary").then(mod => mod.NavSecondary), { ssr: false, })

const AppSidebarContentComponent = () => {
  const sidebarData = useSidebarData();
  
  return (
    <SidebarContent>
      <NavMain items={sidebarData.navMain} />
      <NavProducts products={sidebarData.products} />
      <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
    </SidebarContent>
  )
}

export const AppSidebarContent = memo(AppSidebarContentComponent)

