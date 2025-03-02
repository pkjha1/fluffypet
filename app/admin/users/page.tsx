import { fetchUsers } from "@/app/actions"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default async function UsersPage() {
  const users = await fetchUsers()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage all users and their roles</p>
      </div>

      <DataTable columns={columns} data={users} />
    </div>
  )
}

