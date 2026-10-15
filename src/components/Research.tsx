const pillars = [
  {
    concept: 'Processing Fluency',
    emoji: '🧠',
    description:
      "People process information more easily when it follows recognizable structures. We use familiar content formats to introduce unfamiliar products.",
    citation: 'Reber, Schwarz & Winkielman, 2004',
    link: 'https://doi.org/10.1207/s15327957pspr0804_3',
  },
  {
    concept: 'Mere-Exposure Effect',
    emoji: '🔁',
    description:
      "Repeated, varied exposure increases familiarity and recognition. Consistent presence across platforms gives your brand more opportunities to be noticed.",
    citation: 'Montoya et al., 2017',
    link: 'https://pubmed.ncbi.nlm.nih.gov/28263645/',
  },
  {
    concept: 'Content Diffusion',
    emoji: '🚀',
    description:
      "Emotional arousal, surprise, and usefulness influence whether content gets shared. We optimize for the engagement signals that research suggests matter.",
    citation: 'Berger & Milkman, 2012',
    link: 'https://doi.org/10.1509/jmr.10.0353',
  },
];

export default function Research() {
  return (
    <section
      id="research"
      className="relative bg-gradient-to-b from-[#08090a] via-[#0d0a14] to-[#08090a]"
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-[60px] py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[32px] sm:text-[40px] font-light text-white leading-tight mb-4">
            Research-informed, not hype-driven
          </h2>
          <p className="text-[#848484] text-base sm:text-lg max-w-xl mx-auto">
            Every design choice maps back to peer-reviewed behavioral science — not trend chasing.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.concept}
              className="bg-[#111315]/80 backdrop-blur border border-white/[0.06] rounded-[16px] p-8 transition-colors duration-300 hover:border-violet-500/20"
            >
              <div className="text-3xl mb-4">{pillar.emoji}</div>
              <h3 className="text-white text-lg font-medium mb-3">{pillar.concept}</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
                {pillar.description}
              </p>
              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-[#848484] text-xs mb-1">{pillar.citation}</p>
                <a
                  href={pillar.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 text-xs transition-colors duration-200"
                >
                  View paper ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Blockquote */}
        <blockquote className="border-l-2 border-violet-500/50 pl-6 max-w-2xl mx-auto mb-8">
          <p className="text-[#a1a1aa] text-lg italic leading-relaxed">
            {`"People already recognize many content structures. We use those structures to communicate unfamiliar products, then test which messages help audiences notice, understand, and remember the brand."`}
          </p>
        </blockquote>

        {/* Disclaimer */}
        <p className="text-[#848484]/50 text-xs text-center mt-8">
          These research findings inform our product philosophy. They do not guarantee specific results for any individual product or campaign.
        </p>
      </div>
    </section>
  );
}
