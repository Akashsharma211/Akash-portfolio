"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  getProject,
  getAllProjects,
  getAllExperience,
  getResume,
  getProfile,
  getProjectsCount,
  getAllSkills,
  getHobbies
} from "@/lib/data";

const EASTER_EGG_QUOTES = [
  "In hackathons, sleep is just a theoretical concept.",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Git commit -m 'Fixed it for real this time (part 7)'",
  "It works on my machine... so pack your machine, we're shipping it!",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
];

const SpawnUniverse = () => {
  const [quoteIndex] = React.useState(() => Math.floor(Math.random() * EASTER_EGG_QUOTES.length));

  return (
    <div className="space-y-3 font-mono text-sm py-2">
      {/* ASCII Cyber Banner */}
      <pre className="text-emerald-400 text-[10px] sm:text-xs leading-[13px] select-none overflow-x-auto">
{`   ___    __ __ ___    ____  __  __   __  __ _   __ ____ _   __ ____ ____   _____ ______
  /   |  / // //   |  / __/ / / / /  / / / // | / //  _// | / // __// __ \\ / ___// ____/
 / /| | / ,<  / /| | _\\ \\  / /_/ /  / / / //  |/ / _/ / /  |/ // _/ / /_/ /_\\__ \\/ __/   
/_/ |_|/_/|_|/_/ |_|/___/  \\____/   \\____//_/|_//___/ /_/|_//___/ \\____//____//_____/   `}
      </pre>

      {/* Terminal System Diagnostics */}
      <div className="border border-emerald-500/30 bg-emerald-950/20 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
          <div className="text-emerald-300 font-bold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SYS-CORE // DIAGNOSTICS
          </div>
          <div className="text-zinc-400 text-xs">STATUS: ONLINE</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
          <div><span className="text-zinc-400">Target Host:</span> <span className="text-zinc-200">akash@portfolio-v2</span></div>
          <div><span className="text-zinc-400">Kernel:</span> <span className="text-zinc-200">FullStack-AI 6.8.0-akash</span></div>
          <div><span className="text-zinc-400">Academic Score:</span> <span className="text-emerald-400 font-semibold">8.62 / 10.0 CGPA</span></div>
          <div><span className="text-zinc-400">Institution:</span> <span className="text-zinc-200">GGSIPU (GTB4CEC)</span></div>
          <div><span className="text-zinc-400">Orchestration:</span> <span className="text-zinc-200">Gemini 3.1 Flash + FastAPI</span></div>
          <div><span className="text-zinc-400">Runtime:</span> <span className="text-zinc-200">Next.js 16 (Turbopack)</span></div>
        </div>
      </div>

      {/* Secret Achievements & Trophies */}
      <div className="border border-purple-500/30 bg-purple-950/20 rounded-xl p-3.5 space-y-2">
        <div className="text-purple-300 font-bold flex items-center gap-2 border-b border-purple-500/20 pb-2">
          <span>🏆</span> UNLOCKED ACHIEVEMENTS &amp; TROPHIES
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-amber-400">🥇</span>
            <div>
              <span className="text-zinc-200 font-semibold">Hackathon Top-10 Tier:</span>{" "}
              <span className="text-zinc-400">Achieved Top-10 placement in 3 major national hackathons across 400+ competing teams.</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400">⚡</span>
            <div>
              <span className="text-zinc-200 font-semibold">Hackathon Veteran:</span>{" "}
              <span className="text-zinc-400">Competed in 8+ offline hackathons, delivering UI, backend, and deployment under tight deadlines.</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">🤖</span>
            <div>
              <span className="text-zinc-200 font-semibold">Enterprise AI Pipeline:</span>{" "}
              <span className="text-zinc-400">Architected hybrid LLM PO Extractor with Gemini Flash &amp; PyMuPDF at WAISL Limited.</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-400">💬</span>
            <div>
              <span className="text-zinc-200 font-semibold">Real-Time Messaging Engine:</span>{" "}
              <span className="text-zinc-400">Engineered ChatZ WebSocket infrastructure for 30+ staff across departments.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Randomized Easter Egg Quote */}
      <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
        <div className="text-zinc-500 text-[11px] uppercase tracking-wider mb-1">💡 Developer Wisdom</div>
        <div className="text-zinc-300 italic">&ldquo;{EASTER_EGG_QUOTES[quoteIndex]}&rdquo;</div>
      </div>
    </div>
  );
};

