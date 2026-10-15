'use client';

interface Channel {
  name: string;
  description: string;
  note?: string;
  icon: React.ReactNode;
}

const tier1Channels: Channel[] = [
  {
    name: 'X',
    description: 'Short posts, hooks, threads, developer memes',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6L14.5 17.5M14.5 17.5L6 26H9L16 20L14.5 17.5ZM26 6L17.5 17.5M17.5 17.5L26 26H23L16 20L17.5 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    description: 'Reels, carousels, image posts',
    note: 'Requires eligible professional account',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="22.5" cy="9.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    description: 'Pins, visual explainers, checklists',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6C11.58 6 8 9.58 8 14C8 17.12 9.88 19.82 12.56 21.08L14 26L15.5 20.5C15.66 20.52 15.83 20.53 16 20.53C20.42 20.53 24 16.95 24 12.53C24 9.58 20.42 6 16 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    description: 'Founder stories, B2B content, demos',
    note: 'Publishing permissions under review',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M11 14V22M11 10V10.01M15 22V17C15 15.34 16.34 14 18 14C19.66 14 21 15.34 21 17V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const tier2Channels: Channel[] = [
  {
    name: 'Threads',
    description: 'Short-form text and visual conversations',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M13 13C14.5 11.5 18 11 19 13C20 15 18 16 16 16C14 16 12 17 13 19C14 21 17.5 20.5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Facebook Pages',
    description: 'Visual campaigns and additional reach',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8H20C21.1 8 22 8.9 22 10V22C22 23.1 21.1 24 20 24H12C10.9 24 10 23.1 10 22V10C10 8.9 10.9 8 12 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 24V18H19L19.5 15H17V13.5C17 12.95 17.45 12.5 18 12.5H19.5V10H18C16.34 10 15 11.34 15 13V15H13.5V18H15V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Website/Blog',
    description: 'Long-form articles, SEO content',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="16" cy="16" rx="4" ry="10" stroke="currentColor" strokeWidth="2" />
        <path d="M6 16H26" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

const tier3Channels: Channel[] = [
  {
    name: 'TikTok',
    description: 'Short-form video content',
    note: 'Requires API approval',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8V20C20 22.21 18.21 24 16 24C13.79 24 12 22.21 12 20C12 17.79 13.79 16 16 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 8C21 10 23 12 26 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'YouTube Shorts',
    description: 'Short-form video repurposing',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="9" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M14 13L20 16L14 19V13Z" fill="currentColor" />
      </svg>
    ),
  },
];

function ChannelCard({
  channel,
  badge,
  badgeClass,
  dimmed,
}: {
  channel: Channel;
  badge: string;
  badgeClass: string;
  dimmed?: boolean;
}) {
  return (
    <div className={`group bg-[#111315] border border-white/[0.06] rounded-[16px] p-6 transition-all duration-300 ease-out hover:border-white/[0.12]${dimmed ? ' opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-white">{channel.icon}</div>
        <span className={`${badgeClass} text-xs rounded-full px-2.5 py-0.5`}>{badge}</span>
      </div>
      <h3 className="text-white font-medium text-base">{channel.name}</h3>
      <p className="text-[#848484] text-sm mt-1.5 leading-relaxed">{channel.description}</p>
      {channel.note && (
        <p className="text-[#848484]/50 text-xs italic mt-3">{channel.note}</p>
      )}
    </div>
  );
}

export default function Channels() {
  return (
    <section id="channels" className="relative bg-[#08090a]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-[60px] py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white leading-tight">
            Your channels, orchestrated
          </h2>
          <p className="text-[#848484] text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            FormatLab publishes natively across every platform you care about — each piece tailored to how that channel works, not just resized.
          </p>
        </div>

        {/* Tier 1 — Initial Targets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {tier1Channels.map((channel) => (
            <ChannelCard
              key={channel.name}
              channel={channel}
              badge="Launch"
              badgeClass="bg-violet-500/15 text-violet-400 border border-violet-500/20"
            />
          ))}
        </div>

        {/* Tier 2 — Planned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {tier2Channels.map((channel) => (
            <ChannelCard
              key={channel.name}
              channel={channel}
              badge="Planned"
              badgeClass="bg-[#212121] text-[#848484]"
            />
          ))}
        </div>

        {/* Tier 3 — Later */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {tier3Channels.map((channel) => (
            <ChannelCard
              key={channel.name}
              channel={channel}
              badge="Coming Later"
              badgeClass="bg-[#1a1a1a] text-[#555]"
              dimmed
            />
          ))}
        </div>
      </div>
    </section>
  );
}
