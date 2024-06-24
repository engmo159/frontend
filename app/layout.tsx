import type { Metadata } from 'next'
import ECommerceLayout from './layout/ECommerceLayout'
import { Poppins } from 'next/font/google'
import CartContextProvider from './context/CartContextProvider'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'E Commerce App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <CartContextProvider>
          <ECommerceLayout />
          {children}
        </CartContextProvider>
      </body>
    </html>
  )
}