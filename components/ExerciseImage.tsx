"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface ExerciseImageProps {
  name: string
  gifPath: string
}

export function ExerciseImage({ name, gifPath }: ExerciseImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
      {isLoading && <Skeleton className="h-full w-full" />}
      <Image
        src={error ? "/placeholder.svg" : gifPath}
        alt={`${name} exercise demonstration`}
        fill
        className="object-cover"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

