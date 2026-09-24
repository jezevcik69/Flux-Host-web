import type { Route } from "./+types/home";
import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { LogoMarquee } from "../components/LogoMarquee";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Pricing } from "../components/Pricing";
import { Faq } from "../components/Faq";
import { Contact } from "../components/Contact";
import { GameSelect } from "../components/GameSelect";
import { useState } from "react";
import { scrollToId } from "../components/SmoothScroll";
import type { CategoryId } from "../components/Pricing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flux-Host | Minecraft, Hytale and Discord bot hosting" },
    { name: "description", content: "Hosting for Discord bots, Minecraft and Hytale servers. Live in minutes." },
  ];
}

export default function Home() {
  const [cat, setCat] = useState<CategoryId>("discord");
  const pick = (id: CategoryId) => {
    setCat(id);
    scrollToId("cenik");
  };
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GameSelect onPick={pick} />
        <LogoMarquee />
        <Services />
        <Process />
        <Pricing cat={cat} setCat={setCat} />
        <Faq />
        <Contact />
      </main>
      <footer className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-10 text-sm text-mute md:px-8">
        <span className="font-medium tracking-[-0.02em] text-lg text-paper">Flux-Host</span>
        <span>© 2026 Flux-Host. All rights reserved.</span>
      </footer>
    </>
  );
}
