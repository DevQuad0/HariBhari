"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, ChevronRight, Minus, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/components/cart"

// Mock product data with real images
const products = [
  {
    id: 1,
    name: "Smart Irrigation System",
    category: "machines",
    price: 12500,
    image: "<a href='https://postimg.cc/3dM8tX0S' target='_blank'><img src='https://i.postimg.cc/3dM8tX0S/smart-irrigation-system.jpg' border='0' alt='smart-irrigation-system'/></a>",
    description: "Automated irrigation system with soil moisture sensors and mobile app control.",
    tags: ["smart", "irrigation", "water-saving"],
    stock: 15,
    rating: 4.5,
    reviews: 28,
    details: {
      features: [
        "Real-time soil moisture monitoring",
        "Mobile app control for remote operation",
        "Automated watering schedules",
        "Water usage analytics",
        "Battery backup during power outages",
        "Weather forecast integration",
      ],
      specifications: {
        Dimensions: "30cm x 20cm x 15cm",
        Weight: "2.5 kg",
        "Power Source": "Solar with battery backup",
        "Water Flow Rate": "10-15 liters/minute",
        Connectivity: "Wi-Fi, Bluetooth",
        "Sensor Range": "Up to 100 meters",
        Warranty: "2 years",
      },
    },
    relatedProducts: [3, 7, 5],
  },
  {
    id: 2,
    name: "Organic Fertilizer Pack",
    category: "products",
    price: 850,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=300&h=300&auto=format&fit=crop",
    description: "100% organic fertilizer for improved soil health and crop yield.",
    tags: ["organic", "fertilizer", "eco-friendly"],
    stock: 50,
    rating: 4.2,
    reviews: 45,
    details: {
      features: [
        "100% organic and chemical-free",
        "Improves soil structure and fertility",
        "Enhances water retention capacity",
        "Promotes beneficial microbial activity",
        "Suitable for all types of crops",
        "Slow-release nutrients for long-term benefits",
      ],
      specifications: {
        Weight: "25 kg",
        Composition: "Vermicompost, neem cake, bone meal",
        "NPK Ratio": "3:2:3",
        "Suitable For": "All crops",
        "Application Rate": "2-3 kg per 100 sq ft",
        "Shelf Life": "2 years",
        Certification: "Organic Certified",
      },
    },
    relatedProducts: [12, 4, 10],
  },
  {
    id: 3,
    name: "Mini Tractor",
    category: "machines",
    price: 125000,
    image: "https://images.unsplash.com/photo-1598335624134-5bceb5de202b?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Compact tractor suitable for small to medium farms with multiple attachments.",
    tags: ["tractor", "machinery", "versatile"],
    stock: 5,
    rating: 4.7,
    reviews: 12,
    details: {
      features: [
        "Compact design for small farms",
        "Powerful engine with low fuel consumption",
        "Multiple attachment compatibility",
        "All-terrain capability",
        "Comfortable operator seat with suspension",
        "Easy maintenance and service",
      ],
      specifications: {
        Engine: "18 HP Diesel",
        Transmission: "8 Forward + 2 Reverse",
        PTO: "540 RPM",
        "Fuel Tank": "15 liters",
        "Hydraulic Capacity": "800 kg",
        "Ground Clearance": "25 cm",
        Warranty: "3 years",
      },
    },
    relatedProducts: [5, 11, 7],
  },
  {
    id: 4,
    name: "Pest Control Solution",
    category: "products",
    price: 650,
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Natural pest control solution safe for organic farming.",
    tags: ["pest-control", "organic", "safe"],
    stock: 35,
    rating: 4.0,
    reviews: 32,
    details: {
      features: [
        "Natural ingredients, no harmful chemicals",
        "Effective against common crop pests",
        "Safe for beneficial insects like bees",
        "Biodegradable and environmentally friendly",
        "No waiting period before harvest",
        "Compatible with organic farming practices",
      ],
      specifications: {
        Volume: "5 liters",
        "Active Ingredients": "Neem oil, pyrethrum extract",
        "Application Method": "Spray",
        "Dilution Ratio": "10ml per liter of water",
        Coverage: "1 liter covers approx. 1 acre",
        "Shelf Life": "2 years",
        Certification: "Organic Certified",
      },
    },
    relatedProducts: [10, 2, 12],
  },
  {
    id: 5,
    name: "Seed Drill Machine",
    category: "machines",
    price: 35000,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Precision seed planting machine for row crops.",
    tags: ["seeding", "precision", "efficiency"],
    stock: 8,
    rating: 4.3,
    reviews: 18,
    details: {
      features: [
        "Precise seed placement at uniform depth",
        "Adjustable row spacing",
        "Multiple seed box capacity",
        "Suitable for various seed sizes",
        "Reduces seed wastage",
        "Increases germination rate",
      ],
      specifications: {
        "Working Width": "1.5 meters",
        "Number of Rows": "9",
        "Seed Box Capacity": "45 kg",
        "Power Requirement": "35+ HP tractor",
        Weight: "320 kg",
        "Planting Depth": "Adjustable 2-8 cm",
        Warranty: "1 year",
      },
    },
    relatedProducts: [11, 3, 1],
  },
  {
    id: 6,
    name: "High-Yield Wheat Seeds",
    category: "products",
    price: 1200,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Drought-resistant wheat seeds with high yield potential.",
    tags: ["seeds", "wheat", "drought-resistant"],
    stock: 100,
    rating: 4.6,
    reviews: 52,
    details: {
      features: [
        "High yield potential even in challenging conditions",
        "Drought and heat resistant varieties",
        "Disease resistant against common wheat pathogens",
        "Short growing season (110-120 days)",
        "Excellent flour quality for baking",
        "Suitable for various soil types",
      ],
      specifications: {
        Quantity: "10 kg",
        Variety: "HD-3226 Improved",
        "Germination Rate": "95%+",
        Purity: "99.5%",
        Treatment: "Fungicide treated",
        "Growing Season": "Rabi (Winter)",
        Certification: "Certified Seeds",
      },
    },
    relatedProducts: [12, 2, 4],
  },
  {
    id: 7,
    name: "Solar Water Pump",
    category: "machines",
    price: 28000,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Solar-powered water pump for irrigation with battery backup.",
    tags: ["solar", "pump", "renewable"],
    stock: 12,
    rating: 4.8,
    reviews: 36,
    details: {
      features: [
        "Zero electricity costs with solar power",
        "Battery backup for cloudy days",
        "Automatic operation with timer",
        "Low maintenance brushless motor",
        "Remote monitoring via mobile app",
        "Suitable for wells, ponds, and boreholes",
      ],
      specifications: {
        "Solar Panel": "1000W polycrystalline",
        "Max Flow Rate": "10,000 liters/hour",
        "Max Head": "50 meters",
        "Battery Backup": "24 hours",
        "Motor Type": "BLDC, submersible",
        "Pipe Connection": "2 inch",
        Warranty: "5 years on panel, 2 years on pump",
      },
    },
    relatedProducts: [1, 3, 5],
  },
  {
    id: 8,
    name: "Soil Testing Kit",
    category: "products",
    price: 1500,
    image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Comprehensive soil testing kit for nutrient analysis.",
    tags: ["soil", "testing", "analysis"],
    stock: 25,
    rating: 4.4,
    reviews: 29,
    details: {
      features: [
        "Tests for NPK (Nitrogen, Phosphorus, Potassium)",
        "pH level testing",
        "Micronutrient analysis",
        "Easy to use with color-coded results",
        "Includes detailed interpretation guide",
        "Sufficient for 50 tests",
      ],
      specifications: {
        "Tests Included": "NPK, pH, Micronutrients",
        "Number of Tests": "50",
        "Result Time": "10-30 minutes",
        Contents: "Testing vials, reagents, color charts, instructions",
        Storage: "Keep in cool, dry place",
        "Shelf Life": "2 years",
        Accuracy: "±5%",
      },
    },
    relatedProducts: [2, 12, 4],
  },
  {
    id: 9,
    name: "Drone Sprayer",
    category: "machines",
    price: 85000,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Agricultural drone for efficient pesticide and fertilizer spraying.",
    tags: ["drone", "technology", "precision-farming"],
    stock: 3,
    rating: 4.9,
    reviews: 15,
    details: {
      features: [
        "Covers 15-20 acres per hour",
        "Precision spraying reduces chemical usage by 30%",
        "Automated flight planning via mobile app",
        "Obstacle avoidance technology",
        "Real-time crop monitoring with camera",
        "Foldable design for easy transport",
      ],
      specifications: {
        "Tank Capacity": "10 liters",
        "Flight Time": "15-20 minutes per battery",
        "Spray Width": "4-5 meters",
        Speed: "5-8 m/s",
        Battery: "Dual battery system, hot-swappable",
        "Control Range": "Up to 2 km",
        Warranty: "1 year",
      },
    },
    relatedProducts: [1, 7, 5],
  },
  {
    id: 10,
    name: "Organic Insect Repellent",
    category: "products",
    price: 750,
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Natural insect repellent made from neem and other organic ingredients.",
    tags: ["organic", "pest-control", "eco-friendly"],
    stock: 40,
    rating: 4.1,
    reviews: 38,
    details: {
      features: [
        "100% natural ingredients",
        "Effective against 200+ pest species",
        "Safe for beneficial insects",
        "No chemical residue on crops",
        "Can be used until day of harvest",
        "Pleasant natural scent",
      ],
      specifications: {
        Volume: "2 liters",
        Ingredients: "Neem oil, garlic extract, essential oils",
        Application: "Foliar spray",
        Dilution: "15ml per liter of water",
        Coverage: "1 liter covers approx. 0.5 acre",
        "Shelf Life": "18 months",
        Certification: "Organic Certified",
      },
    },
    relatedProducts: [4, 2, 12],
  },
  {
    id: 11,
    name: "Rotavator",
    category: "machines",
    price: 45000,
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Tractor attachment for soil preparation and weed control.",
    tags: ["soil-preparation", "machinery", "efficiency"],
    stock: 7,
    rating: 4.5,
    reviews: 22,
    details: {
      features: [
        "Efficient soil preparation in single pass",
        "Adjustable working depth",
        "Heavy-duty blades for long life",
        "Effective weed control",
        "Improves soil aeration",
        "Compatible with most tractor models",
      ],
      specifications: {
        "Working Width": "1.8 meters",
        "Number of Blades": "42",
        "Working Depth": "15-25 cm (adjustable)",
        "Power Requirement": "40+ HP tractor",
        Weight: "450 kg",
        "PTO Speed": "540 RPM",
        Warranty: "2 years",
      },
    },
    relatedProducts: [3, 5, 9],
  },
  {
    id: 12,
    name: "Vermicompost Kit",
    category: "products",
    price: 2200,
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?q=80&w=300&h=300&auto=format&fit=crop",
    description: "Complete kit for producing organic vermicompost at home or farm.",
    tags: ["organic", "fertilizer", "sustainable"],
    stock: 20,
    rating: 4.3,
    reviews: 41,
    details: {
      features: [
        "Produces nutrient-rich organic fertilizer",
        "Includes everything to start composting",
        "Converts farm waste into valuable resource",
        "Odorless process with proper management",
        "Improves soil health and structure",
        "Environmentally sustainable solution",
      ],
      specifications: {
        Contents: "Composting bin, bedding material, 1000 earthworms, guide book",
        "Bin Dimensions": "90cm x 60cm x 45cm",
        Capacity: "Processes up to 5kg waste per week",
        "Worm Species": "Eisenia fetida (Red Wigglers)",
        "Compost Production": "2-3kg per month when established",
        "Suitable For": "Home gardens and small farms",
        Material: "UV-resistant recycled plastic",
      },
    },
    relatedProducts: [2, 4, 10],
  },
]

