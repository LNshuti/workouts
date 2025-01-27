import fs from "fs"
import path from "path"
import { workoutProgram } from "../lib/workoutData"

const publicDir = path.join(process.cwd(), "public")
const exerciseImagesDir = path.join(publicDir, "exercise-images")

if (!fs.existsSync(exerciseImagesDir)) {
  fs.mkdirSync(exerciseImagesDir, { recursive: true })
}

const exercises = new Set(
  workoutProgram.flatMap((phase) =>
    phase.workouts.flatMap((workout) => workout.exercises.map((exercise) => exercise.name)),
  ),
)

exercises.forEach((exercise) => {
  const fileName = `${exercise.toLowerCase().replace(/ /g, "-")}.jpg`
  const filePath = path.join(exerciseImagesDir, fileName)

  if (!fs.existsSync(filePath)) {
    // Create a placeholder image (you can replace this with actual image generation)
    const placeholderContent = `Placeholder for ${exercise}`
    fs.writeFileSync(filePath, placeholderContent)
    console.log(`Created placeholder for: ${exercise}`)
  }
})

console.log("Exercise image placeholders generated successfully")

