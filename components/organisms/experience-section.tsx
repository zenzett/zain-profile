"use client";

import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase } from "lucide-react";

import { ThreeDCard } from "@/components/ui/3d-card";
import { CardContent } from "@/components/ui/card";
import RevealText from "@/components/ui/reveal-text";
import { useAnimationPerformance } from "@/hooks/use-animation-performance";
import { cn } from "@/lib/utils";

interface ExperienceSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  inView: boolean;
  useMinimalAnimations?: boolean | null;
}

const ExperienceSection = ({ sectionRef, inView, useMinimalAnimations }: ExperienceSectionProps) => {
  // Use reduced motion hook for accessibility
  const shouldReduceMotion = useReducedMotion();
  const { performanceLevel } = useAnimationPerformance();

  const experiences = [
    {
      title: "Frontend Engineer",
      company: "PT. BANK RAKYAT INDONESIA TBK",
      location: "Central Jakarta, ID",
      period: "May 2023 – Present",
      description: ["As part of a cross-functional team, I was tasked with developing scalable and efficient front-end solutions for banking applications, ensuring seamless integration with back-end systems under tight deadlines.", "Design and implement reusable components while optimizing the performance and maintainability of front-end codebases to meet organizational and user needs.", "Collaborated with stakeholders to define requirements, delivered highly reusable UI components using React.js, Next.js, React Native, TypeScript, and introduced performance optimizations across multiple projects.", "Improved development efficiency and reduced maintenance efforts across various applications, enhancing user satisfaction and enabling faster feature delivery to align with business goals."],
    },
    {
      title: "Frontend Developer",
      company: "SELARASTECH",
      location: "Jakarta, ID",
      period: "Dec 2022 – May 2023",
      description: ["The client needed a web application to efficiently manage internal data, including student, parent, staff information, and financial transactions.", "Design and develop a user-friendly and scalable web solution to centralize and streamline data management processes.", "Built the application using React.js, TypeScript, and Tailwind CSS, collaborating closely with the client to ensure the system met their specific requirements while implementing best practices for performance and scalability.", "Delivered a responsive web application that simplified internal operations, improved data accessibility, and enhanced the overall user experience for staff and administrators."],
    },
    {
      title: "Rater",
      company: "INDEPENDENT CONTRACTOR",
      location: "ID",
      period: "Mar 2021 – Apr 2022",
      description: ["Social media platforms required a thorough review process to ensure that advertisements and websites adhered to community standards and were free from harmful or inappropriate content.", "Evaluate ads and websites for potential violations, including misleading claims, scams, inappropriate material, child exploitation, and human trafficking risks.", "Conducted detailed reviews of content against predefined guidelines, assessed relevance and safety, and provided feedback to enhance the platform's content moderation system.", "Contributed to maintaining a safer and more trustworthy platform, ensuring compliance with community standards and improving the user experience."],
    },
  ];

  // Simplify animations for low-performance devices
  const shouldUseSimpleLayout = performanceLevel === "low" || shouldReduceMotion;

  return (
    <section id="experience" ref={sectionRef} className="py-16 md:py-24 scroll-mt-16 relative">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="flex items-center gap-2 mb-8 md:mb-12"
      >
        <div className="relative">
          <Briefcase className="h-6 w-6 text-primary relative z-10" />
          <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-mono text-primary">Work_Experience</h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20"></div>

        <div className="space-y-8 md:space-y-12 relative">
          {experiences.map((experience, index) => (
            <motion.div key={experience.title} initial={{ opacity: 0, y: shouldUseSimpleLayout ? 0 : 50 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldUseSimpleLayout ? 0 : 50 }} transition={{ duration: 0.5, delay: shouldUseSimpleLayout ? 0 : index * 0.2 }} className="relative">
              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-sm bg-primary mt-2 shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-bold font-mono">{experience.title}</h3>
                    <p className="text-primary font-medium font-mono">{experience.company}</p>
                    <p className="text-sm text-muted-foreground">{experience.location}</p>
                    <p className="text-sm font-semibold text-primary mt-1 font-mono">{experience.period}</p>
                  </div>
                </div>
                <ThreeDCard className="cyber-card ml-8" glareOpacity={0.1} tiltDegree={0} disabled={shouldUseSimpleLayout}>
                  <CardContent className="p-4">
                    <ul className="list-disc pl-4 space-y-2 text-muted-foreground text-sm">
                      {experience.description.map((item, i) => (
                        <RevealText key={item} delay={shouldUseSimpleLayout ? 0 : i * 0.1} threshold={0.1}>
                          <li>{item}</li>
                        </RevealText>
                      ))}
                    </ul>
                  </CardContent>
                </ThreeDCard>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-start">
                <div className={cn("flex-1", index % 2 === 0 ? "text-right pr-10" : "order-2 pl-10")}>
                  {index % 2 === 0 && (
                    <>
                      <div className="hidden md:block absolute left-1/2 top-0 w-4 h-4 rounded-sm bg-primary z-10 neon-glow -translate-x-1/2"></div>
                      <h3 className="text-xl font-bold font-mono">{experience.title}</h3>
                      <p className="text-primary font-medium font-mono">{experience.company}</p>
                      <p className="text-sm text-muted-foreground">{experience.location}</p>
                      <p className="text-sm font-semibold text-primary mt-1 font-mono">{experience.period}</p>
                    </>
                  )}
                </div>
                <div className={cn("flex-1", index % 2 === 0 ? "pl-10" : "text-right pr-10")}>
                  {index % 2 !== 0 && (
                    <>
                      <div className="hidden md:block absolute left-1/2 top-0 w-4 h-4 rounded-sm bg-primary z-10 neon-glow -translate-x-1/2"></div>
                      <h3 className="text-xl font-bold font-mono">{experience.title}</h3>
                      <p className="text-primary font-medium font-mono">{experience.company}</p>
                      <p className="text-sm text-muted-foreground">{experience.location}</p>
                      <p className="text-sm font-semibold text-primary mt-1 font-mono">{experience.period}</p>
                    </>
                  )}
                  <ThreeDCard className="cyber-card mt-4" glareOpacity={0.1} tiltDegree={shouldUseSimpleLayout ? 0 : 5} disabled={shouldUseSimpleLayout}>
                    <CardContent className="p-4">
                      <ul className="list-disc pl-4 space-y-2 text-muted-foreground text-sm">
                        {experience.description.map((item, i) => (
                          <RevealText key={item} delay={shouldUseSimpleLayout ? 0 : i * 0.1} threshold={0.1} once={true}>
                            <li>{item}</li>
                          </RevealText>
                        ))}
                      </ul>
                    </CardContent>
                  </ThreeDCard>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
