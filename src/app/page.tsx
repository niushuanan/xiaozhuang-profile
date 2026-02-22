import { EditableAvatar } from "@/components/EditableAvatar";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { about, baseURL, home, person, routes } from "@/resources";
import {
  Button,
  Column,
  Icon,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="start">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Row fillWidth gap="40" vertical="center" s={{ direction: "column", gap: "24" }}>
        <EditableAvatar src={person.avatar} size="xl" storageKey="avatar" />
        <Column fillWidth gap="16">
          <Text variant="display-strong-s">庄泓铠｜啥都懂一些的产品经理</Text>
          <Text variant="body-default-m">日常折腾 AI / 消费电子 / 自动驾驶</Text>
          <Text variant="body-default-m">长期关注互联网与科技的商业模式与投资动态。</Text>
          <Text variant="body-default-m">
            不断追问：什么是真正的“好生意”，什么是好产品。
          </Text>
          <Row gap="16" wrap marginTop="s">
            <Row gap="8" vertical="center">
              <Icon name="phone" onBackground="neutral-weak" />
              <SmartLink href="tel:+8618675459644">
                <Text variant="label-default-m">+86 18675459644</Text>
              </SmartLink>
            </Row>
            <Row gap="8" vertical="center">
              <Icon name="email" onBackground="neutral-weak" />
              <SmartLink href="mailto:1379804870zhk@gmail.com">
                <Text variant="label-default-m">1379804870zhk@gmail.com</Text>
              </SmartLink>
            </Row>
          </Row>
          <Row gap="12" marginTop="s" wrap>
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="primary"
              size="m"
              weight="default"
              arrowIcon
            >
              了解更多
            </Button>
            {routes["/blog"] && (
              <Button
                data-border="rounded"
                href="/blog"
                variant="secondary"
                size="m"
                weight="default"
              >
                查看博客
              </Button>
            )}
          </Row>
        </Column>
      </Row>

      {routes["/blog"] && (
        <Column fillWidth gap="24" marginTop="xl">
          <MarqueeStrip
            images={[
              "/images/gallery/horizontal-1.jpg",
              "/images/gallery/vertical-1.jpg",
              "/images/gallery/horizontal-2.jpg",
              "/images/gallery/vertical-2.jpg",
              "/images/gallery/horizontal-3.jpg",
              "/images/gallery/vertical-3.jpg",
              "/images/gallery/horizontal-4.jpg",
              "/images/gallery/vertical-4.jpg",
            ]}
          />
          <Text variant="heading-strong-l">全部文章</Text>
          <Posts columns="1" thumbnail direction="row" />
        </Column>
      )}
    </Column>
  );
}
