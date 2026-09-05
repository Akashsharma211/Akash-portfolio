"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSongs } from "@/lib/useSanityData";

type Span = { cols?: 1 | 2 | 3; rows?: 1 | 2 | 3 | 4 };

export default function NowListeningWidget({ span }: { span?: Span }) {
  const songs = useSongs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const totalDuration = 180; // 3:00

  // Audio Context & Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rhythmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const beatIndexRef = useRef(0);

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * songs.length));
  }, [songs.length]);

  // Melodic chord banks for each song (Lo-Fi chord progressions)
  const songChords = [
    { name: "My Eyes", bass: 130.81, notes: [261.63, 329.63, 392.0, 493.88] }, // Cmaj7
    { name: "No Pole", bass: 110.0, notes: [220.0, 261.63, 329.63, 392.0] },    // Am7
    { name: "Dracula", bass: 146.83, notes: [293.66, 349.23, 440.0, 523.25] },  // Dm7
    { name: "Humble", bass: 98.0, notes: [196.0, 246.94, 293.66, 349.23] },     // G7
    { name: "Softcore", bass: 82.41, notes: [164.81, 196.0, 246.94, 329.63] },  // Em7
    { name: "Runaway", bass: 87.31, notes: [174.61, 220.0, 261.63, 329.63] },   // Fmaj7
    { name: "Sao Paulo", bass: 123.47, notes: [246.94, 311.13, 369.99, 440.0] },// Bm7
  ];

  // Play a warm acoustic Lo-Fi chord beat
  const playLoFiBeat = (songIdx: number) => {
    if (!audioCtxRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const chordObj = songChords[songIdx % songChords.length];
    const now = ctx.currentTime;

    // 1. Play Soft Sub Bass
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = "sine";
    bassOsc.frequency.setValueAtTime(chordObj.bass, now);
    bassGain.gain.setValueAtTime(0.28, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    bassOsc.connect(bassGain);
    bassGain.connect(ctx.destination);
    bassOsc.start(now);
    bassOsc.stop(now + 1.2);

    // 2. Play Lo-Fi Ambient Electric Chords
    chordObj.notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? "triangle" : "sine";
      // Gentle arpeggiation delay (15ms per string)
      const noteTime = now + idx * 0.025;
      osc.frequency.setValueAtTime(freq, noteTime);

      // Warm lowpass filter
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 1.5);
    });
  };

  // Start continuous Lo-Fi beat loop
  const startMusic = (songIdx: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      // Stop any existing loop
      if (rhythmTimerRef.current) clearInterval(rhythmTimerRef.current);

      // Play immediate first beat
      playLoFiBeat(songIdx);

      // Schedule steady 1.4s lo-fi loop
      rhythmTimerRef.current = setInterval(() => {
        beatIndexRef.current++;
        playLoFiBeat(songIdx);
      }, 1400);
    } catch (e) {
      console.warn("[WebAudio] Playback error:", e);
    }
  };

  const stopMusic = () => {
    if (rhythmTimerRef.current) {
      clearInterval(rhythmTimerRef.current);
      rhythmTimerRef.current = null;
    }
  };

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      startMusic(currentIndex);
      setIsPlaying(true);
    }
  };

  // Handle Skip Next
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIdx);
    setProgress(0);
    if (isPlaying) {
      startMusic(nextIdx);
    }
  };

  // Handle Skip Previous
  const handlePrev = () => {
    const prevIdx = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIdx);
    setProgress(0);
    if (isPlaying) {
      startMusic(prevIdx);
    }
  };

  // Progress ticker
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= totalDuration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying]);

  // Clean up
  useEffect(() => {
    return () => {
      stopMusic();
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setProgress(Math.round(pct * totalDuration));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const currentSong = songs[currentIndex] || { title: "Sao Paulo", artist: "The Weeknd" };

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
          Music
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[10px] text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-sm text-[10px] text-zinc-300 shadow-sm">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] ${
                isPlaying ? "animate-ping" : ""
              }`}
            />
            {isPlaying ? "Live" : "Paused"}
          </span>
        </div>
      </div>

      {/* Main Body: Vinyl Disc on Left + Song Info & Controls on Right */}
      <div className="relative z-10 flex items-center gap-3 my-auto">
        {/* Animated Vinyl Disc with Play/Pause Button */}
        <div
          onClick={handleTogglePlay}
          className="relative w-14 h-14 shrink-0 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.5)] group active:scale-95 transition-transform"
          title={isPlaying ? "Pause" : "Play Lo-Fi Beats"}
        >
          {/* Vinyl Grooves */}
          <div
            className={`absolute inset-1 rounded-full border border-white/10 ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "3s" }}
          >
            <div className="absolute inset-1 rounded-full border border-white/5" />
          </div>

          {/* Center Play/Pause Ruby Button */}
          <div className="relative z-20 w-7 h-7 rounded-full bg-red-500 group-hover:bg-red-400 text-white flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.8)] transition-all">
            {isPlaying ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5zM11 4a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            )}
          </div>
        </div>

        {/* Track Details & Navigation */}
        <div className="flex flex-col justify-center flex-1 min-w-0 pr-0.5">
          {/* Title & Artist */}
          <div className="flex items-baseline justify-between gap-1 w-full truncate">
            <span className="font-mono text-xs font-bold text-white truncate drop-shadow-sm">
              {currentSong.title}
            </span>
            <span className="font-mono text-[9px] text-zinc-400 shrink-0">
              {formatTime(progress)}
            </span>
          </div>

          <div className="font-mono text-[10px] text-zinc-400 truncate mb-1">
            {currentSong.artist}
          </div>

          {/* Scannable Progress Bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden relative mb-1.5 border border-white/5"
            title="Click to seek"
          >
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)] transition-all duration-300"
              style={{ width: `${(progress / totalDuration) * 100}%` }}
            />
          </div>

          {/* Equalizer Bars & Prev / Next Controls */}
          <div className="flex items-center justify-between">
            {/* Live Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-3">
              {[0.4, 0.9, 0.6, 1.0, 0.7].map((mult, idx) => (
                <div
                  key={idx}
                  className={`w-0.5 rounded-full transition-all duration-200 ${
                    isPlaying ? "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.7)]" : "bg-white/30"
                  }`}
                  style={{
                    height: isPlaying
                      ? `${Math.max(3, Math.sin(progress * 3 + idx) * 5 + 7 * mult)}px`
                      : "3px",
                  }}
                />
              ))}
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-5 h-5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
                title="Previous Track"
                aria-label="Previous Track"
              >
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="w-5 h-5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all active:scale-95"
                title="Next Track"
                aria-label="Next Track"
              >
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
