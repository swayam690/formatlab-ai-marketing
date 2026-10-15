'use client';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#08090a]">
      <div className="mx-auto max-w-[1320px] px-4 md:px-[60px] py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white tracking-tight">
            Three steps to autopilot
          </h2>
          <p className="mt-4 text-[#848484] text-base sm:text-lg max-w-xl mx-auto">
            From product update to published content.
          </p>
        </div>

        {/* Steps Grid with Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-start">
          {/* Arrow connectors — desktop only */}
          <div className="hidden md:flex absolute top-1/2 left-[33.33%] -translate-x-1/2 -translate-y-1/2 z-10">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="hidden md:flex absolute top-1/2 left-[66.66%] -translate-x-1/2 -translate-y-1/2 z-10">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16H24M24 16L18 10M24 16L18 22" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 1: Upload */}
          <div className="bg-[#111315] border border-white/[0.06] rounded-[16px] p-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#141618] group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-violet-400 text-sm font-mono">01</span>
            </div>

            {/* Icon */}
            <div className="mb-5">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-400">
                <path d="M20 26V14M20 14L14 20M20 14L26 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 28C8 28 8 32 12 32H28C32 32 32 28 32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12C12 9 14 7 17 7H23C26 7 28 9 28 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </div>

            <h3 className="text-white text-xl font-medium mb-3">Feed your product</h3>
            <p className="text-[#848484] text-sm leading-relaxed mb-6">
              Share your URL, screenshots, demo recordings, feature updates, or release notes. FormatLab builds a persistent understanding of your product.
            </p>

            {/* Mini upload mockup */}
            <div className="rounded-[12px] border border-dashed border-white/[0.12] bg-white/[0.02] p-5 flex flex-col items-center justify-center gap-2 group-hover:border-violet-400/30 transition-colors duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#333]">
                <path d="M12 16V8M12 8L8 12M12 8L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[#333] text-xs font-mono">Drop files or paste URL</span>
              <div className="flex gap-2 mt-1">
                <span className="bg-white/[0.04] rounded px-1.5 py-0.5 text-[10px] text-[#4a4a4a] font-mono">.mp4</span>
                <span className="bg-white/[0.04] rounded px-1.5 py-0.5 text-[10px] text-[#4a4a4a] font-mono">.png</span>
                <span className="bg-white/[0.04] rounded px-1.5 py-0.5 text-[10px] text-[#4a4a4a] font-mono">.md</span>
              </div>
            </div>
          </div>

          {/* Step 2: Create */}
          <div className="bg-[#111315] border border-white/[0.06] rounded-[16px] p-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#141618] group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-violet-400 text-sm font-mono">02</span>
            </div>

            {/* Icon */}
            <div className="mb-5">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-400">
                <path d="M20 6L22 12L28 10L24 16L30 18L24 20L28 26L22 24L20 30L18 24L12 26L16 20L10 18L16 16L12 10L18 12L20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="20" cy="18" r="3" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M32 8L34 12L32 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                <path d="M8 24L6 28L8 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
              </svg>
            </div>

            <h3 className="text-white text-xl font-medium mb-3">Generate content</h3>
            <p className="text-[#848484] text-sm leading-relaxed mb-6">
              {`AI finds relevant content structures and trending formats, then generates platform-native variations \u2014 not identical cross-posts.`}
            </p>

            {/* Mini content cards fanning out */}
            <div className="relative h-[100px] flex items-center justify-center">
              <div className="absolute w-[140px] h-[72px] rounded-[8px] bg-white/[0.03] border border-white/[0.06] p-3 transform -rotate-6 -translate-x-4 translate-y-1 transition-transform duration-300 group-hover:-rotate-8 group-hover:-translate-x-5">
                <div className="w-8 h-1.5 rounded bg-violet-400/30 mb-2" />
                <div className="w-full h-1 rounded bg-white/[0.06] mb-1.5" />
                <div className="w-3/4 h-1 rounded bg-white/[0.06]" />
                <span className="absolute bottom-2 right-3 text-[9px] text-[#4a4a4a] font-mono">X</span>
              </div>
              <div className="absolute w-[140px] h-[72px] rounded-[8px] bg-white/[0.05] border border-white/[0.08] p-3 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="w-8 h-1.5 rounded bg-violet-400/50 mb-2" />
                <div className="w-full h-1 rounded bg-white/[0.08] mb-1.5" />
                <div className="w-2/3 h-1 rounded bg-white/[0.08]" />
                <span className="absolute bottom-2 right-3 text-[9px] text-[#4a4a4a] font-mono">LinkedIn</span>
              </div>
              <div className="absolute w-[140px] h-[72px] rounded-[8px] bg-white/[0.03] border border-white/[0.06] p-3 transform rotate-6 translate-x-4 translate-y-1 transition-transform duration-300 group-hover:rotate-8 group-hover:translate-x-5">
                <div className="w-8 h-1.5 rounded bg-violet-400/30 mb-2" />
                <div className="w-full h-1 rounded bg-white/[0.06] mb-1.5" />
                <div className="w-1/2 h-1 rounded bg-white/[0.06]" />
                <span className="absolute bottom-2 right-3 text-[9px] text-[#4a4a4a] font-mono">IG</span>
              </div>
            </div>
          </div>

          {/* Step 3: Distribute */}
          <div className="bg-[#111315] border border-white/[0.06] rounded-[16px] p-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#141618] group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-violet-400 text-sm font-mono">03</span>
            </div>

            {/* Icon */}
            <div className="mb-5">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-400">
                <path d="M10 30L32 18L10 6V16L22 18L10 20V30Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M32 18L28 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                <circle cx="34" cy="12" r="1.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <circle cx="36" cy="22" r="1" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>

            <h3 className="text-white text-xl font-medium mb-3">Publish &amp; learn</h3>
            <p className="text-[#848484] text-sm leading-relaxed mb-6">
              Schedule across your channels with approval controls. Track performance and get recommendations for your next experiment.
            </p>

            {/* Mini calendar/schedule mockup */}
            <div className="rounded-[8px] bg-white/[0.03] border border-white/[0.06] p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-[#4a4a4a] font-mono">October 2025</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                  <span className="text-[9px] text-[#4a4a4a]">Scheduled</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={`day-${i}`} className="text-[8px] text-[#333] text-center font-mono">{d}</span>
                ))}
                {Array.from({ length: 28 }, (_, i) => {
                  const scheduled = [2, 5, 9, 12, 16, 19, 23, 26].includes(i);
                  const today = i === 13;
                  return (
                    <span
                      key={`date-${i}`}
                      className={`text-[8px] text-center rounded py-0.5 font-mono ${today ? 'bg-violet-500/30 text-violet-300' : scheduled ? 'bg-emerald-500/20 text-emerald-400/80' : 'text-[#333]'}`}
                    >
                      {i + 1}
                    </span>
                  );
                })}
              </div>
              <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[9px] text-[#4a4a4a] font-mono">8 posts queued</span>
                <span className="text-[9px] text-violet-400/60 font-mono">Review →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
