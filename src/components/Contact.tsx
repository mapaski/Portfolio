import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Avatar from "./Avatar";
import { Mail, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <footer id="contact" ref={ref} className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden border-t border-zinc-900">
      <div className="max-w-6xl mx-auto w-full space-y-16">

        {/* Top section: left col + avatar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left column */}
          <div className="space-y-8 text-center md:text-left">

            <div className="space-y-4">
              <h2 className="text-5xl md:text-8xl font-black font-display tracking-tight">
                LET'S <span className="text-indigo-500 text-gradient">CONNECT</span>
              </h2>
              <p className="text-xl text-zinc-400 font-medium max-w-xl mx-auto md:mx-0">
                Whether it's about code, cinema, or a swimming race—I'm always up for a conversation.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {[
                { icon: Mail, label: "Email", href: "mailto:manaswimis29@gmail.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/mapaski" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/mapaski" },
              ].map((social) => (
                
                  key={social.label}
                  href={social.href}
                  className="group flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-indigo-500 transition-all"
                >
                  <social.icon className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                  <span className="text-sm font-bold font-display uppercase tracking-widest">{social.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="mt-10 w-full max-w-xl space-y-6">
              <div className="flex flex-col">
                <label className="text-sm text-zinc-400 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-zinc-400 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-white resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {}}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold uppercase tracking-wider transition-colors"
              >
                Send Message
              </button>
            </div>

          </div>
          {/* End left column */}

          {/* Right column: Avatar */}
          <Avatar
            size="lg"
            pose="playful"
            message={isInView ? "Thanks for stopping by! Let's build something cool." : ""}
          />

        </div>
        {/* End top section */}

        {/* Footer bar */}
        <div className="pt-16 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
          <p>© 2026 Manaswi Mishra. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
          </div>
          <p>Designed with curiosity.</p>
        </div>

      </div>

      {/* Background Accents */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>
    </footer>
  );
}
