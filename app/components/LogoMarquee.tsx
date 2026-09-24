import { useReducedMotion } from "motion/react";

const LOGOS = ["discord", "curseforge", "modrinth", "nodedotjs", "python", "openjdk", "typescript", "bun", "mysql", "github", "docker", "git"];

export function LogoMarquee() {
  const reduce = useReducedMotion();
  const row = LOGOS.map((slug) => (
    <img
      key={slug}
      src={`https://cdn.simpleicons.org/${slug}/8b8b94`}
      alt={slug}
      width={36}
      height={36}
      loading="lazy"
      className="size-9 shrink-0 opacity-70 transition-opacity duration-200 hover:opacity-100"
    />
  ));

  return (
    <section aria-label="Supported technologies" className="border-y border-line py-12">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div
          className="flex w-max gap-20 pr-20"
          style={reduce ? undefined : { animation: "marquee 40s linear infinite" }}
        >
          {row}
          <div aria-hidden className="flex gap-20">{row}</div>
        </div>
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
