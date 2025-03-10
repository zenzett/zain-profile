"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/atoms/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ModeToggleProps {
  useMinimalAnimations?: boolean | null;
}

const ModeToggle = ({ useMinimalAnimations = false }: ModeToggleProps) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-primary/20 bg-background/50 backdrop-blur-sm">
          <Sun className={`h-[1.2rem] w-[1.2rem] ${useMinimalAnimations ? "dark:hidden" : "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}`} />
          <Moon className={`${useMinimalAnimations ? "hidden dark:block" : "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-md border-primary/20">
        <DropdownMenuItem onClick={() => setTheme("light")} className="font-mono">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="font-mono">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="font-mono">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
