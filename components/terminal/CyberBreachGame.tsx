"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// Procedural 8-bit sound generator using Web Audio API
class CyberSoundFX {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Lazy initialize on first user gesture
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playCollect(type: "normal" | "crypto" | "zeroday" | "quantum") {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === "zeroday") {
        // High arpeggio fan-fare
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "quantum") {
        // Spacey warble
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(300, now + 0.1);
        osc.frequency.linearRampToValueAtTime(900, now + 0.2);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "crypto") {
        // Double blip
        osc.type = "square";
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else {
        // Clean high blip
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  public playCrash() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Ignore audio error
    }
  }

  public playLevelUp() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "triangle";
        const start = now + idx * 0.06;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.1);

        osc.start(start);
        osc.stop(start + 0.1);
      });
    } catch {
      // Ignore
    }
  }
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

type NodeType = "normal" | "crypto" | "zeroday" | "quantum";

interface NodeItem {
  x: number;
  y: number;
  type: NodeType;
  createdAt: number;
  expiresAt?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
}

const SECURITY_LEVELS = [
  { level: 1, title: "GUEST ACCESS", threshold: 0, color: "#94a3b8" },
  { level: 2, title: "USER CLEARANCE", threshold: 60, color: "#10b981" },
  { level: 3, title: "ADMIN PRIVILEGE", threshold: 150, color: "#06b6d4" },
  { level: 4, title: "ROOT PROTOCOL", threshold: 280, color: "#a855f7" },
  { level: 5, title: "SYSTEM ARCHITECT", threshold: 450, color: "#f59e0b" },
  { level: 6, title: "GHOST IN THE MACHINE", threshold: 700, color: "#ef4444" },
];

