"use client"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

export default function CommentItem({ comment }: { comment: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(comment.text)

  return (
    <div className="space-y-1">
      <div className="flex justify-between gap-2">
        <div>
          <span className="font-medium text-sm">
            @{comment.userId.username}
          </span>
          {!isEditing ? (
            <p className="text-sm">{comment.text}</p>
          ) : (
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
            />
          )}
        </div>

        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex gap-3 text-xs text-muted-foreground">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="text-red-500">Delete</button>
        <button>Reply</button>
        <button>Report</button>
      </div>

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="ml-4 border-l pl-3 space-y-2">
          {comment.replies.map((reply: any) => (
            <CommentItem key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  )
}
