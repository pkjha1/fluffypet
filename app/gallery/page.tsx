"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Grid, List, Search, Upload } from "lucide-react"
import { Header } from "@/components/ui/header"
import cn from "classnames"

// Mock data for gallery items
const galleryItems = [
  {
    id: 1,
    title: "Max at the Park",
    image: "/placeholder.svg?height=400&width=600",
    date: "2024-03-01",
    likes: 24,
    petName: "Max",
  },
  {
    id: 2,
    title: "Luna's First Bath",
    image: "/placeholder.svg?height=400&width=600",
    date: "2024-02-28",
    likes: 18,
    petName: "Luna",
  },
  // Add more items...
]

export default function GalleryPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Pet Gallery</h1>
              <p className="text-muted-foreground mt-2">Capture and share your precious moments with your pets</p>
            </div>
            <Button className="sm:self-start">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search photos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="view" className="sr-only">
                View
              </Label>
              <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Photos</TabsTrigger>
              <TabsTrigger value="max">Max</TabsTrigger>
              <TabsTrigger value="luna">Luna</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div
                  className={cn(
                    "gap-4",
                    view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col",
                  )}
                >
                  {galleryItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "group relative overflow-hidden rounded-lg border bg-background",
                        view === "grid" ? "aspect-square" : "flex gap-4",
                      )}
                    >
                      <div className={cn("relative", view === "grid" ? "aspect-square" : "aspect-video w-48")}>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div
                        className={cn(
                          view === "grid"
                            ? "absolute bottom-0 w-full bg-gradient-to-t from-background/80 to-background/0 p-4"
                            : "flex flex-col justify-between p-4",
                        )}
                      >
                        <div>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {item.likes} likes • {item.petName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

