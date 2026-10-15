'use client';

import { useState, useCallback } from 'react';

type Platform = 'x' | 'instagram' | 'pinterest' | 'linkedin';

interface ContentVariation {
  x: {
    text: string;
    replies: number;
    retweets: number;
    likes: number;
  };
  instagram: {
    slides: string[];
    caption: string;
  };
  pinterest: {
    title: string;
    items: string[];
    saves: number;
  };
  linkedin: {
    text: string;
    reactions: number;
    comments: number;
  };
}

const VARIATIONS: ContentVariation[] = [
  {
    x: {
      text: "we just shipped AI-powered search and honestly it feels illegal\n\nyour users can now type \"show me customers who churned last month\" instead of writing SQL\n\nnatural language → instant results\n\nthe future of data access is conversational 🧵",
      replies: 47,
      retweets: 182,
      likes: 1243,
    },
    instagram: {
      slides: [
        "Why we killed the search bar",
        "Old way: write SQL, wait, debug, repeat",
        "New way: ask in plain English, get answers",
        "Built on transformer architecture",
        "Try it free — link in bio",
      ],
      caption: "Search should feel like a conversation, not a coding exercise. We just shipped the update that makes it happen. #AI #ProductUpdate",
    },
    pinterest: {
      title: "5 Ways NLP Search Saves Time",
      items: [
        "No SQL knowledge required",
        "Natural language queries in seconds",
        "Auto-complete suggestions",
        "Context-aware result filtering",
        "Export results with one click",
      ],
      saves: 847,
    },
    linkedin: {
      text: "Last year I watched a customer spend 20 minutes writing a SQL query to answer a simple question.\n\n\"Which users signed up last week but haven't activated?\"\n\nThat moment stuck with me.\n\nToday we shipped AI-powered search. You just type the question in plain English.\n\nNo syntax. No joins. No frustration.\n\nThe best tools disappear. They let you focus on decisions, not data retrieval.",
      reactions: 312,
      comments: 48,
    },
  },
  {
    x: {
      text: "hot take: most search UIs are built for developers, not users\n\nwe just shipped natural language search so your non-technical team can finally stop asking engineers for reports\n\n\"show me revenue by region last quarter\" → done\n\nno SQL. no tickets. no waiting.",
      replies: 63,
      retweets: 241,
      likes: 1891,
    },
    instagram: {
      slides: [
        "Your team deserves better search",
        "Before: file a ticket, wait 2 days for a report",
        "After: type what you need, get it instantly",
        "Works with your existing database",
        "Start free today",
      ],
      caption: "We built search for humans, not machines. Your whole team can now query data without writing a single line of code. #SaaS #AI",
    },
    pinterest: {
      title: "5 Ways NLP Search Saves Time",
      items: [
        "Skip the SQL learning curve",
        "Get answers in conversational English",
        "Smart autocomplete reduces typing",
        "Filter results by context automatically",
        "One-click data export to sheets",
      ],
      saves: 1203,
    },
    linkedin: {
      text: "Every week our support team asked engineering the same thing:\n\n\"Can someone pull the numbers for...\"\n\nIt was a 3-day turnaround for a 30-second question.\n\nSo we built natural language search directly into the product.\n\nNow anyone on the team types what they need and gets the answer immediately.\n\nThe unlock wasn't AI. It was removing the bottleneck between questions and answers.",
      reactions: 478,
      comments: 72,
    },
  },
  {
    x: {
      text: "shipped something today that made our entire CS team mass-react in Slack\n\nAI-powered search: type questions like you'd ask a colleague\n\n\"what were our top 10 features by usage this month?\"\n\nboom. instant answer. no dashboards. no filters.\n\nthis is the way.",
      replies: 38,
      retweets: 156,
      likes: 967,
    },
    instagram: {
      slides: [
        "We made search actually intuitive",
        "Step 1: Type your question naturally",
        "Step 2: AI interprets your intent",
        "Step 3: Get formatted results instantly",
        "The SQL-free future is here",
      ],
      caption: "Search that understands you. Not the other way around. Our latest update brings natural language queries to every user. #ProductLaunch #Tech",
    },
    pinterest: {
      title: "5 Ways NLP Search Saves Time",
      items: [
        "Zero technical expertise needed",
        "Ask questions in everyday language",
        "Intelligent query suggestions",
        "Results adapt to your role",
        "Share findings in one click",
      ],
      saves: 634,
    },
    linkedin: {
      text: "I used to think great search meant better filters and faster indexing.\n\nI was wrong.\n\nGreat search means the user never has to think about how to ask.\n\nWe just shipped natural language queries. You type like you talk. The system figures out the rest.\n\nEarly results: support tickets about \"how to find X\" dropped 60% in the first week.\n\nSometimes the best feature is removing the need to learn your product.",
      reactions: 256,
      comments: 34,
    },
  },
];

