"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import PostActions from "./PostActions";
import { useState } from "react";
import CommentsDrawer from "./CommentsDrawer";

export default function PostCard({ post }: { post: any }) {
  const [openCommentDrawer, setopenCommentDrawer] = useState<boolean>(false);
  const [openLikesDrawer, setopenLikesDrawer] = useState<boolean>(false);

  return (
    <>
      <Card className="rounded-sm border bg-background shadow-sm py-0 pb-4 gap-2">
        {/* Header */}
        {/* <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              src={post.userId.profilePic || "/avatar.png"}
              alt="User"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-sm">
              @{post.userId.username}
            </span>
          </div>

          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div> */}

        {/* Image */}
        {post.postPicUrl && (
          <div className="relative aspect-square bg-muted rounded-xl">
            <Image
              src={post.postPicUrl}
              alt="Post"
              fill
              className="object-cover rounded-sm"
              unoptimized
            />
          </div>
        )}

        {/* Actions */}

        <PostActions
          setopenCommentDrawer={setopenCommentDrawer}
          setopenLikesDrawer={setopenLikesDrawer}
          post={post}
        />

        {/* Caption */}
        {post.postCaption && (
          <div className="px-4  text-sm">
            <span className="font-medium mr-1">@{post.userId.username}</span>
            {post.postCaption}
          </div>
        )}
      </Card>

      {/* Comments Drawer */}
      <CommentsDrawer
        post={post}
        open={openCommentDrawer}
        onClose={() => setopenCommentDrawer(false)}
      />
    </>
  );
}
