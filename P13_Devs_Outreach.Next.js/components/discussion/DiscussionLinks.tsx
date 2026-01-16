import { ExternalLink } from "lucide-react"

export default function DiscussionLinks({ links }: { links: string[] }) {
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <a
          key={link}
          href={link}
          target="_blank"
          className="flex items-center gap-2 rounded-md border p-3 hover:bg-muted transition"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="truncate text-sm">{link}</span>
        </a>
      ))}
    </div>
  )
}
