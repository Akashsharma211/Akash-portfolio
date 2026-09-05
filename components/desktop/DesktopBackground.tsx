"use client";

import React from "react";
import Image from "next/image";

type DesktopBackgroundProps = {
  backgroundImage?: string;
  backgroundColor?: string;
  overlay?: boolean;
};

export default function DesktopBackground({ 
  backgroundImage = "/bg.jpg", 
  backgroundColor,
  overlay = true 
}: DesktopBackgroundProps) {
  return (
    <>
      {/* Desktop Background */}
      {backgroundColor ? (
        <div className="absolute inset-0" style={{ backgroundColor }} />
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Mobile Phone View (< 768px): Anchored directly to the bottom edge */}
          <div className="block md:hidden absolute inset-0 w-full h-full">
            <Image
              src={backgroundImage}
              alt="Desktop Background"
              fill
              priority
              className="object-contain object-bottom"
              style={{ 
                objectPosition: 'center bottom',
                transformOrigin: 'bottom center',
              }}
              quality={95}
            />
          </div>

          {/* Desktop View (>= 768px): Original right-bottom alignment */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image
              src={backgroundImage}
              alt="Desktop Background"
              fill
              priority
              className="object-contain object-right-bottom"
              style={{ 
                objectPosition: 'right bottom',
                transform: 'scale(0.88)',
                transformOrigin: 'bottom right',
              }}
              quality={90}
            />
          </div>
        </div>
      )}
      
      {/* Background Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
    </>
  );
}
