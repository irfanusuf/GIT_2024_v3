import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} devs_outreach</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </footer>
  )
}
