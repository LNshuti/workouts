import { NextResponse } from "next/server"
import { db } from "@/db/index"
import { users } from "@/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newUser = await db.insert(users).values(body).returning()
    return NextResponse.json(newUser[0])
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allUsers = await db.select().from(users)
    return NextResponse.json(allUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

