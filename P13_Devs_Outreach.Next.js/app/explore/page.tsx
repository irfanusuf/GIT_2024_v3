"use client"

import ExploreFilters from "@/components/explore/ExploreFilters"
import { Context } from "../Store"
import { useContext, useEffect } from "react"
import { Post } from "@/lib/types"
import RenderExplorePosts from "@/components/explore/RenderExplorePosts"
import RenderPosts from "@/components/posts/RenderPosts"
import Header from "@/components/layout/Header"


export default function ExplorePage() {


  const {explorePosts , fetchExplorePosts} = useContext(Context) as {
    explorePosts : Post[] 
    fetchExplorePosts : () => void
  }


  useEffect(()=>{
        fetchExplorePosts()
  },[])

  return (
    <main className="min-h-screen bg-background">

      <Header heading="Explore" punchline="Discover what developers are building" link="Home" href="/"/>


      <ExploreFilters />
      <div className="mx-auto max-w-4xl px-4 py-6 min-h-screen">
        {/* <RenderPosts posts={explorePosts} layout="feed" />/ */}
        <RenderExplorePosts posts={explorePosts} />
      </div>
    </main>
  )
}
