import { Button } from '@/components/ui/button'
import PetList from '@/components/PetList'
import AddPetForm from '@/components/AddPetForm'

const petCategories = ['Dog', 'Cat', 'Bird', 'Rodent', 'Exotic']

export default function PetsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Pet Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {petCategories.map((category) => (
          <Button key={category} className="h-32 text-lg">
            {category}
          </Button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Pets</h2>
          <PetList />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add a New Pet</h2>
          <AddPetForm />
        </div>
      </div>
    </div>
  )
}

