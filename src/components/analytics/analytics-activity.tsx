'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  Mail, 
  Users, 
  FileText, 
  Clock, 
  TrendingUp, 
  MousePointer,
  Eye,
  MessageSquare,
  Calendar
} from 'lucide-react'

interface ActivityItemProps {
  type: 'call' | 'email' | 'lead' | 'ticket'
  title: string
  description: string
  time: string
  icon: React.ElementType
  company?: string
}

function ActivityItem({ type, title, description, time, icon: Icon, company }: ActivityItemProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-500/20 text-blue-400'
      case 'email': return 'bg-green-500/20 text-green-400'
      case 'lead': return 'bg-purple-500/20 text-purple-400'
      case 'ticket': return 'bg-orange-500/20 text-orange-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`p-2 rounded-lg ${getTypeColor(type)}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-foreground">{title}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {company && (
          <Badge variant="outline" className="mt-2 text-xs bg-muted/30">
            {company}
          </Badge>
        )}
      </div>
    </div>
  )
}

interface EngagementMetricProps {
  label: string
  value: string
  change: string
  icon: React.ElementType
}

function EngagementMetric({ label, value, change, icon: Icon }: EngagementMetricProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="p-2 rounded-lg bg-muted/30">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">{value}</span>
          <Badge 
            variant="secondary"
            className={`text-xs font-medium ${
              isPositive 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {change}
          </Badge>
        </div>
        <p className="text-sm font-medium text-foreground">{label}</p>
      </div>
    </div>
  )
}

export const AnalyticsActivity = () => {
  const recentActivities = [
    {
      type: 'call' as const,
      title: 'Sales call completed',
      description: '45-minute call with Acme Corp about premium plan',
      time: '10m ago',
      icon: Phone,
      company: 'Acme Corp'
    },
    {
      type: 'email' as const,
      title: 'Follow-up email sent',
      description: 'Proposal sent to TechStart Inc. regarding enterprise solution',
      time: '45m ago',
      icon: Mail,
      company: 'TechStart Inc.'
    },
    {
      type: 'lead' as const,
      title: 'New lead created',
      description: 'GlobalTech added as a new lead from website contact form',
      time: '2h ago',
      icon: Users,
      company: 'GlobalTech'
    },
    {
      type: 'ticket' as const,
      title: 'Support ticket resolved',
      description: 'Resolved billing issue for Quantum Solutions LLC',
      time: '3h ago',
      icon: FileText,
      company: 'Quantum Solutions LLC'
    }
  ]

  const engagementMetrics = [
    {
      label: 'Email Opens',
      value: '87%',
      change: '+5.2%',
      icon: Eye
    },
    {
      label: 'Website Visits',
      value: '2,847',
      change: '+12.3%',
      icon: MousePointer
    },
    {
      label: 'Call Duration',
      value: '24m',
      change: '+3.1%',
      icon: MessageSquare
    },
    {
      label: 'Response Time',
      value: '2.4h',
      change: '-15.2%',
      icon: Calendar
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recent Customer Interactions */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Recent Customer Interactions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest customer touchpoints and activities
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                type={activity.type}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                icon={activity.icon}
                company={activity.company}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Engagement */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Customer Engagement</CardTitle>
              <p className="text-sm text-muted-foreground">
                Activity metrics across customer touchpoints
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {engagementMetrics.map((metric, index) => (
              <EngagementMetric
                key={index}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
