import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function VetsLoading() {
  return (
    <div className="container py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex flex-col md:flex-row p-4">
              <Skeleton className="aspect-video md:aspect-square md:w-48 rounded-lg" />
              <div className="flex-1 space-y-4 mt-4 md:mt-0 md:ml-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <Skeleton className="h-4 w-[300px]" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-[100px]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-6 w-[100px]" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-10 w-[150px]" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

