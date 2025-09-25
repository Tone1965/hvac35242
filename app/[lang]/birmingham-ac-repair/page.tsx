import { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Phone, Clock, MapPin, Star, CheckCircle, AlertTriangle, Thermometer, Wrench, Shield } from 'lucide-react'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'es' } }): Promise<Metadata> {
  const isSpanish = params.lang === 'es'
  
  return {
    title: isSpanish 
      ? 'Reparación de AC en Birmingham AL | Servicio el Mismo Día | 205-835-0111'
      : '24/7 Emergency AC Repair Birmingham AL | Professional HVAC Service',
    description: isSpanish
      ? 'Reparación profesional de aire acondicionado en Birmingham Alabama. 15+ años de experiencia, calificación A+ BBB.'
      : 'Emergency AC repair in Birmingham, Alabama. Licensed technicians available 24/7 for AC emergencies. Professional service for your home. Call 205-835-0111',
    keywords: isSpanish
      ? 'reparación AC Birmingham, reparación aire acondicionado Birmingham AL, reparación HVAC Birmingham'
      : 'emergency AC repair Birmingham, emergency HVAC repair Birmingham Alabama, 24/7 AC service Birmingham, AC repair Birmingham',
  }
}

export default function BirminghamACRepairPage({ params }: { params: { lang: 'en' | 'es' } }) {
  const isSpanish = params.lang === 'es'
  
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/same-day-hvac-repair.jpg"
          alt={isSpanish ? "Reparación de AC Birmingham Alabama" : "Same Day AC Repair Birmingham Alabama"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {isSpanish ? (
              <>
                Servicios Expertos de<br />
                <span className="text-blue-300">Reparación de AC</span><br />
                en Birmingham, Alabama
              </>
            ) : (
              <>
                Expert AC Repair<br />
                <span className="text-blue-300">Services</span><br />
                in Birmingham, Alabama
              </>
            )}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {isSpanish ? (
              "Servicio el Mismo Día • Licenciado y Asegurado • 15+ Años de Experiencia"
            ) : (
              "Same Day Service • Licensed & Insured • 15+ Years Experience"
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <Phone className="w-6 h-6 mr-3" />
                {isSpanish ? "Llame 205-835-0111" : "Call 205-835-0111"}
              </Button>
            </a>
            <div className="text-blue-200 font-semibold">
              <Clock className="w-5 h-5 inline mr-2" />
              {isSpanish ? "Disponible 24/7" : "Available 24/7"}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <span className="font-semibold">{isSpanish ? "Licenciado y Asegurado" : "Licensed & Insured"}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span className="font-semibold">{isSpanish ? "Servicio el Mismo Día" : "Same Day Service"}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              <span className="font-semibold">{isSpanish ? "Sirviendo Birmingham" : "Serving Birmingham"}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-6 h-6 mr-2" />
              <span className="font-semibold">{isSpanish ? "Calificación A+ BBB" : "A+ BBB Rating"}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
        
        {/* Problem Agitation Section */}
        <section className="mb-16">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-10 h-10 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-red-800 mb-4">
                  {isSpanish ? "Por Qué los Residentes de Birmingham Eligen Birmingham HVAC Experts para Reparación de AC" : "Why Birmingham Residents Choose Birmingham HVAC Experts for AC Repair"}
                </h2>
                <p className="text-lg text-red-700 leading-relaxed mb-6">
                  {isSpanish ? (
                    "Su AC acaba de morir en el día más caluroso en la historia de Birmingham, Alabama. Son las 3 PM, 98°F afuera, y mientras otros disfrutan el aire fresco en Railroad Park, su casa se está convirtiendo en un horno. Sus hijos están sudando, sus mascotas están jadeando, y usted está desesperado por alivio. Cada minuto que pasa sin aire acondicionado funcional no es solo incómodo - es peligroso para su familia y costoso para su billetera mientras su sistema lucha y potencialmente se daña más."
                  ) : (
                    "Your AC just died on the hottest day in Birmingham, Alabama history. It's 3 PM, 98°F outside, and while others enjoy the cool breeze at Railroad Park, your home is turning into an oven. Your kids are sweating, your pets are panting, and you're desperate for relief. Every minute that passes without working air conditioning isn't just uncomfortable - it's dangerous for your family and expensive for your wallet as your system struggles and potentially damages itself further."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T Authority Section */}
        <section className="mb-16">
          <div className="bg-gray-50/80 rounded-xl shadow-lg p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              {isSpanish ? "Contratistas de Reparación de AC con Licencia Sirviendo Birmingham" : "Licensed AC Repair Contractors Serving Birmingham"}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-blue-600 mr-3" />
                  <h4 className="text-lg font-semibold">{isSpanish ? "Credenciales Profesionales" : "Professional Credentials"}</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "Certificados NATE" : "NATE Certified Technicians"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "Licenciados EPA" : "EPA Licensed"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "Calificación A+ BBB desde 2008" : "A+ BBB Rating since 2008"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "Completamente asegurado" : "Fully Insured"}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Star className="w-8 h-8 text-yellow-500 mr-3" />
                  <h4 className="text-lg font-semibold">{isSpanish ? "Experiencia Comprobada" : "Proven Experience"}</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "15+ años sirviendo Birmingham" : "15+ years serving Birmingham"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "5,000+ reparaciones exitosas" : "5,000+ successful repairs"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "Verificados en antecedentes" : "Background checked employees"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{isSpanish ? "Garantía de satisfacción 100%" : "100% satisfaction guarantee"}</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 text-center">
              {isSpanish ? (
                "Birmingham HVAC Experts no es solo otro contratista - somos sus vecinos, sirviendo familias locales con el más alto nivel de experiencia técnica y servicio al cliente. Nuestro equipo está completamente asegurado, verificado en antecedentes, y comprometido con su satisfacción total."
              ) : (
                "Birmingham HVAC Experts isn't just another contractor - we're your neighbors, serving local families with the highest level of technical expertise and customer service. Our team is fully insured, background-checked, and committed to your complete satisfaction."
              )}
            </p>
          </div>
        </section>

        {/* Service Process */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {isSpanish ? "Nuestro Proceso de Reparación de AC" : "Our AC Repair Process"}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isSpanish ? 
                "Servicio profesional de AC diseñado para restaurar la comodidad de su hogar en Birmingham." :
                "Professional AC service designed to restore comfort to your Birmingham home."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-50/90 p-8 rounded-xl shadow-lg text-center border-t-4 border-blue-500">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">{isSpanish ? "1. Llamada de Emergencia" : "1. Emergency Call"}</h4>
              <p className="text-gray-600">
                {isSpanish ? 
                  "Llame al 205-835-0111 y hable con nuestro equipo. Enviaremos un técnico licenciado a su hogar en Birmingham." :
                  "Call 205-835-0111 and speak with our team. We'll dispatch a licensed technician to your Birmingham home."
                }
              </p>
            </div>
            
            <div className="bg-slate-50/90 p-8 rounded-xl shadow-lg text-center border-t-4 border-green-500">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">{isSpanish ? "2. Diagnóstico Profesional" : "2. Professional Diagnosis"}</h4>
              <p className="text-gray-600">
                {isSpanish ? 
                  "Nuestro técnico llega con equipo de diagnóstico para identificar el problema y proporcionar opciones claras de reparación." :
                  "Our technician arrives with diagnostic equipment to identify the problem and provide clear repair options."
                }
              </p>
            </div>
            
            <div className="bg-slate-50/90 p-8 rounded-xl shadow-lg text-center border-t-4 border-purple-500">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">{isSpanish ? "3. Reparación Experta" : "3. Expert Repair"}</h4>
              <p className="text-gray-600">
                {isSpanish ? 
                  "Completamos las reparaciones utilizando piezas de calidad y proporcionamos cobertura de garantía en nuestro trabajo." :
                  "We complete repairs using quality parts and provide warranty coverage on our work."
                }
              </p>
            </div>
          </div>
        </section>

        {/* Local Birmingham Focus */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              {isSpanish ? "Servicio Local de Birmingham con Enfoque en Resultados" : "Local Birmingham Service with Results Focus"}
            </h3>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {isSpanish ? (
                "Especializamos en reparación de AC de respuesta rápida en Birmingham, desde Railroad Park hasta Forest Park, sirviendo 35209, 35213, 35242, y todos los vecindarios circundantes de Birmingham. Ya sea que viva cerca del Birmingham Civil Rights Institute o en las áreas residenciales cerca de Vulcan Park, nuestros técnicos locales entienden los desafíos únicos del clima húmedo de Alabama y están equipados con piezas de repuesto para todas las marcas principales. Ofrecemos diagnósticos transparentes por adelantado, garantías de trabajo completas, y nos enorgullecemos de restaurar la comodidad de su hogar el mismo día."
              ) : (
                "We specialize in rapid-response AC repair throughout Birmingham, from Railroad Park to Forest Park, serving 35209, 35213, 35242, and all surrounding Birmingham neighborhoods. Whether you live near the Birmingham Civil Rights Institute or in residential areas around Vulcan Park, our local technicians understand Alabama's unique humid climate challenges and come equipped with replacement parts for all major brands. We offer transparent upfront diagnostics, complete work warranties, and pride ourselves on restoring your home's comfort the same day."
              )}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">{isSpanish ? "Cobertura Local" : "Local Coverage"}</h4>
                <p className="text-sm text-gray-600">{isSpanish ? "Todo Birmingham Metro" : "All Birmingham Metro"}</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">{isSpanish ? "Respuesta Rápida" : "Rapid Response"}</h4>
                <p className="text-sm text-gray-600">{isSpanish ? "Servicio el mismo día" : "Same day service"}</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">{isSpanish ? "Garantizado" : "Guaranteed"}</h4>
                <p className="text-sm text-gray-600">{isSpanish ? "Trabajo 100% garantizado" : "100% guaranteed work"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency + Guarantee Section */}
        <section className="mb-16">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-10 h-10 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-red-800 mb-4">
                  {isSpanish ? "¡No Espere - Cada Minuto Cuenta!" : "Don't Wait - Every Minute Counts!"}
                </h3>
                <p className="text-lg text-red-700 leading-relaxed mb-6">
                  {isSpanish ? (
                    "¡Llame AHORA: 205-835-0111 - Cada minuto le cuesta comodidad y dinero! Mientras espera, su sistema de AC podría estar sufriendo daños irreversibles que convertirán una reparación simple en un reemplazo costoso. No permita que una reparación de $200 se convierta en un reemplazo de $5,000. Nuestros técnicos están en camino ahora mismo - garantizamos respuesta el mismo día o su diagnóstico es GRATIS."
                  ) : (
                    "Call NOW: 205-835-0111 - Every minute costs you comfort and money! While you wait, your AC system could be suffering irreversible damage that will turn a simple repair into an expensive replacement. Don't let a $200 repair become a $5,000 replacement. Our technicians are standing by right now - we guarantee same-day response or your diagnostic is FREE."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common AC Problems Birmingham */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            {isSpanish ? "Problemas Comunes de AC en Birmingham" : "Common AC Problems in Birmingham"}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50/90 p-6 rounded-lg shadow-lg border-l-4 border-red-500">
              <div className="flex items-center mb-4">
                <Thermometer className="w-8 h-8 text-red-500 mr-3" />
                <h4 className="text-xl font-bold">
                  {isSpanish ? "Problemas de Verano en Alabama" : "Alabama Summer Issues"}
                </h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                {isSpanish ? (
                  <>
                    <li>• AC no enfría durante olas de calor</li>
                    <li>• Bobinas del evaporador congeladas</li>
                    <li>• Fugas de refrigerante</li>
                    <li>• Fallas del compresor</li>
                    <li>• Problemas de componentes eléctricos</li>
                    <li>• Filtros obstruidos por polen</li>
                  </>
                ) : (
                  <>
                    <li>• AC not cooling during heat waves</li>
                    <li>• Frozen evaporator coils</li>
                    <li>• Refrigerant leaks</li>
                    <li>• Compressor failures</li>
                    <li>• Electrical component issues</li>
                    <li>• Filters clogged with pollen</li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="bg-gray-50/90 p-6 rounded-lg shadow-lg border-l-4 border-blue-500 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <Wrench className="w-8 h-8 text-blue-500 mr-3" />
                <h4 className="text-xl font-bold">
                  {isSpanish ? "Problemas de Invierno" : "Winter Issues"}
                </h4>
              </div>
              <ul className="space-y-2 text-gray-700">
                {isSpanish ? (
                  <>
                    <li>• Bomba de calor no calienta</li>
                    <li>• Horno no enciende</li>
                    <li>• Mal funcionamiento del termostato</li>
                    <li>• Problemas de conductos</li>
                    <li>• Problemas de calidad del aire</li>
                    <li>• Válvulas de reversión atascadas</li>
                  </>
                ) : (
                  <>
                    <li>• Heat pump not heating</li>
                    <li>• Furnace not igniting</li>
                    <li>• Thermostat malfunctions</li>
                    <li>• Ductwork issues</li>
                    <li>• Air quality problems</li>
                    <li>• Stuck reversing valves</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Why Birmingham Trusts Us */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              {isSpanish ? "Por Qué Birmingham Confía en Nosotros" : "Why Birmingham Trusts Us"}
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-slate-50/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">
                  {isSpanish ? "Licenciado" : "Licensed"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isSpanish ? "Contratista HVAC licenciado en Alabama" : "Alabama Licensed HVAC Contractor"}
                </p>
              </div>
              
              <div className="bg-slate-50/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">
                  {isSpanish ? "Disponible 24/7" : "24/7 Available"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isSpanish ? "Servicio de emergencia real" : "True emergency service"}
                </p>
              </div>
              
              <div className="bg-slate-50/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">
                  {isSpanish ? "Local" : "Local"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isSpanish ? "Sirviendo Birmingham desde 2008" : "Serving Birmingham since 2008"}
                </p>
              </div>
              
              <div className="bg-slate-50/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <CheckCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">
                  {isSpanish ? "Garantizado" : "Guaranteed"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isSpanish ? "Trabajo garantizado por escrito" : "Written work warranty"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area Coverage */}
        <section className="mb-16">
          <div className="bg-slate-50/90 rounded-xl shadow-lg p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-center mb-6">
              {isSpanish ? "Áreas de Servicio en Birmingham" : "Birmingham Service Areas"}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">
                  {isSpanish ? "Centro de Birmingham" : "Central Birmingham"}
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Downtown Birmingham</li>
                  <li>• Five Points South</li>
                  <li>• Southside</li>
                  <li>• UAB Area</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-green-600">
                  {isSpanish ? "Suburbios del Sur" : "South Suburbs"}
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Homewood</li>
                  <li>• Mountain Brook</li>
                  <li>• Vestavia Hills</li>
                  <li>• Hoover</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">
                  {isSpanish ? "Áreas Circundantes" : "Surrounding Areas"}
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Irondale</li>
                  <li>• Gardendale</li>
                  <li>• Fultondale</li>
                  <li>• Pelham</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6">
              {isSpanish ? 
                "Y muchas más áreas del Metro Birmingham. Llame para confirmar cobertura." :
                "And many more Birmingham Metro areas. Call to confirm coverage."
              }
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-blue-600 text-white p-12 rounded-xl">
          <h3 className="text-4xl font-bold mb-4">
            {isSpanish ? "¡Deje de Sufrir! Garantía de Reparación el Mismo Día o Su Servicio es GRATIS" : "Stop Suffering! Same-Day Repair Guarantee or Your Service is FREE"}
          </h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {isSpanish ? (
              "No espere cuando su sistema AC falle. Nuestros técnicos licenciados están listos para ayudar a restaurar la comodidad de su hogar en Birmingham."
            ) : (
              "Don't wait when your AC system fails. Our licensed technicians are ready to help restore comfort to your Birmingham home."
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-2xl font-bold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <Phone className="w-6 h-6 mr-3" />
                205-835-0111
              </Button>
            </a>
          </div>
          
          <p className="text-blue-200 font-semibold">
            {isSpanish ? (
              "Disponible 24/7 • Técnicos Locales • Garantía de Satisfacción 100%"
            ) : (
              "Available 24/7 • Local Technicians • 100% Satisfaction Guarantee"
            )}
          </p>
        </section>

      </main>
      
      <Footer lang={params.lang} />
    </div>
  )
}