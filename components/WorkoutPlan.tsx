"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const phases = [
  { name: "Foundation", weeks: 6 },
  { name: "Strength", weeks: 6 },
  { name: "Hypertrophy", weeks: 6 },
  { name: "Advanced", weeks: 6 },
]

export function WorkoutPlan() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentWeek, setCurrentWeek] = useState(1)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const savedPhase = localStorage.getItem("currentPhase")
    const savedWeek = localStorage.getItem("currentWeek")
    if (savedPhase) setCurrentPhase(Number.parseInt(savedPhase))
    if (savedWeek) setCurrentWeek(Number.parseInt(savedWeek))
  }, [])

  const handleStartWorkout = () => {
    localStorage.setItem("currentPhase", currentPhase.toString())
    localStorage.setItem("currentWeek", currentWeek.toString())
    router.push(`/workout/${currentPhase + 1}/${currentWeek}`)
  }

  const handleNextWeek = () => {
    if (currentWeek < phases[currentPhase].weeks) {
      setCurrentWeek(currentWeek + 1)
    } else if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1)
      setCurrentWeek(1)
      toast({
        title: "New Phase!",
        description: `You've advanced to the ${phases[currentPhase + 1].name} Phase!`,
      })
    } else {
      toast({
        title: "Congratulations!",
        description: "You've completed the 6-month plan!",
      })
    }
  }

  return (
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
  )
}

