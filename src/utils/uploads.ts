"use client";

export async function getUploadedUrl(key: string): Promise<string | null> {
  try {
    const res = await fetch("/uploads/manifest.json", { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, string>;
    return data[key] || null;
  } catch {
    return null;
  }
}

export async function uploadFile(file: File, key: string): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", key);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { url?: string };
  return data.url || null;
}

export async function getCaptions(): Promise<Record<string, string>> {
  try {
    const res = await fetch("/api/captions", { cache: "no-store" });
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export async function updateCaption(key: string, caption: string): Promise<boolean> {
  try {
    const res = await fetch("/api/captions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, caption }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
