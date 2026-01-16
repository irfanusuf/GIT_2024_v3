import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions • devs_outreach",
  description:
    "Terms and conditions governing the use of devs_outreach, a developer-focused social media platform.",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <h1 className="text-4xl font-bold">Terms & Conditions</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>devs_outreach</strong>, you agree to be
          bound by these Terms & Conditions. If you do not agree, you must not
          use the platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. User Accounts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You are responsible for maintaining account security.</li>
          <li>Providing false information may lead to suspension.</li>
          <li>One person may not maintain multiple abusive accounts.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Content Responsibility</h2>
        <p>
          Users retain ownership of their content but grant devs_outreach a
          license to display, distribute, and promote content within the
          platform.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>No illegal, hateful, or misleading content.</li>
          <li>No plagiarism or impersonation.</li>
          <li>Reported content may be reviewed or removed.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these terms without prior notice.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Disclaimer</h2>
        <p>
          devs_outreach is provided “as is” without warranties of any kind. We
          are not liable for any damages arising from platform usage.
        </p>
      </section>

      <footer className="border-t pt-6 text-sm text-muted-foreground">
        Last updated: {new Date().toDateString()}
      </footer>
    </main>
  )
}
