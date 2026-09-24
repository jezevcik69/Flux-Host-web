import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { House, Stack, Tag, Question, ChatCircle, List, X, ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { CATEGORIES, allPlans, fmt, type CategoryId } from "./Pricing";

export const SECTIONS = [
  { id: "top", label: "Home", icon: House },
  { id: "sluzby", label: "Services", icon: Stack },
  { id: "cenik", label: "Plans", icon: Tag },
  { id: "faq", label: "FAQ", icon: Question },
  { id: "kontakt", label: "Contact", icon: ChatCircle },
] as const;

const LINKS = SECTIONS.filter((s) => s.id !== "top");

const GAMES: { id: CategoryId; title: string; logo: string; blurb: string }[] = [
  { id: "discord", title: "Discord bots", logo: "/img/discord.svg", blurb: "Node.js, Python, Rust" },
  { id: "minecraft", title: "Minecraft", logo: "/img/grass-block.png", blurb: "Paper, Fabric, modpacks" },
  { id: "hytale", title: "Hytale", logo: "/img/hytale-logo.png", blurb: "Servers from day one" },
];
const priceFrom = (id: CategoryId) => fmt(Math.min(...allPlans(CATEGORIES.find((c) => c.id === id)!).map((p) => p.month)));

const EASE = [0.23, 1, 0.32, 1] as const;

function useScrollSpy() {
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function GamesMenu({ onPick }: { onPick?: () => void }) {
  return (
    <div className="grid gap-1">
      {GAMES.map((g) => (
        <a
          key={g.id}
          href="#hry"
          onClick={onPick}
          className="group flex items-center gap-4 rounded-2xl p-3 transition-colors duration-150 hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-inset ring-white/[0.08]">
            <img src={g.logo} alt="" className="size-7 object-contain" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold text-paper">{g.title}</span>
            <span className="block text-[13px] text-zinc-400">{g.blurb}</span>
          </span>
          <span className="text-right text-[12px] text-zinc-500">
            from
            <span className="block text-[14px] font-semibold text-paper">€{priceFrom(g.id)}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function Nav() {
  const active = useScrollSpy();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [games, setGames] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    if (open || games) return;
    setHidden(v > 600 && v > prev + 4 ? true : v < prev - 4 ? false : hidden);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGames(false);
        setOpen(false);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const openGames = () => {
    clearTimeout(closeTimer.current);
    setGames(true);
  };
  const closeGames = () => {
    closeTimer.current = setTimeout(() => setGames(false), 120);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:pt-4"
      animate={{ transform: hidden && !reduce ? "translateY(-130%)" : "translateY(0%)" }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <motion.nav
        layout={!reduce}
        transition={{ layout: { type: "spring", duration: 0.55, bounce: 0.12 } }}
        style={{ borderRadius: 999 }}
        className={`relative mx-auto flex h-14 items-center justify-between gap-6 border pl-4 pr-1.5 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? "max-w-[860px] border-white/10 bg-[#07070c]/75 shadow-[0_16px_48px_-16px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.08)]"
            : "max-w-[1120px] border-white/[0.07] bg-white/[0.035] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
        }`}
      >
        <motion.a layout={!reduce ? "position" : false} href="#top" className="group flex shrink-0 items-center gap-2.5" aria-label="Flux-Host home">
          <img
            src="/img/logo.png"
            alt=""
            width={26}
            height={25}
            className="h-6 w-auto transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:-rotate-6 group-hover:scale-110"
          />
          <span className="text-[15px] font-semibold tracking-[-0.02em]">Flux-Host</span>
        </motion.a>

        <motion.ul layout={!reduce ? "position" : false} className="hidden items-center lg:flex" onPointerLeave={() => setHovered(null)}>
          {/* Games dropdown trigger */}
          <li className="relative" onPointerEnter={() => { setHovered("games"); openGames(); }} onPointerLeave={closeGames}>
            {(hovered ? hovered === "games" : false) && (
              <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.08]" transition={{ type: "spring", duration: 0.4, bounce: 0.12 }} />
            )}
            <button
              type="button"
              aria-expanded={games}
              aria-controls="games-menu"
              onClick={() => setGames((g) => !g)}
              className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${games || hovered === "games" ? "text-paper" : "text-zinc-400"}`}
            >
              Games
              <CaretDown size={11} weight="bold" className={`transition-transform duration-200 ease-[var(--ease-out-strong)] ${games ? "rotate-180" : ""}`} />
            </button>
          </li>

          {LINKS.map(({ id, label }) => {
            const isActive = active === id;
            const lit = hovered ? hovered === id : isActive;
            return (
              <li key={id} className="relative" onPointerEnter={() => setHovered(id)}>
                {lit && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.08]" transition={{ type: "spring", duration: 0.4, bounce: 0.12 }} />
                )}
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${lit || isActive ? "text-paper" : "text-zinc-400"}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </motion.ul>

        <motion.div layout={!reduce ? "position" : false} className="flex shrink-0 items-center gap-1.5">
          <a
            href="#cenik"
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-paper py-2.5 pl-5 pr-4 text-[13px] font-semibold text-ink shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_6px_20px_-6px_rgb(47_123_255/0.6)] transition-transform duration-150 active:scale-[0.97] sm:flex"
          >
            {/* sheen sweeps across on hover */}
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#2f7bff]/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:translate-x-[300%]" />
            <span className="relative">Client area</span>
            <ArrowUpRight size={14} weight="bold" className="relative transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] lg:hidden"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? "x" : "list"}
                initial={{ opacity: 0, transform: "rotate(-90deg) scale(0.8)" }}
                animate={{ opacity: 1, transform: "rotate(0deg) scale(1)" }}
                exit={{ opacity: 0, transform: "rotate(90deg) scale(0.8)" }}
                transition={{ duration: 0.18, ease: EASE }}
                className="grid"
              >
                {open ? <X size={18} /> : <List size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>

        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-[#2f7bff] to-[#6aa8ff]"
          style={{ scaleX: progress }}
        />

        {/* Games dropdown */}
        <AnimatePresence>
          {games && (
            <motion.div
              id="games-menu"
              onPointerEnter={openGames}
              onPointerLeave={closeGames}
              initial={{ opacity: 0, transform: "translateX(-50%) translateY(-6px) scale(0.97)" }}
              animate={{ opacity: 1, transform: "translateX(-50%) translateY(0px) scale(1)" }}
              exit={{ opacity: 0, transform: "translateX(-50%) translateY(-6px) scale(0.97)" }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute left-1/2 top-[calc(100%+10px)] hidden w-[400px] origin-top rounded-3xl border border-white/10 bg-[#0a0a12]/90 p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.9)] backdrop-blur-2xl lg:block"
            >
              <GamesMenu onPick={() => setGames(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            transition={{ duration: 0.22, ease: EASE }}
            className="mx-auto mt-2 max-w-[1120px] origin-top rounded-3xl border border-white/10 bg-[#07070c]/90 p-2 backdrop-blur-2xl lg:hidden"
          >
            <GamesMenu onPick={() => setOpen(false)} />
            <div className="my-2 h-px bg-white/[0.06]" />
            <ul className="grid grid-cols-2 gap-1">
              {LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-[15px] ${active === id ? "bg-white/[0.06] text-paper" : "text-zinc-300"}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#cenik"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-paper py-3.5 font-semibold text-ink"
            >
              Client area <ArrowUpRight size={14} weight="bold" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
