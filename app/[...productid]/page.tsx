'use client'
import React, { FC, useContext, useEffect, useState, useCallback } from 'react'
import Center from '../components/Center'
import Title from '../components/Title'
import Products from '../types/products'
import axios from 'axios'
import config from '../config.json'
import styled from 'styled-components'
import WhiteBox from '../components/WhiteBox'
import { spacing } from '../theme/spacing'
import ProductImages from '../components/ProductImages'
import Button from '../components/Button'
import Cart from '@/public/images/Cart'
import { CartContext } from '../context/CartContextProvider'

interface ProductPageProps {
  params: {
    productid: string[]
  }
}

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.huge}px;
  margin: ${spacing.huge}px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`

const PriceRaw = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const Price = styled.span`
  font-size: 1.4rem;
`

const ProductPage: FC<ProductPageProps> = ({ params: { productid } }) => {
  const { addProducts } = useContext(CartContext)
  const [product, setProduct] = useState<Products | null>()
  const id = productid[1]

  const getProduct = useCallback(async () => {
    try {
      const backendURL = config.backendURL
      const { data } = await axios.get<Products | null>(
        `${backendURL}/products/${id}`
      )
      setProduct(data)
    } catch (error: any) {
      console.error('Error fetching product:', error.message)
    }
  }, [id])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  if (!product) {
    return <Center>Loading...</Center>
  }

  return (
    <Center>
      <ColWrapper>
        <WhiteBox>
          <ProductImages images={product.imageUrl} />
        </WhiteBox>
        <WhiteBox>
          <Title>{product.title}</Title>
          <PriceRaw>
            <Price>${product.price}</Price>
            <Button black onClick={() => addProducts(product._id)}>
              <Cart /> Add to cart
            </Button>
          </PriceRaw>
          <p>{product.description}</p>
        </WhiteBox>
      </ColWrapper>
    </Center>
  )
}

export default ProductPage
