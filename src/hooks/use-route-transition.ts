'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

/**
 * A hook to optimize route transitions by minimizing layout thrashing
 * and preventing unnecessary re-renders during navigation
 */
export function useRouteTransition() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathRef = useRef(pathname)
  const isNavigatingRef = useRef(false)
  
  // Use layout effect to capture navigation start
  useLayoutEffect(() => {
    if (prevPathRef.current !== pathname) {
      isNavigatingRef.current = true
      
      // Disable any animations that might be expensive during navigation
      document.documentElement.classList.add('route-transitioning')
    }
  }, [pathname])
  
  // Use effect to capture navigation end
  useEffect(() => {
    if (isNavigatingRef.current) {
      // Re-enable animations after navigation completes
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('route-transitioning')
        isNavigatingRef.current = false
        prevPathRef.current = pathname
      })
    }
  }, [pathname, searchParams])
  
  // Helper to determine if we're currently navigating
  const isNavigating = useCallback(() => {
    return isNavigatingRef.current
  }, [])
  
  return {
    pathname,
    searchParams,
    isNavigating
  }
} 