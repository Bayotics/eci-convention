import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export default function Loading() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />

      {/* Hero Section Skeleton */}
      <section className="relative h-[40vh] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="h-10 bg-gray-300 rounded w-80 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="animate-pulse h-4 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
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
      </section>

      <Footer />
    </main>
  )
}
