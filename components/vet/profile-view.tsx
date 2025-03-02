import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Phone, Mail, Award, Clock, Building2, Shield } from "lucide-react"
import type { VetProfile, ClinicAffiliation } from "@/lib/types/vet"

interface VetProfileViewProps {
  profile: VetProfile
}

export function VetProfileView({ profile }: VetProfileViewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                <Image src={profile.imageUrl || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle>{profile.name}</CardTitle>
                  {profile.verification.isVerified && (
                    <Badge className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardDescription>{profile.title}</CardDescription>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">License: {profile.licenseNumber}</Badge>
                  <Badge variant="outline">{profile.experience} years exp.</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.contactEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.isIndependent && (
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <Building2 className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Independent Practice</p>
                    <p className="text-sm text-muted-foreground">Provides home visits and virtual consultations</p>
                  </div>
                </div>
              )}

              {profile.clinicAffiliations.map((affiliation) => (
                <AffiliationCard key={affiliation.clinicId} affiliation={affiliation} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Working Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {profile.workingHours.map((hours) => (
                <div key={hours.day} className="flex items-center justify-between py-2">
                  <span className="font-medium">{hours.day}</span>
                  {hours.available ? (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {hours.startTime} - {hours.endTime}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unavailable</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.verification.documents.map((doc) => (
                <div key={doc.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Issued by {doc.issuer} on {doc.issuedDate.toLocaleDateString()}
                    </p>
                    {doc.expiryDate && (
                      <p className="text-sm text-muted-foreground">Expires: {doc.expiryDate.toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Schedule Consultation</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AffiliationCard({ affiliation }: { affiliation: ClinicAffiliation }) {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{affiliation.clinicName}</p>
          <Badge variant="outline">{affiliation.role}</Badge>
        </div>
        <Button variant="outline" size="sm">
          View Clinic
        </Button>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            Since {new Date(affiliation.startDate).toLocaleDateString()}
            {affiliation.endDate && ` until ${new Date(affiliation.endDate).toLocaleDateString()}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Available on: {affiliation.schedule.map((s) => s.day).join(", ")}</span>
        </div>
      </div>
    </div>
  )
}

