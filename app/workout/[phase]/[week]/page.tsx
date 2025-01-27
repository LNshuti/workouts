"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { ExerciseImage } from "@/components/ExerciseImage"

const workouts = [
  {
    name: "Push Day",
    exercises: [
      { name: "Pec deck fly", sets: 3, reps: 12 },
      { name: "HS incline press", sets: 3, reps: 12 },
      { name: "DB shoulder press", sets: 3, reps: 12 },
      { name: "BB Bench Press", sets: 3, reps: 12 },
      { name: "Cable lateral raises", sets: 3, reps: 15 },
      { name: "Cable rope tricep extension", sets: 3, reps: 12 },
      { name: "Hanging knee raises", sets: 3, reps: 15 },
      { name: "Crunches", sets: 2, reps: 20 },
    ],
  },
]

export default function WorkoutPage({ params }: { params: { phase: string; week: string } }) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [weight, setWeight] = useState("")
  const [completedReps, setCompletedReps] = useState("")
  const router = useRouter()

  const phase = Number.parseInt(params.phase)
  const week = Number.parseInt(params.week)
  const workout = workouts[0]

  const handleNextExercise = () => {
    if (!weight) {
      toast.error("Please enter weight")
      return
    }

    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setWeight("")
      setCompletedReps("")
    } else {
      toast.success("Great job! You've finished today's workout.")
      router.push("/workout-plan")
    }
  }

  const exercise = workout.exercises[currentExercise]
  const gifPath = `/workout-gifs/${exercise.name.toLowerCase().replace(/ /g, "-")}.gif`

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{workout.name}</h1>
          <p className="text-2xl text-muted-foreground">
            Phase {phase}, Week {week}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{exercise.name}</h2>
          <p className="text-xl">
            {exercise.sets} sets of {exercise.reps} reps
          </p>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
          <ExerciseImage name={exercise.name} gifPath={gifPath} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-xl">
            Weight (lbs)
          </Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="text-lg h-12"
          />
        </div>

        <Button onClick={handleNextExercise} className="w-full h-12 text-lg">
          {currentExercise < workout.exercises.length - 1 ? "Next Exercise" : "Finish Workout"}
        </Button>
      </CardContent>
    </Card>
  )
}

