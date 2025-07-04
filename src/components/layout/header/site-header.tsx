"use client"

import { Bell, SidebarIcon, Slash } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { SearchForm } from "@/components/layout/header/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/common/mode-toggle"
import { Suspense } from "react"
import Loading from "@/app/loading"

const OrganizationSwitcher = dynamic(() => import("@/components/layout/header/organization-switcher").then(mod => mod.OrganizationSwitcher), { ssr: false, })

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="flex sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-2">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="-ml-[1px] h-4" />
        <div className="flex items-center space-x-4 px-2 mr-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">DineHub</span>
          </Link>
        </div>
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbItem>
            <Suspense fallback={<Loading />}>
              <OrganizationSwitcher />
            </Suspense>
          </BreadcrumbItem>
        </Breadcrumb>

        <SearchForm className="w-full sm:ml-auto sm:w-auto pr-2" />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}
