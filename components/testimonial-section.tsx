import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "HariBhari's vision for transforming agriculture with technology is exactly what Indian farmers need today.",
      name: "Rajesh P.",
      role: "Wheat Farmer",
    },
    {
      quote:
        "I'm excited about the potential of smart farming solutions that HariBhari is developing for small farmers like me.",
      name: "Sunita D.",
      role: "Rice Farmer",
    },
    {
      quote: "The concept of bringing modern agricultural techniques to traditional farming communities is promising.",
      name: "Mohan S.",
      role: "Vegetable Farmer",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-50 to-lime-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
          <div className="inline-block rounded-lg bg-gradient-to-r from-emerald-100 to-lime-100 px-3 py-1 text-sm text-emerald-800">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-emerald-800">
            What Farmers Say About Our Vision
          </h2>
          <p className="max-w-[700px] text-emerald-700 md:text-xl">
            Hear from farmers who are excited about the potential of HariBhari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all bg-white"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                <p className="mb-6 italic text-emerald-600">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-semibold text-emerald-800">{testimonial.name}</h4>
                  <p className="text-sm text-emerald-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

