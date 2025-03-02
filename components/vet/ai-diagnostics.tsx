"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, ImageIcon, Activity, FileText, Loader2, Upload, AlertTriangle } from "lucide-react"
import { analyzeImage, analyzeBiometrics } from "@/app/actions"

interface AIToolsProps {
  petId: string
  petName: string
}

export function AIDiagnostics({ petId, petName }: AIToolsProps) {
  const [activeTab, setActiveTab] = useState("imaging")
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

      const result = await analyzeImage(formData)
      setAnalysis(result)
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  async function handleBiometricAnalysis(data: any) {
    try {
      setIsAnalyzing(true)
      const result = await analyzeBiometrics({
        petId,
        data,
      })
      setAnalysis(result)
    } catch (error) {
      console.error("Error analyzing biometrics:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Diagnostic Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="imaging">Image Analysis</TabsTrigger>
            <TabsTrigger value="biometrics">Biometric Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="imaging" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Upload X-rays, scans, or other medical images</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                  <input
                    id="image-upload"
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

              {analysis?.imaging && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src={analysis.imaging.originalImage || "/placeholder.svg"}
                        alt="Original"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src={analysis.imaging.annotatedImage || "/placeholder.svg"}
                        alt="Annotated"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Findings</h3>
                    {analysis.imaging.findings.map((finding: any, index: number) => (
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

                  {analysis.imaging.recommendations && (
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Recommendations</p>
                          <p className="text-sm text-muted-foreground">{analysis.imaging.recommendations}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="biometrics" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Smart Collar Data</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  {analysis?.biometrics ? (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        {analysis.biometrics.vitals.map((vital: any) => (
                          <div key={vital.name} className="rounded-lg border p-4 text-center">
                            <p className="text-sm text-muted-foreground">{vital.name}</p>
                            <p className="text-2xl font-bold">{vital.value}</p>
                            <p className="text-xs text-muted-foreground">{vital.status}</p>
                          </div>
                        ))}
                      </div>

                      {analysis.biometrics.alerts?.length > 0 && (
                        <div className="rounded-lg bg-destructive/10 p-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                            <div>
                              <p className="font-medium text-destructive">Attention Required</p>
                              <ul className="mt-2 space-y-1">
                                {analysis.biometrics.alerts.map((alert: string, index: number) => (
                                  <li key={index} className="text-sm text-destructive">
                                    {alert}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => handleBiometricAnalysis({})}>
                      Analyze Latest Data
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

