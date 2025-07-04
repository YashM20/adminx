import { Suspense } from 'react';
import { DashboardSkeleton } from '@/components/dashboard/dashboard-skeleton';
import dynamic from 'next/dynamic';

const DashboardLayout = dynamic(() => import('@/components/dashboard/dashboard-layout').then(mod => mod.DashboardLayout), { ssr: true });

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardSkeleton />}>
        {children}
      </Suspense>
    </DashboardLayout>
  );
} 