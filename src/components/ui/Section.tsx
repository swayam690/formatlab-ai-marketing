import { type ReactNode } from 'react';

interface SectionProps {
  /** Anchor ID for navigation links */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Section content */
  children: ReactNode;
}

export default function Section({ id, className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
