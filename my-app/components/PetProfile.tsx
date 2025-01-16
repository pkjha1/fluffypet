import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PetProfile({ pet }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{pet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Type: {pet.type}</p>
        <p>Breed: {pet.breed}</p>
        <p>Age: {pet.age}</p>
        {pet.medicalInfo && <p>Medical Info: {pet.medicalInfo}</p>}
        <Button className="mt-2">Edit Pet</Button>
      </CardContent>
    </Card>
  )
}

