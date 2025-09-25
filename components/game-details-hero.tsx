"use client"

import { GameDetails } from '@/lib/types'
import { LazyImage } from './ui/lazy-image'
import { Badge } from './ui/badge'
import { Calendar, Users, Globe, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface GameDetailsHeroProps {
  game: GameDetails
}

export function GameDetailsHero({ game }: GameDetailsHeroProps) {
  const router = useRouter()
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 ">

        <LazyImage
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover scale-110 blur-sm"
          fallbackSrc="/placeholder.svg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto max-w-5xl px-4 py-20">
        <div className="container mx-auto max-w-5xl pt-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">

          <div className="relative group">
            <div className=" mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
              <LazyImage
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackSrc="/placeholder.svg"
              />
            </div>
          </div>

          {/* Informations du jeu */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                  {game.genre}
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  {game.platform}
                </Badge>
                <Badge variant="outline" className="border-green-600 text-green-300">
                  Gratuit
                </Badge>
              </div>

              {/* Titre */}
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                {game.title}
              </h1>

              {/* Description courte */}
              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                {game.short_description}
              </p>

              {/* Métadonnées */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Sortie: {new Date(game.release_date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Développeur: {game.developer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Éditeur: {game.publisher}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dégradé de transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  )
}
