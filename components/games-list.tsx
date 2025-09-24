"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data pour les jeux
const allGames = [
  { id: 1, name: "Cyberpunk 2077", genre: "RPG", platform: "PC", image: "/cyberpunk-futuristic-city-neon.jpg" },
  { id: 2, name: "The Witcher 3", genre: "RPG", platform: "PC", image: "/medieval-fantasy-witcher.jpg" },
  { id: 3, name: "Grand Theft Auto V", genre: "Action", platform: "PC", image: "/gta-city-cars-action.jpg" },
  { id: 4, name: "Red Dead Redemption 2", genre: "Action", platform: "PC", image: "/western-cowboy-horses.jpg" },
  { id: 5, name: "Minecraft", genre: "Sandbox", platform: "PC", image: "/minecraft-blocks-crafting.jpg" },
  { id: 6, name: "Fortnite", genre: "Battle Royale", platform: "PC", image: "/fortnite-battle-royale-colorful.jpg" },
  { id: 7, name: "Call of Duty: Warzone", genre: "FPS", platform: "PC", image: "/call-of-duty-military-warfare.jpg" },
  { id: 8, name: "Valorant", genre: "FPS", platform: "PC", image: "/valorant-tactical-shooter.jpg" },
  {
    id: 9,
    name: "League of Legends",
    genre: "MOBA",
    platform: "PC",
    image: "/league-of-legends-fantasy-champions.jpg",
  },
  {
    id: 10,
    name: "Apex Legends",
    genre: "Battle Royale",
    platform: "PC",
    image: "/apex-legends-futuristic-battle.jpg",
  },
  {
    id: 11,
    name: "Assassin's Creed Valhalla",
    genre: "Action",
    platform: "PC",
    image: "/assassins-creed-viking-norse.jpg",
  },
  { id: 12, name: "FIFA 24", genre: "Sports", platform: "PC", image: "/fifa-football-soccer-stadium.jpg" },
  { id: 13, name: "Elden Ring", genre: "RPG", platform: "PC", image: "/elden-ring-dark-fantasy-souls.jpg" },
  { id: 14, name: "Rocket League", genre: "Sports", platform: "PC", image: "/rocket-league-cars-soccer-arena.jpg" },
  { id: 15, name: "Among Us", genre: "Social", platform: "PC", image: "/among-us-colorful-space-crew.jpg" },
  { id: 16, name: "Fall Guys", genre: "Party", platform: "PC", image: "/placeholder-8nyq9.png" },
  { id: 17, name: "Overwatch 2", genre: "FPS", platform: "PC", image: "/overwatch-heroes-futuristic.jpg" },
  { id: 18, name: "Counter-Strike 2", genre: "FPS", platform: "PC", image: "/placeholder.svg?height=300&width=400" },
  { id: 19, name: "Dota 2", genre: "MOBA", platform: "PC", image: "/placeholder.svg?height=300&width=400" },
  {
    id: 20,
    name: "World of Warcraft",
    genre: "MMORPG",
    platform: "PC",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const genres = [
  "Tous",
  "RPG",
  "Action",
  "FPS",
  "Battle Royale",
  "MOBA",
  "Sports",
  "Sandbox",
  "Social",
  "Party",
  "MMORPG",
]
const platforms = ["Toutes", "PC", "PlayStation", "Xbox", "Nintendo Switch"]

const GAMES_PER_PAGE = 12

export function GamesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("Tous")
  const [selectedPlatform, setSelectedPlatform] = useState("Toutes")
  const [currentPage, setCurrentPage] = useState(1)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Filtrage des jeux
  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === "Tous" || game.genre === selectedGenre
      const matchesPlatform = selectedPlatform === "Toutes" || game.platform === selectedPlatform
      return matchesSearch && matchesGenre && matchesPlatform
    })
  }, [searchTerm, selectedGenre, selectedPlatform])

  // Suggestions de recherche
  const suggestions = useMemo(() => {
    if (!searchTerm) return []
    return allGames
      .filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5)
      .map((game) => game.name)
  }, [searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE)
  const startIndex = (currentPage - 1) * GAMES_PER_PAGE
  const paginatedGames = filteredGames.slice(startIndex, startIndex + GAMES_PER_PAGE)

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Bibliothèque de Jeux</h2>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Recherche avec suggestions */}
          <div className="relative flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher un jeu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-600 rounded-lg mt-1 z-10 shadow-xl">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 text-white hover:bg-green-600/20 hover:text-green-400 first:rounded-t-lg last:rounded-b-lg transition-all duration-150"
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
              value={selectedGenre}
              onValueChange={(value) => {
                setSelectedGenre(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-600 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200 backdrop-blur-sm">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900/95 backdrop-blur-md border-gray-600 shadow-xl">
                {genres.map((genre) => (
                  <SelectItem
                    key={genre}
                    value={genre}
                    className="text-white hover:bg-green-600/20 hover:text-green-400 focus:bg-green-600/20 focus:text-green-400"
                  >
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPlatform}
              onValueChange={(value) => {
                setSelectedPlatform(value)
                handleFilterChange()
              }}
            >
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-600 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200 backdrop-blur-sm">
                <SelectValue placeholder="Plateforme" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900/95 backdrop-blur-md border-gray-600 shadow-xl">
                {platforms.map((platform) => (
                  <SelectItem
                    key={platform}
                    value={platform}
                    className="text-white hover:bg-green-600/20 hover:text-green-400 focus:bg-green-600/20 focus:text-green-400"
                  >
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Badges des filtres actifs */}
        <div className="flex gap-2 mb-6">
          {selectedGenre !== "Tous" && (
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-green-600 to-green-500 text-white border-0 hover:from-green-500 hover:to-green-400 transition-all duration-200"
            >
              Genre: {selectedGenre}
              <button
                onClick={() => {
                  setSelectedGenre("Tous")
                  handleFilterChange()
                }}
                className="ml-2 hover:text-gray-200 transition-colors duration-150"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedPlatform !== "Toutes" && (
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-green-600 to-green-500 text-white border-0 hover:from-green-500 hover:to-green-400 transition-all duration-200"
            >
              Plateforme: {selectedPlatform}
              <button
                onClick={() => {
                  setSelectedPlatform("Toutes")
                  handleFilterChange()
                }}
                className="ml-2 hover:text-gray-200 transition-colors duration-150"
              >
                ×
              </button>
            </Badge>
          )}
          {searchTerm && (
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-green-600 to-green-500 text-white border-0 hover:from-green-500 hover:to-green-400 transition-all duration-200"
            >
              Recherche: "{searchTerm}"
              <button
                onClick={() => {
                  setSearchTerm("")
                  handleFilterChange()
                }}
                className="ml-2 hover:text-gray-200 transition-colors duration-150"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      </div>

      {/* Résultats */}
      <div className="mb-6">
        <p className="text-gray-400">
          {filteredGames.length} jeu{filteredGames.length !== 1 ? "s" : ""} trouvé
          {filteredGames.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grille de jeux */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        {paginatedGames.map((game) => (
          <div
            key={game.id}
            className="group relative bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-64">
              <img src={game.image || "/placeholder.svg"} alt={game.name} className="w-full h-full object-cover" />
              {/* Progressive blur overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Titre */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-semibold text-sm leading-tight text-balance">{game.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-900/50 border-gray-600 text-white hover:bg-gray-700 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 border-0 transition-all duration-200"
                    : "bg-gray-900/50 border-gray-600 text-white hover:bg-gray-700 hover:border-green-500 transition-all duration-200 backdrop-blur-sm"
                }
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-900/50 border-gray-600 text-white hover:bg-gray-700 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </section>
  )
}
