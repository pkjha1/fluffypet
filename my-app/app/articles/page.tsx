import { PrismaClient } from '@prisma/client'
import ArticleCard from '@/components/ArticleCard'

const prisma = new PrismaClient()

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Pet Care Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

