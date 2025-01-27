import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExercisePage({ params }: { params: { name: string } }) {
  const exerciseName = decodeURIComponent(params.name)
  const imagePath = `/exercise-images/${exerciseName.toLowerCase().replace(/ /g, "-")}.jpg`

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{exerciseName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt={exerciseName}
              fill
              className="object-cover rounded-md"
              onError={() => notFound()}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

