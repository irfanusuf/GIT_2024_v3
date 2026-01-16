import { Badge } from "@/components/ui/badge"

export default function DiscussionTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          #{tag}
        </Badge>
      ))}
    </div>
  )
}
