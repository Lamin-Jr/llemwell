'use client';

import { ReactNode, useRef } from 'react';

/**
 * SnapContainer
 * A wrapper that enforces full-viewport vertical scroll snapping.
 * All direct children should ideally be SnapSection components.
 */
interface SnapContainerProps {
  children: ReactNode;
  className?: string;
}

export default function SnapContainer({ children, className = '' }: SnapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory hide-scrollbar relative ${className}`}
    >
      {children}
    </div>
  );
}
