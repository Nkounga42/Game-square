"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, User, Download } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { categories } from "@/lib/data"
import { useFilterContext } from "@/contexts/FilterContext"
import Link from "next/link"

export function Header() {
  const [view, setView] = useState(false)
  const { selectedGenre, setSelectedGenre, searchTerm, setSearchTerm } = useFilterContext()

  const handleCategorieChange = (categorie: string) => {
    setSelectedGenre(categorie)
    setView(false) // Fermer le menu après sélection
  }

  const switchView = () => {
    setView(!view)
  }

  const handleNouveautes = () => {
    // Filtrer par les jeux récents - on peut utiliser une catégorie spéciale ou un tri
    setSelectedGenre("Nouveautés")
    // Optionnel: scroll vers la section des jeux
    setTimeout(() => {
      const gamesSection = document.querySelector('[data-games-list]')
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center justify-between mx-auto max-w-5xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/atomic_games.png" alt="logo" className="h-10"/>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </Link>
            <button onClick={() => switchView()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Catégories {selectedGenre !== "Tous" && `(${selectedGenre})`}
            </button>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un jeu..." 
              className="w-64 pl-10 bg-secondary/50 border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="border-t border-border/40" >
        <AnimatePresence>
          {view && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 200 }}
              exit={{
                opacity: 0, height: 0,
                transition: { duration: 0.5, delay: 0 }
              }}
              className="container h-40  overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="container flex flex-col flex-wrap gap-4 py-3  h-40 max-w-5xl mx-auto overflow-hidden"
              >
                {["Tous", ...categories].map((cat, index) => (
                  <motion.button
                    key={cat + index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.05 } }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => handleCategorieChange(cat)}
                    className={`text-sm text-left font-medium transition-colors ${
                      selectedGenre === cat 
                        ? "text-foreground font-semibold" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </header>
  )
}
