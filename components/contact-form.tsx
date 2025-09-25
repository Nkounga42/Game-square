'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'loading' })

    try {
      // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Pour l'instant, on simule un succès et on ouvre le client email
      const mailtoLink = `mailto:nkoungagil@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`
      
      window.location.href = mailtoLink
      
      setStatus({ 
        type: 'success', 
        message: 'Votre client email va s\'ouvrir avec le message pré-rempli !' 
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Une erreur est survenue. Veuillez réessayer.' 
      })
    }
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Envoyez-nous un message
        </CardTitle>
        <p className="text-muted-foreground">
          Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet *</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Sujet de votre message"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="bg-background/50"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Décrivez votre demande, suggestion ou question..."
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="bg-background/50 resize-none"
            />
          </div>

          {/* Status Messages */}
          {status.type === 'success' && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-500 text-sm">{status.message}</p>
            </div>
          )}

          {status.type === 'error' && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-500 text-sm">{status.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || status.type === 'loading'}
            className="w-full"
          >
            {status.type === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Envoyer le message
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Champs obligatoires
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
