"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderPosts from "@/components/posts/RenderPosts";
import { useContext, useEffect } from "react";
import { Context } from "@/app/Store";
import { Post, UserProfile } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import QuickActions from "./QuickActions";
import ThemeToggle from "@/components/theme/ThemeToggle";


export default function ProfilePage() {
  const params = useParams() as { username?: string };
  const username = params?.username ?? "";
  const router = useRouter();

  const { user, userPosts, loggedInUserID , fetchUserDetails, fetchUserPosts  , verifyUserApi} = useContext(Context) as {
    user: UserProfile;
    userPosts: Post[];
    loggedInUserID : string
    fetchUserDetails: (username: string) => Promise<string>;
    fetchUserPosts: (userId: string) => void;
    verifyUserApi : ()=>void
  };



  useEffect(()=>{
    verifyUserApi()
  }, [])



  useEffect(() => {
    (async () => {
      const userId = await fetchUserDetails(username);
      if (userId) {
        fetchUserPosts(userId);
      } else {
        router.push("/explore");
      }
    })();
  }, [fetchUserDetails, fetchUserPosts]);




  return (

    <>
      <ThemeToggle/>
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex justify-center md:w-1/3">
          <div className="relative h-36 w-36 overflow-hidden rounded-full border">
            <Image
              src={user.profilePic || "/avatar.png"}
              alt="Profile Pic"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">@{user.username}</h2>
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <span>
              <strong>{user.posts && user.posts.length}</strong> posts
            </span>
            <span>
              <strong>{user.followers && user.followers.length}</strong>{" "}
              followers
            </span>
            <span>
              <strong>{user.following && user.following.length}</strong>{" "}
              following
            </span>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="max-w-md text-sm text-muted-foreground">{user.bio}</p>
          )}
        </div>
      </div>

      <Separator className="my-8" />


      {loggedInUserID === user._id && <QuickActions/>}


      {/* Tabs */} 
      <Tabs defaultValue="posts" className="min-h-96">
        <TabsList className="mx-auto flex w-fit">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="tagged">Tagged</TabsTrigger>
        </TabsList>

        {/* Posts Grid */}

        <TabsContent value="posts">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <RenderPosts posts={userPosts} />
          </div>
        </TabsContent>

        <TabsContent value="stories">
          <p className="text-center text-muted-foreground  px-4 py-6 mt-10">
            Stories expire in 24 hours
          </p>
        </TabsContent>

        <TabsContent value="tagged">
          <p className="text-center text-muted-foreground px-4 py-6 mt-10">
            No tagged posts
          </p>
        </TabsContent>
      </Tabs>
    </div>

    </>

  );
}
