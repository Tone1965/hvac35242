import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Phone, Clock, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EmergencyPage({ params }: { params: { lang: "en"  < /dev/null |  "es" } }) {
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
    { step: 2, title: "We Respond", desc: "Certified technician dispatched within 30 minutes" },
    { step: 3, title: "We Arrive", desc: "On-site within 2 hours with fully-stocked emergency truck" },
    { step: 4, title: "We Fix It", desc: "95% of emergencies resolved same visit with parts on hand" }
  ]

  return (
    <div>
      {/* Emergency Header */}
      <section className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-xl font-bold mb-2">🚨 HVAC EMERGENCY SERVICE 🚨</div>
          <h1 className="text-5xl font-bold mb-4">24/7 Emergency HVAC Response</h1>
          <p className="text-2xl mb-6">Birmingham's Fastest HVAC Emergency Team</p>
          <Link href="tel:2055554822">
            <Button size="lg" variant="secondary" className="text-2xl px-12 py-6 animate-pulse">
              <Phone className="w-8 h-8 mr-4" />
              CALL NOW: (205) 555-HVAC
            </Button>
          </Link>
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
          <h2 className="text-4xl font-bold text-center mb-12">Emergency Service Guarantees</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">2-Hour Response</h3>
              <p className="text-lg mb-4">We guarantee a certified technician at your location within 2 hours of your call, 24/7/365.</p>
              <p className="text-sm text-blue-600 font-semibold">If we're late, your service call is FREE</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">First-Time Fix</h3>
              <p className="text-lg mb-4">Our trucks carry 2,000+ parts. We fix 95% of emergencies on the first visit.</p>
              <p className="text-sm text-green-600 font-semibold">No return trips, no delays, no excuses</p>
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

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Transparent Emergency Pricing</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 p-8 rounded-lg border-2 border-red-200 mb-8">
              <h3 className="text-3xl font-bold text-red-600 mb-4">Emergency Service Call: $89</h3>
              <p className="text-xl mb-4">This covers our emergency response, diagnosis, and detailed repair quote.</p>
              <p className="text-lg text-red-700 font-semibold">$89 applied toward any repair over $200</p>
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
          <h2 className="text-4xl font-bold mb-6">Every Minute Your HVAC is Down Costs You Money</h2>
          <p className="text-2xl mb-8">Don't suffer another second. Our emergency team is standing by right now.</p>
          <Link href="tel:2055554822">
            <Button size="lg" variant="secondary" className="text-3xl px-12 py-6 animate-pulse">
              <Phone className="w-8 h-8 mr-4" />
              CALL (205) 555-HVAC NOW
            </Button>
          </Link>
          <p className="mt-6 text-xl">Available 24/7/365 • Licensed & Insured • 2-Hour Response Guaranteed</p>
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
