import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">

    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold tracking-tighter">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-4 text-muted-foreground max-w-md">
        We couldn't find the page you were looking for. Please check the URL or try navigating to another page.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="secondary" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
    </div>
  )
}