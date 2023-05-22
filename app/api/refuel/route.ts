import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { car, refuel } from "@prisma/client"
import prisma from "src/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const { uid } = session?.user as any
  const { id, car, ...newRefuel } = (await request.json()) as Partial<refuel & { car: car }>
  const myCar = await prisma.car.findFirst({
    where: {
      id: newRefuel?.car_id,
      owner_id: uid
    }
  })
  if (!Boolean(myCar)) {
    throw new Error("Invalid Car")
  }
  const refuel = await prisma.refuel.create({ data: newRefuel as refuel })
  return NextResponse.json(refuel)
}
