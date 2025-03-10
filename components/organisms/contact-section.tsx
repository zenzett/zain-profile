"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle, Linkedin, Loader2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { ThreeDCard } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RevealText from "@/components/ui/reveal-text";
import useClipboard from "@/hooks/use-clipboard";
import { useToast } from "@/hooks/use-toast";

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  inView: boolean;
  useMinimalAnimations?: boolean | null;
}

const ContactSection = ({ sectionRef, inView, useMinimalAnimations }: ContactSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();
  const [clipboard, setClipboard] = useClipboard("zainazharul@gmail.com");

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFormSubmitted(true);

    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 scroll-mt-16 relative">
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
          <Mail className="h-6 w-6 text-primary relative z-10" />
          <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm"></div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-mono text-primary">Get_In_Touch</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }}>
          <RevealText className="text-muted-foreground mb-6 leading-relaxed font-mono text-sm">I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out to me using any of the following contact methods.</RevealText>
          <div className="space-y-4">
            <ThreeDCard className="w-full" glareOpacity={0.1} tiltDegree={5}>
              <button onClick={setClipboard} className="flex w-full items-center gap-3 p-3 text-primary hover:underline group bg-muted/30 rounded-sm backdrop-blur-sm hover:bg-muted/50 transition-colors duration-300 border border-primary/20 block">
                <div className="relative">
                  {clipboard ? <Check className="h-5 w-5 relative z-10" /> : <Mail className="h-5 w-5 relative z-10" />}
                  {/* <Mail className="h-5 w-5 relative z-10" /> */}
                  <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="font-mono text-sm">{clipboard ? "Email copied!" : "zainazharul@gmail.com"}</span>
              </button>
            </ThreeDCard>

            <ThreeDCard className="w-full" glareOpacity={0.1} tiltDegree={5}>
              <Link href="tel:+6281288018935" className="flex items-center gap-3 p-3 text-primary hover:underline group bg-muted/30 rounded-sm backdrop-blur-sm hover:bg-muted/50 transition-colors duration-300 border border-primary/20 block">
                <div className="relative">
                  <Phone className="h-5 w-5 relative z-10" />
                  <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="font-mono text-sm">0812 8801 8935</span>
              </Link>
            </ThreeDCard>

            <ThreeDCard className="w-full" glareOpacity={0.1} tiltDegree={5}>
              <Link href="https://linkedin.com/in/ahmad-zain-af/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 text-primary hover:underline group bg-muted/30 rounded-sm backdrop-blur-sm hover:bg-muted/50 transition-colors duration-300 border border-primary/20 block">
                <div className="relative">
                  <Linkedin className="h-5 w-5 relative z-10" />
                  <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="font-mono text-sm">LinkedIn</span>
              </Link>
            </ThreeDCard>

            <ThreeDCard className="w-full" glareOpacity={0.1} tiltDegree={5}>
              <div className="flex items-center gap-3 p-3 group bg-muted/30 rounded-sm backdrop-blur-sm border border-primary/20">
                <div className="relative">
                  <MapPin className="h-5 w-5 text-primary relative z-10" />
                  <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="font-mono text-sm">Depok, Indonesia</span>
              </div>
            </ThreeDCard>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }}>
          <Card className="cyber-card terminal-section pt-8">
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium font-mono">
                    Name
                  </label>
                  <input id="name" className="flex h-10 w-full rounded-sm border border-primary/30 bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 font-mono" placeholder="Your name" required disabled={isSubmitting || formSubmitted} />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium font-mono">
                    Email
                  </label>
                  <input id="email" type="email" className="flex h-10 w-full rounded-sm border border-primary/30 bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 font-mono" placeholder="Your email" required disabled={isSubmitting || formSubmitted} />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-medium font-mono">
                    Subject
                  </label>
                  <input id="subject" className="flex h-10 w-full rounded-sm border border-primary/30 bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 font-mono" placeholder="Subject" required disabled={isSubmitting || formSubmitted} />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium font-mono">
                    Message
                  </label>
                  <textarea id="message" className="flex min-h-[120px] w-full rounded-sm border border-primary/30 bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 font-mono" placeholder="Your message" required disabled={isSubmitting || formSubmitted} />
                </div>
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center p-2 bg-primary/10 rounded-sm text-primary font-mono">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Message sent successfully!
                    </motion.div>
                  ) : (
                    <Button type="submit" className="w-full relative overflow-hidden group bg-primary/80 hover:bg-primary border-primary/50 font-mono" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    </Button>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
