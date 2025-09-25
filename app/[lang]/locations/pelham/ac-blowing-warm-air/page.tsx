import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, AlertTriangle, CheckCircle, Clock, Wrench, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AC Blowing Warm Air Pelham Alabama | Fast AC Repair 35124',
  description: 'AC blowing warm air in Pelham AL? Expert diagnosis & same-day repair. Common causes, quick fixes, professional service. Call 205-835-0111 now!',
  keywords: 'ac blowing warm air pelham alabama, ac not cooling pelham al, warm air from ac pelham 35124, ac repair pelham, air conditioner blowing hot air pelham',
}

const problemSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is my AC blowing warm air in Pelham Alabama?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common causes include: low refrigerant (30% of cases), dirty air filter (25%), thermostat issues (20%), frozen evaporator coil (15%), or electrical problems (10%). Our Pelham technicians diagnose the exact cause quickly."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to fix AC blowing warm air in Pelham?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Costs range from $89-150 for simple fixes like filters or thermostats, $200-450 for refrigerant recharge, and $300-800 for compressor issues. We provide upfront pricing before any work begins."
      }
    },
    {
      "@type": "Question",
      "name": "Can I fix my AC blowing warm air myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can check the air filter, thermostat settings, and circuit breaker. However, refrigerant leaks, electrical issues, and compressor problems require professional repair. Call 205-835-0111 for expert service in Pelham."
      }
    }
  ]
}

export default function ACBlowingWarmAirPage({ params }: { params: { lang: 'en' | 'es' } }) {
  const lang = params.lang || 'en'

  const causes = [
    { title: 'Low Refrigerant', percentage: '30%', time: '1-2 hours', cost: '$200-450' },
    { title: 'Dirty Air Filter', percentage: '25%', time: '15 mins', cost: '$89-150' },
    { title: 'Thermostat Issues', percentage: '20%', time: '30 mins', cost: '$89-200' },
    { title: 'Frozen Evaporator', percentage: '15%', time: '2-3 hours', cost: '$150-350' },
    { title: 'Electrical Problems', percentage: '10%', time: '1-2 hours', cost: '$150-400' }
  ]

  const symptoms = [
    'AC running but not cooling',
    'Warm air from all vents',
    'Ice buildup on AC unit',
    'Unusual sounds from system',
    'Higher electric bills',
    'Humidity levels increasing'
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(problemSchema) }}
      />

      <div className="min-h-screen">
        <Header lang={lang} />

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <AlertTriangle className="h-16 w-16 mb-4 animate-pulse" />
              <h1 className="text-5xl font-bold mb-6">
                AC Blowing Warm Air in Pelham?
              </h1>
              <p className="text-2xl mb-8">
                Don't suffer in Alabama heat! Same-day diagnosis & repair for all AC cooling problems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  <Phone className="mr-2" />
                  Call Now: 205-835-0111
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Schedule Service →
                </Button>
              </div>
              <div className="mt-6 text-lg">
                ✓ Available Now • ✓ $89 Diagnostic • ✓ Most Repairs Same Day
              </div>
            </div>
          </div>
        </section>

        {/* Common Causes Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Your AC Is Blowing Warm Air (Pelham Statistics)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {causes.map((cause, idx) => (
                <Card key={idx} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle>{cause.title}</CardTitle>
                    <div className="text-3xl font-bold text-red-600">{cause.percentage}</div>
                    <p className="text-sm text-gray-600">of Pelham cases</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Repair Time:</span>
                        <span className="font-semibold">{cause.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Typical Cost:</span>
                        <span className="font-semibold text-green-600">{cause.cost}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Symptoms Checklist */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              Is Your AC Having These Problems?
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <span className="text-lg">{symptom}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-red-50 rounded-lg">
                  <p className="font-semibold text-red-800">
                    Experiencing any of these? Call 205-835-0111 for immediate help!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* DIY vs Professional */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              What You Can Check vs. What Needs a Pro
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    DIY Checks (Do These First)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li>✓ Check thermostat settings (set to COOL)</li>
                    <li>✓ Replace or clean air filter</li>
                    <li>✓ Check circuit breaker</li>
                    <li>✓ Ensure vents are open</li>
                    <li>✓ Clear debris around outdoor unit</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-6 w-6 text-red-600" />
                    Professional Repairs Needed
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li>⚡ Refrigerant leak detection & recharge</li>
                    <li>⚡ Compressor diagnosis & repair</li>
                    <li>⚡ Electrical component testing</li>
                    <li>⚡ Evaporator coil cleaning/thawing</li>
                    <li>⚡ Capacitor & contactor replacement</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our AC Repair Process in Pelham
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Call Us', desc: 'Describe your AC problem', time: '2 min' },
                { step: '2', title: 'Dispatch', desc: 'Tech en route to Pelham', time: '30-60 min' },
                { step: '3', title: 'Diagnose', desc: 'Find exact cause', time: '15-30 min' },
                { step: '4', title: 'Fix It', desc: 'Repair with your approval', time: '1-3 hours' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <p className="text-sm text-blue-600 mt-2">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Urgency CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl font-bold mb-4">
              Don't Wait in the Heat!
            </h2>
            <p className="text-xl mb-8">
              Pelham temperatures can reach 95°F+ in summer. Get your AC fixed TODAY!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Phone className="mr-2" />
                Emergency: 205-835-0111
              </Button>
            </div>
            <p className="mt-6 text-lg">
              Average wait time: <strong>45 minutes</strong> • Service until <strong>midnight</strong>
            </p>
          </div>
        </section>

        <Footer lang={lang} />
      </div>
    </>
  )
}