// components/posts/CommentsSection.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CommentsSection({ post }: { post: any }) {
  const [comment, setComment] = useState("")

  return (
    <div className="border-t px-3 py-2">
      {/* Existing comments */}
      <div className="space-y-1 text-sm">
        {post.comments.slice(0, 2).map((c: any) => (
          <p key={c._id}>
            <span className="font-medium">
              @{c.userId?.username}
            </span>{" "}
            {c.text}
          </p>
        ))}
      </div>

      {/* Add comment */}
      <div className="mt-2 flex gap-2">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button size="sm">Post</Button>
      </div>
    </div>
  )
}
