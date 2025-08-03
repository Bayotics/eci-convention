import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="h-12 md:h-16 bg-gray-400 animate-pulse rounded mb-4 mx-auto max-w-2xl" />
          <div className="h-6 bg-gray-400 animate-pulse rounded mx-auto max-w-xl" />
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Search Bar Skeleton */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="h-12 bg-gray-200 animate-pulse rounded-lg mb-6" />
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 animate-pulse rounded-full" />
              ))}
            </div>
          </div>

          {/* FAQ Items Skeleton */}
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
