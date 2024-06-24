'use client'
import { FC, createContext, useEffect, useState, ReactNode } from 'react'

interface CartContextType {
  cartProducts: string[]
  setCartProducts: React.Dispatch<React.SetStateAction<string[]>>
  addProducts: (productId: string) => void
  removeProduct: (productId: string) => void
  clearCart: () => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {},
  addProducts: () => {},
  removeProduct: () => {},
  clearCart: () => {},
})

const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCartProducts(JSON.parse(storedCart))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && cartProducts.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  const addProducts = (productId: string) => {
    setCartProducts(prev => [...prev, productId])
  }

  const removeProduct = (productId: string) => {
    setCartProducts(prev => prev.filter(id => id !== productId))
  }

  const clearCart = () => {
    setCartProducts([])
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProducts,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
