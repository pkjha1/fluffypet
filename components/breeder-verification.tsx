"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Shield, Star, Users, Dna, FileCheck } from "lucide-react"
import { verifyBlockchainCredentials } from "@/app/actions"

export function BreederVerification({ breeder }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{breeder.name}</CardTitle>
              <CardDescription>{breeder.location}</CardDescription>
            </div>
            {breeder.verified && (
              <Badge className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Verified Breeder
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{breeder.rating}</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{breeder.adoptions_completed}</p>
                  <p className="text-sm text-muted-foreground">Adoptions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{breeder.years_experience}</p>
                  <p className="text-sm text-muted-foreground">Years Active</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Certifications</h4>
              <div className="space-y-2">
                {breeder.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Issued: {new Date(cert.issued_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => verifyBlockchainCredentials(cert.blockchain_id)}>
                      <Dna className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Breeding Standards</h4>
              <div className="space-y-2">
                {breeder.standards.map((standard) => (
                  <div key={standard.id} className="flex items-start gap-2 p-3 border rounded-lg">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{standard.title}</p>
                      <p className="text-sm text-muted-foreground">{standard.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Recent Reviews</h4>
              <div className="space-y-4">
                {breeder.reviews.map((review) => (
                  <div key={review.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-primary fill-primary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

