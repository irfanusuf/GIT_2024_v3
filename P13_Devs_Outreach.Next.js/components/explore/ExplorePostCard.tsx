"use client"

import Image from "next/image"
import Link from "next/link"
import { MessageSquare, Heart, Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ExplorePostCard({ post }: { post: any }) {



    const router = useRouter()
    return (



        <Card className="rounded-lg border bg-background hover:bg-muted/40 transition">
            <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Image
                        src={post.userId.profilePic || "/avatar.png"}
                        alt="User"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />

                    <div className="flex flex-col">
                        <Link
                            href={`/user/profile/${post.userId.username}`}
                            className="text-sm font-medium hover:underline"
                        >
                            @{post.userId.username}
                        </Link>
                        <span className="text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Caption / Content */}
                {post.postCaption && (
                    <p className="text-sm leading-relaxed line-clamp-4">
                        {post.postCaption}
                    </p>
                )}

                {/* Optional Image (secondary) */}
                {post.postPicUrl && (
                    <div className="relative mt-2 h-100 w-full overflow-hidden rounded-md border">
                        <Image
                            src={post.postPicUrl}
                            alt="Post"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1 text-xs">
                            <Heart className="h-4 w-4" />
                            {post.likes.length}
                        </div>

                        <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments.length}
                        </div>

                        <div className="flex items-center gap-1 text-xs">
                            <Share2 className="h-4 w-4" />
                            {post.shareCount}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/discussion/${post._id}`)}
                    >
                        View discussion →
                    </Button>
                </div>
            </div>
        </Card>
    )
}
