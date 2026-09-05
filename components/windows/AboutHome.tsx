"use client";

import React, { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import { useExperience, useResume, useProfile } from "@/lib/useSanityData";
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

            {/* Akash's Universe Button */}
            <motion.div variants={itemVariants} className={isMobile ? "pl-0 pt-2" : "pl-2 pt-2"}>
              <motion.button
                onClick={() => setShowUniverseModal(true)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-indigo-950/60 to-zinc-900/80 border border-purple-500/40 hover:border-purple-400/70 shadow-[0_4px_25px_rgba(168,85,247,0.22)] hover:shadow-[0_8px_35px_rgba(168,85,247,0.45)] transition-all duration-300 overflow-hidden"
              >
                {/* Cosmic Ambient Sheen */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 via-pink-500/15 to-blue-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Cosmic Sparkle Icon */}
                <div className="relative z-10 w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <svg className="w-5 h-5 text-purple-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>

                {/* Text & Indicator */}
                <div className="relative z-10 flex items-center gap-2.5">
                  <span className="font-bold text-base sm:text-lg text-white tracking-wide group-hover:text-purple-100 transition-colors">
                    Akash&apos;s Universe
                  </span>
                  <span className="text-purple-300 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 group-hover:bg-purple-500/35 transition-colors">
                    Explore ✦
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[#0d0e15]/95 border border-purple-500/35 rounded-3xl p-6 sm:p-8 shadow-[0_0_55px_rgba(168,85,247,0.28)] overflow-hidden"
            >
              {/* Top cosmic ambient light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-purple-600/25 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowUniverseModal(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Header */}
              <div className="relative z-10 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <span>🌌</span> Cosmic Dimension
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Akash&apos;s Universe
                </h2>
                <p className="text-zinc-400 text-sm mt-1.5">
                  Welcome to my digital space — explore hackathon journeys, high-impact systems, and interactive modules.
                </p>
              </div>

              {/* Key Highlights / Stats */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-black text-purple-300">8+</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">Hackathons</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-black text-purple-300">Top 10</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">In 3 Events</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-black text-purple-300">8.62</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">B.Tech CGPA</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-black text-purple-300">AI &amp; SDE</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mt-0.5">Focus</div>
                </div>
              </div>

              {/* Interactive Portals */}
              <div className="relative z-10 space-y-2">
                <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2 pl-0.5">
                  Quick Portals
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("projects");
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-200">🚀 Projects Galaxy</div>
                      <div className="text-xs text-zinc-400">Chrome Ext, ChatZ &amp; AI PO Extractor</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("skills");
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-200">⚡ Skills Constellation</div>
                      <div className="text-xs text-zinc-400">Languages, Web Dev &amp; Data Analytics</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("terminal");
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-200">💻 Terminal CLI</div>
                      <div className="text-xs text-zinc-400">ZSH shell, Cyber Breach &amp; secret commands</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUniverseModal(false);
                      onOpen("contact");
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] hover:bg-purple-600/15 border border-white/5 hover:border-purple-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-200">📡 Transmission / Contact</div>
                      <div className="text-xs text-zinc-400">Connect via Email, LinkedIn or Phone</div>
                    </div>
                    <span className="text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>
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
