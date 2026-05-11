import { cityServiceLinkEntries } from "@/data/site";
import { getRedis } from "@/lib/redis";

const ZKEY = "site:pageviews";

export type TopPageLink = (typeof cityServiceLinkEntries)[number];

export async function recordPageView(path: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.zincrby(ZKEY, 1, path);
}

function parseZrangeWithScores(raw: unknown): { member: string; score: number }[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  const out: { member: string; score: number }[] = [];
  if (typeof raw[0] === "string") {
    for (let i = 0; i < raw.length; i += 2) {
      const member = raw[i];
      const score = raw[i + 1];
      if (typeof member === "string" && (typeof score === "string" || typeof score === "number")) {
        out.push({ member, score: Number(score) });
      }
    }
    return out;
  }
  return out;
}

/** Top city+service links by Redis score, with static fallback when Redis is off or empty. */
export async function getTopCityServiceLinks(limit: number): Promise<{
  links: TopPageLink[];
  analyticsEnabled: boolean;
}> {
  const fallback = cityServiceLinkEntries.slice(0, limit);
  const redis = getRedis();
  if (!redis) {
    return { links: fallback, analyticsEnabled: false };
  }

  const hrefSet = new Set<string>(cityServiceLinkEntries.map((e) => e.href));
  const raw = await redis.zrange(ZKEY, 0, limit * 8 - 1, { rev: true, withScores: true });
  const scored = parseZrangeWithScores(raw).filter((row) => hrefSet.has(row.member));

  const seen = new Set<string>();
  const links: TopPageLink[] = [];

  for (const row of scored) {
    if (links.length >= limit) break;
    if (seen.has(row.member)) continue;
    const entry = cityServiceLinkEntries.find((e) => e.href === row.member);
    if (!entry) continue;
    seen.add(row.member);
    links.push(entry);
  }

  if (links.length < limit) {
    for (const entry of cityServiceLinkEntries) {
      if (links.length >= limit) break;
      if (seen.has(entry.href)) continue;
      links.push(entry);
      seen.add(entry.href);
    }
  }

  return { links, analyticsEnabled: true };
}
