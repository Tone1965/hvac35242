// LOCAL PAGES DATA STRUCTURE - 900 PAGES FOR LOCAL DOMINATION
// 18 Services × 45 Areas × 2 Languages = 1,620 total combinations

export const localServices = [
  {
    en: { name: 'AC Repair', slug: 'ac-repair' },
    es: { name: 'Reparación de Aire Acondicionado', slug: 'reparacion-aire-acondicionado' }
  },
  {
    en: { name: 'AC Installation', slug: 'ac-installation' },
    es: { name: 'Instalación de Aire Acondicionado', slug: 'instalacion-aire-acondicionado' }
  },
  {
    en: { name: 'Heating Repair', slug: 'heating-repair' },
    es: { name: 'Reparación de Calefacción', slug: 'reparacion-calefaccion' }
  },
  {
    en: { name: 'Heating Installation', slug: 'heating-installation' },
    es: { name: 'Instalación de Calefacción', slug: 'instalacion-calefaccion' }
  },
  {
    en: { name: 'Heat Pump Services', slug: 'heat-pump-services' },
    es: { name: 'Servicios de Bomba de Calor', slug: 'servicios-bomba-calor' }
  },
  {
    en: { name: 'Ductwork Repair', slug: 'ductwork-repair' },
    es: { name: 'Reparación de Conductos', slug: 'reparacion-conductos' }
  },
  {
    en: { name: 'Air Quality Solutions', slug: 'air-quality-solutions' },
    es: { name: 'Soluciones de Calidad del Aire', slug: 'soluciones-calidad-aire' }
  },
  {
    en: { name: 'HVAC Maintenance', slug: 'hvac-maintenance' },
    es: { name: 'Mantenimiento HVAC', slug: 'mantenimiento-hvac' }
  },
  {
    en: { name: 'Thermostat Installation', slug: 'thermostat-installation' },
    es: { name: 'Instalación de Termostato', slug: 'instalacion-termostato' }
  },
  {
    en: { name: 'Commercial HVAC', slug: 'commercial-hvac' },
    es: { name: 'HVAC Comercial', slug: 'hvac-comercial' }
  },
  {
    en: { name: 'Energy Efficiency Audits', slug: 'energy-efficiency-audits' },
    es: { name: 'Auditorías de Eficiencia Energética', slug: 'auditorias-eficiencia-energetica' }
  },
  {
    en: { name: 'System Replacement', slug: 'system-replacement' },
    es: { name: 'Reemplazo de Sistema', slug: 'reemplazo-sistema' }
  },
  {
    en: { name: 'Refrigerant Services', slug: 'refrigerant-services' },
    es: { name: 'Servicios de Refrigerante', slug: 'servicios-refrigerante' }
  },
  {
    en: { name: 'Ventilation Services', slug: 'ventilation-services' },
    es: { name: 'Servicios de Ventilación', slug: 'servicios-ventilacion' }
  },
  {
    en: { name: 'Zoning Systems', slug: 'zoning-systems' },
    es: { name: 'Sistemas de Zonificación', slug: 'sistemas-zonificacion' }
  },
  {
    en: { name: 'Smart Home Integration', slug: 'smart-home-integration' },
    es: { name: 'Integración de Casa Inteligente', slug: 'integracion-casa-inteligente' }
  },
  {
    en: { name: 'Preventive Maintenance Plans', slug: 'preventive-maintenance-plans' },
    es: { name: 'Planes de Mantenimiento Preventivo', slug: 'planes-mantenimiento-preventivo' }
  },
  {
    en: { name: 'Seasonal Tune-ups', slug: 'seasonal-tune-ups' },
    es: { name: 'Afinaciones Estacionales', slug: 'afinaciones-estacionales' }
  }
]

