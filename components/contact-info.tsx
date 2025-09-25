'use client'

import { Mail, Github, Globe, MapPin, Phone, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'nkoungagil@gmail.com',
    href: 'mailto:nkoungagil@gmail.com',
    description: 'Réponse sous 24h'
  },
  {
    icon: Github,
    title: 'GitHub',
    value: '@Nkounga42',
    href: 'https://github.com/Nkounga42',
    description: 'Projets et contributions'
  },
  {
    icon: Globe,
    title: 'Portfolio',
    value: 'nkounga42.github.io',
    href: 'https://nkounga42.github.io/portfolio/about',
    description: 'Découvrez mes projets'
  }
]

const additionalInfo = [
  {
    icon: MapPin,
    title: 'Localisation',
    value: 'Congo, Brazzaville'
  },
  {
    icon: Clock,
    title: 'Disponibilité',
    value: 'Lun - Ven, 9h - 18h'
  }
]

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Developer Info */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Nkounga Exaucé
          </CardTitle>
          <p className="text-muted-foreground">
            Développeur Full-Stack & Créateur de Atomic game
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Passionné par le développement web et les jeux vidéo, je crée des expériences 
            numériques modernes et intuitives. Atomic game est né de ma passion pour 
            rendre les jeux gratuits plus accessibles à tous.
          </p>
          
          {/* Contact Methods */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Moyens de contact</h3>
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.title} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-border transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{method.title}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-shrink-0"
                  >
                    <a 
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {method.value}
                    </a>
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Informations supplémentaires
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {additionalInfo.map((info) => {
            const Icon = info.icon
            return (
              <div key={info.title} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{info.title}</p>
                  <p className="text-sm text-muted-foreground">{info.value}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-border/50 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-foreground mb-2">Collaborons ensemble !</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Vous avez un projet en tête ? Discutons-en !
          </p>
          <Button asChild className="w-full">
            <a href="mailto:nkoungagil@gmail.com">
              <Mail className="w-4 h-4 mr-2" />
              Envoyer un email
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
