"use client";

import type React from "react";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ParallaxSection } from "@/components/ui/parallax-section";
import RevealText from "@/components/ui/reveal-text";

interface EducationSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  inView: boolean;
  useMinimalAnimations?: boolean | null;
}

const EducationSection = ({ sectionRef, inView, useMinimalAnimations }: EducationSectionProps) => {
  return (
    <section id="education" ref={sectionRef} className="py-24 scroll-mt-16 relative">
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
          <GraduationCap className="h-6 w-6 text-primary relative z-10" />
          <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm"></div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-mono text-primary">Education</h2>
      </motion.div>

      <ParallaxSection speed={0.05} direction="up">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }}>
          <Card className="cyber-card terminal-section pt-8 overflow-visible">
            <CardContent className="p-6 relative">
              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-primary/50"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-primary/50"></div>

              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <RevealText delay={0.1}>
                  <div>
                    <h3 className="text-xl font-bold font-mono">Bachelor of Computer Science, Information Systems</h3>
                    <p className="text-primary font-medium font-mono">GUNADARMA UNIVERSITY</p>
                  </div>
                </RevealText>
                <RevealText delay={0.2}>
                  <div className="text-sm text-muted-foreground mt-2 md:mt-0 md:text-right">
                    <p className="text-primary font-semibold font-mono">Graduated in December 2020</p>
                    <p>Depok, ID</p>
                  </div>
                </RevealText>
              </div>

              <RevealText delay={0.3}>
                <div className="bg-muted/30 rounded-sm p-6 backdrop-blur-sm border border-primary/20 relative">
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-primary"
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      boxShadow: ["0 0 0 rgba(var(--primary), 0)", "0 0 8px rgba(var(--primary), 0.5)", "0 0 0 rgba(var(--primary), 0)"],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <h4 className="font-medium text-primary mb-3 font-mono">Projects & Achievements</h4>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                    <li>Made a 2D animated video of "Situ Bagendit" folklore (2018)</li>
                    <li>Made a Location-Based Service Android application that is useful for finding middle-to-lower class stationery and printing stores in Depok Dua (2020)</li>
                  </ul>
                </div>
              </RevealText>

              {/* Animated code lines */}
              <div className="mt-6 space-y-2 overflow-hidden">
                {[
                  { delay: 0.4, code: "class Education extends Knowledge {" },
                  { delay: 0.5, code: "  constructor() {" },
                  { delay: 0.6, code: "    super();" },
                  { delay: 0.7, code: "    this.degree = 'Computer Science';" },
                  { delay: 0.8, code: "    this.university = 'Gunadarma';" },
                  { delay: 0.9, code: "  }" },
                  { delay: 1.0, code: "}" },
                ].map((item, index) => (
                  <motion.div key={item.code} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.5, delay: item.delay }} className="font-mono text-xs text-primary/70 bg-muted/30 p-2 rounded-sm">
                    {item.code}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </ParallaxSection>
    </section>
  );
};

export default EducationSection;
