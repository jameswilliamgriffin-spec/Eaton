"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Calculator,
  CalendarDays,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  CloudRain,
  CloudSun,
  Coffee,
  Heart,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  MessageCircleMore,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Umbrella,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BigDecisionsSection } from "@/components/big-decisions-section";
import { BrandIconMotif, BrandRingMotif } from "@/components/brand-motif";
import {
  HeroAtmosphere,
  MortgageJourneyDiscovery,
  PageAtmosphere,
  WindowDisplayExperience,
} from "@/components/creative-experiences";
import { Button } from "@/components/ui/button";
import { MortgageCalculatorStrip } from "@/components/mortgage-calculator-strip";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SoundtrackPlayer } from "@/components/soundtrack-player";

const testimonials = [
  {
    name: "Sarah",
    place: "Kings Heath",
    review:
      "Everything was explained in plain English and we felt looked after from the first call. It never felt like we were asking a silly question.",
  },
  {
    name: "Adeel",
    place: "Moseley",
    review:
      "Fast replies, calm advice and a genuinely friendly approach. We always knew what was happening and what came next.",
  },
  {
    name: "Gemma",
    place: "South Birmingham",
    review:
      "Deb made a stressful remortgage feel completely manageable. Clear options, no pressure, and a lovely person to have in our corner.",
  },
];

const services = [
  {
    title: "Buying your first home",
    text: "Deposits, affordability and lender language explained in normal human conversation.",
    emoji: "🏡",
    label: "First home",
    className: "",
  },
  {
    title: "Moving somewhere new",
    text: "Keeping the mortgage side moving while you deal with viewings, boxes and everything else.",
    emoji: "📦",
    label: "Home movers",
    className: "lg:translate-y-3",
  },
  {
    title: "Remortgaging",
    text: "A proper look at your options before your current deal ends — without the last-minute scramble.",
    emoji: "🔄",
    label: "A fresh look",
    className: "",
  },
  {
    title: "Self-employed mortgages",
    text: "Thoughtful advice for directors, sole traders and anyone whose income does not fit a neat little box.",
    emoji: "✨",
    label: "Made to fit",
    className: "",
  },
  {
    title: "Buy to let",
    text: "Straightforward guidance for first-time landlords and experienced property owners alike.",
    emoji: "🗝️",
    label: "For landlords",
    className: "lg:translate-y-3",
  },
  {
    title: "Protecting what matters",
    text: "Sensible conversations about cover, so the home you worked for stays protected.",
    emoji: "🛡️",
    label: "Life & protection",
    className: "",
  },
];

const faqs = [
  {
    q: "How much does mortgage advice cost?",
    a: "We will explain any fee clearly before you decide to go ahead. The first conversation is simply a chance to understand what you need and whether we are the right fit.",
  },
  {
    q: "Can we speak in the evening?",
    a: "Yes. Mortgages have an awkward habit of arriving during busy lives, so evening appointments are available when daytime calls are difficult.",
  },
  {
    q: "Can you help if I am self-employed?",
    a: "Absolutely. We can look at lenders who understand company directors, sole traders, contractors and income that varies from month to month.",
  },
  {
    q: "Do I need to have found a property first?",
    a: "Not at all. In fact, speaking before you start viewing can give you a much clearer sense of budget and help you make an offer with confidence.",
  },
  {
    q: "What should I bring to our first chat?",
    a: "Nothing elaborate. A rough idea of your income, savings, existing commitments and what you hope to do is enough for an initial conversation.",
  },
];

const cases = [
  {
    label: "First home",
    secondary: "Kings Heath",
    title: "First home in Kings Heath",
    text: "From first conversations to collecting the keys, we helped make the process feel much less overwhelming.",
    cta: "Read the story",
    image: "/images/image-0-480x320.jpg",
    className: "lg:col-span-7 min-h-[570px] md:min-h-[650px]",
    imagePosition: "object-center",
  },
  {
    label: "Moving home",
    secondary: "Family home",
    title: "Helping a growing family move closer to the park",
    text: "Moving house is stressful enough. The mortgage side shouldn’t be.",
    cta: "See how we helped",
    image: "/images/1757348987796538_447422_IMG.jpg",
    className: "lg:col-span-5 min-h-[520px] lg:mt-14",
    imagePosition: "object-center",
  },
  {
    label: "Remortgage",
    secondary: "Birmingham",
    title: "Finding a better deal before the fixed rate ended",
    text: "Clear advice, no jargon and support right through to completion.",
    cta: "Explore this move",
    image: "/images/siqmt6uc1ESypzfykKneVw.jpg",
    className: "lg:col-span-8 lg:col-start-3 min-h-[500px] md:min-h-[560px]",
    imagePosition: "object-center",
  },
];

