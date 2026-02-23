import { CustomMDX, ScrollToHash } from "@/components";
import { EditableAvatar } from "@/components/EditableAvatar";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { about, baseURL, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import {
  Avatar,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Line,
  Media,
  Meta,
  RevealFx,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

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

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <RevealFx
      translateY="8"
      speed="medium"
      fillWidth
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Row fillWidth>
        <Row maxWidth={12} m={{ hide: true }} />
        <Row fillWidth horizontal="center">
          <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
            <Schema
              as="blogPosting"
              baseURL={baseURL}
              path={`${blog.path}/${post.slug}`}
              title={post.metadata.title}
              description={post.metadata.summary}
              datePublished={post.metadata.publishedAt}
              dateModified={post.metadata.publishedAt}
              image={
                post.metadata.image ||
                `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
              }
              author={{
                name: person.name,
                url: `${baseURL}${about.path}`,
                image: `${baseURL}${person.avatar}`,
              }}
            />
            <Column maxWidth="m" gap="16" horizontal="center" align="center">
              <SmartLink href="/blog">
                <Text variant="label-strong-m">Blog</Text>
              </SmartLink>
              <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
                {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
              </Text>
              <Heading variant="display-strong-m">{post.metadata.title}</Heading>
              {post.metadata.subtitle && (
                <Text
                  variant="body-default-l"
                  onBackground="neutral-weak"
                  align="center"
                  style={{ fontStyle: "italic" }}
                >
                  {post.metadata.subtitle}
                </Text>
              )}
              <Row marginBottom="32" horizontal="center">
                <Row gap="16" vertical="center">
                  <EditableAvatar size="s" src={person.avatar} storageKey="avatar" />
                  <Text variant="label-default-m" onBackground="brand-weak">
                    {person.name}
                  </Text>
                </Row>
              </Row>
            </Column>
            <Column as="article" maxWidth="s" horizontal="start" align="start" gap="24">
              {post.metadata.image && (
                <Media
                  src={blogCoverMap[post.slug] || `/uploads/blog-cover-${post.slug}.jpg`}
                  alt={post.metadata.title}
                  aspectRatio="16/9"
                  priority
                  sizes="(min-width: 768px) 100vw, 768px"
                  radius="l"
                />
              )}
              <CustomMDX source={post.content} />
            </Column>

            <ShareSection title={post.metadata.title} url={`${baseURL}${blog.path}/${post.slug}`} />

            <Column fillWidth gap="40" horizontal="center" marginTop="40">
              <Line maxWidth="40" />
              <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
                Recent posts
              </Text>
              <Row horizontal="center" fillWidth>
                <Posts
                  exclude={[post.slug]}
                  range={[1, 1]}
                  columns="1"
                  thumbnail
                  direction="column"
                />
              </Row>
            </Column>
            <ScrollToHash />
          </Column>
        </Row>
        <Column maxWidth={12} paddingLeft="40" fitHeight m={{ hide: true }} />
      </Row>
    </RevealFx>
  );
}
