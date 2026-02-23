import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const captionsPath = path.join(process.cwd(), "public", "uploads", "captions.json");

export async function GET() {
  try {
    const data = await fs.readFile(captionsPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return NextResponse.json({});
    }
    return NextResponse.json({ error: "Failed to read captions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { key, caption } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    let captions: Record<string, string> = {};
    try {
      const data = await fs.readFile(captionsPath, "utf-8");
      captions = JSON.parse(data);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    if (caption) {
      captions[key] = caption;
    } else {
      delete captions[key];
    }

    await fs.mkdir(path.dirname(captionsPath), { recursive: true });
    await fs.writeFile(captionsPath, JSON.stringify(captions, null, 2), "utf-8");

    return NextResponse.json({ success: true, key, caption });
  } catch (error) {
    console.error("Error saving caption:", error);
    return NextResponse.json({ error: "Failed to save caption" }, { status: 500 });
  }
}
