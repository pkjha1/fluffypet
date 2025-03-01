import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentPosts() {
  return (
    <div className="space-y-8">
      {recentPosts.map((post) => (
        <div key={post.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="text-sm text-muted-foreground">By {post.author.name}</p>
          </div>
          <div className="ml-auto font-medium">{new Date(post.date).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  )
}

const recentPosts = [
  {
    id: "1",
    title: "Understanding Pet Nutrition",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    date: "2024-02-28",
  },
  {
    id: "2",
    title: "Top 10 Dog Breeds for Families",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
    },
    date: "2024-02-27",
  },
  {
    id: "3",
    title: "Cat Care Basics",
    author: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg",
    },
    date: "2024-02-26",
  },
  {
    id: "4",
    title: "Pet Training Tips",
    author: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg",
    },
    date: "2024-02-25",
  },
]

