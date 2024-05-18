import { db } from '@/app/_lib/prisma'

export const getProductsByKeyboards = async () => {
  try {
    const keyboards = await db.product.findMany({
      where: {
        category: {
          slug: 'keyboards',
        },
      },
    })
    return keyboards
  } catch (error) {
    console.log(error)
  }
}

export const getProductsByMouses = async () => {
  try {
    const keyboards = await db.product.findMany({
      where: {
        category: {
          slug: 'mouses',
        },
      },
    })
    return keyboards
  } catch (error) {
    console.log(error)
  }
}
