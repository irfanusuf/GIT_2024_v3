import { Code2, Users, MessageSquare, Rocket, Github } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Developer-Centric",
    desc: "Built for developers. No noise, no cringe content, just tech.",
  },
  {
    icon: Users,
    title: "Connect with Devs",
    desc: "Follow developers, collaborate, and grow your network.",
  },
  {
    icon: MessageSquare,
    title: "Meaningful Discussions",
    desc: "Comment, reply, and discuss code, architecture, and ideas.",
  },
  {
    icon: Rocket,
    title: "Showcase Your Work",
    desc: "Share projects, blogs, and experiments with the community.",
  },
  {
    icon: Github,
    title: "Create a Git Repo",
    desc: "Share projects, using Github repo",
  },
]

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-semibold text-center">
        Built for developers, by developers
      </h2>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border bg-card p-6 hover:shadow-md transition"
          >
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