const PLATFORM_TABS: { key: Platform; label: string; icon: React.ReactNode }[] = [
  {
    key: 'x',
    label: 'X',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: 'pinterest',
    label: 'Pinterest',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function ShimmerCard() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/[0.06]" />
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-white/[0.06]" />
          <div className="h-2 w-16 rounded bg-white/[0.04]" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.06]" />
        <div className="h-3 w-5/6 rounded bg-white/[0.06]" />
        <div className="h-3 w-4/6 rounded bg-white/[0.04]" />
      </div>
      <div className="h-3 w-2/6 rounded bg-white/[0.04]" />
    </div>
  );
}

export default function InteractiveDemo() {
  const [activePlatform, setActivePlatform] = useState<Platform>('x');
  const [variationIndex, setVariationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const currentContent = VARIATIONS[variationIndex];

  const handleGenerate = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVariationIndex((prev) => (prev + 1) % VARIATIONS.length);
      setHasGenerated(true);
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);

  return (
    <section id="demo" className="relative py-20 md:py-28">
      <div className="max-w-[1320px] mx-auto px-4 md:px-[60px]">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white leading-tight">
            See it in action
          </h2>
          <p className="mt-4 text-[#848484] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Drop a product update. Watch FormatLab turn it into platform-native content across every channel.
          </p>
        </div>

        {/* Demo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left/Top Panel — Input */}
          <div className="bg-[#111315] rounded-[16px] border border-white/[0.06] p-6 flex flex-col">
            <label className="text-[#848484] text-sm font-medium mb-3 block">
              Product Update
            </label>
            <div className="bg-[#191919] rounded-[12px] border border-white/[0.06] p-4 flex-1 mb-5">
              <p className="text-white/80 text-sm leading-relaxed">
                We just shipped AI-powered search with natural language queries. Users can ask questions in plain English instead of writing SQL.
              </p>
            </div>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="bg-white text-black rounded-[12px] px-5 py-2.5 font-medium text-sm transition-all duration-200 hover:bg-white/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto self-start"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Content"
              )}
            </button>
            <p className="text-[#848484] text-xs mt-3">
              Preview mode — illustrative output
            </p>
          </div>

          {/* Right/Bottom Panel — Output */}
          <div className="bg-[#111315] rounded-[16px] border border-white/[0.06] flex flex-col overflow-hidden">
            {/* Tab Bar */}
            <div className="flex border-b border-white/[0.06] px-2">
              {PLATFORM_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActivePlatform(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px cursor-pointer ${activePlatform === tab.key ? "text-white border-violet-500" : "text-[#848484] border-transparent hover:text-white"}`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 min-h-[320px]">
              {isLoading ? (
                <ShimmerCard />
              ) : !hasGenerated && variationIndex === 0 ? (
                <div className="flex-1 flex flex-col">
                  {/* Show first variation as default preview */}
                  {activePlatform === 'x' && <XCard content={currentContent.x} />}
                  {activePlatform === 'instagram' && <InstagramCard content={currentContent.instagram} />}
                  {activePlatform === 'pinterest' && <PinterestCard content={currentContent.pinterest} />}
                  {activePlatform === 'linkedin' && <LinkedInCard content={currentContent.linkedin} />}
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {activePlatform === 'x' && <XCard content={currentContent.x} />}
                  {activePlatform === 'instagram' && <InstagramCard content={currentContent.instagram} />}
                  {activePlatform === 'pinterest' && <PinterestCard content={currentContent.pinterest} />}
                  {activePlatform === 'linkedin' && <LinkedInCard content={currentContent.linkedin} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Platform Cards ──────────────────────────────────────────────────────── */

function XCard({ content }: { content: ContentVariation['x'] }) {
  return (
    <div className="bg-[#191919] rounded-[12px] border border-white/[0.06] p-4">
      {/* Profile Row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
          FL
        </div>
        <div>
          <p className="text-white text-sm font-medium">FormatLab</p>
          <p className="text-[#848484] text-xs">@formatlab_user</p>
        </div>
      </div>
      {/* Tweet Text */}
      <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line mb-4">
        {content.text}
      </p>
      {/* Engagement Row */}
      <div className="flex items-center gap-6 pt-3 border-t border-white/[0.06]">
        <span className="flex items-center gap-1.5 text-[#848484] text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
          {content.replies}
        </span>
        <span className="flex items-center gap-1.5 text-[#848484] text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 014-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 01-4 4H3" />
          </svg>
          {content.retweets}
        </span>
        <span className="flex items-center gap-1.5 text-[#848484] text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          {content.likes.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function InstagramCard({ content }: { content: ContentVariation['instagram'] }) {
  return (
    <div className="bg-[#191919] rounded-[12px] border border-white/[0.06] overflow-hidden">
      {/* Gradient Header Slide */}
      <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 p-6 pb-8">
        <p className="text-white text-lg font-bold leading-snug">{content.slides[0]}</p>
        {/* Slide count */}
        <span className="absolute top-3 right-3 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          1/5
        </span>
      </div>
      {/* Slide Dots */}
      <div className="flex items-center justify-center gap-1.5 py-3 border-b border-white/[0.06]">
        {content.slides.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-violet-500" : "w-1.5 bg-white/20"}`} />
        ))}
      </div>
      {/* Bullet Points */}
      <div className="p-4 space-y-2">
        {content.slides.slice(1).map((slide, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-white/70">
            <span className="text-violet-400 font-bold mt-px shrink-0">{i + 2}.</span>
            <span>{slide}</span>
          </div>
        ))}
      </div>
      {/* Caption Preview */}
      <div className="px-4 pb-4">
        <p className="text-[#848484] text-xs leading-relaxed line-clamp-2">
          {content.caption}
        </p>
      </div>
    </div>
  );
}

