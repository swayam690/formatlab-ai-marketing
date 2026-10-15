'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Letter-by-letter reveal animation ──────────────────────────────────────── */
function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const words = text.split(' ');
  let charIndex = 0;

  return (
    <h1 ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char) => {
            const idx = charIndex++;
            return (
              <span
                key={`${wi}-${idx}`}
                className="inline-block transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                  transitionDelay: `${idx * 25}ms`,
                }}
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && (
            <span className="inline-block" style={{ width: '0.3em' }}>
              {'\u00A0'}
            </span>
          )}
        </span>
      ))}
    </h1>
  );
}

/* ─── Floating Preview Card ──────────────────────────────────────────────────── */
function FloatingCard({
  children,
  className,
  delay = '0s',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute hidden md:block bg-[#191919] border border-white/[0.08] rounded-[12px] p-3 shadow-xl shadow-black/40 ${className ?? ''}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Icon Components (inline SVGs) ──────────────────────────────────────────── */
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

/* ─── Suggestion Pills ───────────────────────────────────────────────────────── */
const SUGGESTIONS = [
  'Feature Launch',
  'Product Demo',
  'Dev Meme',
  'Carousel',
  'Founder Story',
  'Tutorial',
];

function SuggestionPills() {
  return (
    <div className="relative w-full animate-fade-in delay-700">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {SUGGESTIONS.map((label) => (
          <button
            key={label}
            type="button"
            className="flex-shrink-0 bg-[#212121] hover:bg-[#2a2a2a] rounded-[12px] px-[14px] py-[8px] transition-colors duration-200 cursor-pointer"
          >
            <span
              className="text-[14px] font-medium bg-clip-text"
              style={{
                background: 'linear-gradient(135deg, rgb(209,230,255), rgb(253,255,237))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
      {/* Right fade-out gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none" style={{ background: 'linear-gradient(to left, #08090a, transparent)' }} />
    </div>
  );
}

/* ─── Mock Platform Icons for Cards ──────────────────────────────────────────── */
function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Hero Component ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#08090a]">
      {/* ── Violet Glow Background ──────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="w-[900px] h-[500px] rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Floating Preview Cards ──────────────────────────────────────────── */}
      {/* Card 1 — X/Twitter post (top-left) */}
      <FloatingCard
        className="top-[18%] left-[5%] xl:left-[10%] w-[110px] opacity-60 rotate-[-3deg]"
        delay="0s"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#2a2a2a] flex items-center justify-center">
            <XIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-medium text-white/80 leading-none">FormatLab</span>
            <span className="text-[8px] text-white/30 leading-none">@formatlab</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-[5px] w-full bg-white/[0.08] rounded-full" />
          <div className="h-[5px] w-[85%] bg-white/[0.06] rounded-full" />
          <div className="h-[5px] w-[60%] bg-white/[0.05] rounded-full" />
        </div>
        <div className="flex items-center gap-3 mt-2.5">
          <div className="h-[4px] w-4 bg-white/[0.06] rounded-full" />
          <div className="h-[4px] w-4 bg-white/[0.06] rounded-full" />
          <div className="h-[4px] w-4 bg-white/[0.06] rounded-full" />
        </div>
      </FloatingCard>

      {/* Card 2 — Instagram carousel (top-right) */}
      <FloatingCard
        className="top-[15%] right-[5%] xl:right-[10%] w-[100px] opacity-60 rotate-[4deg]"
        delay="1.5s"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded-[4px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
          <span className="text-[9px] font-medium text-white/70">Instagram</span>
        </div>
        <div className="w-full aspect-square bg-[#2a2a2a] rounded-[6px] mb-1.5 flex items-center justify-center overflow-hidden">
          <div className="flex gap-0.5">
            <div className="w-[30px] h-[30px] bg-violet-500/20 rounded-[3px]" />
            <div className="w-[30px] h-[30px] bg-violet-500/10 rounded-[3px]" />
          </div>
        </div>
        <div className="flex justify-center gap-1">
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/15" />
          <div className="w-1 h-1 rounded-full bg-white/15" />
        </div>
      </FloatingCard>

      {/* Card 3 — LinkedIn post (bottom-left) */}
      <FloatingCard
        className="bottom-[22%] left-[3%] xl:left-[8%] w-[115px] opacity-50 rotate-[2deg]"
        delay="3s"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded-[3px] bg-[#0A66C2]/80 flex items-center justify-center text-white/90">
            <LinkedInIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-medium text-white/70 leading-none">LinkedIn</span>
          </div>
        </div>
        <div className="space-y-1 mb-2">
          <div className="h-[5px] w-full bg-white/[0.08] rounded-full" />
          <div className="h-[5px] w-[90%] bg-white/[0.06] rounded-full" />
          <div className="h-[5px] w-[70%] bg-white/[0.05] rounded-full" />
        </div>
        <div className="w-full h-[28px] bg-[#2a2a2a] rounded-[4px]" />
      </FloatingCard>

      {/* Card 4 — Pinterest pin (bottom-right) */}
      <FloatingCard
        className="bottom-[20%] right-[4%] xl:right-[9%] w-[85px] opacity-50 rotate-[-4deg]"
        delay="4.5s"
      >
        <div className="flex items-center gap-1 mb-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#E60023]/80 flex items-center justify-center">
            <span className="text-[7px] font-bold text-white">P</span>
          </div>
          <span className="text-[8px] font-medium text-white/60">Pinterest</span>
        </div>
        <div className="w-full h-[70px] bg-[#2a2a2a] rounded-[6px] mb-1.5" />
        <div className="space-y-0.5">
          <div className="h-[4px] w-full bg-white/[0.08] rounded-full" />
          <div className="h-[4px] w-[60%] bg-white/[0.05] rounded-full" />
        </div>
      </FloatingCard>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-[calc(4rem+1px)] md:pt-[73px] px-4">
        <div className="w-full max-w-[600px] flex flex-col items-center gap-8">
          {/* Headline */}
          <AnimatedHeadline
            text="Ship features. We handle the conversation."
            className="text-[38px] sm:text-[52px] leading-[1.05] font-light text-white text-center text-balance tracking-[-0.02em]"
          />

          {/* Prompt Input Box */}
          <div className="w-full animate-slide-up delay-300">
            <div className="bg-[#111315] w-full p-[4px] rounded-[16px]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)' }}>
              <div
                className={`relative rounded-[12px] h-[120px] flex flex-col transition-all duration-300 ${inputFocused ? 'ring-1 ring-violet-500/30' : ''}`}
                style={{
                  background: 'linear-gradient(180deg, #212121 0%, #1c1c1c 100%)',
                  border: '0.6px solid',
                  borderImage: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%) 1',
                }}
              >
                {/* Textarea area */}
                <div className="flex-1 px-4 pt-3.5">
                  <textarea
                    placeholder="Describe your latest feature, or drop a screenshot..."
                    className="w-full h-full bg-transparent text-[16px] font-medium text-white placeholder:text-white/60 resize-none focus:outline-none leading-relaxed"
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                  />
                </div>

                {/* Bottom toolbar */}
                <div className="flex items-center justify-between px-3 pb-3">
                  <div className="flex items-center gap-2">
                    {/* Plus button */}
                    <button
                      type="button"
                      className="flex items-center justify-center size-7 rounded-[8px] text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors duration-200"
                    >
                      <PlusIcon />
                    </button>
                    {/* Auto label */}
                    <span className="text-[13px] font-medium text-white/30 select-none">Auto</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Sparkle button */}
                    <button
                      type="button"
                      className="flex items-center justify-center size-7 rounded-[8px] text-white/40 hover:text-violet-400 hover:bg-white/[0.06] transition-colors duration-200"
                    >
                      <SparkleIcon />
                    </button>
                    {/* Submit button */}
                    <button
                      type="button"
                      className="flex items-center justify-center size-8 bg-white hover:bg-neutral-200 rounded-[10px] text-black transition-colors duration-200"
                    >
                      <ArrowUpIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestion Pills */}
          <SuggestionPills />
        </div>
      </div>

      {/* ── Film-strip Divider ──────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="flex items-center justify-center gap-[3px] py-2 opacity-[0.15]">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[8px] bg-white/30 rounded-[1px]"
              style={{ opacity: Math.sin((i / 60) * Math.PI) * 0.6 + 0.4 }}
            />
          ))}
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>
    </section>
  );
}
