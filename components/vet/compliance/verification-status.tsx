import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Upload } from "lucide-react"

interface VerificationStatusProps {
  status: {
    isVerified: boolean
    licenseNumber: string
    licenseExpiry: Date
    documents: Array<{
      type: string
      name: string
      status: "verified" | "pending" | "expired"
      expiryDate: Date
    }>
    pendingRequirements: string[]
  }
}

export function VerificationStatus({ status }: VerificationStatusProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Verification Status</CardTitle>
        <Badge variant={status.isVerified ? "default" : "destructive"} className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          {status.isVerified ? "Verified" : "Unverified"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-medium">License Number</p>
            <span className="text-sm">{status.licenseNumber}</span>
          </div>
          <p className="text-sm text-muted-foreground">Expires: {status.licenseExpiry.toLocaleDateString()}</p>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Required Documents</p>
          {status.documents.map((doc) => (
            <div key={doc.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm">{doc.name}</p>
                <Badge
                  variant={doc.status === "verified" ? "default" : doc.status === "pending" ? "outline" : "destructive"}
                >
                  {doc.status}
                </Badge>
              </div>
              {doc.expiryDate && (
                <p className="text-xs text-muted-foreground">Expires: {doc.expiryDate.toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>

        {status.pendingRequirements.length > 0 && (
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium">Action Required</p>
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

        <Button className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Documents
        </Button>
      </CardContent>
    </Card>
  )
}

