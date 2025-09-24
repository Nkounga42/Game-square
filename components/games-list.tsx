"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button" 
import { ChevronLeft, ChevronRight } from "lucide-react"
import BlurContainer from "./ui/BlurContainer"
import { allGames, GAMES_PER_PAGE } from "@/lib/data"

interface GamesListProps {
  filteredGames: typeof allGames
}

export function GamesList({ filteredGames }: GamesListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE)
  const startIndex = (currentPage - 1) * GAMES_PER_PAGE
  const paginatedGames = filteredGames.slice(startIndex, startIndex + GAMES_PER_PAGE)

  // Reset page when filters change
  const resetPage = () => {
    setCurrentPage(1)
  }

  // Reset page when filteredGames change
  useMemo(() => {
    setCurrentPage(1)
  }, [filteredGames])

  return (
    <section className="py-16  max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 text-left">Bibliothèque de Jeux</h2>
      </div>

      {/* Résultats */}
      <div className="mb-6">
        <p className="text-gray-400">
          {filteredGames.length} jeu{filteredGames.length !== 1 ? "s" : ""} trouvé
          {filteredGames.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grille de jeux */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {paginatedGames.map((game) => (
          <BlurContainer
            key={game.id}
            className="group relative bg-gray-800 rounded-lg overflow-hidden hover:scale-103 transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-64">
              <img src={game.image || "/placeholder.svg"} alt={game.name} className="w-full h-full object-cover" />
              {/* Progressive blur overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Titre */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-30">
                <h3 className="text-white font-semibold text-sm leading-tight text-balance">{game.name}</h3>
              </div>
            </div>
          </BlurContainer>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-30 border-t border-border/40  pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className=" border-border/40 text-white hover:bg-gray-700 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
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
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 border-0 transition-all duration-200"
                    : " border-border/40 text-white hover:bg-gray-700 hover:border-blue-500 transition-all duration-200 backdrop-blur-sm"
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
            className=" border-border/40 text-white hover:bg-gray-700 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </section>
  )
}
