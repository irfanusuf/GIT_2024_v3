"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="absolute top-3 right-20  flex items-center z-20 ">

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

    </div>

  )
}
