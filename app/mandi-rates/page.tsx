"use client"

import { useState } from "react"
import { ArrowUpDown, Info, FileDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

// Mock data for states and districts
const states = [
  { id: 1, name: "Madhya Pradesh" },
  { id: 2, name: "Rajasthan" },
  { id: 3, name: "Punjab" },
  { id: 4, name: "Uttar Pradesh" },
  { id: 5, name: "Gujarat" },
]

const districts = {
  1: [
    { id: 101, name: "Indore" },
    { id: 102, name: "Bhopal" },
    { id: 103, name: "Ujjain" },
  ],
  2: [
    { id: 201, name: "Jaipur" },
    { id: 202, name: "Jodhpur" },
    { id: 203, name: "Udaipur" },
  ],
  3: [
    { id: 301, name: "Amritsar" },
    { id: 302, name: "Ludhiana" },
    { id: 303, name: "Patiala" },
  ],
  4: [
    { id: 401, name: "Lucknow" },
    { id: 402, name: "Kanpur" },
    { id: 403, name: "Varanasi" },
  ],
  5: [
    { id: 501, name: "Ahmedabad" },
    { id: 502, name: "Surat" },
    { id: 503, name: "Vadodara" },
  ],
}

const mandis = {
  101: [
    { id: 1001, name: "Indore Mandi" },
    { id: 1002, name: "Sanwer Mandi" },
  ],
  102: [
    { id: 1021, name: "Bhopal Krishi Upaj Mandi" },
    { id: 1022, name: "Berasia Mandi" },
  ],
  103: [
    { id: 1031, name: "Ujjain Krishi Upaj Mandi" },
    { id: 1032, name: "Nagda Mandi" },
  ],
  201: [
    { id: 2011, name: "Jaipur Central Mandi" },
    { id: 2012, name: "Chomu Mandi" },
  ],
  202: [
    { id: 2021, name: "Jodhpur Main Mandi" },
    { id: 2022, name: "Phalodi Mandi" },
  ],
  203: [
    { id: 2031, name: "Udaipur City Mandi" },
    { id: 2032, name: "Fatehpur Mandi" },
  ],
  301: [
    { id: 3011, name: "Amritsar Grain Market" },
    { id: 3012, name: "Attari Mandi" },
  ],
  302: [
    { id: 3021, name: "Ludhiana Main Mandi" },
    { id: 3022, name: "Khanna Mandi" },
  ],
  303: [
    { id: 3031, name: "Patiala Krishi Mandi" },
    { id: 3032, name: "Nabha Mandi" },
  ],
  401: [
    { id: 4011, name: "Lucknow Mandi Samiti" },
    { id: 4012, name: "Bakshi Ka Talab Mandi" },
  ],
  402: [
    { id: 4021, name: "Kanpur Grain Market" },
    { id: 4022, name: "Bilhaur Mandi" },
  ],
  403: [
    { id: 4031, name: "Varanasi Krishi Upaj Mandi" },
    { id: 4032, name: "Chandauli Mandi" },
  ],
  501: [
    { id: 5011, name: "Ahmedabad APMC" },
    { id: 5012, name: "Jetalpur Mandi" },
  ],
  502: [
    { id: 5021, name: "Surat Main Market" },
    { id: 5022, name: "Bardoli Mandi" },
  ],
  503: [
    { id: 5031, name: "Vadodara APMC" },
    { id: 5032, name: "Padra Mandi" },
  ],
}

// Generate current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date()
  return today.toISOString().split("T")[0]
}

// Generate a date from yesterday or day before
const getRecentDate = () => {
  const date = new Date()
  // Random between 1-2 days ago
  const daysAgo = Math.floor(Math.random() * 2) + 1
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split("T")[0]
}

