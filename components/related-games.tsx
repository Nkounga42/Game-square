"use client"

import { useEffect, useState } from 'react'
import { useGames } from '@/hooks/useGames'
import { Game } from '@/lib/types'
import { GameCardImage } from './ui/game-card-image'
import BlurContainer from './ui/BlurContainer'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface RelatedGamesProps {
  currentGameId: number
  genre: string
}

export function RelatedGames({ currentGameId, genre }: RelatedGamesProps) {
  const { games, loading, fetchGames } = useGames({ autoFetch: false })
  const [relatedGames, setRelatedGames] = useState<Game[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Récupérer les jeux du même genre
    fetchGames({ category: genre.toLowerCase().replace(/\s+/g, '-') })
  }, [genre, fetchGames])

  useEffect(() => {
    if (games.length > 0) {
      // Filtrer les jeux du même genre en excluant le jeu actuel
      const filtered = games
        .filter(game => game.id !== currentGameId)
        .slice(0, 12) // Limiter à 12 jeux
      
      setRelatedGames(filtered)
    }
  }, [games, currentGameId])

  const itemsPerPage = 4
  const maxIndex = Math.max(0, relatedGames.length - itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + itemsPerPage, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - itemsPerPage, 0))
  }

  if (loading || relatedGames.length === 0) {
    return null
  }

  return (
    <div className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Jeux similaires</CardTitle>
        {relatedGames.length > itemsPerPage && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="text-gray-400 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="text-gray-400 hover:text-white disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)` }}
          >
            {relatedGames.map((game) => (
              <div key={game.id} className="flex-shrink-0 w-1/4 px-2">
                <Link href={`/game/${game.id}`}>
                  <BlurContainer className="group relative bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
                    <GameCardImage
                      src={game.thumbnail}
                      alt={game.title}
                      title={game.title}
                      className="h-48"
                      fallbackSrc="/placeholder.svg"
                    /> 
                  </BlurContainer>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs de pagination */}
        {relatedGames.length > itemsPerPage && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: Math.ceil(relatedGames.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? 'bg-blue-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </div>
  )
}
