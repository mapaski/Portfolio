import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Sparkles, MousePointer2, Zap } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function Playground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayful, setIsPlayful] = useState(false);

  const colors = ["bg-indigo-500", "bg-pink-500", "bg-yellow-400", "bg-emerald-500", "bg-purple-500"];

  const spawnParticle = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    const newParticle: Particle = {
      id: Date.now(),
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 40 + 20,
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);
    setIsPlayful(true);
  };

  useEffect(() => {
    if (isPlayful) {
      const timer = setTimeout(() => setIsPlayful(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlayful]);

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-8xl font-black font-display tracking-tight">
            THE <span className="text-indigo-500">PLAYGROUND</span>
          </h2>
          <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
            A digital sandbox. Click or tap anywhere to create some chaos.
          </p>
        </div>

        <div 
          ref={containerRef}
          onMouseDown={spawnParticle}
          className="relative w-full h-[500px] glass-panel rounded-[60px] comic-border overflow-hidden cursor-crosshair bg-zinc-900/30"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(circle, #4f46e5 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Avatar in the middle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Avatar 
              size="md" 
              pose={isPlayful ? "playful" : "idle"} 
              message={isPlayful ? "Wheee! More!" : "Come on, click something!"}
              className="z-20"
            />
          </div>

          {/* Particles */}
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
                animate={{ opacity: 1, scale: 1, y: p.y - p.size / 2 + 100 }}
                exit={{ opacity: 0, scale: 0, y: p.y - p.size / 2 + 200 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute rounded-full comic-border ${p.color}`}
                style={{ width: p.size, height: p.size }}
              />
            ))}
          </AnimatePresence>

          {/* Instructions */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-zinc-500 font-mono text-xs uppercase tracking-widest pointer-events-none">
            <MousePointer2 className="w-4 h-4" />
            <span>Click to spawn particles</span>
            <div className="w-1 h-4 bg-zinc-800" />
            <Zap className="w-4 h-4" />
            <span>Physics enabled</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "Creative Chaos", desc: "I believe in the power of play to unlock new ideas." },
            { icon: Zap, title: "Fast Iteration", desc: "Building, breaking, and rebuilding is my favorite loop." },
            { icon: MousePointer2, title: "Interactive Design", desc: "UI should be felt, not just seen." },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl comic-border space-y-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-900 comic-border">
                <item.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold font-display">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
