"use client"

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface GameCardImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  title?: string
}

export function GameCardImage({ 
  src, 
  alt, 
  className,
  fallbackSrc = "/placeholder.svg",
  title
}: GameCardImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSrc, setCurrentSrc] = useState('')

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Charger l'image quand elle devient visible
  useEffect(() => {
    if (isInView && !hasError && !isLoaded) {
      setImageLoading(true)
      const img = new Image()
      
      img.onload = () => {
        setCurrentSrc(src)
        setIsLoaded(true)
        setImageLoading(false)
      }
      
      img.onerror = () => {
        setHasError(true)
        setCurrentSrc(fallbackSrc)
        setIsLoaded(true)
        setImageLoading(false)
      }
      
      img.src = src
    }
  }, [isInView, src, fallbackSrc, hasError, isLoaded])

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Image principale */}
      {isInView && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 ease-out transform",
            !isLoaded && "blur-md scale-110 opacity-0",
            isLoaded && "blur-0 scale-100 opacity-100"
          )}
        />
      )}

      {/* Placeholder avant chargement */}
      {!isInView && (
        <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="w-16 h-16 text-gray-500 opacity-50">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Indicateur de chargement */}
      {isInView && imageLoading && (
        <div className="absolute inset-0 bg-gray-800/80 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xs text-gray-300 font-medium">Chargement...</div>
          </div>
        </div>
      )}

      {/* Overlay de dégradé pour le texte */}
      {isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      )}

      {/* Titre du jeu */}
      {title && isLoaded && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
          <h3 className="text-white font-semibold text-sm leading-tight drop-shadow-lg">
            {title}
          </h3>
        </div>
      )}

      {/* Effet de shimmer pendant le chargement */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
      )}
    </div>
  )
}
