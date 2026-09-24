import { motion, useReducedMotion } from "motion/react";

/** Discord banner art: blurple mesh, floating glowing logo, orbiting rings. */
const PALETTES = {
  discord: { logo: "/img/discord.svg", base: "bg-[#1e1f4b]", a: "bg-[#5865f2]", b: "bg-[#eb459e]", c: "bg-[#00b0f4]" },
  cs2: { logo: "/img/cs2.svg", base: "bg-[#1a1409]", a: "bg-[#f5a524]", b: "bg-[#de4d1b]", c: "bg-[#4b6a88]" },
} as const;

export function DiscordArt({
  logoClass = "w-32 md:w-40",
  className = "",
  theme = "discord",
}: {
  logoClass?: string;
  className?: string;
  theme?: keyof typeof PALETTES;
}) {
  const pal = PALETTES[theme];
  const reduce = useReducedMotion();
  const float = reduce
    ? undefined
    : { transform: ["translateY(0px) rotate(-6deg)", "translateY(-14px) rotate(-2deg)", "translateY(0px) rotate(-6deg)"] };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* mesh */}
      <div className={`absolute inset-0 ${pal.base}`} />
      <div className={`absolute -left-1/4 -top-1/3 size-[90%] rounded-full ${pal.a} opacity-80 blur-[90px]`} />
      <div className={`absolute -bottom-1/3 -right-1/4 size-[80%] rounded-full ${pal.b} opacity-45 blur-[100px]`} />
      <div className={`absolute bottom-0 left-1/4 size-[50%] rounded-full ${pal.c} opacity-30 blur-[90px]`} />
      {/* grid fading out */}
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent_75%)]" />
      {/* rings */}
      {[1, 1.55, 2.1].map((s, i) => (
        <motion.div
          key={s}
          className="absolute left-1/2 top-[38%] aspect-square w-40 rounded-full border border-white/15"
          style={{ translate: "-50% -50%", scale: s }}
          animate={reduce ? undefined : { opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}
      {/* logo + glow */}
      <motion.div
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        animate={float}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={pal.logo} alt="" aria-hidden className={`absolute inset-0 opacity-70 blur-2xl ${logoClass}`} />
        <img
          src={pal.logo}
          alt=""
          aria-hidden
          className={`relative drop-shadow-[0_18px_30px_rgb(20_10_60/0.6)] transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-110 ${logoClass}`}
        />
      </motion.div>
    </div>
  );
}
