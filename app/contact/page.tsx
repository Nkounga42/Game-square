import { Metadata } from 'next'
import ContactForm from '@/components/contact-form'
import ContactInfo from '@/components/contact-info'

export const metadata: Metadata = {
  title: 'Contact - Atomic game',
  description: 'Contactez-nous pour toute question ou suggestion concernant Atomic game.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-29 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-900/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400  to-pink-400 bg-clip-text text-transparent mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une question, une suggestion ou simplement envie de discuter ? 
            N'hésitez pas à nous contacter !
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ContactInfo />
            
            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
