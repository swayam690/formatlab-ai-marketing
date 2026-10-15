// ─── FormatLab Brand Configuration ───────────────────────────────────────────
// Centralized brand values — dark cinematic design system.

const navLinks = [
  { label: 'Product', href: '#demo' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Formats', href: '#format-library' },
  { label: 'Research', href: '#research' },
  { label: 'Channels', href: '#channels' },
] as const;

export const brand = {
  name: 'FormatLab',
  workingName: 'FormatLab',
  tagline: 'You build the product. We keep it in the conversation.',
  eyebrow: 'MARKETING ENGINE FOR SOLO FOUNDERS',
  description:
    'Drop your website, feature updates, screenshots, or demo clips. FormatLab turns them into original, platform-native content, publishes across your channels, and learns what brings people to your product.',
  supportingLine:
    'Built for founders who would rather ship features than stare at a blank content calendar.',
  url: 'https://formatlab.io',

  // ── Colors (Dark Theme) ────────────────────────────────────────────────────
  colors: {
    accent: {
      hex: '#8B5CF6',
      dark: '#7C3AED',
      rgb: '139, 92, 246',
    },
    background: {
      hex: '#08090a',
    },
    foreground: {
      hex: '#ffffff',
    },
    muted: {
      hex: '#848484',
    },
    surface: {
      hex: '#111315',
    },
    surfaceHover: {
      hex: '#212121',
    },
    border: {
      value: 'rgba(255, 255, 255, 0.08)',
    },
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: Object.assign([...navLinks], {
    links: [...navLinks],
  }),

  // ── CTAs ──────────────────────────────────────────────────────────────────
  cta: {
    primary: 'Turn my product into content',
    secondary: 'See how it works',
    nav: 'Get started',
    hero: 'Start creating',
    heroSub: 'Built for founders who would rather ship features than stare at a blank content calendar.',
    earlyAccess: 'Join Early Access',
    footer: 'Keep shipping. Never start your marketing from zero again.',
  },

  // ── Social Links ──────────────────────────────────────────────────────────
  social: {
    twitter: 'https://twitter.com/formatlab',
    github: 'https://github.com/formatlab',
    linkedin: 'https://linkedin.com/company/formatlab',
  },
} as const;

export const BRAND = brand;

export type NavItem = (typeof navLinks)[number];
