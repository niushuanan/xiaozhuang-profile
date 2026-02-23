"use client";

import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { Media } from "@once-ui-system/core";
import { Avatar, Card, Column, Row, Text } from "@once-ui-system/core";
import type React from "react";

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
  const imageSrc = `/uploads/blog-cover-${post.slug}.jpg`;

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
