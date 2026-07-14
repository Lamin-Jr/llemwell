'use client';

import Link from 'next/link';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface GhostButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
}

const sizeClassMap: Record<string, string> = {
  sm: 'ghost-btn-sm',
  md: 'ghost-btn-md',
  lg: 'ghost-btn-lg',
};

export default function GhostButton({
  children,
  href,
  onClick,
  size = 'md',
  variant = 'light',
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
}: GhostButtonProps) {
  const classes = [
    'ghost-btn',
    sizeClassMap[size],
    variant === 'dark' ? 'ghost-btn-dark' : '',
    disabled ? 'opacity-40 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = loading ? (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: 'var(--duration-slow)' }}
      />
      {"tO BE DELETED"}
      <span>{children}</span>
    </span>
  ) : (
    children
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}