const steps = [
  {
    number: "01",
    title: "A proper chat",
    text: "Tell us what you are hoping to do. We will listen, ask useful questions and make the next step feel clearer.",
    icon: Coffee,
  },
  {
    number: "02",
    title: "We do the digging",
    text: "We search the market, make sense of the small print and talk you through the options worth considering.",
    icon: Search,
  },
  {
    number: "03",
    title: "Right through to keys",
    text: "From application to completion, we keep an eye on the details and keep you in the loop.",
    icon: KeyRound,
  },
];

const helpLinks = [
  { title: "First-Time Buyers", detail: "A clear start to buying your first place", icon: KeyRound },
  { title: "Moving Home", detail: "Mortgage support for your next move", icon: Home },
  { title: "Remortgaging", detail: "Review your deal before it rolls over", icon: Search },
  { title: "Self-Employed Mortgages", detail: "Advice for income that is not one-size-fits-all", icon: Sparkles },
  { title: "Buy to Let", detail: "Straightforward help for landlords", icon: MapPin },
  { title: "Life Insurance", detail: "Protect the people and home that matter", icon: ShieldCheck },
];

const calculatorLinks = [
  { title: "Mortgage Calculator", detail: "Get a useful starting point for your budget", href: "#calculator" },
  { title: "Remortgage Calculator", detail: "Explore what changing your deal could mean", href: "#calculator" },
];

const heroBenefits = [
  {
    title: "Independent advice",
    detail: "Options chosen around you—not one bank.",
    icon: ShieldCheck,
  },
  {
    title: "Evening appointments",
    detail: "Mortgage chats that fit around real life.",
    icon: CalendarDays,
  },
  {
    title: "No awkward sales pitch",
    detail: "Useful guidance, with absolutely no pressure.",
    icon: MessageCircleMore,
  },
];

const currentSoundtrack = {
  title: "(It Goes Like) Nanana",
  artist: "Peggy Gou",
  note: "A proper dance-floor lift—bright, infectious and ideal for bringing a little Friday-night energy into the office.",
  artwork: "/images/ai-vinyl-record-3d-icon-png-download-jpg-14178472.png",
  audioSrc: "/audio/peggy-gou-nanana.mp3",
};

const currentWindowDisplay = {
  title: "Kings Heath Pride",
  season: "Summer 2026",
  image: "/images/kings-heath-pride-window.jpg",
  alt: "Eaton Mortgages' Kings Heath Pride window display, featuring a rainbow and a Wizard of Oz inspired yellow brick road",
};

const teamMembers = [
  {
    name: "Deb",
    role: "Founder & Mortgage Adviser",
    image: "/BRAND/DEB HALL PINK.png",
    imageAlt: "Deb Hall, owner of Eaton Mortgages",
    initials: "DH",
    accent: "pink",
    headline: "The numbers matter. But so does how you feel getting there.",
    paragraphs: [
      "Eaton Mortgages was built around a simple idea: people deserve expert advice without being made to feel out of their depth.",
      "Deb brings calm thinking, honest explanations and a very human approach to every conversation—whether you are buying for the first time or have moved more times than you care to count.",
    ],
    quote: "Mortgage advice with a good bedside manner.",
  },
  {
    name: "Joe",
    role: "Mortgage Adviser",
    image: "/images/joe.jpg",
    imageAlt: "Joe, mortgage adviser at Eaton Mortgages",
    initials: "J",
    accent: "green",
    headline: "Bright energy, useful answers and plenty of mortgage know-how.",
    paragraphs: [
      "Joe is lively, bubbly and full of mortgage advice. He brings brilliant energy to the team and makes even the trickier parts of a mortgage feel easier to tackle.",
      "Whether you need a quick answer or someone to talk through every option, Joe keeps things upbeat, practical and reassuring.",
    ],
    quote: "Big mortgage questions deserve bright, straightforward answers.",
  },
  {
    name: "Sarah",
    role: "Protection & Client Support",
    initials: "S",
    accent: "pink",
    headline: "Protecting what matters and keeping everything moving.",
    paragraphs: [
      "Sarah looks after life insurance and protection, helping people put sensible plans in place for the people and homes they care about.",
      "She is also the person making sure things get done on time—keeping an eye on the details, chasing what needs chasing and helping the whole process stay on track.",
    ],
    quote: "The right protection, the right details, all at the right time.",
  },
] as const;

const rainDrops = Array.from({ length: 32 }, (_, index) => ({
  left: `${3 + ((index * 29) % 94)}%`,
  delay: `${-((index * 0.137) % 1.4).toFixed(2)}s`,
  duration: `${(0.82 + ((index * 17) % 38) / 100).toFixed(2)}s`,
  height: `${72 + ((index * 13) % 54)}px`,
}));

