import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Shield, Star, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function QuotePage({ params }: { params: { lang: "en" | "es" } }) {
  return (
    <div>
      {/* Header */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Get Your Free HVAC Quote</h1>
          <p className="text-2xl mb-6">Professional Assessment • Honest Pricing • No Pressure Sales</p>
          <div className="flex items-center justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <span>No Obligation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-slate-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Request Your Free Quote</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Property Address *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Street Address" required />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="City" required />
                  </div>
                  <div>
                    <select className="w-full p-3 border border-gray-300 rounded-lg" required>
                      <option value="">State</option>
                      <option value="AL">Alabama</option>
                    </select>
                  </div>
                  <div>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="ZIP Code" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Service Needed *</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg" required>
                    <option value="">Select Service</option>
                    <option value="installation">New HVAC Installation</option>
                    <option value="replacement">System Replacement</option>
                    <option value="repair">Repair Service</option>
                    <option value="maintenance">Maintenance Plan</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="property" value="residential" className="mr-2" />
                      Residential Home
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="property" value="commercial" className="mr-2" />
                      Commercial Building
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Home Size (Square Feet)</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option value="">Select Size</option>
                    <option value="under1000">Under 1,000 sq ft</option>
                    <option value="1000-1500">1,000 - 1,500 sq ft</option>
                    <option value="1500-2000">1,500 - 2,000 sq ft</option>
                    <option value="2000-2500">2,000 - 2,500 sq ft</option>
                    <option value="2500-3000">2,500 - 3,000 sq ft</option>
                    <option value="over3000">Over 3,000 sq ft</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Contact Time</label>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="time" value="morning" className="mr-2" />
                      Morning
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="time" value="afternoon" className="mr-2" />
                      Afternoon
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="time" value="evening" className="mr-2" />
                      Evening
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Details</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg" 
                    rows={4} 
                    placeholder="Tell us about your HVAC needs, current issues, or any specific requirements..."
                  ></textarea>
                </div>
                
                <Button className="w-full text-xl py-4 bg-blue-600 hover:bg-blue-700">
                  Get My Free Quote Now
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  By submitting this form, you consent to be contacted by Birmingham HVAC Pro about your request.
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Birmingham HVAC Pro?</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Star className="w-8 h-8 text-yellow-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">500+ Five-Star Reviews</h3>
                    <p className="text-gray-600">Birmingham families trust us for honest, reliable service.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="w-8 h-8 text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Licensed & Insured</h3>
                    <p className="text-gray-600">Fully licensed Alabama contractors with comprehensive insurance.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-8 h-8 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Same-Day Quotes</h3>
                    <p className="text-gray-600">Most quotes delivered within 24 hours of your request.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-8 h-8 text-purple-500 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">No Pressure Sales</h3>
                    <p className="text-gray-600">Honest assessments and fair pricing. No high-pressure tactics.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-3">💰 Save Up to 40% on Energy Bills</h3>
                <p className="text-green-700 mb-4">
                  Our high-efficiency HVAC systems can cut your monthly energy costs by hundreds of dollars.
                </p>
                <ul className="text-green-700 space-y-2">
                  <li>✓ Free energy audit included</li>
                  <li>✓ Rebates up to $2,000 available</li>
                  <li>✓ Financing options from $89/month</li>
                  <li>✓ 10-year parts & labor warranty</li>
                </ul>
              </div>

              <div className="mt-8 p-6 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">Need Service Today?</h3>
                <p className="text-red-700 mb-4">Don't wait for a quote if you have an emergency.</p>
                <Link href={`/${params.lang}/emergency`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Emergency Line: (205) 555-HVAC
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <Link href={`/${params.lang}`} className="hover:text-blue-400 transition-colors">← Back to Home</Link>
            <Link href={`/${params.lang}/services`} className="hover:text-blue-400 transition-colors">All Services</Link>
            <Link href={`/${params.lang}/contact`} className="hover:text-blue-400 transition-colors">Contact Us</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
