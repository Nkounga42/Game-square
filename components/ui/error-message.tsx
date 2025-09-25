import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({ 
  title = "Une erreur s'est produite", 
  message, 
  onRetry, 
  className 
}: ErrorMessageProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4 p-8 text-center",
      className
    )}>
      <div className="flex items-center gap-2 text-red-400">
        <AlertCircle className="h-6 w-6" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Réessayer
        </Button>
      )}
    </div>
  )
}

interface NetworkErrorProps {
  onRetry?: () => void
  className?: string
}

export function NetworkError({ onRetry, className }: NetworkErrorProps) {
  return (
    <ErrorMessage
      title="Problème de connexion"
      message="Impossible de charger les jeux. Vérifiez votre connexion internet et réessayez."
      onRetry={onRetry}
      className={className}
    />
  )
}

interface NoResultsProps {
  searchTerm?: string
  onReset?: () => void
  className?: string
}

export function NoResults({ searchTerm, onReset, className }: NoResultsProps) {
  const message = searchTerm 
    ? `Aucun jeu trouvé pour "${searchTerm}". Essayez avec d'autres mots-clés.`
    : "Aucun jeu trouvé avec les filtres actuels."

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4 p-8 text-center",
      className
    )}>
      <div className="text-6xl opacity-50">🎮</div>
      <h3 className="text-lg font-semibold text-muted-foreground">
        Aucun résultat
      </h3>
      <p className="text-muted-foreground max-w-md">
        {message}
      </p>
      {onReset && (
        <Button 
          onClick={onReset}
          variant="outline"
        >
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  )
}
