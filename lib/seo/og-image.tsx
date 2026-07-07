import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

type OgProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  footer?: string;
};

export function renderOgImage({ title, subtitle, eyebrow, footer }: OgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080c08", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", padding: "60px 80px", fontFamily: "monospace", border: "1px solid rgba(51,255,102,0.2)", }}
      >
        <div
          style={{
            color: "rgba(51,255,102,0.35)", fontSize: 16, letterSpacing: "0.2em", textTransform: "uppercase", }}
        >
          {eyebrow ?? "// firstdata.ir"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: "1000px" }}>
          <div
            style={{
              color: "#33ff66", fontSize: title.length > 40 ? 52 : 72, fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: "rgba(51,255,102,0.65)", fontSize: 28, lineHeight: 1.2 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        <div style={{ color: "rgba(51,255,102,0.35)", fontSize: 16, letterSpacing: "0.1em" }}>
          {footer ?? "firstdata.ir, info@firstdata.ir"}
        </div>
      </div>
    ), OG_SIZE, );
}

export function renderAppIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", background: "#080c08", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(51,255,102,0.35)", }}
      >
        <div style={{ color: "#33ff66", fontSize: size * 0.38, fontWeight: 700, fontFamily: "monospace" }}>
          FD
        </div>
      </div>
    ), { width: size, height: size }, );
}
