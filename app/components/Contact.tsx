import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import { DiscordLogo, EnvelopeSimple } from "@phosphor-icons/react";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get("email")).includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    // TODO: connect to a real endpoint (route action, Discord webhook, e-mail service)
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  }

  const input =
    "w-full rounded-md border border-white/15 bg-ink px-4 py-3 text-paper placeholder:text-zinc-500 outline-none transition-colors duration-200 focus:border-paper";

  return (
    <section id="kontakt" ref={ref} className="px-4 py-28 md:px-8 md:py-40">
      <motion.div
        style={reduce ? undefined : { scale }}
        className="grid-bg relative mx-auto grid max-w-[1400px] gap-16 overflow-hidden rounded-3xl bg-ink-2 p-8 ring-1 ring-line md:p-16 lg:grid-cols-2"
      >
        <div>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">Contact us</h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-mute">
            We help with choosing a plan, modpacks and moving your server from another host.
          </p>
          <div className="mt-10 flex flex-col gap-4 text-paper">
            <a href="mailto:support@flux-host.com" className="flex items-center gap-3 hover:underline">
              <EnvelopeSimple size={20} /> support@flux-host.com
            </a>
            <a href="#" className="flex items-center gap-3 hover:underline">
              <DiscordLogo size={20} /> Discord server
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-zinc-300">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={input} aria-invalid={!!error} aria-describedby="email-err" />
            <p id="email-err" className="min-h-5 text-sm text-red-400">{error}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="msg" className="text-sm text-zinc-300">Message</label>
            <textarea id="msg" name="msg" rows={5} placeholder="How can we help?" className={input} />
          </div>
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="rounded-full bg-paper px-7 py-4 font-medium text-ink transition-transform duration-150 active:scale-[0.97] disabled:opacity-70"
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent, we will reply soon" : "Send message"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
