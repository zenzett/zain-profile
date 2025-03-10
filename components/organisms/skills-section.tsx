"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Code, Cpu, Terminal, Zap } from "lucide-react";
import { useState } from "react";

import { ThreeDCard } from "@/components/ui/3d-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SkillsSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  inView: boolean;
  useMinimalAnimations?: boolean | null;
}

const SkillsSection = ({ sectionRef, inView, useMinimalAnimations }: SkillsSectionProps) => {
  const [activeTab, setActiveTab] = useState("tech");

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  const techSkills = [
    { name: "HTML", icon: <Code className="h-4 w-4" />, level: 95 },
    { name: "CSS", icon: <Code className="h-4 w-4" />, level: 90 },
    { name: "JavaScript", icon: <Terminal className="h-4 w-4" />, level: 92 },
    { name: "TypeScript", icon: <Terminal className="h-4 w-4" />, level: 88 },
    { name: "ReactJs", icon: <Cpu className="h-4 w-4" />, level: 90 },
    { name: "NextJs", icon: <Zap className="h-4 w-4" />, level: 85 },
    { name: "React Native", icon: <Cpu className="h-4 w-4" />, level: 80 },
    { name: "Bootstrap", icon: <Code className="h-4 w-4" />, level: 85 },
    { name: "Tailwind CSS", icon: <Code className="h-4 w-4" />, level: 92 },
    { name: "Figma", icon: <Code className="h-4 w-4" />, level: 75 },
    { name: "Postman", icon: <Terminal className="h-4 w-4" />, level: 80 },
    { name: "Jenkins", icon: <Cpu className="h-4 w-4" />, level: 70 },
    { name: "Git", icon: <Terminal className="h-4 w-4" />, level: 85 },
  ];

  const otherSkills = [
    { name: "Algorithms", icon: <Terminal className="h-4 w-4" />, level: 80 },
    { name: "Component Structure", icon: <Cpu className="h-4 w-4" />, level: 90 },
    { name: "Problem Solving", icon: <Zap className="h-4 w-4" />, level: 85 },
    { name: "Agile Methodologies", icon: <Cpu className="h-4 w-4" />, level: 80 },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 scroll-mt-16 relative">
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
          <Code className="h-6 w-6 text-primary relative z-10" />
          <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm"></div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-mono text-primary">Technical_Skills</h2>
      </motion.div>

      <Tabs defaultValue="tech" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted/50 backdrop-blur-sm border border-primary/20">
          <TabsTrigger value="tech" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-mono transition-all duration-300">
            Tech_Stacks
          </TabsTrigger>
          <TabsTrigger value="other" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-mono transition-all duration-300">
            Other_Skills
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tech" className="space-y-4">
          <motion.div initial="hidden" animate={inView && activeTab === "tech" ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {techSkills.map((skill, index) => (
              <motion.div key={skill.name} variants={item}>
                <ThreeDCard className="group flex flex-col p-4 rounded-sm bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:bg-primary/5 h-full" glareOpacity={0.1} tiltDegree={5}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-muted mr-3 text-primary border border-primary/30 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                    <span className="group-hover:text-primary transition-colors font-mono text-sm">{skill.name}</span>
                  </div>
                  <div className="mt-auto w-full bg-muted/50 h-1.5 rounded-sm overflow-hidden">
                    <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={inView ? { width: typeof skill.level === "number" ? `${skill.level}%` : "0%" } : { width: 0 }} transition={{ duration: 1, delay: index * 0.1 }} />
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="other">
          <motion.div initial="hidden" animate={inView && activeTab === "other" ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {otherSkills.map((skill, index) => (
              <motion.div key={skill.name} variants={item}>
                <ThreeDCard className="group flex flex-col p-4 rounded-sm bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:bg-primary/5 h-full" glareOpacity={0.1} tiltDegree={5}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-muted mr-3 text-primary border border-primary/30 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                    <span className="group-hover:text-primary transition-colors font-mono text-sm">{skill.name}</span>
                  </div>
                  <div className="mt-auto w-full bg-muted/50 h-1.5 rounded-sm overflow-hidden">
                    <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={inView ? { width: typeof skill.level === "number" ? `${skill.level}%` : "0%" } : { width: 0 }} transition={{ duration: 1, delay: index * 0.1 }} />
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SkillsSection;
