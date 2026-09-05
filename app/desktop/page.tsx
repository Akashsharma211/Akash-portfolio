"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import MenuBar from "@/components/desktop/MenuBar";
import DesktopBackground from "@/components/desktop/DesktopBackground";
import AppWindow from "@/components/windows/AppWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import AboutHome from "@/components/windows/AboutHome";
import TetrisGameWindow from "@/components/windows/TetrisGameWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import ClockWidget from "@/components/widgets/ClockWidget";
import NowListeningWidget from "@/components/widgets/NowListeningWidget";
import DateNowWidget from "@/components/widgets/DateNowWidget";
import TechStackStrip from "@/components/tech-marquee";
import { getResponsiveConfig } from "@/lib/responsive";
import AnimatedRoleText from "@/components/desktop/AnimatedRoleText";
import DesktopDock, { dockApps } from "@/components/desktop/DesktopDock";
import { WindowAppType, WidgetType, DesktopItem, DockApp } from "@/components/desktop/types";

export default function DesktopOSPage() {

  // track which windows are open and a z-order stack for layering
  const [openWindows, setOpenWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    tetris: false,
    terminal: false,
  });

  // Window dimensions - use consistent initial values to prevent hydration mismatch
  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(900);
  const [windowStack, setWindowStack] = useState<WindowAppType[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<WindowAppType | null>(null);

  // Responsive configuration
  const responsiveConfig = useMemo(() => getResponsiveConfig(width, height), [width, height]);

  // Track fullscreen state per window
  const [fullscreenWindows, setFullscreenWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    tetris: false,
    terminal: false,
  });

  // Track minimized state per window
  const [minimizedWindows, setMinimizedWindows] = useState<Record<WindowAppType, boolean>>({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    tetris: false,
    terminal: false,
  });

  // Update window dimensions after hydration to prevent hydration mismatch
  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);





  // Window helpers
  const bringToFront = useCallback((appType: WindowAppType) => {
    setWindowStack(prev => [...prev.filter(w => w !== appType), appType]);
    setFocusedWindow(appType);
  }, []);

  const openWindow = useCallback((appType: WindowAppType) => {
    setOpenWindows(prev => ({ ...prev, [appType]: true }));
    setWindowStack(prev => [...prev.filter(w => w !== appType), appType]);
    setFocusedWindow(appType);
  }, []);

  const closeWindow = useCallback((appType: WindowAppType) => {
    setOpenWindows(prev => ({ ...prev, [appType]: false }));
    setMinimizedWindows(prev => ({ ...prev, [appType]: false }));
    setWindowStack(prev => prev.filter(w => w !== appType));
    setFocusedWindow(prev => (prev === appType ? null : prev));
  }, []);

  const minimizeWindow = useCallback((appType: WindowAppType) => {
    setMinimizedWindows(prev => ({ ...prev, [appType]: true }));
    setFocusedWindow(prev => (prev === appType ? null : prev));
  }, []);

  const toggleFullscreen = useCallback((appType: WindowAppType) => {
    // Disable fullscreen for tetris game
    if (appType === 'tetris') return;
    setFullscreenWindows(prev => ({ ...prev, [appType]: !prev[appType] }));
    bringToFront(appType);
  }, [bringToFront]);

  // Track window origins for dock animations
  const [dockOrigins, setDockOrigins] = useState<Record<WindowAppType, DOMRect | null>>({
    about: null,
    projects: null,
    skills: null,
    contact: null,
    tetris: null,
    terminal: null,
  });

  // Dock app click
  const handleDockAppClick = useCallback((app: DockApp, rect: DOMRect) => {
    const appType = app.appType as WindowAppType;

    // Update origin
    setDockOrigins(prev => ({ ...prev, [appType]: rect }));

    if (app.appType in openWindows) {
      if (minimizedWindows[appType]) {
        // Restore minimized window
        setMinimizedWindows(prev => ({ ...prev, [appType]: false }));
        bringToFront(appType);
      } else {
        // Open or focus window
        openWindow(appType);
      }
    }
  }, [openWindow, openWindows, minimizedWindows, bringToFront]);

  const clearSelection = useCallback(() => { }, []);

  // Zen mode for terminal
  const [zenMode, setZenMode] = useState(false);

  // Widget Layout - Using Responsive System
  const desktopItems: DesktopItem[] = useMemo(() => {
    // Hide widgets in zen mode
    if (zenMode) return [];

    // Base dimensions (unscaled)
    const baseTodoWidth = 240;
    const baseTodoHeight = 115;
    const baseSmallWidth = 165;
    const baseSmallHeight = 165;

    // Scale factor from config
    const scale = responsiveConfig.widgetScale;
    const margin = responsiveConfig.widgetMargin;

    // Computed scaled dimensions for layout positioning
    const scaledTodoWidth = baseTodoWidth * scale;
    const scaledTodoHeight = baseTodoHeight * scale;
    const scaledSmallWidth = baseSmallWidth * scale;

    // Consistent top spacing for all screen sizes (same as 13" MacBook)
    const topSpacing = 46;

    return [
      {
        id: "clock-widget",
        name: "Clock",
        icon: "",
        type: "widget",
        widgetType: "clock",
        // BOTTOM-LEFT CORNER - Best UI balance
        x: Math.max(margin, 36),
        y: height - (scaledTodoHeight + 42),
        widthPx: baseTodoWidth, // Pass unscaled width
        heightPx: baseTodoHeight, // Pass unscaled height
        scale: scale, // Pass scale factor
      },
    ];
  }, [width, height, responsiveConfig, zenMode]);

  // Widget renderer - direct widgets
  const renderWidget = (widgetType: WidgetType) => {
    switch (widgetType) {
      case "clock":
      case "todo":
        return <ClockWidget />;
      case "now-listening":
        return <NowListeningWidget />;
      case "date-now":
        return <DateNowWidget />;
      default:
        return null;
    }
  };


  // Window descriptors to remove JSX duplication
  const WINDOW_CONFIG: Record<WindowAppType, { title: string; render: () => React.JSX.Element }> = {
    about: { title: "About", render: () => <AboutHome onOpen={(app) => openWindow(app as WindowAppType)} /> },
    projects: { title: "Projects", render: () => <ProjectsWindow /> },
    skills: { title: "Skills", render: () => <SkillsWindow /> },
    contact: { title: "Contact / Socials", render: () => <ContactWindow /> },
    tetris: { title: "Tetris Game", render: () => <TetrisGameWindow /> },
    terminal: { 
      title: "Terminal", 
      render: () => (
        <TerminalWindow 
          zenMode={zenMode}
          onZenModeChange={(enabled) => {
            setZenMode(enabled);
            // If zen mode is enabled, we need to ensure this window is active and probably maximized if not already
            if (enabled) {
              setFullscreenWindows(prev => ({ ...prev, terminal: true }));
              bringToFront('terminal');
            } else {
              setFullscreenWindows(prev => ({ ...prev, terminal: false }));
            }
          }}
          onExit={() => closeWindow('terminal')}
        />
      ) 
    },
  } as const;

  const zBase = 100; // base z-index for windows

  return (
    <div>
      {/* Actual desktop UI - Visible on all screens now */}
      <div
        className="fixed inset-0 w-full h-full bg-black overflow-hidden select-none touch-none"
        role="application"
        aria-label="Desktop environment"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            clearSelection();
            setFocusedWindow(null);
          }
        }}
      >
        {/* Desktop Background */}
        <DesktopBackground backgroundImage="/bg.png" overlay={false} />

        {/* Menu Bar - Hidden in Zen Mode */}
        {!zenMode && (
          <MenuBar title={focusedWindow ? WINDOW_CONFIG[focusedWindow]?.title : "Desktop"} showSystemMenu={true} terminalHref="/terminal" shutdownHref="/" />
        )}

        {/* Hero Text - Hidden in Zen Mode */}
        {!zenMode && (
         <div
          className="absolute z-10"
          suppressHydrationWarning
          style={{
            left: `${width < 768 ? 20 : responsiveConfig.heroLeft}px`,
            top: `${width < 768 ? 100 : responsiveConfig.heroTop - 40}px`
          }}
         >
          <div className="space-y-2">
            <div className="text-white space-y-4 lg:space-y-6">
              {/* Main Name - Responsive Size */}
              <h1
                className="tracking-tight font-walter font-black whitespace-nowrap"
                suppressHydrationWarning
                style={{
                  fontSize: width < 768 ? '2.85rem' : responsiveConfig.heroNameSize,
                  lineHeight: '0.9'
                }}
              >
                <span className="text-red-500">A</span>kash <span className="text-red-500">K</span>r. <span className="text-red-500">S</span>h.
              </h1>

              {/* Tagline - Responsive */}
              <div
                className="font-light leading-relaxed flex flex-col gap-1 md:gap-1.5 max-w-[340px] md:max-w-none text-left"
                suppressHydrationWarning
                style={{
                  fontSize: width < 768 ? '0.95rem' : responsiveConfig.heroTaglineSize
                }}
              >
                {/* Line 1: Desktop shows full phrase, Mobile shows first segment */}
                <div className="flex items-center text-left">
                  <span className="text-gray-300">Crafting&nbsp;</span>
                  <span className="text-gray-200 font-normal">scalable web apps</span>
                  <span className="hidden md:inline text-gray-200 font-normal">&nbsp;&amp; intelligent platforms</span>
                </div>

                {/* Mobile Line 2: Second segment only on mobile */}
                <div className="flex md:hidden items-center text-left">
                  <span className="text-gray-200 font-normal">&amp; intelligent platforms</span>
                </div>

                {/* Desktop Line 2: Combined statement + animated role */}
                <div className="hidden md:flex items-center text-left">
                  <span className="text-gray-400">with precision, architecture &amp;&nbsp;</span>
                  <AnimatedRoleText />
                </div>

                {/* Mobile Line 3: Precision & architecture */}
                <div className="flex md:hidden items-center text-left">
                  <span className="text-gray-400">with precision, architecture &amp;</span>
                </div>

                {/* Mobile Line 4: Animated role text flush left */}
                <div className="flex md:hidden items-center text-left">
                  <AnimatedRoleText />
                </div>
              </div>
            </div>
          </div>
         </div>
        )}

        {/* TechStackStrip - Half-length along diagonal reference (bottom to middle) */}
        {!zenMode && width >= 768 && (
         <div
          className="absolute z-[5] pointer-events-none select-none origin-center"
          style={{
            left: '52%',
            top: '78%',
            transform: 'translate(-50%, -50%) rotate(-55deg)',
            width: '56vw',
            maskImage: 'linear-gradient(to right, black 0%, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 72%, transparent 100%)',
          }}
         >
          <TechStackStrip
            items={[
              "React",
              "Next.js",
              "FastAPI",
              "Python",
              "TypeScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Docker",
              "C++",
              "JavaScript",
              "Tailwind CSS",
              "Gemini Flash",
              "SQLAlchemy",
              "Socket.io",
              "Git & GitHub",
              "Vercel",
              "Postman",
              "Data Structures & Algorithms",
            ]}
            duration={22}
            pauseOnHover={false}
            className="bg-black/50 backdrop-blur-md border-y border-white/10 shadow-2xl min-h-[48px] flex items-center"
          />
         </div>
        )}

        {/* Desktop Widgets - Hidden on Mobile */}
        {width >= 768 && desktopItems.map((item) => {
          if (item.type !== "widget" || !item.widgetType) return null;
          return (
            <motion.div
              key={item.id}
              className="absolute pointer-events-auto rounded-2xl"
              style={{
                left: item.x,
                top: item.y,
                width: item.widthPx,
                height: item.heightPx,
                transformOrigin: "top left",
                scale: item.scale || 1
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: item.scale || 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {renderWidget(item.widgetType)}
            </motion.div>
          );
        })}


        {/* Custom Dock - Hidden in Zen Mode */}
        {!zenMode && (
         <DesktopDock
          openWindows={openWindows}
          responsiveConfig={responsiveConfig}
          width={width}
          onAppClick={handleDockAppClick}
          items={width < 768 ? dockApps.filter(app => ['about', 'projects', 'skills', 'contact'].includes(app.appType)) : undefined}
         />
        )}

        {/* Windows */}
        <AnimatePresence>
          {(Object.keys(WINDOW_CONFIG) as WindowAppType[]).map((appType) => {
            if (!openWindows[appType]) return null;
            // In Zen Mode, only show the terminal, and hide others
            if (zenMode && appType !== 'terminal') return null;

            const orderIndex = Math.max(0, windowStack.indexOf(appType));
            const { title, render } = WINDOW_CONFIG[appType];
            const isMinimized = minimizedWindows[appType];
            
            // If Zen Mode is active, force fullscreen for terminal, and ensure it's not minimized
            const isFullscreen = (zenMode && appType === 'terminal') ? true : fullscreenWindows[appType];
            
            return (
              <AppWindow
                key={appType}
                title={title}
                onClose={() => {
                   if (zenMode && appType === 'terminal') {
                     setZenMode(false);
                   }
                   closeWindow(appType);
                }}
                onMinimize={() => minimizeWindow(appType)}
                onToggleFullscreen={(appType === 'contact' || appType === 'tetris') ? undefined : () => toggleFullscreen(appType)}
                fullscreen={isFullscreen}
                minimized={isMinimized}
                origin={dockOrigins[appType] || undefined}
                zIndex={zBase + orderIndex}
                // Hide window controls if in Zen Mode and pass explicit style overrides for terminal
                hideTitleBar={zenMode && appType === 'terminal'}
                borderColor={appType === 'terminal' ? "#3f3f46" : undefined} // zinc-700 for distinct border, or match standard
                backgroundColor={appType === 'terminal' ? "#09090b" : undefined} // zinc-950 for terminal background
                
                initialSize={
                  appType === 'tetris' ? { width: Math.min(420, width * 0.9), height: Math.min(560, height * 0.85) } : 
                  undefined
                }
                hidePadding={appType === 'tetris' || (appType === 'terminal')} // Terminal handles its own padding
                disableMinimize={zenMode} // Cannot minimize in Zen Mode
              >
                {render()}
              </AppWindow>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
