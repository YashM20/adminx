'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, PieChart, TrendingUp, Globe, Users, Mail, RefreshCw, Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FunnelStageProps {
  stage: string
  description: string
  percentage: number
  color: string
  users: string
}

function FunnelStage({ stage, description, percentage, color, users }: FunnelStageProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div>
          <div className="font-medium text-sm text-foreground">{stage}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-foreground">{percentage}%</div>
        <div className="text-xs text-muted-foreground">{users}</div>
      </div>
    </div>
  )
}

interface LeadSourceProps {
  source: string
  percentage: number
  color: string
  icon: React.ElementType
  description: string
}

function LeadSource({ source, percentage, color, icon: Icon, description }: LeadSourceProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <div>
          <div className="font-medium text-sm text-foreground">{source}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-foreground">{percentage}%</div>
      </div>
    </div>
  )
}

export const AnalyticsCharts = () => {
  const [refreshing, setRefreshing] = useState(false)
  
  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }
  
  const funnelStages = [
    {
      stage: 'Awareness',
      description: 'Users discover your brand',
      percentage: 100,
      color: '#3b82f6',
      users: '10k users'
    },
    {
      stage: 'Consideration', 
      description: 'Users evaluate your solution',
      percentage: 75,
      color: '#10b981',
      users: '7.5k users'
    },
    {
      stage: 'Decision',
      description: 'Users decide to purchase',
      percentage: 45,
      color: '#f59e0b',
      users: '4.5k users'
    },
    {
      stage: 'Loyalty',
      description: 'Users become repeat customers',
      percentage: 25,
      color: '#8b5cf6',
      users: '2.5k users'
    }
  ]

  const leadSources = [
    {
      source: 'Website',
      percentage: 45,
      color: '#3b82f6',
      icon: Globe,
      description: 'Organic and direct traffic'
    },
    {
      source: 'Referrals',
      percentage: 25,
      color: '#10b981',
      icon: Users,
      description: 'Word-of-mouth recommendations'
    },
    {
      source: 'Social Media',
      percentage: 20,
      color: '#f59e0b',
      icon: TrendingUp,
      description: 'Social platforms and ads'
    },
    {
      source: 'Email',
      percentage: 10,
      color: '#8b5cf6',
      icon: Mail,
      description: 'Email campaigns and newsletters'
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Customer Journey Stages */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-base font-semibold text-foreground">Customer Journey Stages</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Distribution of customers across sales funnel
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {funnelStages.map((stage, index) => (
              <FunnelStage
                key={index}
                stage={stage.stage}
                description={stage.description}
                percentage={stage.percentage}
                color={stage.color}
                users={stage.users}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Customer funnel visualization • Awareness → Consideration → Decision → Loyalty
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Lead Sources */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-base font-semibold text-foreground">Lead Sources</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Where your leads are coming from
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {leadSources.map((source, index) => (
              <LeadSource
                key={index}
                source={source.source}
                percentage={source.percentage}
                color={source.color}
                icon={source.icon}
                description={source.description}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Lead sources distribution • Website, referrals, social media, email campaigns
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 