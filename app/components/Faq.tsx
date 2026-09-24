import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

const FAQ = [
  { q: "How fast will my server be ready?", a: "It is created automatically after payment, usually within five minutes." },
  { q: "Can I upload my own modpack or plugins?", a: "Yes. Upload anything via the file manager or SFTP, or install from CurseForge and Modrinth right in the panel." },
  { q: "Which languages can I use for my Discord bot?", a: "We support Node.js, Python and Rust. Upload your code and set the start command." },
  { q: "Is Hytale hosting available now?", a: "Yes, we have offered Hytale servers since the game launched. If something breaks, contact support." },
  { q: "Can I upgrade my plan later?", a: "Yes, anytime from the client area. You only pay the difference for the rest of the period." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-28 md:px-8 md:py-40">
      <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">Frequently asked questions</h2>
      <div className="mt-16">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-7 text-left text-xl"
              >
                {item.q}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="shrink-0 text-mute"
                >
                  <Plus size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[60ch] pb-7 leading-relaxed text-mute">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
