import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { LANGS, useLang, type Key } from "../i18n";
import { House, Stack, Tag, Question, ChatCircle, List, X, ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { CATEGORIES, allPlans, fmt, type CategoryId } from "./Pricing";

export const SECTIONS = [
  { id: "top", label: "home" as Key, icon: House },
  { id: "sluzby", label: "services" as Key, icon: Stack },
  { id: "cenik", label: "plans" as Key, icon: Tag },
  { id: "faq", label: "faq" as Key, icon: Question },
  { id: "kontakt", label: "contact" as Key, icon: ChatCircle },
] as const;

const LINKS = SECTIONS.filter((s) => s.id !== "top");

const GAMES: { id: CategoryId; title: Key; logo: string; blurb: Key }[] = [
  { id: "discord", title: "discordTitle", logo: "/img/discord.svg", blurb: "discordBlurb" },
  { id: "minecraft", title: "discordTitle", logo: "/img/grass-block.png", blurb: "mcBlurb" },
  { id: "hytale", title: "discordTitle", logo: "/img/hytale-logo.png", blurb: "hyBlurb" },
  { id: "cs2", title: "discordTitle", logo: "/img/cs2.svg", blurb: "csBlurb" },
];
const GAME_NAMES: Partial<Record<CategoryId, string>> = { minecraft: "Minecraft", hytale: "Hytale", cs2: "Counter-Strike 2" };
const priceFrom = (id: CategoryId) => fmt(Math.min(...allPlans(CATEGORIES.find((c) => c.id === id)!).map((p) => p.month)));

const EASE = [0.23, 1, 0.32, 1] as const;
const MENU_BG = "/herooo.mp4";

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

const list = { hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 380, damping: 30 } },
} as const;

function GamesMenu({ onPick, idPrefix }: { onPick?: () => void; idPrefix: string }) {
  const { t } = useLang();
  const [hover, setHover] = useState<CategoryId | null>(null);
  return (
    <motion.div variants={list} initial="hidden" animate="show" className="relative grid gap-1" onPointerLeave={() => setHover(null)}>
      {GAMES.map((g) => {
        const on = hover === g.id;
        return (
          <motion.a
            key={g.id}
            variants={item}
            href="#hry"
            onClick={onPick}
            onPointerEnter={() => setHover(g.id)}
            onFocus={() => setHover(g.id)}
            className="relative flex items-center gap-4 rounded-2xl p-3 focus-visible:outline-none"
          >
            {on && (
              <motion.span
                layoutId={`${idPrefix}-game-hover`}
                className="absolute inset-0 rounded-2xl bg-white/[0.09] shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <motion.span
              animate={on ? { rotate: -6, scale: 1.08 } : { rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
              className="relative grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.08] ring-1 ring-inset ring-white/[0.12] backdrop-blur-md"
            >
              <img src={g.logo} alt="" className="size-7 object-contain" />
            </motion.span>
            <span className="relative min-w-0 flex-1">
              <span className="block text-[14px] font-semibold text-paper">{GAME_NAMES[g.id] ?? t(g.title)}</span>
              <span className="block text-[13px] text-zinc-300/80">{t(g.blurb)}</span>
            </span>
            <motion.span
              animate={{ x: on ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative text-right text-[12px] text-zinc-400"
            >
              {t("from")}
              <span className="block text-[14px] font-semibold text-paper">€{priceFrom(g.id)}</span>
            </motion.span>
            <motion.span
              animate={{ opacity: on ? 1 : 0, x: on ? 0 : -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="relative -ml-2 text-paper"
            >
              <ArrowUpRight size={14} weight="bold" />
            </motion.span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}

function GlassPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`liquid-glass overflow-hidden rounded-3xl ${className}`}>
      <video
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-60"
        src={MENU_BG}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#05050a]/45" />
      {children}
    </div>
  );
}

function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t("language")} className="relative flex rounded-full bg-white/[0.06] p-1 ring-1 ring-inset ring-white/[0.08]">
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          aria-pressed={lang === l.id}
          onClick={() => setLang(l.id)}
          className={`relative rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${lang === l.id ? "text-ink" : "text-zinc-400 hover:text-paper"}`}
        >
          {lang === l.id && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-paper" transition={{ type: "spring", stiffness: 500, damping: 36 }} />
          )}
          <span className="relative">{l.label}</span>
        </button>
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
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { t } = useLang();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

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
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:pt-4">
      <nav
        className={`liquid-glass relative mx-auto flex h-14 items-center justify-between gap-4 rounded-full pl-4 pr-1.5 transition-[max-width,background-color] duration-500 ease-[var(--ease-out-strong)] ${
          scrolled ? "max-w-[960px] !bg-[#07070c]/55" : "max-w-[1120px]"
        }`}
      >
        <a href="#top" className="group flex shrink-0 items-center gap-2.5" aria-label="Flux-Host home">
          <img
            src="/img/logo.png"
            alt=""
            width={26}
            height={25}
            className="h-6 w-auto transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:-rotate-6 group-hover:scale-110"
          />
          <span className="text-[15px] font-semibold tracking-[-0.02em]">Flux-Host</span>
        </a>

        <ul className="hidden items-center lg:flex" onPointerLeave={() => setHovered(null)}>
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
              {t("games")}
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
                  {t(label)}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5">
          <LangSwitch />
          <a
            href="#cenik"
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-paper py-2.5 pl-5 pr-4 text-[13px] font-semibold text-ink shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_6px_20px_-6px_rgb(47_123_255/0.6)] transition-transform duration-150 active:scale-[0.97] sm:flex"
          >
            {/* sheen sweeps across on hover */}
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#2f7bff]/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:translate-x-[300%]" />
            <span className="relative">{t("client")}</span>
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
        </div>

        {/* Games dropdown */}
        <AnimatePresence>
          {games && (
            <motion.div
              id="games-menu"
              onPointerEnter={openGames}
              onPointerLeave={closeGames}
              initial={{ opacity: 0, y: -8, scale: 0.96, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, scale: 0.97, filter: "blur(6px)", transition: { duration: 0.16, ease: EASE } }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              style={{ x: "-50%" }}
              className="absolute left-1/2 top-full hidden w-[420px] origin-top pt-3 lg:block"
            >
              <GlassPanel className="p-2">
                <GamesMenu idPrefix="desk" onPick={() => setGames(false)} />
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            transition={{ duration: 0.22, ease: EASE }}
            className="mx-auto mt-2 max-w-[1120px] origin-top lg:hidden"
          >
            <GlassPanel className="p-2">
            <GamesMenu idPrefix="mob" onPick={() => setOpen(false)} />
            <div className="my-2 h-px bg-white/[0.06]" />
            <ul className="grid grid-cols-2 gap-1">
              {LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-[15px] ${active === id ? "bg-white/[0.06] text-paper" : "text-zinc-300"}`}
                  >
                    {t(label)}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#cenik"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-paper py-3.5 font-semibold text-ink"
            >
              {t("client")} <ArrowUpRight size={14} weight="bold" />
            </a>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
