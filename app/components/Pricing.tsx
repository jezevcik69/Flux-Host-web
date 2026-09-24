import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { DiscordArt } from "./DiscordArt";
import { Check, Cube, Robot, Sword, type Icon } from "@phosphor-icons/react";

type Billing = "month" | "year";
type Plan = { name: string; month: number; features: string[]; featured?: boolean; icon?: string };
export type CategoryId = "discord" | "minecraft" | "hytale";
type Variant = { id: string; label: string; logo: string; plans: Plan[] };
type Category = { id: CategoryId; label: string; icon: Icon; image: string; tagline: string; plans: Plan[]; variants?: Variant[] };

// Example prices and specs, replace with real ones
export const CATEGORIES: Category[] = [
  {
    id: "discord",
    image: "",
    tagline: "Your bot stays online 24/7, even when your PC is off.",
    label: "Discord bot hosting",
    icon: Robot,
    plans: [],
    variants: [
      {
        id: "node",
        label: "Node.js bot hosting",
        logo: "/img/lang-nodedotjs.svg",
        plans: [
          { name: "Starter", month: 1.49, features: ["512 MB RAM", "2 GB NVMe", "Node 18, 20 and 22", "Auto restart on crash"] },
          { name: "Standard", month: 2.49, features: ["1 GB RAM", "5 GB NVMe", "npm, pnpm or yarn", "Daily backups"], featured: true },
          { name: "Pro", month: 3.99, features: ["2 GB RAM", "10 GB NVMe", "MySQL database", "Priority support"] },
        ],
      },
      {
        id: "python",
        label: "Python bot hosting",
        logo: "/img/lang-python.svg",
        plans: [
          { name: "Starter", month: 1.49, features: ["512 MB RAM", "2 GB NVMe", "Python 3.10 to 3.13", "Auto restart on crash"] },
          { name: "Standard", month: 2.49, features: ["1 GB RAM", "5 GB NVMe", "pip install from requirements.txt", "Daily backups"], featured: true },
          { name: "Pro", month: 3.99, features: ["2 GB RAM", "10 GB NVMe", "MySQL database", "Priority support"] },
        ],
      },
      {
        id: "rust",
        label: "Rust bot hosting",
        logo: "/img/lang-rust.svg",
        plans: [
          { name: "Starter", month: 1.29, features: ["256 MB RAM", "2 GB NVMe", "Latest stable toolchain", "Auto restart on crash"] },
          { name: "Standard", month: 2.29, features: ["512 MB RAM", "5 GB NVMe", "cargo build on deploy", "Daily backups"], featured: true },
          { name: "Pro", month: 3.79, features: ["1 GB RAM", "10 GB NVMe", "MySQL database", "Priority support"] },
        ],
      },
    ],
  },
  {
    id: "minecraft",
    image: "/img/minecraft-bg.png",
    tagline: "Vanilla, Paper or huge modpacks on fast NVMe storage.",
    label: "Minecraft server hosting",
    icon: Cube,
    plans: [
      { name: "Wood", icon: "/img/item-wood.png", month: 3.99, features: ["2 GB RAM", "15 GB NVMe", "Up to 10 players"] },
      { name: "Stone", icon: "/img/item-stone.png", month: 6.99, features: ["4 GB RAM", "30 GB NVMe", "One-click modpacks", "DDoS protection"], featured: true },
      { name: "Iron", icon: "/img/item-iron.png", month: 11.99, features: ["8 GB RAM", "60 GB NVMe", "Large modpacks", "Custom subdomain"] },
      { name: "Gold", icon: "/img/item-gold.png", month: 19.99, features: ["16 GB RAM", "120 GB NVMe", "Server networks (BungeeCord)", "Priority support"] },
    ],
  },
  {
    id: "hytale",
    image: "/img/hytale-bg.png",
    tagline: "A world for your community, from day one.",
    label: "Hytale server hosting",
    icon: Sword,
    plans: [
      { name: "Explorer", month: 5.99, features: ["4 GB RAM", "25 GB NVMe", "Up to 16 players"] },
      { name: "Adventurer", month: 9.99, features: ["6 GB RAM", "50 GB NVMe", "DDoS protection", "Daily backups"], featured: true },
      { name: "Legend", month: 15.99, features: ["12 GB RAM", "100 GB NVMe", "Mod support", "Priority support"] },
    ],
  },
];

export const allPlans = (c: Category) => (c.variants ? c.variants.flatMap((v) => v.plans) : c.plans);
export const fmt = (n: number) => n.toFixed(2);

const TAB_LOGO: Record<CategoryId, string> = {
  discord: "/img/discord.svg",
  minecraft: "/img/grass-block.png",
  hytale: "/img/hytale-logo.png",
};

const EASE = [0.23, 1, 0.32, 1] as const;

