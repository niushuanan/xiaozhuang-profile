import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import path from "node:path";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const manifestPath = path.join(uploadDir, "manifest.json");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const key = formData.get("key") as string;

    if (!file || !key) {
      return NextResponse.json({ error: "Missing file or key" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${key}${path.extname(file.name) || ".jpg"}`;
    const filePath = path.join(uploadDir, fileName);

    // Save the file
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    // Update manifest.json
    let manifest: Record<string, string> = {};
    try {
      const manifestData = await fs.readFile(manifestPath, "utf-8");
      manifest = JSON.parse(manifestData);
    } catch (e: unknown) {
      if ((e as { code?: string }).code !== "ENOENT") throw e;
    }

    const publicUrl = `/uploads/${fileName}`;
    manifest[key] = publicUrl;

    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
