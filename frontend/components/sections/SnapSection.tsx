import { ReactNode } from 'react';

/**
 * SnapSection
 * Represents a single 100vh section that snaps into place.
 */
interface SnapSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SnapSection({ children, className = '', id }: SnapSectionProps) {
  return (
    <section
      id={id}
      className={`h-screen w-full snap-start relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}
