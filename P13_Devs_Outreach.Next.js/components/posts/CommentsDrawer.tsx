"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Image from "next/image"
import CommentItem from "./CommentItem"


export default function CommentsDrawer({
  post,
  open,
  onClose,
}: {
  post: any
  open: boolean
  onClose: () => void
}) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[420px] p-0">
        {/* Post Preview */}

        
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <Image
              src={post.userId.profilePic || "/avatar.png"}
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium text-sm">
              @{post.userId.username}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {post.postCaption}
          </p>
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {post.comments.map((comment: any) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>

        {/* Add Comment */}
        <div className="border-t p-3">
          <input
            placeholder="Add a comment..."
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
