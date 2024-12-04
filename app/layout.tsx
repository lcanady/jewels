import './globals.css'
import { Press_Start_2P } from 'next/font/google'
import { Metadata } from 'next'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jewels Game',
  description: 'A fun jewel matching game',
  openGraph: {
    title: 'Jewels Game',
    description: 'A fun jewel matching game',
    images: [`${process.env.NEXT_PUBLIC_HOST}/api/og`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_HOST}/api/og`,
    'fc:frame:button:1': 'Play Game',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_HOST}/api/frame`,
    'fc:frame:aspect_ratio': '1.91:1'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        {children}
      </body>
    </html>
  )
}
