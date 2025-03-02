import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Star, Award, CheckCircle } from "lucide-react"

export function ServiceProviderProfile({ provider }) {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                <Image
                  src={provider.image_url || "/placeholder.svg"}
                  alt={provider.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-2xl flex items-center gap-2">
                  {provider.name}
                  {provider.badges?.map((badge) => (
                    <Badge key={badge.name} variant="secondary" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {badge.name}
                    </Badge>
                  ))}
                </CardTitle>
                <CardDescription>{provider.description}</CardDescription>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{provider.location.address}</span>
                  <Badge variant="outline">{provider.service_radius} mile radius</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.service_types.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.specializations.map((spec) => (
                    <Badge key={spec} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{provider.about}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {provider.certifications?.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-2 rounded-lg border p-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating & Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-2xl font-bold">{provider.rating}</span>
                <span className="text-sm text-muted-foreground">({provider.reviews?.length} reviews)</span>
              </div>
              <Button className="w-full">Book Now</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {provider.badges?.map((badge) => (
                <div key={badge.name} className="flex items-start gap-3 rounded-lg border p-3">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Earned {new Date(badge.earned_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

