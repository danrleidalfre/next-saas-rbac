import './global.css'

import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
