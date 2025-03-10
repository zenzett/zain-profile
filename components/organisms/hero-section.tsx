"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { TerminalText } from "@/components/ui/terminal-text";

interface HeroSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  useMinimalAnimations?: boolean | null;
  scrollY?: number;
}

const HeroSection = ({ sectionRef, useMinimalAnimations = false, scrollY = 0 }: HeroSectionProps) => {
  const [showScrollDown, setShowScrollDown] = useState(true);

  // Hide scroll down text when user scrolls past 100px
  useEffect(() => {
    if (scrollY > 100) {
      setShowScrollDown(false);
    } else {
      setShowScrollDown(true);
    }
  }, [scrollY]);

  // Use simplified animations for minimal mode
  const motionProps = useMinimalAnimations
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0.1 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      };

  return (
    <section id="hero" ref={sectionRef} className="min-h-[90vh] flex flex-col justify-center items-center text-center relative py-12 sm:py-16 md:py-20">
      {/* Background decorative elements - only show if not using minimal animations */}
      {!useMinimalAnimations && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <ParallaxSection className="absolute inset-0" speed={0.1} direction="up">
            <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-[0.05]"></div>
          </ParallaxSection>
          <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: useMinimalAnimations ? 0.2 : 0.5,
          type: "spring",
          stiffness: useMinimalAnimations ? 100 : 90,
        }}
        className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-6 sm:mb-8 rounded-sm overflow-hidden border border-primary/30 p-1 group"
      >
        <div className="w-full h-full overflow-hidden relative">
          <Image src="/letter-z.jpeg?height=150&width=150" alt="Ahmad Zain" fill className={`object-cover ${useMinimalAnimations ? "" : "grayscale group-hover:grayscale-0 transition-all duration-700"}`} priority sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
        </div>
        <div className="absolute inset-0 border border-primary/20 neon-glow"></div>

        {/* Animated corners - only show if not using minimal animations */}
        {!useMinimalAnimations && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-primary"
              animate={{
                opacity: [0.2, 1, 0.2],
                boxShadow: ["0 0 0 rgba(var(--primary), 0)", "0 0 8px rgba(var(--primary), 0.5)", "0 0 0 rgba(var(--primary), 0)"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-primary"
              animate={{
                opacity: [0.2, 1, 0.2],
                boxShadow: ["0 0 0 rgba(var(--primary), 0)", "0 0 8px rgba(var(--primary), 0.5)", "0 0 0 rgba(var(--primary), 0)"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-primary"
              animate={{
                opacity: [0.2, 1, 0.2],
                boxShadow: ["0 0 0 rgba(var(--primary), 0)", "0 0 8px rgba(var(--primary), 0.5)", "0 0 0 rgba(var(--primary), 0)"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-primary"
              animate={{
                opacity: [0.2, 1, 0.2],
                boxShadow: ["0 0 0 rgba(var(--primary), 0)", "0 0 8px rgba(var(--primary), 0.5)", "0 0 0 rgba(var(--primary), 0)"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
            />
          </>
        )}
      </motion.div>

      <motion.h1 {...motionProps} transition={{ duration: useMinimalAnimations ? 0.2 : 0.5, delay: useMinimalAnimations ? 0 : 0.2 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 font-mono px-4">
        {useMinimalAnimations ? <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Ahmad Zain Azharul Falah</span> : <AnimatedGradientText>Ahmad Zain Azharul Falah</AnimatedGradientText>}
      </motion.h1>

      <motion.div {...motionProps} transition={{ duration: useMinimalAnimations ? 0.2 : 0.5, delay: useMinimalAnimations ? 0 : 0.3 }} className="relative">
        <h2 className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6 inline-flex items-center font-mono">
          <span className="relative">
            {useMinimalAnimations ? "Frontend Engineer" : <TerminalText text="Frontend Engineer" typingSpeed={80} />}
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary/50"></span>
          </span>
        </h2>
      </motion.div>

      <motion.div {...motionProps} transition={{ duration: useMinimalAnimations ? 0.2 : 0.5, delay: useMinimalAnimations ? 0 : 0.4 }} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
        <Badge variant="outline" className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 text-xs sm:text-sm">
          <MapPin className="h-3 w-3 text-primary" /> Depok, Indonesia
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 text-xs sm:text-sm">
          <Mail className="h-3 w-3 text-primary" /> zainazharul@gmail.com
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 text-xs sm:text-sm">
          <Phone className="h-3 w-3 text-primary" /> 0812 8801 8935
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-colors duration-300 text-xs sm:text-sm">
          <Linkedin className="h-3 w-3 text-primary" /> LinkedIn
        </Badge>
      </motion.div>

      <motion.div {...motionProps} transition={{ duration: useMinimalAnimations ? 0.2 : 0.5, delay: useMinimalAnimations ? 0 : 0.5 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button asChild className="relative overflow-hidden group bg-primary/80 hover:bg-primary border-primary/50 font-mono">
          <Link href="#contact">
            <span className="relative z-10">Contact Me</span>
            {!useMinimalAnimations && <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>}
          </Link>
        </Button>
        <Button variant="outline" asChild className="relative overflow-hidden group border-primary/30 hover:border-primary/60 hover:bg-primary/10 font-mono">
          <Link href="#experience">
            <span className="relative z-10">View Experience</span>
            {!useMinimalAnimations && <span className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>}
          </Link>
        </Button>
      </motion.div>

      {!useMinimalAnimations && showScrollDown && (
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <Link href="#about" className="inline-flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <span className="text-sm font-mono mb-2">Scroll_Down</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </Link>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
