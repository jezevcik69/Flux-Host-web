import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { CATEGORIES, allPlans, fmt, type CategoryId } from "./Pricing";
import { DiscordArt } from "./DiscordArt";

type Game = {
  id: CategoryId;
  title: string;
  body: string;
  bg?: string;
  logo?: string;
  logoClass: string;
  tint: string;
};

const GAMES: Game[] = [
  {
    id: "discord",
    title: "Discord bot hosting",
    body: "Node.js, Python and Rust. Online 24/7.",
    logoClass: "",
    tint: "bg-gradient-to-t from-ink via-ink/40 to-transparent",
  },
  {
    id: "minecraft",
    title: "Minecraft server hosting",
    body: "Paper, Fabric, Forge and one-click modpacks.",
    bg: "/img/minecraft-bg.png",
    logo: "/img/grass-block.png",
    logoClass: "w-28 md:w-36",
    tint: "bg-gradient-to-t from-ink via-ink/50 to-ink/10",
  },
  {
    id: "hytale",
    title: "Hytale server hosting",
    body: "Your own world for your community from day one.",
    bg: "/img/hytale-bg.png",
    logo: "/img/hytale-logo.png",
    logoClass: "w-24 md:w-32",
    tint: "bg-gradient-to-t from-ink via-ink/50 to-ink/10",
  },
  {
    id: "cs2",
    title: "Counter-Strike 2 hosting",
    body: "128-tick servers, workshop maps and plugins.",
    logoClass: "",
    tint: "bg-gradient-to-t from-ink via-ink/40 to-transparent",
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

function GameCard({ g, i, onPick }: { g: Game; i: number; onPick: (id: CategoryId) => void }) {
  const reduce = useReducedMotion();
  const from = fmt(Math.min(...allPlans(CATEGORIES.find((c) => c.id === g.id)!).map((p) => p.month)));

  // 3D tilt following the pointer
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 160, damping: 18 });
  const lx = useSpring(useTransform(px, [0, 1], [-18, 18]), { stiffness: 120, damping: 16 });
  const ly = useSpring(useTransform(py, [0, 1], [-14, 14]), { stiffness: 120, damping: 16 });

  return (
    <motion.button
      type="button"
      onClick={() => onPick(g.id)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(40px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className="group text-left [perspective:1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
    >
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative flex h-[440px] flex-col justify-end overflow-hidden rounded-3xl bg-ink-2 ring-1 ring-line md:h-[540px]"
      >
        {g.bg && (
          <img
            src={g.bg}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-strong)] group-hover:scale-[1.08]"
          />
        )}
        {(g.id === "discord" || g.id === "cs2") && <DiscordArt theme={g.id} logoClass="w-32 md:w-40" />}
        <div className={`absolute inset-0 ${g.tint}`} />

        {g.logo && <motion.img
          src={g.logo}
          alt=""
          aria-hidden
          style={reduce ? undefined : { x: lx, y: ly, translateZ: 60 }}
          className={`absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_40px_rgb(0_0_0/0.55)] transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-110 ${g.logoClass}`}
        />}

        <div className="relative p-8">
          <h3 className="font-medium tracking-[-0.02em] text-3xl leading-tight md:text-4xl">{g.title}</h3>
          <p className="mt-2 max-w-[32ch] text-zinc-300">{g.body}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-zinc-300">
              from <span className="text-2xl font-medium text-paper">€{from}</span> / month
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-paper px-5 py-3 font-medium text-ink transition-transform duration-150 group-active:scale-[0.97]">
              View plans
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

export function GameSelect({ onPick }: { onPick: (id: CategoryId) => void }) {
  return (
    <section id="hry" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">What do you want to host?</h2>
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {GAMES.map((g, i) => (
          <GameCard key={g.id} g={g} i={i} onPick={onPick} />
        ))}
      </div>
    </section>
  );
}
