'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

export default function AddPetForm() {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, species, breed, age: parseInt(age) }),
      })
      if (!response.ok) {
        throw new Error('Failed to add pet')
      }
      toast({
        title: 'Pet added successfully',
        description: `${name} has been added to your pets.`,
      })
      router.refresh()
      setName('')
      setSpecies('')
      setBreed('')
      setAge('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add pet. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="species" className="block text-sm font-medium text-gray-700">Species</label>
        <Select value={species} onValueChange={setSpecies} required>
          <SelectTrigger>
            <SelectValue placeholder="Select species" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dog">Dog</SelectItem>
            <SelectItem value="cat">Cat</SelectItem>
            <SelectItem value="bird">Bird</SelectItem>
            <SelectItem value="rodent">Rodent</SelectItem>
            <SelectItem value="exotic">Exotic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
        <Input id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      </div>
      <Button type="submit">Add Pet</Button>
    </form>
  )
}

