export default function CodeBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <pre className="absolute top-10 left-10 text-xs text-muted-foreground opacity-30 animate-pulse">
{`const connect = () => {
  return devs_outreach.connect({
    developers: true,
    ideas: true,
    growth: true,
  })
}`}
      </pre>

      <pre className="absolute bottom-10 right-10 text-xs text-muted-foreground opacity-30 animate-pulse delay-500">
{`npm install devs_outreach
yarn add devs_outreach

// build together`}
      </pre>
    </div>
  )
}
