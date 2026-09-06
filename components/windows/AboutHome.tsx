"use client";

import React, { useEffect, useState, useMemo } from "react";
import ExperienceCard from "./ExperienceCard";
import { useExperience, useResume, useProfile, useHobbies } from "@/lib/useSanityData";
import { motion, AnimatePresence } from "motion/react";

export type OpenAppFn = (app: "about" | "projects" | "skills" | "contact" | "terminal" | "tetris") => void;

type View = "about" | "experience";

export default function AboutHome({ onOpen }: { onOpen: OpenAppFn }) {
  const [currentView, setCurrentView] = useState<View>("about");
  const [showUniverseModal, setShowUniverseModal] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Load Google Fonts dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bevan:ital@0;1&family=Rammetto+One&family=Roboto+Slab:wght@400..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const experience = useExperience();
  const resume = useResume();
  const profile = useProfile();
  const hobbiesData = useHobbies();

  const HOBBY_METADATA: Record<string, {
    icon: string;
    badge: string;
    gradient: string;
    borderColor: string;
    highlight: string;
    tagline: string;
    desc: string;
  }> = {
    Gaming: {
      icon: "🎮",
      badge: "Action RPGs • Soulslike",
      gradient: "from-red-950/40 via-zinc-900/60 to-black/80",
      borderColor: "border-red-500/30 hover:border-red-400/60",
      highlight: "text-red-300",
      tagline: "\"Rise, Tarnished.\" — Elden Ring",
      desc: "Conquering punishing boss fights, mastering dodge frames, and exploring vast lore-rich worlds.",
    },
    Chess: {
      icon: "♟️",
      badge: "1200+ Elo • Blitz / Rapid",
      gradient: "from-blue-950/40 via-zinc-900/60 to-black/80",
      borderColor: "border-blue-500/30 hover:border-blue-400/60",
      highlight: "text-blue-300",
      tagline: "1200+ on Chess.com",
      desc: "Tactical openings, rapid & blitz calculation, calculated gambits, and converting dynamic positions.",
    },
    Cats: {
      icon: "🐱",
      badge: "Chief Companion • Debugger",
      gradient: "from-amber-950/40 via-zinc-900/60 to-black/80",
      borderColor: "border-amber-500/30 hover:border-amber-400/60",
      highlight: "text-amber-300",
      tagline: "Permanently chosen by feline royalty",
      desc: "Certified cat whisperer. Providing purr-powered debugging support and unconditional lap comfort.",
    },
    Cooking: {
      icon: "🍳",
      badge: "Culinary Alchemy • Spices",
      gradient: "from-emerald-950/40 via-zinc-900/60 to-black/80",
      borderColor: "border-emerald-500/30 hover:border-emerald-400/60",
      highlight: "text-emerald-300",
      tagline: "Alchemy, to satisfy my hunger",
      desc: "Treating cooking like alchemy: balancing complex spices, temperature control, and precision plating.",
    },
  };

  const parsedHobbies = useMemo(() => {
    const list = hobbiesData && hobbiesData.length > 0 ? hobbiesData : [
      "Gaming — \"Rise, Tarnished.\" - Elden Ring",
      "Chess — 1200+ on Chess.com",
      "Cats — Permanently chosen by at least one feline",
      "Cooking — Alchemy, to satisfy my hunger"
    ];

    return list.map(item => {
      const [rawTitle, rawQuote] = item.split(" — ");
      const title = rawTitle?.replace(/^[^\w]*/, "").trim() || item;
      const quote = rawQuote?.trim() || "";
      const meta = HOBBY_METADATA[title] || {
        icon: "✨",
        badge: "Creative Pursuit",
        gradient: "from-purple-950/40 via-zinc-900/60 to-black/80",
        borderColor: "border-purple-500/30 hover:border-purple-400/60",
        highlight: "text-purple-300",
        tagline: quote || "Exploring passions beyond the screen",
        desc: "Pursuing curious creative quests, offline crafts, and personal hobbies.",
      };
      return {
        title,
        quote: quote || meta.tagline,
        ...meta
      };
    });
  }, [hobbiesData]);

  const renderAbout = () => {

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05 // Faster stagger
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 }, // Reduced y distance for subtler pop-in
      visible: { opacity: 1, y: 0 }
    };

    return (
      <div className="flex flex-col relative z-50 pb-6">
        {/* Header with CTA buttons */}
        <div className={`sticky top-0 z-50 flex ${isMobile ? 'flex-col gap-3 items-start' : 'flex-row items-center justify-between'} px-6 py-4 border-b border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md`}>
          <h1 className="text-2xl font-bold text-white">About</h1>
          <div className={`flex flex-row ${isMobile ? 'overflow-x-auto w-full pb-1 scrollbar-hide' : 'gap-2'}`}>
            <motion.button
              onClick={() => setCurrentView("experience")}
              className={`text-zinc-400 hover:text-white px-3 py-1.5 transition-colors font-medium text-sm whitespace-nowrap ${isMobile ? 'bg-white/5 rounded-full mr-2' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience
            </motion.button>

            <motion.button
              onClick={() => onOpen("projects")}
              className={`text-zinc-400 hover:text-white px-3 py-1.5 transition-colors font-medium text-sm whitespace-nowrap ${isMobile ? 'bg-white/5 rounded-full mr-2' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.button>

            <motion.button
              onClick={() => onOpen("skills")}
              className={`text-zinc-400 hover:text-white px-3 py-1.5 transition-colors font-medium text-sm whitespace-nowrap ${isMobile ? 'bg-white/5 rounded-full mr-2' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills
            </motion.button>

            <motion.button
              onClick={() => onOpen("contact")}
              className={`text-zinc-400 hover:text-white px-3 py-1.5 transition-colors font-medium text-sm whitespace-nowrap ${isMobile ? 'bg-white/5 rounded-full' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className={isMobile ? "p-4" : "p-6"}>
          <motion.div
            className="max-w-4xl mx-auto space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hero Welcome */}
            <motion.div
              variants={itemVariants}
              className={isMobile ? "pl-0" : "pl-2"}
            >
                <div className="mb-6">
                  <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-black text-white mb-4 tracking-tight`}>Hey, I&apos;m Akash!</h2>
                  <p className={`${isMobile ? 'text-xl' : 'text-2xl'} text-zinc-400 font-light max-w-2xl`}>{profile.tagline}</p>
                </div>

                <p className="text-zinc-400 leading-relaxed text-lg mb-8 max-w-2xl">
                  Thanks for taking the time to explore my website. I hope you enjoy it as much as I enjoyed developing it!
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-8 border-t border-white/5 pt-8">
                    <motion.a
                        href={resume.url}
                        download={resume.filename}
                        className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-bold tracking-wide overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download CV
                        </span>
                    </motion.a>

                    <a
                      href={`mailto:${profile.contact.email_masked}`}
                      className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors self-center font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {profile.contact.email_masked}
                    </a>
                </div>
            </motion.div>

            {/* About Me Section */}
            <motion.div variants={itemVariants} className={isMobile ? "ml-0" : "pl-2 border-l-2 border-white/10 ml-1"}>
              <div className={isMobile ? "pl-0 space-y-4" : "pl-6 space-y-4"}>
                  <h2 className="text-2xl font-bold text-white mb-4">My Journey</h2>
                  <div className="space-y-4 text-zinc-400 leading-relaxed max-w-3xl">
                    <p>
                        I am a Computer Science undergraduate pursuing my <span className="text-zinc-200 font-medium">B.Tech in Computer Science and Engineering (2024-2028)</span> at <span className="text-zinc-200 font-medium">Guru Gobind Singh Indraprastha University (GTB4CEC)</span> with a Current CGPA of <span className="text-zinc-200 font-medium">8.62/10</span>.
                    </p>
                    <p>
                        I have strong foundations in <span className="text-zinc-200 font-medium">Data Structures &amp; Algorithms, Object-Oriented Programming, and Full-Stack Development</span>. Passionate about building scalable, high-performance applications and solving complex engineering challenges.
                    </p>
                    <p>
                        I have hands-on experience architecting AI-powered platforms, hybrid LLM orchestration pipelines (FastAPI, Gemini Flash, PyMuPDF), and fault-tolerant backends. Actively participate in hackathons — competing in <span className="text-zinc-200 font-medium">8+ offline hackathons</span> and securing <span className="text-zinc-200 font-medium">Top-10 finishes in 3 hackathons (400+ teams)</span>.
                    </p>
                  </div>
              </div>
            </motion.div>

            {/* Akash's Universe Button - 3D Skeuomorphic Glossy Black Capsule */}
            <motion.div variants={itemVariants} className={isMobile ? "pl-0 pt-2" : "pl-2 pt-2"}>
              <motion.button
                onClick={() => setShowUniverseModal(true)}
                whileHover={{ scale: 1.035, y: -1.5 }}
                whileTap={{ scale: 0.96, y: 1 }}
                className="group relative inline-flex items-center justify-center cursor-pointer select-none rounded-full p-[2.5px] transition-all duration-300"
                style={{
                  background: "linear-gradient(180deg, #3d3d40 0%, #1e1e22 35%, #0d0d0f 70%, #1a1a1d 100%)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12)",
                }}
              >
                {/* Inner Capsule Body */}
                <div
                  className="relative flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 rounded-full overflow-hidden w-full h-full"
                  style={{
                    background: "linear-gradient(180deg, #1c1c1f 0%, #0f0f11 46%, #050506 54%, #000000 100%)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.45), inset 0 -2px 6px rgba(0, 0, 0, 0.95)",
                  }}
                >
                  {/* Top Specular Liquid Glass Curved Highlight (Skeuomorphic Sheen) */}
                  <div
                    className="absolute top-[2px] left-[6px] right-[6px] h-[48%] rounded-full pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.16) 55%, rgba(255, 255, 255, 0) 100%)",
                      boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.65)",
                    }}
                  />

                  {/* Outer Rim Specular Lip */}
                  <div
                    className="absolute inset-[1px] rounded-full pointer-events-none opacity-35 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      maskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
                    }}
                  />

                  {/* Subtle Gleam Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none" />

                  {/* Button Label */}
                  <span className="relative z-10 font-bold text-xs sm:text-sm text-white tracking-[0.16em] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                    Akash&apos;s Universe
                  </span>
                </div>
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    );
  };


  const renderExperience = () => {

    return (
      <div className="flex flex-col relative z-50 pb-6">
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white">Experience</h2>
          <button
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
            onClick={() => setCurrentView("about")}
          >
            ← Back
          </button>
        </div>

        <div className={isMobile ? "p-4" : "p-6"}>
          <div className="max-w-4xl mx-auto space-y-4">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={index}
                title={exp.title}
                company={exp.company}
                duration={exp.period}
                description={exp.description}
                isCurrent={exp.period.includes("Present")}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full relative">
      {currentView === "about" && renderAbout()}
      {currentView === "experience" && renderExperience()}

      {/* Akash's Universe Modal */}
      <AnimatePresence>
        {showUniverseModal && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowUniverseModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0c0d14]/95 border border-purple-500/35 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(168,85,247,0.25)] scrollbar-thin scrollbar-thumb-white/10"
            >
              {/* Cosmic ambient light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-purple-600/25 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowUniverseModal(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Header */}
              <div className="relative z-10 mb-6 pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2.5">
                  <span>🌌</span> Akash&apos;s Universe
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Hobbies &amp; Offline Quests
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  What fuels my curiosity when I&apos;m not writing code — gaming challenges, tactical chess battles, feline companions, and culinary alchemy.
                </p>
              </div>

              {/* Hobbies Showcase Grid */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {parsedHobbies.map((hobby, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className={`relative p-4 sm:p-4.5 rounded-2xl bg-gradient-to-br ${hobby.gradient} border ${hobby.borderColor} shadow-lg transition-all duration-300 hover:scale-[1.02] group overflow-hidden`}
                  >
                    {/* Top Row: Icon + Title + Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-white/[0.06] border border-white/10 shadow-inner">
                          {hobby.icon}
                        </span>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-purple-200 transition-colors">
                            {hobby.title}
                          </h3>
                          <span className="text-[11px] font-medium text-zinc-400">
                            {hobby.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quote / Highlight Tag */}
                    <div className="mb-2 px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 inline-block max-w-full">
                      <p className={`text-xs font-mono font-medium ${hobby.highlight} truncate`}>
                        {hobby.quote}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-300/90 leading-relaxed">
                      {hobby.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Key Highlights / Stats */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-lg sm:text-xl font-black text-purple-300">8+</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">Hackathons</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-lg sm:text-xl font-black text-purple-300">Top 10</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">In 3 Events</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-lg sm:text-xl font-black text-purple-300">8.62</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">B.Tech CGPA</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-lg sm:text-xl font-black text-purple-300">AI &amp; SDE</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">Focus</div>
                </div>
              </div>

              {/* Quick Portals */}
              <div className="relative z-10 space-y-2">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-1.5 pl-0.5">
                  Quick Portals
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("projects");
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-200">🚀 Projects Galaxy</div>
                      <div className="text-[11px] text-zinc-400">Freelance &amp; Web Apps</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">→</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("skills");
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-200">⚡ Skills Constellation</div>
                      <div className="text-[11px] text-zinc-400">Languages &amp; Frameworks</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">→</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("terminal");
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-200">💻 Terminal CLI</div>
                      <div className="text-[11px] text-zinc-400">ZSH shell, Breach &amp; hacks</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">→</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("contact");
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-purple-200">📡 Transmission / Contact</div>
                      <div className="text-[11px] text-zinc-400">Email, Socials &amp; Phone</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
