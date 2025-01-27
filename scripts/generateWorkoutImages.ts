import fs from "fs"
import path from "path"
import fetch from "node-fetch"

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

const workouts = [
  "Pec deck fly",
  "HS incline press",
  "DB shoulder press",
  "BB Bench Press",
  "Cable lateral raises",
  "Cable rope tricep extension",
  "Hanging knee raises",
  "Crunches",
  // Add all other exercises here
]

async function generateImage(prompt: string): Promise<string> {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "a9758cbfbd5f3c2094457d996681af52552901775aa2d6dd0b17fd15df959bef",
      input: { prompt: `High-quality image of ${prompt} exercise, fitness, workout` },
    }),
  })

  const prediction = await response.json()
  const resultUrl = prediction.urls.get

  // Poll for the result
  let result
  while (!result) {
    const pollResponse = await fetch(resultUrl, {
      headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
    })
    const pollResult = await pollResponse.json()
    if (pollResult.status === "succeeded") {
      result = pollResult.output
    } else if (pollResult.status === "failed") {
      throw new Error(`Image generation failed: ${pollResult.error}`)
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second before polling again
    }
  }

  return result[0] // Assuming the API returns an array with one image URL
}

async function downloadImage(url: string, filename: string): Promise<void> {
  const response = await fetch(url)
  const buffer = await response.buffer()
  fs.writeFileSync(filename, buffer)
}

async function generateAllImages() {
  const publicFolder = path.join(process.cwd(), "public", "workout-images")
  if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder, { recursive: true })
  }

  for (const workout of workouts) {
    try {
      console.log(`Generating image for: ${workout}`)
      const imageUrl = await generateImage(workout)
      const filename = path.join(publicFolder, `${workout.toLowerCase().replace(/ /g, "-")}.jpg`)
      await downloadImage(imageUrl, filename)
      console.log(`Image saved: ${filename}`)
    } catch (error) {
      console.error(`Error generating image for ${workout}:`, error)
    }
  }
}

generateAllImages().then(() => console.log("All images generated"))

