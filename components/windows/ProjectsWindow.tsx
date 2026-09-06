"use client";

import React, { useState, useMemo } from "react";
import { useProjects } from "@/lib/useSanityData";
import { resolveTechIcon } from "@/lib/techIcons";
import type { Project } from "@/lib/data";

function ProjectCard({ project }: { project: Project }) {
  const isVideo = Boolean(
    project.demo?.includes("drive.google.com") ||
      project.demo?.includes("youtube") ||
      project.demo?.includes("youtu.be") ||
      project.demo?.includes(".mp4")
  );

  return (
    <div className="group relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 p-5 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-red-500/25 hover:bg-[#121212] transition-all duration-300">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <h4 className="text-white font-bold text-lg group-hover:text-red-400 transition-colors tracking-tight">
            {project.name}
          </h4>
        </div>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed max-w-2xl">{project.desc}</p>
        <div className="flex flex-wrap gap-2.5">
          {/* Live Preview Button */}
          {project.demo && !isVideo && project.demo !== project.video && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all border border-white/5 hover:border-red-500/30 group/btn cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-red-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>Preview</span>
            </a>
          )}

          {/* Video Demo Button */}
          {(project.video || (project.demo && isVideo)) && (
            <a
              href={project.video || project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all border border-white/5 hover:border-red-500/30 group/btn cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-red-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Watch Demo</span>
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-medium transition-all border border-white/5 hover:border-white/20 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Source</span>
            </a>
          )}
        </div>
      </div>

      {/* Right side: Project image for freelance OR Tech icons for web-apps */}
      {project.category === "freelance" ? (
        project.image ? (
          <div className="relative w-full sm:w-48 lg:w-52 h-36 sm:h-40 rounded-xl overflow-hidden border border-white/10 shrink-0 group-hover:border-white/25 transition-all shadow-xl bg-zinc-950 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.name}
              className={`w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                project.image.includes("logo")
                  ? "object-contain p-3"
                  : "object-cover object-[center_50%]"
              }`}
            />
          </div>
        ) : null
      ) : (
        <div className="flex flex-wrap lg:justify-end gap-2 w-full lg:w-auto lg:max-w-[280px] shrink-0 lg:ml-auto mt-2 lg:mt-0">
          {project.tech.map((t) => {
            const icon = resolveTechIcon(t);
            if (!icon) return null;

            return (
              <div
                key={t}
                className="w-9 h-9 flex items-center justify-center bg-zinc-950/80 border border-white/10 rounded-xl hover:border-red-500/40 transition-all hover:-translate-y-0.5"
                title={t}
              >
                <img
                  src={`/tech svg/${icon.file}`}
                  alt={t}
                  className={`w-4 h-4 object-contain ${icon.invert ? "brightness-0 invert" : ""}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProjectsWindow({ onOpen }: { onOpen?: (app: string) => void } = {}) {
  const PROJECTS = useProjects();
  const [filter, setFilter] = useState<"web-app" | "freelance">("web-app");

  const freelanceProjects = useMemo(() => {
    return PROJECTS.filter((p) => p.category === "freelance");
  }, [PROJECTS]);

  const webAppProjects = useMemo(() => {
    return PROJECTS.filter((p) => p.category !== "freelance");
  }, [PROJECTS]);

  return (
    <div className="h-full flex flex-col relative z-50">
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-white tracking-tight">Showcasing My Work</h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              A showcase of my recent work and side projects
            </p>
          </div>

          {/* Rocker Toggle Switch: Webapps vs Freelance Works */}
          <div className="flex items-center justify-center">
            {/* Outer sunken socket/recess */}
            <div className="relative p-1.5 rounded-full bg-[#0d0e11] border border-white/[0.04] shadow-[inset_0_4px_10px_rgba(0,0,0,0.95),inset_0_1px_3px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.06)]">
              {/* Inner 3D tactile rocker capsule */}
              <div className="relative flex items-stretch rounded-full bg-gradient-to-b from-[#2e3036] via-[#1f2125] to-[#141518] shadow-[0_4px_12px_rgba(0,0,0,0.75),0_1px_2px_rgba(0,0,0,0.6),inset_0_1px_0.5px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Option 1: Webapps */}
                <button
                  type="button"
                  onClick={() => setFilter("web-app")}
                  className={`relative px-6 sm:px-8 py-2.5 rounded-l-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none flex items-center justify-center ${
                    filter === "web-app"
                      ? "text-[#2eff70] bg-gradient-to-b from-white/[0.05] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                      : "text-[#666a75] hover:text-[#8b909d] bg-transparent"
                  }`}
                  style={{
                    textShadow:
                      filter === "web-app"
                        ? "0 0 10px rgba(46, 255, 112, 0.85), 0 0 22px rgba(46, 255, 112, 0.45), 0 1px 2px rgba(0,0,0,0.9)"
                        : "0 1px 1px rgba(0,0,0,0.9), 0 -1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <span>Webapps</span>
                </button>

                {/* Central seam divider */}
                <div className="w-[1.5px] self-stretch bg-[#0d0e11] shadow-[1px_0_0_rgba(255,255,255,0.07)]" />

                {/* Option 2: Freelance Works */}
                <button
                  type="button"
                  onClick={() => setFilter("freelance")}
                  className={`relative px-6 sm:px-8 py-2.5 rounded-r-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none flex items-center justify-center ${
                    filter === "freelance"
                      ? "text-[#2eff70] bg-gradient-to-b from-white/[0.05] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                      : "text-[#666a75] hover:text-[#8b909d] bg-transparent"
                  }`}
                  style={{
                    textShadow:
                      filter === "freelance"
                        ? "0 0 10px rgba(46, 255, 112, 0.85), 0 0 22px rgba(46, 255, 112, 0.45), 0 1px 2px rgba(0,0,0,0.9)"
                        : "0 1px 1px rgba(0,0,0,0.9), 0 -1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <span>Freelance Works</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION: WEB APPLICATIONS */}
          {filter === "web-app" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h3 className="text-lg font-bold text-white tracking-wide">My Web Apps</h3>
                <span className="text-xs text-zinc-500 hidden sm:inline">
                  Full-Stack Tools &amp; Production Software
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {webAppProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
                {webAppProjects.length === 0 && (
                  <div className="text-zinc-500 text-sm text-center py-6 bg-[#0d0d0d] rounded-xl border border-white/5">
                    No web apps added yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: FREELANCE WORK */}
          {filter === "freelance" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h3 className="text-lg font-bold text-white tracking-wide">My Freelance Work</h3>
                <span className="text-xs text-zinc-500 hidden sm:inline">
                  Client Solutions &amp; Contracted Platforms
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {freelanceProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
                {freelanceProjects.length === 0 && (
                  <div className="text-zinc-500 text-sm text-center py-6 bg-[#0d0d0d] rounded-xl border border-white/5">
                    No freelance projects added yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Navigation Link */}
          {filter === "freelance" ? (
            /* Freelance Contact Redirection - Glossy 3D Blue Capsule Button */
            <div className="pt-6 pb-2 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  onOpen?.("contact");
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-app", { detail: "contact" }));
                    window.dispatchEvent(new CustomEvent("contact-tab", { detail: "form" }));
                  }
                }}
                className="relative group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 rounded-full overflow-hidden cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(180deg, #005ce6 0%, #003db3 48%, #00237a 100%)",
                  boxShadow:
                    "inset 0 1.5px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 5px rgba(0, 0, 0, 0.6), 0 8px 24px -2px rgba(0, 90, 240, 0.65), 0 0 20px rgba(0, 102, 255, 0.35)",
                  border: "1px solid rgba(120, 180, 255, 0.4)",
                }}
              >
                {/* Top Gloss Shine Specular Highlight */}
                <div
                  className="absolute top-[2px] inset-x-3 h-[44%] rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0) 100%)",
                  }}
                />

                <svg
                  className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] relative z-10 transition-transform duration-200 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="relative z-10 text-white font-extrabold tracking-wider sm:tracking-widest uppercase text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  many more....and for freelance contact
                </span>
                <svg
                  className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] relative z-10 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          ) : (
            /* Web Apps GitHub Link */
            <div className="pt-4 pb-2 flex justify-center">
              <a
                href="https://github.com/Akashsharma211"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#0d0d0d] border border-white/10 hover:border-white/25 hover:bg-[#141414] text-zinc-400 hover:text-white transition-all duration-200 group text-sm font-medium shadow-sm hover:shadow-md cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Many more... Explore on GitHub</span>
                <svg
                  className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
