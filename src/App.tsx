/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  Database, 
  Layout, 
  ChevronRight, 
  Cpu, 
  Zap, 
  Globe, 
  ArrowRight,
  Menu,
  X,
  Play,
  ShieldCheck,
  Server,
  Layers,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Hls from 'hls.js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const SectionHeader = ({ title, subtitle, number }: { title: string; subtitle: string; number: string }) => (
  <div className="mb-16 border-l-4 border-brutal-accent pl-8">
    <span className="font-mono text-brutal-accent text-sm mb-3 block tracking-[0.4em] uppercase font-bold">Phase {number}</span>
    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-none">{title}</h2>
    <p className="text-zinc-400 max-w-3xl text-xl leading-relaxed">{subtitle}</p>
  </div>
);

const CodeBlock = ({ code, title, language = "typescript" }: { code: string; title?: string; language?: string }) => (
  <div className="bg-zinc-950 border border-zinc-800 rounded-lg font-mono text-sm overflow-hidden my-6 shadow-2xl">
    <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
      </div>
      {title && <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{title}</span>}
    </div>
    <div className="p-6 overflow-x-auto custom-scrollbar">
      <pre className="text-zinc-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const StepCard = ({ title, description, icon: Icon, details }: { title: string; description: string; icon: any; details?: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="w-14 h-14 bg-brutal-accent/10 flex items-center justify-center mb-8 border border-brutal-accent/20 group-hover:bg-brutal-accent/20 transition-colors">
      <Icon className="text-brutal-accent w-7 h-7" />
    </div>
    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight group-hover:text-brutal-accent transition-colors">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{description}</p>
    {details && (
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
            <ChevronRight size={12} className="mt-0.5 text-brutal-accent shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const InfoBox = ({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: "info" | "warning" | "success" }) => {
  const colors = {
    info: "border-brutal-accent bg-brutal-accent/5 text-brutal-accent",
    warning: "border-yellow-500 bg-yellow-500/5 text-yellow-500",
    success: "border-emerald-500 bg-emerald-500/5 text-emerald-500"
  };
  
  const Icons = {
    info: Play,
    warning: AlertCircle,
    success: CheckCircle2
  };
  
  const Icon = Icons[type];

  return (
    <div className={cn("p-8 border-2 my-8", colors[type])}>
      <h4 className="font-bold mb-4 uppercase flex items-center gap-3 text-lg">
        <Icon className="w-5 h-5 fill-current" /> {title}
      </h4>
      <div className="text-zinc-300 leading-relaxed italic">
        {children}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const videoSrc = "https://www.pexels.com/download/video/33187808/";
      if (videoSrc.endsWith('.m3u8')) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
        }
      } else {
        video.src = videoSrc;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-brutal-black selection:bg-brutal-accent selection:text-brutal-black overflow-x-hidden">
      <div className="scanline" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-brutal-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-brutal-accent flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Zap className="text-brutal-black w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tighter uppercase leading-none">VibeCoding</span>
              <span className="font-mono text-[10px] text-zinc-500 tracking-[0.3em] uppercase">Laboratory // v2.0</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-xs font-mono uppercase tracking-[0.2em]">
            <a href="#prompting" className="hover:text-brutal-accent transition-colors relative group">
              01. Prompting
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brutal-accent transition-all group-hover:w-full" />
            </a>
            <a href="#design" className="hover:text-brutal-accent transition-colors relative group">
              02. Design
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brutal-accent transition-all group-hover:w-full" />
            </a>
            <a href="#api" className="hover:text-brutal-accent transition-colors relative group">
              03. API Logic
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brutal-accent transition-all group-hover:w-full" />
            </a>
            <a href="#database" className="hover:text-brutal-accent transition-colors relative group">
              04. Database
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brutal-accent transition-all group-hover:w-full" />
            </a>
            <a href="#stack" className="hover:text-brutal-accent transition-colors relative group">
              05. Stack
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brutal-accent transition-all group-hover:w-full" />
            </a>
            <button className="px-8 py-3 bg-brutal-accent text-brutal-black font-bold hover:bg-white transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              DEPLOY NOW
            </button>
          </div>

          <button className="lg:hidden p-2 border border-white/10 text-brutal-accent" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-brutal-black border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 text-xs font-mono uppercase tracking-[0.2em]">
                <a href="#prompting" onClick={() => setIsMenuOpen(false)} className="hover:text-brutal-accent transition-colors">01. Prompting</a>
                <a href="#design" onClick={() => setIsMenuOpen(false)} className="hover:text-brutal-accent transition-colors">02. Design</a>
                <a href="#api" onClick={() => setIsMenuOpen(false)} className="hover:text-brutal-accent transition-colors">03. API Logic</a>
                <a href="#database" onClick={() => setIsMenuOpen(false)} className="hover:text-brutal-accent transition-colors">04. Database</a>
                <a href="#stack" onClick={() => setIsMenuOpen(false)} className="hover:text-brutal-accent transition-colors">05. Stack</a>
                <button className="w-full py-4 bg-brutal-accent text-brutal-black font-bold uppercase">
                  DEPLOY NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 z-0 opacity-60 grayscale contrast-110">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brutal-black/60 via-transparent to-brutal-black/60" />
          <div className="absolute inset-0 grid-bg opacity-10" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 border border-brutal-accent/30 bg-brutal-accent/5 text-brutal-accent font-mono text-xs mb-10 uppercase tracking-[0.4em] rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brutal-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brutal-accent"></span>
              </span>
              System Status: Operational
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-bold uppercase tracking-tighter leading-[0.8] mb-12">
              VIBE<span className="text-brutal-accent">CODE</span><br />
              <span className="italic font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">MANIFESTO</span>
            </h1>
            <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto mb-14 font-light leading-relaxed">
              The definitive technical guide to AI-augmented development. 
              Master the workflow of the future where code is generated by intent and refined by vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-5 bg-brutal-accent text-brutal-black font-bold text-xl hover:bg-white transition-all flex items-center justify-center gap-3 group shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                INITIATE PROTOCOL <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-12 py-5 border-2 border-white/10 font-bold text-xl hover:bg-white/5 transition-all backdrop-blur-sm">
                DOCUMENTATION
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block">
          <div className="flex flex-col gap-20 opacity-20 font-mono text-[10px] uppercase tracking-[0.5em] [writing-mode:vertical-rl]">
            <span>// LATENCY: 14MS</span>
            <span>// UPTIME: 99.99%</span>
            <span>// VERSION: ALPHA_04</span>
          </div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="max-w-7xl mx-auto px-6 py-20 md:py-40 space-y-24 md:space-y-48 relative">
        
        {/* 01. Prompting */}
        <section id="prompting" className="relative">
          <SectionHeader 
            number="01"
            title="Prompt Engineering"
            subtitle="Programming in natural language requires precision. Learn the 'Manifesto' style of prompting to minimize hallucinations and maximize architectural integrity."
          />
          
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-10">
              <StepCard 
                icon={Layers}
                title="The Stack-First Rule"
                description="Always declare your environment before the task. AI Studio needs to know exactly what tools are available to avoid suggesting incompatible libraries."
                details={[
                  "Declare Framework (React/Next)", 
                  "Declare Build Tool (Vite)", 
                  "Declare Styling (Tailwind v4)", 
                  "Declare State (Zustand/Context)",
                  "Declare Animation (motion/react)"
                ]}
              />
              <StepCard 
                icon={Terminal}
                title="Advanced Techniques"
                description="Go beyond simple instructions. Use structured patterns to guide the model's reasoning process."
                details={[
                  "Few-Shot: Provide 2-3 examples of desired code",
                  "Negative Prompting: Explicitly list forbidden libraries",
                  "Variable Injection: Use placeholders like {'{{DATA}}'}",
                  "Role Prompting: 'Act as a Senior Architect'"
                ]}
              />
              <InfoBox title="Vibe Tip: The Constraint Guard" type="info">
                "When prompting for complex UI, explicitly list what NOT to use. For example: 'Do not use external UI libraries like Shadcn, build everything with pure Tailwind and Lucide icons.' This keeps your bundle size small and your design consistent."
              </InfoBox>
              <InfoBox title="Variable Injection Pattern" type="success">
                "Use double braces for dynamic data: 'Generate a component that renders the following data structure: {'{{SCHEMA}}'}'. This tells the AI to treat the placeholder as a variable it will receive later."
              </InfoBox>
            </div>
            
            <div className="lg:sticky lg:top-32">
              <h3 className="text-xs font-mono text-zinc-500 uppercase mb-6 tracking-[0.3em] flex items-center gap-2">
                <Code2 size={14} className="text-brutal-accent" /> Master Prompt Template (Advanced)
              </h3>
              <CodeBlock 
                title="MASTER_PROMPT_V2.TXT"
                code={`[CONTEXT]
Environment: React 19 + Vite + TypeScript.
Styling: Tailwind CSS v4 (@import "tailwindcss").
Animation: motion/react (Framer Motion).
Icons: lucide-react.

[ROLE]
Act as a Senior Product Engineer specializing in Brutalist Design.

[TASK]
Build a 'Command Center' dashboard with real-time system metrics.
Include a sidebar, a header, and a main grid of 4 metric cards.

[CONSTRAINTS]
- Use 'motion' for all entrance animations (staggered).
- Grid must be responsive (1 col mobile, 2 col tablet, 4 col desktop).
- Color Palette: #000000 (bg), #E0FFE0 (text), #00FF41 (accent).
- Typography: 'Space Grotesk' for headings, 'JetBrains Mono' for data.
- DO NOT use any third-party UI components.
- Implement a custom 'Scanline' overlay effect using CSS.

[DATA_STRUCTURE]
{{METRICS_SCHEMA}}`} 
              />
              <div className="mt-8 p-6 border border-zinc-800 bg-zinc-900/10 rounded-lg">
                <h4 className="text-sm font-bold uppercase mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Expected Output
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  The AI will generate a high-fidelity component with custom CSS for the scanline, staggered motion animations, and a responsive grid layout that adheres strictly to the brutalist aesthetic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02. Designing */}
        <section id="design">
          <SectionHeader 
            number="02"
            title="Brutalist UI/UX"
            subtitle="Rejecting the 'soft' web. Brutalism is about honesty, structure, and high-impact visual communication. It's the aesthetic of the technical elite."
          />
          
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="aspect-video bg-zinc-950 border-2 border-zinc-800 relative group overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: [0, 90, 180, 270, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-20 border border-brutal-accent/20 rounded-full"
                    />
                    <h4 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-center leading-none">
                      RAW<br /><span className="text-brutal-accent">LOGIC</span>
                    </h4>
                  </div>
                </div>
                <div className="absolute top-6 left-6 font-mono text-[10px] text-zinc-600 flex gap-4">
                  <span>// GRID_X: 40PX</span>
                  <span>// GRID_Y: 40PX</span>
                </div>
                <div className="absolute bottom-6 right-6 font-mono text-[10px] text-zinc-600">
                  DESIGN_SYSTEM_V2.0
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 border border-zinc-800 bg-zinc-900/30">
                  <h4 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                    <Smartphone size={18} className="text-brutal-accent" /> Mobile First
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Start with `w-full` and use `md:` or `lg:` breakpoints for expansion. Ensure touch targets are at least 44px for accessibility.
                  </p>
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <code className="text-[10px] text-brutal-accent">class="w-full lg:max-w-7xl mx-auto"</code>
                  </div>
                </div>
                <div className="p-8 border border-zinc-800 bg-zinc-900/30">
                  <h4 className="text-lg font-bold uppercase mb-4 flex items-center gap-2">
                    <Zap size={18} className="text-brutal-accent" /> Micro-Interactions
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Use `whileHover` and `whileTap` for immediate tactile feedback. Every interaction should feel intentional and responsive.
                  </p>
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <code className="text-[10px] text-brutal-accent">whileHover={`{{ scale: 1.02, x: 5 }}`}</code>
                  </div>
                </div>
              </div>

              <div className="p-8 border-2 border-zinc-800 bg-zinc-900/10">
                <h4 className="text-xl font-bold uppercase mb-6 flex items-center gap-3">
                  <Layout className="text-brutal-accent" /> Tailwind Brutalist Config
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Hard Shadows</h5>
                    <CodeBlock 
                      title="tailwind.config.ts"
                      code={`boxShadow: {
  'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
  'brutal-hover': '4px 4px 0px 0px rgba(0,0,0,1)',
}`} 
                    />
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Typography Scale</h5>
                    <CodeBlock 
                      title="tailwind.config.ts"
                      code={`fontSize: {
  'hero': ['10rem', { lineHeight: '0.8', letterSpacing: '-0.05em' }],
  'display': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
}`} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xs font-mono text-zinc-500 uppercase mb-6 tracking-[0.3em]">Design Principles</h3>
              {[
                { title: "Visible Grids", desc: "Use borders and background patterns to reveal the layout's skeleton. `border-white/10` is your best friend." },
                { title: "Bold Typography", desc: "Oversized headings with tight tracking (tracking-tighter). Use 'Space Grotesk' for maximum impact." },
                { title: "High Contrast", desc: "Strict use of black, white, and a single matrix green accent color (#00FF41). Avoid gradients unless they are dithered." },
                { title: "Hard Shadows", desc: "Avoid soft blurs. Use solid offset shadows for depth. `shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]`." },
                { title: "Monospace Accents", desc: "Use mono fonts for technical data and micro-labels. It signals 'raw data' and technical precision." },
                { title: "Accessibility First", desc: "High contrast isn't just a vibe; it's a requirement. Ensure a 7:1 contrast ratio for all critical text." }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors group">
                  <h5 className="font-bold uppercase text-sm mb-2 text-brutal-accent group-hover:translate-x-2 transition-transform">{item.title}</h5>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03. API Logic */}
        <section id="api">
          <SectionHeader 
            number="03"
            title="Full-Stack Integration"
            subtitle="Moving beyond the browser. AI Studio's full-stack mode allows you to build real backends with Express, enabling secure API calls and complex logic."
          />
          
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-10">
              <div className="p-10 border-2 border-zinc-800 bg-zinc-900/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brutal-accent" />
                <h3 className="text-2xl font-bold uppercase mb-6 flex items-center gap-3">
                  <Server className="text-brutal-accent" /> Server Architecture
                </h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  In AI Studio, your `server.ts` is the entry point. It handles both your API routes and serves your Vite frontend in production.
                </p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brutal-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-brutal-accent">01</span>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase text-sm mb-1">API Endpoints First</h5>
                      <p className="text-xs text-zinc-500">Define your `/api/*` routes before the Vite middleware to ensure they take precedence.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brutal-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-brutal-accent">02</span>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase text-sm mb-1">Vite Middleware</h5>
                      <p className="text-xs text-zinc-500">Integrate Vite's dev server as middleware for HMR-like experience during development.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brutal-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-brutal-accent">03</span>
                    </div>
                    <div>
                      <h5 className="font-bold uppercase text-sm mb-1">Production Ready</h5>
                      <p className="text-xs text-zinc-500">Serve static files from the `dist` folder when `NODE_ENV` is set to production.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <StepCard 
                icon={ShieldCheck}
                title="Environment Variables"
                description="Securely manage your secrets. Use .env.example to document required keys and access them via process.env in your server."
                details={[
                  "GEMINI_API_KEY (Auto-injected)",
                  "VITE_ prefix for client-side keys",
                  "Validation: Check for keys on startup",
                  "Lazy Initialization: Init SDKs on first use"
                ]}
              />

              <InfoBox title="Security Warning" type="warning">
                "Never expose third-party API keys (Stripe, OpenAI, etc.) in your frontend code. Always use the backend to proxy these requests and keep your secrets hidden in the environment. Use `process.env` in `server.ts` and never prefix these with `VITE_`."
              </InfoBox>
            </div>
            
            <div className="lg:sticky lg:top-32">
              <h3 className="text-xs font-mono text-zinc-500 uppercase mb-6 tracking-[0.3em]">Implementation: server.ts (Robust)</h3>
              <CodeBlock 
                title="SERVER.TS"
                code={`import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. VALIDATE ENVIRONMENT
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.warn("GEMINI_API_KEY is missing. AI features will be disabled.");
  }

  // 2. API ROUTES
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      // Proxy to Gemini or other secure service
      res.json({ success: true, data: "AI_RESPONSE_FOR_" + prompt });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 3. VITE MIDDLEWARE / STATIC SERVING
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(3000, "0.0.0.0", () => {
    console.log("SERVER_LIVE // PORT:3000");
  });
}

startServer();`} 
              />
            </div>
          </div>
        </section>

        {/* 04. Database */}
        <section id="database">
          <SectionHeader 
            number="04"
            title="Cloud Persistence"
            subtitle="Real-time data at scale. Firestore provides a powerful NoSQL backend that integrates perfectly with the AI Studio ecosystem."
          />
          
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <StepCard 
                  icon={Database}
                  title="Data Modeling"
                  description="Structure your data for performance. Use top-level collections for global data and subcollections for user-specific assets."
                  details={[
                    "Root: /users/{uid}",
                    "Sub: /users/{uid}/settings",
                    "Global: /public_posts",
                    "Denormalization: Copy data to avoid joins"
                  ]}
                />
                <StepCard 
                  icon={ShieldCheck}
                  title="Security Rules"
                  description="Protect your data at the source. Define granular access based on authentication state and document ownership."
                  details={[
                    "isAuthenticated() helper",
                    "isOwner(userId) helper",
                    "Data Validation (types/size)",
                    "Immutable field protection"
                  ]}
                />
              </div>
              
              <div className="p-8 border border-zinc-800 bg-zinc-900/40">
                <h4 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
                  <Zap className="text-brutal-accent" /> Optimistic Updates
                </h4>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  Don't wait for the server. Update your local state immediately and rollback if the Firestore write fails.
                </p>
                <CodeBlock 
                  title="OPTIMISTIC_UI.TS"
                  code={`const handleToggle = async (id, currentStatus) => {
  // 1. Update UI immediately
  setTasks(prev => prev.map(t => 
    t.id === id ? { ...t, done: !currentStatus } : t
  ));

  try {
    // 2. Sync with Firestore
    await updateDoc(doc(db, "tasks", id), { 
      done: !currentStatus 
    });
  } catch (error) {
    // 3. Rollback on failure
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, done: currentStatus } : t
    ));
    showError("Sync failed.");
  }
};`} 
                />
              </div>
            </div>
            
            <div className="lg:sticky lg:top-32 space-y-10">
              <div>
                <h3 className="text-xs font-mono text-zinc-500 uppercase mb-6 tracking-[0.3em]">Advanced Rules: firestore.rules</h3>
                <CodeBlock 
                  title="FIRESTORE.RULES"
                  code={`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper: Check if user is logged in
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper: Check if user owns the document
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }

    match /posts/{postId} {
      allow read: if true;
      allow create: if isAuthenticated() 
                    && request.resource.data.authorId == request.auth.uid
                    && request.resource.data.content is string
                    && request.resource.data.content.size() < 5000;
      allow update: if isOwner(resource.data.authorId)
                    && request.resource.data.authorId == resource.data.authorId;
      allow delete: if isOwner(resource.data.authorId);
    }
  }
}`} 
                />
              </div>
              
              <div className="p-8 border-2 border-brutal-accent bg-brutal-accent/5">
                <h4 className="font-bold mb-4 uppercase flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" /> Deployment Tip
                </h4>
                <p className="text-sm text-zinc-300 italic">
                  "Always use the 'deploy_firebase' tool after modifying your rules. AI Studio doesn't auto-deploy rules to ensure you don't accidentally lock yourself out during development."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Vibe Stack */}
        <section id="stack" className="relative">
          <SectionHeader 
            number="05"
            title="The Vibe Stack"
            subtitle="The curated collection of tools that power the VibeCoding workflow. Minimal, performant, and highly expressive."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "React 19", role: "UI Engine", desc: "The foundation of our component architecture.", icon: Layout },
              { name: "Vite", role: "Build Tool", desc: "Lightning fast development and optimized production builds.", icon: Cpu },
              { name: "Tailwind v4", role: "Styling", desc: "Utility-first CSS for rapid, brutalist design implementation.", icon: Zap },
              { name: "Motion", role: "Animation", desc: "Declarative animations for immersive user experiences.", icon: Play },
              { name: "Lucide", role: "Iconography", desc: "Clean, consistent SVG icons for technical interfaces.", icon: Code2 },
              { name: "Express", role: "Backend", desc: "Minimalist web framework for robust API logic.", icon: Server },
              { name: "Firestore", role: "Database", desc: "Real-time NoSQL persistence for cloud-scale apps.", icon: Database },
              { name: "Gemini", role: "Intelligence", desc: "The cognitive engine driving our AI-augmented features.", icon: Globe }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-zinc-800 bg-zinc-900/20 hover:border-brutal-accent transition-all group">
                <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-brutal-accent group-hover:text-brutal-black transition-colors">
                  <item.icon size={24} />
                </div>
                <h4 className="font-bold uppercase text-lg mb-1">{item.name}</h4>
                <div className="text-[10px] font-mono text-brutal-accent uppercase tracking-widest mb-4">{item.role}</div>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verification Section */}
        <section id="verification">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-6xl font-bold uppercase tracking-tighter mb-6">Quality Assurance</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto uppercase font-mono text-xs tracking-[0.3em]">
              Verification // Linting // Compilation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-zinc-900/20 text-center group">
              <div className="w-16 h-16 bg-zinc-800 flex items-center justify-center mx-auto mb-8 group-hover:bg-brutal-accent group-hover:text-brutal-black transition-colors">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold uppercase mb-4">Lint Applet</h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                Fast syntax verification. Use this iteratively to catch missing imports and basic errors.
              </p>
              <div className="font-mono text-[10px] text-zinc-600">CMD: npm run lint</div>
            </div>
            
            <div className="p-10 bg-zinc-900/20 text-center group">
              <div className="w-16 h-16 bg-zinc-800 flex items-center justify-center mx-auto mb-8 group-hover:bg-brutal-accent group-hover:text-brutal-black transition-colors">
                <Cpu size={32} />
              </div>
              <h4 className="text-xl font-bold uppercase mb-4">Compile Applet</h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                Full production build. Essential before sharing or deploying your application.
              </p>
              <div className="font-mono text-[10px] text-zinc-600">CMD: npm run build</div>
            </div>
            
            <div className="p-10 bg-zinc-900/20 text-center group">
              <div className="w-16 h-16 bg-zinc-800 flex items-center justify-center mx-auto mb-8 group-hover:bg-brutal-accent group-hover:text-brutal-black transition-colors">
                <Globe size={32} />
              </div>
              <h4 className="text-xl font-bold uppercase mb-4">Final Deploy</h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                Push your code to the cloud. Your app becomes accessible via the Shared App URL.
              </p>
              <div className="font-mono text-[10px] text-zinc-600">STATUS: READY_FOR_PUSH</div>
            </div>
          </div>
        </section>

      </main>



      {/* Footer */}
      <footer className="border-t border-white/10 py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-brutal-accent flex items-center justify-center">
                  <Zap className="text-brutal-black w-6 h-6 fill-current" />
                </div>
                <span className="font-bold text-2xl tracking-tighter uppercase">VibeCoding.Lab</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-md leading-relaxed mb-10">
                A technical manifesto for the next generation of developers. 
                Leveraging Google AI Studio to redefine the boundaries of rapid software creation.
              </p>
              <div className="flex gap-4">
                {[Terminal, Globe, Cpu, Database].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brutal-accent transition-colors cursor-pointer">
                    <Icon size={18} className="text-zinc-500 hover:text-brutal-accent" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-bold uppercase mb-8 text-sm tracking-[0.3em] text-zinc-300">Manifesto</h5>
              <ul className="space-y-4 text-xs text-zinc-500 font-mono uppercase tracking-widest">
                <li><a href="#prompting" className="hover:text-brutal-accent transition-colors">01. Prompting</a></li>
                <li><a href="#design" className="hover:text-brutal-accent transition-colors">02. Design</a></li>
                <li><a href="#api" className="hover:text-brutal-accent transition-colors">03. API Logic</a></li>
                <li><a href="#database" className="hover:text-brutal-accent transition-colors">04. Database</a></li>
                <li><a href="#stack" className="hover:text-brutal-accent transition-colors">05. Stack</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold uppercase mb-8 text-sm tracking-[0.3em] text-zinc-300">System</h5>
              <ul className="space-y-4 text-xs text-zinc-500 font-mono uppercase tracking-widest">
                <li><a href="#" className="hover:text-brutal-accent transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-brutal-accent transition-colors">Uptime</a></li>
                <li><a href="#" className="hover:text-brutal-accent transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-brutal-accent transition-colors">Changelog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
            <span>© 2026 VibeCoding Lab // All systems nominal.</span>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Privacy_Protocol</a>
              <a href="#" className="hover:text-white transition-colors">Terms_Of_Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            className="fixed inset-0 z-[60] bg-brutal-black p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-2">
                <Zap className="text-brutal-accent w-6 h-6" />
                <span className="font-bold text-xl uppercase tracking-tighter">VibeCoding</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-10 h-10" />
              </button>
            </div>
            <div className="flex flex-col gap-10 text-5xl font-bold uppercase tracking-tighter">
              <a href="#prompting" onClick={() => setIsMenuOpen(false)}>01. Prompting</a>
              <a href="#design" onClick={() => setIsMenuOpen(false)}>02. Design</a>
              <a href="#api" onClick={() => setIsMenuOpen(false)}>03. API</a>
              <a href="#database" onClick={() => setIsMenuOpen(false)}>04. Database</a>
              <a href="#stack" onClick={() => setIsMenuOpen(false)}>05. Stack</a>
            </div>
            <div className="mt-auto">
              <button className="w-full py-8 bg-brutal-accent text-brutal-black font-bold text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                START BUILD
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00ff41;
        }
      `}} />
    </div>
  );
}
