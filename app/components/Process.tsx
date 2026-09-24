import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

const STEPS = [
  { image: "/img/step-plan.jpg", title: "Pick a plan", body: "Discord bot, Minecraft or Hytale. Choose how much power you need." },
  { image: "/img/step-pay.jpg", title: "Pay", body: "By card, PayPal or bank transfer. Activation is automatic." },
  { image: "/img/step-launch.jpg", title: "Launch", body: "Your server is live in minutes. Login details arrive by email." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40">
      <h2 className="max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">
        From order to a running server
      </h2>

      <div ref={ref} className="relative mt-20">
        {/* track + scroll-driven fill */}
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
        <motion.div
          className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-paper md:block"
          style={{ scaleX: reduce ? 1 : progress }}
        />
        <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(20px)" }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              <span className="relative z-10 block size-[15px] rounded-full border border-paper bg-ink" />
              <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line">
                <img src={s.image} alt={s.title} loading="lazy" className="size-full object-cover opacity-75 transition-transform duration-700 hover:scale-[1.04]" />
              </div>
              <h3 className="mt-6 font-medium tracking-[-0.02em] text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-mute">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
