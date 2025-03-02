import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoadingPage() {
  return (
    <div className="flex-1 container py-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[400px]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-[200px]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-[120px]" />
                      <Skeleton className="h-5 w-[80px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-9 w-[100px]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

