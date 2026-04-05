import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Avatar from "./Avatar";
import { Book, Film, Brain, TrendingUp, Scissors, Utensils, Plane, Code, Map, Gamepad2 } from "lucide-react";

const interests = [
  { id: "code", title: "Computer Science", icon: Code, color: "bg-indigo-500", desc: "Currently pursuing BTech in MIT Academy of Engineering, Alandi. Building my future one step at a time." },
  { id: "economics", title: "Economics", icon: TrendingUp, color: "bg-emerald-500", desc: "The invisible hand that shapes our reality. I love analyzing market trends and behavioral economics. On top of that I aspire to integrate it in my current stream." },
  { id: "psychology", title: "Psychology and neuro science", icon: Brain, color: "bg-purple-500", desc: "Understanding the 'why' behind human behavior and the insides of their neural receptors. Growing up social norms always confused me and I still cant understand why someone behaves the way they do. But psychology helps anchor that. Someday I want to work on brain-computer interface (BCI)." },
  { id: "cinema", title: "Cinema", icon: Film, color: "bg-red-500", desc: "Visual storytelling that transcends borders. I'm fascinated by cinematography and Screen writting The big screen shines something behind my eyes I cant explain....not yet." },
  { id: "reading", title: "Reading and Writting", icon: Book, color: "bg-blue-500", desc: "Political literature and philosophical essays. Literature has been my longest partner and I plan to keep it that way." },
  { id: "cooking", title: "Cooking", icon: Utensils, color: "bg-orange-500", desc: "A creative playground where chemistry meets art. I love experimenting with flavors and textures. AND as much as I love to cook I enjoy hosting." },
  { id: "travel", title: "Travel", icon: Map, color: "bg-sky-500", desc: "I dream to be bunny but without the settling down, I wanna travel make friends and feel at home everywhere I go." },
  { id: "gaming", title: "Gaming", icon: Gamepad2, color: "bg-pink-500", desc: "The lockdown introduced me to one of my longest hobbies and it has stayed ever since. I wanna use my degree's teachings to make games some day." },
  { id: "aviation", title: "Aviation", icon: Plane, color: "bg-zinc-500", desc: "A former aspiration that still lingers. The dream of navigating the skies is never truly gone. I might fly someday." },
];

export default function Interests() {
  const [activeInterest, setActiveInterest] = useState(interests[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Calculate avatar position based on active interest
  const activeIndex = interests.findIndex(i => i.id === activeInterest.id);
  const angle = (activeIndex / interests.length) * 2 * Math.PI;
  const radius = 160;
  const avatarX = Math.cos(angle) * radius * 0.6; // Move avatar closer to the node
  const avatarY = Math.sin(angle) * radius * 0.6;

  return (
    <section id="interests" ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-8xl font-black font-display tracking-tight">
            INTEREST <span className="text-indigo-500">UNIVERSE</span>
          </h2>
          <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
            A map of my curiosities. Click to explore each planet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <div className="relative aspect-square max-w-md mx-auto w-full flex items-center justify-center">
            {/* Central Avatar that moves */}
            <motion.div
              animate={{ x: avatarX, y: avatarY }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="z-20 absolute"
            >
              <Avatar 
                size="md" 
                pose="playful" 
                message={isInView ? `Exploring ${activeInterest.title}...` : ""}
              />
            </motion.div>

            {/* Orbiting Interests */}
            {interests.map((interest, index) => {
              const angle = (index / interests.length) * 2 * Math.PI;
              const radius = 160; // radius of the orbit
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={interest.id}
                  onClick={() => setActiveInterest(interest)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1, x, y } : {}}
                  whileHover={{ scale: 1.2 }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                  className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 border-black comic-border z-10 transition-colors ${
                    activeInterest.id === interest.id ? interest.color : "bg-zinc-900 text-zinc-400"
                  }`}
                >
                  <interest.icon className="w-6 h-6 md:w-8 md:h-8" />
                </motion.button>
              );
            })}

            {/* Orbit Lines */}
            <div className="absolute inset-0 border-2 border-zinc-800/30 rounded-full scale-[0.8]" />
            <div className="absolute inset-0 border-2 border-zinc-800/30 rounded-full scale-[0.5]" />
          </div>

          {/* Interest Detail */}
          <motion.div 
            key={activeInterest.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 md:p-12 rounded-[40px] comic-border space-y-6"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activeInterest.color} comic-border`}>
              <activeInterest.icon className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-black font-display tracking-tight">
                {activeInterest.title}
              </h3>
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                {activeInterest.desc}
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Polymath Explorer</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
