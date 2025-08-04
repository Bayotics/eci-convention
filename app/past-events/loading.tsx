import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Skeleton */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-32">
        <div className="container mx-auto px-8 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-white/20 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
