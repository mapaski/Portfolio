import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Avatar from "./Avatar";
import { ExternalLink, Github, Code2, Database, Layout, Smartphone } from "lucide-react";

const projects = [
  { 
    id: "p1", 
    title: "TrustSentinel", 
    category: "Security", 
    icon: Database, 
    color: "from-emerald-500 to-teal-500", 
    desc: "Security system for banks.",
    link: "https://github.com/ruushhdaa/TrustSentinel"
  },
  { 
    id: "p2", 
    title: "Shuri", 
    category: "Development", 
    icon: Layout, 
    color: "from-red-500 to-orange-500", 
    desc: "Security system for IoTs.",
    link: "https://github.com/mapaski/shuri"
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="projects" ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-black font-display tracking-tight">
              KEY <span className="text-indigo-500">PROJECTS</span>
            </h2>
            <p className="text-xl text-zinc-400 font-medium max-w-xl">
              Where code meets creativity. A selection of my technical work.
            </p>
          </div>
          <Avatar 
            size="md" 
            pose={isInView ? "wink" : "pointing"} 
            message={isInView ? "Yeah, I actually built these. No magic involved. (Mostly)" : ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative glass-panel p-8 rounded-[40px] comic-border overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${project.color} comic-border`}>
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-3xl font-black font-display tracking-tight group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {["React", "TypeScript", "Tailwind"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-full text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
