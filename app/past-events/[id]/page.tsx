import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { PastEventDetail } from "@/components/sections/past-event-detail"

interface PageProps {
  params: {
    id: string
  }
}

export default function PastEventDetailPage({ params }: PageProps) {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <PastEventDetail eventId={params.id} />
      <Footer />
    </main>
  )
}
