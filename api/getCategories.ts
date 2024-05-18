import { db } from '@/app/_lib/prisma'

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany({})

    return categories
  } catch (error) {
    console.log(error)
  }
}
