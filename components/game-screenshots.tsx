"use client"

import { useState } from 'react'
import { LazyImage } from './ui/lazy-image'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Screenshot {
  id: number
  image: string
}

interface GameScreenshotsProps {
  screenshots: Screenshot[]
}

export function GameScreenshots({ screenshots }: GameScreenshotsProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
  }

  // Écouter les événements clavier
  useState(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <>
      <Card className="bg-none border-none">
        <CardHeader>
          <CardTitle className="text-white">Captures d'écran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.id}
                className="relative group cursor-pointer rounded-lg overflow-hidden aspect-video"
                onClick={() => openLightbox(index)}
              >
                <LazyImage
                  src={screenshot.image}
                  alt={`Capture d'écran ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackSrc="/placeholder.svg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Bouton fermer */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation précédente */}
          {screenshots.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          )}

          {/* Navigation suivante */}
          {screenshots.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          )}

          {/* Image principale */}
          <div className="max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center">
            <img
              src={screenshots[currentIndex].image}
              alt={`Capture d'écran ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Indicateur de position */}
          {screenshots.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm">
                {currentIndex + 1} / {screenshots.length}
              </span>
            </div>
          )}

          {/* Miniatures */}
          {screenshots.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot.id}
                  className={`flex-shrink-0 w-16 h-10 rounded overflow-hidden border-2 transition-colors ${
                    index === currentIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={screenshot.image}
                    alt={`Miniature ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
