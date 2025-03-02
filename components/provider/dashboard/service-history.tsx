"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ServiceHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service History</CardTitle>
        <CardDescription>Your recent service records</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Pet</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2024-03-01</TableCell>
              <TableCell>Basic Grooming</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-02-28</TableCell>
              <TableCell>Premium Grooming</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Bella</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

