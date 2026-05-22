import { NextResponse } from "next/server";

export const revalidate = 30; // cache 30s

const CA = "6YGGmd5RtSycRr4Ds7hRu5ztYQQHfgTzpHQwXYoapump";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${CA}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error("dexscreener fetch failed");
    const data = await res.json();
    const pair = data?.pairs?.[0];
    if (!pair) {
      return NextResponse.json({ ok: false, error: "no pair" }, { status: 200 });
    }
    return NextResponse.json({
      ok: true,
      priceUsd: pair.priceUsd,
      priceChange24h: pair.priceChange?.h24,
      priceChange1h: pair.priceChange?.h1,
      volume24h: pair.volume?.h24,
      marketCap: pair.marketCap ?? pair.fdv,
      liquidityUsd: pair.liquidity?.usd,
      txns24h: (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0),
      buys24h: pair.txns?.h24?.buys,
      sells24h: pair.txns?.h24?.sells,
      pairUrl: pair.url,
      pairAddress: pair.pairAddress,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 200 });
  }
}