// Lazy load the StarBlade game
const DynamicStarBladeGame = dynamic(() => import("./StarBladeGame"), {
  ssr: false,
  loading: () => <div className="text-zinc-500 text-sm">Loading StarBlade...</div>
});

export type ThemeName = "default" | "mocha";

export type Env = {
  setTheme: (name: ThemeName) => void;
  setZenMode?: (enabled: boolean) => void;
  zenMode?: boolean;
  setBannerVisible: (v: boolean) => void;
  setPrompt: (p: string) => void;
  open: (url: string) => void;
  run: (cmd: string) => void; // programmatically run a command from clickable UI
  onExit?: () => void; // callback to close the terminal window
  theme: ThemeName;
  prompt: string;
  bannerVisible: boolean;
};

export type CommandHandler = (args: string[], env: Env) => React.ReactNode;

// Data is now imported from centralized lib/data.ts

const Skills = () => {
  const skills = getAllSkills();

  return (
    <div className="space-y-1">
      <div className="text-zinc-100">Skills</div>
      <ul className="list-disc pl-6 text-zinc-300">
        {skills.map((category) => (
          <li key={category.title}>
            <span className="text-zinc-200">{category.title}:</span> {category.skills.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

function link(href: string, text?: string) {
  return (
    <a className="text-green-400 underline" href={href} target="_blank" rel="noreferrer">
      {text ?? href}
    </a>
  );
}

export const aliases: Record<string, string> = {
  work: "exp",
  play: "starblade",
  game: "starblade",
};

export const commands: Record<string, CommandHandler> = {
  help: () => (
    <div className="space-y-2">
      <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1 font-mono text-sm">
        <div className="text-green-400">help</div>
        <div>List all commands</div>
        <div className="text-green-400">about</div>
        <div>Who Am I? (use -f for full)</div>
        <div className="text-green-400">exp</div>
        <div>Places I have worked</div>
        <div className="text-green-400">skills</div>
        <div>My Tech Stack</div>
        <div className="text-green-400">projects</div>
        <div>View my projects (use -f for details)</div>
        <div className="text-green-400">contact</div>
        <div>Get in touch with me</div>
        <div className="text-green-400">resume</div>
        <div>View my resume</div>
        <div className="text-green-400">starblade</div>
        <div>Play StarBlade - Space Shooter</div>
        <div className="text-green-400">spawn</div>
        <div>Akash&#39;s Universe cyber diagnostics &amp; secret trophies</div>
        <div className="text-green-400">clear</div>
        <div>Clear terminal (Ctrl/Cmd+L)</div>
        <div className="text-green-400">zen</div>
        <div>Toggle Zen Mode</div>
        <div className="text-green-400">exit</div>
        <div>Close terminal window</div>
      </div>
    </div>
  ),

  zen: (_args, env) => {
    if (env.setZenMode) {
        const newState = !env.zenMode;
        env.setZenMode(newState);
        return <div className="text-zinc-400">{newState ? "Entering Zen Mode... (Type 'zen' to exit)" : "Exiting Zen Mode..."}</div>;
    }
    return <div className="text-red-400">Zen Mode not available in this environment.</div>;
  },

  // about with optional -f flag for full details
  about: (args) => {
    const profile = getProfile();
    const fullMode = args.includes("-f") || args.includes("--full");
    
    if (fullMode) {
      return (
        <div className="space-y-2">
          <div className="text-zinc-100 font-semibold">{profile.name}</div>
          <div className="text-zinc-300">{profile.tagline}</div>
          <div className="text-zinc-400 whitespace-pre-wrap">{profile.about}</div>
          <div className="mt-3 space-y-1">
            <div className="text-zinc-100">Education</div>
            <div className="text-zinc-300">{profile.education.summary}</div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-zinc-100">Status</div>
            <div className="text-zinc-300">{profile.contact.open_to}</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-1">
        <div className="text-zinc-100 font-semibold">{profile.name}</div>
        <div className="text-zinc-300">{profile.tagline}</div>
        <div className="text-zinc-400">Use <span className="text-green-400">about -f</span> for full details</div>
      </div>
    );
  },

  // exp (experience) - alias: work
  exp: () => (
    <div className="space-y-1">
      <div className="text-zinc-100">Experience</div>
      <ul className="list-disc pl-6 text-zinc-300 space-y-1">
        {getAllExperience().map((exp, index) => (
          <li key={index}>
            <span className="text-zinc-200">{exp.company}</span> — {exp.title} ({exp.period})
          </li>
        ))}
        <li>Open-source / Personal projects — {getProjectsCount()}+ projects, focusing on web apps and tooling</li>
      </ul>
    </div>
  ),

  // skills (keep existing component)
  skills: () => <Skills />,

  // projects with -f flag for full details, or projects view <slug>
  projects: (args) => {
    const hasFullFlag = args.includes("-f") || args.includes("--full");
    const sub = (args[0] || "").toLowerCase();
    
    // Handle "projects view <slug>" command
    if (sub === "view") {
      const key = (args[1] || "").toLowerCase();
      const p = getProject(key);
      if (!p) return <div className="text-red-300">Usage: projects view &lt;slug|#&gt;</div>;
      return (
        <div className="space-y-1">
          <div className="text-zinc-100 font-semibold">{p.name}</div>
          <div className="text-zinc-300">{p.desc}</div>
          <div className="text-zinc-400">Tech: {p.tech.join(", ")}</div>
          <div className="space-x-3">
            {p.demo && link(p.demo, "demo")}
            {p.repo && link(p.repo, "repo")}
          </div>
        </div>
      );
    }
    
    // Full mode: show descriptions
    if (hasFullFlag) {
      return (
        <div className="space-y-1">
          <div className="text-zinc-100">Projects ({getProjectsCount()})</div>
          <ul className="list-disc pl-6 space-y-2">
            {getAllProjects().map((p, i) => (
              <li key={p.slug}>
                <div className="text-zinc-200 font-semibold">[{i + 1}] {p.name}</div>
                <div className="text-zinc-400">{p.desc}</div>
                <div className="text-zinc-500 text-sm">Tech: {p.tech.join(", ")}</div>
                <div className="space-x-3 mt-1">
                  {p.demo && link(p.demo, "demo")}
                  {p.repo && link(p.repo, "repo")}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    // Default: simple list
    return (
      <div className="space-y-1">
        <div className="text-zinc-100">Projects ({getProjectsCount()})</div>
        <ul className="list-disc pl-6 space-y-1">
          {getAllProjects().map((p, i) => (
            <li key={p.slug}>
              <span className="text-zinc-200">[{i + 1}] {p.name}</span>{" "}
              {p.demo && link(p.demo, "demo")}
              {p.repo && <span className="ml-2">{link(p.repo, "repo")}</span>}
            </li>
          ))}
        </ul>
        <div className="text-zinc-500 text-sm mt-1">Use <span className="text-green-400">projects -f</span> for details or <span className="text-green-400">projects view &lt;slug&gt;</span></div>
      </div>
    );
  },

  // contact (renamed from socials)
  contact: () => {
    const profile = getProfile();
    return (
      <div className="space-y-1">
        <div className="mt-2">
          <div className="text-zinc-100 text-sm">Socials & Contact</div>
          <div>GitHub: {link(profile.socials.github)}</div>
          <div>LinkedIn: {link(profile.socials.linkedin)}</div>
          <div>Twitter/X: {link(profile.socials.twitter)}</div>
          <div>Portfolio: {link(profile.socials.portfolio)}</div>
          <div>Email: {link(profile.contact.email_masked)}</div>
        </div>
      </div>
    );
  },

  // resume: open in new tab instead of downloading
  resume: (args, env) => {
    const resume = getResume();
    const target = (args[0] || resume.url).replace(/^\/+/, '');
    const url = `/${target}`;
    
    // Open in new tab
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch { }
    
    return (
      <div className="space-y-1">
        <div className="text-zinc-100">Resume</div>
        <div>Opening resume in new tab...</div>
        <div className="text-zinc-500 text-sm">Last updated: {resume.lastUpdated}</div>
        <div className="mt-1">{link(url, "Click here if it didn't open")}</div>
      </div>
    );
  },

  // spawn: Akash's Universe cyber diagnostics, secret achievements, and wisdom
  spawn: () => {
    return <SpawnUniverse />;
  },

  // starblade: interactive space shooter game
  starblade: (_args, env) => {
    return <DynamicStarBladeGame onExit={() => env.run("clear")} />;
  },

  // exit: close the terminal window
  exit: (_args, env) => {
    if (env.onExit) {
      // If in zen mode, exit zen mode first to restore the desktop
      if (env.zenMode && env.setZenMode) {
        env.setZenMode(false);
      }
      // Small delay to show the message and allow zen mode to exit before closing
      setTimeout(() => env.onExit?.(), 300);
      return <div className="text-zinc-400">Closing terminal...</div>;
    }
    return <div className="text-red-400">Exit not available in this environment.</div>;
  },
};
