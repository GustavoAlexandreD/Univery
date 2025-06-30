import { Search, Star, Bookmark, Menu, Utensils, User } from "@/components/icons"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"

const categories = ["Lanche", "Marmita", "Doce", "Bombom", "Tapioca", "Coxinha", "Entrega!", "Salvas!"]

const restaurants = [
  {
    id: 1,
    name: "Ueceana",
    type: "Tipo de comida...",
    tags: ["Entrega", "Lanche"],
    rating: 4.5,
    status: "open",
  },
  {
    id: 2,
    name: "Restaurante 2",
    type: "Tipo de comida...",
    tags: ["Lanche", "Doce"],
    rating: 4.5,
    status: "open",
  },
  {
    id: 3,
    name: "Restaurante 3",
    type: "Tipo de comida...",
    tags: ["Marmita", "Lanche"],
    rating: 4.5,
    status: "open",
  },
  {
    id: 4,
    name: "Restaurante 4",
    type: "Tipo de comida...",
    tags: ["Marmita"],
    rating: 4.5,
    status: "open",
  },
  {
    id: 5,
    name: "Restaurante 5",
    type: "Fechado.",
    tags: ["Tapioca"],
    rating: 4.5,
    status: "closed",
  },
  {
    id: 6,
    name: "Restaurante 6",
    type: "Fechado.",
    tags: ["Tapioca"],
    rating: 4.5,
    status: "closed",
  },
]

export default function RestaurantApp() {
  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-emerald-500 px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-orange-400 rounded"></div>
          </div>
          <h1 className="text-xl font-bold tracking-wider">UNIVERY</h1>
          <div className="text-sm text-center">
            <div className="font-semibold">Entregue Já!</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Pesquise por restaurante ou item"
            className="pl-10 bg-white border-0 text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <div className="mt-2 text-right">
          <span className="text-sm font-medium">RESTAURANTES</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-4 bg-white">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge
              key={category}
              variant={index < 4 ? "default" : "secondary"}
              className={`px-3 py-1 text-sm font-medium ${
                index < 4
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-teal-100 hover:bg-teal-200 text-teal-700"
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Restaurant List */}
      <div className="px-4 space-y-3 pb-20">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex gap-3">
              {/* Restaurant Image */}
              <div className="w-16 h-16 bg-gradient-to-b from-blue-200 to-green-300 rounded-lg flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-green-200 to-green-400"></div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-green-400 rounded-b-lg"></div>
                <div className="absolute top-2 left-2 w-6 h-3 bg-white/60 rounded-full"></div>
                <div className="absolute top-2 right-2 w-4 h-2 bg-white/40 rounded-full"></div>
              </div>

              {/* Restaurant Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                  <Bookmark className="w-5 h-5 text-gray-400" />
                </div>

                <p className="text-sm text-gray-500 mb-2">{restaurant.type}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {restaurant.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-600">
            <Menu className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-900">
            <Utensils className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-600">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
