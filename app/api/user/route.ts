import { NextResponse } from "next/server"
import { user } from "@prisma/client"
import prisma from "src/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(request: Request) {
  const newUser = (await request.json()) as user
  const user = await prisma.user.create({ data: newUser })
  return NextResponse.json(user)
}

export async function GET() {
  const data = await getServerSession(authOptions)
  const user = await prisma.user.findFirst({
    where: {
      email: data?.user?.email || undefined
    }
  })
  return NextResponse.json(user)
}
