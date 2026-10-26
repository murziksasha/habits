import { ImageResponse } from "next/og";

export const alt = "EduForge certificate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Props = { params: Promise<{ code: string }> };

export default async function Image({ params }: Props) {
  const { code } = await params;
  const upper = code.toUpperCase();
  let title = "Certificate of Completion";
  let displayName = "Learner";
  let certCode = upper;
  let courseTitle = "";
  let productName = "EduForge";

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
          courseTitleEn?: string;
          courseTitleUk?: string;
        };
      };
      const c = data.certificate;
      title = c.titleEn || c.titleUk || title;
      displayName = c.displayName;
      certCode = c.code;
      courseTitle = c.courseTitleEn || c.courseTitleUk || "";
    }
  } catch {
    /* fallback */
  }

  try {
    const brandRes = await fetch(`${API_URL}/public/branding`, {
      next: { revalidate: 60 },
    });
    if (brandRes.ok) {
      const brand = (await brandRes.json()) as {
        theme?: { branding?: { productName?: string } };
      };
      if (brand.theme?.branding?.productName) {
        productName = brand.theme.branding.productName;
      }
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
          background: "linear-gradient(145deg, #0f172a 0%, #14532d 45%, #58CC02 100%)",
          color: "white",
          padding: 56,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#58CC02",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              {productName.charAt(0).toUpperCase()}
            </div>
            <span>{productName.toUpperCase()}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, opacity: 0.85, letterSpacing: 2 }}>
            CERTIFICATE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 700, opacity: 0.85 }}>Awarded to</div>
          <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>{displayName}</div>
          {courseTitle ? (
            <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.95 }}>{courseTitle}</div>
          ) : null}
          <div style={{ fontSize: 24, fontWeight: 600, opacity: 0.9 }}>{title}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          <span style={{ fontFamily: "monospace", letterSpacing: 2 }}>{certCode}</span>
          <span style={{ opacity: 0.85 }}>Verify on {productName}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
