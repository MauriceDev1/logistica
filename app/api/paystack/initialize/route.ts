import { NextRequest, NextResponse } from 'next/server';

// Define types for the request data
interface PaystackRequestData {
  amount: number;
  email: string;
  reference: string;
  callbackUrl?: string;
}

// Define types for Paystack API response
interface PaystackResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

// Route handler with TypeScript types
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Log to help with debugging
    console.log("Paystack initialize endpoint called");

    // Parse the request body
    let requestData: PaystackRequestData;
    try {
      requestData = await request.json();
      console.log("Request data:", requestData);
    } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { amount, email, reference, callbackUrl } = requestData;

    // Validate required fields
    if (!amount || !email || !reference) {
      console.error("Missing required fields:", { amount, email, reference });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the Paystack key from environment variables
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    // Check if the key exists
    if (!PAYSTACK_SECRET_KEY) {
      console.error("Paystack secret key is not configured");
      return NextResponse.json(
        { error: 'Paystack secret key is not configured' },
        { status: 500 }
      );
    }

    console.log("Making request to Paystack API");

    // Make the request to Paystack
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount * 100, // Paystack requires amount in kobo/cents
        email,
        reference,
        callback_url: callbackUrl,
        metadata: {
          custom_fields: [
            {
              display_name: "Blocks Purchased",
              variable_name: "blocks_purchased",
              value: amount / 1000
            }
          ]
        }
      })
    });

    // Parse the Paystack response
    const data = await response.json() as PaystackResponse;
    console.log("Paystack response:", data);

    if (!data.status) {
      console.error("Paystack API error:", data.message);
      return NextResponse.json(
        { error: data.message || 'Failed to initialize payment' },
        { status: 400 }
      );
    }

    // Return the successful response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Paystack initialization error:', error);
    return NextResponse.json(
      { error: 'An error occurred while initializing payment' },
      { status: 500 }
    );
  }
}
