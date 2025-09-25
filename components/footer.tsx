"use client"

import { Download, Github, Twitter, Diamond as Discord, Mail, Globe } from "lucide-react"
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
          {/* Section À propos */}
          <div className="space-y-4"> 
            <p className="text-sm text-muted-foreground text-pretty">
              La plateforme ultime pour découvrir et télécharger les meilleurs jeux vidéo gratuits.
            </p>
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Créé par Nkounga Exaucé</p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/Nkounga42" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:nkoungagil@gmail.com" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a 
                  href="https://nkounga42.github.io/portfolio/about" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Section Jeux */}
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

          {/* Section Catégories */}
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

          {/* Section Contact & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact & Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/contact" className="hover:text-foreground transition-colors">
                  📧 Nous contacter
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Nkounga42" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  🐙 GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://nkounga42.github.io/portfolio/about" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  🌐 Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="mailto:nkoungagil@gmail.com" 
                  className="hover:text-foreground transition-colors"
                >
                  ✉️ Email direct
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Section Copyright */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">© 2025 Game Square - Atomic Games. Tous droits réservés.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Développé avec ❤️ par 
              <a 
                href="https://nkounga42.github.io/portfolio/about" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                Nkounga Exaucé
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a 
              href="https://www.freetogame.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Powered by FreeToGame API
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
