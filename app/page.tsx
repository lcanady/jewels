import { Inter } from 'next/font/google'
import Game from '../components/Game';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="min-h-screen">
          <Game />
        </main>
      </body>
    </html>
  );
}

