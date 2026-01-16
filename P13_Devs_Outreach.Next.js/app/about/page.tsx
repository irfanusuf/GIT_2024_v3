// export default function LegalPage() {
//   return (
//     <main className="mx-auto max-w-4xl px-6 py-12 space-y-16">
//       {/* Header */}
//       <header className="space-y-3">
//         <h1 className="text-3xl font-bold">Legal & Platform Policies</h1>
//         <p className="text-muted-foreground">
//           devs_outreach is built for developers. Transparency and trust matter to us.
//         </p>
//       </header>

//       {/* Privacy Policy */}
//       <section id="privacy" className="space-y-4">
//         <h2 className="text-2xl font-semibold">Privacy Policy</h2>

//         <p>
//           At <strong>devs_outreach</strong>, we respect your privacy. This platform
//           is designed for developers to connect, share work, and collaborate —
//           not to exploit personal data.
//         </p>

//         <ul className="list-disc pl-6 space-y-2">
//           <li>
//             We collect only necessary information such as username, email,
//             profile details, and content you voluntarily share.
//           </li>
//           <li>
//             Passwords are securely hashed and never stored in plain text.
//           </li>
//           <li>
//             We do not sell, trade, or rent your personal data to third parties.
//           </li>
//           <li>
//             Uploaded content (posts, comments, profile info) is visible according
//             to platform features.
//           </li>
//           <li>
//             Cookies may be used for authentication, session management, and
//             performance improvements.
//           </li>
//         </ul>

//         <p>
//           By using devs_outreach, you agree to this data usage strictly for
//           platform functionality and improvement.
//         </p>
//       </section>

//       {/* Terms & Conditions */}
//       <section id="terms" className="space-y-4">
//         <h2 className="text-2xl font-semibold">Terms & Conditions</h2>

//         <p>
//           By accessing or using <strong>devs_outreach</strong>, you agree to comply
//           with the following terms:
//         </p>

//         <ul className="list-disc pl-6 space-y-2">
//           <li>
//             You are responsible for the content you post, including code,
//             comments, images, and links.
//           </li>
//           <li>
//             Do not post harmful, abusive, illegal, or misleading content.
//           </li>
//           <li>
//             Spam, impersonation, or misuse of the platform may result in account
//             suspension or banning.
//           </li>
//           <li>
//             Reported content may be reviewed and removed at our discretion.
//           </li>
//           <li>
//             devs_outreach is provided “as is” without warranties of any kind.
//           </li>
//         </ul>

//         <p>
//           We reserve the right to update these terms as the platform evolves.
//           Continued use implies acceptance of updated terms.
//         </p>
//       </section>

//       {/* Contact */}
//       <section id="contact" className="space-y-4">
//         <h2 className="text-2xl font-semibold">Contact</h2>

//         <p>
//           Have questions, feedback, or want to report an issue?  
//           We’d love to hear from you.
//         </p>

//         <ul className="space-y-2">
//           <li>
//             📧 Email:{" "}
//             <a
//               href="mailto:support@devsoutreach.com"
//               className="text-primary hover:underline"
//             >
//               support@devsoutreach.com
//             </a>
//           </li>
//           <li>🌐 Platform: devs_outreach</li>
//           <li>👨‍💻 Built by developers, for developers</li>
//         </ul>
//       </section>

//       {/* Footer Note */}
//       <footer className="border-t pt-6 text-sm text-muted-foreground">
//         © {new Date().getFullYear()} devs_outreach. All rights reserved.
//       </footer>
//     </main>
//   )
// }


import ThemeToggle from "@/components/theme/ThemeToggle"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us • devs_outreach",
  description:
    "Learn about devs_outreach — a social media platform built by developers, for developers.",
}

export default function AboutPage() {
  return (
    <main className="space-y-24">
      <ThemeToggle/>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-24">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-6">
          <h1 className="text-5xl font-bold">
            Built for Developers.  
            <span className="block text-primary">Powered by Community.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            devs_outreach is a social platform where developers share ideas,
            projects, discussions, and real-world engineering experiences.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            To create the most authentic developer community where learning,
            collaboration, and professional growth happen organically — without
            noise, clickbait, or shallow engagement.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Empower developers to showcase their work, discuss engineering
            challenges, and build meaningful connections across the tech
            ecosystem.
          </p>
        </div>
      </section>

      {/* Platform Metrics */}
      <section className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Developers", value: "1k+" },
          { label: "Discussions", value: "2k+" },
          { label: "Projects Shared", value: "100+" },
          { label: "Countries", value: "3+" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border p-6 text-center"
          >
            <p className="text-3xl font-bold">{item.value}</p>
            <p className="text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-5xl px-6 space-y-6">
        <h2 className="text-3xl font-semibold text-center">
          Built With Modern Technology
        </h2>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> */}
         <div className="flex justify-center gap-6 flex-wrap">
          {["Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind", "Cloudinary"].map(
            (tech) => (
              <div
                key={tech}
                className="rounded-lg border p-4 text-center font-medium"
              >
                {tech}
              </div>
            )
          )}
        </div>
      </section>

      {/* Closing */}
      <section className="text-center px-6 pb-24">
        <h2 className="text-3xl font-semibold">
          Developers deserve better platforms.
        </h2>
        <p className="mt-3 text-muted-foreground">
          devs_outreach is our step towards building one.
        </p>
      </section>
    </main>
  )
}
