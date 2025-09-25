import React from 'react'
import { Phone, AlertCircle } from 'lucide-react'

interface EmergencyBarProps {
  lang: 'en' | 'es'
}

const EmergencyBar: React.FC<EmergencyBarProps> = ({ lang }) => {
  const content = {
    en: {
      emergency: '24/7 EMERGENCY SERVICE',
      callNow: 'CALL NOW',
      available: 'Available 24/7 for emergency repairs'
    },
    es: {
      emergency: 'SERVICIO DE EMERGENCIA 24/7',
      callNow: 'LLAME AHORA',
      available: 'Disponible 24/7 para reparaciones de emergencia'
    }
  }

  const t = content[lang]

  return (
    <div className="bg-red-600 text-white py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 animate-pulse" />
          <span className="font-bold text-sm md:text-base">{t.emergency}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:block text-sm">{t.available}</span>
          <a
            href="tel:2058350111"
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold flex items-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{t.callNow}: 205-835-0111</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default EmergencyBar