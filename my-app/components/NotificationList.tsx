'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent } from '@/components/ui/card'

interface Notification {
  id: number
  message: string
  read: boolean
  createdAt: string
}

export default function NotificationList() {
  const { user } = useUser()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (user) {
      fetch(`/api/notifications`)
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((error) => console.error('Error fetching notifications:', error))
    }
  }, [user])

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/notifications/${id}`, { method: 'PATCH' })
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className={notification.read ? 'opacity-50' : ''}>
          <CardContent className="p-4">
            <p>{notification.message}</p>
            <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
            {!notification.read && (
              <button onClick={() => markAsRead(notification.id)} className="text-sm text-blue-500">
                Mark as read
              </button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

