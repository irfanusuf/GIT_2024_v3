"use client"

import { useParams } from "next/navigation"

import DiscussionHeader from "@/components/discussion/DiscussionHeader"
import DiscussionContent from "@/components/discussion/DiscussionContent"
import DiscussionComments from "@/components/discussion/DiscussionComments"
import { useContext } from "react"
import { Post } from "@/lib/types"
import { Context } from "@/app/Store"

export default function DiscussionPage() {
  const { postId } = useParams()


  const {explorePosts} = useContext(Context) as {explorePosts: Post[]}

  const post = explorePosts.find((p) => p._id === postId)

  if (!post) {
    return <p className="text-center mt-10">Discussion not found</p>
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <DiscussionHeader post={post} />
      <DiscussionContent post={post} />
      <DiscussionComments post={post} />
    </main>
  )
}
