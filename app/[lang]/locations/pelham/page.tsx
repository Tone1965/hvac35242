import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import EmergencyBar from '@/components/EmergencyBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MapPin, Clock, Shield, Award, Users } from 'lucide-react'
import Link from 'next/link'

const pelhamHVACSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Pelham HVAC - Professional AC & Heating Service",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2901 Pelham Pkwy",
    "addressLocality": "Pelham",
    "addressRegion": "AL",
    "postalCode": "35124",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.2859,
    "longitude": -86.8097
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 33.2859,
      "longitude": -86.8097
    },
    "geoRadius": "15"
  },
  "priceRange": "$89-$5000",
  "telephone": "205-835-0111",
  "openingHours": "Mo-Su 00:00-23:59",
  "paymentAccepted": ["Cash", "Credit Card", "Check", "Financing"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "HVAC Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "AC Repair Pelham"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Furnace Repair Pelham"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Emergency HVAC Pelham"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Heat Pump Service Pelham"}}
    ]
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does AC repair cost in Pelham AL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AC repair in Pelham AL typically costs between $150-$450 for common issues. Our diagnostic fee is $89, which is applied to any repair. We offer transparent pricing and free estimates for major repairs."
      }
    },
    {
      "@type": "Question",
      "name": "What size AC unit do I need for Pelham humidity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For Pelham's humid climate, you need 1 ton of AC per 400-500 sq ft. A 2,000 sq ft home typically needs a 4-5 ton unit. We provide free load calculations to ensure proper sizing for Alabama humidity."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my AC freezing up in Pelham Alabama?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AC units freeze in Pelham due to restricted airflow (dirty filter), low refrigerant, or thermostat issues. Alabama's high humidity makes this common. Turn off your AC and call us at 205-835-0111 for same-day service."
      }
    },
    {
      "@type": "Question",
      "name": "When should I replace my furnace in Pelham?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Replace your furnace in Pelham when it's over 15 years old, requires frequent repairs, or your energy bills increase significantly. We offer free replacement consultations and 0% financing options."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a permit for HVAC in Pelham AL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Pelham requires permits for HVAC replacements and major repairs. As licensed contractors, we handle all permit applications and ensure code compliance for your peace of mind."
      }
    }
  ]
}

export const metadata: Metadata = {
  title: 'Pelham HVAC | AC Repair & Heating Service Pelham AL 35124',
  description: 'Professional HVAC service in Pelham, Alabama. Expert AC repair, furnace service, emergency HVAC. Serving 35124, 35043. Call 205-835-0111 for same-day service.',
  keywords: 'Pelham HVAC, AC repair Pelham AL, heating repair Pelham Alabama, emergency HVAC Pelham 35124, furnace repair Pelham, heat pump Pelham AL',
  openGraph: {
    title: 'Pelham HVAC - Professional AC & Heating Service',
    description: '24/7 Emergency HVAC Service in Pelham, AL. Licensed technicians, transparent pricing, same-day service.',
    type: 'website',
    locale: 'en_US',
  }
}

export default function PelhamHVACPage({ params }: { params: { lang: 'en' | 'es' } }) {
  const lang = params.lang || 'en'

  const neighborhoods = [
    'Chandalar', 'Ballantrae', 'Highland Lakes', 'Oak Mountain',
    'Riverchase', 'Indian Springs', 'Stonehaven', 'Crosscreek',
    'Lime Creek', 'Canyon Park'
  ]

  const services = [
    { title: 'AC Blowing Warm Air', desc: 'Fast diagnosis and repair when your AC stops cooling', icon: '🌡️' },
    { title: 'Furnace Short Cycling', desc: 'Fix furnaces that turn on and off repeatedly', icon: '🔥' },
    { title: 'AC Freezing Up', desc: 'Thaw and repair frozen AC units same-day', icon: '❄️' },
    { title: 'Heat Pump Not Heating', desc: 'Restore heat pump efficiency quickly', icon: '♨️' },
    { title: 'AC Unit Leaking Water', desc: 'Stop water damage from leaking AC units', icon: '💧' },
    { title: 'Uneven Cooling', desc: 'Balance temperatures throughout your home', icon: '🏠' }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pelhamHVACSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header lang={lang} />
        <EmergencyBar />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Pelham HVAC - Your Trusted AC & Heating Experts
              </h1>
              <p className="text-xl mb-8">
                Professional HVAC Service in Pelham, AL 35124 • Same-Day Emergency Repair • Licensed & Insured
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="mr-2" />
                  Call 205-835-0111
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-blue-800 hover:bg-gray-100">
                  Get Free Estimate
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center"><Shield className="mr-2 h-5 w-5" /> Licensed & Insured</span>
                <span className="flex items-center"><Clock className="mr-2 h-5 w-5" /> 24/7 Emergency</span>
                <span className="flex items-center"><Award className="mr-2 h-5 w-5" /> BBB Accredited</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-6 bg-gray-100 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-700">
              <span className="font-semibold">$89 Diagnostic Fee</span>
              <span className="font-semibold">Free Estimates</span>
              <span className="font-semibold">Price Match Guarantee</span>
              <span className="font-semibold">0% Financing Available</span>
              <span className="font-semibold">Senior/Military Discounts</span>
            </div>
          </div>
        </section>

        {/* Common Problems Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Common HVAC Problems We Fix in Pelham
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-3xl">{service.icon}</span>
                      <span>{service.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.desc}</p>
                    <Button className="mt-4 w-full" variant="outline">
                      Get Help Now →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Services Section */}
        <section className="py-16 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                24/7 Emergency HVAC Service in Pelham
              </h2>
              <p className="text-xl text-gray-700">
                AC breakdown on Sunday? Furnace failure at midnight? We're here!
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <h3 className="text-xl font-bold mb-2">After Hours Service</h3>
                  <p>Emergency HVAC repair Pelham Alabama Sunday, nights, and holidays</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <h3 className="text-xl font-bold mb-2">Same Day Response</h3>
                  <p>Urgent heating repair Pelham AL with technicians ready now</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-red-600" />
                  <h3 className="text-xl font-bold mb-2">Guaranteed Service</h3>
                  <p>Weekend AC service Pelham Alabama with upfront pricing</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Serving All Pelham Neighborhoods
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {neighborhoods.map((area, idx) => (
                <Link
                  key={idx}
                  href={`/${lang}/locations/pelham/${area.toLowerCase().replace(' ', '-')}`}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
                >
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <span className="font-semibold">{area}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Also serving ZIP codes: <strong>35124, 35043</strong> and surrounding areas
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.acceptedAnswer.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Need HVAC Service in Pelham?
            </h2>
            <p className="text-xl mb-8">
              Don't wait for small problems to become emergencies
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="mr-2" />
              Call Now: 205-835-0111
            </Button>
          </div>
        </section>

        <Footer lang={lang} />
      </div>
    </>
  )
}