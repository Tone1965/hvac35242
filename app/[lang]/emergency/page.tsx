"use client"
import Header from "@/components/Header"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Clock, Shield, AlertTriangle, CheckCircle, Thermometer } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage({ params }: { params: { lang: "en" | "es" } }) {
  const [responseTime, setResponseTime] = useState(12)
  const [techniciansAvailable, setTechniciansAvailable] = useState(8)

  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime(prev => Math.max(8, Math.min(20, prev + (Math.random() - 0.5) * 2)))
      setTechniciansAvailable(prev => Math.max(5, Math.min(12, prev + (Math.random() - 0.5))))
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  const emergencyReasons = [
    "Complete AC failure during Birmingham's 95° summer heat",
    "Furnace breakdown in freezing winter temperatures", 
    "Strange burning smells from HVAC equipment",
    "Water leaking from AC unit causing damage",
    "No airflow throughout your home or business",
    "Electrical issues with HVAC system",
    "Carbon monoxide detector triggered",
    "Ice buildup on outdoor AC unit in summer"
  ]

  const responseProcess = [
    { step: 1, title: "You Call", desc: "Call (205) 555-HVAC and speak to a real person immediately" },
    { step: 2, title: "We Respond", desc: "Certified technician dispatched quickly" },
    { step: 3, title: "We Arrive", desc: "Fast on-site arrival with fully-stocked emergency truck" },
    { step: 4, title: "We Fix It", desc: "95% of emergencies resolved same visit with parts on hand" }
  ]

  return (
    <div>
      {/* Emergency Header - Eugene Schwartz Style */}
      <Header lang={params.lang} variant="emergency" />
      <section className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-xl font-bold mb-2">🚨 BIRMINGHAM HVAC EMERGENCY ALERT 🚨</div>
          <h1 className="text-5xl font-bold mb-4">24/7 Emergency HVAC Service</h1>
          <p className="text-2xl mb-6">Licensed Birmingham HVAC Contractors</p>
          
          {/* Service Info */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-lg font-bold">
              <div className="flex items-center">
                <Thermometer className="w-6 h-6 mr-2 text-yellow-300" />
                <span>Alabama Licensed</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-2 text-green-300" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-blue-300" />
                <span>Insured & Bonded</span>
              </div>
            </div>
          </div>
          
          <Link href="tel:2055554822">
            <Button size="lg" variant="secondary" className="text-2xl px-12 py-6 animate-pulse">
              <Phone className="w-8 h-8 mr-4" />
              CALL NOW: (205) 555-HVAC
            </Button>
          </Link>
          <p className="mt-4 text-lg opacity-90">We answer on the first ring. Don't wait another minute.</p>
        </div>
      </section>

      {/* Emergency Situations */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-800">
            HVAC Emergencies We Handle 24/7
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyReasons.map((reason, index) => (
              <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-md border-l-4 border-red-600">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                <p className="text-lg">{reason}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-red-700 font-semibold mb-4">
              Don't see your emergency? Call anyway - we handle ALL HVAC crises\!
            </p>
            <Link href="tel:2055554822">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-xl px-8 py-4">
                <Phone className="w-6 h-6 mr-3" />
                Emergency Hotline: (205) 555-HVAC
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our 4-Step Emergency Response Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {responseProcess.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Birmingham Trusts Us With Their Emergencies</h2>
          
          {/* Service Standards */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-center mb-4">Professional Service Standards</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">Licensed</div>
                <div className="text-sm text-gray-600">Alabama State License</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">Insured</div>
                <div className="text-sm text-gray-600">Fully Bonded & Insured</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Emergency Service</div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-2 border-blue-200">
              <div className="relative mb-6">
                <Clock className="w-16 h-16 text-blue-600 mx-auto" />
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">✓</div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Response</h3>
              <p className="text-lg mb-4">Professional emergency service available 24/7.</p>
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-bold">Licensed & Insured Service</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Professional Service</h3>
              <p className="text-lg mb-4">Our technicians carry common parts for many emergency repairs.</p>
              <p className="text-sm text-green-600 font-semibold">Quality workmanship guaranteed</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <CheckCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">30-Day Warranty</h3>
              <p className="text-lg mb-4">All emergency repairs backed by our 30-day guarantee. If it fails, we return free.</p>
              <p className="text-sm text-purple-600 font-semibold">Your satisfaction is guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Emergency Service Information</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 p-8 rounded-lg border-2 border-red-200 mb-8">
              <h3 className="text-3xl font-bold text-red-600 mb-4">24/7 Emergency Service</h3>
              <p className="text-xl mb-4">Professional emergency response, diagnosis, and repair estimates.</p>
              <p className="text-lg text-red-700 font-semibold">Licensed and insured HVAC contractors</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-2">What's Included:</h4>
                <ul className="text-left space-y-2">
                  <li>✓ 24/7 emergency response</li>
                  <li>✓ Complete system diagnosis</li>
                  <li>✓ Written repair estimate</li>
                  <li>✓ Safety inspection</li>
                  <li>✓ 30-day repair warranty</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-2">No Hidden Fees:</h4>
                <ul className="text-left space-y-2">
                  <li>✓ No overtime charges</li>
                  <li>✓ No weekend premiums</li>
                  <li>✓ No trip charges</li>
                  <li>✓ No diagnostic fees if you decline repair</li>
                  <li>✓ Upfront pricing before we start</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stop Reading. Start Calling.</h2>
          <p className="text-2xl mb-6">Your family is counting on you. Don't let them down.</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-xl mb-4">Right now, your HVAC emergency is getting worse. The temperature is climbing. Your energy bills are skyrocketing.</p>
            <p className="text-xl font-bold text-yellow-300">But it doesn't have to be this way.</p>
          </div>
          <Link href="tel:2055554822">
            <Button size="lg" variant="secondary" className="text-3xl px-12 py-6 animate-pulse">
              <Phone className="w-8 h-8 mr-4" />
              CALL (205) 555-HVAC NOW
            </Button>
          </Link>
          <div className="mt-6 space-y-1 text-lg">
            <p>📞 Professional phone service</p>
            <p>🚚 Licensed technicians available</p>
            <p>✅ Quality emergency repairs</p>
            <p>🏢 Serving Birmingham area</p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <Link href={`/${params.lang}`} className="hover:text-red-400 transition-colors">← Back to Home</Link>
            <Link href={`/${params.lang}/services`} className="hover:text-red-400 transition-colors">All Services</Link>
            <Link href={`/${params.lang}/contact`} className="hover:text-red-400 transition-colors">Contact Us</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
