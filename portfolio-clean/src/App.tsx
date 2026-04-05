/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Interests from "./components/Interests";
import Projects from "./components/Projects";
import Playground from "./components/Playground";
import Future from "./components/Future";
import Contact from "./components/Contact";
import Avatar, { AvatarPose } from "./components/Avatar";

export default function App() {
  const { scrollYProgress } = useScroll();
  const [avatarPose, setAvatarPose] = useState<AvatarPose>("idle");
  const [avatarMessage, setAvatarMessage] = useState("");

  // Smooth scroll progress for the avatar's movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Avatar movement logic
  const avatarX = useTransform(smoothProgress, [0, 1], ["5%", "85%"]);
  const avatarY = useTransform(smoothProgress, [0, 1], ["85%", "85%"]);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (v < 0.05) {
        setAvatarPose("energetic");
        setAvatarMessage("Buckle up! We're starting.");
      } else if (v < 0.15) {
        setAvatarPose("fourthWall");
        setAvatarMessage("Wait, are you still reading? Nice.");
      } else if (v < 0.25) {
        setAvatarPose("thinking");
        setAvatarMessage("Deep thoughts... or just thinking about lunch.");
      } else if (v < 0.4) {
        setAvatarPose("playful");
        setAvatarMessage("Don't get lost in my interests!");
      } else if (v < 0.55) {
        setAvatarPose("wink");
        setAvatarMessage("I actually wrote this code. I think.");
      } else if (v < 0.7) {
        setAvatarPose("playful");
        setAvatarMessage("Click something! I'm bored.");
      } else if (v < 0.9) {
        setAvatarPose("reflective");
        setAvatarMessage("The future is scary. But cool.");
      } else {
        setAvatarPose("fourthWall");
        setAvatarMessage("You reached the end. Hire me?");
      }
    });
  }, [scrollYProgress]);

  return (
    <main className="relative bg-zinc-950 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Avatar Guide */}
      <motion.div
        style={{ left: avatarX, top: avatarY }}
        className="fixed z-[90] pointer-events-none hidden md:block"
      >
        <Avatar 
          size="sm" 
          pose={avatarPose} 
          message={avatarMessage}
          className="drop-shadow-[0_0_20px_rgba(79,70,229,0.3)]"
        />
      </motion.div>

      {/* Sections */}
      <Hero />
      <About />
      <Interests />
      <Projects />
      <Playground />
      <Future />
      <Contact />

      {/* Navigation Overlay (Optional) */}
      <nav className="fixed top-8 right-8 z-[100] flex gap-4">
        <div className="glass-panel px-6 py-3 rounded-full comic-border flex gap-6 text-xs font-bold font-display uppercase tracking-widest">
          <a href="#" className="hover:text-indigo-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-indigo-400 transition-colors">Story</a>
          <a href="#projects" className="hover:text-indigo-400 transition-colors">Work</a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
        </div>
      </nav>
    </main>
  );
}
