"use client";

import { useEffect, useState } from "react";

import { useAnimationPerformance } from "@/hooks/use-animation-performance";
import { cn } from "@/lib/utils";

interface TerminalTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  showCursor?: boolean;
  startDelay?: number;
  onComplete?: () => void;
}

const TerminalText = ({ text, className, typingSpeed = 50, showCursor = true, startDelay = 0, onComplete }: TerminalTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { enabled, useSimplifiedEffects } = useAnimationPerformance();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // If animations are disabled, show the full text immediately
    if (!enabled) {
      setDisplayText(text);
      setCurrentIndex(text.length);
      if (onComplete) {
        timeout = setTimeout(onComplete, 100);
      }
      return () => clearTimeout(timeout);
    }

    // Adjust typing speed based on performance level
    const effectiveTypingSpeed = useSimplifiedEffects ? typingSpeed * 0.5 : typingSpeed;

    if (startDelay > 0 && !isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
      return () => clearTimeout(timeout);
    }

    if (isTyping && currentIndex < text.length) {
      // Type faster for better performance on mobile
      const charsPerTick = useSimplifiedEffects ? 3 : 1;

      timeout = setTimeout(() => {
        const nextIndex = Math.min(currentIndex + charsPerTick, text.length);
        setDisplayText(text.substring(0, nextIndex));
        setCurrentIndex(nextIndex);
      }, effectiveTypingSpeed);
    } else if (isTyping && currentIndex >= text.length && onComplete) {
      timeout = setTimeout(() => {
        onComplete();
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, onComplete, startDelay, text, typingSpeed, enabled, useSimplifiedEffects]);

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
      {showCursor && isTyping && currentIndex < text.length && enabled && <span className="inline-block w-2 h-4 bg-primary animate-blink"></span>}
    </span>
  );
};

export default TerminalText;
