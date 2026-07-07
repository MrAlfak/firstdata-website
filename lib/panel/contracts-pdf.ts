import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getUploadsRoot } from "./auth";

export type ContractSignaturePayload = {
  userId: number;
  userName: string;
  signedAt: string;
  contractId: number;
  contractTitle: string;
  ip?: string;
  userAgent?: string;
};

export async function writeContractPdf(
  userId: number, projectId: number, title: string, summary?: string, ): Promise<{ relativePath: string; mime: string }> {
  const root = getUploadsRoot();
  const rel = path.join(String(userId), "contracts", `${projectId}-${Date.now()}.pdf`);
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText("FIRST DATA, CONTRACT", {
    x: 50, y: 780, size: 16, font: fontBold, color: rgb(0.1, 0.1, 0.1), });
  page.drawText(title, { x: 50, y: 750, size: 14, font: fontBold });
  page.drawText(`Project #${projectId}`, { x: 50, y: 725, size: 11, font });
  if (summary) {
    const lines = summary.match(/.{1,80}(\s|$)/g) ?? [summary];
    let y = 690;
    for (const line of lines.slice(0, 12)) {
      page.drawText(line.trim(), { x: 50, y, size: 10, font });
      y -= 16;
    }
  }
  page.drawText(
    "By signing electronically in the client panel you agree to the terms described in this document.", { x: 50, y: 120, size: 9, font }, );

  const bytes = await pdf.save();
  fs.writeFileSync(abs, bytes);
  return { relativePath: rel.replace(/\\/g, "/"), mime: "application/pdf" };
}

export async function appendSignaturePage(input: {
  sourceRelativePath: string;
  userId: number;
  outputRelativePath: string;
  payload: ContractSignaturePayload;
}): Promise<string> {
  const root = getUploadsRoot();
  const srcAbs = path.join(root, input.sourceRelativePath);
  const outAbs = path.join(root, input.outputRelativePath);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });

  const existingBytes = fs.readFileSync(srcAbs);
  const pdf = await PDFDocument.load(existingBytes);
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText("ELECTRONIC SIGNATURE RECORD", {
    x: 50, y: 780, size: 14, font: fontBold, });
  const lines = [
    `Contract: ${input.payload.contractTitle}`, `Signer: ${input.payload.userName} (user #${input.payload.userId})`, `Signed at: ${input.payload.signedAt}`, `Document hash: ${hashFile(existingBytes)}`, ];
  if (input.payload.ip) lines.push(`IP: ${input.payload.ip}`);
  let y = 740;
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 10, font });
    y -= 18;
  }

  const signed = await pdf.save();
  fs.writeFileSync(outAbs, signed);
  return input.outputRelativePath.replace(/\\/g, "/");
}

export function hashFile(data: Buffer): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export function hashSignaturePayload(payload: ContractSignaturePayload): string {
  return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

export function detectMime(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") return "application/pdf";
  if (ext === ".txt") return "text/plain; charset=utf-8";
  return "application/octet-stream";
}
