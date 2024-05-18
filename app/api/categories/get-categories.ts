import { db } from '@/app/_lib/prisma'

export class GetCategoriesDeals {
  async execute() {
    return await db.category.findMany({
      where: {
        slug: 'deals',
      },
    })
  }
}
