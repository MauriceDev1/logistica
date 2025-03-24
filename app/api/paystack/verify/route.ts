// File: app/api/paystack/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';


// Define type for metadata custom fields
interface CustomField {
  display_name: string;
  variable_name: string;
  value: number | string;
}

// Define type for metadata
interface PaystackMetadata {
  custom_fields?: CustomField[];
  [key: string]: unknown;
}

// Define types for Paystack verification response
interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
    };
    metadata: PaystackMetadata;
  };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { error: 'No reference provided' },
        { status: 400 }
      );
    }

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Paystack secret key is not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json() as PaystackVerificationResponse;

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Here you would typically update your database to record the successful payment
    // For example, update order status, create a receipt, etc.

    // Redirect to a success page
    return NextResponse.redirect(new URL('/payment/success', request.url));
  } catch (error) {
    console.error('Paystack verification error:', error);
    return NextResponse.redirect(new URL('/payment/error', request.url));
  }
}
