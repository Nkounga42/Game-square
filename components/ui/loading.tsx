import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loading({ className, size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

interface LoadingSkeletonProps {
  className?: string
  count?: number
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-secondary/20 rounded-lg overflow-hidden">
            <div className="h-64 bg-secondary/30" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-secondary/30 rounded w-3/4" />
              <div className="h-3 bg-secondary/30 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function GamesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-secondary/20 rounded-lg overflow-hidden">
            <div className="h-64 bg-secondary/30" />
            <div className="p-3">
              <div className="h-4 bg-secondary/30 rounded w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
