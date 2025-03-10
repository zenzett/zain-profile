"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, ExternalLink, Github, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ThreeDCard } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectsSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  inView: boolean;
  useMinimalAnimations?: boolean | null;
}

const ProjectsSection = ({ sectionRef, inView, useMinimalAnimations = false }: ProjectsSectionProps) => {
  const [activeTab, setActiveTab] = useState("professional");

  // Professional projects data
  const professionalProjects = [
    {
      title: "Muhajirien Klik",
      description: "A comprehensive web platform for educational foundation management, handling teacher, parent, student, and employee data with integrated payment features for school fees.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "Redux", "API Integration", "User Authentication", "Responsive Design"],
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Senyum Dashboard",
      description: "An internal administrative dashboard enabling staff to manage customer submissions, handle unit pairings, and manually approve or reject customer applications.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "API Integration", "User Authentication"],
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Senyum Tenaga Pemasar",
      description: "A webview application designed for marketers and surveyors to efficiently find potential customers and assist them in accessing Senyum product services.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "Redux", "WebView", "API Integration", "User Authentication", "Responsive Design"],
      icon: <ExternalLink className="h-5 w-5" />,
    },
    {
      title: "Senyum Web Payment",
      description: "A transactional web platform facilitating payment processes for Senyum products with secure payment gateway integration.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "WebView", "API Integration", "User Authentication", "Responsive Design"],
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Senyum Mobile App",
      description: "A customer-facing Android application providing direct access to Senyum products and services with an intuitive user interface.",
      tags: ["React Native", "TypeScript", "Tailwind CSS", "Redux", "Android", "API Integration", "User Authentication"],
      icon: <ExternalLink className="h-5 w-5" />,
    },
  ];

  // Personal projects data
  const personalProjects = [
    {
      title: "Flixflop",
      description: "A movie discovery platform showcasing current and upcoming films with categorization and search functionality, powered by TMDB API.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "TMDB API", "Responsive Design"],
      github: "#",
      demo: "#",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      title: "Pokemon Catch",
      description: "An interactive Pokemon-themed web application featuring Pokemon listings, detailed profiles, and a mini-game for catching Pokemon, powered by Pokemon API.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "Pokemon API", "Responsive Design"],
      github: "#",
      demo: "#",
      icon: <Lightbulb className="h-5 w-5" />,
    },
  ];

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

  return (
    <section id="projects" ref={sectionRef} className="py-24 scroll-mt-16 relative">
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
        <h2 className="text-3xl font-bold tracking-tight font-mono text-primary">Projects</h2>
      </motion.div>

      <Tabs defaultValue="professional" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted/50 backdrop-blur-sm border border-primary/20">
          <TabsTrigger value="professional" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-mono transition-all duration-300">
            Professional
          </TabsTrigger>
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-mono transition-all duration-300">
            Personal
          </TabsTrigger>
        </TabsList>

        {/* Professional Projects */}
        <TabsContent value="professional" className="space-y-6">
          <motion.div initial="hidden" animate={inView && activeTab === "professional" ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalProjects.map((project, index) => (
              <motion.div key={project.title} variants={item}>
                <ThreeDCard className="h-full cyber-card" glareOpacity={0.1} tiltDegree={useMinimalAnimations ? 0 : 5} disabled={useMinimalAnimations}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-primary/10 mr-3 text-primary border border-primary/30">{project.icon}</div>
                        <h3 className="text-xl font-bold font-mono">{project.title}</h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* Personal Projects */}
        <TabsContent value="personal" className="space-y-6">
          <motion.div initial="hidden" animate={inView && activeTab === "personal" ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalProjects.map((project, index) => (
              <motion.div key={project.title} variants={item}>
                <ThreeDCard className="h-full cyber-card" glareOpacity={0.1} tiltDegree={useMinimalAnimations ? 0 : 5} disabled={useMinimalAnimations}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-primary/10 mr-3 text-primary border border-primary/30">{project.icon}</div>
                        <h3 className="text-xl font-bold font-mono">{project.title}</h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Button variant="outline" size="sm" asChild className="border-primary/20 hover:border-primary/50">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <Github className="h-4 w-4 mr-2" />
                          <span className="font-mono">GitHub</span>
                        </Link>
                      </Button>
                      <Button size="sm" asChild className="bg-primary/80 hover:bg-primary">
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          <span className="font-mono">Live Demo</span>
                        </Link>
                      </Button>
                    </div>
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

export default ProjectsSection;
