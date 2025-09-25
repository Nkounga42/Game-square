import { useState, useEffect, useRef } from 'react'

interface UseLazyImageOptions {
  threshold?: number
  rootMargin?: string
  fallbackSrc?: string
}

interface UseLazyImageReturn {
  imgRef: React.RefObject<HTMLElement>
  isLoaded: boolean
  isInView: boolean
  hasError: boolean
  currentSrc: string
}

export function useLazyImage(
  src: string, 
  options: UseLazyImageOptions = {}
): UseLazyImageReturn {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    fallbackSrc = '/placeholder.svg'
  } = options

  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(fallbackSrc)
  const imgRef = useRef<HTMLElement>(null)

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  // Chargement de l'image
  useEffect(() => {
    if (isInView && !hasError && src !== currentSrc) {
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
  }, [isInView, src, fallbackSrc, hasError, currentSrc])

  return {
    imgRef,
    isLoaded,
    isInView,
    hasError,
    currentSrc
  }
}
