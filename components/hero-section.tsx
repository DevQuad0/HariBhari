"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToContent = () => {
    const contentSection = document.getElementById("mission-section")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 to-lime-700/90 z-10" />
      <div className="relative h-[600px] md:h-[700px]">
        <Image
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop"
          alt="Indian farmers in field"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center space-y-8 text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px]">
          <h1
            className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            HariBhari
          </h1>

          <div
            className={`space-y-6 ${isLoaded ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <p className="mx-auto max-w-[700px] text-white/90 text-xl md:text-2xl">
              Empowering Indian Farmers with Modern Solutions
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 mt-6 ${isLoaded ? "animate-slide-up stagger-animation" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/register">
                Join HariBhari <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <div
            className={`pt-8 text-white/70 text-sm ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "0.8s" }}
          >
            Developed with ❤️ by Team DEVQUAD
          </div>

          <button
            onClick={scrollToContent}
            className={`absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 text-white hover:text-lime-300 transition-colors animate-float ${isLoaded ? "opacity-100" : "opacity-0"}`}
            aria-label="Scroll down"
            style={{ animationDelay: "1s" }}
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  )
}

