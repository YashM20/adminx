import { ReactNode } from 'react'

interface DashboardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function DashboardHeader({ title, description, action }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
} 