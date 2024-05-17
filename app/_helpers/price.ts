import { Product } from '@prisma/client'

export const calculeteProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.basePrice)
  }

  const discountValue =
    (Number(product.basePrice) * Number(product.discountPercentage)) / 100

  return Number(product.basePrice) - discountValue
}

export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}