function PinterestCard({ content }: { content: ContentVariation['pinterest'] }) {
  return (
    <div className="bg-[#191919] rounded-[12px] border border-white/[0.06] overflow-hidden">
      {/* Gradient Top */}
      <div className="bg-gradient-to-br from-violet-600/80 to-purple-900/60 p-5">
        <h4 className="text-white font-bold text-base leading-snug">{content.title}</h4>
      </div>
      {/* Checklist Items */}
      <div className="p-4 space-y-2">
        {content.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-white/[0.04] rounded-lg px-3 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-violet-400">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white/70 text-xs">{item}</span>
          </div>
        ))}
      </div>
      {/* Saves Count */}
      <div className="px-4 pb-4 flex items-center gap-1.5 text-[#848484] text-xs">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
        {content.saves.toLocaleString()} saves
      </div>
    </div>
  );
}

function LinkedInCard({ content }: { content: ContentVariation['linkedin'] }) {
  return (
    <div className="bg-[#191919] rounded-[12px] border border-white/[0.06] p-4">
      {/* Profile */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
          FL
        </div>
        <div>
          <p className="text-white text-sm font-medium">FormatLab</p>
          <p className="text-[#848484] text-[11px]">Product Updates · 2h</p>
        </div>
      </div>
      {/* Post Text */}
      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line mb-4">
        {content.text}
      </p>
      {/* Engagement Bar */}
      <div className="flex items-center gap-4 pt-3 border-t border-white/[0.06]">
        <span className="flex items-center gap-1.5 text-[#848484] text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
            <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
          {content.reactions}
        </span>
        <span className="flex items-center gap-1.5 text-[#848484] text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
          {content.comments}
        </span>
      </div>
    </div>
  );
}
