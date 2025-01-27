"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

// This is a simplified version of the workout data. In a real app, this would be fetched from a database.
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
  {
    name: "Pull Day",
    exercises: [
      { name: "Wide lat pull-down", sets: 3, reps: 12 },
      { name: "HS lateral row", sets: 3, reps: 12 },
      { name: "HS low row", sets: 3, reps: 12 },
      { name: "Seated face pull", sets: 3, reps: 15 },
      { name: "Incline DB Y raise", sets: 3, reps: 15 },
      { name: "Wall DB curls", sets: 3, reps: 12 },
      { name: "DB concentration curls", sets: 3, reps: 12 },
      { name: "Hyperextensions", sets: 3, reps: 15 },
      { name: "Crunches", sets: 2, reps: 20 },
    ],
  },
  {
    name: "Leg Day",
    exercises: [
      { name: "BB back squats", sets: 3, reps: 12 },
      { name: "Hack squat", sets: 3, reps: 12 },
      { name: "Wide leg press", sets: 3, reps: 12 },
      { name: "Ham curls", sets: 3, reps: 12 },
      { name: "Quad extensions", sets: 3, reps: 12 },
      { name: "Standing calf raises", sets: 3, reps: 15 },
      { name: "Hanging knee raises", sets: 3, reps: 15 },
    ],
  },
]

export function Workout({ phase, week }: { phase: number; week: number }) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [weight, setWeight] = useState("")
  const [completedReps, setCompletedReps] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const workout = workouts[Math.floor(Math.random() * workouts.length)] // In a real app, this would be determined by the current day

  const handleNextExercise = () => {
    if (!weight || !completedReps) {
      toast({
        title: "Error",
        description: "Please enter weight and completed reps",
        variant: "destructive",
      })
      return
    }

    // In a real app, we would save this data to a database
    console.log(`Exercise: ${workout.exercises[currentExercise].name}, Weight: ${weight}, Reps: ${completedReps}`)

    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setWeight("")
      setCompletedReps("")
    } else {
      toast({
        title: "Workout Complete!",
        description: "Great job! You've finished today's workout.",
      })
      router.push("/workout-plan")
    }
  }

  const exercise = workout.exercises[currentExercise]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{workout.name}</CardTitle>
        <CardDescription>
          Phase {phase}, Week {week}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{exercise.name}</h2>
          <p>
            {exercise.sets} sets of {exercise.reps} reps
          </p>
        </div>
        <div className="flex justify-center">
          <Image src={`/placeholder.svg?height=200&width=200`} alt={exercise.name} width={200} height={200} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reps">Completed Reps</Label>
          <Input
            id="reps"
            type="number"
            placeholder="Enter completed reps"
            value={completedReps}
            onChange={(e) => setCompletedReps(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextExercise} className="w-full">
          {currentExercise < workout.exercises.length - 1 ? "Next Exercise" : "Finish Workout"}
        </Button>
      </CardFooter>
    </Card>
  )
}

