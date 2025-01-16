import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-4">Published on: {article.createdAt.toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  )
}

