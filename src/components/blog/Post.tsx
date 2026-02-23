"use client";

import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getUploadedUrl, uploadFile } from "@/utils/uploads";
import { Media } from "@once-ui-system/core";
import { Avatar, Card, Column, Row, Text } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useRef, useState } from "react";

// 博客封面路径映射（根据实际文件后缀）
const blogCoverMap: Record<string, string> = {
  "tencent-crash-qq-wechat": "/uploads/blog-cover-tencent-crash-qq-wechat.webp",
  "involution-short": "/uploads/blog-cover-involution-short.png",
  "weilai-nio-power-baas": "/uploads/blog-cover-weilai-nio-power-baas.png",
  "ai-2026-predictions": "/uploads/blog-cover-ai-2026-predictions.png",
  "why-car-iot-ai-glasses": "/uploads/blog-cover-why-car-iot-ai-glasses.jpeg",
  "meta-gen2-ai-glasses": "/uploads/blog-cover-meta-gen2-ai-glasses.avif",
  "xiaomi-car": "/uploads/blog-cover-xiaomi-car.jpg",
  "cycle-charm": "/uploads/blog-cover-cycle-charm.jpg",
  "art-of-tradeoff": "/uploads/blog-cover-art-of-tradeoff.jpg",
};

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

const isDev = process.env.NODE_ENV === "development";

export default function Post({ post, thumbnail, direction }: PostProps) {
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(true);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    const coverPath = blogCoverMap[post.slug] || `/uploads/blog-cover-${post.slug}.jpg`;
    Promise.all([getUploadedUrl("avatar"), getUploadedUrl(`blog-cover-${post.slug}`)]).then(
      ([avatarUrl, imageUrl]) => {
        if (mounted) {
          setAvatarSrc(avatarUrl || person.avatar);
          setImageSrc(imageUrl || coverPath);
          setIsChecking(false);
        }
      },
    );
    return () => {
      mounted = false;
    };
  }, [post.slug]);

  const handleAvatarContextMenu = (e: React.MouseEvent) => {
    if (!isDev) return;
    e.preventDefault();
    avatarInputRef.current?.click();
  };

  const handleImageContextMenu = (e: React.MouseEvent) => {
    if (!isDev) return;
    e.preventDefault();
    imageInputRef.current?.click();
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDev) return;
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file, "avatar").then((url) => {
        if (url) {
          setAvatarSrc(url);
          window.location.reload();
        }
      });
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDev) return;
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file, `blog-cover-${post.slug}`).then((url) => {
        if (url) {
          setImageSrc(url);
          window.location.reload();
        }
      });
    }
  };

  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
      style={{
        cursor: isDev ? "pointer" : "default",
      }}
    >
      <Row fillWidth gap="24" s={{ direction: "column", gap: "16" }} vertical="start">
        {thumbnail && (
          <div
            onContextMenu={handleImageContextMenu}
            style={{
              cursor: isDev ? "pointer" : "default",
              position: "relative",
              flex: "0 0 42%",
              aspectRatio: "16 / 9",
            }}
          >
            {imageSrc && !isChecking && (
              <Media
                priority
                sizes="(max-width: 768px) 100vw, 640px"
                radius="l"
                src={imageSrc}
                alt={`Thumbnail of ${post.metadata.title}`}
                aspectRatio="16 / 9"
              />
            )}
            {isDev && (
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageFileChange}
              />
            )}
          </div>
        )}
        <Column fillWidth paddingTop="0" paddingBottom="24" paddingX="l" gap="16" vertical="start">
          <Row gap="16" vertical="center">
            <Row
              vertical="center"
              gap="16"
              onContextMenu={handleAvatarContextMenu}
              style={{ cursor: isDev ? "pointer" : "default" }}
            >
              <div style={{ width: "var(--s-spacing-32)", height: "var(--s-spacing-32)" }}>
                {avatarSrc && !isChecking && <Avatar src={avatarSrc} size="s" />}
              </div>
              {isDev && (
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarFileChange}
                />
              )}
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Row gap="16" vertical="center">
            <Text variant="heading-strong-l" style={{ whiteSpace: "nowrap" }}>
              {post.metadata.title}
            </Text>
          </Row>
          {post.metadata.summary && (
            <Text variant="body-default-m" onBackground="neutral-weak">
              {post.metadata.summary}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
