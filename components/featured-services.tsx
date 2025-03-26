"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, Leaf, Tractor } from "lucide-react"
import { useEffect, useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturedServices() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  const services = [
    {
      title: "Mandi Rate Updates",
      description: "Access real-time crop prices from agricultural markets across India to make informed decisions.",
      icon: <BarChart3 className="h-10 w-10 text-emerald-600" />,
      link: "/mandi-rates",
    },
    {
      title: "Smart Farming Equipment",
      description: "Discover modern farming equipment designed to improve efficiency and yield.",
      icon: <Tractor className="h-10 w-10 text-emerald-600" />,
      link: "/shop?category=machines",
    },
    {
      title: "Sustainable Practices",
      description: "Learn about sustainable farming methods that improve soil health and crop quality.",
      icon: <Leaf className="h-10 w-10 text-emerald-600" />,
      link: "/resources",
    },
  ]

  return (
    <section className="py-12 md:py-16" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <div
          className={`flex flex-col items-center text-center space-y-4 mb-10 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
        >
          <div className="inline-block rounded-lg bg-gradient-to-r from-emerald-100 to-lime-100 px-3 py-1 text-sm text-emerald-800">
            Our Services
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-800">
            How HariBhari Helps Farmers
          </h2>
          <p className="max-w-[700px] text-emerald-700 md:text-xl">
            We provide a range of services designed to support and enhance agricultural practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-animation">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`border-emerald-100 hover:border-emerald-200 hover-lift transition-all ${isVisible ? "animate-slide-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 bg-gradient-to-r from-emerald-50 to-lime-50 p-3 rounded-full w-16 h-16 flex items-center justify-center animate-pulse-slow">
                  {service.icon}
                </div>
                <CardTitle className="text-emerald-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Link href={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

