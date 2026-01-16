import Image from "next/image"
import Link from "next/link"

export default function DiscussionHeader({ post }: { post: any }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={post.userId.profilePic || "/avatar.png"}
        alt="User"
        width={44}
        height={44}
        className="rounded-full"
      />

      <div>
        <Link
          href={`/profile/${post.userId.username}`}
          className="font-medium hover:underline"
        >
          @{post.userId.username}
        </Link>
        <p className="text-xs text-muted-foreground">
          Posted on {new Date(post.createdAt).toDateString()}
        </p>
      </div>
    </div>
  )
}
