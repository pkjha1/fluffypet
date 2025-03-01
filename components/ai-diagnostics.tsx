"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Loader2 } from "lucide-react"
import { analyzeImage } from "@/app/actions"

interface AIDiagnosticsProps {
  petId: string
}

export function AIDiagnostics({ petId }: AIDiagnosticsProps) {
  const [image, setImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsAnalyzing(true)

      // Create preview URL
      const preview = URL.createObjectURL(file)
      setImage(preview)

      // Upload and analyze image
      const formData = new FormData()
      formData.append("file", file)
      formData.append("petId", petId)

      const result = await analyzeImage(formData)
      setAnalysis(result)
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Diagnostic Assistant</CardTitle>
        <CardDescription>Upload X-rays or medical images for AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Button
              variant="outline"
              className="w-full"
              disabled={isAnalyzing}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>

          {image && (
            <div className="space-y-4">
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg border">
                <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
              </div>

              {isAnalyzing ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm">Analyzing image...</p>
                  </div>
                  <Progress value={33} />
                </div>
              ) : analysis ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Analysis Results</h4>
                    <p className="text-sm text-muted-foreground">AI-assisted diagnosis based on image analysis</p>
                  </div>

                  <div className="space-y-2">
                    {analysis.findings.map((finding, index) => (
                      <div key={index} className="flex items-start gap-2 rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">{finding.title}</p>
                          <p className="text-sm text-muted-foreground">{finding.description}</p>
                          <div className="flex items-center gap-2">
                            <Progress value={finding.confidence * 100} className="w-24" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(finding.confidence * 100)}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm font-medium">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{analysis.recommendation}</p>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

