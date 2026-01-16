// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden border-b">
//       <div className="mx-auto max-w-6xl px-6 py-28 text-center">
//         <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//           devs_outreach
//         </h1>

//         <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
//           A social media platform built exclusively for developers to connect,
//           share projects, discuss ideas, and grow together.
//         </p>

//         <div className="mt-10 flex justify-center gap-4">
//           <Button size="lg" asChild>
//             <Link href="/user/register">Get Started</Link>
//           </Button>
    
//           <Button size="lg" variant="outline" asChild>
//             <Link href="/explore">Explore</Link>
//           </Button>
//         </div>

//         {/* Subtle background grid */}
//         <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2933_1px,transparent_1px)] bg-[size:16px_16px]" />
//       </div>
//     </section>
//   )
// }


"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CodeBackground from "./CodeBackground"
import ThemeToggle from "@/components/theme/ThemeToggle"

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b">


      
      <CodeBackground />

 
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="mx-auto max-w-6xl px-6 py-28 text-center"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          devs_outreach
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          A social platform where developers connect, share real work,
          and grow together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/user/register">Get Started</Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/explore">Explore</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
