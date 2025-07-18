import { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Phone, Clock, MapPin, Star, CheckCircle, AlertTriangle, Thermometer, Wrench, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: "24/7 Emergency HVAC Repair Mountain Brook AL | Professional AC Service",
  description: "Emergency HVAC repair in Mountain Brook, Alabama. Licensed technicians available 24/7 for AC emergencies. Professional service for your home. Call 205-835-0111",
  keywords: "emergency HVAC repair Mountain Brook, emergency AC repair Mountain Brook Alabama, 24/7 HVAC service Mountain Brook, AC repair Mountain Brook",
  openGraph: {
    title: "Emergency HVAC Repair Mountain Brook - Professional Service",
    description: "Licensed emergency HVAC repair in Mountain Brook. Professional technicians available 24/7.",
    type: "website",
    locale: "en_US",
  }
}

export default function MountainBrookEmergencyHVACPage({ 
  params 
}: { 
  params: { lang: 'en' | 'es' } 
}) {
  return (
    <div className="min-h-screen">
      <Header lang={params.lang} />
      
      {/* Emergency Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/emergency-service.jpg"
          alt="Emergency HVAC Repair Mountain Brook Alabama"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Emergency HVAC Repair<br />
            <span className="text-blue-300">Mountain Brook</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Licensed Emergency HVAC Service for Mountain Brook Homes<br />
            Available 24/7 for AC and Heating Emergencies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-12 py-4 rounded-lg">
                <Phone className="w-6 h-6 mr-3" />
                Call 205-835-0111
              </Button>
            </a>
            <div className="text-blue-200 font-semibold">
              <Clock className="w-5 h-5 inline mr-2" />
              Available 24/7
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
              <span className="font-semibold">Licensed & Insured</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span className="font-semibold">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              <span className="font-semibold">Serving Mountain Brook</span>
            </div>
            <div className="flex items-center">
              <Wrench className="w-6 h-6 mr-2" />
              <span className="font-semibold">Professional Technicians</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Problem Section */}
        <section className="mb-16">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-10 h-10 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-red-800 mb-4">HVAC Emergency in Mountain Brook?</h2>
                <p className="text-xl text-red-700 leading-relaxed mb-6">
                  When your AC fails during Alabama's summer heat, you need reliable emergency service. 
                  Your family's comfort depends on getting your system back up and running quickly.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg">
                    <Thermometer className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Common Emergency Signs:</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• No cool air from vents</li>
                      <li>• Unit running but not cooling</li>
                      <li>• Strange noises or smells</li>
                      <li>• Ice buildup on unit</li>
                      <li>• Thermostat not responding</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <Clock className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-bold text-lg mb-2">Why Act Quickly:</h3>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Restore home comfort</li>
                      <li>• Prevent further damage</li>
                      <li>• Avoid costly repairs</li>
                      <li>• Protect family health</li>
                      <li>• Maintain indoor air quality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Service Process */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Emergency Service Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional HVAC emergency service designed to get your Mountain Brook home comfortable again.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-blue-500">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Emergency Call</h3>
              <p className="text-gray-600">
                Call 205-835-0111 and speak with our team. We'll dispatch a licensed technician to your Mountain Brook home.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-green-500">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Professional Diagnosis</h3>
              <p className="text-gray-600">
                Our technician arrives with diagnostic equipment to identify the problem and provide clear repair options.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-purple-500">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Expert Repair</h3>
              <p className="text-gray-600">
                We complete repairs using quality parts and provide warranty coverage on our work.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Why Mountain Brook Trusts Our Service</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Professional Credentials:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Licensed HVAC technicians</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Fully insured for your protection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Certified on major brands</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Background-checked employees</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Service Excellence:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>24/7 emergency availability</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Upfront pricing - no surprises</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Warranty on all repairs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>Serving Mountain Brook since 2009</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mountain Brook HVAC Issues */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Common Mountain Brook HVAC Emergencies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Summer Cooling Issues:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• AC not cooling during heat waves</li>
                <li>• Frozen evaporator coils</li>
                <li>• Refrigerant leaks</li>
                <li>• Compressor failures</li>
                <li>• Electrical component issues</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Winter Heating Problems:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Heat pump not heating</li>
                <li>• Furnace not igniting</li>
                <li>• Thermostat malfunctions</li>
                <li>• Ductwork issues</li>
                <li>• Air quality problems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 text-white p-12 rounded-xl">
          <h2 className="text-4xl font-bold mb-4">Need Emergency HVAC Service?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't wait when your HVAC system fails. Our licensed technicians are ready to help restore 
            comfort to your Mountain Brook home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a href="tel:2058350111" className="transform hover:scale-105 transition-transform">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-2xl font-bold px-12 py-4 rounded-lg">
                <Phone className="w-6 h-6 mr-3" />
                Call 205-835-0111
              </Button>
            </a>
          </div>
          
          <p className="text-blue-200 font-semibold">
            Available 24/7 • Licensed & Insured • Serving Mountain Brook
          </p>
        </section>

      </main>
      
      <Footer lang={params.lang} />
    </div>
  )
}