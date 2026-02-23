"use client";

import { getCaptions, getUploadedUrl } from "@/utils/uploads";
import { Text } from "@once-ui-system/core";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MarqueeStrip.module.scss";

interface MarqueeStripProps {
  images: string[];
}

const isDev = process.env.NODE_ENV === "development";

export function MarqueeStrip({ images }: MarqueeStripProps) {
  const [srcs, setSrcs] = useState<string[]>([]);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const keys = images.map((_, i) => `hero-${i}`);
    Promise.all([Promise.all(keys.map((key) => getUploadedUrl(key))), getCaptions()]).then(
      ([urls, caps]) => {
        if (!mounted) return;
        setSrcs(images.map((src, i) => urls[i] || src));
        setCaptions(caps);
        setIsChecking(false);
      },
    );
    return () => {
      mounted = false;
    };
  }, [images]);

  const handleClick = (index: number) => () => {
    if (!isDev) return;
  };

  const looped = useMemo(() => {
    if (srcs.length === 0) return [];
    return [...srcs, ...srcs, ...srcs, ...srcs, ...srcs, ...srcs];
  }, [srcs]);

  return (
    <>
      <div
        className={styles.marquee}
        aria-label="Featured images"
        style={{ opacity: isChecking ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <div className={styles.track}>
          {looped.map((src, i) => {
            const index = i % srcs.length;
            const caption = captions[`hero-${index}`];
            return (
              <div
                key={`marquee-item-${index}-${i}`}
                className={styles.itemWrapper}
                onClick={handleClick(index)}
                onKeyDown={(e) => {
                  if (isDev && (e.key === "Enter" || e.key === " ")) {
                    handleClick(index)();
                  }
                }}
                tabIndex={isDev ? 0 : -1}
                role={isDev ? "button" : "img"}
              >
                <img className={styles.item} src={src} alt="featured" />
                {caption && (
                  <div className={styles.captionOverlay}>
                    <Text variant="body-default-s">{caption}</Text>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
