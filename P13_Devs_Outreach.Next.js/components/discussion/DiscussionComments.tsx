import CommentItem from "@/components/posts/CommentItem"

export default function DiscussionComments({ post }: { post: any }) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">
        Discussion ({post.comments.length})
      </h3>

      <div className="space-y-4">
        {post.comments.map((comment: any) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </section>
  )
}
