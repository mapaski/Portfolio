import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export type AvatarPose = "idle" | "thinking" | "energetic" | "playful" | "reflective" | "pointing" | "wink" | "fourthWall";

interface AvatarProps {
  pose?: AvatarPose;
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Avatar({ pose = "idle", message, className = "", size = "md" }: AvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-64 h-64 md:w-80 md:h-80",
  };

  const getPoseStyles = () => {
    switch (pose) {
      case "thinking":
        return { rotate: -5, y: [0, -10, 0] };
      case "energetic":
        return { scale: 1.1, rotate: 5, y: [0, -20, 0] };
      case "playful":
        return { rotate: [0, 10, -10, 0], x: [0, 5, -5, 0] };
      case "pointing":
        return { x: [0, 10, 0], rotate: 2 };
      case "reflective":
        return { opacity: 0.8, scale: 0.95 };
      case "wink":
        return { scale: 1.05, rotate: -2 };
      case "fourthWall":
        return { scale: 1.1, y: -5 };
      default:
        return { y: [0, -5, 0] };
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`relative ${sizeClasses[size]} cursor-pointer`}
        animate={getPoseStyles()}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Duolingo-style Minimalist Avatar */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hair Background (Simple flat shape) */}
          <motion.path
            d="M20 80C20 20 180 20 180 80C180 150 160 180 100 180C40 180 20 150 20 80Z"
            fill="#28052e"
            animate={pose === "energetic" ? { scale: 1.05 } : {}}
          />
          
          {/* Face (Rounded, friendly shape) */}
          <rect x="50" y="60" width="100" height="100" rx="45" fill="#C68642" />

          {/* Piercings Left */}
          <circle cx="50" cy="115" r="2.5" fill="#E5E7EB" />
          <circle cx="50" cy="125" r="2.5" fill="#E5E7EB" />
          
          {/* Piercings Right */}
          <circle cx="150" cy="115" r="2.5" fill="#E5E7EB" />
          <circle cx="150" cy="125" r="2.5" fill="#E5E7EB" />
          
          {/* Hair Front (Simple flat bangs) */}
          <path
            d="M50 60C50 40 150 40 150 60C150 80 130 90 100 90C70 90 50 80 50 60Z"
            fill="#28052e"
          />
          <path
            d="M50 60C50 60 60 95 85 95C110 95 120 75 120 75"
            stroke="#28052e"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Eyebrows (Very expressive in Duolingo style) */}
          <motion.g 
            animate={
              pose === "thinking" ? { y: -5, rotate: -5 } : 
              pose === "energetic" ? { y: -8 } : 
              pose === "wink" ? { y: -2 } : { y: 0 }
            }
          >
            <path d="M65 85 Q75 80 85 85" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M115 85 Q125 80 135 85" stroke="#000" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* Eyes (Large, simple, friendly) */}
          <motion.g animate={pose === "thinking" ? { y: -2 } : {}}>
            {/* Left Eye */}
            <motion.g animate={pose === "wink" ? { scaleY: 0.1, y: 5 } : { scaleY: 1, y: 0 }}>
              <circle cx="75" cy="105" r="10" fill="#000" />
              <circle cx="78" cy="102" r="3" fill="#fff" />
            </motion.g>
            
            {/* Right Eye */}
            <g>
              <circle cx="125" cy="105" r="10" fill="#000" />
              <circle cx="128" cy="102" r="3" fill="#fff" />
            </g>
          </motion.g>

          {/* Mouth (Simple curve) */}
          <motion.path
            d={
              pose === "thinking" 
                ? "M90 140 Q100 135 110 140" 
                : pose === "energetic" || pose === "wink"
                ? "M85 135 Q100 155 115 135" 
                : "M90 135 Q100 145 110 135"
            }
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{ d: (pose === "energetic" || pose === "wink") ? "M85 135 Q100 155 115 135" : "M90 135 Q100 145 110 135" }}
          />
        </svg>

        {/* Floating Elements for "Energetic" or "Thinking" */}
        <AnimatePresence>
          {pose === "thinking" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-4 -right-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold comic-border"
            >
              ?
            </motion.div>
          )}
          {pose === "energetic" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-4 -left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold comic-border"
            >
              !
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="mt-4 bg-white text-zinc-900 px-4 py-2 rounded-2xl relative comic-border max-w-[200px] text-center text-sm font-medium"
          >
            {message}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l-2 border-t-2 border-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
