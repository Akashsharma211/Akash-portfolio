"use client";

import React, { useState, useEffect } from "react";

type Span = { cols?: 1 | 2 | 3; rows?: 1 | 2 | 3 | 4 };

export default function ClockWidget({ span }: { span?: Span }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-white/[0.01] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.35)] h-full w-full p-3 flex flex-col justify-between">
        <div className="text-[11px] font-mono text-zinc-400">Clock</div>
        <div className="text-xl font-bold font-mono text-zinc-500">--:--:--</div>
      </div>
    );
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // 12-hour format
  const displayHours = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const pad = (n: number) => String(n).padStart(2, "0");

  // Angles for analog clock
  const secAngle = (seconds + milliseconds / 1000) * 6; // 360 / 60
  const minAngle = (minutes + seconds / 60) * 6;
  const hourAngle = ((hours % 12) + minutes / 60) * 30; // 360 / 12

  const dateStr = time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/[0.14] via-white/[0.05] to-black/40 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(255,255,255,0.05)] h-full w-full p-3 flex flex-col justify-between select-none transition-all duration-300 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
      {/* Specular Liquid Highlights */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-28 h-28 rounded-full bg-gradient-to-br from-white/25 via-white/5 to-transparent blur-lg" />
      <div className="pointer-events-none absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-red-500/10 blur-xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono leading-none">
        <span className="text-zinc-300 font-semibold tracking-wide drop-shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          Clock
        </span>
      </div>

      {/* Main Clock Display: Liquid Dial + Digital Time */}
      <div className="relative z-10 flex items-center justify-between gap-3 my-auto">
        {/* Analog Frosted Glass Dial */}
        <div className="relative w-14 h-14 shrink-0 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.7),0_3px_10px_rgba(0,0,0,0.4)]">
          {/* Dial reflection */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.15] to-transparent opacity-60" />

          {/* Hour markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <div
              key={deg}
              className={`absolute w-0.5 rounded-full ${
                deg % 90 === 0 ? "h-1.5 bg-white/80 shadow-[0_0_2px_rgba(255,255,255,0.6)]" : "h-0.5 bg-white/30"
              }`}
              style={{
                transform: `rotate(${deg}deg) translateY(-22px)`,
              }}
            />
          ))}

          {/* Center Pivot */}
          <div className="absolute w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)] z-30" />

          {/* Hour Hand */}
          <div
            className="absolute w-1 h-3.5 rounded-full bg-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.5)] z-10 origin-bottom"
            style={{
              transform: `translateY(-50%) rotate(${hourAngle}deg)`,
              transformOrigin: "bottom center",
            }}
          />

          {/* Minute Hand */}
          <div
            className="absolute w-0.5 h-5 rounded-full bg-zinc-300 shadow-[0_1px_3px_rgba(0,0,0,0.5)] z-20 origin-bottom"
            style={{
              transform: `translateY(-50%) rotate(${minAngle}deg)`,
              transformOrigin: "bottom center",
            }}
          />

          {/* Second Hand */}
          <div
            className="absolute w-0.5 h-5.5 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.8)] z-25 origin-bottom"
            style={{
              transform: `translateY(-50%) rotate(${secAngle}deg)`,
              transformOrigin: "bottom center",
            }}
          />
        </div>

        {/* Digital Time & Date Info */}
        <div className="flex flex-col justify-center flex-1 min-w-0 pr-0.5">
          <div className="flex items-baseline font-mono tracking-tight drop-shadow-md">
            <span className="text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
              {pad(displayHours)}:{pad(minutes)}
            </span>
            <span className="text-sm font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] ml-0.5">
              :{pad(seconds)}
            </span>
            <span className="text-[10px] font-bold text-zinc-400 ml-1">
              {ampm}
            </span>
          </div>

          <div className="mt-1 flex items-center">
            <span className="px-2 py-0.5 rounded bg-white/[0.08] border border-white/10 text-[10px] font-mono text-zinc-300 tracking-wide backdrop-blur-sm shadow-sm">
              {dateStr}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
