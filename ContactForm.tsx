'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { translations } from '@/lib/translations'
import { Send, Loader2 } from 'lucide-react'

export default function ContactForm({ lang }: { lang: 'en' | 'es' }) {
  const t = translations[lang]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        // Show success message
        alert(lang === 'en' 
          ? 'Thank you! Your message has been sent. We will contact you shortly.'
          : '¡Gracias! Su mensaje ha sido enviado. Le contactaremos pronto.')
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Email error:', error)
      alert(lang === 'en' 
        ? 'Sorry, there was an error sending your message. Please call 205-835-0111.'
        : 'Lo sentimos, hubo un error enviando su mensaje. Por favor llame 205-835-0111.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">
        {lang === 'en' 
          ? 'Request Service'
          : 'Solicitar Servicio'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{t.contact.name}</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder={lang === 'en' ? 'John Smith' : 'Juan Pérez'}
          />
        </div>
        
        <div>
          <Label htmlFor="email">{t.contact.email}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">{t.contact.phone}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="(205) 555-0123"
          />
        </div>
        
        <div>
          <Label htmlFor="message">{t.contact.message}</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 min-h-[120px]"
            placeholder={lang === 'en' 
              ? 'Please describe your HVAC issue or service needs...'
              : 'Por favor describa su problema de HVAC o necesidades de servicio...'}
          />
        </div>
        
        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {lang === 'en' ? 'Sending...' : 'Enviando...'}
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              {t.contact.submit}
            </>
          )}
        </Button>
      </form>
      
      <p className="text-sm text-slate-600 mt-4 text-center">
        {lang === 'en' 
          ? 'For immediate assistance, call 205-835-0111'
          : 'Para asistencia inmediata, llame 205-835-0111'}
      </p>
    </div>
  )
}