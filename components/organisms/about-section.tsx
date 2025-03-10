"use client";

import type React from "react";

import { motion } from "framer-motion";
import { User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ParallaxSection } from "@/components/ui/parallax-section";
import RevealText from "@/components/ui/reveal-text";

interface AboutSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  inView: boolean;
  useMinimalAnimations?: boolean | null;
}

const AboutSection = ({ sectionRef, inView, useMinimalAnimations = false }: AboutSectionProps) => {
  return (
    <section id="about" ref={sectionRef} className="py-24 scroll-mt-16 relative">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="flex items-center gap-2 mb-8"
      >
        <div className="relative">
          <User className="h-6 w-6 text-primary relative z-10" />
          <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm"></div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-mono text-primary">About_Me</h2>
      </motion.div>

      {useMinimalAnimations ? (
        <Card className="cyber-card terminal-section pt-8 overflow-visible">
          <CardContent className="p-4 md:p-6 relative">
            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-primary/50"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-primary/50"></div>

            <RevealText className="text-muted-foreground leading-relaxed font-mono text-sm">A passionate Software Engineer with proven expertise in designing efficient, scalable, and user-focused applications, driven to translate complex business needs into innovative digital solutions. With my experience in software development, I am adept at translating complex requirements into seamless digital experiences. I thrive in collaborative environments, consistently delivering high-quality solutions that meet evolving business needs. My expertise in agile methodologies, coupled with a strong foundation in API integration and CI/CD, enables me to contribute effectively to cross-functional teams and drive successful project outcomes.</RevealText>

            {/* Code lines */}
            <div className="mt-6 space-y-2 overflow-hidden">
              {[{ code: "const skills = ['React', 'TypeScript', 'Next.js'];" }, { code: "const passion = 'Building beautiful user interfaces';" }, { code: "const goal = 'Creating impactful digital experiences';" }].map((item, index) => (
                <div key={item.code} className="font-mono text-xs text-primary/70 bg-muted/30 p-2 rounded-sm">
                  {item.code}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <ParallaxSection speed={0.05} direction="up">
          <Card className="cyber-card terminal-section pt-8 overflow-visible">
            <CardContent className="p-4 md:p-6 relative">
              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-primary/50"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-primary/50"></div>

              <RevealText className="text-muted-foreground leading-relaxed font-mono text-sm">A passionate Software Engineer with proven expertise in designing efficient, scalable, and user-focused applications, driven to translate complex business needs into innovative digital solutions. With my experience in software development, I am adept at translating complex requirements into seamless digital experiences. I thrive in collaborative environments, consistently delivering high-quality solutions that meet evolving business needs. My expertise in agile methodologies, coupled with a strong foundation in API integration and CI/CD, enables me to contribute effectively to cross-functional teams and drive successful project outcomes.</RevealText>

              {/* Animated code lines */}
              <div className="mt-6 space-y-2 overflow-hidden">
                {[
                  { delay: 0.1, code: "const skills = ['React.js', 'Next.js', 'React Native', 'TypeScript',];" },
                  { delay: 0.2, code: "const passion = 'Building beautiful user interfaces';" },
                  { delay: 0.3, code: "const goal = 'Creating impactful digital experiences';" },
                ].map((item, index) => (
                  <motion.div key={item.code} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.5, delay: item.delay }} className="font-mono text-xs text-primary/70 bg-muted/30 p-2 rounded-sm">
                    {item.code}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ParallaxSection>
      )}
    </section>
  );
};

export default AboutSection;
