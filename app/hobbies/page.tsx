"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Disc, 
  Music,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { 
  FaSpotify, 
  FaYoutube, 
  FaAmazon, 
  FaInstagram, 
  FaXTwitter 
} from "react-icons/fa6";
import { motion } from "motion/react";
import { Alex_Brush } from "next/font/google";
import CurvedDomeGallery from "@/components/hobbies/CurvedDomeGallery";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
});

export default function HobbiesPage() {

  return (
    <main className="relative min-h-screen w-full bg-black text-zinc-100 selection:bg-rose-500/30 selection:text-white overflow-x-hidden font-sans">
      {/* Floating Top Return Link */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40"
      >
        <Link
          href="/desktop"
          className="group inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-white/30 text-xs font-medium text-zinc-300 hover:text-white backdrop-blur-xl transition-all duration-300 shadow-2xl hover:scale-105"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="tracking-wide">Desktop OS</span>
        </Link>
      </motion.div>

      {/* ============================================================ */}
      {/* SECTION 1: HERO (Akash with Guitar & Calligraphy Title) */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[100dvh] h-[100dvh] flex items-center justify-center overflow-hidden bg-black select-none">
        {/* Cinematic Ambient Atmosphere Behind Typography */}
        <div className="absolute top-[10%] sm:top-[20%] left-[4%] sm:left-[8%] w-72 sm:w-96 h-72 sm:h-96 bg-rose-600/25 sm:bg-rose-600/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none z-10" />

        {/* Full Image - Anchored on mobile with zoom, shifted right on desktop */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-full h-full flex items-end sm:items-center justify-center translate-x-0 sm:translate-x-16 md:translate-x-20 lg:translate-x-28 pb-4 sm:pb-0"
        >
          <Image
            src="/DSC00693.JPG"
            alt="Akash Sharma - Acoustic Guitar & Lilies"
            fill
            priority
            unoptimized={true}
            className="object-contain object-bottom sm:object-center select-none pointer-events-none scale-[1.25] xs:scale-[1.28] sm:scale-100 origin-bottom sm:origin-center transition-transform duration-700"
          />
        </motion.div>

        {/* Dynamic Animated Calligraphy Typography */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.15,
              },
            },
          }}
          className="absolute left-6 xs:left-8 sm:left-10 md:left-14 lg:left-20 xl:left-24 top-16 xs:top-20 sm:top-[18%] md:top-[20%] z-20 pointer-events-none max-w-[290px] xs:max-w-[330px] sm:max-w-[360px] md:max-w-[440px]"
        >
          {/* Master Signature Calligraphy Headline */}
          <h1
            className={`${alexBrush.className} text-[2.6rem] xs:text-[3rem] sm:text-[3.6rem] md:text-[4.4rem] lg:text-[5.2rem] leading-[1.08] tracking-normal select-none`}
          >
            {/* Line 1: Welcome to */}
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            >
              Welcome to
            </motion.span>

            {/* Line 2: Hobby section */}
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -20, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-rose-100/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] pl-1.5 xs:pl-2 sm:pl-3"
            >
              Hobby section
            </motion.span>

            {/* Line 3: of Akash */}
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -16, scale: 0.92, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-300 to-pink-200 drop-shadow-[0_0_25px_rgba(244,63,94,0.45)] pl-3 xs:pl-4 sm:pl-6"
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px rgba(244,63,94,0.35)",
                    "0 0 35px rgba(244,63,94,0.65)",
                    "0 0 20px rgba(244,63,94,0.35)",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                of Akash
              </motion.span>
            </motion.span>
          </h1>

          {/* Micro Accent Line & Note */}
          <motion.div
            variants={{
              hidden: { opacity: 0, width: 0 },
              visible: {
                opacity: 1,
                width: "auto",
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
            className="flex items-center gap-2.5 sm:gap-3 mt-3 sm:mt-4 pl-1"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-rose-400/60 to-transparent origin-left" 
            />
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400/80 tracking-widest uppercase">
              Strings • Code • Passions
            </span>
          </motion.div>
        </motion.div>

        {/* Deep Bottom Vignette & Seamless Shadow Dissolve */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 md:h-56 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />

        {/* Subtle Mobile Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.85, 0.35], y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-3 xs:bottom-4 inset-x-0 flex flex-col items-center justify-center gap-0.5 sm:hidden pointer-events-none z-30"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400">
            Scroll
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-rose-300/80" />
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: IK AAS MUSIC SPOTLIGHT DIVISION */}
      {/* ============================================================ */}
      <section 
        id="ik-aas-section" 
        className="relative w-full pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-18 md:pb-20 px-4 sm:px-6 md:px-12 flex flex-col justify-center items-center bg-black"
      >
        {/* Seamless Radial Ambient Glows - naturally decaying to transparent with zero hard edges */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_45%_at_15%_45%,rgba(245,158,11,0.08),transparent_70%),radial-gradient(ellipse_65%_45%_at_85%_55%,rgba(244,63,94,0.08),transparent_70%)]" />

        <div className="relative z-10 max-w-6xl w-full mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-14">
            <h2 className={`${alexBrush.className} text-4xl xs:text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-rose-200 tracking-wide mb-2 sm:mb-3`}>
              Ik Aas
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto leading-relaxed px-2">
              &ldquo;A ray of quiet hope, held gently close to the heart — woven through melodic strings and bittersweet nostalgia.&rdquo;
            </p>
          </div>

          {/* Main Content Grid: Album Artwork + Story & Audio Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-center">
            {/* Left Column: Vinyl & Album Artwork Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center lg:justify-end items-center"
            >
              <div className="relative group max-w-[300px] xs:max-w-[350px] sm:max-w-[420px] w-full aspect-square">
                {/* Glowing Aura behind cover */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-500/25 via-rose-500/20 to-yellow-500/20 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Spinning Vinyl Record Peek Effect */}
                <div 
                  className="absolute -right-2 xs:-right-4 sm:-right-8 top-1/2 -translate-y-1/2 w-36 xs:w-44 sm:w-56 h-36 xs:h-44 sm:h-56 rounded-full bg-zinc-950 border-4 border-zinc-800 shadow-2xl flex items-center justify-center transition-all duration-700 pointer-events-none group-hover:translate-x-6 sm:group-hover:translate-x-8 group-hover:rotate-45"
                  style={{
                    background: "radial-gradient(circle, #27272a 10%, #09090b 20%, #18181b 35%, #09090b 50%, #27272a 65%, #09090b 80%, #000000 100%)",
                  }}
                >
                  <div className="w-12 xs:w-14 sm:w-18 h-12 xs:h-14 sm:h-18 rounded-full bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center p-1 border-2 border-white/20">
                    <Disc className="w-6 h-6 sm:w-7 sm:h-7 text-black animate-spin" style={{ animationDuration: "6s" }} />
                  </div>
                </div>

                {/* The Front Album Artwork Card */}
                <div className="relative z-10 aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/30 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <Image
                    src="/ik-aas-cover.jpg"
                    alt="Ik Aas - Album Art Cover by Akash"
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                    <Music className="w-3 h-3" />
                    <span>Single</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Matched Proportions Showcase & Dedication Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7 flex justify-center lg:justify-start items-center lg:translate-x-8 xl:translate-x-12"
            >
              <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[460px] lg:max-w-[500px] min-h-0 sm:min-h-[380px] lg:min-h-[420px] p-5 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group">
                {/* Subtle ambient corner glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

                {/* Top: Badges & Song Dedication Story */}
                <div className="space-y-3.5 sm:space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase">
                      <Music className="w-3 h-3" />
                      <span>Original Single</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 tracking-wider">
                      ChaandSaa
                    </span>
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-baseline gap-2">
                      <span>Ik Aas</span>
                      <span className="text-xs xs:text-sm sm:text-base font-normal text-amber-200/70 font-serif italic">
                        (इक आस)
                      </span>
                    </h3>
                    
                    <p className="text-xs xs:text-sm sm:text-[15px] text-zinc-300 font-light leading-relaxed">
                      A heartfelt ode woven from quiet late-night memories, honest reflections, and gentle longing. Dedicated to the loved ones who linger softly in our thoughts — like golden sunflowers turning toward the warmth, bound by an unspoken thread of hope and devotion.
                    </p>
                  </div>
                </div>

                {/* Bottom: Streaming Platform Icons */}
                <div className="pt-5 sm:pt-6 relative z-10 border-t border-white/[0.08] mt-5 sm:mt-6">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono mb-3 sm:mb-3.5">
                    <span className="text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <span>Stream &amp; Connect</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">Original Release</span>
                  </div>

                  {/* Icons Only Row - Unified Dark Glass Luxury Styling */}
                  <div className="flex flex-wrap items-center gap-2 xs:gap-2.5 sm:gap-3">
                    {/* Spotify */}
                    <a
                      href="https://open.spotify.com/artist/47eiDLCr02jfDdv4FFIkMx?nd=1&dlsi=030098f561bb4dad"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Spotify — ChaandSaa"
                      aria-label="Spotify"
                      className="group/btn relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900/90 hover:bg-black border border-white/10 hover:border-[#1ED760]/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(30,215,96,0.35)] cursor-pointer"
                    >
                      <FaSpotify className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-[#1ED760] transition-transform group-hover/btn:scale-105" />
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@ChaandSaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="YouTube — @ChaandSaa"
                      aria-label="YouTube"
                      className="group/btn relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900/90 hover:bg-black border border-white/10 hover:border-[#FF0000]/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,0,0,0.35)] cursor-pointer"
                    >
                      <FaYoutube className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-[#FF0000] transition-transform group-hover/btn:scale-105" />
                    </a>

                    {/* JioSaavn */}
                    <a
                      href="https://www.jiosaavn.com/artist/chaandsaa-songs/qTEaDHCEcDc_"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="JioSaavn — ChaandSaa"
                      aria-label="JioSaavn"
                      className="group/btn relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900/90 hover:bg-black border border-white/10 hover:border-[#00BFA5]/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,191,165,0.35)] cursor-pointer"
                    >
                      <div className="w-4.5 h-4.5 sm:w-6 sm:h-6 rounded-full bg-[#00BFA5] flex items-center justify-center transition-transform group-hover/btn:scale-105 shadow-sm">
                        <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                          <path d="M5 12a7 7 0 0 1 14 0" />
                          <path d="M8.5 12a3.5 3.5 0 0 1 7 0" />
                          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                        </svg>
                      </div>
                    </a>

                    {/* Amazon Music */}
                    <a
                      href="https://music.amazon.in/artists/B0HB7947TC/chaandsaa?marketplaceId=A21TJRUUN4KGV&musicTerritory=IN"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Amazon Music — ChaandSaa"
                      aria-label="Amazon Music"
                      className="group/btn relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900/90 hover:bg-black border border-white/10 hover:border-[#00A8E1]/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,168,225,0.35)] cursor-pointer"
                    >
                      <FaAmazon className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-[#00A8E1] transition-transform group-hover/btn:scale-105" />
                    </a>

                    {/* Gaana */}
                    <a
                      href="https://gaana.com/artist/chaandsaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Gaana — ChaandSaa"
                      aria-label="Gaana"
                      className="group/btn relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900/90 hover:bg-black border border-white/10 hover:border-[#E72C30]/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(231,44,48,0.35)] cursor-pointer"
                    >
                      <div className="w-4.5 h-4.5 sm:w-6 sm:h-6 rounded-full bg-[#E72C30] flex items-center justify-center transition-transform group-hover/btn:scale-105 shadow-sm">
                        <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1.2 13.8c-2.4 0-4.2-1.6-4.2-3.8s1.8-3.8 4.2-3.8c1.3 0 2.4.5 3.1 1.4l-1.3 1.2c-.4-.5-1-0.8-1.8-.8-1.4 0-2.3 1-2.3 2s.9 2 2.3 2c.8 0 1.4-.3 1.8-.7v-1.1h-1.8v-1.6h3.6v3.1c-.8 1-2 1.6-3.6 1.6z"/>
                        </svg>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/chaandsaaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram — @chaandsaaa"
                      aria-label="Instagram"
                      className="group/btn relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900/90 hover:bg-black border border-white/10 hover:border-[#E1306C]/60 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(225,48,108,0.35)] cursor-pointer"
                    >
                      <FaInstagram className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-[#E1306C] transition-transform group-hover/btn:scale-105" />
                    </a>

                    {/* X / Twitter */}
                    <a
                      href="https://x.com/ChaandSaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="X (Twitter) — @ChaandSaa"
                      aria-label="X Twitter"
                      className="group/btn relative w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900/90 hover:bg-black border border-white/10 hover:border-white/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] cursor-pointer"
                    >
                      <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform group-hover/btn:scale-105" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: THE SKETCHBOOK (INTERACTIVE 3D ART DOME) */}
      {/* ============================================================ */}
      <section 
        id="art-gallery-section"
        className="relative w-full pt-8 pb-10 sm:pt-12 sm:pb-14 md:pt-14 md:pb-18 bg-black"
      >
        {/* Seamless Radial Ambient Glows - naturally decaying to transparent with zero hard edges */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_45%_at_85%_35%,rgba(244,63,94,0.06),transparent_70%),radial-gradient(ellipse_65%_45%_at_15%_65%,rgba(245,158,11,0.06),transparent_70%)]" />

        {/* Section Heading */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mb-3 sm:mb-6">
          <h2 className={`${alexBrush.className} text-4xl xs:text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-amber-100 to-rose-100 tracking-wide mb-2 sm:mb-3`}>
            The Sketchbook
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-zinc-400 font-light max-w-lg mx-auto leading-relaxed px-2">
            &ldquo;Charcoal dust, graphite traces, and raw lines — capturing fleeting emotions on paper.&rdquo;
          </p>
        </div>

        {/* Interactive 3D Curved Dome Gallery */}
        <CurvedDomeGallery />
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: FOOTER & BACK TO DESKTOP OS */}
      {/* ============================================================ */}
      <footer className="pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 text-center bg-black relative z-10">
        <div className="max-w-md mx-auto space-y-4">
          <h3 className={`${alexBrush.className} text-2xl xs:text-3xl sm:text-4xl text-zinc-200`}>
            Akash Kumar Sharma
          </h3>
          <p className="text-[11px] xs:text-xs text-zinc-400 font-light">
            Curious programmer by day • Acoustic composer by night
          </p>

          <div className="pt-2">
            <Link
              href="/desktop"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Desktop OS</span>
            </Link>
          </div>

          <p className="text-[10px] xs:text-[11px] text-zinc-400 pt-3">
            © {new Date().getFullYear()} Akash Sharma • All musical compositions &amp; artwork reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
