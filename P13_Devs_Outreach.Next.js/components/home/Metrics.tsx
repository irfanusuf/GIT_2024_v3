"use client"

import { motion } from "framer-motion"

const metrics = [
  { label: "Developers", value: 12000 },
  { label: "Posts Shared", value: 48000 },
  { label: "Projects Showcased", value: 8200 },
  { label: "Communities Built", value: 320 },
]

export default function Metrics() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold">
              {m.value.toLocaleString()}+
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
