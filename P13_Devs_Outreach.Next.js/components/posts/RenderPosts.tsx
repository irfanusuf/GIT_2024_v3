// components/posts/RenderPosts.tsx
"use client"

import PostCard from "./PostCard"

interface RenderPostsProps {
  posts: any[]
  layout?: "grid" | "feed"
}

export default function RenderPosts({ posts, layout = "grid" }: RenderPostsProps) {

  if (!posts.length) {
    return (
      <p className="text-center text-muted-foreground mt-10">
        No posts yet
      </p>
    )
  }

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 gap-1 md:grid-cols-3"
          : "flex flex-col gap-6"
      }
    >
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
