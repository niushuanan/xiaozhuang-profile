"use client";

import { Avatar } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { getUploadedUrl, uploadFile } from "@/utils/uploads";

interface EditableAvatarProps {
  src: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  storageKey?: string;
}

export const EditableAvatar: React.FC<EditableAvatarProps> = ({
  src,
  size = "xl",
  storageKey = "avatar",
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    getUploadedUrl(storageKey).then((url) => {
      if (mounted && url) setImageSrc(url);
    });
    return () => {
      mounted = false;
    };
  }, [storageKey]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file, storageKey).then((url) => {
        if (url) setImageSrc(url);
      });
    }
  };

  return (
    <>
      <Avatar
        src={imageSrc}
        size={size}
        onContextMenu={handleContextMenu}
        style={{ cursor: "pointer" }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};
