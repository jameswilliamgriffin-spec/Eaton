"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Home,
  KeyRound,
  Lightbulb,
  Search,
  Sparkles,
} from "lucide-react";
import { BrandIconMotif, BrandRingMotif } from "@/components/brand-motif";

const heroImages = [
  {
    src: "/images/4a7efc33-9fd3-49a9-ad6f-97076f37db9d.png",
    alt: "A leafy residential street in Kings Heath",
  },
  {
    src: "/images/1757348987796538_447422_IMG.jpg",
    alt: "Characterful family houses on a sunny Kings Heath street",
  },
  {
    src: "/images/kingsheathhouses1.jpg",
    alt: "A tree-lined row of red-brick homes in Kings Heath",
  },
  {
    src: "/images/2b9cb690-ddbe-4d1d-9f6b-baba116f6c43.png",
    alt: "An aerial view across Kings Heath towards Birmingham",
  },
];

export function PageAtmosphere() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const motifs = gsap.utils.toArray<HTMLElement>("[data-ambient-brand]");
      const tweens = motifs.map((motif, index) =>
        gsap.to(motif, {
          yPercent: index % 2 === 0 ? -20 : 17,
          rotation: index % 2 === 0 ? 5 : -4,
          ease: "none",
          scrollTrigger: {
            trigger: motif.parentElement ?? motif,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        }),
      );

      cleanup = () => {
        tweens.forEach((tween) => tween.kill());
      };
    });

    return () => cleanup();
  }, []);

  return <div className="site-grain pointer-events-none fixed inset-0 z-[100] opacity-[0.035]" aria-hidden="true" />;
}

