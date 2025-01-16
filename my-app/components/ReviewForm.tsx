'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StarIcon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface ReviewFormProps {
  serviceProviderId?: number
  veterinarianId?: number
}

export default function ReviewForm({ serviceProviderId, veterinarianId }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceProviderId, veterinarianId, rating, comment }),
      })
      if (!response.ok) {
        throw new Error('Failed to submit review')
      }
      toast({
        title: 'Review submitted successfully',
        description: 'Thank you for your feedback!',
      })
      router.refresh()
      setRating(0)
      setComment('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-6 w-6 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          required
        />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

