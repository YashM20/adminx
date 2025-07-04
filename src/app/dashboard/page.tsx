'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function DashboardPage() {
  const cards = [
    {
      title: 'Analytics',
      description: 'Track key metrics and gain insights',
      link: '/dashboard/analytics',
      count: 120,
      label: 'View Analytics'
    },
    {
      title: 'Reports',
      description: 'Generate and manage reports',
      link: '/dashboard/reports',
      count: 50,
      label: 'View Reports'
    },
    {
      title: 'Settings',
      description: 'Configure application settings',
      link: '/dashboard/settings',
      count: 0,
      label: 'View Settings'
    }
  ]

  return (
    <div className="space-y-8 p-6">
      <DashboardHeader
        title="Dashboard"
        description="Overview of your application"
        action={
          <Link href="/dashboard/new">
            <Button>Create New</Button>
          </Link>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total: {card.count}</p>
            </CardContent>
            <CardFooter>
              <Link href={card.link}>
                <Button variant="outline">{card.label}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}