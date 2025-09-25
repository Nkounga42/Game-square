"use client"

import { cn } from '@/lib/utils'

interface ImageSkeletonProps {
  className?: string
  showIcon?: boolean
}

export function ImageSkeleton({ className, showIcon = true }: ImageSkeletonProps) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-gradient-to-br from-secondary/20 via-secondary/30 to-secondary/40",
      "animate-pulse",
      className
    )}>
      {/* Effet de shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      {/* Icône d'image au centre */}
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 text-muted-foreground opacity-40">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        </div>
      )}
      
      {/* Points de chargement animés */}
      <div className="absolute bottom-4 left-4 flex gap-1">
        <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-blue-500/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
