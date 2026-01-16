"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // TODO: connect to API / server action
    await new Promise((res) => setTimeout(res, 1000))

    setLoading(false)
    e.currentTarget.reset()
    alert("Message sent successfully!")
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold">Send a message</h2>

        <Input
          name="name"
          placeholder="Your name"
          required
        />

        <Input
          name="email"
          type="email"
          placeholder="Your email"
          required
        />

        <Textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  )
}
