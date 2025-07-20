import { birminghamMetroAreas, localServices } from './local-pages-data'

// INTERNAL LINKING STRATEGY FOR $1.6M REVENUE OPTIMIZATION

export interface InternalLink {
  url: string
  text: string
  priority: 'high' | 'medium' | 'low'
  category: 'upsell' | 'cross_sell' | 'related' | 'authority'
}

// TIER 1 - PREMIUM AREAS (Most link equity)
export const premiumAreas = [
  'mountain-brook', 'vestavia-hills', 'hoover', 'homewood', 
  'river-chase', 'english-village', 'cahaba-heights', 'trussville',
  'helena', 'pelham'
]

// HIGH-VALUE SERVICES (Revenue drivers)
export const highValueServices = [
  'system-replacement', 'ac-installation', 'heating-installation',
  'commercial-hvac', 'smart-home-integration'
]

// EMERGENCY SERVICES (Immediate revenue)
export const emergencyServices = [
  'ac-repair', 'heating-repair', 'hvac-maintenance'
]

// GENERATE STRATEGIC INTERNAL LINKS FOR ANY LOCAL PAGE
export function generateInternalLinks(
  currentArea: string, 
  currentService: string, 
  lang: 'en' | 'es'
): InternalLink[] {
  const links: InternalLink[] = []
  const isEmergencyService = emergencyServices.some(service => 
    currentService.includes(service.replace('-', ''))
  )
  const isPremiumArea = premiumAreas.includes(currentArea)
  
  // 1. UPSELL LINKS - Emergency to Installation/Replacement
  if (isEmergencyService) {
    // Emergency repair → System replacement (high revenue)
    const replacementService = lang === 'en' ? 'system-replacement' : 'reemplazo-sistema'
    links.push({
      url: `/${lang}/local/${currentArea}-${replacementService}`,
      text: lang === 'en' 
        ? 'Avoid Future Repairs - System Replacement Options →'
        : 'Evite Reparaciones Futuras - Opciones de Reemplazo →',
      priority: 'high',
      category: 'upsell'
    })

    // Repair → Installation upgrade
    const installService = lang === 'en' ? 'ac-installation' : 'instalacion-aire-acondicionado'
    links.push({
      url: `/${lang}/local/${currentArea}-${installService}`,
      text: lang === 'en'
        ? 'Upgrade to New Efficient System - Save $2,400/year →'
        : 'Actualice a Sistema Nuevo - Ahorre $2,400/año →',
      priority: 'high', 
      category: 'upsell'
    })
  }

  // 2. CROSS-SELL LINKS - Related services in same area
  const currentServiceObj = localServices.find(s => 
    lang === 'en' ? s.en.slug === currentService : s.es.slug === currentService
  )
  
  if (currentServiceObj) {
    // Link to 3 related services in same area
    const relatedServices = localServices
      .filter(s => s !== currentServiceObj)
      .slice(0, 3)
    
    relatedServices.forEach(service => {
      const serviceSlug = lang === 'en' ? service.en.slug : service.es.slug
      const serviceName = lang === 'en' ? service.en.name : service.es.name
      
      links.push({
        url: `/${lang}/local/${currentArea}-${serviceSlug}`,
        text: lang === 'en'
          ? `${serviceName} in ${birminghamMetroAreas.find(a => a.slug === currentArea)?.name} →`
          : `${serviceName} en ${birminghamMetroAreas.find(a => a.slug === currentArea)?.name} →`,
        priority: 'medium',
        category: 'cross_sell'
      })
    })
  }

  // 3. NEARBY AREAS - Geographic expansion
  const currentAreaIndex = birminghamMetroAreas.findIndex(a => a.slug === currentArea)
  if (currentAreaIndex !== -1) {
    // Link to 3-4 nearby premium areas
    const nearbyAreas = [
      ...birminghamMetroAreas.slice(Math.max(0, currentAreaIndex - 2), currentAreaIndex),
      ...birminghamMetroAreas.slice(currentAreaIndex + 1, currentAreaIndex + 3)
    ].filter(area => area.slug !== currentArea)

    nearbyAreas.forEach(area => {
      links.push({
        url: `/${lang}/local/${area.slug}-${currentService}`,
        text: lang === 'en'
          ? `${currentServiceObj?.en.name || 'Service'} in ${area.name} →`
          : `${currentServiceObj?.es.name || 'Servicio'} en ${area.name} →`,
        priority: isPremiumArea ? 'high' : 'medium',
        category: 'related'
      })
    })
  }

  // 4. AUTHORITY LINKS - Main service pages
  const mainServiceSlug = currentService.split('-')[0] + '-' + currentService.split('-')[1]
  links.push({
    url: `/${lang}/services/${mainServiceSlug}`,
    text: lang === 'en'
      ? 'Learn More About Our Service Process →'
      : 'Aprenda Más Sobre Nuestro Proceso →',
    priority: 'medium',
    category: 'authority'
  })

  // 5. LOCAL CATEGORY HUB
  links.push({
    url: `/${lang}/local`,
    text: lang === 'en'
      ? 'See All Local Service Areas →'
      : 'Ver Todas las Áreas de Servicio →',
    priority: 'low',
    category: 'authority'
  })

  // 6. HIGH-VALUE SERVICE PROMOTIONS (Revenue drivers)
  if (!highValueServices.some(service => currentService.includes(service.replace('-', '')))) {
    const premiumServiceSlug = lang === 'en' ? 'smart-home-integration' : 'integracion-casa-inteligente'
    links.push({
      url: `/${lang}/local/${currentArea}-${premiumServiceSlug}`,
      text: lang === 'en'
        ? '🏠 Smart Home Integration - Increase Property Value $8,000+ →'
        : '🏠 Integración Casa Inteligente - Aumente Valor $8,000+ →',
      priority: 'high',
      category: 'upsell'
    })
  }

  return links.slice(0, 8) // Limit to 8 strategic links per page
}

