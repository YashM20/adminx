'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, CalendarDays, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const timeRanges = [
  { id: '7d', label: 'Last 7 Days', icon: Clock },
  { id: '30d', label: 'Last 30 Days', icon: CalendarDays },
  { id: 'custom', label: 'Custom Range', icon: Calendar },
]

export const AnalyticsTimeRange = () => {
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d' | 'custom'>('7d')

  return (
    <div className="flex items-center gap-1">
      {timeRanges.map((range) => {
        const isSelected = selectedRange === range.id
        return (
          <Button
            key={range.id}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRange(range.id as '7d' | '30d' | 'custom')}
            className={cn(
              'text-sm font-medium',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground border-border hover:bg-muted'
            )}
          >
            {range.label}
          </Button>
        )
      })}
    </div>
  )
}