// Mock data for crop prices with current dates
const generateCropPrices = (mandiId) => {
  const crops = [
    { name: "Wheat", variety: "Sharbati" },
    { name: "Wheat", variety: "Lokwan" },
    { name: "Rice", variety: "Basmati" },
    { name: "Rice", variety: "Sona Masuri" },
    { name: "Soybean", variety: "Yellow" },
    { name: "Cotton", variety: "Long Staple" },
    { name: "Maize", variety: "Yellow" },
    { name: "Gram", variety: "Desi" },
    { name: "Mustard", variety: "Black" },
    { name: "Groundnut", variety: "Bold" },
  ]

  // Generate random prices based on mandiId for some variation
  return crops.map((crop, index) => {
    const basePrice = [2200, 1800, 3500, 2800, 4200, 6500, 1900, 5100, 4800, 5500][index]
    const variance = (mandiId % 10) * 50
    const minPrice = basePrice - variance
    const maxPrice = basePrice + variance + 200
    const modalPrice = Math.floor((minPrice + maxPrice) / 2)

    // 70% chance of today's date, 30% chance of a recent date
    const lastUpdated = Math.random() > 0.3 ? getCurrentDate() : getRecentDate()

    return {
      id: index + 1,
      crop: crop.name,
      variety: crop.variety,
      minPrice,
      maxPrice,
      modalPrice,
      lastUpdated,
    }
  })
}

