/**
 * Centralized icon mapping: tech display name -> SVG filename in /public/tech svg/
 *
 * This is the single source of truth used by:
 * - Sanity schemas (predefined tech dropdown options)
 * - Frontend components (icon rendering)
 *
 * To add a new technology:
 * 1. Drop the SVG into /public/tech svg/
 * 2. Add the mapping here
 * 3. It will automatically appear in the Sanity Studio dropdown AND render with an icon
 */

export const TECH_ICON_MAP: Record<string, string> = {
  // Languages
  C: "C.svg",
  "C++": "C++-(CPlusPlus).svg",
  "C#": "C#-(CSharp).svg",
  Java: "Java.svg",
  JavaScript: "JavaScript.svg",
  TypeScript: "TypeScript.svg",
  Python: "Python.svg",
  Go: "Go.svg",
  Rust: "Rust.svg",
  Dart: "Dart.svg",
  Kotlin: "Kotlin.svg",
  Swift: "Swift.svg",
  Ruby: "Ruby.svg",
  PHP: "PHP.svg",
  Lua: "Lua.svg",
  Bash: "Bash.svg",

  // Frontend Frameworks
  React: "React.svg",
  "React.js": "React.svg",
  "Next.js": "Next.js.svg",
  "Vue.js": "Vue.js.svg",
  "Nuxt.js": "Nuxt-JS.svg",
  Angular: "Angular.svg",
  Svelte: "Svelte.svg",
  AstroJs: "Astro.svg",
  "Solid.js": "Solid.js.svg",
  Qwik: "Qwik.svg",

  // CSS / Styling
  HTML: "HTML5.svg",
  HTML5: "HTML5.svg",
  CSS: "CSS3.svg",
  CSS3: "CSS3.svg",
  "Tailwind CSS": "Tailwind-CSS.svg",
  Tailwind: "Tailwind-CSS.svg",
  Bootstrap: "Bootstrap.svg",
  Sass: "Sass.svg",
  "Material UI": "Material-UI.svg",

  // Backend
  "Node.js": "Node.js.svg",
  Express: "Express.svg",
  "Express.js": "Express.svg",
  "Nest.js": "Nest.js.svg",
  FastAPI: "FastAPI.svg",
  Django: "Django.svg",
  Flask: "Flask.svg",
  Spring: "Spring.svg",
  "Socket.io": "Socket.io.svg",
  WebSockets: "Socket.io.svg",

  // Databases
  MongoDB: "MongoDB.svg",
  MySQL: "MySQL.svg",
  SQLite: "SQLite.svg",
  PostgreSQL: "PostgresSQL.svg",
  Redis: "Redis.svg",
  Firebase: "Firebase.svg",
  Supabase: "Sanity.svg",

  // Mobile & Desktop
  "React Native": "React.svg",
  Flutter: "Flutter.svg",
  Tauri: "Tauri.svg",
  Electron: "Electron.svg",

  // DevOps & Cloud
  AWS: "AWS.svg",
  Azure: "Azure.svg",
  "Google Cloud": "Google-Cloud.svg",
  Docker: "Docker.svg",
  Kubernetes: "Kubernetes.svg",
  Jenkins: "Jenkins.svg",
  "GitHub Actions": "GitHub-Actions.svg",
  Vercel: "Vercel.svg",
  Netlify: "Netlify.svg",

  // Tools
  Git: "Git.svg",
  GitHub: "GitHub.svg",
  Linux: "Linux.svg",
  Figma: "Figma.svg",
  Postman: "Postman.svg",
  Jest: "Jest.svg",
  Vite: "Vite.js.svg",
  Webpack: "Webpack.svg",
  "VS Code": "Visual-Studio-Code-(VS-Code).svg",
  Canva: "Canva.svg",
  "Premiere Pro": "Adobe-Premiere-Pro.svg",
  Render: "Render-Cloud.svg",
  Chrome: "Chrome.svg",
  "Manifest V3": "Chrome.svg",

  // CS Fundamentals
  "Data Structures & Algorithms": "Data-Structures.svg",
  "Data Structures": "Data-Structures.svg",
  Algorithms: "The-Algorithms.svg",
  "Object-Oriented Programming": "OOP.svg",
  OOP: "OOP.svg",
  DBMS: "DBMS.svg",
  "Computer Networks": "Computer-Networks.svg",

  // 3D / Graphics
  "Three.js": "Three.js.svg",
  "Unreal Engine": "Unreal-Engine.svg",
  Unity: "Unity.svg",

  // Data / Analytics / Auth
  GraphQL: "GraphQL.svg",
  JWT: "JSON.svg",
  NumPy: "NumPy.svg",
  Pandas: "Pandas.svg",
  Matplotlib: "Matplotlib.svg",
  SQL: "MySQL.svg",
  SQLAlchemy: "SQLAlchemy-Bright.svg",
  "MS Excel": "MS-Excel.svg",
  Excel: "MS-Excel.svg",
  "Power BI": "Power-BI.svg",
  PowerBI: "Power-BI.svg",
  "Data Visualization": "Matplotlib.svg",

  // Soft Skills
  Communication: "Communication.svg",
  "Problem Solving": "Problem-Solving.svg",
  Adaptability: "Adaptability.svg",
};

/**
 * List of tech names for use in Sanity schema dropdowns.
 * Returns { title, value } pairs for Sanity's `list` option.
 */
export const TECH_OPTIONS = Object.keys(TECH_ICON_MAP).map((name) => ({
  title: name,
  value: name,
}));

/**
 * Icons that need the invert filter (dark icons on dark backgrounds).
 */
export const INVERT_ICON_TECHS = [
  "Next.js",
  "Express",
  "Three.js",
  "Bash",
  "AWS",
  "Vercel",
  "Netlify",
  "AstroJs",
  "GitHub",
];

/**
 * Resolve a tech name to its SVG filename.
 * Falls back to fuzzy matching if exact match isn't found.
 */
export function resolveTechIcon(
  techName: string
): { file: string; invert: boolean } | null {
  // 1. Exact match
  const exact = TECH_ICON_MAP[techName];
  if (exact) {
    return {
      file: exact,
      invert: INVERT_ICON_TECHS.some(
        (k) => techName.toLowerCase() === k.toLowerCase() || techName.includes(k)
      ),
    };
  }

  // 2. Case-insensitive exact match
  const trimmed = techName.trim().toLowerCase();
  const ciEntry = Object.entries(TECH_ICON_MAP).find(
    ([k]) => k.toLowerCase() === trimmed
  );
  if (ciEntry) {
    return {
      file: ciEntry[1],
      invert: INVERT_ICON_TECHS.some(
        (k) => ciEntry[0].toLowerCase() === k.toLowerCase() || ciEntry[0].includes(k)
      ),
    };
  }

  // 3. Substring match (safely avoiding 1-2 letter collision like 'C')
  const entry = Object.entries(TECH_ICON_MAP).find(([k]) => {
    const kLower = k.toLowerCase();
    if (kLower.length < 3) return false;
    return trimmed.includes(kLower) || kLower.includes(trimmed);
  });
  if (entry) {
    return {
      file: entry[1],
      invert: INVERT_ICON_TECHS.some(
        (k) => entry[0].toLowerCase() === k.toLowerCase() || entry[0].includes(k)
      ),
    };
  }

  return null;
}
