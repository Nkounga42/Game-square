import { useState, useEffect, useCallback, useMemo } from 'react'
import { FreeToGameAPI } from '@/lib/api'
import { Game, GameDetails, GameFilters, ApiError, GameState } from '@/lib/types'

interface UseGamesOptions {
  initialFilters?: GameFilters
  autoFetch?: boolean
}

interface UseGamesReturn extends GameState {
  fetchGames: (filters?: GameFilters) => Promise<void>
  searchGames: (query: string, filters?: GameFilters) => Promise<void>
  refreshGames: () => Promise<void>
  clearError: () => void
}

export function useGames(options: UseGamesOptions = {}): UseGamesReturn {
  const { initialFilters = {}, autoFetch = true } = options

  const [state, setState] = useState<GameState>({
    games: [],
    loading: false,
    error: null,
    hasMore: true
  })

  const [currentFilters, setCurrentFilters] = useState<GameFilters>(initialFilters)

  // Fonction pour récupérer les jeux
  const fetchGames = useCallback(async (filters: GameFilters = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const games = await FreeToGameAPI.getGames(filters)
      setState(prev => ({
        ...prev,
        games,
        loading: false,
        hasMore: games.length > 0
      }))
      setCurrentFilters(filters)
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as ApiError
      }))
    }
  }, [])

  // Fonction pour rechercher des jeux
  const searchGames = useCallback(async (query: string, filters: GameFilters = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const games = await FreeToGameAPI.searchGames(query, filters)
      setState(prev => ({
        ...prev,
        games,
        loading: false,
        hasMore: games.length > 0
      }))
      setCurrentFilters(filters)
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as ApiError
      }))
    }
  }, [])

  // Fonction pour rafraîchir les jeux
  const refreshGames = useCallback(async () => {
    await fetchGames(currentFilters)
  }, [currentFilters]) // Removed fetchGames from dependencies

  // Fonction pour effacer les erreurs
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  // Chargement initial
  useEffect(() => {
    if (autoFetch) {
      fetchGames(initialFilters)
    }
  }, [autoFetch]) // Removed fetchGames and initialFilters from dependencies

  return {
    ...state,
    fetchGames,
    searchGames,
    refreshGames,
    clearError
  }
}

// Hook pour récupérer les détails d'un jeu
interface UseGameDetailsReturn {
  gameDetails: GameDetails | null
  loading: boolean
  error: ApiError | null
  fetchGameDetails: (gameId: number) => Promise<void>
  clearError: () => void
}

export function useGameDetails(): UseGameDetailsReturn {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchGameDetails = useCallback(async (gameId: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const details = await FreeToGameAPI.getGameDetails(gameId)
      setGameDetails(details)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    gameDetails,
    loading,
    error,
    fetchGameDetails,
    clearError
  }
}

// Hook pour les catégories
interface UseCategoriesReturn {
  categories: string[]
  loading: boolean
  error: ApiError | null
  fetchCategories: () => Promise<void>
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const cats = await FreeToGameAPI.getAvailableCategories()
      setCategories(cats)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    loading,
    error,
    fetchCategories
  }
}

// Hook pour les filtres avec mémorisation
interface UseGameFiltersReturn {
  filters: GameFilters
  setFilters: (filters: GameFilters) => void
  updateFilter: (key: keyof GameFilters, value: string) => void
  resetFilters: () => void
  hasActiveFilters: boolean
}

export function useGameFilters(initialFilters: GameFilters = {}): UseGameFiltersReturn {
  const [filters, setFilters] = useState<GameFilters>(initialFilters)

  const updateFilter = useCallback((key: keyof GameFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({})
  }, [])

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => value !== undefined && value !== '')
  }, [filters])

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    hasActiveFilters
  }
}
