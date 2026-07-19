import { describe, expect, it } from "vitest";
import {
  stripSimpleTypescript,
  PLAYGROUND_EXAMPLES,
  PLAYGROUND_LANGS,
  PLAYGROUND_CHALLENGES,
  matchChallengeStdout,
  normalizeStdout,
  evaluatePlaygroundChallenge,
  matchSourceContains,
  playgroundXpForCodes,
  playgroundChallengeById,
  encodePlaygroundShare,
  decodePlaygroundShare,
  buildPlaygroundShareUrl,
  buildPlaygroundEmbedUrl,
  playgroundEmbedIframeHtml,
} from "./playground.js";

describe("playground helpers", () => {
  it("has languages, examples, challenges", () => {
    expect(PLAYGROUND_LANGS.length).toBeGreaterThanOrEqual(6);
    expect(PLAYGROUND_EXAMPLES.length).toBeGreaterThanOrEqual(5);
    expect(PLAYGROUND_CHALLENGES.length).toBeGreaterThanOrEqual(18);
  });

  it("includes html/css source challenges", () => {
    const html = PLAYGROUND_CHALLENGES.filter((c) => c.lang === "html");
    const css = PLAYGROUND_CHALLENGES.filter((c) => c.lang === "css");
    expect(html.length).toBeGreaterThanOrEqual(2);
    expect(css.length).toBeGreaterThanOrEqual(2);
  });

  it("strips simple TS annotations", () => {
    const src = `type User = { name: string };
function greet(u: User): string {
  return "Hi " + u.name;
}`;
    const out = stripSimpleTypescript(src);
    expect(out).not.toContain("type User");
    expect(out).toContain("function greet");
  });

  it("matches challenge stdout", () => {
    expect(matchChallengeStdout("14\n", ["14"]).pass).toBe(true);
    expect(matchChallengeStdout("15", ["14"]).pass).toBe(false);
  });

  it("normalizeStdout trims trailing empties", () => {
    expect(normalizeStdout("a\n\n")).toEqual(["a"]);
  });

  it("matches HTML source contains", () => {
    const html = `<h1>EduForge</h1><p class="lead">x</p>`;
    expect(
      matchSourceContains(html, ["<h1", "EduForge", 'class="lead"']).pass,
    ).toBe(true);
    expect(matchSourceContains(html, ["missing"]).pass).toBe(false);
  });

  it("evaluatePlaygroundChallenge for source mode", () => {
    const ch = playgroundChallengeById("ch-html-h1")!;
    expect(
      evaluatePlaygroundChallenge(ch, {
        source: `<h1>EduForge</h1><p class="lead">hi</p>`,
      }).pass,
    ).toBe(true);
    expect(evaluatePlaygroundChallenge(ch, { source: `<div></div>` }).pass).toBe(false);
  });

  it("playgroundXpForCodes sums rewards", () => {
    const { solved, xp } = playgroundXpForCodes(["pg_ch_ch-js-double", "pg_ch_ch-json-parse"]);
    expect(solved).toBe(2);
    expect(xp).toBe(8 + 6);
  });

  it("weekly race picks 5 challenges", async () => {
    const { weeklyRaceChallengeIds, weeklyRaceXpBonus } = await import("./playground.js");
    const ids = weeklyRaceChallengeIds("2026-W12");
    expect(ids.length).toBeGreaterThanOrEqual(1);
    expect(ids.length).toBeLessThanOrEqual(5);
    expect(weeklyRaceXpBonus(1)).toBe(25);
    expect(weeklyRaceXpBonus(4)).toBe(0);
  });

  it("html challenges include domAsserts", () => {
    const h1 = playgroundChallengeById("ch-html-h1");
    expect(h1?.domAsserts?.length).toBeGreaterThan(0);
  });

  it("share encode/decode round-trip", () => {
    const enc = encodePlaygroundShare({
      v: 1,
      lang: "js",
      code: "console.log(42)",
      challengeId: "ch-js-double",
    });
    expect(enc).toBeTruthy();
    const dec = decodePlaygroundShare(enc!);
    expect(dec?.code).toBe("console.log(42)");
    expect(dec?.challengeId).toBe("ch-js-double");
    expect(buildPlaygroundShareUrl("http://localhost:3000", {
      v: 1,
      lang: "html",
      code: "<h1>x</h1>",
    })).toContain("/playground?share=");
    const emb = buildPlaygroundEmbedUrl("http://localhost:3000", {
      v: 1,
      lang: "js",
      code: "1",
    });
    expect(emb).toContain("/embed/playground?share=");
    expect(playgroundEmbedIframeHtml(emb!)).toContain("<iframe");
  });

  it("share rejects garbage", () => {
    expect(decodePlaygroundShare("!!!not-b64!!!")).toBeNull();
  });
});
