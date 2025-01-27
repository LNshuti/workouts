"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function WorkoutReminder() {
  const [permission, setPermission] = useState(Notification.permission)
  const { toast } = useToast()

  useEffect(() => {
    if (permission === "granted") {
      scheduleReminder()
    }
  }, [permission])

  const requestPermission = async () => {
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result === "granted") {
      toast({
        title: "Notifications Enabled",
        description: "You will now receive workout reminders.",
      })
    }
  }

  const scheduleReminder = () => {
    // In a real app, you would use a more sophisticated scheduling system
    setTimeout(() => {
      new Notification("Workout Reminder", {
        body: "It's time for your workout!",
        icon: "/workout-icon.png", // Make sure to add this icon to your public folder
      })
    }, 60000) // Reminder after 1 minute for demonstration purposes
  }

  return (
    <Button onClick={requestPermission} disabled={permission === "granted"}>
      {permission === "granted" ? "Reminders Enabled" : "Enable Workout Reminders"}
    </Button>
  )
}

