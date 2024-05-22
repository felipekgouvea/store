'use server'

import { CartProduct } from '@/app/_context/cart'
import { db } from '@/app/_lib/prisma'

export const createOrder = async (
  cartProducts: CartProduct[],
  userId: string,
) => {
  const order = await db.order.create({
    data: {
      userId,
      status: 'WAITING_FOR_PAYMENT',
      orderProducts: {
        createMany: {
          data: cartProducts.map((product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  })

  return order
}
