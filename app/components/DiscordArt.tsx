import { motion, useReducedMotion } from "motion/react";

/** Discord banner art: blurple mesh, floating glowing logo, orbiting rings. */
export function DiscordArt({ logoClass = "w-32 md:w-40", className = "" }: { logoClass?: string; className?: string }) {
  const reduce = useReducedMotion();
  const float = reduce
    ? undefined
    : { transform: ["translateY(0px) rotate(-6deg)", "translateY(-14px) rotate(-2deg)", "translateY(0px) rotate(-6deg)"] };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* mesh */}
      <div className="absolute inset-0 bg-[#1e1f4b]" />
      <div className="absolute -left-1/4 -top-1/3 size-[90%] rounded-full bg-[#5865f2] opacity-80 blur-[90px]" />
      <div className="absolute -bottom-1/3 -right-1/4 size-[80%] rounded-full bg-[#eb459e] opacity-45 blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 size-[50%] rounded-full bg-[#00b0f4] opacity-30 blur-[90px]" />
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
        <img src="/img/discord.svg" alt="" aria-hidden className={`absolute inset-0 opacity-70 blur-2xl ${logoClass}`} />
        <img
          src="/img/discord.svg"
          alt=""
          aria-hidden
          className={`relative drop-shadow-[0_18px_30px_rgb(20_10_60/0.6)] transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-110 ${logoClass}`}
        />
      </motion.div>
    </div>
  );
}
