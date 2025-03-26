"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, CheckCircle, Clock, PhoneCall, Quote, Users, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ConsultancyPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("services")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    farmSize: "",
    cropType: "",
    consultationType: "",
    preferredDate: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.email || !formData.consultationType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Consultation Request Sent",
        description: "Our team will contact you shortly to confirm your appointment.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        farmSize: "",
        cropType: "",
        consultationType: "",
        preferredDate: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const consultants = [
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Soil Health & Crop Nutrition",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop",
      experience: "15+ years",
      education: "Ph.D. in Agricultural Science",
      availability: "Mon, Wed, Fri",
    },
    {
      name: "Priya Sharma",
      specialty: "Organic Farming & Certification",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
      experience: "12+ years",
      education: "M.Sc. in Horticulture",
      availability: "Tue, Thu, Sat",
    },
    {
      name: "Dr. Amit Patel",
      specialty: "Pest Management & Disease Control",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
      experience: "10+ years",
      education: "Ph.D. in Entomology",
      availability: "Mon, Tue, Thu",
    },
    {
      name: "Sunita Verma",
      specialty: "Smart Farming & Technology",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
      experience: "8+ years",
      education: "M.Tech in Agricultural Engineering",
      availability: "Wed, Fri, Sat",
    },
  ]

  const services = [
    {
      title: "One-on-One Consultation",
      description: "Personalized advice from our agricultural experts tailored to your specific farming needs.",
      price: "₹1,500 per session",
      features: [
        "60-minute private consultation",
        "Customized recommendations",
        "Follow-up email with action plan",
        "Available in-person or online",
      ],
      icon: <Users className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Farm Visit & Assessment",
      description: "Our experts visit your farm to provide on-site evaluation and practical recommendations.",
      price: "₹5,000 per visit",
      features: [
        "Comprehensive farm assessment",
        "Soil testing and analysis",
        "Detailed written report",
        "Implementation guidance",
      ],
      icon: <Calendar className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Virtual Consultation",
      description: "Connect with our experts from anywhere through video call for convenient farming advice.",
      price: "₹1,000 per session",
      features: [
        "45-minute video consultation",
        "Screen sharing for visual guidance",
        "Digital resources provided",
        "Flexible scheduling",
      ],
      icon: <Video className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Emergency Crop Support",
      description: "Urgent assistance for pest outbreaks, disease identification, or other farming emergencies.",
      price: "₹2,000 per session",
      features: ["Same-day response", "Rapid problem diagnosis", "Immediate action plan", "24/7 availability"],
      icon: <PhoneCall className="h-6 w-6 text-emerald-600" />,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 to-lime-700/90 z-10" />
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop"
            alt="Agricultural consultant with farmer"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-20 -mt-20 md:-mt-24">
          <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4 mb-6">
              <div className="inline-block rounded-lg bg-gradient-to-r from-emerald-100 to-lime-100 px-3 py-1 text-sm text-emerald-800">
                Expert Guidance
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
                Agricultural Consultancy Services
              </h1>
              <p className="max-w-[700px] text-emerald-700 md:text-xl">
                Get personalized advice from our team of agricultural experts to optimize your farming practices and
                increase productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="services" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="services">Our Services</TabsTrigger>
              <TabsTrigger value="experts">Meet Our Experts</TabsTrigger>
              <TabsTrigger value="book">Book a Consultation</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-3">
                            {service.icon}
                          </div>
                          <CardTitle className="text-emerald-800">{service.title}</CardTitle>
                        </div>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-lime-500 text-white">
                          {service.price}
                        </Badge>
                      </div>
                      <CardDescription className="text-emerald-600 mt-2">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                        onClick={() => {
                          setActiveTab("book")
                          handleSelectChange("consultationType", service.title)
                        }}
                      >
                        Book This Service
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-lime-50 p-6 rounded-lg border border-emerald-100 mt-8">
                <h3 className="text-xl font-bold mb-4 text-emerald-800">Why Choose Our Consultancy Services?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-3">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold mb-2 text-emerald-800">Expert Team</h4>
                    <p className="text-emerald-600">
                      Our consultants have decades of combined experience in various agricultural specialties.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-3">
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold mb-2 text-emerald-800">Proven Results</h4>
                    <p className="text-emerald-600">
                      Our clients report an average 30% increase in crop yield after implementing our recommendations.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-3">
                      <Clock className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold mb-2 text-emerald-800">Timely Support</h4>
                    <p className="text-emerald-600">
                      We provide prompt assistance when you need it most, including emergency consultations.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experts Tab */}
            <TabsContent value="experts" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {consultants.map((consultant, index) => (
                  <Card
                    key={index}
                    className="border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-emerald-100 mx-auto md:mx-0">
                          <Image
                            src={consultant.image || "/placeholder.svg"}
                            alt={consultant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-xl font-bold mb-1 text-emerald-800">{consultant.name}</h3>
                          <Badge className="mb-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white">
                            {consultant.specialty}
                          </Badge>
                          <ul className="space-y-2 text-emerald-600">
                            <li className="flex items-center justify-center md:justify-start">
                              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Experience: {consultant.experience}</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Education: {consultant.education}</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start">
                              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Available: {consultant.availability}</span>
                            </li>
                          </ul>
                          <Button
                            className="mt-4 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                            onClick={() => setActiveTab("book")}
                          >
                            Book Consultation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Book Tab */}
            <TabsContent value="book">
              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle className="text-emerald-800">Book a Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form below to schedule a consultation with our agricultural experts.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-emerald-800">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-emerald-800">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-emerald-800">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmSize" className="text-emerald-800">
                          Farm Size (in acres)
                        </Label>
                        <Input
                          id="farmSize"
                          name="farmSize"
                          placeholder="e.g., 5"
                          value={formData.farmSize}
                          onChange={handleChange}
                          className="border-emerald-200 focus-visible:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cropType" className="text-emerald-800">
                          Primary Crop Type
                        </Label>
                        <Select
                          value={formData.cropType}
                          onValueChange={(value) => handleSelectChange("cropType", value)}
                        >
                          <SelectTrigger id="cropType" className="border-emerald-200 focus-visible:ring-emerald-500">
                            <SelectValue placeholder="Select crop type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="sugarcane">Sugarcane</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consultationType" className="text-emerald-800">
                          Consultation Type <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.consultationType}
                          onValueChange={(value) => handleSelectChange("consultationType", value)}
                          required
                        >
                          <SelectTrigger
                            id="consultationType"
                            className="border-emerald-200 focus-visible:ring-emerald-500"
                          >
                            <SelectValue placeholder="Select consultation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="One-on-One Consultation">One-on-One Consultation</SelectItem>
                            <SelectItem value="Farm Visit & Assessment">Farm Visit & Assessment</SelectItem>
                            <SelectItem value="Virtual Consultation">Virtual Consultation</SelectItem>
                            <SelectItem value="Emergency Crop Support">Emergency Crop Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredDate" className="text-emerald-800">
                        Preferred Date
                      </Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="border-emerald-200 focus-visible:ring-emerald-500"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-emerald-800">
                        Additional Information
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please describe your farming challenges or specific questions..."
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[120px] border-emerald-200 focus-visible:ring-emerald-500"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Book Consultation"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-50 to-lime-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="inline-block rounded-lg bg-gradient-to-r from-emerald-100 to-lime-100 px-3 py-1 text-sm text-emerald-800">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-800">What Our Clients Say</h2>
            <p className="max-w-[700px] text-emerald-700 md:text-xl">
              Hear from farmers who have transformed their agricultural practices with our expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                  <p className="italic text-emerald-600 mb-4">
                    "The farm assessment service was eye-opening. The consultant identified soil issues I wasn't aware
                    of and recommended specific treatments that increased my wheat yield by 40%."
                  </p>
                  <h4 className="font-semibold text-emerald-800">Ramesh Singh</h4>
                  <p className="text-sm text-emerald-600">Wheat Farmer, Punjab</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                  <p className="italic text-emerald-600 mb-4">
                    "I was struggling with pest issues in my organic vegetable farm. The virtual consultation saved me
                    time and money. The expert identified the problem immediately and suggested an organic solution that
                    worked perfectly."
                  </p>
                  <h4 className="font-semibold text-emerald-800">Lakshmi Devi</h4>
                  <p className="text-sm text-emerald-600">Organic Farmer, Karnataka</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                  <p className="italic text-emerald-600 mb-4">
                    "The emergency crop support service saved my entire cotton crop. When I noticed unusual symptoms, I
                    called HariBhari and had an expert on video call within an hour. Their quick diagnosis prevented
                    what could have been a devastating loss."
                  </p>
                  <h4 className="font-semibold text-emerald-800">Vijay Patel</h4>
                  <p className="text-sm text-emerald-600">Cotton Farmer, Gujarat</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-600 to-lime-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Transform Your Farming Practices?
            </h2>
            <p className="max-w-[700px] text-emerald-50 md:text-xl">
              Book a consultation today and take the first step toward optimizing your agricultural operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Link href="#" onClick={() => setActiveTab("book")}>
                  Book Now
                </Link>
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

