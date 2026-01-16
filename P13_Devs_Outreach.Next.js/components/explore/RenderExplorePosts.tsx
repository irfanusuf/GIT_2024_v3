import ExplorePostCard from "./ExplorePostCard"

export default function RenderExplorePosts({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No posts to explore yet 🚀
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <ExplorePostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
