"use client";

import { EditableMedia } from "@/components/EditableMedia";
import { gallery } from "@/resources";
import { MasonryGrid } from "@once-ui-system/core";

export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <EditableMedia
          enlarge
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={index}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
          storageKey={`gallery-${index}`}
        />
      ))}
    </MasonryGrid>
  );
}
