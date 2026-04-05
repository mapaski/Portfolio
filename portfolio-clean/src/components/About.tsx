import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Avatar from "./Avatar";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Avatar Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <Avatar 
            size="lg" 
            pose={isInView ? "thinking" : "idle"} 
            message={isInView ? "I'm a BTech student in Pune, but my roots are in Mumbai and UP." : ""}
          />
          <div className="glass-panel p-6 rounded-3xl comic-border">
            <h3 className="text-xl font-bold font-display text-indigo-400 mb-2">Origins</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Raised in the bustling energy of Mumbai, with deep roots in the cultural heritage of Uttar Pradesh. Now navigating the tech landscape of Pune.
            </p>
          </div>
        </motion.div>

        {/* Narrative Column */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight">
              THE <span className="text-indigo-500">STORY</span>
            </h2>
            <div className="w-20 h-2 bg-indigo-500 rounded-full" />
          </div>

          <div className="space-y-6 text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
            <p>
              I'm a BTech Computer Science student, but thats not all I am learning. I am a student of life. I have always moved from one hobby to another, some stuck, some left behind as phases and very recently I found the right word for it. <span className="text-white font-bold tracking-widest uppercase">POLYMATH</span>
            </p>
            <p>
              My mind is a hybrid of logic and creativity. One moment I'm debugging a React component, the next I'm analyzing the cinematography of a classic film or learning about something completely new.
            </p>
            <p>
              I have been through countless musical instruments(my favourite happens to be Harmonica), I have tried photography and many other things and I take pride in how I keep pushing to be better both emotionally and intellectually.
            </p>
            <p className="italic text-zinc-500">
              "I have downs, I have ups. Everyone does, I just hope all of us find it in ourselves to learn from the downs, and sore high in the ups."
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {["Economics", "Psychology", "Cinema", "Harmonica", "Photography", "Cooking"].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-zinc-800/20 rounded-full"
        />
      </div>
    </section>
  );
}
