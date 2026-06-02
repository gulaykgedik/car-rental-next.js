import type { NextRequest } from 'next/server'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'
import Car from '@/models/Car'
import { badRequest, notFound, serverError } from '@/lib/api/errors'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return badRequest('Invalid car id')
  }

  try {
    await connectDB()
    const car = await Car.findById(id).lean()
    if (!car) return notFound('Car not found')
    return Response.json({ data: car })
  } catch (err) {
    console.error('[GET /api/cars/:id]', err)
    return serverError('Failed to fetch car')
  }
}