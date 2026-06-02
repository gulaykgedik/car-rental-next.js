"use client";

import { useState } from "react";
import Image from "next/image";
import { buildCarImageUrl, CAR_GALLERY_ANGLES } from "@/utils/imagin.utils";

type GalleryProps = {
  make: string;
  modelName: string;
  year: number;
};

export default function Gallery({ make, modelName, year }: GalleryProps) {
  const [activeAngle, setActiveAngle] = useState<string>(CAR_GALLERY_ANGLES[0]);

  const altBase = `${make} ${modelName}`;

  return (
    <div className="flex flex-col gap-6">
      <div
        className="relative h-72 lg:h-100 rounded-card overflow-hidden flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #54a6ff 0%, #3563e9 60%, #1c55d6 100%)",
        }}
      >
        <Image
          key={activeAngle}
          src={buildCarImageUrl({ make, modelName, year, angle: activeAngle })}
          alt={altBase}
          width={640}
          height={320}
          className="object-contain max-h-full max-w-full px-6"
          style={{ width: "auto", height: "auto" }}
          unoptimized
          priority
        />
      </div>

      <div className="grid grid-cols-4 gap-4 lg:gap-6">
        {CAR_GALLERY_ANGLES.map((angle) => {
          const isActive = angle === activeAngle;
          return (
            <button
              key={angle}
              type="button"
              onClick={() => setActiveAngle(angle)}
              aria-label={`${altBase} görünüm ${angle}`}
              aria-pressed={isActive}
              className={`bg-card rounded-card h-22 lg:h-28 flex items-center justify-center p-3 border-2 transition-colors ${
                isActive ? "border-primary" : "border-transparent hover:border-border"
              }`}
            >
              <Image
                src={buildCarImageUrl({ make, modelName, year, angle })}
                alt=""
                width={160}
                height={88}
                className="object-contain max-h-full max-w-full"
                style={{ width: "auto", height: "auto" }}
                unoptimized
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}