"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Filter, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart"

// Mock product data with appropriate agricultural images
const products = [
  {
    id: 1,
    name: "Smart Irrigation System",
    category: "machines",
    price: 12500,
    description: "Automated irrigation system with soil moisture sensors and mobile app control.",
    tags: ["smart", "irrigation", "water-saving"],
  },
  {
    id: 2,
    name: "Organic Fertilizer Pack",
    category: "products",
    price: 850,
    description: "100% organic fertilizer for improved soil health and crop yield.",
    tags: ["organic", "fertilizer", "eco-friendly"],
  },
  {
    id: 3,
    name: "Mini Tractor",
    category: "machines",
    price: 125000,
    description: "Compact tractor suitable for small to medium farms with multiple attachments.",
    tags: ["tractor", "machinery", "versatile"],
  },
  {
    id: 4,
    name: "Pest Control Solution",
    category: "products",
    price: 650,
    description: "Natural pest control solution safe for organic farming.",
    tags: ["pest-control", "organic", "safe"],
  },
  {
    id: 5,
    name: "Seed Drill Machine",
    category: "machines",
    price: 35000,
    description: "Precision seed planting machine for row crops.",
    tags: ["seeding", "precision", "efficiency"],
  },
  {
    id: 6,
    name: "High-Yield Wheat Seeds",
    category: "products",
    price: 1200,
    description: "Drought-resistant wheat seeds with high yield potential.",
    tags: ["seeds", "wheat", "drought-resistant"],
  },
  {
    id: 7,
    name: "Solar Water Pump",
    category: "machines",
    price: 28000,
    description: "Solar-powered water pump for irrigation with battery backup.",
    tags: ["solar", "pump", "renewable"],
  },
  {
    id: 8,
    name: "Soil Testing Kit",
    category: "products",
    price: 1500,
    description: "Comprehensive soil testing kit for nutrient analysis.",
    tags: ["soil", "testing", "analysis"],
  },
  {
    id: 9,
    name: "Drone Sprayer",
    category: "machines",
    price: 85000,
    description: "Agricultural drone for efficient pesticide and fertilizer spraying.",
    tags: ["drone", "technology", "precision-farming"],
  },
  {
    id: 10,
    name: "Organic Insect Repellent",
    category: "products",
    price: 750,
    description: "Natural insect repellent made from neem and other organic ingredients.",
    tags: ["organic", "pest-control", "eco-friendly"],
  },
  {
    id: 11,
    name: "Rotavator",
    category: "machines",
    price: 45000,
    description: "Tractor attachment for soil preparation and weed control.",
    tags: ["soil-preparation", "machinery", "efficiency"],
  },
  {
    id: 12,
    name: "Vermicompost Kit",
    category: "products",
    price: 2200,
    description: "Complete kit for producing organic vermicompost at home or farm.",
    tags: ["organic", "fertilizer", "sustainable"],
  },
]

