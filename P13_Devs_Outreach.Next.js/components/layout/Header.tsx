import { Compass } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
import Link from "next/link";

interface headerProps {
  heading: string;
  punchline: string;
  link: string;
  href: string;
}




export default function Header({heading,punchline,link,  href,}: headerProps) 


{
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between ">

        <div className="flex items-center gap-3">
          {/* <Compass className="h-5 w-5 text-primary" /> */}
          <h1 className="text-lg font-semibold">@{heading}</h1>
          <span className="text-sm text-muted-foreground pt-1">{punchline}</span>
        </div>

        <div className="text-sm">
          <Link href={href}> {link}</Link>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}
