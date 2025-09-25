import { Game, GameDetails, GameFilters, ApiError } from './types'

const BASE_URL = '/api'

// Configuration pour les requêtes
const defaultHeaders = {
  'Content-Type': 'application/json',
}

// Fonction utilitaire pour gérer les erreurs
const handleApiError = (error: any): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500
    }
  }
  return {
    message: 'Une erreur inconnue s\'est produite',
    status: 500
  }
}

// Fonction utilitaire pour construire les URLs avec paramètres
const buildUrl = (endpoint: string, params: Record<string, string> = {}): string => {
  const baseUrl = `${BASE_URL}${endpoint}`
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value)
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

export class FreeToGameAPI {
  /**
   * Récupère tous les jeux ou les jeux filtrés
   */
  static async getGames(filters: GameFilters = {}): Promise<Game[]> {
    try {
      const params: Record<string, string> = {}
      
      if (filters.platform && filters.platform !== 'all') {
        params.platform = filters.platform
      }
      
      if (filters.category) {
        params.category = filters.category
      }
      
      if (filters.sortBy) {
        params['sort-by'] = filters.sortBy
      }

      const url = buildUrl('/games', params)
      const response = await fetch(url, { headers: defaultHeaders })
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      return data as Game[]
    } catch (error) {
      throw handleApiError(error)
    }
  }

  /**
   * Récupère les jeux par plateforme
   */
  static async getGamesByPlatform(platform: 'pc' | 'browser' | 'all'): Promise<Game[]> {
    return this.getGames({ platform })
  }

  /**
   * Récupère les jeux par catégorie
   */
  static async getGamesByCategory(category: string): Promise<Game[]> {
    return this.getGames({ category })
  }

  /**
   * Récupère les jeux triés
   */
  static async getGamesSorted(sortBy: 'release-date' | 'popularity' | 'alphabetical' | 'relevance'): Promise<Game[]> {
    return this.getGames({ sortBy })
  }

  /**
   * Récupère les jeux avec filtres multiples
   */
  static async getGamesWithFilters(
    platform?: 'pc' | 'browser' | 'all',
    category?: string,
    sortBy?: 'release-date' | 'popularity' | 'alphabetical' | 'relevance'
  ): Promise<Game[]> {
    return this.getGames({ platform, category, sortBy })
  }

  /**
   * Filtre les jeux par tags multiples
   */
  static async filterGamesByTags(
    tags: string[],
    platform?: 'pc' | 'browser' | 'all',
    sortBy?: 'release-date' | 'popularity' | 'alphabetical' | 'relevance'
  ): Promise<Game[]> {
    try {
      const params: Record<string, string> = {
        tag: tags.join('.')
      }
      
      if (platform && platform !== 'all') {
        params.platform = platform
      }
      
      if (sortBy) {
        params.sort = sortBy
      }

      const url = buildUrl('/filter', params)
      const response = await fetch(url, { headers: defaultHeaders })
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      return data as Game[]
    } catch (error) {
      throw handleApiError(error)
    }
  }

  /**
   * Récupère les détails d'un jeu spécifique
   */
  static async getGameDetails(gameId: number): Promise<GameDetails> {
    try {
      const url = `${BASE_URL}/games/${gameId}`
      const response = await fetch(url, { headers: defaultHeaders })
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      return data as GameDetails
    } catch (error) {
      throw handleApiError(error)
    }
  }

  /**
   * Recherche de jeux par nom (fonction utilitaire côté client)
   */
  static async searchGames(query: string, filters: GameFilters = {}): Promise<Game[]> {
    try {
      const games = await this.getGames(filters)
      const searchTerm = query.toLowerCase().trim()
      
      if (!searchTerm) return games
      
      return games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) ||
        game.short_description.toLowerCase().includes(searchTerm) ||
        game.genre.toLowerCase().includes(searchTerm)
      )
    } catch (error) {
      throw handleApiError(error)
    }
  }

  /**
   * Récupère les catégories disponibles (basé sur les jeux existants)
   */
  static async getAvailableCategories(): Promise<string[]> {
    try {
      const games = await this.getGames()
      const categories = [...new Set(games.map(game => game.genre))]
      return categories.sort()
    } catch (error) {
      throw handleApiError(error)
    }
  }

  /**
   * Récupère les plateformes disponibles
   */
  static getAvailablePlatforms(): string[] {
    return ['all', 'pc', 'browser']
  }

  /**
   * Récupère les options de tri disponibles
   */
  static getAvailableSortOptions(): Array<{ value: string; label: string }> {
    return [
      { value: 'relevance', label: 'Pertinence' },
      { value: 'popularity', label: 'Popularité' },
      { value: 'release-date', label: 'Date de sortie' },
      { value: 'alphabetical', label: 'Alphabétique' }
    ]
  }
}
