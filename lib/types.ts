// Types pour l'API FreeToGame
export interface Game {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export interface GameDetails extends Game {
  description: string
  minimum_system_requirements?: {
    os?: string
    processor?: string
    memory?: string
    graphics?: string
    storage?: string
  }
  screenshots?: Array<{
    id: number
    image: string
  }>
}

// Types pour les filtres
export interface GameFilters {
  platform?: 'pc' | 'browser' | 'all'
  category?: string
  sortBy?: 'release-date' | 'popularity' | 'alphabetical' | 'relevance'
}

// Types pour les réponses d'erreur
export interface ApiError {
  message: string
  status?: number
}

// Types pour les états de l'application
export interface GameState {
  games: Game[]
  loading: boolean
  error: ApiError | null
  hasMore: boolean
}

// Types pour les catégories disponibles
export type GameCategory = 
  | 'mmorpg'
  | 'shooter'
  | 'strategy'
  | 'moba'
  | 'racing'
  | 'sports'
  | 'social'
  | 'sandbox'
  | 'open-world'
  | 'survival'
  | 'pvp'
  | 'pve'
  | 'pixel'
  | 'voxel'
  | 'zombie'
  | 'turn-based'
  | 'first-person'
  | 'third-person'
  | 'top-down'
  | 'tank'
  | 'space'
  | 'sailing'
  | 'side-scroller'
  | 'superhero'
  | 'permadeath'
  | 'card'
  | 'battle-royale'
  | 'mmo'
  | 'mmofps'
  | 'mmotps'
  | '3d'
  | '2d'
  | 'anime'
  | 'fantasy'
  | 'sci-fi'
  | 'fighting'
  | 'action-rpg'
  | 'action'
  | 'military'
  | 'martial-arts'
  | 'flight'
  | 'low-spec'
  | 'tower-defense'
  | 'horror'
  | 'mmorts'

export type Platform = 'pc' | 'browser' | 'all'

export type SortBy = 'release-date' | 'popularity' | 'alphabetical' | 'relevance'
