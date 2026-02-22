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
