import { NextRequest, NextResponse } from 'next/server'

const FREETOGAME_API_BASE = 'https://www.freetogame.com/api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Construire l'URL de l'API FreeToGame
    let apiUrl = `${FREETOGAME_API_BASE}/games`
    const params = new URLSearchParams()
    
    // Ajouter les paramètres de requête
    if (searchParams.get('platform')) {
      params.append('platform', searchParams.get('platform')!)
    }
    if (searchParams.get('category')) {
      params.append('category', searchParams.get('category')!)
    }
    if (searchParams.get('sort-by')) {
      params.append('sort-by', searchParams.get('sort-by')!)
    }
    if (searchParams.get('tag')) {
      params.append('tag', searchParams.get('tag')!)
    }
    
    if (params.toString()) {
      apiUrl += `?${params.toString()}`
    }
    
    console.log('Fetching from:', apiUrl)
    
    // Faire la requête à l'API FreeToGame
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Game-Square-App/1.0',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Retourner les données avec les en-têtes CORS appropriés
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
