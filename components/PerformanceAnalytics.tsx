"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// This is mock data. In a real app, this would be fetched from a database.
const mockData = [
  { week: 1, totalWeight: 5000, totalReps: 300 },
  { week: 2, totalWeight: 5500, totalReps: 320 },
  { week: 3, totalWeight: 6000, totalReps: 340 },
  { week: 4, totalWeight: 6200, totalReps: 350 },
]

export function PerformanceAnalytics() {
  const [data, setData] = useState(mockData)

  useEffect(() => {
    // In a real app, you would fetch the user's performance data here
    // setData(fetchedData)
  }, [])

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
        <CardDescription>Track your progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="totalWeight" stroke="#8884d8" name="Total Weight (lbs)" />
            <Line yAxisId="right" type="monotone" dataKey="totalReps" stroke="#82ca9d" name="Total Reps" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

