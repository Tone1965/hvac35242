import { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Phone, Clock, Shield, Award, Wrench, Thermometer, Star, MapPin, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reparación de Aire Acondicionado en Birmingham AL | Servicio el Mismo Día | 205-835-0111',
  description: 'Reparación profesional de aire acondicionado en Birmingham Alabama. 15+ años de experiencia, calificación A+ BBB. Llame al 205-835-0111 para servicio el mismo día.',
  keywords: 'reparación AC Birmingham, reparación aire acondicionado Birmingham AL, reparación HVAC Birmingham',
}

export default function BirminghamReparacionAireAcondicionadoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.hvac35242.com/es/birmingham-reparacion-aire-acondicionado",
    "name": "Birmingham HVAC Reparación de AC - Birmingham",
    "url": "https://www.hvac35242.com/es/birmingham-reparacion-aire-acondicionado",
    "telephone": "(205) 835-0111",
    "email": "service@hvac35242.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Área de Servicio",
      "addressLocality": "Birmingham",
      "addressRegion": "AL",
      "postalCode": "35203",
      "addressCountry": "US"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Birmingham"
      },
      {
        "@type": "State",
        "name": "Alabama"
      }
    ],
    "serviceType": "Reparación de Aire Acondicionado",
    "description": "Servicios profesionales de reparación de aire acondicionado en Birmingham, Alabama. Técnicos HVAC con licencia, asegurados y experimentados.",
    "priceRange": "$$"
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-red-50">
        <Header lang="es" />
        
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/ac-repair.jpg"
            alt="Reparación de Aire Acondicionado Birmingham Alabama"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800/85 to-blue-600/65" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Servicios Expertos de Reparación de AC en<br />
              <span className="text-blue-300">Birmingham, Alabama</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Con Licencia y Asegurados • Servicio el Mismo Día • Garantía de Satisfacción 100%
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-12 py-4 rounded-lg shadow-2xl">
                  <Phone className="w-6 h-6 mr-3" />
                  Llame 205-835-0111
                </Button>
              </a>
              <div className="bg-blue-600/90 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur border border-white/20">
                <Clock className="w-5 h-5 inline mr-2" />
                Disponible 24/7
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Bar */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center transform hover:scale-105 transition-transform">
                <Shield className="w-6 h-6 mr-2" />
                <span className="font-semibold">Con Licencia y Asegurados</span>
              </div>
              <div className="flex items-center transform hover:scale-105 transition-transform">
                <Clock className="w-6 h-6 mr-2" />
                <span className="font-semibold">Servicio de Emergencia 24/7</span>
              </div>
              <div className="flex items-center transform hover:scale-105 transition-transform">
                <Award className="w-6 h-6 mr-2" />
                <span className="font-semibold">15+ Años de Experiencia</span>
              </div>
              <div className="flex items-center transform hover:scale-105 transition-transform">
                <Star className="w-6 h-6 mr-2" />
                <span className="font-semibold">Calificación A+ BBB</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content - Beautiful Card Layout */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              
              {/* Problem Section - Beautiful Alert Card */}
              <div className="mb-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-l-8 border-red-500">
                  <div className="p-12">
                    <div className="flex items-start">
                      <div className="bg-red-100 p-4 rounded-full mr-6 flex-shrink-0">
                        <Wrench className="w-12 h-12 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">¿Problemas con el AC en Birmingham?</h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                          Cuando su aire acondicionado se descompone en el calor sofocante de Birmingham, necesita un servicio de reparación rápido y confiable. Nuestros técnicos expertos han estado sirviendo a las familias de Birmingham durante más de 15 años, desde apartamentos del centro cerca de Railroad Park hasta casas familiares en Forest Park, entendiendo exactamente cómo el clima subtropical húmedo de Alabama y las frecuentes tormentas de verano afectan su sistema de aire acondicionado.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
                            <div className="bg-red-500 p-3 rounded-full w-fit mb-4">
                              <Thermometer className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-4 text-red-800">Señales Comunes de Emergencia de AC:</h3>
                            <ul className="text-gray-700 space-y-3">
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />No sale aire frío de las rejillas</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Unidad funcionando pero no enfriando</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Ruidos o olores extraños</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Acumulación de hielo en la unidad</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-red-500 mr-2" />Termostato no responde</li>
                            </ul>
                          </div>
                          
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                            <div className="bg-blue-500 p-3 rounded-full w-fit mb-4">
                              <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl mb-4 text-blue-800">Por Qué Elegirnos:</h3>
                            <ul className="text-gray-700 space-y-3">
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />Reparaciones de emergencia el mismo día</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />Técnicos con licencia y asegurados</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />Servicio para todas las marcas principales de AC</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />Garantía de satisfacción 100%</li>
                              <li className="flex items-center"><CheckCircle className="w-5 h-5 text-blue-500 mr-2" />15+ años de experiencia en Birmingham</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Excellence Section */}
              <div className="mb-20">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-800 mb-6">Por Qué Birmingham Confía en Nuestro Servicio de Reparación de AC</h2>
                  <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                    Expertos profesionales en HVAC sirviendo a Birmingham y comunidades circundantes con calidad y confiabilidad incomparables.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 border-t-4 border-green-500">
                    <div className="bg-green-100 p-4 rounded-full w-fit mb-6 mx-auto">
                      <MapPin className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Experiencia Local</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Técnicos locales de Birmingham que entienden el clima subtropical húmedo de Alabama</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Respuesta rápida en todo el Condado Jefferson y áreas circundantes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Experiencia con la diversa vivienda de Birmingham desde el histórico Southside hasta nuevos desarrollos en Hoover</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 border-t-4 border-blue-500">
                    <div className="bg-blue-100 p-4 rounded-full w-fit mb-6 mx-auto">
                      <Shield className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Credenciales Profesionales</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Técnicos HVAC con licencia con capacitación continua y certificación</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Completamente asegurados para su protección y tranquilidad</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                        <span>Empleados con verificación de antecedentes en los que puede confiar en su hogar</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 border-t-4 border-purple-500">
                    <div className="bg-purple-100 p-4 rounded-full w-fit mb-6 mx-auto">
                      <Star className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Excelencia en el Servicio</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span>Disponibilidad de emergencia 24/7 sin cargos por horas extras</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span>Precios por adelantado sin tarifas ocultas o sorpresas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <span>Garantía integral en todas las reparaciones e instalaciones</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency CTA Section */}
              <div className="mb-20">
                <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl shadow-2xl text-white overflow-hidden">
                  <div className="p-12 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/90 to-orange-600/90"></div>
                    <div className="relative z-10">
                      <h2 className="text-5xl font-bold mb-6">🚨 ¡Reparación de AC de Emergencia Disponible Ahora!</h2>
                      <p className="text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
                        ¡No sufra en el calor de Birmingham! Nuestros técnicos de emergencia están esperando 24/7 para restaurar la comodidad a su hogar con servicio rápido y profesional.
                      </p>
                      
                      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-8">
                        <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
                          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-2xl font-bold px-16 py-6 rounded-2xl shadow-2xl">
                            <Phone className="w-8 h-8 mr-4" />
                            ¡Llame 205-835-0111 Ahora!
                          </Button>
                        </a>
                        <div className="bg-white/20 backdrop-blur border border-white/30 px-8 py-4 rounded-xl">
                          <Clock className="w-6 h-6 inline mr-3" />
                          <span className="text-xl font-bold">Disponible 24/7 • Sin Cargos por Horas Extras</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        
        {/* FAQ Section - Clean White Background */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">
                Preguntas Frecuentes
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100 transform hover:scale-105 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">¿Cuánto cuesta la reparación de AC en Birmingham?</h3>
                  <p className="text-gray-700 leading-relaxed">Los costos de reparación de AC en Birmingham varían según el problema específico y el tipo de sistema. Proporcionamos estimaciones gratuitas y por adelantado sin tarifas ocultas. La mayoría de las reparaciones oscilan entre $150-$800, mientras que las instalaciones varían según el tamaño del sistema y el nivel de eficiencia.</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100 transform hover:scale-105 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-green-800">¿Ofrecen reparación de AC de emergencia en Birmingham?</h3>
                  <p className="text-gray-700 leading-relaxed">¡Sí! Proporcionamos reparación de AC de emergencia 24/7 en todo Birmingham y áreas circundantes. Llame al (205) 835-0111 para asistencia inmediata sin cargos por horas extras.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl shadow-lg border border-purple-100 transform hover:scale-105 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-purple-800">¿Tienen licencia para reparación de AC en Alabama?</h3>
                  <p className="text-gray-700 leading-relaxed">Absolutamente. Tenemos licencia completa, fianza y seguro para todo el trabajo de HVAC en Alabama. Nuestros técnicos reciben capacitación continua y certificación para asegurar un servicio de calidad en Birmingham.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-lg border border-orange-100 transform hover:scale-105 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-orange-800">¿Qué tan rápido pueden responder a las llamadas de servicio en Birmingham?</h3>
                  <p className="text-gray-700 leading-relaxed">Proporcionamos respuesta rápida a las llamadas de servicio en Birmingham durante las horas de trabajo, y respuesta rápida de emergencia 24/7. Nuestra ubicación local en Birmingham nos permite servirle rápidamente.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-12">Lo Que Dicen los Clientes de Birmingham</h2>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-12 border border-white/20">
                <blockquote className="text-3xl italic mb-8 leading-relaxed">
                  "¡Excelente servicio de reparación de AC en Birmingham! Arreglaron nuestro aire acondicionado en el día más caluroso del verano. Profesionales, honestos y con precios justos. Altamente recomendado para cualquier necesidad de HVAC en el área de Birmingham."
                </blockquote>
                <p className="text-2xl font-semibold">- Sarah M., Residente de Birmingham</p>
                <div className="flex justify-center mt-8">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-10 h-10 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-6xl font-bold mb-8">
              ¿Listo para Comenzar?
            </h2>
            <p className="text-2xl mb-12 font-semibold max-w-4xl mx-auto">¡Contáctenos hoy para un servicio de reparación de AC rápido y profesional en Birmingham!</p>
            <a href="tel:2058350111">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold text-3xl px-20 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Phone className="w-10 h-10 mr-4" />
                Llame Ahora: (205) 835-0111
              </Button>
            </a>
          </div>
        </section>
        
        <Footer lang="es" />
      </div>
    </>
  )
}