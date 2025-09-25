"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GamesList } from "@/components/games-list"
import { Footer } from "@/components/footer"
import { useGames, useGameFilters } from "@/hooks/useGames"
import { useFilterContext } from "@/contexts/FilterContext"
import { Game } from "@/lib/types"

// Genres et plateformes pour les filtres
const genres = [
  "Tous",
  "MMORPG",
  "Shooter",
  "Strategy",
  "MOBA",
  "Racing",
  "Sports",
  "Social",
  "Sandbox",
  "Open World",
  "Survival",
  "PvP",
  "PvE",
  "Pixel",
  "Voxel",
  "Zombie",
  "Turn-Based",
  "First-Person",
  "Third-Person",
  "Top-Down",
  "Tank",
  "Space",
  "Sailing",
  "Side-Scroller",
  "Superhero",
  "Permadeath",
  "Card",
  "Battle Royale",
  "MMO",
  "MMOFPS",
  "MMOTPS",
  "3D",
  "2D",
  "Anime",
  "Fantasy",
  "Sci-Fi",
  "Fighting",
  "Action RPG",
  "Action",
  "Military",
  "Martial Arts",
  "Flight",
  "Low-Spec",
  "Tower Defense",
  "Horror",
  "MMORTS"
]

const platforms = [
  "Toutes",
  "PC", 
  "Navigateur"
]

export default function HomePage() {
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  // Utilisation du contexte global pour les filtres
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedGenre, 
    setSelectedGenre, 
    selectedPlatform, 
    setSelectedPlatform,
    resetFilters 
  } = useFilterContext()

  // Utilisation des hooks personnalisés
  const { filters, updateFilter } = useGameFilters()
  const { games, loading, error, fetchGames, searchGames, refreshGames, clearError } = useGames({
    autoFetch: true
  })

  // Filtrage des jeux côté client pour la recherche et les suggestions
  const filteredGames = useMemo(() => {
    let filtered = games

    // Filtrage par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter((game) => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.short_description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrage par genre
    if (selectedGenre !== "Tous") {
      filtered = filtered.filter((game) => 
        game.genre.toLowerCase() === selectedGenre.toLowerCase()
      )
    }

    // Filtrage par plateforme
    if (selectedPlatform !== "Toutes") {
      const platformMap: { [key: string]: string } = {
        "PC": "pc",
        "Navigateur": "browser"
      }
      const apiPlatform = platformMap[selectedPlatform]
      if (apiPlatform) {
        filtered = filtered.filter((game) => 
          game.platform.toLowerCase() === apiPlatform
        )
      }
    }

    // Adapter les données de l'API au format attendu par GamesList
    return filtered.map(game => ({
      id: game.id,
      name: game.title,
      genre: game.genre,
      platform: game.platform,
      image: game.thumbnail
    }))
  }, [games, searchTerm, selectedGenre, selectedPlatform])

  // Suggestions de recherche
  const suggestions = useMemo(() => {
    if (!searchTerm) return []
    return games
      .filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5)
      .map((game) => game.title)
  }, [searchTerm, games])

  // Mise à jour des filtres API quand les filtres locaux changent
  useEffect(() => {
    const apiFilters: any = {}
    
    if (selectedPlatform !== "Toutes") {
      const platformMap: { [key: string]: string } = {
        "PC": "pc",
        "Navigateur": "browser"
      }
      apiFilters.platform = platformMap[selectedPlatform] || "all"
    }
    
    if (selectedGenre !== "Tous") {
      // Traitement spécial pour "Nouveautés"
      if (selectedGenre === "Nouveautés") {
        // Trier par date de sortie pour les nouveautés
        apiFilters.sortBy = "release-date"
      } else {
        // Filtrage normal par catégorie
        apiFilters.category = selectedGenre.toLowerCase().replace(/\s+/g, '-')
      }
    }

    // Récupérer les jeux avec les nouveaux filtres
    fetchGames(apiFilters)
  }, [selectedGenre, selectedPlatform]) // Removed fetchGames from dependencies

  // Reset page when filters change
  const handleFilterChange = () => {
    // Cette fonction peut être utilisée pour des actions supplémentaires lors du changement de filtres
  }

  const handleResetGenre = () => {
    setSelectedGenre("Tous")
  }

  const handleResetPlatform = () => {
    setSelectedPlatform("Toutes")
  }

  const handleResetSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-background">
      <main >
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={suggestions}
          handleFilterChange={handleFilterChange}
          genres={genres}
          platforms={platforms}
        />
        <GamesList
          filteredGames={filteredGames}
          loading={loading}
          error={error?.message || null}
          onRetry={refreshGames}
          onResetFilters={resetFilters}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  )
}
