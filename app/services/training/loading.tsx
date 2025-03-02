import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingTrainingPage() {
  return (
    <div className="container space-y-8 py-6 lg:py-8">
      <div className="space-y-4">
        <Skeleton className="h-14 w-[250px]" />
        <Skeleton className="h-6 w-[350px]" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border p-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

