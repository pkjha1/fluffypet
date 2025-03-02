import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoadingPage() {
  return (
    <div className="flex-1 container py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[450px]" />
        </div>

        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[200px]" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-[150px]" />
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-[100px]" />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-[80px]" />
                  <Skeleton className="h-10 w-[100px]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