export default function HomePage() {
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [teamSlideDirection, setTeamSlideDirection] = useState<"next" | "previous">("next");
  const [reviewOffset, setReviewOffset] = useState(0);
  const teamMember = teamMembers[activeTeamMember];
  const isGreenTeamCard = teamMember.accent === "green";
  const visibleTestimonials = testimonials.map((_, index) => testimonials[(index + reviewOffset) % testimonials.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setTeamSlideDirection("next");
      setActiveTeamMember((current) => (current + 1) % teamMembers.length);
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [activeTeamMember]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setReviewOffset((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const showPreviousTeamMember = () => {
    setTeamSlideDirection("previous");
    setActiveTeamMember((current) => (current - 1 + teamMembers.length) % teamMembers.length);
  };

  const showNextTeamMember = () => {
    setTeamSlideDirection("next");
    setActiveTeamMember((current) => (current + 1) % teamMembers.length);
  };

  return (
    <main className="overflow-hidden bg-brand-cream text-brand-ink">
      <PageAtmosphere />
      <header className="relative z-50 border-b border-brand-ink/8 bg-brand-cream/95 backdrop-blur-xl xl:sticky xl:top-0">
        <div className="page-shell flex h-[88px] items-center justify-between gap-6">
          <a href="#" aria-label="Eaton Mortgages home" className="shrink-0">
            <Image
              src="/BRAND/COLOUR_LOGO.svg"
              alt="Eaton Mortgages"
              width={668}
              height={168}
              priority
              className="h-auto w-[154px] sm:w-[186px]"
            />
          </a>
          <nav className="hidden items-center gap-7 text-[15px] font-medium text-brand-ink/72 xl:flex">
            <div className="nav-dropdown group relative">
              <button type="button" className="nav-link flex items-center gap-1.5 border-0 bg-transparent py-8 font-inherit text-inherit">
                How can we help you?
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="absolute left-1/2 top-[calc(100%-0.35rem)] w-[660px] -translate-x-1/2 rounded-[1.75rem] border border-brand-ink/8 bg-white p-3 shadow-[0_24px_70px_rgba(27,21,32,0.16)]">
                <div className="grid grid-cols-2 gap-1">
                  {helpLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.title}
                        href="#services"
                        className="group/item flex gap-4 rounded-2xl p-4 transition hover:bg-brand-cream"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-green/25 text-brand-pink transition group-hover/item:bg-brand-green">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-semibold text-brand-ink">{item.title}</span>
                          <span className="mt-1 block text-xs leading-5 text-brand-ink/50">{item.detail}</span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="nav-dropdown group relative">
              <button type="button" className="nav-link flex items-center gap-1.5 border-0 bg-transparent py-8 font-inherit text-inherit">
                Calculators &amp; tools
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="absolute left-1/2 top-[calc(100%-0.35rem)] w-[370px] -translate-x-1/2 rounded-[1.75rem] border border-brand-ink/8 bg-white p-3 shadow-[0_24px_70px_rgba(27,21,32,0.16)]">
                {calculatorLinks.map((item) => (
                  <a key={item.title} href={item.href} className="group/item flex gap-4 rounded-2xl p-4 transition hover:bg-brand-cream">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-pink/10 text-brand-pink transition group-hover/item:bg-brand-pink group-hover/item:text-white">
                      <Calculator className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-brand-ink">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-brand-ink/50">{item.detail}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <a className="nav-link" href="#how">How it works</a>
            <a className="nav-link" href="#stories">Testimonials</a>
            <a className="nav-link" href="#window">Our window</a>
            <a className="nav-link" href="#faq">Advice</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button href="#book" size="md" className="hidden rounded-xl px-6 py-3.5 text-base sm:inline-flex">
              Book A Chat <ArrowRight className="h-4 w-4" />
            </Button>
            <details className="mobile-menu relative xl:hidden">
              <summary className="grid h-12 w-12 cursor-pointer list-none place-items-center rounded-xl border border-brand-ink/12 bg-white">
                <Menu className="mobile-menu-icon h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(340px,calc(100vw-2rem))] rounded-[1.5rem] border border-brand-ink/8 bg-white p-3 shadow-[0_24px_70px_rgba(27,21,32,0.18)]">
                <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">How can we help?</p>
                <div className="grid gap-1">
                  {helpLinks.map((item) => (
                    <a key={item.title} href="#services" className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-brand-cream">
                      {item.title}
                    </a>
                  ))}
                </div>
                <div className="my-3 border-t border-brand-ink/8" />
                <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">Calculators &amp; tools</p>
                {calculatorLinks.map((item) => (
                  <a key={item.title} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-brand-cream">
                    <Calculator className="h-4 w-4 text-brand-pink" />
                    {item.title}
                  </a>
                ))}
                <div className="my-3 border-t border-brand-ink/8" />
                <div className="grid gap-1">
                  <a href="#how" className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-brand-cream">How it works</a>
                  <a href="#stories" className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-brand-cream">Testimonials</a>
                  <a href="#window" className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-brand-cream">Our window</a>
                  <a href="#faq" className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-brand-cream">Advice</a>
                </div>
                <Button href="#book" size="md" className="mt-3 w-full rounded-xl">
                  Book A Chat <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section className="relative min-h-[680px] border-b border-brand-ink/8 lg:min-h-[700px]">
        <div className="pointer-events-none absolute left-[-12rem] top-24 h-96 w-96 rounded-full border border-brand-pink/15" />
        <BrandIconMotif className="-bottom-16 left-[4%] h-48 w-48 bg-brand-green opacity-[0.07]" />
        <div className="page-shell relative z-10 grid gap-12 pb-14 pt-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(600px,1.18fr)] lg:items-start lg:pb-16 lg:pt-10">
          <div className="relative z-20 max-w-[610px]">
            <div className="eyebrow-pill">
              <MapPin className="kings-heath-pin h-3.5 w-3.5 text-brand-pink" />
              Here in Kings Heath
            </div>
            <h1 className="mt-6 text-[clamp(3rem,4.75vw,5.25rem)] font-semibold leading-[0.91] tracking-[-0.06em]">
              A local mortgage broker that feels more like a{" "}
              <span className="accent-word text-brand-pink">friendly neighbour.</span>
            </h1>
            <div className="mt-7 max-w-[590px]">
              <p className="text-lg font-semibold leading-[1.45] text-brand-ink md:text-xl md:leading-[1.45]">
                Get unbiased mortgage advice, then apply online with ease. It&apos;s totally free, as we get paid by lenders.
              </p>
              <p className="mt-3 max-w-[560px] text-sm leading-[1.55] text-brand-ink/55">
                Friendly, independent support from Kings Heath, with clear answers, easy online applications and help right through to the keys. We&apos;ll take time to understand your plans, explain every option in plain English and keep you updated at each stage, so you always know what happens next.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#book" size="lg">
                Book A Chat <ArrowDownRight className="h-5 w-5" />
              </Button>
              <a href="#how" className="group inline-flex items-center gap-2 text-sm font-semibold">
                See how it works
                <span className="grid h-9 w-9 place-items-center rounded-full border border-brand-ink/15 transition group-hover:translate-x-1 group-hover:bg-white">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>

          <div className="relative lg:-mt-2">
            <div className="relative h-[500px] lg:h-[590px]">
              <HeroAtmosphere />
              <div className="absolute -left-7 top-1/2 z-10 hidden w-[218px] -translate-y-1/2 rounded-[1.75rem] bg-white p-5 shadow-[0_18px_55px_rgba(27,21,32,0.16)] sm:block lg:-left-10">
                <div className="flex items-center gap-1.5 text-brand-green">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-[18px] w-[18px] fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-[1.15rem] font-semibold leading-[1.3] tracking-[-0.025em]">
                  Calm advice. Clear
                  <span className="block">next steps.</span>
                </p>
              </div>
            </div>
            <div className="mt-5 grid w-[calc(100%+max(1rem,(100vw-80rem)/2))] overflow-hidden rounded-l-[2rem] border border-brand-ink/8 bg-white shadow-[0_16px_50px_rgba(27,21,32,0.08)] sm:grid-cols-3">
              {heroBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="flex gap-4 border-b border-brand-ink/8 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:px-6 lg:py-6"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-pink text-white shadow-[0_8px_22px_rgba(150,46,139,0.2)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold leading-5 text-brand-ink">{benefit.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-brand-ink/52">{benefit.detail}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <MortgageCalculatorStrip />

      <BigDecisionsSection />

      <section id="services" className="relative overflow-hidden bg-[#201528] py-16 text-white md:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border-[48px] border-brand-pink/[0.08]" />
        <div className="pointer-events-none absolute -bottom-32 left-[12%] h-64 w-64 rounded-full bg-brand-pink/[0.06] blur-3xl" />
        <BrandIconMotif className="-bottom-20 right-[8%] h-56 w-56 bg-brand-green opacity-[0.07]" />
        <div className="page-shell">
          <div className="relative grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d788cb]">What we help with</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.8rem,4.8vw,5rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                Whatever home looks like <span className="accent-word text-brand-green">next.</span>
              </h2>
            </div>
            <div className="relative lg:pb-1">
              <p className="max-w-xl text-lg leading-8 text-white/66">
                Buying, moving, remortgaging or protecting the people you love — we&apos;ll help make the mortgage side feel clear, calm and manageable.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`group relative min-h-[220px] overflow-hidden rounded-[2rem] bg-[#fff9f5] p-6 text-brand-ink shadow-[0_18px_45px_rgba(5,2,8,0.16)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(5,2,8,0.24)] md:p-7 ${service.className}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-pink">{service.label}</p>
                    <span className="mt-2 block text-xs font-semibold text-brand-ink/30">0{index + 1}</span>
                  </div>
                  <span
                    className="grid h-13 w-13 min-h-[52px] min-w-[52px] place-items-center rounded-2xl bg-brand-pink/[0.09] text-2xl transition duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {service.emoji}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.65rem] font-semibold leading-tight tracking-[-0.035em]">{service.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-7 text-brand-ink/58">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="relative isolate overflow-hidden py-24 md:py-32">
        <BrandRingMotif className="-left-32 bottom-10 h-80 w-80 border-brand-pink/[0.07]" />
        <BrandIconMotif className="right-[3%] top-14 h-40 w-40 bg-brand-green opacity-[0.08]" />
        <div className="page-shell relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title={<>Three simple steps. No disappearing acts. <span className="accent-word text-brand-pink">No confusing jargon.</span></>}
              description="You will always know where things stand, what we need from you and what happens next."
            />
            <Button href="#book" variant="ghost" className="mt-8">
              Let&apos;s start with a chat <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className={`group grid gap-6 rounded-[2rem] border border-brand-ink/8 p-7 transition-transform duration-300 hover:-translate-y-1 md:grid-cols-[auto_1fr_auto] md:items-center md:p-9 ${
                    index === 1 ? "bg-brand-pink text-white" : "bg-white"
                  }`}
                >
                  <span className={`text-sm font-semibold ${index === 1 ? "text-white/60" : "text-brand-pink"}`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight">{step.title}</h3>
                    <p className={`mt-3 max-w-xl leading-7 ${index === 1 ? "text-white/72" : "text-brand-ink/58"}`}>
                      {step.text}
                    </p>
                  </div>
                  <div className={`grid h-16 w-16 place-items-center rounded-full ${index === 1 ? "bg-white text-brand-pink" : "bg-brand-green/30 text-brand-ink"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#f1e7ed] py-24 md:py-32">
        <BrandRingMotif className="-right-28 -top-24 h-80 w-80 border-brand-green/[0.13]" />
        <BrandIconMotif className="-bottom-20 left-[44%] h-60 w-60 bg-brand-pink opacity-[0.055]" />
        <BrandIconMotif className="-right-10 bottom-8 h-48 w-48 bg-brand-green opacity-[0.1]" />
        <div className="page-shell relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[520px] pb-12 pr-6">
            <div
              key={`portrait-${teamMember.name}`}
              className={`team-slide-visual relative aspect-[4/5] overflow-hidden rounded-[2.75rem] bg-brand-ink shadow-[0_30px_80px_rgba(70,35,65,0.17)] ${
                teamSlideDirection === "next" ? "from-right" : "from-left"
              }`}
            >
              {"image" in teamMember ? (
                <Image
                  key={teamMember.name}
                  src={teamMember.image}
                  alt={teamMember.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div
                  key={teamMember.name}
                  className={`flex h-full flex-col items-center justify-center overflow-hidden ${
                    isGreenTeamCard
                      ? "bg-[radial-gradient(circle_at_25%_20%,#e5f3b8,transparent_32%),linear-gradient(145deg,#afce54,#77952c)]"
                      : "bg-[radial-gradient(circle_at_25%_20%,#f0c7e9,transparent_32%),linear-gradient(145deg,#b846a8,#76236e)]"
                  }`}
                >
                  <BrandRingMotif className="left-[-5rem] top-[-4rem] h-64 w-64 border-white/20" />
                  <BrandIconMotif className="-bottom-12 -right-12 h-56 w-56 bg-white opacity-[0.1]" />
                  <span className="relative grid h-40 w-40 place-items-center rounded-full border border-white/25 bg-white/15 text-7xl font-semibold tracking-[-0.06em] text-white shadow-[0_24px_65px_rgba(27,21,32,0.2)] backdrop-blur-sm">
                    {teamMember.initials}
                  </span>
                  <p className="relative mt-7 text-sm font-bold uppercase tracking-[0.2em] text-white/75">{teamMember.role}</p>
                </div>
              )}
            </div>
            <div
              key={`quote-${teamMember.name}`}
              className={`team-slide-quote absolute bottom-0 right-0 max-w-[270px] rounded-[1.9rem] border p-6 shadow-[0_24px_65px_rgba(82,22,76,0.25),0_8px_22px_rgba(27,21,32,0.16)] ${
                teamSlideDirection === "next" ? "from-right" : "from-left"
              } ${
                isGreenTeamCard
                  ? "border-brand-ink/10 bg-brand-green text-brand-ink"
                  : "border-white/15 bg-brand-pink text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl shadow-inner ring-1 ${isGreenTeamCard ? "bg-white/45 ring-brand-ink/10" : "bg-white/15 ring-white/20"}`}>
                  <Heart className={`hero-heart h-5 w-5 fill-current ${isGreenTeamCard ? "text-brand-pink" : "text-white"}`} />
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isGreenTeamCard ? "text-brand-ink/55" : "text-white/65"}`}>The Eaton approach</span>
              </div>
              <p className="mt-5 text-[1.35rem] font-semibold leading-[1.18] tracking-[-0.025em]">
                {teamMember.quote}
              </p>
            </div>
          </div>
          <div className="lg:pl-10">
            <div
              key={`copy-${teamMember.name}`}
              className={`team-slide-copy ${teamSlideDirection === "next" ? "from-right" : "from-left"}`}
            >
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="accent-word text-4xl leading-none text-brand-pink md:text-5xl">Meet {teamMember.name}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-ink/40">{teamMember.role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPreviousTeamMember}
                  aria-label="Show previous team member"
                  className="grid h-12 w-12 place-items-center rounded-full border border-brand-ink/12 bg-white transition hover:-translate-x-0.5 hover:border-brand-pink hover:text-brand-pink"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNextTeamMember}
                  aria-label="Show next team member"
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand-ink text-white transition hover:translate-x-0.5 hover:bg-brand-pink"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <h2 className="mt-5 max-w-2xl text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              {teamMember.headline}
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-8 text-brand-ink/64">
              {teamMember.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white">
                <MapPin className="h-5 w-5 text-brand-pink" />
              </div>
              <div>
                <p className="font-semibold">Based in Kings Heath</p>
                <p className="text-sm text-brand-ink/50">Helping people across Birmingham and beyond</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3" aria-label="Choose a team member">
              {teamMembers.map((member, index) => (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => {
                    setTeamSlideDirection(index >= activeTeamMember ? "next" : "previous");
                    setActiveTeamMember(index);
                  }}
                  aria-label={`Meet ${member.name}`}
                  aria-current={index === activeTeamMember ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeTeamMember ? "w-10 bg-brand-pink" : "w-2.5 bg-brand-ink/18 hover:bg-brand-ink/35"
                  }`}
                />
              ))}
              <span className="ml-2 text-xs font-semibold text-brand-ink/40">
                {activeTeamMember + 1} / {teamMembers.length}
              </span>
            </div>
            </div>
          </div>
        </div>
      </section>

      <MortgageJourneyDiscovery />

      <section id="stories" className="relative isolate overflow-hidden py-24 md:py-32">
        <BrandIconMotif className="-right-16 top-12 h-52 w-52 bg-brand-pink opacity-[0.065]" />
        <div className="page-shell relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Recently helped"
            title={<>Real moves. Real people. <span className="accent-word text-brand-pink">Just down the road.</span></>}
          />
          <p className="max-w-md leading-7 text-brand-ink/58">
            Every mortgage has a life happening around it. Here are a few of the situations we help make simpler.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8">
          {cases.map((item) => (
            <article
              key={item.title}
              className={`story-card group relative overflow-hidden rounded-[2.5rem] shadow-[0_24px_70px_rgba(27,21,32,0.14)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_90px_rgba(27,21,32,0.22)] ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className={`object-cover transition duration-[900ms] ease-out group-hover:scale-[1.045] ${item.imagePosition}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171019]/95 via-[#171019]/28 to-[#171019]/20 transition duration-500 group-hover:via-[#171019]/38 group-hover:to-[#171019]/28" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/12 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 flex flex-col justify-between p-7 text-white md:p-9 lg:p-10">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-brand-pink px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] shadow-lg">
                    {item.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/12 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-md">
                    <MapPin className="h-3 w-3 text-brand-green" />
                    {item.secondary}
                  </span>
                </div>

                <div className="max-w-2xl">
                  <h3 className="max-w-[13ch] text-[clamp(2.25rem,4.3vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-base leading-7 text-white/72 md:text-lg md:leading-8">{item.text}</p>
                  <a
                    href="#book"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-ink shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition duration-300 hover:bg-brand-green group-hover:translate-x-1"
                  >
                    {item.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="#stories" variant="ghost" size="lg" className="border border-brand-ink/10 bg-white">
            Read more stories <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        </div>
      </section>

      <div className="flex flex-col">
      <section id="window" className="relative isolate order-3 overflow-hidden bg-[#201528] py-20 text-white md:py-28">
        <div className="pointer-events-none absolute -left-28 top-14 h-72 w-72 rounded-full border-[44px] border-brand-pink/[0.09]" />
        <BrandIconMotif className="-bottom-20 right-[5%] h-60 w-60 bg-brand-green opacity-[0.07]" />
        <div className="page-shell relative grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
          <div className="relative">
            <WindowDisplayExperience {...currentWindowDisplay} />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-brand-green">
              <Sparkles className="h-4 w-4" />
              A little joy on the high street
            </div>
            <h2 className="mt-7 max-w-xl text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              There&apos;s always something new{" "}
              <span className="text-brand-green">in the window.</span>
            </h2>
            <div className="mt-7 max-w-xl space-y-5 text-lg leading-8 text-white/66">
              <p>
                Our window displays change most months, following the seasons, celebrating special occasions and bringing a bit of colour to Kings Heath.
              </p>
              <p>
                They have become a small local tradition. Grown-ups stop for a look, children spot the new details, and we love hearing which display has been everyone&apos;s favourite.
              </p>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">This month</p>
                <p className="mt-2 text-xl font-semibold">Proudly celebrating {currentWindowDisplay.title}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Next up</p>
                <p className="mt-2 text-xl font-semibold">A fresh display and a new surprise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate order-1 overflow-hidden bg-brand-green py-24 md:py-28">
        <BrandRingMotif className="-bottom-28 -left-28 h-80 w-80 border-white/15" />
        <BrandIconMotif className="-right-10 top-8 h-52 w-52 bg-brand-pink opacity-[0.09]" />
        <div className="page-shell relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold">
              <Star className="h-4 w-4 fill-brand-pink text-brand-pink" />
              Kind words
            </div>
            <h2 className="mt-6 text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              From people who have been{" "}
              <span className="accent-word text-brand-pink">in your shoes.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-brand-ink/62">
              The nicest proof is hearing that someone felt informed, supported and a little less stressed.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleTestimonials.map((item, index) => (
              <blockquote
                key={`${reviewOffset}-${item.name}`}
                className={`review-cycle rounded-[2rem] p-7 md:p-8 ${index === 0 ? "bg-brand-ink text-white md:col-span-2" : "bg-white/70"}`}
              >
                <div className={`flex gap-1 ${index === 0 ? "text-brand-green" : "text-brand-pink"}`}>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className={`mt-6 font-medium leading-[1.45] ${index === 0 ? "max-w-3xl text-2xl md:text-3xl" : "text-xl"}`}>
                  “{item.review}”
                </p>
                <footer className={`mt-7 text-sm ${index === 0 ? "text-white/58" : "text-brand-ink/52"}`}>
                  <span className={`font-semibold ${index === 0 ? "text-white" : "text-brand-ink"}`}>{item.name}</span>
                  {" · "}{item.place}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate order-2 overflow-hidden py-24 md:py-32">
        <BrandRingMotif className="-right-32 top-20 h-80 w-80 border-brand-pink/[0.07]" />
        <div className="page-shell relative">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">A little slice of local life</p>
              <h2 className="mt-5 text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
                Kings Heath Corner
              </h2>
            </div>
            <p className="max-w-xl text-xl leading-9 text-brand-ink/60 lg:justify-self-end lg:text-2xl">
              The weather outside, a brilliant local business and today&apos;s soundtrack.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
          <article className="group relative min-h-[500px] overflow-hidden rounded-[2.5rem] bg-[#201528] p-8 text-white lg:col-span-5 md:p-10">
            <BrandIconMotif className="-bottom-16 -left-10 h-44 w-44 bg-brand-green opacity-[0.09]" />
            <Image
              src="/images/2b9cb690-ddbe-4d1d-9f6b-baba116f6c43.png"
              alt="Aerial view across Kings Heath towards Birmingham"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201528] via-[#201528]/65 to-[#201528]/15" />
            <div className="weather-cloud weather-cloud-one absolute right-8 top-14 h-10 w-20 rounded-full bg-white/16 blur-[1px]" />
            <div className="weather-cloud weather-cloud-two absolute right-24 top-28 h-7 w-14 rounded-full bg-white/10 blur-[1px]" />
            <div className="rain-field rain-field-back absolute inset-0" aria-hidden="true">
              {rainDrops.slice(0, 20).map((drop, index) => (
                <span
                  key={`back-${index}`}
                  className="rain-drop"
                  style={{
                    left: drop.left,
                    animationDelay: drop.delay,
                    animationDuration: `${Number.parseFloat(drop.duration) * 1.35}s`,
                    height: drop.height,
                  }}
                >
                  <span className="rain-stem" />
                  <span className="rain-splat" />
                </span>
              ))}
            </div>
            <div className="rain-field rain-field-front absolute inset-0" aria-hidden="true">
              {rainDrops.map((drop, index) => (
                <span
                  key={`front-${index}`}
                  className="rain-drop"
                  style={{
                    left: drop.left,
                    animationDelay: drop.delay,
                    animationDuration: drop.duration,
                    height: drop.height,
                  }}
                >
                  <span className="rain-stem" />
                  <span className="rain-splat" />
                </span>
              ))}
            </div>
            <div className="relative flex h-full min-h-[420px] max-w-md flex-col justify-between">
              <div className="corner-card-label flex items-center gap-2 font-semibold uppercase tracking-[0.16em] text-brand-green">
                <CloudSun className="weather-icon h-5 w-5" />
                Kings Heath Weather
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <CloudRain className="weather-icon h-10 w-10 text-brand-green" />
                  <Umbrella className="h-8 w-8 text-white/45" />
                </div>
                <div className="mt-6 flex items-end gap-4">
                  <span className="text-6xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">19°</span>
                  <span className="mb-1 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur">Rain</span>
                </div>
                <h3 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">Sunshine? Rain? Both?</h3>
                <p className="mt-4 text-lg leading-8 text-white/68">
                  This is Birmingham, after all. Whatever the weather&apos;s doing, there&apos;s always time for a proper brew and a relaxed mortgage chat.
                </p>
              </div>
            </div>
          </article>

          <article className="relative min-h-[430px] overflow-hidden rounded-[2.5rem] border border-brand-pink/10 bg-[#fff5ef] p-8 shadow-[0_22px_55px_rgba(42,25,38,0.08)] lg:col-span-3 lg:mt-14">
            <BrandIconMotif className="-bottom-12 -right-12 h-40 w-40 bg-brand-pink opacity-[0.055]" />
            <div className="relative flex h-full min-h-[366px] flex-col">
              <div className="flex items-center justify-between">
                <p className="corner-card-label font-bold uppercase tracking-[0.18em] text-brand-pink">Local Business of the Month</p>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-pink text-xl text-white" aria-hidden="true">☕</span>
              </div>
              <div className="mt-auto">
                <p className="mb-4 text-sm font-medium text-brand-ink/45">A neighbourly recommendation</p>
                <h3 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">Pause Coffee Shop</h3>
                <p className="mt-5 leading-7 text-brand-ink/60">
                  A neighbourhood favourite for good coffee, friendly faces and the kind of table where mortgage paperwork feels slightly less scary.
                </p>
                <a href="#book" className="mt-7 inline-flex items-center gap-2 border-b border-brand-pink/25 pb-1 text-sm font-bold text-brand-pink transition hover:border-brand-pink hover:text-[#7f2376]">
                  Pop in for a coffee <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          <SoundtrackPlayer {...currentSoundtrack} />
          </div>
        </div>
      </section>
      </div>

      <section id="faq" className="relative isolate overflow-hidden border-t border-brand-ink/8 bg-white py-24 md:py-32">
        <BrandIconMotif className="-bottom-14 -left-12 h-56 w-56 bg-brand-green opacity-[0.08]" />
        <BrandRingMotif className="-right-36 -top-32 h-80 w-80 border-brand-pink/[0.06]" />
        <div className="page-shell relative grid gap-14 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="eyebrow">Good questions</p>
            <h2 className="mt-5 text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              Things people often ask{" "}
              <span className="accent-word text-brand-pink">before we chat.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-brand-ink/58">
              And if yours is not here, ask away. There are no daft mortgage questions.
            </p>
          </div>
          <Accordion className="border-t border-brand-ink/12">
            {faqs.map((item) => (
              <AccordionItem key={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="book" className="bg-brand-pink py-8 md:py-12">
        <div className="page-shell">
          <div className="relative overflow-hidden rounded-[2.75rem] bg-brand-ink px-7 py-12 text-white md:px-14 md:py-16 lg:px-16 lg:py-20">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[56px] border-brand-green/15" />
            <BrandIconMotif className="-bottom-16 left-[38%] h-52 w-52 bg-brand-pink opacity-[0.12]" />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-sm text-brand-green">
                  <MessageCircleMore className="h-4 w-4" />
                  No pressure. Just a useful conversation.
                </div>
                <h2 className="mt-7 max-w-3xl text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                  Ready when you are. <span className="accent-word text-brand-green">Kettle&apos;s on.</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                  Tell us what you are planning and we will find a good time to talk it through. Video call, phone call or a local coffee—whatever feels easiest.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  ["A relaxed phone call", "Usually 20–30 minutes", MessageCircleMore],
                  ["A video appointment", "From your sofa, naturally", CalendarDays],
                  ["An in-person chat", "Meet locally over a coffee", Coffee],
                  ["A proper email", "If typing it out is easier", Mail],
                ].map(([title, detail, Icon]) => (
                  <a
                    key={String(title)}
                    href="mailto:hello@eatonmortgages.co.uk"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/10"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-green text-brand-ink">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{String(title)}</p>
                      <p className="mt-1 text-sm text-white/48">{String(detail)}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-brand-green transition group-hover:translate-x-1" />
                  </a>
                ))}
                <Button
                  href="mailto:hello@eatonmortgages.co.uk"
                  variant="secondary"
                  size="lg"
                  className="mt-2 w-full"
                >
                  Book A Chat <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
