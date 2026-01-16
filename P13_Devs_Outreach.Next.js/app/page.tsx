import Community from "@/components/home/Community";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Metrics from "@/components/home/Metrics";
import Header from "@/components/layout/Header";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">


      <Header heading="devs_outreach" punchline="where devs meet"  link="Explore" href="/explore" /> 
      
      <Hero />
      <Metrics/>
      <Features />
      <Community />
   
    </main>
  )
}
