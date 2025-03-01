import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle } from "lucide-react"

interface ComplianceStatusProps {
  status: {
    licenseStatus: "active" | "expiring" | "expired"
    licenseExpiry: Date
    certifications: {
      name: string
      status: "valid" | "expiring" | "expired"
      expiryDate: Date
      progress: number
    }[]
    pendingRequirements: string[]
  }
}

export function ComplianceStatus({ status }: ComplianceStatusProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Compliance Status</CardTitle>
        <Shield className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-medium">License Status</p>
            <Badge
              variant={
                status.licenseStatus === "active"
                  ? "default"
                  : status.licenseStatus === "expiring"
                    ? "warning"
                    : "destructive"
              }
            >
              {status.licenseStatus}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Expires: {status.licenseExpiry.toLocaleDateString()}</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Certifications</p>
          {status.certifications.map((cert) => (
            <div key={cert.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm">{cert.name}</p>
                <span className="text-xs text-muted-foreground">{cert.expiryDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={cert.progress} className="flex-1" />
                <Badge
                  variant={cert.status === "valid" ? "default" : cert.status === "expiring" ? "warning" : "destructive"}
                >
                  {cert.status}
                </Badge>
              </div>
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

        <Button className="w-full">Update Compliance Documents</Button>
      </CardContent>
    </Card>
  )
}

