import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "cs";
export const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "cs", label: "CZ" },
];

const DICT = {
  en: {
    games: "Games", services: "Services", plans: "Plans", faq: "FAQ", contact: "Contact", home: "Home",
    client: "Client area", from: "from", language: "Language",
    discordBlurb: "Node.js, Python, Rust", mcBlurb: "Paper, Fabric, modpacks", hyBlurb: "Servers from day one", csBlurb: "128 tick, workshop, plugins",
    discordTitle: "Discord bots",
  },
  cs: {
    games: "Hry", services: "Služby", plans: "Ceník", faq: "FAQ", contact: "Kontakt", home: "Domů",
    client: "Klientská zóna", from: "od", language: "Jazyk",
    discordBlurb: "Node.js, Python, Rust", mcBlurb: "Paper, Fabric, modpacky", hyBlurb: "Servery od prvního dne", csBlurb: "128 tick, workshop, pluginy",
    discordTitle: "Discord boti",
  },
} as const;
export type Key = keyof (typeof DICT)["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => DICT.en[k],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "cs") setLangState(saved);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => DICT[lang][k] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
