"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const phases = [
  { name: "Foundation", weeks: 6 },
  { name: "Strength", weeks: 6 },
  { name: "Hypertrophy", weeks: 6 },
  { name: "Advanced", weeks: 6 },
]

export default function WorkoutPlanPage() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentWeek, setCurrentWeek] = useState(1)
  const router = useRouter()

  const handleStartWorkout = () => {
    router.push(`/workout/${currentPhase + 1}/${currentWeek}`)
  }

  const handleNextWeek = () => {
    if (currentWeek < phases[currentPhase].weeks) {
      setCurrentWeek(currentWeek + 1)
    } else if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1)
      setCurrentWeek(1)
      toast.success(`You've advanced to the ${phases[currentPhase + 1].name} Phase!`)
    } else {
      toast.success("Congratulations! You've completed the 6-month plan!")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Your 6-Month Strength Building Plan</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{phases[currentPhase].name} Phase</CardTitle>
          <CardDescription>
            Week {currentWeek} of {phases[currentPhase].weeks}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>You're currently in the {phases[currentPhase].name} Phase of your strength building journey.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleStartWorkout}>Start Today's Workout</Button>
          <Button onClick={handleNextWeek} variant="outline">
            Next Week
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

