import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Phone, Shield, PawPrintIcon as Paw, Heart, Activity, Camera, CheckCircle } from "lucide-react"

export function HostelProfile({ hostel }) {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="relative h-40 w-full rounded-lg overflow-hidden">
                <Image src={hostel.image_url || "/placeholder.svg"} alt={hostel.name} fill className="object-cover" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{hostel.name}</h1>
                <p className="text-muted-foreground">{hostel.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{hostel.location.address}</span>
                <Badge variant="outline">{hostel.service_radius} mile radius</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Check-in/Check-out
                  </h3>
                  <div className="text-sm space-y-1">
                    <p>Check-in: {hostel.hostel_details.check_in_time}</p>
                    <p>Check-out: {hostel.hostel_details.check_out_time}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Emergency Contact
                  </h3>
                  <p className="text-sm">{hostel.phone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facilities & Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {hostel.hostel_details.facilities.map((facility) => (
                <div key={facility} className="flex items-center gap-2 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pet Care</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Medical Care
                </h3>
                <div className="space-y-2">
                  <p className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    {hostel.hostel_details.medical_care_available
                      ? "Medical care available"
                      : "Basic medical care only"}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    {hostel.hostel_details.vet_on_call ? "Vet on call 24/7" : "Vet referral available"}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    {hostel.hostel_details.emergency_transport
                      ? "Emergency transport available"
                      : "Transport on request"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Monitoring
                </h3>
                <div className="space-y-2">
                  <p className="text-sm flex items-center gap-2">
                    <Camera className="h-3 w-3 text-primary" />
                    {hostel.hostel_details.monitoring_type}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Accepted Pets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hostel.hostel_details.accepted_pets.map((pet) => (
                <div key={pet} className="flex items-center gap-2 p-3 border rounded-lg">
                  <Paw className="h-4 w-4 text-primary" />
                  <span>{pet}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Special Care</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <span>Special needs support available</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We can accommodate pets with special medical needs or dietary requirements. Please inform us during
                booking.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

