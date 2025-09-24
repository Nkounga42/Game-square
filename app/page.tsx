"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GamesList } from "@/components/games-list"
import { allGames, genres, platforms } from "@/lib/data"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("Tous")
  const [selectedPlatform, setSelectedPlatform] = useState("Toutes")
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
      <Header />
      <main>
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
        />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
