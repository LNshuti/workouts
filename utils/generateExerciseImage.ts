export async function generateExerciseImage(exerciseName: string): Promise<string> {
  // In a real application, this would call an AI image generation API
  // For this example, we'll return a placeholder URL
  const response = await fetch(`https://api.example.com/generate-image?prompt=${encodeURIComponent(exerciseName)}`)
  const data = await response.json()
  return data.imageUrl
}

