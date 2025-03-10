"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

import { ThreeDCard } from "@/components/ui/3d-card";
import { Card, CardContent } from "@/components/ui/card";

interface CertificationsSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  inView: boolean;
  useMinimalAnimations?: boolean | null;
}

const CertificationsSection = ({ sectionRef, inView, useMinimalAnimations }: CertificationsSectionProps) => {
  const certifications = ["Front End Bootcamp with React and TypeScript (Issued by Alterra Academy Mar 2023).", "Automated Testing with Katalon Studio (Issued by Hacktiv8 Jul 2022).", "Back End Development with Java (Issued by Hacktiv8 Jun 2022).", "Basic Programming Using React (Issued by Enigma Mar 2021).", "One Day Coding (Issued by Skilvul Jan 2021).", "Oracle Project (Issued by Lepkom Aug 2020).", "SQL Server For Intermediate (Issued by Lepkom Jul 2018).", "Oracle For Intermediate (Issued by Lepkom Mar 2018).", "SQL Server For Beginner (Issued by Lepkom Oct 2017).", "Oracle For Beginner (Issued by Lepkom Feb 2017).", "Fundamental Web Programming (Issued by Lepkom Aug 2016).", "Fundamental DBMS (Issued by Lepkom Feb 2016)."];

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
    <section id="certifications" ref={sectionRef} className="py-24 scroll-mt-16 relative">
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
          <Award className="h-6 w-6 text-primary relative z-10" />
          <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm"></div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-mono text-primary">Certifications</h2>
      </motion.div>

      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <motion.div key={cert} variants={item}>
            <ThreeDCard className="h-full" glareOpacity={0.1} tiltDegree={5}>
              <Card className="group hover:border-primary/50 transition-all duration-300 hover:bg-primary/5 border border-primary/20 bg-card/50 backdrop-blur-sm cyber-card h-full">
                <CardContent className="p-5 flex items-start gap-3">
                  <div className="relative mt-0.5 shrink-0">
                    <Award className="h-5 w-5 text-primary relative z-10" />
                    <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-mono">{cert}</p>
                </CardContent>
              </Card>
            </ThreeDCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CertificationsSection;
