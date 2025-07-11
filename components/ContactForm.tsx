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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In production, you would send this to your API
    console.log('Form submitted:', formData)
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsSubmitting(false)
    
    // Show success message
    alert(lang === 'en' 
      ? 'Thank you! We will contact you within 1 hour.'
      : '¡Gracias! Le contactaremos dentro de 1 hora.')
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
          ? 'For immediate assistance, call 205-830-1111'
          : 'Para asistencia inmediata, llame 205-830-1111'}
      </p>
    </div>
  )
}