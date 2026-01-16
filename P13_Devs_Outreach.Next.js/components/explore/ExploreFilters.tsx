"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const filters = ["Latest", "Trending", "Following"]

export default function ExploreFilters() {
  const [active, setActive] = useState("Latest")

  return (
    <div className="border-b">
      <div className="mx-auto max-w-4xl px-4 py-3 flex gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            size="sm"
            variant={active === filter ? "default" : "outline"}
            onClick={() => setActive(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  )
}
