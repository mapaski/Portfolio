import { motion, useScroll, useTransform } from "motion/react";
import Avatar from "./Avatar";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Text Animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
        <motion.h1 
          className="text-[20vw] font-black font-display whitespace-nowrap leading-none"
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          MANASWI MISHRA
        </motion.h1>
        <motion.h1 
          className="text-[20vw] font-black font-display whitespace-nowrap leading-none"
          animate={{ x: ["10%", "-10%", "10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          MANASWI MISHRA
        </motion.h1>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <Avatar 
          size="lg" 
          pose="energetic" 
          message="Hey! I'm Manaswi. Ready for a tour?"
          className="mb-8"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-5xl md:text-8xl font-black font-display tracking-tight">
            POLYMATH <span className="text-indigo-500">IN PROGRESS</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto">
            Explorer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-transparent rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 blur-[120px] rounded-full" />
    </section>
  );
}
