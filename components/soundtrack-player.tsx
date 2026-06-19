"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";

type SoundtrackPlayerProps = {
  title: string;
  artist: string;
  note: string;
  artwork: string;
  audioSrc: string;
};

const equaliserBars = [0.65, 1, 0.78, 0.9];

export function SoundtrackPlayer({
  title,
  artist,
  note,
  artwork,
  audioSrc,
}: SoundtrackPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const rotation = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);

  useAnimationFrame((_, delta) => {
    const targetVelocity = isPlaying && !reduceMotion ? 360 / 18 : 0;
    const easing = Math.min(delta / (isPlaying ? 650 : 520), 1);
    velocityRef.current += (targetVelocity - velocityRef.current) * easing;
    rotation.set(rotation.get() + velocityRef.current * (delta / 1000));
  });

  useEffect(() => {
    return () => {
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    };
  }, []);

  const fadeVolume = (target: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);

    const startVolume = audio.volume;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = startVolume + (target - startVolume) * eased;

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(tick);
      } else {
        fadeFrameRef.current = null;
        onComplete?.();
      }
    };

    fadeFrameRef.current = requestAnimationFrame(tick);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsPlaying(false);
      fadeVolume(0, 850, () => audio.pause());
      return;
    }

    audio.volume = 0;
    try {
      await audio.play();
      setIsPlaying(true);
      fadeVolume(0.82, 1000);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <article className={`soundtrack-card relative flex min-h-[470px] flex-col overflow-hidden rounded-[2.5rem] bg-[#f0ddea] p-8 lg:col-span-4 md:p-9 ${isPlaying ? "is-playing" : ""}`}>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <div className="soundtrack-active-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative flex items-center justify-between">
        <p className="corner-card-label font-bold uppercase tracking-[0.18em] text-brand-pink">Today&apos;s Soundtrack</p>
        <div className="music-dance grid h-11 w-11 place-items-center rounded-full bg-brand-pink text-white">
          <Music2 className="h-5 w-5" />
        </div>
      </div>

      <div className="relative">
        <div className="relative mx-auto my-5 h-64 w-64 sm:h-72 sm:w-72 lg:h-64 lg:w-64 xl:h-72 xl:w-72">
          <div className="soundtrack-record-glow pointer-events-none absolute inset-[8%] rounded-full" aria-hidden="true" />
          <motion.div style={{ rotate: rotation }} className="relative h-full w-full">
            <Image
              src={artwork}
              alt="Vinyl record"
              width={450}
              height={450}
              className="h-full w-full object-contain drop-shadow-[0_20px_25px_rgba(40,20,38,0.22)]"
            />
          </motion.div>

          <motion.button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? `Pause ${title} by ${artist}` : `Play ${title} by ${artist}`}
            aria-pressed={isPlaying}
            animate={isPlaying && !reduceMotion ? { scale: [1, 1.035, 1] } : { scale: 1 }}
            transition={isPlaying && !reduceMotion ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.25 }}
            className="group/play absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/45 bg-brand-ink px-3 py-2.5 text-xs font-bold text-white shadow-[0_16px_35px_rgba(27,21,32,0.28)] backdrop-blur transition-colors duration-300 hover:bg-brand-pink"
          >
            <span className={`grid h-8 w-8 place-items-center rounded-full transition duration-300 group-hover/play:scale-110 ${isPlaying ? "bg-brand-pink text-white" : "bg-brand-green text-brand-ink"}`}>
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
            </span>
            {isPlaying ? "Pause track" : "Play track"}
          </motion.button>
        </div>

        <div className="grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_124px]">
          <div className="min-w-0">
            <h3 className="max-w-[13ch] text-[clamp(1.9rem,3vw,2.3rem)] font-semibold leading-[1.02] tracking-[-0.035em]">{title}</h3>
            <p className="mt-1 text-lg text-brand-ink/55">{artist}</p>
          </div>

          <div className="hidden w-[124px] justify-items-center gap-2 sm:grid">
            <div className={`soundtrack-equaliser flex h-10 items-center gap-1.5 rounded-xl bg-brand-pink/[0.08] px-2.5 py-2 ${isPlaying ? "is-active" : ""}`} aria-hidden="true">
              {equaliserBars.map((height, index) => (
                <motion.span
                  key={index}
                  animate={isPlaying && !reduceMotion ? { scaleY: [0.28, height, 0.42, 0.85, 0.28] } : { scaleY: isPlaying ? height : 0.22 }}
                  transition={{
                    duration: 0.9 + index * 0.11,
                    repeat: isPlaying && !reduceMotion ? Infinity : 0,
                    ease: "easeInOut",
                    delay: index * 0.08,
                  }}
                  className="h-7 w-1.5 origin-center rounded-full bg-brand-pink"
                />
              ))}
            </div>
            <motion.div
              animate={{ opacity: isPlaying ? 1 : 0, y: isPlaying ? 0 : 4 }}
              className="flex items-center gap-2 rounded-full bg-brand-ink/8 px-3 py-2.5 text-[9px] font-extrabold uppercase tracking-[0.13em] text-brand-pink"
            >
              <span className="now-playing-dot h-2 w-2 rounded-full bg-brand-pink" />
              Now playing
            </motion.div>
          </div>

          <div className="mt-2 flex items-center gap-3 sm:hidden">
            <div className={`soundtrack-equaliser flex h-9 items-center gap-1 rounded-xl bg-brand-pink/[0.08] px-2 py-1.5 ${isPlaying ? "is-active" : ""}`} aria-hidden="true">
              {equaliserBars.map((height, index) => (
                <motion.span
                  key={index}
                  animate={isPlaying && !reduceMotion ? { scaleY: [0.28, height, 0.42, 0.85, 0.28] } : { scaleY: isPlaying ? height : 0.22 }}
                  transition={{
                    duration: 0.9 + index * 0.11,
                    repeat: isPlaying && !reduceMotion ? Infinity : 0,
                    ease: "easeInOut",
                    delay: index * 0.08,
                  }}
                  className="h-6 w-1 origin-center rounded-full bg-brand-pink"
                />
              ))}
            </div>
            <motion.div
              animate={{ opacity: isPlaying ? 1 : 0, y: isPlaying ? 0 : 4 }}
              className="flex items-center gap-2 rounded-full bg-brand-ink/8 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-brand-pink"
            >
              <span className="now-playing-dot h-2 w-2 rounded-full bg-brand-pink" />
              Now playing
            </motion.div>
          </div>
        </div>

        <p className="mt-5 max-w-sm leading-7 text-brand-ink/60">{note}</p>
      </div>
    </article>
  );
}
