import { db } from '@/app/_lib/prisma'

export const getProductsDeals = async () => {
  try {
    const deals = await db.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
    })

    return deals
  } catch (error) {
    console.log(error)
  }
}
