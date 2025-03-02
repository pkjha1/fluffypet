"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ActiveListings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pet Name</TableHead>
              <TableHead>Breed</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Max</TableCell>
              <TableCell>Golden Retriever</TableCell>
              <TableCell>3 months</TableCell>
              <TableCell>$1,200</TableCell>
              <TableCell>Available</TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

