"use client";

import { Media } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { getUploadedUrl, uploadFile } from "@/utils/uploads";

interface EditableMediaProps {
  src: string;
  alt: string;
  storageKey: string;
  width?: number;
  height?: number;
  radius?: "none" | "s" | "m" | "l" | "xl" | "full";
  enlarge?: boolean;
  sizes?: string;
  aspectRatio?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const EditableMedia: React.FC<EditableMediaProps> = ({
  src,
  alt,
  storageKey,
  width,
  height,
  radius,
  enlarge,
  sizes,
  aspectRatio,
  priority,
  style,
  className,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    getUploadedUrl(storageKey).then((url) => {
      if (mounted) {
        setImageSrc(url || src);
        setIsChecking(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [storageKey, src]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file, storageKey).then((url) => {
        if (url) {
          const bust = `${url}?t=${Date.now()}`;
          setImageSrc(bust);
        }
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: width || (aspectRatio ? "100%" : "auto"),
        height: height || "auto",
        aspectRatio: aspectRatio,
        position: "relative",
        ...style,
      }}
      className={className}
    >
      {!isChecking && imageSrc && (
        <Media
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          radius={radius}
          enlarge={enlarge}
          sizes={sizes}
          aspectRatio={aspectRatio}
          priority={priority}
          style={{ cursor: "pointer" }}
          onContextMenu={handleContextMenu}
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