export const birminghamMetroAreas = [
  {
    name: 'Homewood',
    slug: 'homewood',
    zipCodes: ['35209', '35229'],
    landmarks: ['Homewood City Hall', 'Vulcan Park', 'Samford University'],
    description: 'historic downtown area with tree-lined streets and close-knit community'
  },
  {
    name: 'River Chase',
    slug: 'river-chase',
    zipCodes: ['35244'],
    landmarks: ['Riverchase Country Club', 'The Preserve', 'Hoover Metropolitan Stadium'],
    description: 'upscale residential community with golf courses and family amenities'
  },
  {
    name: 'HWY 280 Corridor',
    slug: 'hwy-280-corridor',
    zipCodes: ['35242', '35243'],
    landmarks: ['The Summit', 'Highway 280 Business District', 'Brook Highland Plaza'],
    description: 'bustling commercial corridor with shopping and business centers'
  },
  {
    name: 'Valleydale',
    slug: 'valleydale',
    zipCodes: ['35242'],
    landmarks: ['Valleydale Elementary', 'Cahaba River', 'Highland Lakes'],
    description: 'family-friendly suburban neighborhood with excellent schools'
  },
  {
    name: 'Hwy 119',
    slug: 'hwy-119',
    zipCodes: ['35244', '35216'],
    landmarks: ['Highway 119 Corridor', 'Patton Creek Shopping Center'],
    description: 'growing suburban area with new developments and shopping'
  },
  {
    name: 'Alabaster',
    slug: 'alabaster',
    zipCodes: ['35007'],
    landmarks: ['Veterans Park', 'Buck Creek Festival', 'Alabaster City Hall'],
    description: 'rapidly growing city with excellent schools and family amenities'
  },
  {
    name: 'Bessemer',
    slug: 'bessemer',
    zipCodes: ['35020', '35021', '35022'],
    landmarks: ['Tannehill Ironworks', 'DeBardeleben Park', 'Bessemer City Hall'],
    description: 'historic iron and steel city with industrial heritage'
  },
  {
    name: 'Birmingham',
    slug: 'birmingham',
    zipCodes: ['35203', '35204', '35205', '35206', '35207', '35208', '35210', '35211', '35212', '35213', '35214', '35215', '35217', '35218', '35221', '35222', '35224', '35226', '35228', '35233', '35234', '35235', '35236', '35237', '35238'],
    landmarks: ['Downtown Birmingham', 'UAB Hospital', 'Railroad Park', 'Birmingham Civil Rights Institute', 'Vulcan Park'],
    description: 'Alabama\s largest city with diverse neighborhoods and urban amenities'
  },
  {
    name: 'Chelsea',
    slug: 'chelsea',
    zipCodes: ['35043'],
    landmarks: ['American Village', 'Chelsea Park', 'Chelsea Community Center'],
    description: 'charming small town with historic sites and community events'
  },
  {
    name: 'Columbiana',
    slug: 'columbiana',
    zipCodes: ['35051'],
    landmarks: ['Shelby County Courthouse', 'Main Street Columbiana', 'Columbiana City Park'],
    description: 'historic county seat with small-town charm and antique shops'
  },
  {
    name: 'Irondale',
    slug: 'irondale',
    zipCodes: ['35210'],
    landmarks: ['Irondale Cafe', 'Shades Creek Greenway', 'Irondale City Hall'],
    description: 'small city with southern hospitality and famous local dining'
  },
  {
    name: 'Springville',
    slug: 'springville',
    zipCodes: ['35146'],
    landmarks: ['Springville Beach', 'Springville Country Music Park', 'Downtown Springville'],
    description: 'small town with country music heritage and outdoor recreation'
  },
  {
    name: 'Gardendale',
    slug: 'gardendale',
    zipCodes: ['35071'],
    landmarks: ['Gardendale Civic Center', 'Luman Harris Park', 'Main Street Gardendale'],
    description: 'suburban community with excellent schools and family neighborhoods'
  },
  {
    name: 'Fultondale',
    slug: 'fultondale',
    zipCodes: ['35068'],
    landmarks: ['Fultondale City Hall', 'Black Creek Park', 'Walker Chapel Road'],
    description: 'small city with convenient access to Birmingham and family amenities'
  },
  {
    name: 'Clay',
    slug: 'clay',
    zipCodes: ['35048'],
    landmarks: ['Clay City Hall', 'Cosby Lake', 'Clay Elementary School'],
    description: 'quiet residential community with natural beauty and lake access'
  },
  {
    name: 'Pinson',
    slug: 'pinson',
    zipCodes: ['35126'],
    landmarks: ['Pinson City Hall', 'Turkey Creek Nature Preserve', 'Pinson Valley Parkway'],
    description: 'growing suburban area with nature preserves and family neighborhoods'
  },
  {
    name: 'Center Point',
    slug: 'center-point',
    zipCodes: ['35215'],
    landmarks: ['Center Point City Hall', 'Roebuck Shopping City', 'Center Point Parkway'],
    description: 'established community with shopping centers and residential neighborhoods'
  },
  {
    name: 'Warrior',
    slug: 'warrior',
    zipCodes: ['35180'],
    landmarks: ['Warrior City Hall', 'Main Street Warrior', 'Warrior River'],
    description: 'small town with river access and tight-knit community feel'
  },
  {
    name: 'Hueytown',
    slug: 'hueytown',
    zipCodes: ['35023'],
    landmarks: ['Hueytown City Hall', 'Hueytown Memorial Hospital', 'Pleasant Grove'],
    description: 'historic mining town with strong community traditions'
  },
  {
    name: 'Leeds',
    slug: 'leeds',
    zipCodes: ['35094'],
    landmarks: ['Bass Pro Shops', 'Barber Motorsports Park', 'Leeds City Hall'],
    description: 'growing city with major retail outlets and motorsports attractions'
  },
  {
    name: 'Moody',
    slug: 'moody',
    zipCodes: ['35004'],
    landmarks: ['Moody City Hall', 'CromeLife Church', 'Cropwell Creek'],
    description: 'small city with family-friendly atmosphere and natural surroundings'
  },
  {
    name: 'Odenville',
    slug: 'odenville',
    zipCodes: ['35120'],
    landmarks: ['Odenville City Hall', 'Odenville Park', 'Highway 411 Corridor'],
    description: 'small town with easy highway access and rural charm'
  },
  {
    name: 'Riverside',
    slug: 'riverside',
    zipCodes: ['35135'],
    landmarks: ['Riverside City Hall', 'Coosa River', 'Logan Martin Lake'],
    description: 'riverside community with lake access and outdoor recreation'
  },
  {
    name: 'Kimberly',
    slug: 'kimberly',
    zipCodes: ['35091'],
    landmarks: ['Kimberly City Hall', 'Warrior River', 'Kimberly Park'],
    description: 'small town with river access and community parks'
  },
  {
    name: 'Locust Fork',
    slug: 'locust-fork',
    zipCodes: ['35097'],
    landmarks: ['Locust Fork River', 'Nectar Covered Bridge', 'Highland Lake'],
    description: 'rural community with natural beauty and covered bridge landmark'
  },
  {
    name: 'Blountsville',
    slug: 'blountsville',
    zipCodes: ['35031'],
    landmarks: ['Blountsville City Hall', 'Blount County Courthouse', 'Main Street'],
    description: 'county seat with historic courthouse and small-town charm'
  },
  {
    name: 'Cleveland',
    slug: 'cleveland',
    zipCodes: ['35049'],
    landmarks: ['Cleveland City Hall', 'Rickwood Caverns State Park', 'Locust Fork River'],
    description: 'small town near state park with underground caves and natural beauty'
  },
  {
    name: 'Steele',
    slug: 'steele',
    zipCodes: ['35987'],
    landmarks: ['Steele City Hall', 'Coosa River', 'Steele Creek Park'],
    description: 'riverside town with creek access and outdoor recreation'
  },
  {
    name: 'Ashville',
    slug: 'ashville',
    zipCodes: ['35953'],
    landmarks: ['St. Clair County Courthouse', 'Ashville City Hall', 'Main Street Ashville'],
    description: 'historic county seat with antique shops and courthouse square'
  },
  {
    name: 'Riverchase',
    slug: 'riverchase',
    zipCodes: ['35244'],
    landmarks: ['Riverchase Country Club', 'Galleria Mall', 'Riverchase Elementary'],
    description: 'upscale planned community with golf course and shopping nearby'
  },
  {
    name: 'Bessemer West',
    slug: 'bessemer-west',
    zipCodes: ['35022'],
    landmarks: ['Western Hills Mall', 'McAdory High School', 'Jonesboro Road'],
    description: 'western Bessemer area with shopping and established neighborhoods'
  },
  {
    name: 'Forestdale',
    slug: 'forestdale',
    zipCodes: ['35214'],
    landmarks: ['Forestdale Elementary', 'Minor Parkway', 'Forestdale Square'],
    description: 'residential community with convenient shopping and school access'
  },
  {
    name: 'West End',
    slug: 'west-end',
    zipCodes: ['35204'],
    landmarks: ['Legion Field', 'University of Alabama Birmingham', 'West End Park'],
    description: 'historic Birmingham neighborhood near UAB with urban amenities'
  },
  {
    name: 'North Birmingham',
    slug: 'north-birmingham',
    zipCodes: ['35203', '35217'],
    landmarks: ['Downtown Birmingham', 'Birmingham Civil Rights Institute', 'Interstate 65'],
    description: 'northern Birmingham area with easy downtown access and urban living'
  },
  {
    name: 'East Birmingham',
    slug: 'east-birmingham',
    zipCodes: ['35206', '35210'],
    landmarks: ['Eastwood Mall', 'Roebuck Shopping City', 'Airport Highway'],
    description: 'eastern Birmingham area with shopping centers and residential neighborhoods'
  },
  {
    name: 'Smithfield',
    slug: 'smithfield',
    zipCodes: ['35204'],
    landmarks: ['Smithfield Court', 'Avenue F', 'Birmingham Water Works'],
    description: 'established Birmingham neighborhood with community character'
  },
  {
    name: 'Ensley',
    slug: 'ensley',
    zipCodes: ['35218'],
    landmarks: ['Ensley Park', 'Avenue E', 'Ensley Highlands'],
    description: 'historic Birmingham area with industrial heritage and community pride'
  },
  {
    name: 'Fairfield',
    slug: 'fairfield',
    zipCodes: ['35064'],
    landmarks: ['Fairfield City Hall', 'Miles College', 'Valley Road'],
    description: 'small city with historic college and strong community traditions'
  },
  {
    name: 'Wylam',
    slug: 'wylam',
    zipCodes: ['35221'],
    landmarks: ['Wylam Park', 'Village Creek', 'Wylam Elementary'],
    description: 'Birmingham neighborhood with creek access and community parks'
  },
  {
    name: 'Tarrant',
    slug: 'tarrant',
    zipCodes: ['35217'],
    landmarks: ['Tarrant City Hall', 'Tarrant Park', 'Tarrant City Lake'],
    description: 'small city with lake access and recreational opportunities'
  },
  {
    name: 'Center Point South',
    slug: 'center-point-south',
    zipCodes: ['35215'],
    landmarks: ['Eastwood Mall', 'Center Point Parkway', 'Huffman Road'],
    description: 'southern Center Point area with shopping and residential neighborhoods'
  },
  {
    name: 'Homewood South',
    slug: 'homewood-south',
    zipCodes: ['35209'],
    landmarks: ['Samford University', 'Shades Creek', 'South 18th Street'],
    description: 'southern Homewood area near university with tree-lined streets'
  },
  {
    name: 'Homewood West',
    slug: 'homewood-west',
    zipCodes: ['35209'],
    landmarks: ['Homewood High School', 'Edgewood Elementary', 'Green Springs Highway'],
    description: 'western Homewood area with excellent schools and family neighborhoods'
  },
  {
    name: 'Forestdale North',
    slug: 'forestdale-north',
    zipCodes: ['35214'],
    landmarks: ['Minor High School', 'Church Street', 'Forestdale Park'],
    description: 'northern Forestdale area with school access and community amenities'
  },
  {
    name: 'Eastwood',
    slug: 'eastwood',
    zipCodes: ['35206'],
    landmarks: ['Eastwood Mall', 'Crestwood Boulevard', 'Eastwood Lake'],
    description: 'eastern Birmingham area with shopping mall and lake access'
  }
]

// Generate all local page combinations
export function generateLocalPageCombinations() {
  const combinations: Array<{
    url: string
    area: typeof birminghamMetroAreas[0]
    service: typeof localServices[0]
    lang: 'en' | 'es'
  }> = []

  birminghamMetroAreas.forEach(area => {
    localServices.forEach(service => {
      // English version
      combinations.push({
        url: `/en/local/${area.slug}-${service.en.slug}`,
        area,
        service,
        lang: 'en'
      })

      // Spanish version  
      combinations.push({
        url: `/es/local/${area.slug}-${service.es.slug}`,
        area,
        service,
        lang: 'es'
      })
    })
  })

  return combinations
}

// Get local page data by slug
export function getLocalPageData(areaSlug: string, serviceSlug: string, lang: 'en' | 'es') {
  const area = birminghamMetroAreas.find(a => a.slug === areaSlug)
  const service = localServices.find(s => 
    lang === 'en' ? s.en.slug === serviceSlug : s.es.slug === serviceSlug
  )

  if (!area || !service) return null

  return { area, service, lang }
}