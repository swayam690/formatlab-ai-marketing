# FormatLab — Autonomous AI Marketing Engine for Solo Founders 🚀⚡

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-Video_Engine-007808.svg?style=for-the-badge&logo=ffmpeg&logoColor=white)](https://ffmpeg.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)

> **"You build the product. We keep it in the conversation."**  
> An intelligent marketing automation engine designed specifically for solo founders, indie hackers, and bootstrapped SaaS builders who ship code daily but struggle with consistent social media distribution.

---

## 💡 The Core Problem & Solution

Solo founders spend 90% of their energy engineering great products, leaving little time to write threads, edit videos, decipher platform algorithms, or research social trends. 

**FormatLab** introduces a complete closed-loop bridge between **product development** and **marketing distribution**:
1. **Explain Once**: Provide your website URL, product value prop, and brand voice.
2. **Continuous Updates**: Drop feature updates, screenshots, demo clips, or changelogs.
3. **Multi-Channel Adaptation**: Generates platform-native variations (not identical cross-posts) for **X (Twitter)**, **Instagram**, **LinkedIn**, and **Pinterest**.
4. **Learn & Improve**: Built-in experimentation tracks which hooks, formats, and angles generate real website conversions.

---

## 🧠 Research-Informed Marketing Philosophy

Rather than relying on generic AI hype or promising guaranteed virality, FormatLab is grounded in established cognitive psychology and viral content diffusion principles:

1. **Processing Fluency** (*Reber, Schwarz & Winkielman, 2004*): Audiences process unfamiliar products faster when presented through recognizable, familiar content structures (e.g. before/after comparisons, developer humor, educational carousels).
2. **Mere-Exposure Effect** (*Montoya et al., 2017*): Repeated, varied exposures across multiple touchpoints increase brand recall and organic trust.
3. **Content Diffusion & Arousal** (*Berger & Milkman, 2012*): Useful, surprising, and emotionally resonant hooks drive higher organic sharing rates.

---

## 🏗️ System Architecture & Subsystems

```mermaid
flowchart TD
    Founder([Solo Founder / Developer])
    
    subgraph Frontend [FormatLab Next.js 15 Landing Application]
        Hero[Cinematic Hero & Prompt Bar]
        Demo[Interactive Multi-Platform Playground]
        FormatLib[Viral Format Pattern Catalog]
        ExperimentLab[A/B Testing & Attribution Lab]
        Analytics[Unified Metrics Dashboard]
    end
    
    subgraph BackendEngine [Reference Video Core (Python & FFmpeg)]
        Gemini[Gemini 1.5/Flash Multimodal Understanding]
        FFprobe[FFprobe Media Analyzer]
        Planner[Deterministic Edit Planner]
        Renderer[FFmpeg Hardware Accelerated Render Engine]
    end
    
    Founder -->|Feature Updates / Clips| Hero
    Founder -->|Experiment Configuration| Demo
    BackendEngine -->|Automated Video Cuts & Renders| Frontend
```

---

## 📁 Repository Structure

```
landing-page/
├── src/
│   ├── app/
│   │   ├── globals.css         # Compiled Tailwind v4 styles
│   │   ├── globals.source.css  # Dark cinematic design system tokens & animations
│   │   ├── layout.tsx          # Root Next.js layout & metadata
│   │   └── page.tsx            # Main presentation orchestrating all 13 sections
│   ├── components/
│   │   ├── Navigation.tsx      # Sticky blur glass navigation bar
│   │   ├── Hero.tsx            # Cinematic hero with interactive prompt mockup
│   │   ├── InteractiveDemo.tsx # Live platform switcher (X, IG, Pinterest, LinkedIn)
│   │   ├── Problem.tsx         # Bento grid highlighting founder pain points
│   │   ├── HowItWorks.tsx      # 3-step workflow pipeline
│   │   ├── FormatLibrary.tsx   # Structured viral pattern cards
│   │   ├── OneProductManyStories.tsx # 1-to-7 multi-format adaptation showcase
│   │   ├── ExperimentationLab.tsx    # Live variant performance comparison
│   │   ├── Analytics.tsx       # SVG vector performance graphs & tables
│   │   ├── Research.tsx        # Cognitive science pillars & DOI citations
│   │   ├── Channels.tsx        # Platform support roadmap
│   │   ├── FinalCTA.tsx        # LocalStorage waitlist capture modal
│   │   └── Footer.tsx          # Comprehensive navigation & references
│   └── lib/
│       └── brand.ts            # Centralized brand & typography configuration
├── core_content/               # Reference Video Core (Python backend engine)
│   ├── src/reference_video_core/  # Media probing, edit planner, and web UI
│   ├── tests/                  # Pytest verification suites
│   ├── pyproject.toml          # Python package definitions
│   └── README.md               # Backend engine documentation
├── package.json                # Next.js 15, React 19, Tailwind v4
└── tailwind.config.js          # Design system extensions
```

---

## 🚀 Quickstart Guide

### 1. Running the Next.js Frontend

```bash
# Clone the repository
git clone https://github.com/swayam690/formatlab-ai-marketing.git
cd formatlab-ai-marketing

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### 2. Running the Reference Video Backend Core

```bash
cd core_content

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install with optional AI dependencies
pip install -e '.[ai]'

# Run the local web GUI
export GEMINI_API_KEY='your-gemini-api-key'
PYTHONPATH=src python -m reference_video_core.web
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

