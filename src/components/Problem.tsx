'use client';

export default function Problem() {
  const painPoints = [
    {
      num: '01',
      title: 'You keep shipping, but marketing is always inconsistent',
      description:
        'You ship a new feature or fix bugs every day. But marketing happens in erratic bursts—a launch day spike followed by weeks of radio silence while you return to coding.',
      tag: 'Distribution Gap',
    },
    {
      num: '02',
      title: 'Every platform wants a completely different language',
      description:
        'X demands quick witty hooks and relatable dev banter. LinkedIn expects founder vulnerability and business outcomes. Instagram demands 5-slide carousels. Reposting the same link everywhere fails.',
      tag: 'Format Mismatch',
    },
    {
      num: '03',
      title: 'Trend research eats hours of high-leverage building time',
      description:
        'Figuring out what narrative structures are currently circulating takes hours of feed scrolling. That is valuable engineering time stolen from your product roadmap.',
      tag: 'Attention Drain',
    },
    {
      num: '04',
      title: 'Posting without measurement is expensive guesswork',
      description:
        'Without a clear testing loop connecting content styles to actual website visits and trial activations, you never learn which formats actually resonate with real buyers.',
      tag: 'Attribution Blindspot',
    },
    {
      num: '05',
      title: 'Launches get attention once, then disappear from memory',
      description:
        'A Product Hunt or Hacker News launch brings a brief burst of eyeballs. But without a continuous, varied drumbeat of content, your product vanishes from the conversation within 72 hours.',
      tag: 'Decay Curve',
    },
  ];

  return (
    <section id="problem" className="relative py-20 sm:py-28 lg:py-32 bg-[#FBFBFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E4DE] bg-white px-3.5 py-1 text-xs font-semibold text-[#141313] shadow-xs">
            <span>The Solo Founder Reality</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141313]">
            Marketing isn&apos;t broken.{' '}
            <span className="block text-[#6E6D68] mt-1 font-medium">
              You just don&apos;t have 40 hours a week for it.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D68] leading-relaxed">
            Solo founders and bootstrapped developers are world-class builders. 
            The barrier isn&apos;t a lack of effort—it&apos;s having to run an entire creative marketing agency while writing code.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item, index) => (
            <div
              key={item.num}
              className={`rounded-[22px] border border-[#E5E4DE] bg-white p-7 transition-all duration-200 hover:border-[#141313]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-violet-700 bg-violet-50 border border-violet-100 px-2.5 py-0.5 rounded-full">
                    {item.num} · {item.tag}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#E5E4DE]" />
                </div>

                <h3 className="mt-5 text-lg sm:text-xl font-bold text-[#141313] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#6E6D68] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E4DE]/60 flex items-center gap-2 text-[11px] font-mono text-[#A8A7A0]">
                <span>Impact on growth:</span>
                <span className="text-[#141313] font-medium">Compounding opportunity loss</span>
              </div>
            </div>
          ))}

          {/* Solution Callout Card */}
          <div className="rounded-[22px] border border-violet-200 bg-gradient-to-br from-violet-50/50 via-white to-violet-50/20 p-7 flex flex-col justify-between md:col-span-2 lg:col-span-1 shadow-xs">
            <div>
              <span className="font-mono text-xs font-bold text-violet-700 bg-white border border-violet-200 px-2.5 py-0.5 rounded-full">
                The Shift
              </span>
              <h3 className="mt-5 text-xl font-bold text-[#141313] tracking-tight">
                What if your features marketed themselves?
              </h3>
              <p className="mt-3 text-sm text-[#6E6D68] leading-relaxed">
                Whenever you ship a commit, record a 30-second screen clip, or update your changelog, FormatLab turns it into a multi-channel campaign.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-violet-100">
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors"
              >
                <span>See the 4-step loop</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
