"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Shield, Dna, CheckCircle } from "lucide-react"
import { PetHealthHistory } from "@/components/pet-health-history"
import { BreederVerification } from "@/components/breeder-verification"
import { AdoptionProcess } from "@/components/adoption-process"

export function AdoptableListings({ initialListings }) {
  const [listings, setListings] = useState(initialListings)
  const [selectedListing, setSelectedListing] = useState(null)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
              {listing.breeder.verified && (
                <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Verified Breeder
                </Badge>
              )}
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{listing.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold">{listing.price ? `$${listing.price}` : "Contact for Price"}</span>
                  {listing.nft_id && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Dna className="h-3 w-3" />
                      NFT Verified
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {listing.badges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setSelectedListing(listing)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{listing.title}</DialogTitle>
                      <DialogDescription>
                        {listing.breeder.name} • {listing.location}
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="details">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="health">Health History</TabsTrigger>
                        <TabsTrigger value="breeder">About Breeder</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <h4 className="font-medium">Breed Information</h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Breed: </span>
                                {listing.breed}
                              </p>
                              <p>
                                <span className="font-medium">Age: </span>
                                {listing.age}
                              </p>
                              <p>
                                <span className="font-medium">Gender: </span>
                                {listing.gender}
                              </p>
                              <p>
                                <span className="font-medium">Color: </span>
                                {listing.color}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Registration</h4>
                            <div className="space-y-1 text-sm">
                              {listing.registrations.map((reg) => (
                                <div key={reg.id} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  <span>{reg.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm text-muted-foreground">{listing.description}</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="font-medium mb-2">Parents</h4>
                            <div className="space-y-2">
                              {listing.parents.map((parent) => (
                                <div key={parent.id} className="flex items-center gap-2 p-2 border rounded-lg">
                                  <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                                    <Image
                                      src={parent.image || "/placeholder.svg"}
                                      alt={parent.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{parent.name}</p>
                                    <p className="text-sm text-muted-foreground">{parent.registration_number}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Included</h4>
                            <div className="space-y-1">
                              {listing.included.map((item) => (
                                <div key={item} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <AdoptionProcess listing={listing} />
                      </TabsContent>
                      <TabsContent value="health">
                        <PetHealthHistory listing={listing} />
                      </TabsContent>
                      <TabsContent value="breeder">
                        <BreederVerification breeder={listing.breeder} />
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

