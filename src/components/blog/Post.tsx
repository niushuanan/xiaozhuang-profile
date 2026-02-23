"use client";

import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getUploadedUrl, uploadFile } from "@/utils/uploads";
import { Media } from "@once-ui-system/core";
import { Avatar, Card, Column, Row, Text } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(true);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([getUploadedUrl("avatar"), getUploadedUrl(`blog-cover-${post.slug}`)]).then(
      ([avatarUrl, imageUrl]) => {
        if (mounted) {
          setAvatarSrc(avatarUrl || person.avatar);
          setImageSrc(imageUrl || post.metadata.image);
          setIsChecking(false);
        }
      },
    );
    return () => {
      mounted = false;
    };
  }, [post.slug]);

  const handleAvatarContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    avatarInputRef.current?.click();
  };

  const handleImageContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    imageInputRef.current?.click();
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        cursor: "pointer",
      }}
    >
      <Row fillWidth gap="24" s={{ direction: "column", gap: "16" }} vertical="start">
        {thumbnail && (
          <div
            onContextMenu={handleImageContextMenu}
            style={{
              cursor: "pointer",
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
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageFileChange}
            />
          </div>
        )}
        <Column fillWidth paddingTop="0" paddingBottom="24" paddingX="l" gap="16" vertical="start">
          <Row gap="16" vertical="center">
            <Row
              vertical="center"
              gap="16"
              onContextMenu={handleAvatarContextMenu}
              style={{ cursor: "pointer" }}
            >
              <div style={{ width: "var(--s-spacing-32)", height: "var(--s-spacing-32)" }}>
                {avatarSrc && !isChecking && <Avatar src={avatarSrc} size="s" />}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarFileChange}
              />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" style={{ whiteSpace: "nowrap" }}>
            {post.metadata.title}
          </Text>
        </Column>
      </Row>
    </Card>
  );
}
