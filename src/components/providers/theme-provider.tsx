'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { memo, type ReactNode } from 'react'
import type { ThemeProviderProps as NextThemeProviderProps } from 'next-themes'

interface ThemeProviderProps extends NextThemeProviderProps {
  children: ReactNode
}

function ThemeProviderComponent({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>{children}</NextThemeProvider>
  )
}

// Export a memoized version of the component
export const ThemeProvider = memo(ThemeProviderComponent)

