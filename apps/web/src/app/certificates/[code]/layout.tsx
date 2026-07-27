import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const WEB_ORIGIN = process.env.NEXT_PUBLIC_WEB_ORIGIN ?? process.env.WEB_ORIGIN ?? "http://localhost:3000";

type Props = { params: Promise<{ code: string }> | { code: string }; children: React.ReactNode };

async function resolveParams(params: Props["params"]) {
  return typeof (params as Promise<{ code: string }>).then === "function"
    ? await (params as Promise<{ code: string }>)
    : (params as { code: string });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await resolveParams(params);
  const upper = code.toUpperCase();
  try {
    const res = await fetch(`${API_URL}/certificates/verify/${upper}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return { title: "EduForge Certificate" };
    }
    const data = (await res.json()) as {
      certificate: {
        titleUk: string;
        titleEn: string;
        displayName: string;
        code: string;
      };
    };
    const cert = data.certificate;
    const title = `${cert.titleEn || cert.titleUk} · ${cert.displayName}`;
    const description = `EduForge certificate awarded to ${cert.displayName}. Verify: ${cert.code}`;
    const url = `${WEB_ORIGIN.replace(/\/$/, "")}/certificates/${cert.code}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "EduForge",
        type: "article",
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
    return { title: "EduForge Certificate" };
  }
}

export default function CertificateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
