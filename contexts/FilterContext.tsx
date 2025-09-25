"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface FilterContextType {
  selectedGenre: string
  selectedPlatform: string
  searchTerm: string
  setSelectedGenre: (genre: string) => void
  setSelectedPlatform: (platform: string) => void
  setSearchTerm: (term: string) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [selectedGenre, setSelectedGenre] = useState("Tous")
  const [selectedPlatform, setSelectedPlatform] = useState("Toutes")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Fonction pour mettre à jour le terme de recherche avec navigation
  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term)
    
    // Si on tape quelque chose, naviguer vers #search
    if (term.trim() !== "") {
      // Mettre à jour l'URL avec le hash
      window.location.hash = "search"
      
      // Faire défiler vers la section de recherche avec un délai pour laisser le temps au DOM de se mettre à jour
      setTimeout(() => {
        const searchElement = document.getElementById('search')
        if (searchElement) {
          searchElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    } else {
      // Si on vide la recherche, supprimer le hash
      if (window.location.hash === "#search") {
        window.location.hash = ""
      }
    }
  }

  // Restaurer l'état depuis l'URL au chargement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Si l'URL contient #search au chargement, défiler vers la section
      if (window.location.hash === "#search") {
        setTimeout(() => {
          const searchElement = document.getElementById('search')
          if (searchElement) {
            searchElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 500) 
      }
    }
  }, [])

  const resetFilters = () => {
    setSelectedGenre("Tous")
    setSelectedPlatform("Toutes")
    setSearchTerm("")
    // Supprimer le hash lors du reset
    if (typeof window !== 'undefined' && window.location.hash === "#search") {
      window.location.hash = ""
    }
  }

  const value = {
    selectedGenre,
    selectedPlatform,
    searchTerm,
    setSelectedGenre,
    setSelectedPlatform,
    setSearchTerm: handleSetSearchTerm,
    resetFilters
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilterContext() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}
