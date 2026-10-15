'use client';

import Link from 'next/link';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  /** Visual variant */
  variant?: Variant;
  /** Button size */
  size?: Size;
  /** Button content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

interface ButtonAsLink extends ButtonBaseProps {
  /** Renders as a Next.js Link when provided */
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-violet-600 text-white shadow-md shadow-violet-600/20 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/30 active:bg-violet-800',
  secondary:
    'bg-transparent text-violet-600 border-2 border-violet-600 hover:bg-violet-50 hover:border-violet-700 hover:text-violet-700 active:bg-violet-100',
  ghost:
    'bg-transparent text-gray-700 hover:text-violet-600 hover:bg-violet-50 active:bg-violet-100',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-8 py-3.5 text-base rounded-xl gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
