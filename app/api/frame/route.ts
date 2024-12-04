import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const data = await req.json()
  
  // Validate the frame request
  const { isValid, message } = await validateFrameRequest(data)
  
  if (!isValid) {
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Return frame response
  return new Response(
    JSON.stringify({
      version: 'vNext',
      image: `${process.env.NEXT_PUBLIC_HOST}/api/og`,
      buttons: [
        {
          label: 'Play Again',
          action: 'post'
        }
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/api/frame`
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

async function validateFrameRequest(data: any) {
  try {
    const { untrustedData, trustedData } = data
    
    if (!untrustedData || !trustedData) {
      return { isValid: false, message: 'Missing frame data' }
    }

    // Add more validation as needed
    
    return { isValid: true, message: 'Valid frame request' }
  } catch (error) {
    return { isValid: false, message: 'Invalid frame request' }
  }
}
