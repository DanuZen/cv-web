# Rian Septiawan — Interactive Portfolio & CV Web

<div align="center">
  <h3>Full-Stack Cross-Platform Developer & Tech Leader</h3>
  <p>Director at PT Mbois Solusi Global &bull; Founder of Howarts Studio</p>

  <p>
    <a href="https://github.com/DanuZen/cv-web">
      <img src="https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    </a>
    <a href="https://react.dev">
      <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    </a>
    <a href="https://vercel.com">
      <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel" />
    </a>
  </p>
</div>

---

## 🌟 Overview

Interactive, high-performance personal portfolio and curriculum vitae website for **Rian Septiawan**. Engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**, featuring real-time AI cursor swarm animations, dynamic theme adaptation, synthesized Web Audio effects, and an MDX-powered blog.

---

## ✨ Key Features

- **Multi-Agent Swarm Simulation**: Ambient AI cursor agents (*Ada, Alan, Leo, Maya, Grace*) collaborate in real-time, flying across sections, inspecting elements, and typing content dynamically.
- **Dynamic Typing & Cursor Animations**: Intelligent `TypingAnimation` system with synchronized blinking cursors, sound feedback, and viewport-aware triggers.
- **Synthesized Audio System**: Procedural audio generator using the native Web Audio API for typing sounds and interaction cues with one-click sound toggles.
- **Adaptive Dark / Light Themes**: Seamless theme switching with high-contrast badge accents, inverted action buttons, and glowing gradients.
- **Top Flickering Grid & Edge Blur**: Edge-to-edge canvas grid pattern with progressive Apple-style bottom blur behind the floating dock navbar.
- **Interactive Project & Experience Showcase**: Expandable work history accordions, interactive project showcase cards with hover effects, and certification credentials.
- **MDX Blog Engine**: Automated blog processing using `@content-collections` with syntax highlighting via `rehype-pretty-code` and `shiki`.
- **Fully Responsive Architecture**: Pixel-perfect design tuned for mobile viewports (smart 2-line header descriptions, compact cards) up to ultra-wide displays.

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) & [Magic UI](https://magicui.design/)
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVG brand glyphs
- **Content Management**: [@content-collections](https://www.content-collections.dev/)

---

## 📂 Project Structure

```text
cv-web/
├── content/                     # MDX blog posts
├── docs/                        # Profile documentation & CV specifications
├── public/                      # Static assets, fonts, icons, and logos
├── src/
│   ├── app/                     # Next.js 16 App Router pages & metadata
│   │   ├── blog/                # Blog routes and dynamic post viewer
│   │   ├── globals.css          # Global styles & Tailwind v4 theme tokens
│   │   ├── layout.tsx           # Root layout with FlickeringGrid & Navbar
│   │   └── page.tsx             # Main CV page combining all sections
│   ├── components/              # Modular UI components
│   │   ├── magicui/             # Magic UI components (BlurFade, FlickeringGrid)
│   │   ├── section/             # Dedicated sections (Work, Projects, Skills, Contact)
│   │   ├── swarm/               # AI agent cursor swarm simulation & audio engine
│   │   └── ui/                  # Base shadcn primitives (Accordion, Badge, Tooltip)
│   ├── data/
│   │   └── resume.tsx           # Single source of truth for all CV data
│   └── lib/                     # Utility helpers (cn, utils)
└── content-collections.ts       # MDX collection schema definition
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `>= 18.0.0`
- [pnpm](https://pnpm.io/) (recommended package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DanuZen/cv-web.git
   cd cv-web
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or specified local port).

---

## ⚙️ Customization

All personal details, employment history, education, skills, and projects are centralized in a single configuration file:

👉 [src/data/resume.tsx](./src/data/resume.tsx)

Edit this file to immediately update titles, descriptions, dates, URLs, and social links across the entire site.

---

## 📦 Production Build

To test the production build locally:

```bash
# Run lint check
pnpm lint

# Create production build
pnpm build

# Preview production server
pnpm start
```

---

## 📬 Contact & Connect

- **Name**: Rian Septiawan
- **Role**: Director @ PT Mbois Solusi Global &bull; Founder @ Howarts Studio
- **GitHub**: [@DanuZen](https://github.com/DanuZen) / [@Ryan-infitech](https://github.com/Ryan-infitech)
- **Email**: [rianseptiawan@student.unp.ac.id](mailto:rianseptiawan@student.unp.ac.id)
- **Instagram**: [@ryan.septiawan__](https://instagram.com/ryan.septiawan__)
- **Location**: Padang, Indonesia
