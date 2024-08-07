import './global.css'

import { Metadata } from 'next'
import React from 'react'

import { Providers } from '@/app/providers'

export const metadata: Metadata = {
  title: 'Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
