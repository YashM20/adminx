import { SquareTerminal, Bot, BookOpen, Settings2, LifeBuoy, Send, Frame, PieChart, Map, Coffee, Utensils, Hotel, ShoppingCart, Users, Building2, LayoutGrid } from "lucide-react"
import { useMemo } from 'react'

export const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      exactPathMatch: true,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
      exactPathMatch: true,
    },
    {
      title: "Tenants",
      url: "/dashboard/tenants",
      icon: Building2,
      exactPathMatch: true,
    },
    {
      title: "Organizations",
      url: "/dashboard/organizations",
      icon: Users,
      exactPathMatch: true,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: ShoppingCart,
      exactPathMatch: true,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: Bot,
      exactPathMatch: true,
    },
    {
      title: "CRM Builder",
      url: "/dashboard/crm",
      icon: LayoutGrid,
      exactPathMatch: true,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      exactPathMatch: false,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Team",
          url: "/dashboard/settings/team",
        },
        {
          title: "Billing",
          url: "/dashboard/settings/billing",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
    },
  ],
  products: [
    {
      name: "Table Reservation System",
      url: "/dashboard/product/prod1",
      icon: Utensils,
    },
    {
      name: "Menu Management",
      url: "/dashboard/product/prod2",
      icon: Coffee,
    },
    {
      name: "Room Booking System",
      url: "/dashboard/product/prod4",
      icon: Hotel,
    },
  ],
}

// Add a hook to memoize the sidebar data
export function useSidebarData() {
  return useMemo(() => sidebarData, []);
}