export default function ProductDetailPage({ params }) {
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])

  // Fetch product data
  useEffect(() => {
    const fetchProduct = () => {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        const foundProduct = products.find((p) => p.id === Number.parseInt(params.id))
        setProduct(foundProduct || null)

        if (foundProduct && foundProduct.relatedProducts) {
          const related = foundProduct.relatedProducts.map((id) => products.find((p) => p.id === id)).filter(Boolean)
          setRelatedProducts(related)
        }

        setIsLoading(false)
      }, 800)
    }

    fetchProduct()
  }, [params.id])

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  // Add to cart
  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      ...product,
      quantity,
    })
  }

  // Render loading state
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-lg" />

            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <Skeleton className="h-8 w-40" />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Render 404 state
  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center py-12">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
            Product Not Found
          </h1>
          <p className="mt-4 text-emerald-600 md:text-xl">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button
            asChild
            className="mt-8 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
          >
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col py-8 md:py-12">
      <div className="container px-4 md:px-6">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center text-sm text-emerald-600">
          <Link href="/" className="hover:text-emerald-800">
            Home
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href="/shop" className="hover:text-emerald-800">
            Shop
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-emerald-800 capitalize">
            {product.category}
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-emerald-800 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border border-emerald-100 bg-white">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-emerald-800">{product.name}</h1>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {product.category === "machines" ? "Machine" : "Product"}
                </Badge>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-emerald-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="text-3xl font-bold text-emerald-800">₹{product.price.toLocaleString()}</div>

            <p className="text-emerald-600">{product.description}</p>

            <div className="flex flex-wrap gap-1">
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

            <Separator className="bg-emerald-100" />

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2 text-emerald-800">Availability:</span>
                {product.stock > 0 ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    In Stock ({product.stock} available)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-emerald-200 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <span className="w-12 text-center text-emerald-800">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increaseQuantity}
                    disabled={product.stock <= quantity}
                    className="h-10 w-10 rounded-none text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>

                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
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
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="features">
            <TabsList className="grid w-full grid-cols-3 bg-emerald-50 p-1">
              <TabsTrigger
                value="features"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-lime-500 data-[state=active]:text-white"
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-lime-500 data-[state=active]:text-white"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-lime-500 data-[state=active]:text-white"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-6">
              <Card className="border-emerald-100">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-emerald-800">Key Features</h3>
                  <ul className="space-y-2">
                    {product.details.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-emerald-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card className="border-emerald-100">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-emerald-800">Technical Specifications</h3>
                  <div className="grid gap-2">
                    {Object.entries(product.details.specifications).map(([key, value], index) => (
                      <div key={index} className="grid grid-cols-2 py-2 border-b border-emerald-100 last:border-0">
                        <span className="font-medium text-emerald-800">{key}</span>
                        <span className="text-emerald-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card className="border-emerald-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-emerald-800">Customer Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < product.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-emerald-700">{product.rating} out of 5</span>
                    </div>
                  </div>

                  <p className="text-center text-emerald-600 py-8">
                    This is a demo product page. In a real application, customer reviews would be displayed here.
                  </p>

                  <div className="flex justify-center mt-4">
                    <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      Write a Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-emerald-800">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="overflow-hidden border-emerald-100 transition-all hover:shadow-md hover:border-emerald-200"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2 text-emerald-800">{relatedProduct.name}</h3>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {relatedProduct.category === "machines" ? "Machine" : "Product"}
                      </Badge>
                    </div>
                    <p className="text-emerald-600 text-sm mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <p className="font-bold text-lg text-emerald-800">₹{relatedProduct.price.toLocaleString()}</p>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                    >
                      <Link href={`/shop/product/${relatedProduct.id}`}>View Details</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

