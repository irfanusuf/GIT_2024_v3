import { Badge } from "@/components/ui/badge"

export default function Community() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Badge variant="secondary">Community First</Badge>

        <h2 className="mt-6 text-3xl font-semibold">
          Where developers actually belong
        </h2>

        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          No fake motivation. No spam. Just real developers sharing real work
          and helping each other grow.
        </p>
      </div>
    </section>
  )
}
