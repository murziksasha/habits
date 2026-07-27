import { ImageResponse } from "next/og";

export const alt = "EduForge certificate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Props = { params: Promise<{ code: string }> | { code: string } };

async function resolveParams(params: Props["params"]) {
  return typeof (params as Promise<{ code: string }>).then === "function"
    ? await (params as Promise<{ code: string }>)
    : (params as { code: string });
}

export default async function Image({ params }: Props) {
  const { code } = await resolveParams(params);
  const upper = code.toUpperCase();
  let title = "EduForge Certificate";
  let displayName = "Learner";
  let certCode = upper;

  try {
    const res = await fetch(`${API_URL}/certificates/verify/${upper}`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = (await res.json()) as {
        certificate: {
          titleUk: string;
          titleEn: string;
          displayName: string;
          code: string;
        };
      };
      const c = data.certificate;
      title = c.titleEn || c.titleUk || title;
      displayName = c.displayName;
      certCode = c.code;
    }
  } catch {
    /* fallback */
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
          background: "linear-gradient(145deg, #1e1b4b 0%, #4c1d95 50%, #c026d3 100%)",
          color: "white",
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3, opacity: 0.9 }}>
          EDUFORGE CERTIFICATE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.15 }}>{title}</div>
          <div style={{ fontSize: 36, fontWeight: 700, opacity: 0.95 }}>{displayName}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <span style={{ fontFamily: "monospace", letterSpacing: 2 }}>{certCode}</span>
          <span style={{ opacity: 0.85 }}>Verify on EduForge</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
