'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/get-query-client'
import { memo, useMemo, type ReactNode } from 'react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

// Memoized provider component to prevent unnecessary re-renders
function ProvidersComponent({ children }: { children: ReactNode }) {
  // Create a stable reference to the query client
  const queryClient = useMemo(() => getQueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {children}
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

// Export a memoized version of the component
export default memo(ProvidersComponent)
