import Link from "next/link"
import { ArrowRight, Leaf, Tractor, Users, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeaturedServices from "@/components/featured-services"
import TestimonialSection from "@/components/testimonial-section"
import StatisticsSection from "@/components/statistics-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Mission Statement */}
      <section id="mission-section" className="py-16 md:py-20 bg-gradient-to-b from-emerald-50 to-lime-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-block rounded-lg bg-gradient-to-r from-emerald-100 to-lime-100 px-4 py-2 text-sm text-emerald-800 font-medium">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
              Supporting Indian Farmers
            </h2>
            <p className="text-emerald-700 md:text-xl leading-relaxed">
              HariBhari is dedicated to empowering farmers across India with sustainable agricultural practices, modern
              technology, and fair market access. We believe in creating a future where every farmer has the tools and
              knowledge to thrive.
            </p>
            <div className="pt-4">
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
              >
                <Link href="/about">
                  Learn About Our Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <FeaturedServices />

      {/* Membership Benefits */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="inline-block rounded-lg bg-gradient-to-r from-emerald-100 to-lime-100 px-3 py-1 text-sm text-emerald-800">
              Membership Benefits
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-800">
              Join the HariBhari Community
            </h2>
            <p className="max-w-[700px] text-emerald-700 md:text-xl">
              Become a member and unlock exclusive benefits to enhance your farming journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-emerald-100 hover:shadow-md hover:border-emerald-200 transition-all">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-emerald-800">Basic Membership</h3>
              <p className="text-emerald-600 mb-4">Access to market rates and basic farming resources.</p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Market price updates</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Basic farming guides</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Community forum access</span>
                </li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="mt-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Link href="/register">Join Free</Link>
              </Button>
            </div>

            <div className="flex flex-col p-6 bg-gradient-to-b from-emerald-50 to-lime-50 rounded-xl shadow-md border border-emerald-200 relative transform hover:scale-105 transition-all">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-4">
                <Tractor className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-emerald-800">Premium Membership</h3>
              <p className="text-emerald-600 mb-4">Enhanced access with additional benefits.</p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>All Basic features</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Ad-free experience</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Premium farming guides</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Discounts on products</span>
                </li>
              </ul>
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white mt-auto"
              >
                <Link href="/register">Join Premium</Link>
              </Button>
            </div>

            <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-emerald-100 hover:shadow-md hover:border-emerald-200 transition-all">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-emerald-800">Business Membership</h3>
              <p className="text-emerald-600 mb-4">For agricultural businesses and large farms.</p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>All Premium features</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Business analytics</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-lime-500 mr-2" />
                  <span>Bulk purchase options</span>
                </li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="mt-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mandi Rates Preview */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-50 to-lime-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block rounded-lg bg-gradient-to-r from-emerald-100 to-lime-100 px-3 py-1 text-sm text-emerald-800">
              Coming Soon
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-800 mt-4">
              Krishi Upaj Mandi Rate List
            </h2>
            <p className="text-emerald-700 md:text-xl mt-4 mb-6">
              Access crop prices from Krishi Upaj Mandis. Make informed decisions about when and where to sell your
              produce. Stay updated with the latest market trends and optimize your selling strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
              >
                <Link href="/mandi-rates">
                  View Mandi Rates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <StatisticsSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-600 to-lime-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Farming?
            </h2>
            <p className="max-w-[700px] text-emerald-50 md:text-xl">
              Join the HariBhari community and enhance your agricultural practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button variant="outline" asChild className="border-white text-white hover:bg-emerald-700/20">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

