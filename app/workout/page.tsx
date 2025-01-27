"use client"

import { useState } from "react"
import { workoutProgram } from "@/lib/workoutData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WorkoutPage() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentWorkout, setCurrentWorkout] = useState(0)

  const phase = workoutProgram[currentPhase]
  const workout = phase.workouts[currentWorkout]

  const handleNextWorkout = () => {
    if (currentWorkout < phase.workouts.length - 1) {
      setCurrentWorkout(currentWorkout + 1)
    } else if (currentPhase < workoutProgram.length - 1) {
      setCurrentPhase(currentPhase + 1)
      setCurrentWorkout(0)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{phase.name} Phase</h1>
      <h2 className="text-2xl font-semibold mb-4">{workout.name}</h2>
      <div className="grid gap-4">
        {workout.exercises.map((exercise, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {exercise.sets} sets of {exercise.reps} reps ({exercise.weight} weight)
              </p>
              <Link href={`/exercise/${encodeURIComponent(exercise.name)}`}>
                <Button className="mt-2">View Exercise</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleNextWorkout} className="mt-4">
        Next Workout
      </Button>
    </div>
  )
}

