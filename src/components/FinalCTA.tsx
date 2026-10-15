'use client';

import { useState, FormEvent } from 'react';

const featurePills = [
  { emoji: '🧠', text: 'Understands your product' },
  { emoji: '🔄', text: 'Gets smarter over time' },
  { emoji: '🚀', text: 'Ships while you ship' },
];

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!trimmed) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('formatlab_waitlist') || '[]');
      if (!existing.includes(trimmed)) {
        existing.push(trimmed);
        localStorage.setItem('formatlab_waitlist', JSON.stringify(existing));
      }
    } catch {
      // If localStorage fails, still show success
    }

    setSubmitted(true);
  };

  return (
    <section id="early-access" className="relative overflow-hidden bg-gradient-to-b from-[#08090a] via-[#0f0a18] to-[#08090a]">
      {/* Violet glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-24 md:py-32 text-center">
        {/* Headline */}
        <h2 className="text-[32px] sm:text-[44px] font-light text-white leading-tight">
          Keep shipping. We handle the rest.
        </h2>

        {/* Supporting text */}
        <p className="text-[#848484] text-lg mt-6 leading-relaxed">
          Give your product a voice, a consistent presence, and a marketing loop that gets smarter with every experiment.
        </p>

        {/* Feature pills */}
        <div className="flex gap-3 justify-center flex-wrap mt-10">
          {featurePills.map((pill) => (
            <span key={pill.text} className="bg-[#111315] border border-white/[0.06] rounded-full px-4 py-2 text-sm text-[#a1a1aa] inline-flex items-center gap-1.5">
              <span>{pill.emoji}</span>
              <span>{pill.text}</span>
            </span>
          ))}
        </div>

        {/* Email capture */}
        <div className="mt-12">
          {submitted ? (
            <div className="inline-flex items-center gap-3 bg-[#111315] border border-green-500/20 rounded-[12px] px-8 py-4" style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" />
                <path d="M8 12L11 15L16 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white font-medium">You are on the list!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto">
              <label htmlFor="cta-email" className="sr-only">Email address</label>
              <input
                id="cta-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="you@company.com"
                required
                className="flex-1 w-full sm:w-auto bg-[#111315] border border-white/[0.08] rounded-[12px] sm:rounded-r-none sm:rounded-l-[12px] px-5 py-3.5 text-white placeholder-[#555] text-base focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-white text-black rounded-[12px] sm:rounded-l-none sm:rounded-r-[12px] px-6 py-3.5 font-medium hover:bg-neutral-200 transition-colors duration-200 cursor-pointer mt-2 sm:mt-0 whitespace-nowrap"
              >
                Join the Waitlist
              </button>
            </form>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-400 font-medium">{error}</p>
          )}

          {!submitted && (
            <p className="text-[#848484]/50 text-xs mt-4">
              No spam. Early access + product updates only.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
