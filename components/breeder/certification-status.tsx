import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, FileCheck, AlertTriangle, Upload } from "lucide-react"

interface CertificationStatusProps {
  status: {
    breederLicense: {
      status: "active" | "pending" | "expired"
      number: string
      expiryDate: Date
    }
    certifications: {
      name: string
      status: "verified" | "pending" | "expired"
      issueDate: Date
      expiryDate: Date
      verificationProgress: number
    }[]
    pendingRequirements: string[]
    complianceScore: number
  }
}

export function CertificationStatus({ status }: CertificationStatusProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Certification Status</CardTitle>
        <Shield className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Breeder License</p>
            <Badge
              variant={
                status.breederLicense.status === "active"
                  ? "default"
                  : status.breederLicense.status === "pending"
                    ? "warning"
                    : "destructive"
              }
            >
              {status.breederLicense.status}
            </Badge>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            <p>License #: {status.breederLicense.number}</p>
            <p>Expires: {status.breederLicense.expiryDate.toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Certifications</p>
          {status.certifications.map((cert) => (
            <div key={cert.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-primary" />
                  <p className="text-sm">{cert.name}</p>
                </div>
                <Badge
                  variant={
                    cert.status === "verified" ? "default" : cert.status === "pending" ? "warning" : "destructive"
                  }
                >
                  {cert.status}
                </Badge>
              </div>
              {cert.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Progress value={cert.verificationProgress} className="flex-1" />
                  <span className="text-xs text-muted-foreground">{cert.verificationProgress}%</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">Valid until {cert.expiryDate.toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {status.pendingRequirements.length > 0 && (
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium">Pending Requirements</p>
                <ul className="mt-2 space-y-1">
                  {status.pendingRequirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Compliance Score</p>
              <p className="text-2xl font-bold">{status.complianceScore}%</p>
            </div>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Update Documents
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

