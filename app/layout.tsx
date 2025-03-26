import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AiFarmAssistant from "@/components/ai-farm-assistant"
import Cart from "@/components/cart"
import ScrollToTop from "@/components/scroll-to-top"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "HariBhari - Supporting Indian Farmers",
  description: "HariBhari is a platform dedicated to supporting Indian farmers and promoting sustainable agriculture.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-2xl text-emerald-600 hover:text-emerald-700 transition-colors">
                      HariBhari
                    </span>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-emerald-600">
                      Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-emerald-600">
                      About
                    </Link>
                    <Link href="/shop" className="text-sm font-medium transition-colors hover:text-emerald-600">
                      Shop
                    </Link>
                    <Link href="/mandi-rates" className="text-sm font-medium transition-colors hover:text-emerald-600">
                      Mandi Rates
                    </Link>
                    <Link href="/consultancy" className="text-sm font-medium transition-colors hover:text-emerald-600">
                      Consultancy
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-emerald-600">
                      Contact
                    </Link>
                  </nav>

                  <div className="hidden md:flex gap-2">
                    <Cart />
                    <Button
                      asChild
                      variant="outline"
                      className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                      <Button variant="outline" size="icon" className="border-emerald-200">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="border-l-emerald-200">
                      <div className="flex flex-col gap-6 mt-6">
                        <Link href="/" className="text-base font-medium transition-colors hover:text-emerald-600">
                          Home
                        </Link>
                        <Link href="/about" className="text-base font-medium transition-colors hover:text-emerald-600">
                          About
                        </Link>
                        <Link href="/shop" className="text-base font-medium transition-colors hover:text-emerald-600">
                          Shop
                        </Link>
                        <Link
                          href="/mandi-rates"
                          className="text-base font-medium transition-colors hover:text-emerald-600"
                        >
                          Mandi Rates
                        </Link>
                        <Link
                          href="/consultancy"
                          className="text-base font-medium transition-colors hover:text-emerald-600"
                        >
                          Consultancy
                        </Link>
                        <Link
                          href="/contact"
                          className="text-base font-medium transition-colors hover:text-emerald-600"
                        >
                          Contact
                        </Link>
                        <div className="flex flex-col gap-2 mt-4">
                          <Cart />
                          <Button
                            asChild
                            variant="outline"
                            className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
                          >
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button
                            asChild
                            className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            <Link href="/register">Register</Link>
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </header>

              {children}

              <footer className="border-t border-emerald-100 bg-gradient-to-b from-white to-emerald-50">
                <div className="container px-4 md:px-6 py-8 md:py-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <Link href="/" className="flex items-center gap-2">
                        <span className="font-bold text-2xl text-emerald-600 hover:text-emerald-700 transition-colors">
                          HariBhari
                        </span>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Empowering Indian farmers with sustainable agricultural practices, modern technology, and fair
                        market access.
                      </p>
                      <p className="text-sm font-medium text-emerald-600">Developed with ❤️ by Team DEVQUAD</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4 text-emerald-800">Quick Links</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/"
                            className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/about"
                            className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/shop"
                            className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                          >
                            Shop
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4 text-emerald-800">Contact</h3>
                      <ul className="space-y-2">
                        <li className="text-sm text-muted-foreground">
                          Jabalpur, Madhya Pradesh
                          <br />
                          India
                        </li>
                        <li className="text-sm text-muted-foreground">contactharibhari@gmail.com</li>
                        <li className="text-sm text-muted-foreground">+91 8319183115</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-emerald-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      &copy; {new Date().getFullYear()} HariBhari. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                      <Link
                        href="/terms"
                        className="text-xs text-muted-foreground hover:text-emerald-600 transition-colors"
                      >
                        Terms of Service
                      </Link>
                      <Link
                        href="/privacy"
                        className="text-xs text-muted-foreground hover:text-emerald-600 transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>

              {/* Add AI Farm Assistant */}
              <AiFarmAssistant />
              <ScrollToTop />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'