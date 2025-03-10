"use client";

import { motion } from "framer-motion";
import { Check, Github, Linkedin, Mail, Phone, Terminal } from "lucide-react";
import Link from "next/link";

import Toaster from "@/components/atoms/toaster"; // Import Toaster
import { ParallaxSection } from "@/components/ui/parallax-section";
import useClipboard from "@/hooks/use-clipboard";

interface FooterProps {
  useMinimalAnimations?: boolean | null;
}

const Footer = ({ useMinimalAnimations = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [clipboard, setClipboard] = useClipboard("zainazharul@gmail.com");

  // Use simplified animations for minimal mode
  const motionProps = useMinimalAnimations
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0.1 },
      }
    : {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 },
      };

  return (
    <footer className="py-10 px-12 relative overflow-hidden border-t border-primary/20">
      <div className="absolute inset-0 bg-muted/30 backdrop-blur-sm -z-10"></div>

      {/* Decorative elements - only show if not using minimal animations */}
      {!useMinimalAnimations && (
        <ParallaxSection className="absolute inset-0 -z-10 overflow-hidden" speed={0.1} direction="up">
          <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-[0.03]"></div>
        </ParallaxSection>
      )}

      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div {...motionProps} className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <span className="font-medium font-mono">Ahmad_Zain</span>
        </motion.div>

        <p className="flex flex-col items-center md:items-start gap-2 text-sm text-muted-foreground font-mono">© {currentYear} Ahmad Zain A F. All rights reserved.</p>

        <div className="flex gap-4">
          <button onClick={setClipboard} className="text-muted-foreground hover:text-primary transition-colors relative group" aria-label="Copy Email">
            {clipboard ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
            <span className={`absolute -bottom-1 left-0 right-0 h-px bg-primary ${useMinimalAnimations ? "opacity-0 group-hover:opacity-100" : "scale-x-0 group-hover:scale-x-100 transition-transform origin-left"}`}></span>
          </button>
          <Link href="https://www.linkedin.com/in/ahmad-zain-af/" className="text-muted-foreground hover:text-primary transition-colors relative group" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
            <span className={`absolute -bottom-1 left-0 right-0 h-px bg-primary ${useMinimalAnimations ? "opacity-0 group-hover:opacity-100" : "scale-x-0 group-hover:scale-x-100 transition-transform origin-left"}`}></span>
          </Link>
          <Link href="https://github.com/zenzett" className="text-muted-foreground hover:text-primary transition-colors relative group" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5" />
            <span className={`absolute -bottom-1 left-0 right-0 h-px bg-primary ${useMinimalAnimations ? "opacity-0 group-hover:opacity-100" : "scale-x-0 group-hover:scale-x-100 transition-transform origin-left"}`}></span>
          </Link>
          <Link href="tel:+6281288018935" className="text-muted-foreground hover:text-primary transition-colors relative group" aria-label="Phone">
            <Phone className="h-5 w-5" />
            <span className={`absolute -bottom-1 left-0 right-0 h-px bg-primary ${useMinimalAnimations ? "opacity-0 group-hover:opacity-100" : "scale-x-0 group-hover:scale-x-100 transition-transform origin-left"}`}></span>
          </Link>
        </div>
      </div>

      <Toaster />
    </footer>
  );
};

export default Footer;
