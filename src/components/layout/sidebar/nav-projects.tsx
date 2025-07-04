"use client"

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import { memo, useMemo } from "react"
import OptimizedLink from "@/components/common/optimized-link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// Memoized product item to prevent tooltip re-renders
const MemoizedProductItem = memo(function MemoizedProductItem({ 
  item, 
  isMobile 
}: { 
  item: {
    name: string
    url: string
    icon: LucideIcon
  }
  isMobile: boolean
}) {
  return (
    <SidebarMenuItem key={item.name}>
      <SidebarMenuButton asChild>
        <OptimizedLink href={item.url} prefetchOnMouseDown>
          <item.icon />
          <span>{item.name}</span>
        </OptimizedLink>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuItem>
            <Folder className="text-muted-foreground" />
            <span>View Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share className="text-muted-foreground" />
            <span>Share Product</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 className="text-muted-foreground" />
            <span>Delete Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
});

// Memoized "More" button
const MoreButton = memo(function MoreButton() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <MoreHorizontal />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

export function NavProducts({
  products,
}: {
  products: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()
  
  // Use useMemo to prevent unnecessary re-renders
  const productItems = useMemo(() => {
    return products.map(item => (
      <MemoizedProductItem 
        key={item.name}
        item={item}
        isMobile={isMobile}
      />
    ));
  }, [products, isMobile]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Products</SidebarGroupLabel>
      <SidebarMenu>
        {productItems}
        <MoreButton />
      </SidebarMenu>
    </SidebarGroup>
  )
}
