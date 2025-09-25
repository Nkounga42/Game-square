"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FreeToGameAPI } from "@/lib/api"
import { Game } from "@/lib/types"

export function ApiTest() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testApi = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await FreeToGameAPI.getGames()
      setGames(result.slice(0, 5)) // Prendre seulement les 5 premiers pour le test
      console.log("API Test Success:", result)
    } catch (err: any) {
      setError(err.message)
      console.error("API Test Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const testPlatformFilter = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await FreeToGameAPI.getGamesByPlatform('pc')
      setGames(result.slice(0, 5))
      console.log("Platform Filter Test Success:", result)
    } catch (err: any) {
      setError(err.message)
      console.error("Platform Filter Test Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const testCategoryFilter = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await FreeToGameAPI.getGamesByCategory('shooter')
      setGames(result.slice(0, 5))
      console.log("Category Filter Test Success:", result)
    } catch (err: any) {
      setError(err.message)
      console.error("Category Filter Test Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Test API FreeToGame</h3>
      
      <div className="flex gap-2 mb-4">
        <Button onClick={testApi} disabled={loading}>
          Test API Générale
        </Button>
        <Button onClick={testPlatformFilter} disabled={loading}>
          Test Filtre PC
        </Button>
        <Button onClick={testCategoryFilter} disabled={loading}>
          Test Filtre Shooter
        </Button>
      </div>

      {loading && <p className="text-yellow-400">Chargement...</p>}
      {error && <p className="text-red-400">Erreur: {error}</p>}
      
      {games.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-white mb-2">Résultats:</h4>
          <div className="space-y-2">
            {games.map((game) => (
              <div key={game.id} className="bg-gray-700 p-3 rounded">
                <p className="text-white font-medium">{game.title}</p>
                <p className="text-gray-300 text-sm">{game.genre} - {game.platform}</p>
                <p className="text-gray-400 text-xs">{game.short_description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
