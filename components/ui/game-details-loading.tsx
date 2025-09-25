"use client"

import { Card, CardContent, CardHeader } from './card'

export function GameDetailsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40 animate-pulse" />
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {/* Image skeleton */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 bg-secondary/30 rounded-lg animate-pulse" />
            </div>

            {/* Info skeleton */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-secondary/30 rounded animate-pulse" />
                <div className="h-6 w-20 bg-secondary/30 rounded animate-pulse" />
                <div className="h-6 w-14 bg-secondary/30 rounded animate-pulse" />
              </div>
              <div className="h-12 w-3/4 bg-secondary/30 rounded animate-pulse" />
              <div className="h-6 w-full bg-secondary/30 rounded animate-pulse" />
              <div className="h-6 w-2/3 bg-secondary/30 rounded animate-pulse" />
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-secondary/30 rounded animate-pulse" />
                <div className="h-4 w-32 bg-secondary/30 rounded animate-pulse" />
                <div className="h-4 w-28 bg-secondary/30 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> 
          <div className="lg:col-span-2 space-y-8"> 
            <Card className="bg-secondary/20 border-border">
              <CardHeader>
                <div className="h-6 w-48 bg-secondary/30 rounded animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 w-full bg-secondary/30 rounded animate-pulse" />
                <div className="h-4 w-full bg-secondary/30 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-secondary/30 rounded animate-pulse" />
                <div className="h-4 w-full bg-secondary/30 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-secondary/30 rounded animate-pulse" />
              </CardContent>
            </Card> 
            <Card className="bg-secondary/20 border-border">
              <CardHeader>
                <div className="h-6 w-40 bg-secondary/30 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-video bg-secondary/30 rounded animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action buttons */}
            <Card className="bg-secondary/20 border-border">
              <CardContent className="p-6">
                <div className="h-6 w-20 bg-secondary/30 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  <div className="h-10 w-full bg-secondary/30 rounded animate-pulse" />
                  <div className="h-10 w-full bg-secondary/30 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>

            {/* Game info */}
            <Card className="bg-secondary/20 border-border">
              <CardContent className="p-6">
                <div className="h-6 w-28 bg-secondary/30 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 w-20 bg-secondary/30 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-secondary/30 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System requirements */}
            <Card className="bg-secondary/20 border-border">
              <CardContent className="p-6">
                <div className="h-6 w-36 bg-secondary/30 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-1">
                      <div className="h-3 w-16 bg-secondary/30 rounded animate-pulse" />
                      <div className="h-3 w-full bg-secondary/30 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