export default function MandiRatesPage() {
  const { toast } = useToast()
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedMandi, setSelectedMandi] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [isLoading, setIsLoading] = useState(false)
  const [cropPrices, setCropPrices] = useState([])

  // Handle state change
  const handleStateChange = (value) => {
    setSelectedState(value)
    setSelectedDistrict("")
    setSelectedMandi("")
    setCropPrices([])
  }

  // Handle district change
  const handleDistrictChange = (value) => {
    setSelectedDistrict(value)
    setSelectedMandi("")
    setCropPrices([])
  }

  // Handle mandi change and fetch data
  const handleMandiChange = (value) => {
    setSelectedMandi(value)
    fetchCropPrices(value)
  }

  // Simulate API fetch with loading state
  const fetchCropPrices = (mandiId) => {
    setIsLoading(true)
    setCropPrices([])

    // Simulate network delay
    setTimeout(() => {
      const prices = generateCropPrices(Number.parseInt(mandiId))
      setCropPrices(prices)
      setIsLoading(false)
    }, 800)
  }

  // Get available districts based on selected state
  const availableDistricts = selectedState ? districts[selectedState] : []

  // Get available mandis based on selected district
  const availableMandis = selectedDistrict ? mandis[selectedDistrict] : []

  // Filter crop prices based on search query
  const filteredCropPrices = cropPrices.filter(
    (crop) =>
      crop.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort function
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Apply sorting
  const sortedCropPrices = [...filteredCropPrices].sort((a, b) => {
    if (sortConfig.key === null) return 0

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  // Function to get sort direction indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === "ascending" ? "↑" : "↓"
  }

  // Function to handle download
  const handleDownload = () => {
    if (cropPrices.length === 0) return

    // Create CSV content
    const headers = ["Crop", "Variety", "Min Price (₹/q)", "Max Price (₹/q)", "Modal Price (₹/q)", "Last Updated"]
    const csvContent = [
      headers.join(","),
      ...sortedCropPrices.map((crop) =>
        [crop.crop, crop.variety, crop.minPrice, crop.maxPrice, crop.modalPrice, crop.lastUpdated].join(","),
      ),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    const mandiName = availableMandis.find((m) => m.id.toString() === selectedMandi)?.name || "mandi"

    link.href = url
    link.setAttribute("download", `${mandiName.replace(/\s+/g, "-").toLowerCase()}-prices-${getCurrentDate()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Started",
      description: "Your price list is being downloaded",
    })
  }

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-IN", options)
  }

  // Check if date is today
  const isToday = (dateString) => {
    const today = new Date()
    const date = new Date(dateString)
    return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-green-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Krishi Upaj Mandi Rates</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Access real-time crop prices from agricultural markets across India to make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Mandi Rates Content */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Location</CardTitle>
              <CardDescription>Choose the state, district, and mandi to view current crop prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    State
                  </label>
                  <Select value={selectedState} onValueChange={handleStateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.id.toString()}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    District
                  </label>
                  <Select value={selectedDistrict} onValueChange={handleDistrictChange} disabled={!selectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((district) => (
                        <SelectItem key={district.id} value={district.id.toString()}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mandi
                  </label>
                  <Select value={selectedMandi} onValueChange={handleMandiChange} disabled={!selectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Mandi" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMandis.map((mandi) => (
                        <SelectItem key={mandi.id} value={mandi.id.toString()}>
                          {mandi.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedMandi && (
            <Card className="mt-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Crop Prices</CardTitle>
                  <CardDescription>
                    Current prices at {availableMandis.find((m) => m.id.toString() === selectedMandi)?.name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search crops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleDownload}
                          disabled={cropPrices.length === 0 || isLoading}
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download price list (CSV)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-full" />
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <>
                    {cropPrices.length > 0 ? (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">
                                <Button
                                  variant="ghost"
                                  onClick={() => requestSort("crop")}
                                  className="flex items-center gap-1 p-0 h-auto font-medium"
                                >
                                  Crop {getSortDirectionIndicator("crop")}
                                  <ArrowUpDown className="h-3 w-3" />
                                </Button>
                              </TableHead>
                              <TableHead>
                                <Button
                                  variant="ghost"
                                  onClick={() => requestSort("variety")}
                                  className="flex items-center gap-1 p-0 h-auto font-medium"
                                >
                                  Variety {getSortDirectionIndicator("variety")}
                                  <ArrowUpDown className="h-3 w-3" />
                                </Button>
                              </TableHead>
                              <TableHead className="text-right">
                                <Button
                                  variant="ghost"
                                  onClick={() => requestSort("minPrice")}
                                  className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
                                >
                                  Min Price (₹/q) {getSortDirectionIndicator("minPrice")}
                                  <ArrowUpDown className="h-3 w-3" />
                                </Button>
                              </TableHead>
                              <TableHead className="text-right">
                                <Button
                                  variant="ghost"
                                  onClick={() => requestSort("maxPrice")}
                                  className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
                                >
                                  Max Price (₹/q) {getSortDirectionIndicator("maxPrice")}
                                  <ArrowUpDown className="h-3 w-3" />
                                </Button>
                              </TableHead>
                              <TableHead className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    onClick={() => requestSort("modalPrice")}
                                    className="flex items-center gap-1 p-0 h-auto font-medium"
                                  >
                                    Modal Price (₹/q) {getSortDirectionIndicator("modalPrice")}
                                    <ArrowUpDown className="h-3 w-3" />
                                  </Button>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Most common trading price</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </TableHead>
                              <TableHead className="text-right">
                                <Button
                                  variant="ghost"
                                  onClick={() => requestSort("lastUpdated")}
                                  className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
                                >
                                  Last Updated {getSortDirectionIndicator("lastUpdated")}
                                  <ArrowUpDown className="h-3 w-3" />
                                </Button>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sortedCropPrices.map((crop) => (
                              <TableRow key={crop.id}>
                                <TableCell className="font-medium">{crop.crop}</TableCell>
                                <TableCell>{crop.variety}</TableCell>
                                <TableCell className="text-right">₹{crop.minPrice.toLocaleString()}</TableCell>
                                <TableCell className="text-right">₹{crop.maxPrice.toLocaleString()}</TableCell>
                                <TableCell className="text-right font-semibold">
                                  ₹{crop.modalPrice.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Badge
                                    variant={isToday(crop.lastUpdated) ? "default" : "outline"}
                                    className={
                                      isToday(crop.lastUpdated) ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                                    }
                                  >
                                    {isToday(crop.lastUpdated) ? "Today" : formatDate(crop.lastUpdated)}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No crop prices found for your search criteria.</p>
                      </div>
                    )}
                  </>
                )}

                {cropPrices.length > 0 && filteredCropPrices.length === 0 && !isLoading && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No crops match your search query. Try a different search term.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}

                <div className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Prices are updated daily. Last sync: Today at {new Date().getHours()}:00
                </div>
              </CardContent>
            </Card>
          )}

          {!selectedMandi && (
            <div className="mt-8 text-center py-12 bg-muted/20 rounded-lg border border-dashed">
              <h3 className="text-xl font-semibold mb-2">Select a location to view prices</h3>
              <p className="text-muted-foreground">
                Choose a state, district, and mandi from the dropdown menus above to view current crop prices.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

