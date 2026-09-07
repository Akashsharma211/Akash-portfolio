"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  Maximize2, 
  X 
} from "lucide-react";

export interface DrawingItem {
  id: number;
  src: string;
  title: string;
}

const DRAWINGS: DrawingItem[] = [
  { id: 1, src: "/drawings/drawing-1.jpeg", title: "Hand-Drawn Sketch I" },
  { id: 2, src: "/drawings/drawing-2.jpeg", title: "Artistic Study II" },
  { id: 3, src: "/drawings/drawing-3.jpeg", title: "Ink & Pencil III" },
  { id: 4, src: "/drawings/drawing-4.jpeg", title: "Expressive Lines IV" },
  { id: 5, src: "/drawings/drawing-5.jpeg", title: "Creative Vision V" },
  { id: 6, src: "/drawings/drawing-6.jpeg", title: "Visual Narrative VI" },
];

// Configuration for Complete 360-Degree Infinite Loop Dome
const ROWS = [-24, -12, 0, 12, 24]; // 5 vertical latitude tiers
const COLS_COUNT = 24; // 24 columns covering full 360 degrees
const COL_STEP = 360 / COLS_COUNT; // Exactly 15 degrees per column (360 / 24)
const RADIUS = 820; // Cylindrical / Spherical radius in px

export default function CurvedDomeGallery() {
  // Responsive 3D Geometry configuration
  const [radius, setRadius] = useState(820);
  const [perspective, setPerspective] = useState(1100);

  // 3D Rotation State
  const [rotX, setRotX] = useState(-2);
  const [rotY, setRotY] = useState(0);
  const [isGrayscale, setIsGrayscale] = useState(true);
  const [activeDrawing, setActiveDrawing] = useState<DrawingItem | null>(null);

  // Responsive dimensions detection
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        // Small mobile
        setRadius(460);
        setPerspective(740);
      } else if (w < 768) {
        // Large mobile / small tablet
        setRadius(580);
        setPerspective(880);
      } else if (w < 1024) {
        // Tablet / small laptop
        setRadius(700);
        setPerspective(980);
      } else {
        // Desktop
        setRadius(820);
        setPerspective(1100);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inertia / Damping Animation Loop
  useEffect(() => {
    const tick = () => {
      if (!isDraggingRef.current) {
        // Apply inertia if there's velocity
        if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
          setRotY((prev) => prev + velocityRef.current.x);
          setRotX((prev) => Math.max(-24, Math.min(24, prev - velocityRef.current.y)));
          velocityRef.current.x *= 0.94;
          velocityRef.current.y *= 0.94;
        } else {
          // Continuous smooth auto-rotation loop
          setRotY((prev) => prev + 0.04);
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startRotRef.current = { x: rotX, y: rotY };
    velocityRef.current = { x: 0, y: 0 };
    lastMoveTimeRef.current = Date.now();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    if (Math.hypot(deltaX, deltaY) > 5) {
      hasDraggedRef.current = true;
    }

    const now = Date.now();
    const dt = Math.max(1, now - lastMoveTimeRef.current);

    const newRotY = startRotRef.current.y + deltaX * 0.18;
    const newRotX = Math.max(-24, Math.min(24, startRotRef.current.x - deltaY * 0.12));

    velocityRef.current = {
      x: ((newRotY - rotY) / dt) * 12,
      y: ((rotX - newRotX) / dt) * 12,
    };

    setRotY(newRotY);
    setRotX(newRotX);
    lastMoveTimeRef.current = now;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Generate 360-Degree Infinite Dome Grid
  const domeTiles = [];
  for (let r = 0; r < ROWS.length; r++) {
    const rowAngle = ROWS[r];
    for (let c = 0; c < COLS_COUNT; c++) {
      const colAngle = c * COL_STEP;
      // Stagger drawings across rows & columns so adjacent tiles never duplicate
      const drawingIndex = (r * 7 + c) % DRAWINGS.length;
      const drawing = DRAWINGS[drawingIndex];
      domeTiles.push({
        id: `${r}-${c}`,
        rowAngle,
        colAngle,
        drawing,
      });
    }
  }

  return (
    <div className="relative w-full overflow-hidden select-none bg-transparent">
      {/* 3D Viewport Stage - Height optimized for both mobile screens and desktop */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[380px] xs:h-[420px] sm:h-[520px] md:h-[600px] lg:h-[660px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: "50% 50%",
          touchAction: "pan-y",
        }}
      >
        {/* The 360-Degree Continuous Rotating Dome Object */}
        <div
          className="relative w-0 h-0 transition-transform duration-75 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius * 0.18}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {domeTiles.map((tile) => {
            return (
              <div
                key={tile.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasDraggedRef.current) {
                    setActiveDrawing(tile.drawing);
                  }
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 xs:w-32 sm:w-40 md:w-48 lg:w-50 aspect-[3/4] rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${tile.colAngle}deg) rotateX(${tile.rowAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Tile Container with Glass Border */}
                <div className="relative w-full h-full bg-zinc-900 border border-white/10 group-hover:border-amber-400/60 transition-all duration-300 overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl">
                  <Image
                    src={tile.drawing.src}
                    alt={tile.drawing.title}
                    fill
                    sizes="(max-width: 480px) 130px, (max-width: 768px) 180px, 240px"
                    unoptimized={true}
                    className={`object-cover object-center transition-all duration-500 group-hover:scale-110 ${
                      isGrayscale 
                        ? "grayscale contrast-[1.12] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100" 
                        : "contrast-[1.05]"
                    }`}
                  />

                  {/* Dark Glass Shade & Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />

                  {/* Quick Inspect Icon Button */}
                  <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 p-1 sm:p-1.5 rounded-full bg-black/70 border border-white/10 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Cinematic Fish-Eye Lens Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 65%, #000000 98%)",
          }}
        />

        {/* Top and Bottom Feathering Dissolve to Pure Black */}
        <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

      </div>

      {/* High-Resolution Zoom Lightbox Modal - Fully Optimized for Mobile & Desktop */}
      <AnimatePresence>
        {activeDrawing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDrawing(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 xs:p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-default"
            >
              {/* Modal Top Bar */}
              <div className="p-3.5 sm:p-5 flex items-center justify-between border-b border-white/10 bg-zinc-900/60 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                    {activeDrawing.title}
                  </h4>
                  <span className="hidden xs:inline text-[11px] font-mono text-zinc-400 shrink-0">
                    • Akash Sharma Art
                  </span>
                </div>
                <button
                  onClick={() => setActiveDrawing(null)}
                  className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Close image lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Drawing Image View - Responsive Height */}
              <div className="relative w-full flex-1 min-h-[280px] xs:min-h-[340px] sm:min-h-[480px] bg-black p-2 sm:p-4 flex items-center justify-center">
                <Image
                  src={activeDrawing.src}
                  alt={activeDrawing.title}
                  fill
                  priority
                  unoptimized={true}
                  className="object-contain p-1 sm:p-2"
                />
              </div>

              {/* Modal Bottom Footer */}
              <div className="p-3 sm:p-4 bg-zinc-900/60 border-t border-white/10 flex flex-col xs:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs font-mono text-zinc-400 text-center xs:text-left">
                <span>Hand-drawn original by Akash</span>
                <span className="text-amber-300/80">Tap anywhere outside to exit</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
