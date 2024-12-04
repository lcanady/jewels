import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface FrameRequestData {
  untrustedData?: {
    buttonIndex?: number;
    inputText?: string;
    castId?: {
      fid?: number;
      hash?: string;
    };
    timestamp?: number;
    network?: number;
    transactionId?: string;
    address?: string;
  };
  trustedData?: {
    messageBytes?: string;
    timestamp?: number;
    network?: number;
  };
}

export async function POST(req: NextRequest) {
  const data: FrameRequestData = await req.json()
  
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

async function validateFrameRequest(data: FrameRequestData) {
  try {
    const { untrustedData, trustedData } = data
    
    if (!untrustedData || !trustedData) {
      return { isValid: false, message: 'Missing frame data' }
    }

    // Add more validation as needed
    
    return { isValid: true, message: 'Valid frame request' }
  } catch  {
    return { isValid: false, message: 'Validation error' }
  }
}
