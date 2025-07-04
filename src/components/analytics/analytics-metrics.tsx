'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
  description: string
}

function MetricCard({ title, value, change, trend, icon: Icon, description }: MetricCardProps) {
  const isPositive = trend === 'up'
  
  return (
    <Card className="bg-card border-border/50 hover:border-border transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary"
            className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-1',
              isPositive 
                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border-red-500/30'
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change}
          </Badge>
          <div className="p-1.5 rounded-md bg-muted/50">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

export const AnalyticsMetrics = () => {
  const metrics = [
    {
      title: 'Customer Acquisition Cost',
      value: '$42.35',
      change: '+5.2%',
      trend: 'up' as const,
      icon: DollarSign,
      description: 'Average cost to acquire a new customer'
    },
    {
      title: 'Customer Lifetime Value', 
      value: '$1,250',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users,
      description: 'Average revenue per customer over time'
    },
    {
      title: 'Customer Retention',
      value: '78.3%',
      change: '+3.1%',
      trend: 'up' as const,
      icon: Target,
      description: 'Percentage of customers retained'
    },
    {
      title: 'Lead Conversion Rate',
      value: '24.8%',
      change: '+4.1%',
      trend: 'up' as const,
      icon: Zap,
      description: 'Percentage of leads converted to customers'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          trend={metric.trend}
          icon={metric.icon}
          description={metric.description}
        />
      ))}
    </div>
  )
}
