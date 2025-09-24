import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Download, Star, Search } from "lucide-react"

interface HeroSectionProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedGenre: string
  setSelectedGenre: (genre: string) => void
  selectedPlatform: string
  setSelectedPlatform: (platform: string) => void
  showSuggestions: boolean
  setShowSuggestions: (show: boolean) => void
  suggestions: string[]
  handleFilterChange: () => void
  genres: string[]
  platforms: string[]
}

export function HeroSection({
  searchTerm,
  setSearchTerm, 
  selectedPlatform,
  setSelectedPlatform,
  showSuggestions,
  setShowSuggestions,
  suggestions,
  handleFilterChange, 
  platforms
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden hero-gradient mt-15">
      <div className="absolute inset-0 bg-[url('/gaming-setup-dark-atmosphere.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative container mx-auto max-w-5xl py-20 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Découvrez les
                <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent block">meilleurs jeux</span>
                du moment
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Téléchargez instantanément une collection premium de jeux vidéo. Des blockbusters aux pépites
                indépendantes.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>4.9/5 étoiles</span>
              </div>
              <div>+50,000 téléchargements</div>
              <div>Gratuit</div>
            </div>
            {/* Barre de recherche et filtres */}
           
          </div>

           <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden ">
              <img
                src="/atomic_games.png"
                alt="Interface de jeu moderne"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </div>  
        </div>
      </div>
      <div className="space-y-4 relative container mx-auto max-w-5xl pt-5 pb-20 ">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Recherche avec suggestions */}
                <div className="relative flex-1">
                  <div className="relative">
                    <Search className="absolute z-30 left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Rechercher un jeu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="pl-10 border-border/40 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>

                  {/* Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 backdrop-blur-md border border-border/40 rounded-lg mt-1 z-10 shadow-xl">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-4 py-3 text-white hover:bg-blue-600/20 hover:text-blue-500 first:rounded-t-lg last:rounded-b-lg transition-all duration-150"
                          onClick={() => {
                            setSearchTerm(suggestion)
                            setShowSuggestions(false)
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtres */}
                <div className="flex gap-4"> 
                  <Select
                    value={selectedPlatform}
                    onValueChange={(value) => {
                      setSelectedPlatform(value)
                      handleFilterChange()
                    }}
                  >
                    <SelectTrigger className="w-40 border-border/40 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm">
                      <SelectValue placeholder="Plateforme" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-md bg-transparent border-border/40 shadow-xl">
                      {platforms.map((platform) => (
                        <SelectItem
                          key={platform}
                          value={platform}
                          className="text-white hover:bg-blue-600/20 hover:text-blue-500 focus:bg-blue-600/20 focus:text-blue-500 "
                        >
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

    </section>
  )
}
