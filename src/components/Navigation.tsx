'use client';

import { useState, useEffect, useCallback } from 'react';
import { BRAND } from '@/lib/brand';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${scrolled ? 'bg-[#08090a]/80 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent border-b border-transparent'}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-[60px]">
          <div className="flex items-center justify-between h-16 md:h-[72px] md:grid md:grid-cols-[1fr_auto_1fr]">
            {/* Brand */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-0 select-none"
            >
              <span className="text-[20px] font-semibold tracking-[-0.02em] text-white">
                Format
              </span>
              <span className="text-[20px] font-semibold tracking-[-0.02em] text-violet-400">
                Lab
              </span>
            </a>

            {/* Desktop Nav Links — center column */}
            <div className="hidden md:flex items-center gap-1">
              {BRAND.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[16px] font-normal text-[#848484] hover:text-white px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side: desktop CTAs + mobile hamburger */}
            <div className="flex items-center justify-end gap-2">
              {/* Desktop buttons */}
              <a
                href="#"
                className="hidden md:inline-flex items-center justify-center text-[14px] font-medium bg-[#212121] text-white hover:bg-[#2b2b2b] rounded-[12px] px-4 py-2.5 transition-colors duration-200"
              >
                Login
              </a>
              <a
                href="#"
                className="hidden md:inline-flex items-center justify-center text-[14px] font-medium bg-white text-black hover:bg-neutral-200 rounded-[12px] px-4 py-2.5 transition-colors duration-200"
              >
                {BRAND.cta.nav}
              </a>

              {/* Mobile: small Get started button */}
              <a
                href="#"
                className="md:hidden inline-flex items-center justify-center text-[13px] font-medium bg-white text-black hover:bg-neutral-200 rounded-[10px] px-3 py-2 transition-colors duration-200"
              >
                {BRAND.cta.nav}
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center size-9 rounded-md text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
                aria-label="Toggle menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="17" x2="20" y2="17" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-[#111315] border-b border-white/[0.08] animate-slide-down">
            {/* Spacer for nav height */}
            <div className="h-16" />

            <div className="px-4 pb-6 pt-2 flex flex-col gap-1">
              {BRAND.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[16px] font-normal text-[#848484] hover:text-white px-3 py-3 rounded-md transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <a
                  href="#"
                  className="flex items-center justify-center text-[14px] font-medium bg-[#212121] text-white hover:bg-[#2b2b2b] rounded-[12px] px-4 py-3 transition-colors duration-200"
                >
                  Login
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center text-[14px] font-medium bg-white text-black hover:bg-neutral-200 rounded-[12px] px-4 py-3 transition-colors duration-200"
                >
                  {BRAND.cta.nav}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
