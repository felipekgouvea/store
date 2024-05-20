'use client'

import { Product } from '@prisma/client'
import { ReactNode, createContext, useState } from 'react'

export interface CartProduct extends Product {
  quantity: number
  emptyCart?: boolean
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductToCart: (productId: string) => void
  clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductToCart: () => {},
  clearCart: () => {},
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

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

  const clearCart = () => {
    setProducts([])
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

  return (
    <CartContext.Provider
      value={{
        products,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        cartTotalPrice: 0,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
