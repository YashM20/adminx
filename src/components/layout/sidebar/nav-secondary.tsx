'use client'

import { type LucideIcon } from "lucide-react"
import { memo, useMemo } from "react"
import OptimizedLink from "@/components/common/optimized-link"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { ComponentPropsWithoutRef } from "react"

interface NavSecondaryProps extends ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}

// Memoized menu item to prevent tooltip re-renders
const MemoizedSecondaryItem = memo(function MemoizedSecondaryItem({ 
  item 
}: { 
  item: {
    title: string
    url: string
    icon: LucideIcon
  }
}) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild size="sm" tooltip={item.title}>
        <OptimizedLink href={item.url} prefetchOnMouseDown>
          <item.icon />
          <span>{item.title}</span>
        </OptimizedLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

export function NavSecondary({ items, className, ...props }: NavSecondaryProps) {
  // Use useMemo to prevent unnecessary re-renders
  const secondaryItems = useMemo(() => {
    return items.map(item => (
      <MemoizedSecondaryItem 
        key={item.title}
        item={item}
      />
    ));
  }, [items]);
  
  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
        <SidebarGroupLabel>Help & Resources</SidebarGroupLabel>
          {secondaryItems}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
