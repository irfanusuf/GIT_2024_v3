import DiscussionTags from "./DiscussionTags"
import DiscussionLinks from "./DiscussionLinks"

export default function DiscussionContent({ post }: { post: any }) {
  return (
    <article className="space-y-6">
      {/* Tags */}
      {post.tags && <DiscussionTags tags={post.tags} />}

      {/* Caption */}
      <p className="text-base leading-relaxed">
        {post.postCaption}
      </p>

      {/* Code Block */}
      {post.code && (
        <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
          <code>{post.code}</code>
        </pre>
      )}

      {/* Image */}
      {post.postPicUrl && (
        <img
          src={post.postPicUrl}
          alt="Post"
          className="rounded-lg border"
        />
      )}

      {/* Links */}
      {post.links && <DiscussionLinks links={post.links} />}
    </article>
  )
}
