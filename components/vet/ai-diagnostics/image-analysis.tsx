"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, ImageIcon, Loader2, Upload } from "lucide-react"

interface ImageAnalysisProps {
  petId: string
}

export function ImageAnalysis({ petId }: ImageAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsAnalyzing(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("petId", petId)

      const response = await fetch("/api/vet/analyze-image", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
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
        <CardTitle>Image Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="xray">
          <TabsList>
            <TabsTrigger value="xray">X-Ray</TabsTrigger>
            <TabsTrigger value="ultrasound">Ultrasound</TabsTrigger>
            <TabsTrigger value="skin">Skin Lesions</TabsTrigger>
          </TabsList>

          <TabsContent value="xray" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Upload X-ray images for AI analysis</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("xray-upload")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                  <input
                    id="xray-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm">Analyzing image...</p>
                  </div>
                  <Progress value={33} />
                </div>
              )}

              {analysis && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src={analysis.originalImage || "/placeholder.svg"}
                        alt="Original X-ray"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src={analysis.annotatedImage || "/placeholder.svg"}
                        alt="Annotated X-ray"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Findings</h3>
                    {analysis.findings.map((finding: any, index: number) => (
                      <div key={index} className="flex items-start gap-2 rounded-lg border p-4">
                        <Brain className="h-5 w-5 text-primary mt-0.5" />
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
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

