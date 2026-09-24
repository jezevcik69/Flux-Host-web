import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Magnetic } from "./Magnetic";

const EASE = [0.23, 1, 0.32, 1] as const;
const HEADLINE = ["Servers for your community,", "live in minutes"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduce) video.current?.pause();
  }, [reduce]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const reveal = (d: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", transform: "translateY(14px)" },
    animate: reduce ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" },
    transition: { duration: 1.1, delay: reduce ? 0 : d, ease: EASE },
  });

  let w = 0;
  return (
    <section id="top" ref={ref} className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black px-4">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: EASE }}
        style={reduce ? undefined : { scale: bgScale }}
      >
        <video
          ref={video}
          className="size-full object-cover"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/hero-poster.jpg"
          aria-hidden
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      {/* darken for legible copy, strongest in the centre */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgb(0_0_0/0.55),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <motion.div style={reduce ? undefined : { y, opacity }} className="relative z-10 flex flex-col items-center text-center">
        <motion.p {...reveal(0.2)} className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
          Discord bot, Minecraft &amp; Hytale hosting
        </motion.p>

        <h1 className="mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.035em]">
          {HEADLINE.map((line, li) => (
            <span key={li} className={`block ${li === 1 ? "text-zinc-400" : "text-paper"}`}>
              {line.split(" ").map((word) => {
                const d = 0.35 + w++ * 0.07;
                return (
                  <motion.span key={word + d} className="inline-block whitespace-pre" {...reveal(d)}>
                    {word}{" "}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div {...reveal(0.95)} className="mt-10">
          <Magnetic>
            <a
              href="#hry"
              className="rounded-full border border-white/25 bg-white/[0.04] px-8 py-3.5 text-[15px] text-paper backdrop-blur-md transition-[background-color,border-color,transform] duration-200 hover:border-white/50 hover:bg-white/10 active:scale-[0.97]"
            >
              Choose a game
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.a
        {...reveal(1.2)}
        href="#cenik"
        className="absolute bottom-10 z-10 text-sm font-medium text-paper/90 transition-colors hover:text-white"
      >
        View plans
      </motion.a>
    </section>
  );
}