export function HeroAtmosphere() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const updatePerspective = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--hero-tilt-x", `${(0.5 - y) * 2.5}deg`);
    event.currentTarget.style.setProperty("--hero-tilt-y", `${(x - 0.5) * 3.5}deg`);
  };

  const resetPerspective = () => {
    sceneRef.current?.style.setProperty("--hero-tilt-x", "0deg");
    sceneRef.current?.style.setProperty("--hero-tilt-y", "0deg");
  };

  return (
    <div
      ref={sceneRef}
      onPointerMove={updatePerspective}
      onPointerLeave={resetPerspective}
      className="hero-photo hero-atmosphere absolute inset-y-0 left-0 w-[calc(100%+max(2rem,(100vw-80rem)/2))] overflow-hidden rounded-l-[3rem] bg-brand-sand shadow-[0_30px_90px_rgba(40,25,38,0.16)]"
    >
      <div className="hero-atmosphere-image absolute inset-[-2%]">
        {heroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className={`hero-slide object-cover object-center ${index === activeImage ? "is-active" : ""}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/18 via-transparent to-transparent" />
      <div className="hero-atmosphere-light absolute inset-0" />
      <div className="hero-atmosphere-vignette absolute inset-0" />
      <BrandIconMotif className="hero-atmosphere-mark right-[8%] top-[10%] h-72 w-72 bg-white opacity-[0.11]" />

      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-brand-pink px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(150,46,139,0.28)] sm:left-7 sm:top-7">
        Local. Independent. Lovely.
        <Heart className="hero-heart h-4 w-4 fill-white text-white" aria-hidden="true" />
      </div>
    </div>
  );
}

const discoveryStages = [
  {
    label: "Just wondering",
    eyebrow: "No pressure",
    title: "Start with the life you want—not a lender’s form.",
    text: "Tell us the rough shape of things. We’ll help turn the fog into a useful first number.",
    note: "A conversation before a calculation.",
    icon: Search,
  },
  {
    label: "Found a place",
    eyebrow: "The exciting bit",
    title: "You bring the Rightmove link. We’ll bring the calm thinking.",
    text: "We sense-check affordability, explain the trade-offs and help you move with confidence.",
    note: "Clear options, without the hard sell.",
    icon: Home,
  },
  {
    label: "Offer accepted",
    eyebrow: "Things get real",
    title: "While everyone else chases paperwork, we keep the story moving.",
    text: "Applications, documents, updates and awkward little questions—handled with you, not around you.",
    note: "No disappearing acts after submission.",
    icon: Check,
  },
  {
    label: "Keys in hand",
    eyebrow: "Made it home",
    title: "The final email is lovely. The first cup of tea is better.",
    text: "We stay close through completion, so the mortgage ends with a moment worth remembering.",
    note: "From first thought to front door.",
    icon: KeyRound,
  },
];

export function MortgageJourneyDiscovery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stage = discoveryStages[activeStage];
  const Icon = stage.icon;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-discovery-aurora]").forEach((layer, index) => {
          gsap.to(layer, {
            yPercent: index === 0 ? -13 : index === 1 ? 9 : -7,
            xPercent: index === 0 ? 3 : index === 1 ? -5 : 2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8 + index * 0.4,
            },
          });
        });
      }, sectionRef);

      cleanup = () => context.revert();
    });

    return () => cleanup();
  }, []);

  const updateSpotlight = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--discovery-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--discovery-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <section ref={sectionRef} className="discovery-section relative isolate overflow-hidden bg-brand-ink py-24 text-white md:py-32">
      <div className="discovery-aurora-field pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div data-discovery-aurora className="discovery-aurora-parallax">
          <div className="discovery-aurora discovery-aurora-one" />
        </div>
        <div data-discovery-aurora className="discovery-aurora-parallax">
          <div className="discovery-aurora discovery-aurora-two" />
        </div>
        <div data-discovery-aurora className="discovery-aurora-parallax">
          <div className="discovery-aurora discovery-aurora-three" />
        </div>
        <div className="discovery-aurora-vignette absolute inset-0" />
        <div className="discovery-grain absolute inset-0" />
      </div>
      <BrandIconMotif className="-left-24 top-12 h-80 w-80 bg-brand-green opacity-[0.055]" />
      <BrandIconMotif className="-bottom-32 right-[-3rem] h-96 w-96 bg-brand-pink opacity-[0.075]" />
      <div className="page-shell relative">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">A journey you can touch</p>
            <h2 className="mt-5 text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              Where are you in the{" "}
              <span className="accent-word text-brand-green">home story?</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/58 lg:justify-self-end">
            Pick the moment that feels closest. The advice changes, but the feeling we aim for does not: clearer, calmer, moving forward.
          </p>
        </div>

        <div
          onPointerMove={updateSpotlight}
          className="discovery-stage mt-14 overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_34px_90px_rgba(0,0,0,0.28)] backdrop-blur md:p-5"
        >
          <div className="discovery-spotlight" aria-hidden="true" />
          <div className="relative grid min-h-[530px] gap-3 lg:grid-cols-[0.76fr_1.24fr]">
            <div className="flex flex-col justify-between rounded-[2.1rem] border border-white/8 bg-black/15 p-6 md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/38">Choose your chapter</p>
                <div className="mt-6 grid gap-2">
                  {discoveryStages.map((item, index) => {
                    const StageIcon = item.icon;
                    const isActive = index === activeStage;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveStage(index)}
                        className={`group flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-300 ${
                          isActive
                            ? "border-brand-green/45 bg-brand-green text-brand-ink shadow-[0_14px_35px_rgba(175,206,84,0.15)]"
                            : "border-white/8 bg-white/[0.035] text-white/62 hover:border-white/18 hover:bg-white/[0.07] hover:text-white"
                        }`}
                      >
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${isActive ? "bg-brand-ink text-brand-green" : "bg-white/8"}`}>
                          <StageIcon className="h-4 w-4" />
                        </span>
                        <span className="font-semibold">{item.label}</span>
                        <ArrowRight className={`ml-auto h-4 w-4 transition ${isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-8 text-sm leading-6 text-white/38">
                There is no wrong place to begin. Curiosity counts.
              </p>
            </div>

            <div className="relative flex overflow-hidden rounded-[2.1rem] bg-[#fff9f5] p-7 text-brand-ink md:p-10 lg:p-12">
              <BrandRingMotif className="-right-24 -top-24 h-72 w-72 border-brand-pink/[0.08]" />
              <BrandIconMotif className="-bottom-16 right-[24%] h-52 w-52 bg-brand-pink opacity-[0.045]" />
              <div key={stage.label} className="discovery-copy relative flex w-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
                      <Icon className="h-3.5 w-3.5" />
                      {stage.eyebrow}
                    </span>
                    <span className="text-sm font-semibold text-brand-ink/30">0{activeStage + 1} / 04</span>
                  </div>
                  <h3 className="mt-8 max-w-3xl text-[clamp(2.5rem,4.5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                    {stage.title}
                  </h3>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ink/58">{stage.text}</p>
                </div>
                <div className="mt-10 flex flex-col gap-5 border-t border-brand-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="accent-word text-3xl text-brand-pink">{stage.note}</p>
                  <div className="journey-key-orbit grid h-16 w-16 place-items-center rounded-full bg-brand-green text-brand-ink">
                    <KeyRound className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const windowSparkles = Array.from({ length: 18 }, (_, index) => ({
  left: `${8 + ((index * 37) % 84)}%`,
  top: `${9 + ((index * 29) % 76)}%`,
  delay: `${(index % 6) * 0.12}s`,
  size: `${5 + (index % 4) * 2}px`,
}));

export function WindowDisplayExperience({
  image,
  alt,
  title,
  season,
}: {
  image: string;
  alt: string;
  title: string;
  season: string;
}) {
  const [lightsOn, setLightsOn] = useState(false);

  return (
    <div className={`window-experience relative ${lightsOn ? "is-lit" : ""}`}>
      <div className="window-rainbow-frame absolute -inset-2 rounded-[2.75rem] bg-gradient-to-br from-[#e94857] via-[#f4ca3f] to-[#5ebc67] opacity-90" />
      <figure className="relative overflow-hidden rounded-[2.4rem] bg-brand-ink shadow-[0_32px_90px_rgba(5,2,8,0.38)]">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="window-display-image object-cover"
          />
          <div className="window-night-glass absolute inset-0 bg-[#140d18]/42 mix-blend-multiply" />
          <div className="window-light-wash absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-ink/65 to-transparent" />

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {windowSparkles.map((sparkle, index) => (
              <span
                key={index}
                className="window-sparkle absolute rounded-full bg-white"
                style={{ left: sparkle.left, top: sparkle.top, animationDelay: sparkle.delay, width: sparkle.size, height: sparkle.size }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLightsOn((current) => !current)}
            aria-pressed={lightsOn}
            className="window-light-switch absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-brand-ink/72 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-xl backdrop-blur-md transition hover:scale-[1.03] hover:bg-brand-pink md:right-7 md:top-7"
          >
            {lightsOn ? <Sparkles className="h-4 w-4 text-brand-green" /> : <Lightbulb className="h-4 w-4 text-brand-green" />}
            {lightsOn ? "Window glowing" : "Switch on the display"}
          </button>

          <figcaption className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-brand-ink/70 px-5 py-4 text-sm backdrop-blur-md md:bottom-7 md:left-7 md:right-7">
            <span className="font-semibold">Now showing: {title}</span>
            <span className="shrink-0 text-white/58">{season}</span>
          </figcaption>
        </div>
      </figure>
      <p className={`window-secret-note absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-brand-green transition duration-500 ${lightsOn ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
        You found the high-street magic
      </p>
    </div>
  );
}
