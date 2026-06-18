"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrandIconMotif, BrandRingMotif } from "@/components/brand-motif";

const phrases = ["Very human", "Proper conversations", "No jargon", "Real advice"];

const principles = [
  {
    number: "01",
    label: "Whole of market",
    title: "Properly independent",
    text: "Recommendations shaped around you, not a single bank’s shelf.",
    note: "Independent whole-of-market advice.",
    emoji: "💜",
    className: "lg:translate-y-0",
    tone: "bg-white",
  },
  {
    number: "02",
    label: "Plain English",
    title: "Happily jargon-free",
    text: "Useful answers, patient explanations and plenty of room for questions.",
    note: "Tea optional. Questions encouraged.",
    emoji: "☕",
    className: "lg:translate-y-16",
    tone: "bg-[#f1e7ed]",
  },
  {
    number: "03",
    label: "Start to keys",
    title: "Here for the whole thing",
    text: "We stay close from the first numbers to moving-day keys.",
    note: "We don’t disappear after the mortgage offer.",
    emoji: "🔑",
    className: "lg:-translate-y-5",
    tone: "bg-[#e8efcf]",
  },
];

export function BigDecisionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.from("[data-big-intro]", {
          autoAlpha: 0,
          y: 38,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        });

        gsap.from("[data-principle-card]", {
          autoAlpha: 0,
          y: 52,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: "[data-principles]",
            start: "top 80%",
          },
        });

        gsap.to("[data-float]", {
          y: -8,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.35,
        });

        gsap.to("[data-parallax-photo]", {
          yPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

      }, sectionRef);

      cleanup = () => context.revert();
    });

    return () => cleanup();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden border-y border-brand-ink/8 bg-[#fbf7f3] py-24 md:py-32">
      <BrandRingMotif className="-right-28 top-[38%] h-72 w-72 border-brand-green/[0.12]" />
      <BrandIconMotif className="-left-12 top-20 h-40 w-40 bg-brand-pink opacity-[0.055]" />
      <div data-parallax-photo className="absolute -right-24 top-8 -z-10 h-[420px] w-[620px] overflow-hidden rounded-[4rem] opacity-[0.09]">
        <Image src="/images/4a7efc33-9fd3-49a9-ad6f-97076f37db9d.png" alt="" fill sizes="620px" className="object-cover" />
      </div>
      <div data-parallax-photo className="absolute -bottom-20 -left-28 -z-10 h-80 w-[520px] overflow-hidden rounded-[4rem] opacity-[0.08]">
        <Image src="/images/1757348987796538_447422_IMG.jpg" alt="" fill sizes="520px" className="object-cover" />
      </div>

      <div className="page-shell">
        <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div data-big-intro>
            <p className="eyebrow">A different sort of broker</p>
            <h2
              data-big-heading
              className="mt-5 max-w-[760px] text-[clamp(2.75rem,4.65vw,5rem)] font-semibold leading-[0.94] tracking-[-0.055em]"
            >
              <span className="block">Big financial decisions.</span>
              <span className="mt-2 block min-h-[1.05em] whitespace-nowrap text-brand-pink">
                <span key={phrases[phraseIndex]} className="accent-word phrase-arrive inline-block">
                  {phrases[phraseIndex]}
                </span>
              </span>
            </h2>
          </div>

          <div data-big-intro className="relative lg:pb-5 lg:pl-12">
            <svg data-float className="absolute -left-8 -top-14 hidden h-20 w-20 text-brand-pink/55 lg:block" viewBox="0 0 90 90" fill="none" aria-hidden="true">
              <path d="M8 62C27 61 43 52 52 38C58 29 63 19 62 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M48 17L62 8L68 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="max-w-2xl text-xl leading-9 text-brand-ink/62 lg:text-2xl lg:leading-10">
              Mortgages can be complicated. Speaking to your broker should not be. We take time to understand
              the life around the numbers, then explain your options like a neighbour would—clearly, patiently and without showing off.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-brand-pink/15 bg-white/80 px-4 py-2.5 text-sm font-semibold shadow-sm backdrop-blur">
              <span data-float className="text-xl" aria-hidden="true">🏡</span>
              Friendly advice from just down the road.
            </div>
          </div>
        </div>

        <div data-principles className="relative mt-20 grid gap-6 pb-12 lg:grid-cols-3 lg:gap-7 lg:pb-20">
          <svg className="absolute -top-10 left-[29%] hidden h-20 w-28 text-brand-pink/35 lg:block" viewBox="0 0 120 80" fill="none" aria-hidden="true">
            <path d="M8 52C31 20 65 16 103 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" />
            <path d="M92 22L105 35L89 41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {principles.map((principle) => (
            <article
              data-principle-card
              key={principle.number}
              className={`relative min-h-[330px] overflow-hidden rounded-[2.25rem] border border-brand-ink/8 p-7 shadow-[0_22px_60px_rgba(27,21,32,0.08)] md:p-9 ${principle.tone} ${principle.className}`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-brand-pink bg-brand-cream shadow-[inset_0_0_0_5px_#fff]">
                  <span className="text-sm font-extrabold tracking-[0.12em] text-brand-pink">{principle.number}</span>
                </div>
                <span data-float className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-sm" aria-hidden="true">
                  {principle.emoji}
                </span>
              </div>
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-pink">{principle.label}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">{principle.title}</h3>
              <p className="mt-4 max-w-sm leading-7 text-brand-ink/58">{principle.text}</p>
              <div className="absolute inset-x-7 bottom-7 flex items-center gap-3 border-t border-brand-ink/10 pt-5 text-sm font-semibold md:inset-x-9 md:bottom-8">
                <svg className="h-6 w-7 shrink-0 text-brand-pink" viewBox="0 0 30 26" fill="none" aria-hidden="true">
                  <path d="M3 13L10 21L27 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 10L11 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".45" />
                </svg>
                {principle.note}
              </div>
            </article>
          ))}

          <div data-float className="absolute -bottom-2 right-8 hidden items-center gap-2 rounded-full bg-brand-pink px-5 py-3 text-sm font-semibold text-white shadow-soft lg:flex">
            <span className="text-lg" aria-hidden="true">💬</span>
            Ask us anything. Honestly.
          </div>
        </div>
      </div>
    </section>
  );
}
