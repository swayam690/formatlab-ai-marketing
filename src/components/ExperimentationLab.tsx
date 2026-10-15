'use client';

export default function ExperimentationLab() {
  const variants = [
    {
      id: 'A',
      label: 'Variant A',
      name: 'Relatable Meme',
      impressions: '12,400',
      engagement: '4.2%',
      clicks: '340',
      signups: 8,
      status: 'Active',
      statusClass: 'bg-[#212121] text-[#848484]',
      barHeight: 35,
      barColor: 'bg-violet-500/30',
      cardBorder: 'border-white/[0.06]',
    },
    {
      id: 'B',
      label: 'Variant B',
      name: 'Product Demo',
      impressions: '8,200',
      engagement: '6.8%',
      clicks: '520',
      signups: 23,
      status: 'Leading',
      statusClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      barHeight: 100,
      barColor: 'bg-emerald-500/50',
      cardBorder: 'border-emerald-500/20',
    },
    {
      id: 'C',
      label: 'Variant C',
      name: 'Educational Carousel',
      impressions: '15,100',
      engagement: '3.1%',
      clicks: '280',
      signups: 11,
      status: 'Active',
      statusClass: 'bg-[#212121] text-[#848484]',
      barHeight: 48,
      barColor: 'bg-violet-500/30',
      cardBorder: 'border-white/[0.06]',
    },
  ];

  const maxSignups = 23;

  return (
    <section id="experimentation" className="relative bg-[#08090a] py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-4 md:px-[60px]">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white leading-tight tracking-tight">
            Built-in experimentation
          </h2>
          <p className="mt-4 text-base text-[#848484] leading-relaxed">
            Compare creative variables. Find what resonates. Make decisions with data.
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="mt-14">
          {/* Experiment Header Card */}
          <div className="rounded-[16px] border border-white/[0.06] bg-[#111315] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-2 rounded-full bg-violet-500 animate-pulse" />
                <div>
                  <h3 className="text-base font-medium text-white">Feature Launch: Natural Language Search</h3>
                  <p className="text-sm text-[#848484] mt-0.5">Oct 7 — Oct 13, 2024</p>
                </div>
              </div>
              <span className="text-xs text-[#848484] font-medium">3 variants running</span>
            </div>
          </div>

          {/* Variant Cards */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {variants.map((v) => {
              const barPercent = Math.round((v.signups / maxSignups) * 100);
              const isLeading = v.status === 'Leading';

              return (
                <div key={v.id} className={`rounded-[12px] border ${v.cardBorder} bg-[#111315] p-5 transition-all duration-200`} style={isLeading ? { boxShadow: '0 0 30px rgba(16, 185, 129, 0.04)' } : undefined}>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#848484]">{v.label}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${v.statusClass}`}>
                      {v.status}
                    </span>
                  </div>

                  <h4 className="mt-2 text-sm font-medium text-white">{v.name}</h4>

                  {/* Metrics */}
                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#848484]">Impressions</span>
                      <span className="text-xs text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{v.impressions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#848484]">Engagement</span>
                      <span className="text-xs text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{v.engagement}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#848484]">Clicks</span>
                      <span className="text-xs text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{v.clicks}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <span className={`text-xs font-medium ${isLeading ? 'text-emerald-400' : 'text-violet-400'}`}>Signups</span>
                      <span className={`text-lg font-medium ${isLeading ? 'text-emerald-400' : 'text-white'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>{v.signups}</span>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="mt-4">
                    <div className="flex items-end h-20 gap-0">
                      <div className="w-full flex items-end justify-center">
                        <div className={`w-full rounded-t-[4px] ${v.barColor} transition-all duration-500`} style={{ height: `${barPercent}%` }} />
                      </div>
                    </div>
                    <div className="mt-1 text-center">
                      <span className="text-[10px] text-[#848484]">Relative signups</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendation Card */}
          <div className="mt-4 rounded-[12px] border border-violet-500/20 bg-[#111315] p-5">
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                Product demonstrations generated 2.8x more tracked signups than meme content. Consider testing two new demo variations with different hooks.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-center text-xs text-[#848484]/50">
            Illustrative data — not real customer results
          </p>
        </div>
      </div>
    </section>
  );
}
