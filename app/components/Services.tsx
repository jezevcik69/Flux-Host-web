import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import type { Icon } from "@phosphor-icons/react";
import { Cube, Robot, Sword, ShieldCheck, ClockCounterClockwise } from "@phosphor-icons/react";

type Service = { icon: Icon; title: string; body: string; image: string; alt?: string };

const SERVICES: Service[] = [
  {
    icon: Cube,
    title: "Minecraft servers",
    body: "Paper, Fabric, Forge and modpacks from CurseForge and Modrinth. Switch versions in one click.",
    image: "/img/minecraft-bg.png",
  },
  {
    icon: Robot,
    title: "Discord bots",
    image: "/img/svc-code.jpg",
    body: "Node.js, Python or Rust. Your bot runs 24/7 and restarts itself after a crash.",
  },
  {
    icon: Sword,
    title: "Hytale servers",
    image: "/img/hytale-bg.png",
    body: "Ready for Hytale from day one. Launch a server without manual setup.",
  },
  {
    icon: ShieldCheck,
    title: "DDoS protection",
    image: "/img/alt-servers.jpg",
    body: "We filter attacks at the network edge before they reach your server.",
  },
  {
    icon: ClockCounterClockwise,
    title: "Daily backups",
    image: "/img/svc-backup.jpg",
    body: "Worlds and bot data are backed up every night. Restore from the panel yourself.",
  },
];

function SpotlightCard({ s, i }: { s: Service; i: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, rgb(255 255 255 / .10), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(255 255 255 / .45), transparent 70%)`;
  const Icon = s.icon;
  const wide = i === 0;

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(32px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={`group relative overflow-hidden rounded-2xl bg-ink-2 p-px ${wide ? "md:col-span-2" : ""}`}
    >
      {/* border that lights up under the cursor */}
      <motion.div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: border }} />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-ink-2 ring-1 ring-line">
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className={`relative ${wide ? "h-56 md:h-80" : "h-44"} overflow-hidden`}>
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              className="size-full object-cover opacity-60 transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />
          </div>
        <div className="relative flex flex-1 flex-col gap-3 p-8">
          <Icon size={28} weight="light" className="text-paper" />
          <h3 className="mt-2 font-medium tracking-[-0.02em] text-3xl">{s.title}</h3>
          <p className="max-w-[46ch] leading-relaxed text-mute">{s.body}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="sluzby" className="mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">
            One panel for everything
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-mute">
            Manage Minecraft, Hytale and Discord bots in one place. Console, files and backups in your browser.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <SpotlightCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
