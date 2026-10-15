'use client';

const formats = [
  {
    emoji: '\u{1F602}',
    name: 'Developer Humor',
    description: 'Relatable coding moments adapted to showcase your product.',
    platforms: ['X', 'Instagram', 'Threads'],
    hook: `me: I will just quickly check the docs...`,
  },
  {
    emoji: '\u2728',
    name: 'Before & After',
    description: 'Transformation stories showing the problem and your solution.',
    platforms: ['Instagram', 'LinkedIn', 'Pinterest'],
    hook: 'What [task] looked like before vs after',
  },
  {
    emoji: '\u{1F52E}',
    name: 'Unexpected Discovery',
    description: 'Hook-driven reveals that spark curiosity.',
    platforms: ['X', 'TikTok', 'Reels'],
    hook: 'I did not expect this tool to do this...',
  },
  {
    emoji: '\u{1F4DA}',
    name: 'Tutorial Walkthrough',
    description: 'Step-by-step educational content.',
    platforms: ['Pinterest', 'YouTube', 'Blog'],
    hook: 'How to [solve problem] in 3 steps',
  },
  {
    emoji: '\u{1F680}',
    name: 'Founder Story',
    description: 'Build-in-public narratives that create trust.',
    platforms: ['LinkedIn', 'X', 'Threads'],
    hook: 'I quit my job to build this. Here is what happened...',
  },
  {
    emoji: '\u{1F4CA}',
    name: 'Educational Carousel',
    description: 'Multi-slide visual explainers that teach while promoting.',
    platforms: ['Instagram', 'LinkedIn', 'Pinterest'],
    hook: '5 things nobody tells you about [topic]',
  },
];

export default function FormatLibrary() {
  return (
    <section id="format-library" className="relative bg-[#08090a]">
      <div className="mx-auto max-w-[1320px] px-4 md:px-[60px] py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white tracking-tight">
            The Format Library
          </h2>
          <p className="mt-4 text-[#848484] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {`Structured creative patterns \u2014 not just templates. Each format captures the hook, narrative, and emotional angle that makes content work.`}
          </p>
        </div>

        {/* Format Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formats.map((fmt) => (
            <div
              key={fmt.name}
              className="bg-[#111315] border border-white/[0.06] rounded-[16px] p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-1"
            >
              <div>
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{fmt.emoji}</span>
                  <h3 className="text-white font-medium text-lg">{fmt.name}</h3>
                </div>

                {/* Description */}
                <p className="text-[#848484] text-sm leading-relaxed mb-5">
                  {fmt.description}
                </p>
              </div>

              <div>
                {/* Platform Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {fmt.platforms.map((p) => (
                    <span
                      key={p}
                      className="bg-[#212121] text-[#848484] text-xs rounded-full px-2.5 py-1"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Example Hook */}
                <p className="italic text-violet-400/70 text-xs font-mono leading-relaxed">
                  {`"${fmt.hook}"`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-[#848484]/60 text-xs text-center mt-8 max-w-2xl mx-auto leading-relaxed">
          {`FormatLab generates original content using each format\u2019s structure \u2014 it never copies another creator\u2019s media or text.`}
        </p>
      </div>
    </section>
  );
}
