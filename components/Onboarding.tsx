"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function Onboarding() {
  const [name, setName] = useState("")
  const [fitnessLevel, setFitnessLevel] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !fitnessLevel) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      })
      return
    }
    // In a real app, we would save this data to a database
    localStorage.setItem("userName", name)
    localStorage.setItem("fitnessLevel", fitnessLevel)
    router.push("/workout-plan")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Fitness Level</Label>
        <RadioGroup value={fitnessLevel} onValueChange={setFitnessLevel}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="beginner" id="beginner" />
            <Label htmlFor="beginner">Beginner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediate" id="intermediate" />
            <Label htmlFor="intermediate">Intermediate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="advanced" id="advanced" />
            <Label htmlFor="advanced">Advanced</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full">
        Start Your Journey
      </Button>
    </form>
  )
}

