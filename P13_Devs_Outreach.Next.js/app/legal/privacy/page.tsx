import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy • devs_outreach",
  description:
    "Detailed privacy policy explaining how devs_outreach collects, uses, and protects user data.",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>

      <p className="text-muted-foreground">
        At devs_outreach, privacy is not an afterthought — it is a core
        principle.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account information (username, email, password hash)</li>
          <li>Profile data (bio, profile picture)</li>
          <li>User-generated content (posts, comments, code)</li>
          <li>Usage data (interactions, likes, follows)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. How We Use Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To operate and improve the platform</li>
          <li>To personalize user experience</li>
          <li>To ensure security and prevent abuse</li>
          <li>To communicate important updates</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Data Security</h2>
        <p>
          We implement industry-standard security practices including password
          hashing, access controls, and infrastructure-level protections.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Cookies</h2>
        <p>
          Cookies are used for authentication, session persistence, and
          performance analytics. You can control cookies via browser settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
        <p>
          We may use trusted third-party services (e.g., cloud storage,
          analytics) strictly for platform functionality.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your data</li>
          <li>Request deletion</li>
          <li>Update profile information</li>
        </ul>
      </section>

      <footer className="border-t pt-6 text-sm text-muted-foreground">
        Last updated: {new Date().toDateString()}
      </footer>
    </main>
  )
}
