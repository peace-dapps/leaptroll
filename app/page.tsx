"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CA = "6YGGmd5RtSycRr4Ds7hRu5ztYQQHfgTzpHQwXYoapump";
const PUMP_URL = "https://join.pump.fun/HSag/nvqgrsd5";
const X_URL = "https://x.com/leaptroll_xyz";
const DEX_URL = "https://dexscreener.com/solana/GhTFnHyoCQJHh31rQTBQ3VH7voDDPPAcjaQfyKFcDrP3";

type PriceData = {
  ok: boolean;
  priceUsd?: string;
  priceChange24h?: number;
  priceChange1h?: number;
  volume24h?: number;
  marketCap?: number;
  liquidityUsd?: number;
  txns24h?: number;
  buys24h?: number;
  sells24h?: number;
};

function formatUsd(n?: number) {
  if (!n && n !== 0) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}
function formatPrice(p?: string) {
  if (!p) return "—";
  const n = parseFloat(p);
  if (n < 0.001) return `$${n.toExponential(3)}`;
  if (n < 1) return `$${n.toFixed(6)}`;
  return `$${n.toFixed(4)}`;
}
function formatChange(c?: number) {
  if (c === undefined || c === null) return { text: "—", up: false };
  const up = c >= 0;
  return { text: `${up ? "+" : ""}${c.toFixed(2)}%`, up };
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [price, setPrice] = useState<PriceData | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const fetchPrice = () =>
      fetch("/api/price")
        .then((r) => r.json())
        .then(setPrice)
        .catch(() => setPrice({ ok: false }));
    fetchPrice();
    const id = setInterval(fetchPrice, 30000);
    return () => clearInterval(id);
  }, []);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const change24 = formatChange(price?.priceChange24h);
  const change1 = formatChange(price?.priceChange1h);

  return (
    <main className="mesh-dark min-h-screen text-bone overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-md border-b border-troll/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-troll group-hover:ring-troll-300 transition-all">
              <Image src="/mascot.jpg" alt="leaptroll" width={44} height={44} className="object-cover w-full h-full" />
            </div>
            <span className="font-display text-2xl sm:text-3xl tracking-wider text-bone">
              LEAP<span className="text-troll">TROLL</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-widest">
            <a href="#manifesto" className="hover:text-troll transition-colors">manifesto</a>
            <a href="#graveyard" className="hover:text-troll transition-colors">graveyard</a>
            <a href="#tokenomics" className="hover:text-troll transition-colors">tokenomics</a>
            <a href="#how" className="hover:text-troll transition-colors">buy</a>
            <a href="#roadmap" className="hover:text-troll transition-colors">roadmap</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={PUMP_URL}
              target="_blank"
              rel="noopener"
              className="bg-troll text-ink font-bold px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm uppercase tracking-wider rounded-full sticker-troll whitespace-nowrap"
            >
              buy $leaptroll
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded border border-troll/40 flex items-center justify-center bg-smoke"
              aria-label="menu"
            >
              <div className="flex flex-col gap-1">
                <span className={`block w-5 h-0.5 bg-troll transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block w-5 h-0.5 bg-troll transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-troll transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-void border-t border-troll/20">
            <div className="flex flex-col p-6 gap-5 font-mono uppercase tracking-widest text-sm">
              <a href="#manifesto" onClick={() => setMenuOpen(false)} className="hover:text-troll">manifesto</a>
              <a href="#graveyard" onClick={() => setMenuOpen(false)} className="hover:text-troll">graveyard</a>
              <a href="#tokenomics" onClick={() => setMenuOpen(false)} className="hover:text-troll">tokenomics</a>
              <a href="#how" onClick={() => setMenuOpen(false)} className="hover:text-troll">how to buy</a>
              <a href="#roadmap" onClick={() => setMenuOpen(false)} className="hover:text-troll">roadmap</a>
              <a href={X_URL} target="_blank" rel="noopener" className="hover:text-troll">𝕏 @leaptroll_xyz</a>
            </div>
          </div>
        )}
      </nav>

      {/* ===== LIVE PRICE TICKER (under nav) ===== */}
      <div className="fixed top-[60px] sm:top-[68px] left-0 right-0 z-40 bg-smoke border-b border-troll/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-widest overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-troll rounded-full animate-pulse" />
            <span className="text-troll">LIVE</span>
          </div>
          <div className="shrink-0"><span className="text-bone/50">price</span> <span className="text-bone">{formatPrice(price?.priceUsd)}</span></div>
          <div className="shrink-0">
            <span className="text-bone/50">24h</span>{" "}
            <span className={change24.up ? "text-troll-300" : "text-blood"}>{change24.text}</span>
          </div>
          <div className="shrink-0">
            <span className="text-bone/50">1h</span>{" "}
            <span className={change1.up ? "text-troll-300" : "text-blood"}>{change1.text}</span>
          </div>
          <div className="shrink-0"><span className="text-bone/50">mc</span> <span className="text-bone">{formatUsd(price?.marketCap)}</span></div>
          <div className="shrink-0"><span className="text-bone/50">vol</span> <span className="text-bone">{formatUsd(price?.volume24h)}</span></div>
          <div className="shrink-0"><span className="text-bone/50">liq</span> <span className="text-bone">{formatUsd(price?.liquidityUsd)}</span></div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section id="top" className="relative pt-32 sm:pt-36 pb-16 px-4 sm:px-6 min-h-screen flex items-center">
        {/* parallax words */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[8%] -left-10 font-display text-troll/[0.04] text-[140px] sm:text-[280px] leading-none whitespace-nowrap">
            $LEAPTROLL
          </div>
          <div className="absolute bottom-[10%] -right-20 font-display text-blood/[0.05] text-[100px] sm:text-[200px] leading-none whitespace-nowrap">
            FUCK SCAMMERS
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-7 order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-2 bg-blood/15 border border-blood/40 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-blood">
                  <span className="w-1.5 h-1.5 bg-blood rounded-full animate-blink" />
                  anti-rug operation · active
                </div>
              </div>

              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] tracking-tight">
                REAL TROLL.<br />
                REAL <span className="text-troll">CAUSE.</span><br />
                REAL <span className="text-troll">COMMUNITY.</span>
              </h1>

              <p className="text-base sm:text-lg text-bone/70 max-w-xl leading-relaxed">
                23 days. $1.7M raised across the charity meta. <span className="text-troll font-bold">Zero confirmed donations.</span> While <span className="font-mono text-bone">@leap_xyz</span> and <span className="font-mono text-bone">@donate.gg</span> stay radio silent — we're rallying everyone they screwed over.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={PUMP_URL}
                  target="_blank"
                  rel="noopener"
                  className="bg-troll text-ink font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base uppercase tracking-wider rounded-full sticker-troll inline-flex items-center gap-2"
                >
                  ape on pump.fun →
                </a>
                <a
                  href={DEX_URL}
                  target="_blank"
                  rel="noopener"
                  className="border-2 border-troll/40 text-troll font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base uppercase tracking-wider rounded-full hover:bg-troll/10 transition-colors"
                >
                  view chart
                </a>
              </div>

              {/* CA */}
              <button
                onClick={copyCA}
                className="group w-full max-w-xl flex items-center justify-between bg-smoke border-2 border-troll/30 hover:border-troll rounded-2xl p-3 sm:p-4 transition-all"
              >
                <div className="text-left min-w-0 flex-1 mr-3">
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-troll mb-1">contract address</div>
                  <div className="font-mono text-[11px] sm:text-sm text-bone truncate">{CA}</div>
                </div>
                <div className="bg-troll text-ink font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-2 rounded-full whitespace-nowrap">
                  {copied ? "copied ✓" : "copy"}
                </div>
              </button>
            </div>

            {/* mascot */}
            <div className="relative order-1 lg:order-2 flex items-center justify-center">
              <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] bg-troll/20 rounded-full blur-3xl" />
              <div className="relative animate-float">
                <div className="w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] rounded-full overflow-hidden ring-4 ring-troll glow-troll">
                  <Image src="/mascot.jpg" alt="LeapTroll" width={500} height={500} className="object-cover w-full h-full" priority />
                </div>
              </div>
              {/* sticker badges */}
              <div className="absolute top-2 sm:-top-4 right-0 sm:-right-4 bg-blood text-bone font-display text-lg sm:text-2xl tracking-wider px-4 py-2 rounded-full -rotate-6 sticker-blood">
                F*CK SCAMS
              </div>
              <div className="absolute bottom-2 sm:-bottom-4 left-0 sm:-left-4 bg-gold text-ink font-display text-lg sm:text-2xl tracking-wider px-4 py-2 rounded-full rotate-6 sticker-bone">
                0% TEAM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="relative py-5 bg-troll text-ink border-y-4 border-ink overflow-hidden">
        <div className="marquee-wrap font-display text-3xl sm:text-5xl uppercase whitespace-nowrap">
          {Array(2).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12 px-6">
              <span>$LEAPTROLL</span><span>★</span>
              <span>token vs. the entire meta</span><span>★</span>
              <span>$LEAPTROLL</span><span>★</span>
              <span>real troll · real cause</span><span>★</span>
              <span>$LEAPTROLL</span><span>★</span>
              <span>fuck the cabal</span><span>★</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section id="manifesto" className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-troll mb-3">// the manifesto</div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                CHARITY<br />
                SHOULD BE<br />
                <span className="text-troll">JUST</span> THAT.
              </h2>
              <p className="font-scrawl text-3xl sm:text-4xl text-bone/80 mt-6 leading-tight">
                you give to those in need. <br />not keep for yourself.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed text-bone/85">
              <p>
                The charity meta on <span className="font-mono">@pumpfun</span> raised over <span className="text-troll font-bold">$1.7 million</span> across 23 days. The plan, as told by <span className="font-mono">@leap_xyz</span> and <span className="font-mono">@donate.gg</span>, was simple: communities raise funds, charities receive them. <span className="font-bold text-blood">Zero verifiable deposits to charity</span>. Zero communication. Zero accountability.
              </p>
              <p>
                Meanwhile, the meta they sold collapsed. Most projects sit under 500k market cap. Communities are gone. The funds are not.
              </p>
              <p className="border-l-4 border-troll pl-5 py-1 font-mono text-base sm:text-lg italic text-bone">
                We're done watching the fake charity coin meta and the LEAP grift drain communities while hiding behind "good causes."
              </p>
              <p>
                <span className="scrawl-mark font-bold">$LEAPTROLL is different.</span> We're not raising for a charity that doesn't exist. We're raising awareness. We're uniting the holders of every dead charity coin — <span className="font-mono">$apple</span>, <span className="font-mono">$wish</span>, <span className="font-mono">$stjude</span>, <span className="font-mono">$rjgn</span>, <span className="font-mono">$rc</span> — into one front. One ticker. One signal: <span className="font-bold text-troll">we see you</span>.
              </p>
              <p>
                You've seen token PvP. You've never seen a token vs an entire meta. The longer they stay quiet, the louder we get.
              </p>

              {/* stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
                {[
                  { n: "$1.7M+", l: "raised, never sent" },
                  { n: "23+", l: "days of silence" },
                  { n: "0", l: "verified donations" },
                ].map((s, i) => (
                  <div key={i} className="border-2 border-troll/30 bg-smoke p-3 sm:p-5 text-center rounded-2xl">
                    <div className="font-display text-2xl sm:text-4xl text-troll">{s.n}</div>
                    <div className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-bone/60 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRAVEYARD ===== */}
      <section id="graveyard" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden border-y-4 border-troll/20">
        <div className="absolute inset-0">
          <Image src="/graveyard.jpg" alt="" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-blood mb-3">// in memoriam</div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-none">
              THE <span className="text-troll">GRAVEYARD.</span>
            </h2>
            <p className="text-bone/60 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Every charity coin that raised, ran, and waited. Funds locked. Communities dead. The receipts speak louder than the silence.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { ticker: "$APPLE", note: "1st in line" },
              { ticker: "$WISH", note: "still waiting" },
              { ticker: "$STJUDE", note: "no proof" },
              { ticker: "$RJGN", note: "vanished" },
              { ticker: "$RC", note: "ghosted" },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="tombstone w-full aspect-[3/4] flex flex-col items-center justify-center p-4 text-center">
                  <div className="font-mono text-[10px] sm:text-xs text-bone/50 mb-2">R.I.P.</div>
                  <div className="font-display text-2xl sm:text-3xl text-bone mb-3 leading-none">{t.ticker}</div>
                  <div className="w-8 h-px bg-bone/30 mb-3" />
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-bone/50">{t.note}</div>
                </div>
                <div className="font-scrawl text-2xl text-troll mt-4 group-hover:animate-shake">never forget</div>
              </div>
            ))}
          </div>

          <p className="text-center font-mono text-xs sm:text-sm uppercase tracking-widest text-bone/50 mt-12 sm:mt-16 max-w-3xl mx-auto">
            * we respect every community — $apple · $henry · $wish · $trollhouse · $stjude · $boob · $punch — our problem is with the third-parties holding the funds.
          </p>
        </div>
      </section>

      {/* ===== TOKENOMICS + LIVE STATS ===== */}
      <section id="tokenomics" className="py-20 sm:py-32 px-4 sm:px-6 relative dots-troll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-troll mb-3">// the numbers</div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-none">
              TOKEN<span className="text-troll">OMICS.</span>
            </h2>
          </div>

          {/* live stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
            <div className="border-2 border-troll/30 bg-smoke rounded-2xl p-4 sm:p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-2">price</div>
              <div className="font-display text-2xl sm:text-4xl text-bone tabular-nums">{formatPrice(price?.priceUsd)}</div>
              <div className={`font-mono text-xs mt-1 ${change24.up ? "text-troll-300" : "text-blood"}`}>{change24.text} (24h)</div>
            </div>
            <div className="border-2 border-troll/30 bg-smoke rounded-2xl p-4 sm:p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-2">market cap</div>
              <div className="font-display text-2xl sm:text-4xl text-bone tabular-nums">{formatUsd(price?.marketCap)}</div>
              <div className="font-mono text-xs mt-1 text-bone/50">live</div>
            </div>
            <div className="border-2 border-troll/30 bg-smoke rounded-2xl p-4 sm:p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-2">24h volume</div>
              <div className="font-display text-2xl sm:text-4xl text-bone tabular-nums">{formatUsd(price?.volume24h)}</div>
              <div className="font-mono text-xs mt-1 text-bone/50">{price?.txns24h ?? "—"} txns</div>
            </div>
            <div className="border-2 border-troll/30 bg-smoke rounded-2xl p-4 sm:p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-2">liquidity</div>
              <div className="font-display text-2xl sm:text-4xl text-bone tabular-nums">{formatUsd(price?.liquidityUsd)}</div>
              <div className="font-mono text-xs mt-1 text-bone/50">burned</div>
            </div>
          </div>

          {/* static facts */}
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-5">
            <div className="border-2 border-troll/30 bg-void rounded-2xl p-5 sm:p-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-3">total supply</div>
              <div className="font-display text-4xl sm:text-5xl text-troll">1B</div>
              <div className="font-mono text-xs text-bone/50 mt-1">1,000,000,000</div>
            </div>
            <div className="border-2 border-troll/30 bg-void rounded-2xl p-5 sm:p-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-3">tax</div>
              <div className="font-display text-4xl sm:text-5xl text-troll">0%</div>
              <div className="font-mono text-xs text-bone/50 mt-1">buy / sell</div>
            </div>
            <div className="border-2 border-troll/30 bg-void rounded-2xl p-5 sm:p-7">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-3">team alloc</div>
              <div className="font-display text-4xl sm:text-5xl text-troll">0%</div>
              <div className="font-mono text-xs text-bone/50 mt-1">fair launch</div>
            </div>
          </div>

          {/* CA again */}
          <div className="mt-8 sm:mt-10 bg-troll-deep border-2 border-troll rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-widest text-troll-100 mb-2">contract address</div>
              <div className="font-mono text-[11px] sm:text-sm text-bone break-all">{CA}</div>
            </div>
            <button
              onClick={copyCA}
              className="bg-troll text-ink font-bold px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-widest sticker-troll whitespace-nowrap"
            >
              {copied ? "copied ✓" : "copy ca"}
            </button>
          </div>
        </div>
      </section>

      {/* ===== HOW TO BUY ===== */}
      <section id="how" className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-troll mb-3">// the protocol</div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-none">
              HOW TO <span className="text-troll">TROLL.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { step: "01", title: "GET A WALLET", desc: "Phantom, Solflare, or Backpack. Load up some SOL." },
              { step: "02", title: "OPEN PUMP.FUN", desc: "Tap the buy button. You'll land right on the $LEAPTROLL page." },
              { step: "03", title: "SWAP", desc: "Pick your amount. Confirm. Done in 4 seconds, 0.0001 SOL." },
              { step: "04", title: "JOIN THE TROLL", desc: "You hold $LEAPTROLL. Now tag every grifter you see." },
            ].map((item) => (
              <div key={item.step} className="bg-smoke border-2 border-troll/20 rounded-2xl p-5 sm:p-6 hover:border-troll transition-colors relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 font-display text-8xl text-troll/[0.08] group-hover:text-troll/[0.15] transition-colors select-none">{item.step}</div>
                <div className="relative">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-troll mb-3">step · {item.step}</div>
                  <h3 className="font-display text-2xl sm:text-3xl text-bone mb-3 tracking-wider">{item.title}</h3>
                  <p className="text-sm text-bone/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-14">
            <a
              href={PUMP_URL}
              target="_blank"
              rel="noopener"
              className="inline-block bg-troll text-ink font-bold px-8 sm:px-10 py-4 sm:py-5 text-base uppercase tracking-widest rounded-full sticker-troll"
            >
              I'M IN. SEND ME $LEAPTROLL →
            </a>
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section id="roadmap" className="py-20 sm:py-32 px-4 sm:px-6 mesh-troll border-y-4 border-ink relative">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-troll mb-3">// the campaign</div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-none">ROADMAP.</h2>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {[
              { phase: "PHASE 01", title: "THE AWAKENING", items: ["live on pump.fun", "first 1k trolls onboarded", "the manifesto goes viral", "every dead-meta holder hears about us"] },
              { phase: "PHASE 02", title: "THE PRESSURE", items: ["raydium graduation", "X campaigns daily", "10k+ holders", "the silent grifters get loud — or get exposed"] },
              { phase: "PHASE 03", title: "THE REVERSAL", items: ["proof of donations demanded publicly", "partnerships with anti-rug tools", "merch drop (yes, real shirts)", "the meta gets a second life — minus the scammers"] },
              { phase: "PHASE 04", title: "THE LEGACY", items: ["LeapTroll outlives Leap", "every charity coin returns to its community", "the cabal exits the stage", "we built the receipts"] },
            ].map((p, i) => (
              <div key={i} className="border-2 border-troll/30 bg-ink/60 backdrop-blur rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:border-troll transition-colors">
                <div className="bg-troll text-ink rounded-xl px-4 py-3 font-display text-xl sm:text-2xl text-center sm:min-w-[160px] flex flex-col justify-center sticker-troll self-start">
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">{p.phase}</div>
                  <div className="leading-tight tracking-wider">{p.title}</div>
                </div>
                <ul className="flex-1 space-y-2">
                  {p.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm sm:text-base text-bone/85">
                      <span className="font-mono text-troll mt-0.5 flex-shrink-0">▸</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 mesh-dark" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="font-display text-[140px] sm:text-[260px] text-troll/[0.04] leading-none whitespace-nowrap">LEAPTROLL</div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-block mb-6 animate-tilt">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-troll glow-troll">
              <Image src="/mascot.jpg" alt="leaptroll" width={144} height={144} className="object-cover w-full h-full" />
            </div>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl mb-5 leading-none">
            TAKE A <span className="text-troll">STAND.</span><br />
            SEND $LEAPTROLL.
          </h2>
          <p className="text-bone/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
            Every grifter that tried to hide behind a good cause is about to learn a new word: <span className="text-troll font-bold">accountability</span>.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={PUMP_URL} target="_blank" rel="noopener" className="bg-troll text-ink font-bold px-7 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base uppercase tracking-widest rounded-full sticker-troll">
              buy on pump.fun
            </a>
            <a href={X_URL} target="_blank" rel="noopener" className="border-2 border-troll/40 text-troll font-bold px-7 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base uppercase tracking-widest rounded-full hover:bg-troll/10 transition-colors">
              follow on 𝕏
            </a>
          </div>
        </div>
      </section>

      {/* warning tape strip */}
      <div className="warning-tape h-3" />

      <footer className="py-8 px-4 sm:px-6 bg-ink border-t border-troll/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-troll">
              <Image src="/mascot.jpg" alt="lt" width={32} height={32} className="object-cover w-full h-full" />
            </div>
            <span className="font-display text-xl tracking-wider">LEAP<span className="text-troll">TROLL</span></span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-bone/40 text-center">
            this is a memecoin · not financial advice · troll responsibly
          </div>
          <a href={X_URL} target="_blank" rel="noopener" className="font-mono text-[10px] text-troll hover:text-bone uppercase tracking-widest">
            @leaptroll_xyz →
          </a>
        </div>
      </footer>
    </main>
  );
}
