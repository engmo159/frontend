'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'
import Center from './Center'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContextProvider'
import Products from '../types/products'
import Bars from '@/public/images/Bars'

interface StyledNavProps {
  mobileNavActive?: boolean
}

const StyledHeader = styled.header`
  background-color: ${colors.background};
`
const Logo = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
  position: relative;
  z-index: 3;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`
const NavLink = styled(Link)`
  display: block;
  color: ${colors.textDim};
  text-decoration: none;
  padding: 10px 0;
  @media screen and(min-width: 768px) {
    padding: 0;
  }
`
const StyledNav = styled.nav<StyledNavProps>`
  display: none;
  ${props =>
    props.mobileNavActive &&
    css`
      display: block;
      z-index: 3;
    `}

  gap: ${spacing.medium}px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 70px 20px 20px;
  background-color: ${colors.background};

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`
const Header = () => {
  const { cartProducts }: { cartProducts?: Products[] | any } =
    useContext(CartContext)
  const [mobileNavActive, setMobileNavActive] = useState<boolean>(false)
  return (
    <>
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={'/'}>Ecommerce</Logo>
            <StyledNav
              mobileNavActive={mobileNavActive}
              onClick={() => {
                setMobileNavActive(false)
              }}
            >
              <NavLink href={'/'}>Home</NavLink>
              <NavLink href={'/products'}>All Products</NavLink>
              {/* <NavLink href={'/categories'}>Categories</NavLink>
              <NavLink href={'/account'}>Account</NavLink> */}
              <NavLink href={'/cart'}>Cart ({cartProducts?.length})</NavLink>
            </StyledNav>
            <NavButton
              onClick={() => {
                setMobileNavActive(prev => !prev)
              }}
            >
              <Bars />
            </NavButton>
          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  )
}

export default Header
