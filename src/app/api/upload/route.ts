import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const uploadsDir = path.join(process.cwd(), "public", "uploads");
const manifestPath = path.join(uploadsDir, "manifest.json");

function isSafeKey(key: string) {
  return /^[a-z0-9-]+$/i.test(key);
}

async function readManifest(): Promise<Record<string, string>> {
  try {
    const data = await readFile(manifestPath, "utf8");
    return JSON.parse(data) as Record<string, string>;
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  const key = formData.get("key");

  if (!(file instanceof File) || typeof key !== "string" || !isSafeKey(key)) {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const fileName = file.name || "upload";
  const ext = path.extname(fileName).replace(".", "").toLowerCase() || "jpg";
  const safeFileName = `${key}.${ext}`;
  const filePath = path.join(uploadsDir, safeFileName);

  await mkdir(uploadsDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const manifest = await readManifest();
  manifest[key] = `/uploads/${safeFileName}`;
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  return NextResponse.json({ url: manifest[key] });
}
