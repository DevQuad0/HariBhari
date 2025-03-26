import { Users, Tractor, MapPin, Award } from "lucide-react"

export default function StatisticsSection() {
  const stats = [
    {
      value: "Growing",
      label: "Farmer Community",
      icon: <Users className="h-6 w-6 text-emerald-600" />,
    },
    {
      value: "Expanding",
      label: "Regional Presence",
      icon: <MapPin className="h-6 w-6 text-emerald-600" />,
    },
    {
      value: "Innovative",
      label: "Farming Solutions",
      icon: <Tractor className="h-6 w-6 text-emerald-600" />,
    },
    {
      value: "Committed",
      label: "To Sustainability",
      icon: <Award className="h-6 w-6 text-emerald-600" />,
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-2 p-6 bg-white rounded-xl shadow-sm border border-emerald-100 hover:shadow-md hover:border-emerald-200 transition-all"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <h3 className="text-xl font-bold text-emerald-800">{stat.value}</h3>
              <p className="text-emerald-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

