'use client'

import { Product } from '@prisma/client'
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'

export interface CartProduct extends Product {
  quantity: number
  emptyCart?: boolean
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  total: number
  subtotal: number
  totalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductToCart: (productId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductToCart: () => {},
  clearCart: () => {},
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(
  JSON.parse(localStorage.getItem('@store/cart-products') || '[]'),
)
  useEffect(() => {
    localStorage.setItem('@store/cart-products', JSON.stringify(products))
  }, [products])

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return (
        acc +
        (Number(product.basePrice) -
          (Number(product.basePrice) * Number(product.discountPercentage)) /
            100) *
          product.quantity
      )
    }, 0)
  }, [products])

  const totalDiscount = subtotal - total

  const addProductToCart = (product: CartProduct) => {
    if (product.emptyCart) {
      setProducts([])
    }

    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    )

    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            }
          }
          return cartProduct
        }),
      )
    }

    setProducts((prev) => [...prev, product])
  }

  const removeProductToCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    )
  }

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            }
          }
          return cartProduct
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    )
  }

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          }
        }
        return cartProduct
      }),
    )
  }

  const clearCart = () => {
    setProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductToCart,
        total,
        subtotal,
        totalDiscount,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
