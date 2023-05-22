import { NextResponse } from "next/server"
import { car } from "@prisma/client"
import prisma from "src/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  const data = await getServerSession(authOptions)
  const cars = await prisma.car.findMany({
    where: {
      owner: {
        email: data?.user?.email || undefined
      }
    }
  })
  return NextResponse.json(cars)
}

export async function POST(request: Request) {
  const { id, ...newCar } = (await request.json()) as Partial<car>
  const car = await prisma.car.create({ data: newCar as car })
  return NextResponse.json(car)
}

export async function DELETE(request: Request) {
  const { id } = (await request.json()) as Partial<car>
  const car = await prisma.car.delete({
    where: {
      id
    }
  })
  return NextResponse.json(car)
}
