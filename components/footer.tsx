"use client"

import { Download, Github, Twitter, Diamond as Discord } from "lucide-react"
import { useFilterContext } from "@/contexts/FilterContext"

export function Footer() {
  const { setSelectedGenre, resetFilters } = useFilterContext()

  const handleCategoryClick = (category: string) => {
    setSelectedGenre(category)
    // Scroll vers la section des jeux
    setTimeout(() => {
      const gamesSection = document.querySelector('[data-games-list]')
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleFilterClick = (filterType: string) => {
    switch (filterType) {
      case 'Nouveautés':
        setSelectedGenre('Nouveautés')
        break
      case 'Populaires':
        // Utiliser un tri par popularité
        resetFilters()
        // Ici on pourrait ajouter une logique de tri par popularité
        break
      case 'Gratuits':
        // Tous les jeux de l'API sont gratuits, donc reset
        resetFilters()
        break
      case 'Premium':
        // Logique pour les jeux premium si applicable
        resetFilters()
        break
    }
    
    // Scroll vers la section des jeux
    setTimeout(() => {
      const gamesSection = document.querySelector('[data-games-list]')
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }
  return (
    <footer className="bg-secondary/20 border-t border-border">

      <div className="container mx-auto max-w-5xl py-12">
        <div>
          <div className="flex items-center gap-2 border-b pb-4 mb-8">
            <img src="/atomic_games.png" alt="logo" className="h-30" />
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4"> 
            <p className="text-sm text-muted-foreground text-pretty">
              La plateforme ultime pour découvrir et télécharger les meilleurs jeux vidéo.
            </p>
            <div className="flex items-center gap-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              <Discord className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Jeux</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => handleFilterClick('Nouveautés')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Nouveautés
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFilterClick('Populaires')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Populaires
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFilterClick('Gratuits')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Gratuits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFilterClick('Premium')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Premium
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Catégories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => handleCategoryClick('Action')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Action
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('RPG')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  RPG
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('Stratégie')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Stratégie
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('Course')}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Course
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Communauté
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Atomic games. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Confidentialité
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Conditions
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
