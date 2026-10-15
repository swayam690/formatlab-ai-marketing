'use client';

const stats = [
  { label: 'Total Reach', value: '142.8K', change: '+23%' },
  { label: 'Engagement', value: '4.7%', change: '+0.8%' },
  { label: 'Website Visits', value: '3,240', change: '+45%' },
  { label: 'Trial Signups', value: '127', change: '+31%' },
];

const contentRows = [
  {
    title: 'Product demo thread',
    platform: 'X',
    platformColor: '#ffffff',
    reach: '24.1K',
    engagements: '890',
    signups: '34',
  },
  {
    title: 'How-to carousel',
    platform: 'Instagram',
    platformColor: '#E1306C',
    reach: '31.2K',
    engagements: '420',
    signups: '18',
  },
  {
    title: 'Founder story',
    platform: 'LinkedIn',
    platformColor: '#0A66C2',
    reach: '18.7K',
    engagements: '1,240',
    signups: '52',
  },
];

export default function Analytics() {
  return (
    <section id="analytics" className="relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 md:px-[60px] py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white leading-tight mb-4">
            See what actually matters
          </h2>
          <p className="text-[#848484] text-base sm:text-lg max-w-xl mx-auto">
            Connect social reach to business results. Go beyond vanity metrics.
          </p>
        </div>

        {/* Dashboard */}
        <div className="space-y-4">
          {/* Top Row — Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#111315] border border-white/[0.06] rounded-[12px] p-5"
              >
                <p className="text-[#848484] text-xs uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-white text-2xl md:text-3xl font-light" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {stat.value}
                </p>
                <span className="inline-block mt-2 text-xs rounded-full px-2 py-0.5 bg-emerald-500/10 text-emerald-400">
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Middle — SVG Line Chart */}
          <div className="bg-[#111315] border border-white/[0.06] rounded-[16px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm font-medium">Content Performance</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span className="text-[#848484] text-xs">Impressions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-[#848484] text-xs">Tracked Visits</span>
                </div>
              </div>
            </div>

            <svg viewBox="0 0 600 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="40" y1={y} x2="570" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}

              {/* Impressions area fill */}
              <polygon
                points="40,155 115,140 190,128 265,110 340,95 415,78 490,60 565,38 565,175 40,175"
                fill="url(#violetGrad)"
              />
              {/* Impressions line */}
              <polyline
                points="40,155 115,140 190,128 265,110 340,95 415,78 490,60 565,38"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Tracked Visits area fill */}
              <polygon
                points="40,168 115,160 190,155 265,145 340,138 415,125 490,110 565,85 565,175 40,175"
                fill="url(#emeraldGrad)"
              />
              {/* Tracked Visits line */}
              <polyline
                points="40,168 115,160 190,155 265,145 340,138 415,125 490,110 565,85"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points — Impressions */}
              {[
                [40, 155], [115, 140], [190, 128], [265, 110],
                [340, 95], [415, 78], [490, 60], [565, 38],
              ].map(([cx, cy]) => (
                <circle key={`v-${cx}`} cx={cx} cy={cy} r="3" fill="#8B5CF6" />
              ))}

              {/* Data points — Tracked Visits */}
              {[
                [40, 168], [115, 160], [190, 155], [265, 145],
                [340, 138], [415, 125], [490, 110], [565, 85],
              ].map(([cx, cy]) => (
                <circle key={`e-${cx}`} cx={cx} cy={cy} r="3" fill="#10b981" />
              ))}

              {/* X-axis labels */}
              {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'].map(
                (label, i) => (
                  <text
                    key={label}
                    x={40 + i * 75}
                    y="195"
                    fill="#848484"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                )
              )}
            </svg>
          </div>

          {/* Bottom — Mini Table */}
          <div className="bg-[#111315] border border-white/[0.06] rounded-[12px] overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-5 bg-[#0d0e10] px-5 py-3">
              <span className="text-[#848484] text-xs uppercase tracking-wider">Content</span>
              <span className="text-[#848484] text-xs uppercase tracking-wider">Platform</span>
              <span className="text-[#848484] text-xs uppercase tracking-wider text-right">Reach</span>
              <span className="text-[#848484] text-xs uppercase tracking-wider text-right">Engagements</span>
              <span className="text-[#848484] text-xs uppercase tracking-wider text-right">Signups</span>
            </div>

            {/* Mobile header */}
            <div className="sm:hidden bg-[#0d0e10] px-5 py-3">
              <span className="text-[#848484] text-xs uppercase tracking-wider">Top Content</span>
            </div>

            {/* Data rows */}
            {contentRows.map((row, idx) => (
              <div
                key={row.title}
                className={`grid grid-cols-2 sm:grid-cols-5 gap-y-1 sm:gap-y-0 px-5 py-3.5 ${idx < contentRows.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
              >
                <span className="text-white text-sm col-span-2 sm:col-span-1">{row.title}</span>
                <span className="flex items-center gap-1.5 text-[#848484] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: row.platformColor }} />
                  {row.platform}
                </span>
                <span className="text-white text-sm text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{row.reach}</span>
                <span className="text-white text-sm text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{row.engagements}</span>
                <span className="text-white text-sm text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>{row.signups}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[#848484]/50 text-xs text-center mt-8">
          Illustrative dashboard — metric availability varies by platform
        </p>
      </div>
    </section>
  );
}
