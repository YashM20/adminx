'use client'

import { ReactNode, Suspense, memo, useEffect, useRef, useState } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import Loading from '@/app/loading'
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'
import { SiteHeader } from '@/components/layout/header/site-header'
import { useRouteTransition } from '@/hooks/use-route-transition'

interface DashboardLayoutProps {
  children: ReactNode
}

// Main content area that will be efficiently updated during navigation
const DashboardContent = memo(function DashboardContent({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { isNavigating } = useRouteTransition()
  
  // Optimize renders during navigation
  useEffect(() => {
    if (contentRef.current && isNavigating()) {
      // Apply specific optimizations to content area during navigation
      contentRef.current.style.opacity = '0.98'
      
      const timer = setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.opacity = '1'
        }
      }, 10)
      
      return () => clearTimeout(timer)
    }
  }, [isNavigating])
  
  return (
    <div ref={contentRef} className="flex flex-1 flex-col overflow-hidden transition-opacity duration-75">
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
})

function DashboardLayoutComponent({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // Read sidebar state from cookie on mount
    const cookies = document.cookie.split('; ');
    const sidebarCookie = cookies.find(cookie => cookie.startsWith('sidebar_state='));
    if (sidebarCookie) {
      const savedState = sidebarCookie.split('=')[1];
      setIsSidebarOpen(savedState === 'true');
    } else {
      // Set initial cookie if not found, based on default state
      document.cookie = `sidebar_state=${isSidebarOpen}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }
  }, [])

  const handleSidebarOpenChange = (open: boolean) => {
    setIsSidebarOpen(open);
    // SidebarProvider will handle writing the cookie internally when its `setOpen` is called,
    // which happens when onOpenChange is triggered if it's a controlled component.
    // If SidebarProvider's onOpenChange doesn't trigger its internal cookie writing when controlled,
    // we might need to explicitly write it here too, but typically it should.
    // Forcing it here to be safe, as SidebarProvider code shows it writes cookie in its own `setOpen`.
    document.cookie = `sidebar_state=${open}; path=/; max-age=${60 * 60 * 24 * 7}`;
  };

  return (
    <div className="flex flex-col [--header-height:calc(theme(spacing.14))] [--sidebar-width:calc(theme(spacing.12))]">
      <SidebarProvider 
        className='flex flex-col h-full'
        open={isSidebarOpen}
        onOpenChange={handleSidebarOpenChange}
      >
        <Suspense fallback={<div className="h-[--header-height]">Loading...</div>}>
          <SiteHeader />
        </Suspense>
        <div className="flex flex-1">
          <Suspense fallback={<div className="w-[--sidebar-width]">Loading...</div>}>
            <AppSidebar />
          </Suspense>
          <SidebarInset className='overflow-hidden'>
            <DashboardContent>
              {children}
            </DashboardContent>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

// Export a memoized version of the component
export const DashboardLayout = memo(DashboardLayoutComponent) 