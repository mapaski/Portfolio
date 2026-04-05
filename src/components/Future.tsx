import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Avatar from "./Avatar";
import { Code, Rocket, Sparkles, Map } from "lucide-react";

export default function Future() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-8xl font-black font-display tracking-tight">
            OPEN <span className="text-indigo-500">PATHS</span>
          </h2>
          <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
            The future is a canvas. I'm still painting the first strokes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            <Avatar 
              size="lg" 
              pose={isInView ? "reflective" : "idle"} 
              message={isInView ? "I'm still becoming. And that's exactly what makes me powerful." : ""}
            />
          </motion.div>

          <div className="space-y-8">
            {[
              { icon: Code, title: "Software Developer", desc: "Building elegant solutions and mastering the craft of software engineering. One line of code at a time." },
              { icon: Rocket, title: "Entrepreneur", desc: "I wanna start something of my own. Turning ideas into reality and building a legacy from scratch." },
              { icon: Map, title: "The Unknown Future", desc: "I'm currently exploring my identity, ambition, and direction. The path isn't clear, but it's exciting." },
            ].map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="glass-panel p-8 rounded-3xl comic-border space-y-4 group hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-900 comic-border group-hover:rotate-12 transition-transform">
                    <path.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-black font-display tracking-tight group-hover:text-indigo-400 transition-colors">
                    {path.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {path.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center pt-12"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-indigo-500 text-white rounded-full font-black font-display text-xl comic-border hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="w-6 h-6" />
            <span>POLYMATH IN PROGRESS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
