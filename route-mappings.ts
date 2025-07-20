/**
 * Route mappings between English and Spanish URLs
 * This maps English slugs to their Spanish equivalents
 */

export const routeMappings = {
  // English slug -> Spanish slug
  'birmingham-ac-repair': 'birmingham-reparacion-aire-acondicionado',
  'contact': 'contacto',
  'services': 'servicios',
  'quote': 'cotizacion',
  'emergency': 'emergencia',
  'emergency-hvac-repair-mountain-brook': 'reparacion-emergencia-hvac-mountain-brook',
  // Add more mappings as needed
}

// Reverse mapping: Spanish slug -> English slug
export const reverseRouteMappings: Record<string, string> = {}
Object.entries(routeMappings).forEach(([en, es]) => {
  reverseRouteMappings[es] = en
})

/**
 * Get the translated route for a given path and target language
 */
export function getTranslatedRoute(currentPath: string, fromLang: 'en' | 'es', toLang: 'en' | 'es'): string {
  // If switching to the same language, return current path
  if (fromLang === toLang) return currentPath
  
  // Simple language switch - just replace the language prefix
  // This matches how Pelham and other location pages work
  return currentPath.replace(`/${fromLang}`, `/${toLang}`)
}

/**
 * Check if a route exists for a given language
 */
export function routeExistsForLanguage(route: string, lang: 'en' | 'es'): boolean {
  const routeWithoutLang = route.replace(/^\/(en|es)\//, '')
  
  if (lang === 'en') {
    // Check if it's a valid English route
    return Object.keys(routeMappings).includes(routeWithoutLang) || 
           Object.values(reverseRouteMappings).includes(routeWithoutLang)
  } else {
    // Check if it's a valid Spanish route
    return Object.values(routeMappings).includes(routeWithoutLang) || 
           Object.keys(reverseRouteMappings).includes(routeWithoutLang)
  }
}