export default function CyberBreachGame({ onExit }: { onExit?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const soundRef = useRef<CyberSoundFX>(new CyberSoundFX());

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clearanceLevel, setClearanceLevel] = useState(SECURITY_LEVELS[0]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeBuff, setActiveBuff] = useState<string | null>(null);

  // Core Game State references
  const gridWidthRef = useRef<number>(24);
  const gridHeightRef = useRef<number>(18);
  const snakeRef = useRef<Point[]>([{ x: 12, y: 9 }, { x: 11, y: 9 }, { x: 10, y: 9 }]);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const nodesRef = useRef<NodeItem[]>([]);
  const iceFirewallsRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);

  const scoreRef = useRef(0);
  const buffRef = useRef<{ type: "zeroday" | "quantum" | null; expires: number }>({ type: null, expires: 0 });
  const lastTickRef = useRef<number>(0);
  const lastSpawnCheckRef = useRef<number>(0);
  const isGameOverRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const shakeRef = useRef<number>(0);

  // Initialize high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cyberbreach_highscore");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    } catch {
      // LocalStorage access may fail in restrictive environments
    }
  }, []);

  const triggerShake = (intensity = 6) => {
    shakeRef.current = intensity;
  };

  const spawnParticles = (x: number, y: number, color: string, count = 12) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 3 + 1.5,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02,
      });
    }
  };

  const addFloatingText = (text: string, x: number, y: number, color: string) => {
    floatingTextsRef.current.push({
      id: Math.random().toString(),
      text,
      x,
      y,
      color,
      alpha: 1,
    });
  };

  // Helper to spawn a new node in empty space
  const spawnNode = useCallback((forcedType?: NodeType) => {
    const gw = gridWidthRef.current;
    const gh = gridHeightRef.current;
    const occupied = new Set<string>();

    snakeRef.current.forEach((p) => occupied.add(`${p.x},${p.y}`));
    nodesRef.current.forEach((n) => occupied.add(`${n.x},${n.y}`));
    iceFirewallsRef.current.forEach((f) => occupied.add(`${f.x},${f.y}`));

    const freeSpots: Point[] = [];
    for (let x = 1; x < gw - 1; x++) {
      for (let y = 1; y < gh - 1; y++) {
        if (!occupied.has(`${x},${y}`)) {
          freeSpots.push({ x, y });
        }
      }
    }

    if (freeSpots.length === 0) return;
    const spot = freeSpots[Math.floor(Math.random() * freeSpots.length)];

    let type: NodeType = forcedType ?? "normal";
    if (!forcedType) {
      const roll = Math.random();
      if (roll < 0.12) type = "quantum";
      else if (roll < 0.28) type = "zeroday";
      else if (roll < 0.5) type = "crypto";
      else type = "normal";
    }

    const now = Date.now();
    const expiresAt = type === "zeroday" ? now + 8000 : type === "quantum" ? now + 7000 : undefined;

    nodesRef.current.push({
      x: spot.x,
      y: spot.y,
      type,
      createdAt: now,
      expiresAt,
    });
  }, []);

  // Update Firewalls when security level changes
  const updateFirewalls = useCallback((currentScore: number) => {
    const levelIndex = [...SECURITY_LEVELS].reverse().findIndex((l) => currentScore >= l.threshold);
    const lvl = levelIndex >= 0 ? SECURITY_LEVELS[SECURITY_LEVELS.length - 1 - levelIndex] : SECURITY_LEVELS[0];
    setClearanceLevel(lvl);

    // Add obstacles starting from Level 3
    const desiredHazards = Math.max(0, (lvl.level - 2) * 2);
    if (iceFirewallsRef.current.length < desiredHazards) {
      const needed = desiredHazards - iceFirewallsRef.current.length;
      const gw = gridWidthRef.current;
      const gh = gridHeightRef.current;
      const occupied = new Set<string>();

      snakeRef.current.forEach((p) => occupied.add(`${p.x},${p.y}`));
      // Keep generous buffer around current snake head
      const head = snakeRef.current[0];
      for (let dx = -3; dx <= 3; dx++) {
        for (let dy = -3; dy <= 3; dy++) {
          occupied.add(`${head.x + dx},${head.y + dy}`);
        }
      }

      for (let i = 0; i < needed; i++) {
        const freeSpots: Point[] = [];
        for (let x = 2; x < gw - 2; x++) {
          for (let y = 2; y < gh - 2; y++) {
            if (!occupied.has(`${x},${y}`)) freeSpots.push({ x, y });
          }
        }
        if (freeSpots.length > 0) {
          const p = freeSpots[Math.floor(Math.random() * freeSpots.length)];
          iceFirewallsRef.current.push(p);
          occupied.add(`${p.x},${p.y}`);
        }
      }
    }
  }, []);

  const resetGame = useCallback(() => {
    const gw = gridWidthRef.current;
    const gh = gridHeightRef.current;
    const midX = Math.floor(gw / 2);
    const midY = Math.floor(gh / 2);

    snakeRef.current = [
      { x: midX, y: midY },
      { x: midX - 1, y: midY },
      { x: midX - 2, y: midY },
    ];
    directionRef.current = "RIGHT";
    nextDirectionRef.current = "RIGHT";
    nodesRef.current = [];
    iceFirewallsRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    buffRef.current = { type: null, expires: 0 };
    scoreRef.current = 0;
    isGameOverRef.current = false;
    isPausedRef.current = false;

    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setActiveBuff(null);
    setClearanceLevel(SECURITY_LEVELS[0]);

    // Initial normal node and crypto node
    spawnNode("normal");
    spawnNode("crypto");
  }, [spawnNode]);

  // Handle player inputs (WASD / Arrows)
  const handleDirectionChange = useCallback((dir: Direction) => {
    if (isGameOverRef.current || isPausedRef.current) return;
    const cur = directionRef.current;
    if (dir === "UP" && cur !== "DOWN") nextDirectionRef.current = "UP";
    else if (dir === "DOWN" && cur !== "UP") nextDirectionRef.current = "DOWN";
    else if (dir === "LEFT" && cur !== "RIGHT") nextDirectionRef.current = "LEFT";
    else if (dir === "RIGHT" && cur !== "LEFT") nextDirectionRef.current = "RIGHT";
  }, []);

  // Keyboard handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "arrowup" || key === "w") {
        e.preventDefault();
        handleDirectionChange("UP");
      } else if (key === "arrowdown" || key === "s") {
        e.preventDefault();
        handleDirectionChange("DOWN");
      } else if (key === "arrowleft" || key === "a") {
        e.preventDefault();
        handleDirectionChange("LEFT");
      } else if (key === "arrowright" || key === "d") {
        e.preventDefault();
        handleDirectionChange("RIGHT");
      } else if (key === " " || key === "p") {
        e.preventDefault();
        if (!isGameOverRef.current) {
          isPausedRef.current = !isPausedRef.current;
          setIsPaused(isPausedRef.current);
        }
      } else if (key === "r") {
        e.preventDefault();
        resetGame();
      } else if (key === "q" || key === "escape") {
        e.preventDefault();
        onExit?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleDirectionChange, resetGame, onExit]);

  // Main Canvas & Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Scale grid based on dimension
      const targetCellSize = Math.max(16, Math.min(24, Math.floor(rect.width / 26)));
      gridWidthRef.current = Math.max(16, Math.floor(rect.width / targetCellSize));
      gridHeightRef.current = Math.max(12, Math.floor(rect.height / targetCellSize));
    };

    resize();
    resetGame();
    window.addEventListener("resize", resize);

    // Game loop tick
    const loop = (timestamp: number) => {
      animId = requestAnimationFrame(loop);

      const gw = gridWidthRef.current;
      const gh = gridHeightRef.current;
      const cellSize = Math.min(canvas.width / gw, canvas.height / gh);

      // Center grid inside canvas
      const offsetX = (canvas.width - gw * cellSize) / 2;
      const offsetY = (canvas.height - gh * cellSize) / 2;

      // Base tick interval scales slightly with clearance level & buffs
      const hasSpeedBoost = buffRef.current.type === "zeroday" && buffRef.current.expires > timestamp;
      const hasSlowMo = buffRef.current.type === "quantum" && buffRef.current.expires > timestamp;

      let tickSpeed = Math.max(70, 140 - Math.floor(scoreRef.current / 30) * 8);
      if (hasSpeedBoost) tickSpeed = Math.max(55, tickSpeed * 0.75);
      if (hasSlowMo) tickSpeed = tickSpeed * 1.5;

      // Check Buff expiry
      if (buffRef.current.type && timestamp > buffRef.current.expires) {
        buffRef.current = { type: null, expires: 0 };
        setActiveBuff(null);
      }

      // Check Node expiries
      const now = Date.now();
      nodesRef.current = nodesRef.current.filter((n) => !n.expiresAt || n.expiresAt > now);

      // Ensure there's always at least one normal node
      if (nodesRef.current.filter((n) => n.type === "normal").length === 0) {
        spawnNode("normal");
      }

      // Periodically attempt to spawn bonus node
      if (timestamp - lastSpawnCheckRef.current > 4000) {
        lastSpawnCheckRef.current = timestamp;
        if (nodesRef.current.length < 3 && Math.random() < 0.6) {
          spawnNode();
        }
      }

      // Advance game state on tick
      if (!isGameOverRef.current && !isPausedRef.current && timestamp - lastTickRef.current > tickSpeed) {
        lastTickRef.current = timestamp;

        directionRef.current = nextDirectionRef.current;
        const dir = directionRef.current;
        const head = snakeRef.current[0];
        let newHead: Point = { ...head };

        if (dir === "UP") newHead.y -= 1;
        else if (dir === "DOWN") newHead.y += 1;
        else if (dir === "LEFT") newHead.x -= 1;
        else if (dir === "RIGHT") newHead.x += 1;

        const isGhost = buffRef.current.type === "quantum" && buffRef.current.expires > timestamp;

        // Wall wrapping or collision
        let hitWall = false;
        if (newHead.x < 0 || newHead.x >= gw || newHead.y < 0 || newHead.y >= gh) {
          if (isGhost) {
            // Screen wrap in Ghost mode!
            newHead.x = (newHead.x + gw) % gw;
            newHead.y = (newHead.y + gh) % gh;
          } else {
            hitWall = true;
          }
        }

        // Self-collision
        const hitSelf = !isGhost && snakeRef.current.some((p, i) => i > 0 && p.x === newHead.x && p.y === newHead.y);

        // Firewall collision
        const hitFirewall = !isGhost && iceFirewallsRef.current.some((f) => f.x === newHead.x && f.y === newHead.y);

        if (hitWall || hitSelf || hitFirewall) {
          // Game Over!
          isGameOverRef.current = true;
          setIsGameOver(true);
          soundRef.current.playCrash();
          triggerShake(12);

          const finalScore = scoreRef.current;
          try {
            const saved = localStorage.getItem("cyberbreach_highscore");
            const currentBest = saved ? parseInt(saved, 10) : 0;
            if (finalScore > currentBest) {
              localStorage.setItem("cyberbreach_highscore", finalScore.toString());
              setHighScore(finalScore);
            }
          } catch {
            // Ignore
          }
        } else {
          // Advance snake
          snakeRef.current.unshift(newHead);

          // Check node collision
          const nodeIdx = nodesRef.current.findIndex((n) => n.x === newHead.x && n.y === newHead.y);
          if (nodeIdx !== -1) {
            const node = nodesRef.current[nodeIdx];
            nodesRef.current.splice(nodeIdx, 1);

            let pointsGained = 10;
            let text = "+10 DATA";
            let color = "#10b981";

            if (node.type === "crypto") {
              pointsGained = 25;
              text = "+25 BIT";
              color = "#06b6d4";
            } else if (node.type === "zeroday") {
              pointsGained = 75;
              text = "+75 ZERO-DAY [2x BOOST]";
              color = "#f59e0b";
              buffRef.current = { type: "zeroday", expires: timestamp + 6000 };
              setActiveBuff("2X BOOST // SPEED");
            } else if (node.type === "quantum") {
              pointsGained = 100;
              text = "+100 QUANTUM [GHOST]";
              color = "#a855f7";
              buffRef.current = { type: "quantum", expires: timestamp + 5000 };
              setActiveBuff("GHOST PROTOCOL // WALL-PASS");
            }

            if (hasSpeedBoost && node.type !== "zeroday") {
              pointsGained *= 2;
              text = `2X MULTIPLIER! (+${pointsGained})`;
            }

            scoreRef.current += pointsGained;
            setScore(scoreRef.current);
            soundRef.current.playCollect(node.type);

            const px = offsetX + (node.x + 0.5) * cellSize;
            const py = offsetY + (node.y + 0.5) * cellSize;
            spawnParticles(px, py, color, 16);
            addFloatingText(text, px, py, color);
            triggerShake(4);

            updateFirewalls(scoreRef.current);
          } else {
            // Did not eat: pop tail
            snakeRef.current.pop();
          }
        }
      }

      // --- RENDERING ---
      ctx.save();

      // Screen Shake
      if (shakeRef.current > 0) {
        const dx = (Math.random() - 0.5) * shakeRef.current;
        const dy = (Math.random() - 0.5) * shakeRef.current;
        ctx.translate(dx, dy);
        shakeRef.current *= 0.85;
        if (shakeRef.current < 0.5) shakeRef.current = 0;
      }

      // Dark background
      ctx.fillStyle = "#050811";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background pattern
      ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= gw; x++) {
        ctx.beginPath();
        ctx.moveTo(offsetX + x * cellSize, offsetY);
        ctx.lineTo(offsetX + x * cellSize, offsetY + gh * cellSize);
        ctx.stroke();
      }
      for (let y = 0; y <= gh; y++) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + y * cellSize);
        ctx.lineTo(offsetX + gw * cellSize, offsetY + y * cellSize);
        ctx.stroke();
      }

      // Playable Border
      const isGhostActive = buffRef.current.type === "quantum" && buffRef.current.expires > timestamp;
      ctx.strokeStyle = isGhostActive ? "#a855f7" : "#06b6d4";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = isGhostActive ? "#a855f7" : "#06b6d4";
      ctx.strokeRect(offsetX, offsetY, gw * cellSize, gh * cellSize);
      ctx.shadowBlur = 0;

      // Render ICE Firewalls
      iceFirewallsRef.current.forEach((f) => {
        const x = offsetX + f.x * cellSize;
        const y = offsetY + f.y * cellSize;
        ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ef4444";
        ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
        ctx.fillRect(x + 3, y + 3, cellSize - 6, cellSize - 6);

        // Warning X pattern
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 5);
        ctx.lineTo(x + cellSize - 5, y + cellSize - 5);
        ctx.moveTo(x + cellSize - 5, y + 5);
        ctx.lineTo(x + 5, y + cellSize - 5);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Render Nodes
      const pulse = (Math.sin(timestamp * 0.008) + 1) / 2;
      nodesRef.current.forEach((n) => {
        const cx = offsetX + (n.x + 0.5) * cellSize;
        const cy = offsetY + (n.y + 0.5) * cellSize;
        const r = (cellSize * 0.35) * (0.85 + pulse * 0.25);

        ctx.save();
        if (n.type === "normal") {
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#10b981";
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        } else if (n.type === "crypto") {
          ctx.shadowColor = "#06b6d4";
          ctx.shadowBlur = 15;
          ctx.strokeStyle = "#06b6d4";
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - r, cy - r, r * 2, r * 2);
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(cx - r * 0.5, cy - r * 0.5, r, r);
        } else if (n.type === "zeroday") {
          // Golden star / diamond with countdown ring
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 18;
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.moveTo(cx, cy - r * 1.3);
          ctx.lineTo(cx + r * 1.3, cy);
          ctx.lineTo(cx, cy + r * 1.3);
          ctx.lineTo(cx - r * 1.3, cy);
          ctx.closePath();
          ctx.fill();

          // Expiry countdown circle
          if (n.expiresAt) {
            const remainingRatio = Math.max(0, (n.expiresAt - Date.now()) / 8000);
            ctx.strokeStyle = "#f59e0b";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, r * 1.6, -Math.PI / 2, -Math.PI / 2 + remainingRatio * Math.PI * 2);
            ctx.stroke();
          }
        } else if (n.type === "quantum") {
          // Purple quantum orb
          ctx.shadowColor = "#c084fc";
          ctx.shadowBlur = 20;
          ctx.fillStyle = "#a855f7";
          ctx.beginPath();
          ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "#e9d5ff";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 1.5, timestamp * 0.005, timestamp * 0.005 + Math.PI * 1.2);
          ctx.stroke();
        }
        ctx.restore();
      });

      // Render Snake Body & Head
      snakeRef.current.forEach((seg, i) => {
        const x = offsetX + seg.x * cellSize;
        const y = offsetY + seg.y * cellSize;
        const isHead = i === 0;

        ctx.save();
        if (isHead) {
          const headColor = isGhostActive ? "#c084fc" : "#00f0ff";
          ctx.shadowColor = headColor;
          ctx.shadowBlur = 16;
          ctx.fillStyle = headColor;

          // Slightly rounded head
          const pad = 1;
          ctx.beginPath();
          ctx.roundRect(x + pad, y + pad, cellSize - pad * 2, cellSize - pad * 2, 4);
          ctx.fill();

          // Eyes
          ctx.fillStyle = "#ffffff";
          const eyeSize = cellSize * 0.18;
          const dir = directionRef.current;
          let ex1 = x + cellSize * 0.25;
          let ey1 = y + cellSize * 0.25;
          let ex2 = x + cellSize * 0.75;
          let ey2 = y + cellSize * 0.25;

          if (dir === "DOWN") {
            ey1 = ey2 = y + cellSize * 0.75;
          } else if (dir === "LEFT") {
            ex1 = ex2 = x + cellSize * 0.25;
            ey2 = y + cellSize * 0.75;
          } else if (dir === "RIGHT") {
            ex1 = ex2 = x + cellSize * 0.75;
            ey2 = y + cellSize * 0.75;
          }

          ctx.beginPath();
          ctx.arc(ex1, ey1, eyeSize, 0, Math.PI * 2);
          ctx.arc(ex2, ey2, eyeSize, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Body gradient from cyan to emerald
          const ratio = i / snakeRef.current.length;
          const alpha = isGhostActive ? 0.5 : 0.85;
          ctx.fillStyle = isGhostActive
            ? `rgba(168, 85, 247, ${alpha})`
            : ratio > 0.6
            ? `rgba(16, 185, 129, ${alpha})`
            : `rgba(6, 182, 212, ${alpha})`;

          const pad = 2;
          ctx.beginPath();
          ctx.roundRect(x + pad, y + pad, cellSize - pad * 2, cellSize - pad * 2, 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Update & Render Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);

      // Update & Render Floating Texts
      floatingTextsRef.current.forEach((ft) => {
        ft.y -= 0.6;
        ft.alpha -= 0.015;

        if (ft.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, ft.alpha);
          ctx.fillStyle = ft.color;
          ctx.font = "bold 12px monospace";
          ctx.shadowColor = ft.color;
          ctx.shadowBlur = 8;
          ctx.fillText(ft.text, ft.x - 30, ft.y);
          ctx.restore();
        }
      });
      floatingTextsRef.current = floatingTextsRef.current.filter((ft) => ft.alpha > 0);

      // CRT Scanline Overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1.5);
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [resetGame, spawnNode, updateFirewalls]);

  return (
    <div className="w-full flex flex-col font-mono select-none my-2">
      {/* Top HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-zinc-950/80 border border-zinc-800 rounded-t-xl text-xs backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-cyan-400">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            CYBER BREACH
          </div>
          <div className="text-zinc-500">|</div>
          <div className="text-zinc-300">
            SCORE: <span className="text-emerald-400 font-bold text-sm">{score}</span>
          </div>
          <div className="text-zinc-400 hidden sm:inline">
            BEST: <span className="text-zinc-200">{highScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Security Clearance Badge */}
          <div
            className="px-2.5 py-0.5 rounded border text-[11px] font-bold"
            style={{
              borderColor: `${clearanceLevel.color}60`,
              backgroundColor: `${clearanceLevel.color}15`,
              color: clearanceLevel.color,
            }}
          >
            {clearanceLevel.title}
          </div>

          {/* Active Buff Tag */}
          {activeBuff && (
            <div className="px-2 py-0.5 rounded border border-amber-500/50 bg-amber-500/10 text-amber-300 text-[10px] animate-pulse">
              ⚡ {activeBuff}
            </div>
          )}

          {/* Audio toggle */}
          <button
            onClick={() => {
              const next = !isMuted;
              setIsMuted(next);
              soundRef.current.setEnabled(!next);
            }}
            className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white cursor-pointer transition-colors"
            title="Toggle Audio"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          {/* Pause button */}
          <button
            onClick={() => {
              if (!isGameOver) {
                isPausedRef.current = !isPausedRef.current;
                setIsPaused(isPausedRef.current);
              }
            }}
            className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white cursor-pointer transition-colors"
            title="Pause [Space]"
          >
            {isPaused ? "▶" : "⏸"}
          </button>

          {/* Exit button */}
          <button
            onClick={() => onExit?.()}
            className="px-2.5 py-1 rounded bg-red-950/40 border border-red-800/50 hover:bg-red-900/60 text-red-300 hover:text-white cursor-pointer transition-colors"
            title="Exit game [Q / Esc]"
          >
            ✕ EXIT [Q]
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[420px] bg-black border-x border-b border-zinc-800 overflow-hidden flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-red-500 font-extrabold text-2xl tracking-widest crt-glow">
              INTRUSION DETECTED // CONNECTION TERMINATED
            </div>
            <div className="text-zinc-400 text-sm max-w-sm">
              Your autonomous cyber probe hit a security barrier or ICE countermeasure.
            </div>

            <div className="grid grid-cols-2 gap-4 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800 text-left w-64">
              <div>
                <div className="text-zinc-500 text-[10px] uppercase">Final Score</div>
                <div className="text-emerald-400 text-lg font-bold">{score}</div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px] uppercase">Peak Rank</div>
                <div className="text-cyan-300 text-xs font-semibold">{clearanceLevel.title}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold cursor-pointer transition-all shadow-lg shadow-emerald-950/50"
              >
                RE-INFILTRATE [R]
              </button>
              <button
                onClick={() => onExit?.()}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer transition-colors border border-zinc-700"
              >
                ABORT TO SHELL [Q]
              </button>
            </div>
          </div>
        )}

        {/* Paused Screen */}
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
            <div className="text-amber-400 font-bold text-xl tracking-widest animate-pulse">
              BREACH PAUSED
            </div>
            <div className="text-zinc-400 text-xs mt-1">Press [Space] or click Resume to continue</div>
            <button
              onClick={() => {
                isPausedRef.current = false;
                setIsPaused(false);
              }}
              className="mt-3 px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
            >
              RESUME
            </button>
          </div>
        )}
      </div>

      {/* Mobile / On-Screen Touch Controls & Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2.5 bg-zinc-950/90 border-x border-b border-zinc-800 rounded-b-xl gap-3 text-xs text-zinc-400">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
          <span><span className="text-zinc-200 font-bold">WASD / Arrows</span>: Move</span>
          <span><span className="text-zinc-200 font-bold">Space</span>: Pause</span>
          <span><span className="text-zinc-200 font-bold">R</span>: Restart</span>
          <span><span className="text-zinc-200 font-bold">Q / Esc</span>: Exit</span>
        </div>

        {/* Compact D-Pad for Touch/Click users */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleDirectionChange("LEFT")}
            className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 active:bg-cyan-900 active:border-cyan-400 text-zinc-200 flex items-center justify-center cursor-pointer select-none text-sm"
            aria-label="Move Left"
          >
            ◀
          </button>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleDirectionChange("UP")}
              className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 active:bg-cyan-900 active:border-cyan-400 text-zinc-200 flex items-center justify-center cursor-pointer select-none text-sm"
              aria-label="Move Up"
            >
              ▲
            </button>
            <button
              onClick={() => handleDirectionChange("DOWN")}
              className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 active:bg-cyan-900 active:border-cyan-400 text-zinc-200 flex items-center justify-center cursor-pointer select-none text-sm"
              aria-label="Move Down"
            >
              ▼
            </button>
          </div>
          <button
            onClick={() => handleDirectionChange("RIGHT")}
            className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 active:bg-cyan-900 active:border-cyan-400 text-zinc-200 flex items-center justify-center cursor-pointer select-none text-sm"
            aria-label="Move Right"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
