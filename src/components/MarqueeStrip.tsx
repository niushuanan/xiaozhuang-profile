"use client";

import Cropper from "react-easy-crop";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MarqueeStrip.module.scss";
import { getUploadedUrl, uploadFile } from "@/utils/uploads";
import { Button, Text } from "@once-ui-system/core";

interface MarqueeStripProps {
  images: string[];
}

type Area = { width: number; height: number; x: number; y: number };

async function getCroppedBlob(imageSrc: string, crop: Area): Promise<Blob> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  return await new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob), "image/jpeg", 0.92);
  });
}

export function MarqueeStrip({ images }: MarqueeStripProps) {
  const [srcs, setSrcs] = useState<string[]>(images);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState(0);

  const [cropOpen, setCropOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const keys = images.map((_, i) => `hero-${i}`);
    Promise.all(keys.map((key) => getUploadedUrl(key))).then((urls) => {
      if (!mounted) return;
      setSrcs((prev) => prev.map((src, i) => urls[i] || src));
    });
    return () => {
      mounted = false;
    };
  }, [images]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const max = marquee.scrollWidth - marquee.clientWidth;
    if (max <= 0) return;
    const pct = (marquee.scrollLeft / max) * 100;
    setSliderValue(pct);
  }, [srcs]);

  const handleContextMenu = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex(index);
    inputRef.current?.click();
  };

  const handleClick = (index: number) => () => {
    setActiveIndex(index);
    setPendingImage(srcs[index]);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeIndex === null) return;
    const objectUrl = URL.createObjectURL(file);
    setPendingImage(objectUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropOpen(true);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const saveCrop = async () => {
    if (!pendingImage || !croppedAreaPixels || activeIndex === null) return;
    const blob = await getCroppedBlob(pendingImage, croppedAreaPixels);
    const file = new File([blob], `hero-${activeIndex}.jpg`, { type: "image/jpeg" });
    const key = `hero-${activeIndex}`;
    const url = await uploadFile(file, key);
    if (url) {
      const bust = `${url}?t=${Date.now()}`;
      setSrcs((prev) => prev.map((src, i) => (i === activeIndex ? bust : src)));
    }
    setCropOpen(false);
    setPendingImage(null);
  };

  const looped = useMemo(() => [...srcs, ...srcs], [srcs]);

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSliderValue(value);
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const max = marquee.scrollWidth - marquee.clientWidth;
    marquee.scrollLeft = (value / 100) * max;
  };

  const onScroll = () => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const max = marquee.scrollWidth - marquee.clientWidth;
    if (max <= 0) return;
    const pct = (marquee.scrollLeft / max) * 100;
    setSliderValue(pct);
  };

  return (
    <>
      <div
        className={`${styles.marquee} ${isPaused ? styles.paused : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Featured images"
        ref={marqueeRef}
        onScroll={onScroll}
      >
        <div className={styles.track}>
          {looped.map((src, i) => (
            <img
              // eslint-disable-next-line react/no-array-index-key
              key={`${src}-${i}`}
              className={styles.item}
              src={src}
              alt="featured"
              onContextMenu={handleContextMenu(i % srcs.length)}
              onClick={handleClick(i % srcs.length)}
            />
          ))}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        className={styles.slider}
        type="range"
        min={0}
        max={100}
        value={sliderValue}
        onChange={onSliderChange}
        aria-label="Scroll images"
      />

      {cropOpen && pendingImage && (
        <div className={styles.cropOverlay}>
          <div className={styles.cropPanel}>
            <div className={styles.cropArea}>
              <Cropper
                image={pendingImage}
                crop={crop}
                zoom={zoom}
                aspect={3 / 2}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
            <div className={styles.cropControls}>
              <div className={styles.controlGroup}>
                <Text variant="label-default-m" onBackground="neutral-weak">
                  缩放
                </Text>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                />
              </div>
              <div className={styles.controlGroup}>
                <Button variant="secondary" size="s" onClick={() => setCropOpen(false)}>
                  取消
                </Button>
                <Button variant="primary" size="s" onClick={saveCrop}>
                  保存裁切
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
