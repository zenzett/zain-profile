"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import Toaster from "@/components/atoms/toaster";
import AboutSection from "@/components/organisms/about-section";
import CertificationsSection from "@/components/organisms/certifications-section";
import ContactSection from "@/components/organisms/contact-section";
import EducationSection from "@/components/organisms/education-section";
import ExperienceSection from "@/components/organisms/experience-section";
import Footer from "@/components/organisms/footer";
import Header from "@/components/organisms/header";
import HeroSection from "@/components/organisms/hero-section";
import ProjectsSection from "@/components/organisms/projects-section";
import SkillsSection from "@/components/organisms/skills-section";
import { useAnimationPerformance } from "@/hooks/use-animation-performance";

const SectionSkeleton = () => (
  <div className="w-full min-h-[300px] py-24 flex items-center justify-center">
    <div className="h-8 w-48 bg-muted/50 rounded-sm mb-8 animate-pulse"></div>
    <div className="space-y-4">
      <div className="h-24 bg-muted/30 rounded-sm animate-pulse"></div>
      <div className="h-24 bg-muted/30 rounded-sm animate-pulse"></div>
    </div>
  </div>
);

// Example of lazy load sections for better performance
// const ExperienceSection = lazy(() => import("@/components/sections/experience-section"));

// Example of dynamic import (similar to lazy loading)
// const ExperienceSection = dynamic(() => import("@/components/sections/experience-section"), {
//   ssr: false, // Optional: Prevents it from being loaded on the server
//   loading: () => <SectionSkeleton />, // Uses your skeleton while loading
// });

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const { useMinimalAnimations } = useAnimationPerformance();

  // Refs for each section
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Section animation refs with IntersectionObserver
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [experienceRef, experienceInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [educationRef, educationInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [certificationsRef, certificationsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Handle scroll events with throttling for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(currentScrollY);

          // Determine which section is currently in view
          const currentPosition = currentScrollY + 100;

          Object.entries(sectionRefs).forEach(([section, ref]) => {
            if (ref.current) {
              const element = ref.current;
              const offsetTop = element.offsetTop;
              const height = element.offsetHeight;

              if (currentPosition >= offsetTop && currentPosition < offsetTop + height) {
                setActiveSection(section);
              }
            }
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    // Use passive scrolling for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Connect InView refs to section refs
  useEffect(() => {
    const aboutEl = sectionRefs.about.current;
    const skillsEl = sectionRefs.skills.current;
    const projectsEl = sectionRefs.projects.current;
    const experienceEl = sectionRefs.experience.current;
    const educationEl = sectionRefs.education.current;
    const certificationsEl = sectionRefs.certifications.current;
    const contactEl = sectionRefs.contact.current;

    if (aboutEl) aboutRef(aboutEl);
    if (skillsEl) skillsRef(skillsEl);
    if (projectsEl) projectsRef(projectsEl);
    if (experienceEl) experienceRef(experienceEl);
    if (educationEl) educationRef(educationEl);
    if (certificationsEl) certificationsRef(certificationsEl);
    if (contactEl) contactRef(contactEl);
  }, [aboutRef, skillsRef, projectsRef, experienceRef, educationRef, certificationsRef, contactRef, sectionRefs.about, sectionRefs.skills, sectionRefs.projects, sectionRefs.experience, sectionRefs.education, sectionRefs.certifications, sectionRefs.contact]);

  return (
    <div className="min-h-screen bg-background relative scanline">
      <Toaster />

      {/* Background decorative elements - simplified for performance */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-[0.05]"></div>
        {!useMinimalAnimations && (
          <>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
          </>
        )}
      </div>

      {/* Header */}
      <Header activeSection={activeSection} scrollY={scrollY} useMinimalAnimations={useMinimalAnimations} />

      <main className="container py-10">
        {/* Hero Section - pass scrollY to control scroll down visibility */}
        <HeroSection sectionRef={sectionRefs.hero} useMinimalAnimations={useMinimalAnimations} scrollY={scrollY} />

        {/* About Section */}
        {/* <Suspense fallback={<SectionSkeleton />}> */}
        <AboutSection sectionRef={sectionRefs.about} inView={aboutInView} useMinimalAnimations={useMinimalAnimations} />
        {/* </Suspense> */}

        {/* Skills Section */}
        {/* <Suspense fallback={<SectionSkeleton />}> */}
        <SkillsSection sectionRef={sectionRefs.skills} inView={skillsInView} useMinimalAnimations={useMinimalAnimations} />
        {/* </Suspense> */}

        {/* Projects Section */}
        {/* <Suspense fallback={<SectionSkeleton />}> */}
        <ProjectsSection sectionRef={sectionRefs.projects} inView={projectsInView} useMinimalAnimations={useMinimalAnimations} />
        {/* </Suspense> */}

        {/* Experience Section */}
        {/* <Suspense fallback={<SectionSkeleton />}> */}
        <ExperienceSection sectionRef={sectionRefs.experience} inView={experienceInView} useMinimalAnimations={useMinimalAnimations} />
        {/* </Suspense> */}

        {/* Education Section */}
        {/* <Suspense fallback={<SectionSkeleton />}> */}
        <EducationSection sectionRef={sectionRefs.education} inView={educationInView} useMinimalAnimations={useMinimalAnimations} />
        {/* </Suspense> */}

        {/* Certifications Section */}
        {/* <Suspense fallback={<SectionSkeleton />}> */}
        <CertificationsSection sectionRef={sectionRefs.certifications} inView={certificationsInView} useMinimalAnimations={useMinimalAnimations} />
        {/* </Suspense> */}

        {/* Contact Section */}
        {/* <Suspense fallback={<SectionSkeleton />}> */}
        <ContactSection sectionRef={sectionRefs.contact} inView={contactInView} useMinimalAnimations={useMinimalAnimations} />
        {/* </Suspense> */}
      </main>

      {/* Footer */}
      <Footer useMinimalAnimations={useMinimalAnimations} />

      {/* Scroll to top button - simplified */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-6 p-3 rounded-sm bg-primary text-primary-foreground 
                 hover:bg-primary/90 transition-colors z-50"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
