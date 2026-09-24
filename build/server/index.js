import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, CaretDown, ChatCircle, Check, ClockCounterClockwise, Cube, DiscordLogo, EnvelopeSimple, House, List, Plus, Question, Robot, ShieldCheck, Stack, Sword, Tag, X } from "@phosphor-icons/react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/components/SmoothScroll.tsx
var lenis = null;
function scrollToId(id) {
	const el = document.getElementById(id);
	if (!el) return;
	if (lenis) lenis.scrollTo(el, { offset: id === "top" ? 0 : -88 });
	else el.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}
function SmoothScroll() {
	useEffect(() => {
		if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		lenis = new Lenis({
			lerp: .09,
			wheelMultiplier: 1,
			anchors: { offset: -88 },
			autoRaf: true
		});
		return () => {
			lenis?.destroy();
			lenis = null;
		};
	}, []);
	return null;
}
//#endregion
//#region app/i18n.tsx
var LANGS = [{
	id: "en",
	label: "EN"
}, {
	id: "cs",
	label: "CZ"
}];
var DICT = {
	en: {
		games: "Games",
		services: "Services",
		plans: "Plans",
		faq: "FAQ",
		contact: "Contact",
		home: "Home",
		client: "Client area",
		from: "from",
		language: "Language",
		discordBlurb: "Node.js, Python, Rust",
		mcBlurb: "Paper, Fabric, modpacks",
		hyBlurb: "Servers from day one",
		discordTitle: "Discord bots"
	},
	cs: {
		games: "Hry",
		services: "Služby",
		plans: "Ceník",
		faq: "FAQ",
		contact: "Kontakt",
		home: "Domů",
		client: "Klientská zóna",
		from: "od",
		language: "Jazyk",
		discordBlurb: "Node.js, Python, Rust",
		mcBlurb: "Paper, Fabric, modpacky",
		hyBlurb: "Servery od prvního dne",
		discordTitle: "Discord boti"
	}
};
var Ctx = createContext({
	lang: "en",
	setLang: () => {},
	t: (k) => DICT.en[k]
});
function LangProvider({ children }) {
	const [lang, setLangState] = useState("en");
	useEffect(() => {
		try {
			const saved = localStorage.getItem("lang");
			if (saved === "en" || saved === "cs") setLangState(saved);
		} catch {}
	}, []);
	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);
	const setLang = (l) => {
		setLangState(l);
		try {
			localStorage.setItem("lang", l);
		} catch {}
	};
	return /* @__PURE__ */ jsx(Ctx.Provider, {
		value: {
			lang,
			setLang,
			t: (k) => DICT[lang][k]
		},
		children
	});
}
var useLang = () => useContext(Ctx);
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "icon",
		type: "image/png",
		href: "/img/logo.png"
	},
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400..700&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", {
			className: "grain font-sans",
			children: [
				/* @__PURE__ */ jsxs(LangProvider, { children: [/* @__PURE__ */ jsx(SmoothScroll, {}), children] }),
				/* @__PURE__ */ jsx(ScrollRestoration, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Error";
	let details = "Something went wrong. Try reloading the page.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "This page does not exist." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-6",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-medium tracking-[-0.02em] text-7xl",
				children: message
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-4 text-mute",
				children: details
			}),
			/* @__PURE__ */ jsx("a", {
				href: "/",
				className: "mt-8 w-fit rounded-md bg-paper px-6 py-3 font-medium text-ink",
				children: "Back to home"
			}),
			stack
		]
	});
});
//#endregion
//#region app/components/DiscordArt.tsx
/** Discord banner art: blurple mesh, floating glowing logo, orbiting rings. */
function DiscordArt({ logoClass = "w-32 md:w-40", className = "" }) {
	const reduce = useReducedMotion();
	const float = reduce ? void 0 : { transform: [
		"translateY(0px) rotate(-6deg)",
		"translateY(-14px) rotate(-2deg)",
		"translateY(0px) rotate(-6deg)"
	] };
	return /* @__PURE__ */ jsxs("div", {
		className: `absolute inset-0 overflow-hidden ${className}`,
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#1e1f4b]" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -left-1/4 -top-1/3 size-[90%] rounded-full bg-[#5865f2] opacity-80 blur-[90px]" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -bottom-1/3 -right-1/4 size-[80%] rounded-full bg-[#eb459e] opacity-45 blur-[100px]" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/4 size-[50%] rounded-full bg-[#00b0f4] opacity-30 blur-[90px]" }),
			/* @__PURE__ */ jsx("div", { className: "grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent_75%)]" }),
			[
				1,
				1.55,
				2.1
			].map((s, i) => /* @__PURE__ */ jsx(motion.div, {
				className: "absolute left-1/2 top-[38%] aspect-square w-40 rounded-full border border-white/15",
				style: {
					translate: "-50% -50%",
					scale: s
				},
				animate: reduce ? void 0 : { opacity: [
					.15,
					.5,
					.15
				] },
				transition: {
					duration: 4,
					repeat: Infinity,
					delay: i * .6,
					ease: "easeInOut"
				}
			}, s)),
			/* @__PURE__ */ jsxs(motion.div, {
				className: "absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2",
				animate: float,
				transition: {
					duration: 6,
					repeat: Infinity,
					ease: "easeInOut"
				},
				children: [/* @__PURE__ */ jsx("img", {
					src: "/img/discord.svg",
					alt: "",
					"aria-hidden": true,
					className: `absolute inset-0 opacity-70 blur-2xl ${logoClass}`
				}), /* @__PURE__ */ jsx("img", {
					src: "/img/discord.svg",
					alt: "",
					"aria-hidden": true,
					className: `relative drop-shadow-[0_18px_30px_rgb(20_10_60/0.6)] transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-110 ${logoClass}`
				})]
			})
		]
	});
}
//#endregion
//#region app/components/Pricing.tsx
var CATEGORIES = [
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
					{
						name: "Starter",
						month: 1.49,
						features: [
							"512 MB RAM",
							"2 GB NVMe",
							"Node 18, 20 and 22",
							"Auto restart on crash"
						]
					},
					{
						name: "Standard",
						month: 2.49,
						features: [
							"1 GB RAM",
							"5 GB NVMe",
							"npm, pnpm or yarn",
							"Daily backups"
						],
						featured: true
					},
					{
						name: "Pro",
						month: 3.99,
						features: [
							"2 GB RAM",
							"10 GB NVMe",
							"MySQL database",
							"Priority support"
						]
					}
				]
			},
			{
				id: "python",
				label: "Python bot hosting",
				logo: "/img/lang-python.svg",
				plans: [
					{
						name: "Starter",
						month: 1.49,
						features: [
							"512 MB RAM",
							"2 GB NVMe",
							"Python 3.10 to 3.13",
							"Auto restart on crash"
						]
					},
					{
						name: "Standard",
						month: 2.49,
						features: [
							"1 GB RAM",
							"5 GB NVMe",
							"pip install from requirements.txt",
							"Daily backups"
						],
						featured: true
					},
					{
						name: "Pro",
						month: 3.99,
						features: [
							"2 GB RAM",
							"10 GB NVMe",
							"MySQL database",
							"Priority support"
						]
					}
				]
			},
			{
				id: "rust",
				label: "Rust bot hosting",
				logo: "/img/lang-rust.svg",
				plans: [
					{
						name: "Starter",
						month: 1.29,
						features: [
							"256 MB RAM",
							"2 GB NVMe",
							"Latest stable toolchain",
							"Auto restart on crash"
						]
					},
					{
						name: "Standard",
						month: 2.29,
						features: [
							"512 MB RAM",
							"5 GB NVMe",
							"cargo build on deploy",
							"Daily backups"
						],
						featured: true
					},
					{
						name: "Pro",
						month: 3.79,
						features: [
							"1 GB RAM",
							"10 GB NVMe",
							"MySQL database",
							"Priority support"
						]
					}
				]
			}
		]
	},
	{
		id: "minecraft",
		image: "/img/minecraft-bg.png",
		tagline: "Vanilla, Paper or huge modpacks on fast NVMe storage.",
		label: "Minecraft server hosting",
		icon: Cube,
		plans: [
			{
				name: "Wood",
				icon: "/img/item-wood.png",
				month: 3.99,
				features: [
					"2 GB RAM",
					"15 GB NVMe",
					"Up to 10 players"
				]
			},
			{
				name: "Stone",
				icon: "/img/item-stone.png",
				month: 6.99,
				features: [
					"4 GB RAM",
					"30 GB NVMe",
					"One-click modpacks",
					"DDoS protection"
				],
				featured: true
			},
			{
				name: "Iron",
				icon: "/img/item-iron.png",
				month: 11.99,
				features: [
					"8 GB RAM",
					"60 GB NVMe",
					"Large modpacks",
					"Custom subdomain"
				]
			},
			{
				name: "Gold",
				icon: "/img/item-gold.png",
				month: 19.99,
				features: [
					"16 GB RAM",
					"120 GB NVMe",
					"Server networks (BungeeCord)",
					"Priority support"
				]
			}
		]
	},
	{
		id: "hytale",
		image: "/img/hytale-bg.png",
		tagline: "A world for your community, from day one.",
		label: "Hytale server hosting",
		icon: Sword,
		plans: [
			{
				name: "Explorer",
				month: 5.99,
				features: [
					"4 GB RAM",
					"25 GB NVMe",
					"Up to 16 players"
				]
			},
			{
				name: "Adventurer",
				month: 9.99,
				features: [
					"6 GB RAM",
					"50 GB NVMe",
					"DDoS protection",
					"Daily backups"
				],
				featured: true
			},
			{
				name: "Legend",
				month: 15.99,
				features: [
					"12 GB RAM",
					"100 GB NVMe",
					"Mod support",
					"Priority support"
				]
			}
		]
	}
];
var allPlans = (c) => c.variants ? c.variants.flatMap((v) => v.plans) : c.plans;
var fmt = (n) => n.toFixed(2);
var TAB_LOGO = {
	discord: "/img/discord.svg",
	minecraft: "/img/grass-block.png",
	hytale: "/img/hytale-logo.png"
};
var EASE$3 = [
	.23,
	1,
	.32,
	1
];
function Price({ value }) {
	const reduce = useReducedMotion();
	return /* @__PURE__ */ jsx("span", {
		className: "relative inline-flex overflow-hidden",
		children: /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			initial: false,
			children: /* @__PURE__ */ jsx(motion.span, {
				initial: reduce ? { opacity: 0 } : {
					opacity: 0,
					transform: "translateY(60%)",
					filter: "blur(6px)"
				},
				animate: reduce ? { opacity: 1 } : {
					opacity: 1,
					transform: "translateY(0%)",
					filter: "blur(0px)"
				},
				exit: reduce ? { opacity: 0 } : {
					opacity: 0,
					transform: "translateY(-60%)",
					filter: "blur(6px)"
				},
				transition: {
					duration: .35,
					ease: EASE$3
				},
				className: "inline-block tabular-nums",
				children: value
			}, value)
		})
	});
}
function Segmented({ id, value, onChange, options, label }) {
	return /* @__PURE__ */ jsx("div", {
		role: "tablist",
		"aria-label": label,
		className: "flex flex-wrap gap-1 rounded-lg border border-line p-1",
		children: options.map((o) => {
			const active = value === o.value;
			const Icon = o.icon;
			return /* @__PURE__ */ jsxs("button", {
				role: "tab",
				"aria-selected": active,
				onClick: () => onChange(o.value),
				className: `relative flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm transition-colors duration-200 ${active ? "text-ink" : "text-mute hover:text-paper"}`,
				children: [
					active && /* @__PURE__ */ jsx(motion.span, {
						layoutId: `${id}-pill`,
						className: "absolute inset-0 rounded-md bg-paper",
						transition: {
							type: "spring",
							duration: .4,
							bounce: .15
						}
					}),
					o.img ? /* @__PURE__ */ jsx("span", {
						className: `relative grid size-6 place-items-center rounded-md ${active ? "bg-ink" : ""}`,
						children: /* @__PURE__ */ jsx("img", {
							src: o.img,
							alt: "",
							"aria-hidden": true,
							className: "size-4 object-contain"
						})
					}) : Icon && /* @__PURE__ */ jsx(Icon, {
						size: 16,
						weight: active ? "fill" : "regular",
						className: "relative"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "relative",
						children: o.label
					})
				]
			}, o.value);
		})
	});
}
function Pricing({ cat, setCat }) {
	const [billing, setBilling] = useState("month");
	const reduce = useReducedMotion();
	const category = CATEGORIES.find((c) => c.id === cat);
	const [variantId, setVariantId] = useState("node");
	const variant = category.variants?.find((v) => v.id === variantId) ?? category.variants?.[0];
	const plans = variant ? variant.plans : category.plans;
	const cols = plans.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
	return /* @__PURE__ */ jsxs("section", {
		id: "cenik",
		className: "mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl",
				children: "Plans"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-12 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between",
				children: [/* @__PURE__ */ jsx(Segmented, {
					id: "category",
					label: "Hosting type",
					value: cat,
					onChange: setCat,
					options: CATEGORIES.map((c) => ({
						value: c.id,
						label: c.label.replace(" hosting", ""),
						img: TAB_LOGO[c.id]
					}))
				}), /* @__PURE__ */ jsx(Segmented, {
					id: "billing",
					label: "Billing",
					value: billing,
					onChange: setBilling,
					options: [{
						value: "month",
						label: "Monthly"
					}, {
						value: "year",
						label: "Yearly, 2 months free"
					}]
				})]
			}),
			/* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				initial: false,
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: reduce ? { opacity: 0 } : {
						opacity: 0,
						transform: "translateY(16px)",
						filter: "blur(6px)"
					},
					animate: reduce ? { opacity: 1 } : {
						opacity: 1,
						transform: "translateY(0px)",
						filter: "blur(0px)"
					},
					exit: reduce ? { opacity: 0 } : {
						opacity: 0,
						transform: "translateY(-8px)",
						filter: "blur(6px)"
					},
					transition: {
						duration: .3,
						ease: EASE$3
					},
					className: "mt-10",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "relative mb-4 h-48 overflow-hidden rounded-2xl ring-1 ring-line md:h-64",
							children: [
								category.image ? /* @__PURE__ */ jsx(motion.img, {
									src: category.image,
									alt: category.label,
									initial: reduce ? false : { transform: "scale(1.08)" },
									animate: { transform: "scale(1)" },
									transition: {
										duration: 1.2,
										ease: EASE$3
									},
									className: "size-full object-cover opacity-70"
								}) : /* @__PURE__ */ jsx(DiscordArt, {
									className: "[&>div:nth-child(n+5)]:left-[78%] [&>div:nth-child(n+5)]:top-1/2",
									logoClass: "w-24 md:w-32"
								}),
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" }),
								/* @__PURE__ */ jsxs(motion.div, {
									initial: reduce ? false : {
										opacity: 0,
										x: -24
									},
									animate: {
										opacity: 1,
										x: 0
									},
									transition: {
										type: "spring",
										stiffness: 220,
										damping: 26,
										delay: .1
									},
									className: "absolute inset-0 flex flex-col justify-end p-8 md:p-10",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "font-medium tracking-[-0.02em] text-4xl md:text-5xl",
										children: category.label
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 max-w-[40ch] text-zinc-300",
										children: category.tagline
									})]
								})
							]
						}),
						category.variants && /* @__PURE__ */ jsx("div", {
							role: "tablist",
							"aria-label": "Bot language",
							className: "mb-4 grid gap-3 sm:grid-cols-3",
							children: category.variants.map((v) => {
								const active = v.id === variant?.id;
								return /* @__PURE__ */ jsxs(motion.button, {
									role: "tab",
									"aria-selected": active,
									onClick: () => setVariantId(v.id),
									whileHover: reduce ? void 0 : { y: -3 },
									whileTap: reduce ? void 0 : { scale: .98 },
									transition: {
										type: "spring",
										stiffness: 400,
										damping: 26
									},
									className: `group relative flex items-center gap-4 rounded-2xl p-5 text-left ring-1 transition-colors duration-200 ${active ? "text-ink ring-paper" : "bg-ink-2 text-paper ring-line hover:ring-white/30"}`,
									children: [
										active && /* @__PURE__ */ jsx(motion.span, {
											layoutId: "variant-pill",
											className: "absolute inset-0 rounded-2xl bg-paper",
											transition: {
												type: "spring",
												duration: .45,
												bounce: .15
											}
										}),
										/* @__PURE__ */ jsx(motion.span, {
											animate: active && !reduce ? {
												rotate: [
													0,
													-10,
													6,
													0
												],
												scale: [
													1,
													1.15,
													1
												]
											} : {
												rotate: 0,
												scale: 1
											},
											transition: {
												duration: .5,
												ease: EASE$3
											},
											className: `relative grid size-11 place-items-center rounded-xl transition-colors duration-300 ${active ? "bg-ink" : "bg-ink-3"}`,
											children: /* @__PURE__ */ jsx("img", {
												src: v.logo,
												alt: "",
												"aria-hidden": true,
												className: "size-6 transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:scale-110"
											})
										}),
										/* @__PURE__ */ jsx("span", {
											className: "relative font-medium",
											children: v.label
										})
									]
								}, v.id);
							})
						}),
						/* @__PURE__ */ jsx(AnimatePresence, {
							mode: "wait",
							initial: false,
							children: /* @__PURE__ */ jsx(motion.div, {
								initial: { opacity: 1 },
								animate: { opacity: 1 },
								exit: {
									opacity: 0,
									transition: { duration: .15 }
								},
								className: `grid gap-4 md:grid-cols-2 ${cols}`,
								children: plans.map((p, i) => {
									const price = fmt(billing === "month" ? p.month : p.month * 10 / 12);
									return /* @__PURE__ */ jsxs(motion.div, {
										initial: reduce ? false : {
											opacity: 0,
											y: 28,
											scale: .97
										},
										animate: {
											opacity: 1,
											y: 0,
											scale: 1
										},
										whileHover: reduce ? void 0 : { y: -6 },
										transition: {
											type: "spring",
											stiffness: 260,
											damping: 24,
											delay: reduce ? 0 : i * .07
										},
										onPointerMove: (e) => {
											const r = e.currentTarget.getBoundingClientRect();
											e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
											e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
										},
										className: `group relative flex flex-col overflow-hidden rounded-2xl p-8 ring-1 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgb(47_123_255/0.45)] ${p.featured ? "bg-paper text-ink ring-paper" : "bg-ink-2 ring-line hover:ring-white/25"}`,
										children: [
											/* @__PURE__ */ jsx("span", {
												"aria-hidden": true,
												className: `pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${p.featured ? "bg-[radial-gradient(320px_circle_at_var(--mx)_var(--my),rgb(47_123_255/0.12),transparent_70%)]" : "bg-[radial-gradient(320px_circle_at_var(--mx)_var(--my),rgb(255_255_255/0.08),transparent_70%)]"}`
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-4",
												children: [p.icon && /* @__PURE__ */ jsx("span", {
													className: `grid size-12 place-items-center rounded-lg ${p.featured ? "bg-ink/10" : "bg-ink-3"}`,
													children: /* @__PURE__ */ jsx("img", {
														src: p.icon,
														alt: "",
														"aria-hidden": true,
														className: "size-8 [image-rendering:pixelated]"
													})
												}), /* @__PURE__ */ jsx("h3", {
													className: "font-medium tracking-[-0.02em] text-3xl",
													children: p.name
												})]
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-8 flex items-baseline gap-2",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "text-5xl font-medium tracking-tight",
													children: ["€", /* @__PURE__ */ jsx(Price, { value: price })]
												}), /* @__PURE__ */ jsx("span", {
													className: p.featured ? "text-ink/60" : "text-mute",
													children: "/ month"
												})]
											}),
											/* @__PURE__ */ jsx("ul", {
												className: "mt-8 flex flex-1 flex-col gap-3",
												children: p.features.map((f, j) => /* @__PURE__ */ jsxs(motion.li, {
													initial: reduce ? false : {
														opacity: 0,
														x: -8
													},
													animate: {
														opacity: 1,
														x: 0
													},
													transition: {
														duration: .35,
														delay: reduce ? 0 : .15 + i * .07 + j * .04,
														ease: EASE$3
													},
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ jsx(Check, {
														size: 16,
														weight: "bold",
														className: p.featured ? "text-ink" : "text-paper"
													}), /* @__PURE__ */ jsx("span", {
														className: p.featured ? "text-ink/80" : "text-mute",
														children: f
													})]
												}, f))
											}),
											/* @__PURE__ */ jsx("a", {
												href: "#kontakt",
												className: `mt-10 block rounded-full px-6 py-4 text-center font-medium transition-[transform,background-color,border-color] duration-150 active:scale-[0.97] ${p.featured ? "bg-ink text-paper hover:bg-ink-3" : "border border-white/15 hover:border-white/40"}`,
												children: "Order now"
											})
										]
									}, p.name);
								})
							}, variant?.id ?? "plans")
						})
					]
				}, cat)
			})
		]
	});
}
//#endregion
//#region app/components/Nav.tsx
var SECTIONS = [
	{
		id: "top",
		label: "home",
		icon: House
	},
	{
		id: "sluzby",
		label: "services",
		icon: Stack
	},
	{
		id: "cenik",
		label: "plans",
		icon: Tag
	},
	{
		id: "faq",
		label: "faq",
		icon: Question
	},
	{
		id: "kontakt",
		label: "contact",
		icon: ChatCircle
	}
];
var LINKS = SECTIONS.filter((s) => s.id !== "top");
var GAMES$1 = [
	{
		id: "discord",
		title: "discordTitle",
		logo: "/img/discord.svg",
		blurb: "discordBlurb"
	},
	{
		id: "minecraft",
		title: "discordTitle",
		logo: "/img/grass-block.png",
		blurb: "mcBlurb"
	},
	{
		id: "hytale",
		title: "discordTitle",
		logo: "/img/hytale-logo.png",
		blurb: "hyBlurb"
	}
];
var GAME_NAMES = {
	minecraft: "Minecraft",
	hytale: "Hytale"
};
var priceFrom = (id) => fmt(Math.min(...allPlans(CATEGORIES.find((c) => c.id === id)).map((p) => p.month)));
var EASE$2 = [
	.23,
	1,
	.32,
	1
];
var MENU_BG = "/herooo.mp4";
function useScrollSpy() {
	const [active, setActive] = useState("top");
	useEffect(() => {
		const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
		}, { rootMargin: "-45% 0px -50% 0px" });
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
	return active;
}
var list = {
	hidden: {},
	show: { transition: {
		staggerChildren: .055,
		delayChildren: .06
	} }
};
var item = {
	hidden: {
		opacity: 0,
		y: 10,
		filter: "blur(6px)"
	},
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			type: "spring",
			stiffness: 380,
			damping: 30
		}
	}
};
function GamesMenu({ onPick, idPrefix }) {
	const { t } = useLang();
	const [hover, setHover] = useState(null);
	return /* @__PURE__ */ jsx(motion.div, {
		variants: list,
		initial: "hidden",
		animate: "show",
		className: "relative grid gap-1",
		onPointerLeave: () => setHover(null),
		children: GAMES$1.map((g) => {
			const on = hover === g.id;
			return /* @__PURE__ */ jsxs(motion.a, {
				variants: item,
				href: "#hry",
				onClick: onPick,
				onPointerEnter: () => setHover(g.id),
				onFocus: () => setHover(g.id),
				className: "relative flex items-center gap-4 rounded-2xl p-3 focus-visible:outline-none",
				children: [
					on && /* @__PURE__ */ jsx(motion.span, {
						layoutId: `${idPrefix}-game-hover`,
						className: "absolute inset-0 rounded-2xl bg-white/[0.09] shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]",
						transition: {
							type: "spring",
							stiffness: 500,
							damping: 38
						}
					}),
					/* @__PURE__ */ jsx(motion.span, {
						animate: on ? {
							rotate: -6,
							scale: 1.08
						} : {
							rotate: 0,
							scale: 1
						},
						transition: {
							type: "spring",
							stiffness: 420,
							damping: 18
						},
						className: "relative grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.08] ring-1 ring-inset ring-white/[0.12] backdrop-blur-md",
						children: /* @__PURE__ */ jsx("img", {
							src: g.logo,
							alt: "",
							className: "size-7 object-contain"
						})
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "relative min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block text-[14px] font-semibold text-paper",
							children: GAME_NAMES[g.id] ?? t(g.title)
						}), /* @__PURE__ */ jsx("span", {
							className: "block text-[13px] text-zinc-300/80",
							children: t(g.blurb)
						})]
					}),
					/* @__PURE__ */ jsxs(motion.span, {
						animate: { x: on ? -4 : 0 },
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 28
						},
						className: "relative text-right text-[12px] text-zinc-400",
						children: [t("from"), /* @__PURE__ */ jsxs("span", {
							className: "block text-[14px] font-semibold text-paper",
							children: ["€", priceFrom(g.id)]
						})]
					}),
					/* @__PURE__ */ jsx(motion.span, {
						animate: {
							opacity: on ? 1 : 0,
							x: on ? 0 : -6
						},
						transition: {
							duration: .2,
							ease: EASE$2
						},
						className: "relative -ml-2 text-paper",
						children: /* @__PURE__ */ jsx(ArrowUpRight, {
							size: 14,
							weight: "bold"
						})
					})
				]
			}, g.id);
		})
	});
}
function GlassPanel({ children, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `liquid-glass overflow-hidden rounded-3xl ${className}`,
		children: [
			/* @__PURE__ */ jsx("video", {
				className: "pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-60",
				src: MENU_BG,
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 -z-10 bg-[#05050a]/45" }),
			children
		]
	});
}
function LangSwitch() {
	const { lang, setLang, t } = useLang();
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"aria-label": t("language"),
		className: "relative flex rounded-full bg-white/[0.06] p-1 ring-1 ring-inset ring-white/[0.08]",
		children: LANGS.map((l) => /* @__PURE__ */ jsxs("button", {
			type: "button",
			"aria-pressed": lang === l.id,
			onClick: () => setLang(l.id),
			className: `relative rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${lang === l.id ? "text-ink" : "text-zinc-400 hover:text-paper"}`,
			children: [lang === l.id && /* @__PURE__ */ jsx(motion.span, {
				layoutId: "lang-pill",
				className: "absolute inset-0 rounded-full bg-paper",
				transition: {
					type: "spring",
					stiffness: 500,
					damping: 36
				}
			}), /* @__PURE__ */ jsx("span", {
				className: "relative",
				children: l.label
			})]
		}, l.id))
	});
}
function Nav() {
	const active = useScrollSpy();
	useReducedMotion();
	const [open, setOpen] = useState(false);
	const [games, setGames] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [hovered, setHovered] = useState(null);
	const closeTimer = useRef(void 0);
	const { t } = useLang();
	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
	useEffect(() => {
		const onKey = (e) => {
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
	return /* @__PURE__ */ jsxs("header", {
		className: "fixed inset-x-0 top-0 z-40 px-3 pt-3 md:pt-4",
		children: [/* @__PURE__ */ jsxs("nav", {
			className: `liquid-glass relative mx-auto flex h-14 items-center justify-between gap-4 rounded-full pl-4 pr-1.5 transition-[max-width,background-color] duration-500 ease-[var(--ease-out-strong)] ${scrolled ? "max-w-[960px] !bg-[#07070c]/55" : "max-w-[1120px]"}`,
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "#top",
					className: "group flex shrink-0 items-center gap-2.5",
					"aria-label": "Flux-Host home",
					children: [/* @__PURE__ */ jsx("img", {
						src: "/img/logo.png",
						alt: "",
						width: 26,
						height: 25,
						className: "h-6 w-auto transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:-rotate-6 group-hover:scale-110"
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[15px] font-semibold tracking-[-0.02em]",
						children: "Flux-Host"
					})]
				}),
				/* @__PURE__ */ jsxs("ul", {
					className: "hidden items-center lg:flex",
					onPointerLeave: () => setHovered(null),
					children: [/* @__PURE__ */ jsxs("li", {
						className: "relative",
						onPointerEnter: () => {
							setHovered("games");
							openGames();
						},
						onPointerLeave: closeGames,
						children: [(hovered ? hovered === "games" : false) && /* @__PURE__ */ jsx(motion.span, {
							layoutId: "nav-pill",
							className: "absolute inset-0 rounded-full bg-white/[0.08]",
							transition: {
								type: "spring",
								duration: .4,
								bounce: .12
							}
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							"aria-expanded": games,
							"aria-controls": "games-menu",
							onClick: () => setGames((g) => !g),
							className: `relative flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${games || hovered === "games" ? "text-paper" : "text-zinc-400"}`,
							children: [t("games"), /* @__PURE__ */ jsx(CaretDown, {
								size: 11,
								weight: "bold",
								className: `transition-transform duration-200 ease-[var(--ease-out-strong)] ${games ? "rotate-180" : ""}`
							})]
						})]
					}), LINKS.map(({ id, label }) => {
						const isActive = active === id;
						const lit = hovered ? hovered === id : isActive;
						return /* @__PURE__ */ jsxs("li", {
							className: "relative",
							onPointerEnter: () => setHovered(id),
							children: [lit && /* @__PURE__ */ jsx(motion.span, {
								layoutId: "nav-pill",
								className: "absolute inset-0 rounded-full bg-white/[0.08]",
								transition: {
									type: "spring",
									duration: .4,
									bounce: .12
								}
							}), /* @__PURE__ */ jsx("a", {
								href: `#${id}`,
								"aria-current": isActive ? "true" : void 0,
								className: `relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${lit || isActive ? "text-paper" : "text-zinc-400"}`,
								children: t(label)
							})]
						}, id);
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex shrink-0 items-center gap-1.5",
					children: [
						/* @__PURE__ */ jsx(LangSwitch, {}),
						/* @__PURE__ */ jsxs("a", {
							href: "#cenik",
							className: "group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-paper py-2.5 pl-5 pr-4 text-[13px] font-semibold text-ink shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_6px_20px_-6px_rgb(47_123_255/0.6)] transition-transform duration-150 active:scale-[0.97] sm:flex",
							children: [
								/* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#2f7bff]/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:translate-x-[300%]" }),
								/* @__PURE__ */ jsx("span", {
									className: "relative",
									children: t("client")
								}),
								/* @__PURE__ */ jsx(ArrowUpRight, {
									size: 14,
									weight: "bold",
									className: "relative transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:-translate-y-px group-hover:translate-x-px"
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": open ? "Close menu" : "Open menu",
							"aria-expanded": open,
							onClick: () => setOpen((o) => !o),
							className: "grid size-10 place-items-center rounded-full bg-white/[0.06] lg:hidden",
							children: /* @__PURE__ */ jsx(AnimatePresence, {
								mode: "popLayout",
								initial: false,
								children: /* @__PURE__ */ jsx(motion.span, {
									initial: {
										opacity: 0,
										transform: "rotate(-90deg) scale(0.8)"
									},
									animate: {
										opacity: 1,
										transform: "rotate(0deg) scale(1)"
									},
									exit: {
										opacity: 0,
										transform: "rotate(90deg) scale(0.8)"
									},
									transition: {
										duration: .18,
										ease: EASE$2
									},
									className: "grid",
									children: open ? /* @__PURE__ */ jsx(X, { size: 18 }) : /* @__PURE__ */ jsx(List, { size: 18 })
								}, open ? "x" : "list")
							})
						})
					]
				}),
				/* @__PURE__ */ jsx(AnimatePresence, { children: games && /* @__PURE__ */ jsx(motion.div, {
					id: "games-menu",
					onPointerEnter: openGames,
					onPointerLeave: closeGames,
					initial: {
						opacity: 0,
						y: -8,
						scale: .96,
						filter: "blur(8px)"
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1,
						filter: "blur(0px)"
					},
					exit: {
						opacity: 0,
						y: -6,
						scale: .97,
						filter: "blur(6px)",
						transition: {
							duration: .16,
							ease: EASE$2
						}
					},
					transition: {
						type: "spring",
						stiffness: 420,
						damping: 32
					},
					style: { x: "-50%" },
					className: "absolute left-1/2 top-full hidden w-[420px] origin-top pt-3 lg:block",
					children: /* @__PURE__ */ jsx(GlassPanel, {
						className: "p-2",
						children: /* @__PURE__ */ jsx(GamesMenu, {
							idPrefix: "desk",
							onPick: () => setGames(false)
						})
					})
				}) })
			]
		}), /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				transform: "translateY(-8px) scale(0.98)"
			},
			animate: {
				opacity: 1,
				transform: "translateY(0px) scale(1)"
			},
			exit: {
				opacity: 0,
				transform: "translateY(-8px) scale(0.98)"
			},
			transition: {
				duration: .22,
				ease: EASE$2
			},
			className: "mx-auto mt-2 max-w-[1120px] origin-top lg:hidden",
			children: /* @__PURE__ */ jsxs(GlassPanel, {
				className: "p-2",
				children: [
					/* @__PURE__ */ jsx(GamesMenu, {
						idPrefix: "mob",
						onPick: () => setOpen(false)
					}),
					/* @__PURE__ */ jsx("div", { className: "my-2 h-px bg-white/[0.06]" }),
					/* @__PURE__ */ jsx("ul", {
						className: "grid grid-cols-2 gap-1",
						children: LINKS.map(({ id, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: `#${id}`,
							onClick: () => setOpen(false),
							className: `block rounded-2xl px-4 py-3 text-[15px] ${active === id ? "bg-white/[0.06] text-paper" : "text-zinc-300"}`,
							children: t(label)
						}) }, id))
					}),
					/* @__PURE__ */ jsxs("a", {
						href: "#cenik",
						onClick: () => setOpen(false),
						className: "mt-2 flex items-center justify-center gap-1.5 rounded-full bg-paper py-3.5 font-semibold text-ink",
						children: [
							t("client"),
							" ",
							/* @__PURE__ */ jsx(ArrowUpRight, {
								size: 14,
								weight: "bold"
							})
						]
					})
				]
			})
		}) })]
	});
}
//#endregion
//#region app/components/Magnetic.tsx
/** Pulls its child slightly toward the cursor. Pointer-fine devices only. */
function Magnetic({ children, strength = .25 }) {
	const reduce = useReducedMotion();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, {
		stiffness: 220,
		damping: 18,
		mass: .4
	});
	const sy = useSpring(y, {
		stiffness: 220,
		damping: 18,
		mass: .4
	});
	if (reduce) return /* @__PURE__ */ jsx(Fragment, { children });
	return /* @__PURE__ */ jsx(motion.div, {
		className: "inline-flex",
		style: {
			x: sx,
			y: sy
		},
		onPointerMove: (e) => {
			if (e.pointerType !== "mouse") return;
			const r = e.currentTarget.getBoundingClientRect();
			x.set((e.clientX - (r.left + r.width / 2)) * strength);
			y.set((e.clientY - (r.top + r.height / 2)) * strength);
		},
		onPointerLeave: () => {
			x.set(0);
			y.set(0);
		},
		children
	});
}
//#endregion
//#region app/components/Hero.tsx
var EASE$1 = [
	.23,
	1,
	.32,
	1
];
var HEADLINE = ["Servers for your community,", "live in minutes"];
function Hero() {
	const ref = useRef(null);
	const reduce = useReducedMotion();
	const video = useRef(null);
	useEffect(() => {
		if (reduce) video.current?.pause();
	}, [reduce]);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
	const opacity = useTransform(scrollYProgress, [0, .7], [1, 0]);
	const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
	const reveal = (d) => ({
		initial: reduce ? { opacity: 0 } : {
			opacity: 0,
			filter: "blur(12px)",
			transform: "translateY(14px)"
		},
		animate: reduce ? { opacity: 1 } : {
			opacity: 1,
			filter: "blur(0px)",
			transform: "translateY(0px)"
		},
		transition: {
			duration: 1.1,
			delay: reduce ? 0 : d,
			ease: EASE$1
		}
	});
	let w = 0;
	return /* @__PURE__ */ jsxs("section", {
		id: "top",
		ref,
		className: "relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black px-4",
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				className: "absolute inset-0",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: 2,
					ease: EASE$1
				},
				style: reduce ? void 0 : { scale: bgScale },
				children: /* @__PURE__ */ jsx("video", {
					ref: video,
					className: "size-full object-cover",
					autoPlay: !reduce,
					muted: true,
					loop: true,
					playsInline: true,
					preload: "auto",
					poster: "/img/hero-poster.jpg",
					"aria-hidden": true,
					children: /* @__PURE__ */ jsx("source", {
						src: "/herooo.mp4",
						type: "video/mp4"
					})
				})
			}),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-black/45" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgb(0_0_0/0.55),transparent_75%)]" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" }),
			/* @__PURE__ */ jsxs(motion.div, {
				style: reduce ? void 0 : {
					y,
					opacity
				},
				className: "relative z-10 flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ jsx(motion.p, {
						...reveal(.2),
						className: "text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300",
						children: "Discord bot, Minecraft & Hytale hosting"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.035em]",
						children: HEADLINE.map((line, li) => /* @__PURE__ */ jsx("span", {
							className: `block ${li === 1 ? "text-zinc-400" : "text-paper"}`,
							children: line.split(" ").map((word) => {
								const d = .35 + w++ * .07;
								return /* @__PURE__ */ jsxs(motion.span, {
									className: "inline-block whitespace-pre",
									...reveal(d),
									children: [word, " "]
								}, word + d);
							})
						}, li))
					}),
					/* @__PURE__ */ jsx(motion.div, {
						...reveal(.95),
						className: "mt-10",
						children: /* @__PURE__ */ jsx(Magnetic, { children: /* @__PURE__ */ jsx("a", {
							href: "#hry",
							className: "rounded-full border border-white/25 bg-white/[0.04] px-8 py-3.5 text-[15px] text-paper backdrop-blur-md transition-[background-color,border-color,transform] duration-200 hover:border-white/50 hover:bg-white/10 active:scale-[0.97]",
							children: "Choose a game"
						}) })
					})
				]
			}),
			/* @__PURE__ */ jsx(motion.a, {
				...reveal(1.2),
				href: "#cenik",
				className: "absolute bottom-10 z-10 text-sm font-medium text-paper/90 transition-colors hover:text-white",
				children: "View plans"
			})
		]
	});
}
//#endregion
//#region app/components/LogoMarquee.tsx
var LOGOS = [
	"discord",
	"curseforge",
	"modrinth",
	"nodedotjs",
	"python",
	"openjdk",
	"typescript",
	"bun",
	"mysql",
	"github",
	"docker",
	"git"
];
function LogoMarquee() {
	const reduce = useReducedMotion();
	const row = LOGOS.map((slug) => /* @__PURE__ */ jsx("img", {
		src: `https://cdn.simpleicons.org/${slug}/8b8b94`,
		alt: slug,
		width: 36,
		height: 36,
		loading: "lazy",
		className: "size-9 shrink-0 opacity-70 transition-opacity duration-200 hover:opacity-100"
	}, slug));
	return /* @__PURE__ */ jsxs("section", {
		"aria-label": "Supported technologies",
		className: "border-y border-line py-12",
		children: [/* @__PURE__ */ jsx("div", {
			className: "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex w-max gap-20 pr-20",
				style: reduce ? void 0 : { animation: "marquee 40s linear infinite" },
				children: [row, /* @__PURE__ */ jsx("div", {
					"aria-hidden": true,
					className: "flex gap-20",
					children: row
				})]
			})
		}), /* @__PURE__ */ jsx("style", { children: `@keyframes marquee{to{transform:translateX(-50%)}}` })]
	});
}
//#endregion
//#region app/components/Services.tsx
var SERVICES = [
	{
		icon: Cube,
		title: "Minecraft servers",
		body: "Paper, Fabric, Forge and modpacks from CurseForge and Modrinth. Switch versions in one click.",
		image: "/img/minecraft-bg.png"
	},
	{
		icon: Robot,
		title: "Discord bots",
		image: "/img/svc-code.jpg",
		body: "Node.js, Python or Rust. Your bot runs 24/7 and restarts itself after a crash."
	},
	{
		icon: Sword,
		title: "Hytale servers",
		image: "/img/hytale-bg.png",
		body: "Ready for Hytale from day one. Launch a server without manual setup."
	},
	{
		icon: ShieldCheck,
		title: "DDoS protection",
		image: "/img/alt-servers.jpg",
		body: "We filter attacks at the network edge before they reach your server."
	},
	{
		icon: ClockCounterClockwise,
		title: "Daily backups",
		image: "/img/svc-backup.jpg",
		body: "Worlds and bot data are backed up every night. Restore from the panel yourself."
	}
];
function SpotlightCard({ s, i }) {
	const reduce = useReducedMotion();
	const x = useMotionValue(-400);
	const y = useMotionValue(-400);
	const glow = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, rgb(255 255 255 / .10), transparent 70%)`;
	const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(255 255 255 / .45), transparent 70%)`;
	const Icon = s.icon;
	const wide = i === 0;
	return /* @__PURE__ */ jsxs(motion.article, {
		initial: reduce ? { opacity: 0 } : {
			opacity: 0,
			transform: "translateY(32px)"
		},
		whileInView: reduce ? { opacity: 1 } : {
			opacity: 1,
			transform: "translateY(0px)"
		},
		viewport: {
			once: true,
			amount: .3
		},
		transition: {
			duration: .8,
			delay: i % 2 * .08,
			ease: [
				.23,
				1,
				.32,
				1
			]
		},
		onPointerMove: (e) => {
			const r = e.currentTarget.getBoundingClientRect();
			x.set(e.clientX - r.left);
			y.set(e.clientY - r.top);
		},
		onPointerLeave: () => {
			x.set(-400);
			y.set(-400);
		},
		className: `group relative overflow-hidden rounded-2xl bg-ink-2 p-px ${wide ? "md:col-span-2" : ""}`,
		children: [/* @__PURE__ */ jsx(motion.div, {
			className: "pointer-events-none absolute inset-0 rounded-2xl",
			style: { background: border }
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative flex h-full flex-col overflow-hidden rounded-[15px] bg-ink-2 ring-1 ring-line",
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					className: "pointer-events-none absolute inset-0",
					style: { background: glow }
				}),
				/* @__PURE__ */ jsxs("div", {
					className: `relative ${wide ? "h-56 md:h-80" : "h-44"} overflow-hidden`,
					children: [/* @__PURE__ */ jsx("img", {
						src: s.image,
						alt: s.title,
						loading: "lazy",
						className: "size-full object-cover opacity-60 transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
					}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative flex flex-1 flex-col gap-3 p-8",
					children: [
						/* @__PURE__ */ jsx(Icon, {
							size: 28,
							weight: "light",
							className: "text-paper"
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-2 font-medium tracking-[-0.02em] text-3xl",
							children: s.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "max-w-[46ch] leading-relaxed text-mute",
							children: s.body
						})
					]
				})
			]
		})]
	});
}
function Services() {
	return /* @__PURE__ */ jsx("section", {
		id: "sluzby",
		className: "mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:sticky lg:top-32 lg:self-start",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl",
					children: "One panel for everything"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-6 max-w-[40ch] text-lg leading-relaxed text-mute",
					children: "Manage Minecraft, Hytale and Discord bots in one place. Console, files and backups in your browser."
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: SERVICES.map((s, i) => /* @__PURE__ */ jsx(SpotlightCard, {
					s,
					i
				}, s.title))
			})]
		})
	});
}
//#endregion
//#region app/components/Process.tsx
var STEPS = [
	{
		image: "/img/step-plan.jpg",
		title: "Pick a plan",
		body: "Discord bot, Minecraft or Hytale. Choose how much power you need."
	},
	{
		image: "/img/step-pay.jpg",
		title: "Pay",
		body: "By card, PayPal or bank transfer. Activation is automatic."
	},
	{
		image: "/img/step-launch.jpg",
		title: "Launch",
		body: "Your server is live in minutes. Login details arrive by email."
	}
];
function Process() {
	const ref = useRef(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 75%", "end 55%"]
	});
	const progress = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 24
	});
	return /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-[1400px] px-4 py-28 md:px-8 md:py-40",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl",
			children: "From order to a running server"
		}), /* @__PURE__ */ jsxs("div", {
			ref,
			className: "relative mt-20",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" }),
				/* @__PURE__ */ jsx(motion.div, {
					className: "absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-paper md:block",
					style: { scaleX: reduce ? 1 : progress }
				}),
				/* @__PURE__ */ jsx("ol", {
					className: "grid gap-12 md:grid-cols-3 md:gap-8",
					children: STEPS.map((s, i) => /* @__PURE__ */ jsxs(motion.li, {
						initial: reduce ? { opacity: 0 } : {
							opacity: 0,
							transform: "translateY(20px)"
						},
						whileInView: reduce ? { opacity: 1 } : {
							opacity: 1,
							transform: "translateY(0px)"
						},
						viewport: {
							once: true,
							amount: .6
						},
						transition: {
							duration: .7,
							delay: i * .12,
							ease: [
								.23,
								1,
								.32,
								1
							]
						},
						className: "relative",
						children: [
							/* @__PURE__ */ jsx("span", { className: "relative z-10 block size-[15px] rounded-full border border-paper bg-ink" }),
							/* @__PURE__ */ jsx("div", {
								className: "mt-8 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line",
								children: /* @__PURE__ */ jsx("img", {
									src: s.image,
									alt: s.title,
									loading: "lazy",
									className: "size-full object-cover opacity-75 transition-transform duration-700 hover:scale-[1.04]"
								})
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-6 font-medium tracking-[-0.02em] text-3xl",
								children: s.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-[32ch] leading-relaxed text-mute",
								children: s.body
							})
						]
					}, s.title))
				})
			]
		})]
	});
}
//#endregion
//#region app/components/Faq.tsx
var FAQ = [
	{
		q: "How fast will my server be ready?",
		a: "It is created automatically after payment, usually within five minutes."
	},
	{
		q: "Can I upload my own modpack or plugins?",
		a: "Yes. Upload anything via the file manager or SFTP, or install from CurseForge and Modrinth right in the panel."
	},
	{
		q: "Which languages can I use for my Discord bot?",
		a: "We support Node.js, Python and Rust. Upload your code and set the start command."
	},
	{
		q: "Is Hytale hosting available now?",
		a: "Yes, we have offered Hytale servers since the game launched. If something breaks, contact support."
	},
	{
		q: "Can I upgrade my plan later?",
		a: "Yes, anytime from the client area. You only pay the difference for the rest of the period."
	}
];
function Faq() {
	const [open, setOpen] = useState(0);
	return /* @__PURE__ */ jsxs("section", {
		id: "faq",
		className: "mx-auto max-w-4xl px-4 py-28 md:px-8 md:py-40",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl",
			children: "Frequently asked questions"
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-16",
			children: FAQ.map((item, i) => {
				const isOpen = open === i;
				return /* @__PURE__ */ jsxs("div", {
					className: "border-b border-line",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						"aria-expanded": isOpen,
						onClick: () => setOpen(isOpen ? null : i),
						className: "flex w-full items-center justify-between gap-6 py-7 text-left text-xl",
						children: [item.q, /* @__PURE__ */ jsx(motion.span, {
							animate: { rotate: isOpen ? 45 : 0 },
							transition: {
								duration: .25,
								ease: [
									.23,
									1,
									.32,
									1
								]
							},
							className: "shrink-0 text-mute",
							children: /* @__PURE__ */ jsx(Plus, { size: 20 })
						})]
					}), /* @__PURE__ */ jsx(AnimatePresence, {
						initial: false,
						children: isOpen && /* @__PURE__ */ jsx(motion.div, {
							initial: {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: {
								height: 0,
								opacity: 0
							},
							transition: {
								duration: .3,
								ease: [
									.23,
									1,
									.32,
									1
								]
							},
							className: "overflow-hidden",
							children: /* @__PURE__ */ jsx("p", {
								className: "max-w-[60ch] pb-7 leading-relaxed text-mute",
								children: item.a
							})
						})
					})]
				}, item.q);
			})
		})]
	});
}
//#endregion
//#region app/components/Contact.tsx
function Contact() {
	const ref = useRef(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "start 30%"]
	});
	const scale = useTransform(scrollYProgress, [0, 1], [.92, 1]);
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState("");
	async function onSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		if (!String(data.get("email")).includes("@")) {
			setError("Enter a valid email address.");
			return;
		}
		setError("");
		setStatus("sending");
		await new Promise((r) => setTimeout(r, 900));
		setStatus("sent");
	}
	const input = "w-full rounded-md border border-white/15 bg-ink px-4 py-3 text-paper placeholder:text-zinc-500 outline-none transition-colors duration-200 focus:border-paper";
	return /* @__PURE__ */ jsx("section", {
		id: "kontakt",
		ref,
		className: "px-4 py-28 md:px-8 md:py-40",
		children: /* @__PURE__ */ jsxs(motion.div, {
			style: reduce ? void 0 : { scale },
			className: "grid-bg relative mx-auto grid max-w-[1400px] gap-16 overflow-hidden rounded-3xl bg-ink-2 p-8 ring-1 ring-line md:p-16 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl",
					children: "Contact us"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-6 max-w-[40ch] text-lg leading-relaxed text-mute",
					children: "We help with choosing a plan, modpacks and moving your server from another host."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 flex flex-col gap-4 text-paper",
					children: [/* @__PURE__ */ jsxs("a", {
						href: "mailto:support@flux-host.com",
						className: "flex items-center gap-3 hover:underline",
						children: [/* @__PURE__ */ jsx(EnvelopeSimple, { size: 20 }), " support@flux-host.com"]
					}), /* @__PURE__ */ jsxs("a", {
						href: "#",
						className: "flex items-center gap-3 hover:underline",
						children: [/* @__PURE__ */ jsx(DiscordLogo, { size: 20 }), " Discord server"]
					})]
				})
			] }), /* @__PURE__ */ jsxs("form", {
				onSubmit,
				noValidate: true,
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "email",
								className: "text-sm text-zinc-300",
								children: "Email"
							}),
							/* @__PURE__ */ jsx("input", {
								id: "email",
								name: "email",
								type: "email",
								autoComplete: "email",
								placeholder: "you@example.com",
								className: input,
								"aria-invalid": !!error,
								"aria-describedby": "email-err"
							}),
							/* @__PURE__ */ jsx("p", {
								id: "email-err",
								className: "min-h-5 text-sm text-red-400",
								children: error
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ jsx("label", {
							htmlFor: "msg",
							className: "text-sm text-zinc-300",
							children: "Message"
						}), /* @__PURE__ */ jsx("textarea", {
							id: "msg",
							name: "msg",
							rows: 5,
							placeholder: "How can we help?",
							className: input
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: status === "sending" || status === "sent",
						className: "rounded-full bg-paper px-7 py-4 font-medium text-ink transition-transform duration-150 active:scale-[0.97] disabled:opacity-70",
						children: status === "sending" ? "Sending…" : status === "sent" ? "Sent, we will reply soon" : "Send message"
					})
				]
			})]
		})
	});
}
//#endregion
//#region app/components/GameSelect.tsx
var GAMES = [
	{
		id: "discord",
		title: "Discord bot hosting",
		body: "Node.js, Python and Rust. Online 24/7.",
		logoClass: "",
		tint: "bg-gradient-to-t from-ink via-ink/40 to-transparent"
	},
	{
		id: "minecraft",
		title: "Minecraft server hosting",
		body: "Paper, Fabric, Forge and one-click modpacks.",
		bg: "/img/minecraft-bg.png",
		logo: "/img/grass-block.png",
		logoClass: "w-28 md:w-36",
		tint: "bg-gradient-to-t from-ink via-ink/50 to-ink/10"
	},
	{
		id: "hytale",
		title: "Hytale server hosting",
		body: "Your own world for your community from day one.",
		bg: "/img/hytale-bg.png",
		logo: "/img/hytale-logo.png",
		logoClass: "w-24 md:w-32",
		tint: "bg-gradient-to-t from-ink via-ink/50 to-ink/10"
	}
];
var EASE = [
	.23,
	1,
	.32,
	1
];
function GameCard({ g, i, onPick }) {
	const reduce = useReducedMotion();
	const from = fmt(Math.min(...allPlans(CATEGORIES.find((c) => c.id === g.id)).map((p) => p.month)));
	const px = useMotionValue(.5);
	const py = useMotionValue(.5);
	const rx = useSpring(useTransform(py, [0, 1], [7, -7]), {
		stiffness: 160,
		damping: 18
	});
	const ry = useSpring(useTransform(px, [0, 1], [-9, 9]), {
		stiffness: 160,
		damping: 18
	});
	const lx = useSpring(useTransform(px, [0, 1], [-18, 18]), {
		stiffness: 120,
		damping: 16
	});
	const ly = useSpring(useTransform(py, [0, 1], [-14, 14]), {
		stiffness: 120,
		damping: 16
	});
	return /* @__PURE__ */ jsx(motion.button, {
		type: "button",
		onClick: () => onPick(g.id),
		initial: reduce ? { opacity: 0 } : {
			opacity: 0,
			transform: "translateY(40px)"
		},
		whileInView: reduce ? { opacity: 1 } : {
			opacity: 1,
			transform: "translateY(0px)"
		},
		viewport: {
			once: true,
			amount: .3
		},
		transition: {
			duration: .9,
			delay: i * .1,
			ease: EASE
		},
		onPointerMove: (e) => {
			if (reduce || e.pointerType !== "mouse") return;
			const r = e.currentTarget.getBoundingClientRect();
			px.set((e.clientX - r.left) / r.width);
			py.set((e.clientY - r.top) / r.height);
		},
		onPointerLeave: () => {
			px.set(.5);
			py.set(.5);
		},
		className: "group text-left [perspective:1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper",
		children: /* @__PURE__ */ jsxs(motion.div, {
			style: reduce ? void 0 : {
				rotateX: rx,
				rotateY: ry,
				transformStyle: "preserve-3d"
			},
			className: "relative flex h-[440px] flex-col justify-end overflow-hidden rounded-3xl bg-ink-2 ring-1 ring-line md:h-[540px]",
			children: [
				g.bg && /* @__PURE__ */ jsx("img", {
					src: g.bg,
					alt: "",
					"aria-hidden": true,
					className: "absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-strong)] group-hover:scale-[1.08]"
				}),
				g.id === "discord" && /* @__PURE__ */ jsx(DiscordArt, { logoClass: "w-32 md:w-40" }),
				/* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${g.tint}` }),
				g.logo && /* @__PURE__ */ jsx(motion.img, {
					src: g.logo,
					alt: "",
					"aria-hidden": true,
					style: reduce ? void 0 : {
						x: lx,
						y: ly,
						translateZ: 60
					},
					className: `absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_40px_rgb(0_0_0/0.55)] transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-110 ${g.logoClass}`
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative p-8",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-medium tracking-[-0.02em] text-3xl leading-tight md:text-4xl",
							children: g.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 max-w-[32ch] text-zinc-300",
							children: g.body
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "text-zinc-300",
								children: [
									"from ",
									/* @__PURE__ */ jsxs("span", {
										className: "text-2xl font-medium text-paper",
										children: ["€", from]
									}),
									" / month"
								]
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-medium text-ink transition-transform duration-150 group-active:scale-[0.97]",
								children: ["View plans", /* @__PURE__ */ jsx(ArrowRight, {
									size: 16,
									className: "transition-transform duration-200 group-hover:translate-x-1"
								})]
							})]
						})
					]
				})
			]
		})
	});
}
function GameSelect({ onPick }) {
	return /* @__PURE__ */ jsxs("section", {
		id: "hry",
		className: "mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl",
			children: "What do you want to host?"
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-14 grid gap-5 lg:grid-cols-3",
			children: GAMES.map((g, i) => /* @__PURE__ */ jsx(GameCard, {
				g,
				i,
				onPick
			}, g.id))
		})]
	});
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta
});
function meta({}) {
	return [{ title: "Flux-Host | Minecraft, Hytale and Discord bot hosting" }, {
		name: "description",
		content: "Hosting for Discord bots, Minecraft and Hytale servers. Live in minutes."
	}];
}
var home_default = UNSAFE_withComponentProps(function Home() {
	const [cat, setCat] = useState("discord");
	const pick = (id) => {
		setCat(id);
		scrollToId("cenik");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Nav, {}),
		/* @__PURE__ */ jsxs("main", { children: [
			/* @__PURE__ */ jsx(Hero, {}),
			/* @__PURE__ */ jsx(GameSelect, { onPick: pick }),
			/* @__PURE__ */ jsx(LogoMarquee, {}),
			/* @__PURE__ */ jsx(Services, {}),
			/* @__PURE__ */ jsx(Process, {}),
			/* @__PURE__ */ jsx(Pricing, {
				cat,
				setCat
			}),
			/* @__PURE__ */ jsx(Faq, {}),
			/* @__PURE__ */ jsx(Contact, {})
		] }),
		/* @__PURE__ */ jsxs("footer", {
			className: "mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-10 text-sm text-mute md:px-8",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-medium tracking-[-0.02em] text-lg text-paper",
				children: "Flux-Host"
			}), /* @__PURE__ */ jsx("span", { children: "© 2026 Flux-Host. All rights reserved." })]
		})
	] });
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-YYiyHe8Q.js",
		"imports": ["/assets/jsx-runtime-C2f9LJXq.js", "/assets/errorBoundaries-yoNxvpdl.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-BffOGfzt.js",
			"imports": [
				"/assets/jsx-runtime-C2f9LJXq.js",
				"/assets/errorBoundaries-yoNxvpdl.js",
				"/assets/i18n-BrBDrdz7.js"
			],
			"css": ["/assets/root-YVgzSFzx.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-BGFeHAky.js",
			"imports": ["/assets/jsx-runtime-C2f9LJXq.js", "/assets/i18n-BrBDrdz7.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-cd4fc779.js",
	"version": "cd4fc779",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