export default function ShopPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    priceRanges: [],
    tags: [],
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Apply price range filters
  const applyPriceRangeFilter = (product) => {
    if (filters.priceRanges.length === 0) return true

    return filters.priceRanges.some((range) => {
      switch (range) {
        case "under-1000":
          return product.price < 1000
        case "1000-10000":
          return product.price >= 1000 && product.price <= 10000
        case "10000-50000":
          return product.price > 10000 && product.price <= 50000
        case "above-50000":
          return product.price > 50000
        default:
          return true
      }
    })
  }

  // Apply tag filters
  const applyTagFilter = (product) => {
    if (filters.tags.length === 0) return true

    return filters.tags.some((tag) => product.tags.includes(tag))
  }

  // Filter products based on active tab, search query, and other filters
  const filteredProducts = products.filter((product) => {
    // Filter by category tab
    if (activeTab !== "all" && product.category !== activeTab) return false

    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Apply price range and tag filters
    return applyPriceRangeFilter(product) && applyTagFilter(product)
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price
    if (sortOption === "price-high") return b.price - a.price
    // Default: featured/newest
    return a.id - b.id
  })

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const current = [...prev[type]]

      if (current.includes(value)) {
        return {
          ...prev,
          [type]: current.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [type]: [...current, value],
        }
      }
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      priceRanges: [],
      tags: [],
    })
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-lime-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
              Shop for Agricultural Products & Machines
            </h1>
            <p className="max-w-[700px] text-emerald-700 md:text-xl">
              Discover our curated selection of farming equipment, seeds, fertilizers, and smart farming machines to
              enhance your agricultural productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-emerald-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 border-emerald-200 focus-visible:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px] border-emerald-200 focus-visible:ring-emerald-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {(filters.priceRanges.length > 0 || filters.tags.length > 0) && (
                      <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-800">
                        {filters.priceRanges.length + filters.tags.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="border-l-emerald-200">
                  <SheetHeader>
                    <SheetTitle className="text-emerald-800">Filter Products</SheetTitle>
                    <SheetDescription>Narrow down products based on your requirements</SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-medium text-emerald-800">Price Range</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-1"
                            checked={filters.priceRanges.includes("under-1000")}
                            onCheckedChange={(checked) => handleFilterChange("priceRanges", "under-1000")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="price-1" className="text-emerald-700">
                            Under ₹1,000
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-2"
                            checked={filters.priceRanges.includes("1000-10000")}
                            onCheckedChange={(checked) => handleFilterChange("priceRanges", "1000-10000")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="price-2" className="text-emerald-700">
                            ₹1,000 - ₹10,000
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-3"
                            checked={filters.priceRanges.includes("10000-50000")}
                            onCheckedChange={(checked) => handleFilterChange("priceRanges", "10000-50000")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="price-3" className="text-emerald-700">
                            ₹10,000 - ₹50,000
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-4"
                            checked={filters.priceRanges.includes("above-50000")}
                            onCheckedChange={(checked) => handleFilterChange("priceRanges", "above-50000")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="price-4" className="text-emerald-700">
                            Above ₹50,000
                          </Label>
                        </div>
                      </div>
                    </div>
                    <Separator className="bg-emerald-100" />
                    <div className="space-y-3">
                      <h3 className="font-medium text-emerald-800">Tags</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tag-1"
                            checked={filters.tags.includes("organic")}
                            onCheckedChange={(checked) => handleFilterChange("tags", "organic")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="tag-1" className="text-emerald-700">
                            Organic
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tag-2"
                            checked={filters.tags.includes("smart")}
                            onCheckedChange={(checked) => handleFilterChange("tags", "smart")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="tag-2" className="text-emerald-700">
                            Smart Technology
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tag-3"
                            checked={filters.tags.includes("water-saving")}
                            onCheckedChange={(checked) => handleFilterChange("tags", "water-saving")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="tag-3" className="text-emerald-700">
                            Water Saving
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tag-4"
                            checked={filters.tags.includes("eco-friendly")}
                            onCheckedChange={(checked) => handleFilterChange("tags", "eco-friendly")}
                            className="border-emerald-300 text-emerald-600"
                          />
                          <Label htmlFor="tag-4" className="text-emerald-700">
                            Eco-friendly
                          </Label>
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button
                        variant="outline"
                        onClick={resetFilters}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        Reset Filters
                      </Button>
                      <SheetClose asChild>
                        <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white">
                          Apply Filters
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Applied Filters */}
          {(filters.priceRanges.length > 0 || filters.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.priceRanges.map((range) => (
                <Badge
                  key={range}
                  variant="secondary"
                  className="flex items-center gap-1 bg-emerald-100 text-emerald-800 border-emerald-200"
                >
                  {range === "under-1000" && "Under ₹1,000"}
                  {range === "1000-10000" && "₹1,000 - ₹10,000"}
                  {range === "10000-50000" && "₹10,000 - ₹50,000"}
                  {range === "above-50000" && "Above ₹50,000"}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900"
                    onClick={() => handleFilterChange("priceRanges", range)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}

              {filters.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 bg-emerald-100 text-emerald-800 border-emerald-200"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1).replace("-", " ")}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900"
                    onClick={() => handleFilterChange("tags", tag)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900"
                onClick={resetFilters}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-emerald-50 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-lime-500 data-[state=active]:text-white"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger
                value="machines"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-lime-500 data-[state=active]:text-white"
              >
                Farming Machines
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-lime-500 data-[state=active]:text-white"
              >
                Agricultural Products
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden border-emerald-100 transition-all hover:shadow-md hover:border-emerald-200"
                >
                  {/* Removed image section entirely */}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2 text-emerald-800">{product.name}</h3>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {product.category === "machines" ? "Machine" : "Product"}
                      </Badge>
                    </div>
                    <p className="text-emerald-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="font-bold text-lg text-emerald-800">₹{product.price.toLocaleString()}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                    >
                      <Link href={`/shop/product/${product.id}`}>View Details</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        addToCart(product)
                        toast({
                          title: "Added to cart",
                          description: `${product.name} has been added to your cart.`,
                        })
                      }}
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && sortedProducts.length === 0 && (
            <div className="text-center py-12 bg-emerald-50/50 rounded-lg border border-dashed border-emerald-200">
              <h3 className="text-xl font-semibold mb-2 text-emerald-800">No products found</h3>
              <p className="text-emerald-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveTab("all")
                  setSortOption("featured")
                  resetFilters()
                }}
                className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

