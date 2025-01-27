export type Exercise = {
  name: string
  sets: number
  reps: number
  weight: "bodyweight" | "moderate" | "increased" | "heavy"
}

export type Workout = {
  name: string
  exercises: Exercise[]
}

export type Phase = {
  name: string
  weeks: number
  workouts: Workout[]
}

export const workoutProgram: Phase[] = [
  {
    name: "Foundation",
    weeks: 6,
    workouts: [
      {
        name: "Push Day",
        exercises: [
          { name: "Front and side raises", sets: 2, reps: 15, weight: "bodyweight" },
          { name: "Pec deck fly", sets: 3, reps: 12, weight: "moderate" },
          { name: "HS incline press", sets: 3, reps: 12, weight: "moderate" },
          { name: "DB shoulder press", sets: 3, reps: 12, weight: "moderate" },
          { name: "BB Bench Press", sets: 3, reps: 12, weight: "moderate" },
          { name: "Cable lateral raises", sets: 3, reps: 15, weight: "moderate" },
          { name: "Cable rope tricep extension", sets: 3, reps: 12, weight: "moderate" },
          { name: "Hanging knee raises", sets: 3, reps: 15, weight: "bodyweight" },
          { name: "Crunches", sets: 2, reps: 20, weight: "bodyweight" },
        ],
      },
      {
        name: "Pull Day",
        exercises: [
          { name: "Wide lat pull-down", sets: 3, reps: 12, weight: "moderate" },
          { name: "HS lateral row", sets: 3, reps: 12, weight: "moderate" },
          { name: "HS low row", sets: 3, reps: 12, weight: "moderate" },
          { name: "Seated face pull", sets: 3, reps: 15, weight: "moderate" },
          { name: "Incline DB Y raise", sets: 3, reps: 15, weight: "moderate" },
          { name: "Wall DB curls", sets: 3, reps: 12, weight: "moderate" },
          { name: "DB concentration curls", sets: 3, reps: 12, weight: "moderate" },
          { name: "Hyperextensions", sets: 3, reps: 15, weight: "bodyweight" },
          { name: "Crunches", sets: 2, reps: 20, weight: "bodyweight" },
        ],
      },
      {
        name: "Leg Day",
        exercises: [
          { name: "BW lunges", sets: 2, reps: 15, weight: "bodyweight" },
          { name: "BB back squats", sets: 3, reps: 12, weight: "moderate" },
          { name: "Hack squat", sets: 3, reps: 12, weight: "moderate" },
          { name: "Wide leg press", sets: 3, reps: 12, weight: "moderate" },
          { name: "Ham curls", sets: 3, reps: 12, weight: "moderate" },
          { name: "Quad extensions", sets: 3, reps: 12, weight: "moderate" },
          { name: "Standing calf raises", sets: 3, reps: 15, weight: "moderate" },
          { name: "Hanging knee raises", sets: 3, reps: 15, weight: "bodyweight" },
        ],
      },
    ],
  },
  // ... Add other phases (Strength, Hypertrophy, Advanced) here
]

