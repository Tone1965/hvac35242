import Header from "@/components/Header"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Emergency Hvac Repair – Mountain Brook HVAC & Air Services",
  description: "Looking for emergency hvac repair in Mountain Brook? We provide expert service for HVAC, AC, and air quality issues. Call now for fast help!",
}

export default function MountainBrookEmergencyHVACPage() {
    <Header lang="en" variant="location" locationName="Mountain Brook" />
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Emergency Hvac Repair in Mountain Brook</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. The Problem</h2>
        <p className="text-gray-700 leading-relaxed">
          It's the middle of summer in Mountain Brook, and your AC just isn't doing the job. The vents are blowing, 
          but the air's not cool—and you're stuck sweating it out while your home heats up. You need help fast.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. What We Do</h2>
        <p className="text-gray-700 leading-relaxed">
          We diagnose AC problems in under 15 minutes and fix most issues on the first visit. Whether it's a dirty filter, 
          low refrigerant, or a frozen coil, our licensed techs have seen it all—and carry parts for the most common 
          problems right on the truck.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Same-day service in Mountain Brook</li>
          <li>Certified for Trane, Carrier, Goodman, and more</li>
          <li>1,900+ homes served across Jefferson County</li>
          <li>5-star average from local homeowners</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Common Causes of AC Failure</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <svg width="100%" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <style>{`
              .bar { fill: hsl(217, 91%, 60%); }
              .label { fill: #1f2937; font-size: 12px; text-anchor: middle; }
            `}</style>
            <rect className="bar" x="40" y="30.0" width="40" height="150.0"/>
            <text className="label" x="60.0" y="195">Dirty Filter</text>
            <rect className="bar" x="100" y="72.85714285714286" width="40" height="107.14285714285714"/>
            <text className="label" x="120.0" y="195">Low Refrigerant</text>
            <rect className="bar" x="160" y="94.28571428571429" width="40" height="85.71428571428571"/>
            <text className="label" x="180.0" y="195">Frozen Coil</text>
            <rect className="bar" x="220" y="115.71428571428572" width="40" height="64.28571428571428"/>
            <text className="label" x="240.0" y="195">Thermostat Issue</text>
            <rect className="bar" x="280" y="158.57142857142858" width="40" height="21.428571428571427"/>
            <text className="label" x="300.0" y="195">Other</text>
          </svg>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Our Process (Visual)</h2>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <p className="text-center">
            <strong>SVG diagram showing airflow from intake vent through evaporator coil to duct output. 
            Styled with Tailwind gradients and rounded borders.</strong>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Book Now</h2>
        <p className="text-gray-700 mb-4">We waive the service fee when you book by 4PM today.</p>
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <p className="text-green-800">
            ✅ <a href="tel:2058350111" className="text-primary hover:underline font-semibold">Call Now (205) 835-0111</a> or 
            <a href="/quote" className="text-primary hover:underline font-semibold ml-2">Book Online</a>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. FAQ</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Q: What if I'm not sure what's wrong?</h3>
          <p className="text-gray-700">
            A: That's what we're here for. We'll find the problem fast—and explain your options clearly.
          </p>
        </div>
      </section>

      <div className="border-t pt-8 mt-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Serving Mountain Brook and surrounding Jefferson County areas</p>
          <a 
            href="tel:2058350111" 
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Call (205) 835-0111 for Emergency Service
          </a>
        </div>
      </div>
    </div>
  )
}