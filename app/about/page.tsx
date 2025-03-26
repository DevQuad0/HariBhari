import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Clock, Globe, Heart, Leaf, Shield, Sprout } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-green-900/70 z-10" />
        <div className="relative h-[300px] md:h-[400px]">
          {/* Using a relevant agricultural image for the hero section */}
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop"
            alt="Agricultural field with crops"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-20 -mt-20 md:-mt-24">
          <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4 mb-6">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                About HariBhari
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story & Mission</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover how HariBhari aims to revolutionize agriculture in India through sustainable practices,
                technology, and community support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Our Vision</div>
            <h2 className="text-3xl font-bold tracking-tighter">Empowering Indian Farmers</h2>
            <p className="text-muted-foreground">
              At HariBhari, we envision a future where every Indian farmer has access to the resources, technology, and
              market opportunities needed to thrive. We believe in sustainable agriculture that benefits farmers,
              consumers, and the planet.
            </p>
            <div className="pt-4">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/contact">
                  Join Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Our Values</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Drives Us</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our core values shape everything we do at HariBhari.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-100">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We promote farming practices that are environmentally sustainable and economically viable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community and collective knowledge sharing among farmers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with transparency and honesty in all our interactions with farmers and partners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously seek innovative solutions to address the challenges faced by Indian farmers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Vision (replacing Achievements section) */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Our Approach</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Building for the Future</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              We're developing solutions to support sustainable agriculture across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Supporting Farmers</h3>
                <p className="text-muted-foreground">
                  We aim to help farmers across India improve their agricultural practices and increase their income
                  through sustainable methods.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Growing Network</h3>
                <p className="text-muted-foreground">
                  We're building a network across India to provide localized support and resources to farmers in
                  different regions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sustainable Initiatives</h3>
                <p className="text-muted-foreground">
                  We're developing initiatives to promote sustainable farming practices that benefit both farmers and
                  the environment.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Long-term Vision</h3>
                <p className="text-muted-foreground">
                  We're dedicated to transforming Indian agriculture through technology and community support for
                  generations to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Our Team</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet the People Behind HariBhari</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our team brings together expertise in agriculture, technology, and community development.
            </p>
          </div>

          {/* Team members without images - using text-based cards instead */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Aadeesh Jain", role: "Founder & Technology Director" },
              { name: "Ariba Anjum Qureshi", role: "CEO" },
              { name: "Aashika Yadav", role: "Agricultural Expert" },
              { name: "Aakanksha Chouksey", role: "Community Relations" },
            ].map((member, index) => (
              <Card key={index} className="border-green-100 text-center p-6">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Join Us in Transforming Indian Agriculture
            </h2>
            <p className="max-w-[700px] text-green-50 md:text-xl">
              Whether you're a farmer, agricultural expert, or supporter of sustainable farming, there's a place for you
              in the HariBhari community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="bg-white text-green-600 hover:bg-green-50">
                <Link href="/register">Become a Member</Link>
              </Button>
              <Button variant="outline" asChild className="border-white text-white hover:bg-green-700">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

