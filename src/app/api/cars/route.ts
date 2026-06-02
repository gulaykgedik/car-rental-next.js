import type { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Car from '@/models/Car'
import {
  buildCarFilter,
  buildPagination,
  buildSort,
} from '@/utils/cars-query.utils'
import { serverError } from '@/lib/api/errors'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const sp = request.nextUrl.searchParams
    const filter = buildCarFilter(sp)
    const { page, limit, skip } = buildPagination(sp)
    const sort = buildSort(sp)

    const [data, total] = await Promise.all([
      Car.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Car.countDocuments(filter),
    ])

    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 0,
      },
    })
  } catch (err) {
    console.error('[GET /api/cars]', err)
    return serverError('Failed to fetch cars')
  }
}