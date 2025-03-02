"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { updateUserRole } from "@/app/actions"

export type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "suspended"
  createdAt: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return <Badge variant="outline">{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "active" ? "success" : "destructive"}>{status}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "admin")}>Make Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "pet_owner")}>Make Pet Owner</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "vet")}>Make Vet</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "breeder")}>Make Breeder</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "service_provider")}>
              Make Service Provider
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "ngo")}>Make NGO</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "volunteer")}>Make Volunteer</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateUserRole(user.id, "hostel_owner")}>
              Make Hostel Owner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

