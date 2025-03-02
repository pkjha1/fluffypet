import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { db } from "@/lib/db"

export default async function BlogPosts() {
  const posts = await db.post.findMany()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusStyles[post.status],
                  )}
                >
                  {post.status}
                </span>
              </TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const statusStyles = {
  published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
}

