import { EditableAvatar } from "@/components/EditableAvatar";
import { EditableMedia } from "@/components/EditableMedia";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { about, baseURL, person, social } from "@/resources";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Meta,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.entrepreneurship.title,
      display: about.entrepreneurship.display,
      items: about.entrepreneurship.experiences.map((experience) => experience.company),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth={200}
            maxWidth={200}
            paddingX="s"
            paddingBottom="xl"
            gap="l"
            flex={2}
            horizontal="center"
          >
            <EditableAvatar src={person.avatar} size="xl" storageKey="avatar" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
            {about.tableOfContent.display && (
              <Column gap="24" s={{ hide: true }} style={{ width: "100%" }}>
                <TableOfContents structure={structure} about={about} inline />
              </Column>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={10} maxWidth={56}>
          <Column id={about.intro.title} fillWidth vertical="center" marginBottom="32">
            <Heading className={styles.textAlign} variant="display-strong-xl" marginBottom="s">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="heading-default-s"
              onBackground="neutral-weak"
              marginTop="s"
              marginBottom="xl"
            >
              哈尔滨工业大学（深圳） · 经济学 · 2022-2026
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <EditableMedia
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                              storageKey={`work-${experience.company}-${index}`}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.entrepreneurship.display && (
            <>
              <Heading
                as="h2"
                id={about.entrepreneurship.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.entrepreneurship.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.entrepreneurship.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.timeframe}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: React.ReactNode, idx: number) => (
                        <Text as="li" variant="body-default-m" key={`${experience.company}-${idx}`}>
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
