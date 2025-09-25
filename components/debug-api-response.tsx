"use client"

import { useEffect } from 'react'
import { useGames } from '@/hooks/useGames'

export function DebugApiResponse() {
  const { games, loading, error } = useGames({ autoFetch: true })

  useEffect(() => {
    if (games.length > 0) {
      console.log('🎮 API Response Sample:', games[0])
      console.log('🎮 Total games:', games.length)
      console.log('🎮 Available fields:', Object.keys(games[0]))
    }
  }, [games])

  if (loading) return <div className="text-white">Chargement des données API...</div>
  if (error) return <div className="text-red-400">Erreur API: {error.message}</div>

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white text-xs">
      <h3 className="font-bold mb-2">Debug API Response:</h3>
      {games.length > 0 && (
        <pre className="overflow-x-auto">
          {JSON.stringify(games[0], null, 2)}
        </pre>
      )}
    </div>
  )
}
