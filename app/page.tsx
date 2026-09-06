"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import BootLog from "@/components/boot/BootLog";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Simulate loading progress in ~3s, then route to /desktop
  useEffect(() => {
    const total = 3000;
    const interval = 80;
    const steps = Math.max(1, Math.floor(total / interval));
    let current = 0;
    const id = setInterval(() => {
      const base = 100 / steps;
      current = Math.min(100, current + base);
      setProgress(current);
      if (current >= 100) {
        clearInterval(id);
        router.push("/desktop");
      }
    }, interval);
    return () => clearInterval(id);
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key="boot-overlay"
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-black" />
          <div className="relative w-full h-full grid place-items-center p-4">
            <div className="absolute inset-0">
              <BootLog progress={progress} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

