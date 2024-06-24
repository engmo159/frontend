'use client'
import styled from 'styled-components'
import { spacing } from '../theme/spacing'
import { useEffect, useState } from 'react'
import Products from '../types/products'
import config from '../config.json'
import axios from 'axios'
import ProductBox from './ProductBox'

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.large}px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const ProductsGrid = () => {
  const [sortedProducts, setSortedProducts] = useState<Products | null>()
  const getSortedProducts = async () => {
    try {
      const backendURL = config.backendURL
      const { data } = await axios.get<Products | null>(
        `${backendURL}/products/sorted`
      )
      setSortedProducts(data)
    } catch (error: any) {
      console.error('Error fetching data:', error.message)
    }
  }
  useEffect(() => {
    getSortedProducts()
  }, [])
  return (
    <ProductGrid>
      {sortedProducts &&
        sortedProducts.map((product: Products) => (
          <div key={product._id}>
            <ProductBox {...product} />
          </div>
        ))}
    </ProductGrid>
  )
}

export default ProductsGrid
