import { FC, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'

interface ProductImagesProps {
  images: string[] | any
}

const StyledImage = styled(Image)`
  max-width: 100%;
  max-height: 100%;
`

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`

const ImageButton = styled.div<{ active?: boolean }>`
  border: 2px solid transparent;
  ${props =>
    props.active &&
    css`
      border-color: red;
    `};

  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
`
const BigImageWrapper = styled.div`
  text-align: center;
`
const ProductImages: FC<ProductImagesProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState<string>(images?.[0])
  useEffect(() => {
    setActiveImage(images?.[0])
  }, [images])
  return (
    <>
      <BigImageWrapper>
        <StyledImage
          src={activeImage}
          width={300}
          height={300}
          alt=''
          priority={true}
        />
      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image: string, index: number) => (
          <ImageButton
            key={String(index)}
            active={image === activeImage}
            onClick={() => {
              setActiveImage(image)
            }}
          >
            <StyledImage src={image} width={50} height={50} alt='' />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  )
}

export default ProductImages
