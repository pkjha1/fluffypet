import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="container mx-auto space-y-16 py-16">
      <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <Skeleton className="h-12 w-[80%]" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <Skeleton className="aspect-video lg:aspect-square" />
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto mt-4 h-16 max-w-[700px]" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto mt-4 h-16 max-w-[700px]" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto mt-4 h-16 max-w-[700px]" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </section>
    </div>
  )
}

