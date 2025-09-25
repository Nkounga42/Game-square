"use client"

import { GameDetails } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface GameDetailsInfoProps {
  game: GameDetails
}

export function GameDetailsInfo({ game }: GameDetailsInfoProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <Card className="bg-neutral-900/20 backdrop-blur-sm border-none">
        <CardHeader>
          <CardTitle className="text-white">À propos de {game.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {game.description}
          </p>
        </CardContent>
      </Card>

      {/* Caractéristiques du jeu */}
      <Card className="bg-neutral-900/20 backdrop-blur-sm border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Caractéristiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Genre</h4>
                <p className="text-white">{game.genre}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Plateforme</h4>
                <p className="text-white">{game.platform}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Développeur</h4>
                <p className="text-white">{game.developer}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Éditeur</h4>
                <p className="text-white">{game.publisher}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Date de sortie</h4>
                <p className="text-white">
                  {new Date(game.release_date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Statut</h4>
                <p className="text-green-400 font-medium">
                  En ligne
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
