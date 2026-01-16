// components/posts/PostActions.tsx
"use client"

import { Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { Context } from "@/app/Store"
import { Post } from "@/lib/types"


type PostActionsProps = {
  post : Post ,
  setopenCommentDrawer : (open : boolean) => void 
  setopenLikesDrawer : (open : boolean) => void

}


export default function PostActions({ post, setopenCommentDrawer , setopenLikesDrawer} : PostActionsProps ) {


 const {likeApi} = useContext(Context) as {likeApi : (postId : string) => Promise<boolean>}



  return (
    <div className="flex items-center  px-2">


    
        <Button className="cursor-pointer" variant="ghost" size="icon" onClick={()=>likeApi(post._id)}>
          <Heart className="h-5 w-5" />
        </Button>

        <span className="text-sm text-muted-foreground " onClick={()=>{setopenLikesDrawer(true)}}>
          {post.likes.length} likes
        </span>

     

      <div className="flex items-center  cursor-pointer" onClick={()=>{setopenCommentDrawer(true)}}>
        <Button variant="ghost" size="icon" >
          <MessageCircle className="h-5 w-5" />
        </Button>

        <span className="text-sm text-muted-foreground">
          {post.comments.length} discussions
        </span>
      </div>


    </div>
  )
}
