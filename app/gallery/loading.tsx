import { Skeleton } from "@/components/ui/skeleton"

export default function GalleryLoading() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-[300px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

