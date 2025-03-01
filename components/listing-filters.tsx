"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ListingFilters() {
  return (
    <div className="space-y-4 p-4 bg-background rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input id="search" placeholder="Search listings..." />
      </div>
      <div className="space-y-2">
        <Label>Pet Type</Label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select pet type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pets</SelectItem>
            <SelectItem value="dogs">Dogs</SelectItem>
            <SelectItem value="cats">Cats</SelectItem>
            <SelectItem value="birds">Birds</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="nearby">Nearby</SelectItem>
            <SelectItem value="city">Current City</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

