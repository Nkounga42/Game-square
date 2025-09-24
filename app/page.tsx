import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GamesList } from "@/components/games-list"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <GamesList />
      </main>
      <Footer />
    </div>
  )
}
