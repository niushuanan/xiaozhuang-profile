"use client";

import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { Media } from "@once-ui-system/core";
import { Avatar, Card, Column, Row, Text } from "@once-ui-system/core";
import type React from "react";

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
  post: {
    slug: string;
    metadata: {
      title: string;
      summary?: string;
      publishedAt?: string;
    };
  };
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  const imageSrc = blogCoverMap[post.slug] || `/uploads/blog-cover-${post.slug}.jpg`;

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
    >
      {thumbnail && (
        <Media
          src={imageSrc}
          alt={post.metadata.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          aspectRatio="16/9"
          radius="m"
          objectFit="cover"
        />
      )}
      <Column gap="4">
        <Text variant="heading-strong-m">{post.metadata.title}</Text>
        {post.metadata.summary && (
          <Text variant="body-default-m" onBackground="neutral-weak">
            {post.metadata.summary}
          </Text>
        )}
        <Row gap="8" vertical="center">
          <Avatar src={person.avatar} size="xs" />
          <Text variant="label-default-s" onBackground="neutral-weak">
            {person.name}
          </Text>
          <Text variant="label-default-s" onBackground="neutral-weak">
            ·
          </Text>
          <Text variant="label-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Row>
      </Column>
    </Card>
  );
}
