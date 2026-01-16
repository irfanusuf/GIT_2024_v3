import React from 'react'
import { Github, MessageSquare, PlusSquare, Video } from "lucide-react";
import { Button } from '@/components/ui/button';

const QuickActions = () => {
    return (


        <div className="ml-1 mb-6 flex w-fit flex-wrap gap-3">
            <Button
                variant="outline"
                size="sm"
                className="group flex items-center gap-2 border-blue-500/30 bg-blue-500/5 text-blue-600 hover:bg-blue-500/10"
            >
                <PlusSquare className="h-4 w-4 group-hover:scale-110 transition" />
                Create Post
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="group flex items-center gap-2 border-pink-500/30 bg-pink-500/5 text-pink-600 hover:bg-pink-500/10"
            >
                <Video className="h-4 w-4 group-hover:scale-110 transition" />
                Create Reel
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="group flex items-center gap-2 border-emerald-500/30 bg-emerald-500/5 text-emerald-600 hover:bg-emerald-500/10"
            >
                <Github className="h-4 w-4 group-hover:scale-110 transition" />
                Create Repo
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="group flex items-center gap-2 border-violet-500/30 bg-violet-500/5 text-violet-600 hover:bg-violet-500/10"
            >
                <MessageSquare className="h-4 w-4 group-hover:scale-110 transition" />
                Start Discussion
            </Button>
        </div>

    )
}

export default QuickActions