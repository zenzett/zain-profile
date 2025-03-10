"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Terminal, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

import ModeToggle from "@/components/molecules/mode-toggle";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/ui/glitch-text";
import { useAnimationPerformance } from "@/hooks/use-animation-performance";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  activeSection: string;
  scrollY: number;
  useMinimalAnimations?: boolean | null;
}

const Header = ({ activeSection, scrollY, useMinimalAnimations = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const { enabled, duration, useSimplifiedEffects } = useAnimationPerformance();

  const navItems: NavItem[] = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    // { id: "contact", label: "Contact" },
  ];

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkIfMobile, 100);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('[data-menu="true"]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Handle scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
        transition: { duration },
      };

  return (
    <header className={cn("sticky top-0 z-40 w-full transition-all duration-300 hw-accelerate", scrollY > 50 ? "bg-background/80 border-b border-primary/10 backdrop-blur-md" : "bg-transparent")}>
      <div className="container flex h-16 items-center justify-between">
        <motion.div {...motionProps} className="font-mono text-lg sm:text-xl relative z-10">
          <Link href="/" className="flex items-center gap-2 group touch-target">
            <Terminal className="h-5 w-5 text-primary transition-transform group-hover:rotate-3 duration-300" />
            <GlitchText text="Ahmad_Zain" disableEffects={useMinimalAnimations} />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 lg:gap-6">
          {navItems.map((item) => (
            <Link key={item.id} href={`#${item.id}`} className={cn("text-sm font-mono transition-colors relative cyber-underline touch-target", activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
              {item.label}
              {activeSection === item.id && enabled && !useMinimalAnimations && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: useSimplifiedEffects ? 200 : 380,
                    damping: useSimplifiedEffects ? 20 : 30,
                  }}
                />
              )}
              {activeSection === item.id && (useMinimalAnimations || !enabled) && <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <ModeToggle useMinimalAnimations={useMinimalAnimations} />

          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
            <Link href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Get in touch</span>
              <span className="sm:hidden">Contact</span>
            </Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden touch-target"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            data-menu="true"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - optimized animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={useMinimalAnimations ? { opacity: 1, height: 0 } : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "calc(100vh - 4rem)" }} exit={useMinimalAnimations ? { opacity: 1, height: 0 } : { opacity: 0, height: 0 }} transition={{ duration: useMinimalAnimations ? 0.1 : 0.2 }} className="md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-md fixed left-0 right-0 overflow-auto hw-accelerate" data-menu="true">
            <div className="container py-6 flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link key={item.id} href={`#${item.id}`} className={cn("text-lg font-mono py-4 px-4 rounded-sm transition-colors flex items-center", activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50")} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                  {activeSection === item.id && <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary"></span>}
                </Link>
              ))}
              <Button variant="outline" size="lg" asChild className="mt-4 border-primary/20 hover:border-primary/50 hover:bg-primary/10 w-full">
                <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                  <Mail className="mr-2 h-5 w-5" />
                  Get in touch
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
