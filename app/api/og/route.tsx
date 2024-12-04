import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            fontSize: 60,
            fontWeight: 600,
          }}
        >
          <div style={{ marginBottom: 40 }}>🎮 Jewels Game</div>
          <div
            style={{
              fontSize: 30,
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            Match jewels to score points!
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`${e.message}`)
    } else {
      console.log('An unknown error occurred')
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
