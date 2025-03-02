"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ServiceFilters() {
  return (
    <div className="space-y-4 p-4 bg-background rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="search">Search Services</Label>
        <Input id="search" placeholder="Search services..." />
      </div>
      <div className="space-y-2">
        <Label>Service Type</Label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="grooming">Grooming</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="boarding">Boarding</SelectItem>
            <SelectItem value="veterinary">Veterinary</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Price Range</Label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="mid">Mid-Range</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

