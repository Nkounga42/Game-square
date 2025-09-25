import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { FilterProvider } from "@/contexts/FilterContext"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "GameVault - Téléchargement de Jeux Vidéo",
  description: "Découvrez et téléchargez les meilleurs jeux vidéo. Collection premium de jeux PC, console et mobile.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link  type="image/png" sizes="96x96" rel="icon" href="/atomic_games.png" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <FilterProvider>
          <Suspense fallback={null}>
            <Header />
            {children}
            <Footer />
          </Suspense>
        </FilterProvider>
        <Analytics />
      </body>
    </html>
  )
}
