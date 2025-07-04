'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { AnalyticsMetrics } from '@/components/analytics/analytics-metrics'
import { AnalyticsCharts } from '@/components/analytics/analytics-charts'
import { AnalyticsActivity } from '@/components/analytics/analytics-activity'
import { AnalyticsTimeRange } from '@/components/analytics/analytics-time-range'

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track key metrics and gain insights into your performance
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Live data
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
          </div>
        </div>
        <AnalyticsTimeRange />
      </div>

      {/* Key Performance Indicators */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Key Performance Indicators</h2>
        <AnalyticsMetrics />
      </div>

      {/* Performance Analytics */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Performance Analytics</h2>
        <AnalyticsCharts />
      </div>

      {/* Recent Activity & Engagement */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity & Engagement</h2>
        <AnalyticsActivity />
      </div>
    </div>
  )
} 