import { Download, Github, Twitter, Diamond as Discord } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Download className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">GameVault</span>
            </div>
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
                <a href="#" className="hover:text-foreground transition-colors">
                  Nouveautés
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Populaires
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Gratuits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Premium
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Catégories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  RPG
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Stratégie
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Course
                </a>
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
          <p className="text-sm text-muted-foreground">© 2025 GameVault. Tous droits réservés.</p>
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
