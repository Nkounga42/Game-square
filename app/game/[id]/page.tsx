"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { GameDetailsHero } from '@/components/game-details-hero'
import { GameDetailsInfo } from '@/components/game-details-info'
import { GameScreenshots } from '@/components/game-screenshots'
import { RelatedGames } from '@/components/related-games'
import { useGameDetails } from '@/hooks/useGames'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Download } from 'lucide-react'
import { ErrorMessage } from '@/components/ui/error-message'
import { GameDetailsLoading } from '@/components/ui/game-details-loading'

export default function GameDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const gameId = parseInt(params.id as string)
  
  const { gameDetails, loading, error, fetchGameDetails } = useGameDetails()

  useEffect(() => {
    if (gameId) {
      fetchGameDetails(gameId)
    }
  }, [gameId, fetchGameDetails])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <GameDetailsLoading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto max-w-5xl px-4 py-16">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <ErrorMessage
            message={error.message}
            onRetry={() => fetchGameDetails(gameId)}
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>
    )
  }

  if (!gameDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto max-w-5xl px-4 py-16">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-white mb-4">Jeu non trouvé</h1>
            <p className="text-gray-400">Le jeu demandé n'existe pas ou n'est plus disponible.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
     
      <GameDetailsHero game={gameDetails} />

      {/* Contenu principal */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-8">
            <GameDetailsInfo game={gameDetails} />
            
            {/* Screenshots */}
            {gameDetails.screenshots && gameDetails.screenshots.length > 0 && (
              <GameScreenshots screenshots={gameDetails.screenshots} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Boutons d'action */}
            <div className="bg-neutral-900/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                  onClick={() => window.open(gameDetails.game_url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Jouer maintenant
                </Button>
                
                {gameDetails.platform === 'PC (Windows)' && (
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-800 text-gray-300 hover:bg-gray-700"
                    onClick={() => window.open(gameDetails.game_url, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                )}
              </div>
            </div>

            {/* Informations techniques */}
            <div className="bg-neutral-900/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plateforme:</span>
                  <span className="text-white">{gameDetails.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Genre:</span>
                  <span className="text-white">{gameDetails.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Développeur:</span>
                  <span className="text-white">{gameDetails.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Éditeur:</span>
                  <span className="text-white">{gameDetails.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date de sortie:</span>
                  <span className="text-white">
                    {new Date(gameDetails.release_date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Configuration système */}
            {gameDetails.minimum_system_requirements && (
              <div className="bg-neutral-900/20 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Configuration minimale</h3>
                <div className="space-y-2 text-sm">
                  {gameDetails.minimum_system_requirements.os && (
                    <div>
                      <span className="text-gray-400">OS: </span>
                      <span className="text-white">{gameDetails.minimum_system_requirements.os}</span>
                    </div>
                  )}
                  {gameDetails.minimum_system_requirements.processor && (
                    <div>
                      <span className="text-gray-400">Processeur: </span>
                      <span className="text-white">{gameDetails.minimum_system_requirements.processor}</span>
                    </div>
                  )}
                  {gameDetails.minimum_system_requirements.memory && (
                    <div>
                      <span className="text-gray-400">Mémoire: </span>
                      <span className="text-white">{gameDetails.minimum_system_requirements.memory}</span>
                    </div>
                  )}
                  {gameDetails.minimum_system_requirements.graphics && (
                    <div>
                      <span className="text-gray-400">Graphiques: </span>
                      <span className="text-white">{gameDetails.minimum_system_requirements.graphics}</span>
                    </div>
                  )}
                  {gameDetails.minimum_system_requirements.storage && (
                    <div>
                      <span className="text-gray-400">Stockage: </span>
                      <span className="text-white">{gameDetails.minimum_system_requirements.storage}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Jeux similaires */}
        <div className="mt-12">
          <RelatedGames currentGameId={gameId} genre={gameDetails.genre} />
        </div>
      </div>
    </div>
  )
}
