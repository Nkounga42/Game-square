"use client"

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  blurDataURL?: string
}

export function LazyImage({ 
  src, 
  alt, 
  className, 
  fallbackSrc = "/placeholder.svg",
  blurDataURL 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const [currentSrc, setCurrentSrc] = useState(fallbackSrc)

  // Intersection Observer pour détecter quand l'image entre dans le viewport
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
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Charger l'image quand elle est visible
  useEffect(() => {
    if (isInView && !hasError) {
      const img = new Image()
      img.onload = () => {
        setCurrentSrc(src)
        setIsLoaded(true)
      }
      img.onerror = () => {
        setHasError(true)
        setCurrentSrc(fallbackSrc)
        setIsLoaded(true)
      }
      img.src = src
    }
  }, [isInView, src, fallbackSrc, hasError])

  // Générer un blur data URL simple si pas fourni
  const defaultBlurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjNTU1IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+"

  return (
    <div className="relative overflow-hidden">
      <img
        ref={imgRef}
        src={isInView ? currentSrc : (blurDataURL || defaultBlurDataURL)}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          !isLoaded && isInView && "blur-sm scale-105",
          isLoaded && "blur-0 scale-100",
          className
        )}
        onLoad={() => {
          if (isInView) {
            setIsLoaded(true)
          }
        }}
        onError={() => {
          setHasError(true)
          setCurrentSrc(fallbackSrc)
          setIsLoaded(true)
        }}
      />
      
      {/* Overlay de chargement */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-neutral-900/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Placeholder avant que l'image soit visible */}
      {!isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <div className="w-12 h-12 text-gray-500">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
