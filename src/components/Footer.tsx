const productLinks = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Format Library', href: '#format-library' },
  { label: 'Channels', href: '#channels' },
  { label: 'Pricing', href: '#' },
]

const researchLinks = [
  {
    label: 'Processing Fluency (Reber et al.)',
    href: 'https://doi.org/10.1207/s15327957pspr0804_3',
    external: true,
  },
  {
    label: 'Mere-Exposure Effect (Montoya et al.)',
    href: 'https://pubmed.ncbi.nlm.nih.gov/28263645/',
    external: true,
  },
  {
    label: 'Content Diffusion (Berger & Milkman)',
    href: 'https://doi.org/10.1509/jmr.10.0353',
    external: true,
  },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Columns grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 – Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="inline-block text-xl font-bold text-white tracking-tight">
              Format<span className="text-violet-400">Lab</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 max-w-xs">
              AI-powered marketing for solo founders
            </p>
            <p className="mt-6 text-xs text-gray-500">
              © {new Date().getFullYear()} FormatLab. All rights reserved.
            </p>
          </div>

          {/* Column 2 – Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Research */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Research
            </h3>
            <ul className="space-y-3">
              {researchLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/10" />

        {/* Bottom bar */}
        <p className="mt-6 text-xs text-gray-500 leading-relaxed text-center max-w-3xl mx-auto">
          FormatLab uses official platform APIs and authorized publishing
          providers. Content generation creates original work—it does not copy
          other creators&apos; media or text.
        </p>
      </div>
    </footer>
  )
}
