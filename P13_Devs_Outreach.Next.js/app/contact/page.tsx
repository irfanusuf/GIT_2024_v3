import type { Metadata } from "next"
import ContactForm from "./ContactForm"
import ThemeToggle from "@/components/theme/ThemeToggle"

export const metadata: Metadata = {
  title: "Contact • devs_outreach",
  description:
    "Contact devs_outreach — a social media platform built for developers. Reach out for support, feedback, or collaboration.",
  keywords: [
    "devs_outreach",
    "developer social media",
    "contact developers platform",
    "tech community contact",
  ],
}

export default function ContactPage() {
  return (
<>
     <ThemeToggle/>
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

    <main className="mx-auto max-w-5xl px-6 py-12 space-y-16">
      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl">
          Have a question, feedback, or partnership idea?  
          We’d love to hear from fellow developers.
        </p>
      </header>

      {/* Content Grid */}
      <section className="grid gap-12 md:grid-cols-2">
        {/* Contact Info + Map */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Our Office</h2>
            <p className="text-muted-foreground">
              devs_outreach HQ  
              <br />
              Bengaluru, India
            </p>
            <p className="text-muted-foreground">
              📧 support@devsoutreach.com
            </p>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border">
            <iframe
              title="devs_outreach location"
              src="https://www.google.com/maps?q=Bengaluru&output=embed"
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Contact Form (Client Component) */}
        <ContactForm />
      </section>
    </main>

    </>
  )
}
