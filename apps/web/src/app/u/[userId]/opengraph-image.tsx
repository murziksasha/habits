import { ImageResponse } from "next/og";

export const alt = "EduForge profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Props = { params: Promise<{ userId: string }> | { userId: string } };

async function resolveParams(params: Props["params"]) {
  return typeof (params as Promise<{ userId: string }>).then === "function"
    ? await (params as Promise<{ userId: string }>)
    : (params as { userId: string });
}

export default async function Image({ params }: Props) {
  const { userId } = await resolveParams(params);
  let displayName = "EduForge learner";
  let level = 1;
  let xp = 0;
  let streak = 0;
  let achievements = 0;

  try {
    const res = await fetch(`${API_URL}/profiles/card/${userId}`, {
      next: { revalidate: 120 },
    });
    if (res.ok) {
      const data = (await res.json()) as {
        card: {
          displayName: string;
          globalLevel: number;
          globalXp: number;
          streakDays: number;
          achievementsUnlocked: number;
        };
      };
      displayName = data.card.displayName;
      level = data.card.globalLevel;
      xp = data.card.globalXp;
      streak = data.card.streakDays;
      achievements = data.card.achievementsUnlocked;
    }
  } catch {
    /* fallback card */
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #0ea5e9 100%)",
          color: "white",
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            EduForge
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1 }}>{displayName}</div>
          <div style={{ display: "flex", gap: 20, fontSize: 28, fontWeight: 700, opacity: 0.95 }}>
            <span>L{level}</span>
            <span>{xp} XP</span>
            <span>🔥 {streak}d</span>
            <span>🏆 {achievements}</span>
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.85 }}>
          Learning OS · skills + code
        </div>
      </div>
    ),
    { ...size },
  );
}
