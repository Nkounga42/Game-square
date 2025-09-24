import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, User, Download } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { categories } from "@/lib/data"

export function Header() {

  const handleCategorieChange = (categorie: string) => {
    console.log(categorie)
    setView()
  }

  const [view, setView] = useState(false)

  const switchView = () => {
    setView(!view)
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Download className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Game Square</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </button>
            <button onClick={() => switchView()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Catégories
            </button>
            <button onClick={() => switchView()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Nouveautés
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un jeu..." className="w-64 pl-10 bg-secondary/50 border-border" />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
            <User className="h-4 w-4 mr-2" />
            Connexion
          </Button>
        </div>
      </div>
      <div className="border-t border-border/40">
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
                {categories.map((cat, index) => (
                  <motion.button
                    key={cat + index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.05 } }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => handleCategorieChange(cat)}
                    className="text-sm text-left font-medium text-muted-foreground hover:text-foreground transition-colors"
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
