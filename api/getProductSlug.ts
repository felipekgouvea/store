import { db } from '@/app/_lib/prisma'

export const getProductsSlug = async (slug: string) => {
  try {
    const products = await db.product.findFirst({
      where: {
        slug,
      },
      include: {
        category: {
          include: {
            products: {
              where: {
                slug: {
                  not: slug,
                },
              },
            },
          },
        },
      },
    })

    return products
  } catch (error) {
    console.log(error)
  }
}
