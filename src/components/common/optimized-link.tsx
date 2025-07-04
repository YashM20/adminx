"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { forwardRef, memo } from "react";

interface OptimizedLinkProps extends LinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  prefetchOnHover?: boolean;
  prefetchOnMouseDown?: boolean;
  children: React.ReactNode;
}

const OptimizedLink = forwardRef<HTMLAnchorElement, OptimizedLinkProps>(
  (
    { 
      href, 
      children, 
      prefetch, 
      prefetchOnHover = true, 
      prefetchOnMouseDown = true, 
      onMouseDown,
      onMouseEnter,
      ...props 
    }, 
    ref
  ) => {
    const router = useRouter();

    const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (prefetchOnMouseDown && typeof href === 'string') {
        router.prefetch(href);
      }
      onMouseDown?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (prefetchOnHover && typeof href === 'string') {
        router.prefetch(href);
      }
      onMouseEnter?.(e);
    };

    return (
      <Link
        href={href}
        prefetch={prefetch}
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

OptimizedLink.displayName = "OptimizedLink";

export default memo(OptimizedLink); 