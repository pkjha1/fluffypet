import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Heart, Calendar, MapPin, AlertCircle, CheckCircle, PawPrint } from "lucide-react"

export function RescueProfile({ rescue }) {
  const urgencyColors = {
    urgent: "destructive",
    moderate: "warning",
    routine: "default",
  }

  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Case #{rescue.case_id}</CardTitle>
                <CardDescription>Rescued on {new Date(rescue.rescue_date).toLocaleDateString()}</CardDescription>
              </div>
              <Badge variant={urgencyColors[rescue.emergency_level]}>
                {rescue.emergency_level === "urgent" && <AlertTriangle className="mr-1 h-3 w-3" />}
                {rescue.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={rescue.images[0] || "/placeholder.svg"}
                  alt={`Rescue case ${rescue.case_id}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{rescue.location.address}</span>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Rescue Details</h3>
                  <p className="text-sm text-muted-foreground">{rescue.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Current Status</h4>
                    <div className="flex items-center gap-2">
                      {rescue.status === "active" ? (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                      <span>{rescue.status}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Assigned Volunteers</h4>
                    <div className="flex flex-wrap gap-2">
                      {rescue.assigned_volunteers.map((volunteer) => (
                        <Badge key={volunteer.id} variant="secondary">
                          {volunteer.user.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rescue Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rescue.rescue_notes.map((note, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{note.author}</span>
                      <span className="text-sm text-muted-foreground">{new Date(note.date).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-sm">{note.content}</p>
                    {note.images?.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {note.images.map((image, i) => (
                          <div key={i} className="relative h-20 w-20 rounded overflow-hidden">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Update image ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="default">
              <Heart className="mr-2 h-4 w-4" />
              Volunteer to Help
            </Button>
            <Button className="w-full" variant="outline">
              <PawPrint className="mr-2 h-4 w-4" />
              Foster Application
            </Button>
          </CardContent>
        </Card>

        {rescue.medical_assessment && (
          <Card>
            <CardHeader>
              <CardTitle>Medical Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Condition</h4>
                  <p className="text-sm text-muted-foreground">{rescue.medical_assessment.condition}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Urgency Level</h4>
                  <Badge variant={urgencyColors[rescue.medical_assessment.urgency_level]}>
                    {rescue.medical_assessment.urgency_level}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Key Findings</h4>
                  <ul className="mt-2 space-y-2">
                    {rescue.medical_assessment.findings.map((finding, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

