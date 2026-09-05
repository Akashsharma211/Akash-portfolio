"use client";

import React, { useState, useMemo } from "react";
import { useProjects } from "@/lib/useSanityData";
import { resolveTechIcon } from "@/lib/techIcons";
import type { Project } from "@/lib/data";

function ProjectCard({ project }: { project: Project }) {
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
          {project.demo && (
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

      {/* Tech stack icons */}
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
    </div>
  );
}

export default function ProjectsWindow() {
  const PROJECTS = useProjects();
  const [filter, setFilter] = useState<"all" | "freelance" | "web-app">("all");

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

          {/* Filter Pills */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1 rounded-xl bg-zinc-900/80 border border-white/5 backdrop-blur">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                All Work ({PROJECTS.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("freelance")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === "freelance"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>💼</span> My Freelance Work ({freelanceProjects.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("web-app")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === "web-app"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>🚀</span> My Web Apps ({webAppProjects.length})
              </button>
            </div>
          </div>

          {/* SECTION 1: FREELANCE WORK */}
          {(filter === "all" || filter === "freelance") && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💼</span>
                  <h3 className="text-lg font-bold text-white tracking-wide">My Freelance Work</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono">
                    {freelanceProjects.length} {freelanceProjects.length === 1 ? "project" : "projects"}
                  </span>
                </div>
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

          {/* SECTION 2: WEB APPLICATIONS */}
          {(filter === "all" || filter === "web-app") && (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🚀</span>
                  <h3 className="text-lg font-bold text-white tracking-wide">My Web Apps</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono">
                    {webAppProjects.length} {webAppProjects.length === 1 ? "app" : "apps"}
                  </span>
                </div>
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
        </div>
      </div>
    </div>
  );
}
