import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ArticleCard({ article }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{article.excerpt}</p>
        <Link href={`/articles/${article.id}`} className="text-blue-500 hover:underline">
          Read More
        </Link>
      </CardContent>
    </Card>
  )
}

