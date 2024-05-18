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
    console.log(deals)
    return deals
  } catch (error) {
    console.log(error)
  }
}
