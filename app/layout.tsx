import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Custom Caddie - Premium Golf Gift Customization',
  description: 'Create personalized golf accessory sets with custom engraving, embroidery, and branding options.',
  keywords: 'golf gifts, personalized golf accessories, custom golf balls, engraved divot tools, golf towels',
  openGraph: {
    title: 'Custom Caddie - Premium Golf Gift Customization',
    description: 'Create personalized golf accessory sets with custom engraving, embroidery, and branding options.',
    url: 'https://customcaddie.com',
    siteName: 'Custom Caddie',
    images: [
      {
        url: 'https://customcaddie.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}