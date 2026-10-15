'use client';

export default function OneProductManyStories() {
  return (
    <section id="one-product" className="relative bg-[#08090a] py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-4 md:px-[60px]">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white leading-tight tracking-tight">
            One feature. Seven stories.
          </h2>
          <p className="mt-4 text-base text-[#848484] leading-relaxed">
            A single product update transforms into platform-specific content that speaks each audience.
          </p>
        </div>

        {/* Source Feature Card */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative rounded-[16px] border border-violet-500/30 bg-[#111315] p-5" style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.08), 0 0 80px rgba(139, 92, 246, 0.04)' }}>
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-violet-500/15 text-violet-400 text-lg">
                ✦
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-medium uppercase tracking-wider text-violet-400">Source Feature</div>
                <div className="mt-1 text-sm font-medium text-white leading-relaxed">
                  New Feature: AI-powered search with natural language queries
                </div>
              </div>
            </div>
            {/* Subtle connector line */}
            <div className="absolute -bottom-6 left-1/2 h-6 w-px bg-gradient-to-b from-violet-500/30 to-transparent" />
          </div>
        </div>

        {/* Output Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Card 1 — Text Post */}
          <div className="group rounded-[12px] border border-white/[0.06] bg-[#111315] p-4 transition-all duration-200 hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Text Post</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                <span className="size-1.5 rounded-full bg-[#6b7280]" />
                X
              </span>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04] p-3">
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-light">
                just shipped natural language search. ask your data anything. no more SQL, no more dashboards — just questions and answers.
              </p>
            </div>
          </div>

          {/* Card 2 — Dev Meme */}
          <div className="group rounded-[12px] border border-white/[0.06] bg-[#111315] p-4 transition-all duration-200 hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Dev Meme</span>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                  <span className="size-1.5 rounded-full bg-[#6b7280]" />
                  X
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                  <span className="size-1.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600" />
                  IG
                </span>
              </div>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04] p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded bg-[#1e1e1e] flex items-center justify-center">
                    <span className="text-[8px] text-blue-400">VS</span>
                  </div>
                  <span className="text-[10px] text-[#848484]">query.sql</span>
                </div>
                <div className="rounded bg-[#1a1a2e]/60 p-2 border border-white/[0.04]">
                  <p className="text-[10px] font-mono text-red-400/80 line-through">SELECT * FROM users JOIN...</p>
                  <p className="text-[10px] font-mono text-emerald-400/80 mt-1">{`"which users signed up?"`}</p>
                </div>
                <p className="text-[10px] text-[#848484] text-center italic">when the intern discovers NLP search</p>
              </div>
            </div>
          </div>

          {/* Card 3 — Short Video */}
          <div className="group rounded-[12px] border border-white/[0.06] bg-[#111315] p-4 transition-all duration-200 hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Short Video</span>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                  <span className="size-1.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600" />
                  Reels
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                  <span className="size-1.5 rounded-full bg-cyan-400" />
                  TikTok
                </span>
              </div>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04] p-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded bg-white/[0.04] border border-white/[0.06] p-2 text-center">
                  <div className="text-lg">😫</div>
                  <p className="text-[9px] text-[#848484] mt-1">Problem</p>
                </div>
                <svg className="size-3 shrink-0 text-[#848484]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                <div className="flex-1 rounded bg-white/[0.04] border border-white/[0.06] p-2 text-center">
                  <div className="text-lg">⚡</div>
                  <p className="text-[9px] text-[#848484] mt-1">Demo</p>
                </div>
                <svg className="size-3 shrink-0 text-[#848484]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                <div className="flex-1 rounded bg-white/[0.04] border border-white/[0.06] p-2 text-center">
                  <div className="text-lg">🎉</div>
                  <p className="text-[9px] text-[#848484] mt-1">Result</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 — Carousel */}
          <div className="group rounded-[12px] border border-white/[0.06] bg-[#111315] p-4 transition-all duration-200 hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Carousel</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                <span className="size-1.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600" />
                Instagram
              </span>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04] p-3">
              <div className="flex items-center gap-1.5">
                {['The Problem', 'How It Works', 'Under the Hood', 'Results'].map((label, i) => (
                  <div key={label} className="flex-1 rounded bg-white/[0.04] border border-white/[0.06] p-1.5 text-center">
                    <div className="text-[10px] font-medium text-violet-400/80">{i + 1}</div>
                    <p className="text-[8px] text-[#848484] mt-0.5 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 5 — Pin */}
          <div className="group rounded-[12px] border border-white/[0.06] bg-[#111315] p-4 transition-all duration-200 hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Pin</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                <span className="size-1.5 rounded-full bg-red-500" />
                Pinterest
              </span>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04] p-3">
              <div className="text-center">
                <p className="text-xs font-medium text-white leading-snug">5 Ways NLP Search Saves Time</p>
                <div className="mt-2 space-y-1">
                  {['Skip the SQL', 'Ask in plain English', 'Instant charts', 'Team-friendly', 'Zero learning curve'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 justify-center">
                      <span className="size-1 rounded-full bg-red-400/60" />
                      <span className="text-[9px] text-[#848484]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 6 — Founder Post */}
          <div className="group rounded-[12px] border border-white/[0.06] bg-[#111315] p-4 transition-all duration-200 hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Founder Post</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                <span className="size-1.5 rounded-full bg-blue-500" />
                LinkedIn
              </span>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04] p-3">
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-light">
                {`Last year I watched a customer spend 20 minutes writing SQL just to check how many trial users converted last week. That moment changed everything...`}
              </p>
              <p className="mt-2 text-[10px] text-violet-400/60">Read more</p>
            </div>
          </div>

          {/* Card 7 — Blog Article */}
          <div className="group rounded-[12px] border border-white/[0.06] bg-[#111315] p-4 transition-all duration-200 hover:border-white/[0.12]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Blog Article</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#212121] px-2 py-0.5 text-[10px] font-medium text-[#848484]">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Website
              </span>
            </div>
            <div className="mt-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04] p-3">
              <p className="text-xs font-medium text-white leading-snug">How We Built Sub-Second Natural Language Search</p>
              <p className="mt-1.5 text-[10px] text-[#848484] leading-relaxed">
                A deep dive into semantic embeddings, query parsing, and how we made database questions feel like a conversation.
              </p>
              <div className="mt-2 flex items-center gap-2 text-[9px] text-[#848484]/60">
                <span>8 min read</span>
                <span className="size-0.5 rounded-full bg-[#848484]/40" />
                <span>Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
