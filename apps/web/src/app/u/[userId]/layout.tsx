import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const WEB_ORIGIN = process.env.NEXT_PUBLIC_WEB_ORIGIN ?? process.env.WEB_ORIGIN ?? "http://localhost:3000";

type Props = { params: Promise<{ userId: string }> | { userId: string }; children: React.ReactNode };

async function resolveParams(params: Props["params"]) {
  return typeof (params as Promise<{ userId: string }>).then === "function"
    ? await (params as Promise<{ userId: string }>)
    : (params as { userId: string });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await resolveParams(params);
  try {
    const res = await fetch(`${API_URL}/profiles/card/${userId}`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) {
      return { title: "EduForge Profile" };
    }
    const data = (await res.json()) as {
      card: {
        displayName: string;
        globalLevel: number;
        globalXp: number;
        streakDays: number;
        achievementsUnlocked: number;
      };
    };
    const c = data.card;
    const title = `${c.displayName} · L${c.globalLevel} · EduForge`;
    const description = `${c.displayName} on EduForge — level ${c.globalLevel}, ${c.globalXp} XP, streak ${c.streakDays}d, ${c.achievementsUnlocked} achievements.`;
    const url = `${WEB_ORIGIN.replace(/\/$/, "")}/u/${userId}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "EduForge",
        type: "profile",
        locale: "uk_UA",
        // opengraph-image.tsx auto-attached by Next.js
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: { canonical: url },
    };
  } catch {
    return { title: "EduForge Profile" };
  }
}

export default function PublicProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
