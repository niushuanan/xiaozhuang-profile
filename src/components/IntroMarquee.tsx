"use client";

import { getCaptions, getUploadedUrl, updateCaption, uploadFile } from "@/utils/uploads";
import { Button, Text } from "@once-ui-system/core";
import { useEffect, useMemo, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import styles from "./IntroMarquee.module.scss";

const INTRO_ITEMS = [
  "· 多段消费电子软硬件产品实习经历、一段闭环的创业经历：覆盖多款前沿AI硬件产品，大学期间自主创业创收10万+，体现用户思维与市场分析能力。",
  "· 科技产品爱好者：喜欢购买、测评、体验各类消费电子产品、AI产品，多次参加OPPO、vivo、地平线智驾等公司的AI产品用户深度访谈活动（每次三小时起）。",
  '· 自媒体博主：运营个人小红书账号"向天再借五百亿"，追踪最新的AI产品趋势，主打AI产品&消费电子产品&新能源汽车测评等。收获粉丝500+，点赞13000+。',
  "· AI产品重度使用者，能高效运用国内外各类前沿AI产品提高工作效率，如Opencode、Gemini in chrome等。",
];

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

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

  return await new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob), "image/jpeg", 0.92);
  });
}

export function IntroMarquee() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [srcs, setSrcs] = useState<string[]>(Array(INTRO_ITEMS.length).fill("/images/gallery/horizontal-1.jpg")); // Placeholders

  const [cropOpen, setCropOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const keys = INTRO_ITEMS.map((_, i) => `intro-card-${i}`);
    Promise.all([Promise.all(keys.map((key) => getUploadedUrl(key))), getCaptions()]).then(
      ([urls, caps]) => {
        if (!mounted) return;
        setSrcs((prev) => INTRO_ITEMS.map((_, i) => urls[i] || prev[i]));
        setCaptions(caps);
        setIsChecking(false);
      },
    );
    return () => {
      mounted = false;
    };
  }, []);

  const handleContextMenu = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex(index);
    inputRef.current?.click();
  };

  const handleClick = (index: number) => async () => {
    const key = `intro-card-${index}`;
    const currentCaption = captions[key] || INTRO_ITEMS[index];
    const newCaption = window.prompt("请输入说明内容：", currentCaption);

    if (newCaption !== null) {
      setCaptions((prev) => ({ ...prev, [key]: newCaption.trim() }));
      await updateCaption(key, newCaption.trim());
    }
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
    const file = new File([blob], `intro-card-${activeIndex}.jpg`, { type: "image/jpeg" });
    const key = `intro-card-${activeIndex}`;
    const url = await uploadFile(file, key);
    if (url) {
      const bust = `${url}?t=${Date.now()}`;
      setSrcs((prev) => prev.map((src, i) => (i === activeIndex ? bust : src)));
    }
    setCropOpen(false);
    setPendingImage(null);
  };

  return (
    <>
      <div
        className={styles.grid}
        aria-label="Intro highlights"
        style={{ opacity: isChecking ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        {srcs.map((src, index) => {
          const caption = captions[`intro-card-${index}`] || INTRO_ITEMS[index];
          return (
            <div
              key={`intro-card-${src}-${index}`}
              className={styles.itemWrapper}
              onContextMenu={handleContextMenu(index)}
              onClick={handleClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(index)();
                }
              }}
              tabIndex={0}
              role="button"
            >
              <img className={styles.item} src={src} alt="intro" />
              <div className={styles.overlay}>
                <Text variant="body-default-l" className={styles.text}>
                  {caption}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {cropOpen && pendingImage && (
        <div className={styles.cropOverlay}>
          <div className={styles.cropPanel}>
            <div className={styles.cropArea}>
              <Cropper
                image={pendingImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 6.5}
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
