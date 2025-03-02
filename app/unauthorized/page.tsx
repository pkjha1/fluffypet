import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Unauthorized Access</h1>
      <p className="text-muted-foreground">You don&apos;t have permission to access this page.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}

