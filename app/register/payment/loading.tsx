import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Loader2 } from "lucide-react"

export default function PaymentLoading() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar isScrolled={false} />
      <Header isScrolled={false} />

      <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Payment Options</h2>
          <p className="text-gray-600">Please wait while we prepare your payment page...</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