// GENERATE CONTEXTUAL LINK TEXT WITH REVENUE PSYCHOLOGY
export function generateContextualLinkText(
  linkType: 'upsell' | 'cross_sell' | 'related' | 'authority',
  area: string,
  service: string,
  lang: 'en' | 'es'
): string {
  const areaName = birminghamMetroAreas.find(a => a.slug === area)?.name || area
  
  if (lang === 'en') {
    switch (linkType) {
      case 'upsell':
        return `💰 Smart ${areaName} homeowners also invest in:`
      case 'cross_sell':
        return `🔧 Complete ${areaName} HVAC solutions:`
      case 'related':
        return `📍 Serving nearby ${areaName} communities:`
      case 'authority':
        return `📚 Learn more about professional HVAC services:`
      default:
        return `More ${areaName} HVAC services:`
    }
  } else {
    switch (linkType) {
      case 'upsell':
        return `💰 Propietarios inteligentes de ${areaName} también invierten en:`
      case 'cross_sell':
        return `🔧 Soluciones HVAC completas de ${areaName}:`
      case 'related':
        return `📍 Sirviendo comunidades cercanas a ${areaName}:`
      case 'authority':
        return `📚 Aprenda más sobre servicios HVAC profesionales:`
      default:
        return `Más servicios HVAC de ${areaName}:`
    }
  }
}

// REVENUE-FOCUSED LINK PRIORITIZATION
export function prioritizeLinksForRevenue(links: InternalLink[]): InternalLink[] {
  return links.sort((a, b) => {
    // 1. Upsells first (highest revenue potential)
    if (a.category === 'upsell' && b.category !== 'upsell') return -1
    if (b.category === 'upsell' && a.category !== 'upsell') return 1
    
    // 2. High priority within same category
    if (a.priority === 'high' && b.priority !== 'high') return -1
    if (b.priority === 'high' && a.priority !== 'high') return 1
    
    // 3. Cross-sells over related
    if (a.category === 'cross_sell' && b.category === 'related') return -1
    if (b.category === 'cross_sell' && a.category === 'related') return 1
    
    return 0
  })
}

// GENERATE LINK MAGNET CONTENT
export function generateLinkMagnets(area: string, service: string, lang: 'en' | 'es') {
  const areaData = birminghamMetroAreas.find(a => a.slug === area)
  const avgSpend = areaData?.averageHVACSpend || 3500
  
  if (lang === 'en') {
    return {
      costCalculator: {
        title: `💰 ${areaData?.name} HVAC Cost Calculator`,
        description: `See exactly what ${service.replace('-', ' ')} costs in your ${areaData?.name} neighborhood`,
        cta: 'Calculate My Cost →'
      },
      energySavings: {
        title: `⚡ Energy Savings Report`,
        description: `${areaData?.name} homeowners save average $${Math.round(avgSpend * 0.4)}/year with our systems`,
        cta: 'Get My Savings Report →'
      },
      emergencyGuide: {
        title: `🚨 Emergency HVAC Guide`,
        description: `What to do when your system fails in ${areaData?.name} - Free PDF guide`,
        cta: 'Download Free Guide →'
      }
    }
  } else {
    return {
      costCalculator: {
        title: `💰 Calculadora de Costos HVAC ${areaData?.name}`,
        description: `Vea exactamente lo que cuesta ${service.replace('-', ' ')} en su vecindario de ${areaData?.name}`,
        cta: 'Calcular Mi Costo →'
      },
      energySavings: {
        title: `⚡ Reporte de Ahorro de Energía`,
        description: `Propietarios de ${areaData?.name} ahorran promedio $${Math.round(avgSpend * 0.4)}/año`,
        cta: 'Obtener Mi Reporte →'
      },
      emergencyGuide: {
        title: `🚨 Guía de Emergencia HVAC`,
        description: `Qué hacer cuando falla su sistema en ${areaData?.name} - Guía PDF gratis`,
        cta: 'Descargar Guía Gratis →'
      }
    }
  }
}