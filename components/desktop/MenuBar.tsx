"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Apple, Settings, Power, Info, Command } from "lucide-react";

export default function MenuBar({ hidden = false, title = "Akash", showSystemMenu = false, terminalHref = "/terminal", shutdownHref = "/gui" }: { hidden?: boolean; title?: string; showSystemMenu?: boolean; terminalHref?: string; shutdownHref?: string }) {
  const [now, setNow] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const update = () => setNow(new Date().toLocaleString());
    update();
    const t = setInterval(update, 1000 * 30);
    return () => clearInterval(t);
  }, []);

  // close when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleAction = (action: "shutdown" | "terminal" | "restart") => {
    setOpen(false);
    if (action === "terminal") router.push(terminalHref);
    if (action === "shutdown") router.push(shutdownHref);
    if (action === "restart") window.location.reload();
  };

  return (
    <div
      className={`fixed top-0 inset-x-0 h-8 px-3 flex items-center justify-between text-xs z-50 transition-opacity ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      } bg-[#0d0d0d] border-b border-zinc-800 text-theme-2`}
    >
      <div className="flex items-center gap-2.5 select-none" ref={menuRef}>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Akash Logo"
            width={18}
            height={18}
            className="w-4 h-4 object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
            priority
          />
          <span className="font-bold text-zinc-100 tracking-tight">Akash Kumar Sharma</span>
        </div>
        <span className="text-zinc-600 hidden sm:inline">•</span>
        <span className="font-medium text-zinc-400 hidden sm:inline">{title}</span>
      </div>
      <div className="text-zinc-400" suppressHydrationWarning>{now}</div>
    </div>
  );
}
