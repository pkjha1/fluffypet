import Header from "@/components/Header"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-[80px]" />
                    <Skeleton className="h-6 w-[80px]" />
                    <Skeleton className="h-6 w-[80px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

