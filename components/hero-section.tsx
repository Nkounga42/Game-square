import { Button } from "@/components/ui/button"
import { Play, Download, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 bg-[url('/gaming-setup-dark-atmosphere.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative container px-4 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Découvrez les
                <span className="text-primary block">meilleurs jeux</span>
                du moment
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Téléchargez instantanément une collection premium de jeux vidéo. Des blockbusters aux pépites
                indépendantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                <Download className="h-5 w-5 mr-2" />
                Commencer
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Play className="h-5 w-5 mr-2" />
                Voir la démo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>4.9/5 étoiles</span>
              </div>
              <div>+50,000 téléchargements</div>
              <div>Gratuit</div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
              <img
                src="/modern-gaming-interface-dashboard.jpg"
                alt="Interface de jeu moderne"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