function Price({ value }: { value: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(60%)", filter: "blur(6px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0%)", filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-60%)", filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: EASE }}
          className="inline-block tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Segmented<T extends string>({
  id, value, onChange, options, label,
}: {
  id: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; icon?: Icon; img?: string }[];
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-1 rounded-lg border border-line p-1">
      {options.map((o) => {
        const active = value === o.value;
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`relative flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm transition-colors duration-200 ${
              active ? "text-ink" : "text-mute hover:text-paper"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-md bg-paper"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            {o.img ? (
              <span className={`relative grid size-6 place-items-center rounded-md ${active ? "bg-ink" : ""}`}>
                <img src={o.img} alt="" aria-hidden className="size-4 object-contain" />
              </span>
            ) : (
              Icon && <Icon size={16} weight={active ? "fill" : "regular"} className="relative" />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Pricing({ cat, setCat }: { cat: CategoryId; setCat: (c: CategoryId) => void }) {
  const [billing, setBilling] = useState<Billing>("month");
  const reduce = useReducedMotion();
  const category = CATEGORIES.find((c) => c.id === cat)!;
  const [variantId, setVariantId] = useState("node");
  const variant = category.variants?.find((v) => v.id === variantId) ?? category.variants?.[0];
  const plans = variant ? variant.plans : category.plans;
  const cols = plans.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section id="cenik" className="mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40">
      <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">Plans</h2>

      <div className="mt-12 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <Segmented<CategoryId>
          id="category"
          label="Hosting type"
          value={cat}
          onChange={setCat}
          options={CATEGORIES.map((c) => ({ value: c.id, label: c.label.replace(" hosting", ""), img: TAB_LOGO[c.id] }))}
        />
        <Segmented<Billing>
          id="billing"
          label="Billing"
          value={billing}
          onChange={setBilling}
          options={[
            { value: "month", label: "Monthly" },
            { value: "year", label: "Yearly, 2 months free" },
          ]}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cat}
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(16px)", filter: "blur(6px)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)", filter: "blur(6px)" }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mt-10"
        >
          <div className="relative mb-4 h-48 overflow-hidden rounded-2xl ring-1 ring-line md:h-64">
            {category.image ? (
            <motion.img
              src={category.image}
              alt={category.label}
              initial={reduce ? false : { transform: "scale(1.08)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ duration: 1.2, ease: EASE }}
              className="size-full object-cover opacity-70"
            />
            ) : (
              <DiscordArt className="[&>div:nth-child(n+5)]:left-[78%] [&>div:nth-child(n+5)]:top-1/2" logoClass="w-24 md:w-32" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <h3 className="font-medium tracking-[-0.02em] text-4xl md:text-5xl">{category.label}</h3>
              <p className="mt-2 max-w-[40ch] text-zinc-300">{category.tagline}</p>
            </div>
          </div>
          {category.variants && (
            <div role="tablist" aria-label="Bot language" className="mb-4 grid gap-3 sm:grid-cols-3">
              {category.variants.map((v) => {
                const active = v.id === variant?.id;
                return (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setVariantId(v.id)}
                    className={`relative flex items-center gap-4 rounded-2xl p-5 text-left ring-1 transition-colors duration-200 ${
                      active ? "text-ink ring-paper" : "bg-ink-2 text-paper ring-line hover:ring-white/30"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="variant-pill"
                        className="absolute inset-0 rounded-2xl bg-paper"
                        transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      />
                    )}
                    <span className={`relative grid size-11 place-items-center rounded-xl ${active ? "bg-ink" : "bg-ink-3"}`}>
                      <img src={v.logo} alt="" aria-hidden className="size-6" />
                    </span>
                    <span className="relative font-medium">{v.label}</span>
                  </button>
                );
              })}
            </div>
          )}
          <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={variant?.id ?? "plans"}
            initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.2, ease: EASE }}
            className={`grid gap-4 md:grid-cols-2 ${cols}`}
          >
          {plans.map((p, i) => {
            const price = fmt(billing === "month" ? p.month : (p.month * 10) / 12);
            return (
              <motion.div
                key={p.name}
                initial={reduce ? false : { opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.05 + i * 0.06, ease: EASE }}
                className={`flex flex-col rounded-2xl p-8 ring-1 ${
                  p.featured ? "bg-paper text-ink ring-paper" : "bg-ink-2 ring-line"
                }`}
              >
                <div className="flex items-center gap-4">
                  {p.icon && (
                    <span className={`grid size-12 place-items-center rounded-lg ${p.featured ? "bg-ink/10" : "bg-ink-3"}`}>
                      <img src={p.icon} alt="" aria-hidden className="size-8 [image-rendering:pixelated]" />
                    </span>
                  )}
                  <h3 className="font-medium tracking-[-0.02em] text-3xl">{p.name}</h3>
                </div>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl font-medium tracking-tight">
                    €<Price value={price} />
                  </span>
                  <span className={p.featured ? "text-ink/60" : "text-mute"}>/ month</span>
                </p>
                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check size={16} weight="bold" className={p.featured ? "text-ink" : "text-paper"} />
                      <span className={p.featured ? "text-ink/80" : "text-mute"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className={`mt-10 block rounded-full px-6 py-4 text-center font-medium transition-[transform,background-color,border-color] duration-150 active:scale-[0.97] ${
                    p.featured ? "bg-ink text-paper hover:bg-ink-3" : "border border-white/15 hover:border-white/40"
                  }`}
                >
                  Order now
                </a>
              </motion.div>
            );
          })}
          </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
