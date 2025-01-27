import { Replicate } from "replicate"
import { writeFile } from "fs/promises"
import { mkdir } from "fs/promises"
import path from "path"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const workouts = [
  {
    name: "Pec deck fly",
    description:
      "Person performing pec deck fly exercise on a machine, focusing on chest muscles, professional gym setting, clear form demonstration",
  },
  {
    name: "HS incline press",
    description:
      "Person using Hammer Strength incline press machine, proper form, professional gym setting, clear demonstration of pushing motion",
  },
  {
    name: "DB shoulder press",
    description:
      "Person performing dumbbell shoulder press, proper form, professional gym setting, clear demonstration of lifting motion",
  },
  {
    name: "BB Bench Press",
    description:
      "Person performing barbell bench press, proper form, professional gym setting, clear demonstration of lifting motion",
  },
  {
    name: "Cable lateral raises",
    description:
      "Person performing cable lateral raises, proper form, professional gym setting, clear demonstration of lifting motion",
  },
  {
    name: "Cable rope tricep extension",
    description:
      "Person performing cable rope tricep extension, proper form, professional gym setting, clear demonstration of extension motion",
  },
  {
    name: "Hanging knee raises",
    description:
      "Person performing hanging knee raises, proper form, professional gym setting, clear demonstration of lifting motion",
  },
  {
    name: "Crunches",
    description:
      "Person performing crunches, proper form, professional gym setting, clear demonstration of abdominal contraction",
  },
]

async function generateGif(name: string, description: string): Promise<void> {
  try {
    console.log(`Generating GIF for: ${name}`)
    const output = await replicate.run(
      "tencent/hunyuan-video:6c9132aee14409cd6568d030453f1ba50f5f3412b844fe67f78a9eb62d55664f",
      {
        input: {
          prompt: `High quality fitness demonstration of ${description}. Professional lighting, clear view of exercise form, smooth motion.`,
          num_frames: 32,
          fps: 8,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      },
    )

    if (typeof output === "string" || Array.isArray(output)) {
      const gifPath = path.join(process.cwd(), "public", "workout-gifs")
      await mkdir(gifPath, { recursive: true })
      const filePath = path.join(gifPath, `${name.toLowerCase().replace(/ /g, "-")}.gif`)
      const data = typeof output === "string" ? output : output[0]
      await writeFile(filePath, Buffer.from(data, "base64"))
      console.log(`GIF saved: ${filePath}`)
    } else {
      console.error(`Unexpected output format for ${name}`)
    }
  } catch (error) {
    console.error(`Error generating GIF for ${name}:`, error)
  }
}

async function generateAllGifs() {
  for (const workout of workouts) {
    await generateGif(workout.name, workout.description)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
}

generateAllGifs()
  .then(() => console.log("All GIFs generated"))
  .catch(console.error)

