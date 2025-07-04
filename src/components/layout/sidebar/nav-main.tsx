"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { memo, useMemo } from "react"
import OptimizedLink from "@/components/common/optimized-link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Helper function to determine if a path is active
const isPathActive = (itemPath: string, currentPath: string, exactPathMatch = false) => {
  // Exact match - always return true for exact matches
  if (currentPath === itemPath) return true
  
  // If exactPathMatch is true, only exact matches are active
  if (exactPathMatch) return false
  
  // Special case for root path
  if (itemPath === '/' && currentPath !== '/') return false
  
  // Handle nested routes - only if path segment matches completely
  // This prevents '/dashboard' from matching '/dash'
  const itemSegments = itemPath.split('/').filter(Boolean)
  const currentSegments = currentPath.split('/').filter(Boolean)
  
  // For segment matching, item path must be shorter or equal to current path
  if (itemSegments.length > currentSegments.length) return false
  
  // Check if all segments of item path match the start of current path
  return itemSegments.every((segment, index) => segment === currentSegments[index])
}

// Memoized menu item to prevent tooltip re-renders
const MemoizedMenuItem = memo(function MemoizedMenuItem({ 
  item, 
  pathname 
}: { 
  item: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    exactPathMatch?: boolean
    items?: {
      title: string
      url: string
    }[]
  }
  pathname: string
}) {
  // Determine active state using the helper function
  const active = item.isActive ?? isPathActive(item.url, pathname, item.exactPathMatch)
  
  // Check if any child item is active
  const hasActiveChild = item.items?.some(subItem => 
    isPathActive(subItem.url, pathname)
  ) ?? false
  
  // Current item is active if directly active or has active children
  const isActive = active || hasActiveChild
  
  return (
    <Collapsible 
      key={item.title} 
      asChild 
      defaultOpen={isActive}
    >
      <SidebarMenuItem>
        <SidebarMenuButton 
          asChild 
          tooltip={item.title} 
          className={cn(
            "relative overflow-hidden transition-all duration-300 py-2.5",
            isActive
              ? "bg-gray-100 hover:bg-gray-200 dark:bg-accent/60 dark:hover:bg-accent/80"
              : "hover:bg-gray-50 dark:hover:bg-accent/70"
          )}
        >
          <OptimizedLink href={item.url} prefetchOnMouseDown>
            <item.icon />
            <span>{item.title}</span>
          </OptimizedLink>
        </SidebarMenuButton>
        {item.items?.length ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => {
                  const subItemActive = isPathActive(subItem.url, pathname)
                  return (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton 
                        asChild
                        className={cn(
                          "relative overflow-hidden transition-all duration-300 py-2",
                          subItemActive ? "bg-gray-100 hover:bg-gray-200 dark:bg-accent/60 dark:hover:bg-accent/80" : "hover:bg-gray-50 dark:hover:bg-accent/70"
                        )}
                      >
                        <OptimizedLink href={subItem.url} prefetchOnMouseDown>
                          <span>{subItem.title}</span>
                        </OptimizedLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
});

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    exactPathMatch?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()
  
  // Use useMemo to prevent unnecessary re-renders of the entire menu
  const menuItems = useMemo(() => {
    return items.map((item) => (
      <MemoizedMenuItem 
        key={item.title}
        item={item}
        pathname={pathname}
      />
    ));
  }, [items, pathname]);
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems}
      </SidebarMenu>
    </SidebarGroup>
  )
}
