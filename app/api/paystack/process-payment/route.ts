// File: /app/api/paystack/process-payment/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

// Validate card details before sending to Paystack
function validateCardDetails(card: {
  number: string,
  cvv: string,
  expiry_month: string,
  expiry_year: string
}) {
  // Basic card number validation (Luhn algorithm could be more robust)
  const cleanNumber = card.number.replace(/\s/g, '');
  if (!/^\d{12,19}$/.test(cleanNumber)) {
    throw new Error("Invalid card number");
  }

  // CVV validation
  if (!/^\d{3,4}$/.test(card.cvv)) {
    throw new Error("Invalid CVV");
  }

  // Expiry validation
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  const expiryYear = parseInt(card.expiry_year);
  const expiryMonth = parseInt(card.expiry_month);

  if (
    expiryYear < currentYear ||
    (expiryYear === currentYear && expiryMonth < currentMonth)
  ) {
    throw new Error("Card has expired");
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, amount, card } = body;

    // Validate required fields
    if (!email || !amount || !card) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate card details before processing
    try {
      validateCardDetails(card);
    } catch (validationError: any) {
      return NextResponse.json(
        {
          status: "error",
          message: validationError.message || "Invalid card details"
        },
        { status: 400 }
      );
    }

    try {
      // Initiate a charge request
      const chargeResponse = await axios.post(
        "https://api.paystack.co/charge",
        {
          email: email,
          amount: amount,
          card: {
            number: card.number.replace(/\s/g, ""),
            cvv: card.cvv,
            expiry_month: card.expiry_month,
            expiry_year: card.expiry_year
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      // Handle response
      if (chargeResponse.data.status) {
        // For PIN or OTP auth, you'd return information for the frontend to handle
        if (chargeResponse.data.data.status === "send_pin" ||
            chargeResponse.data.data.status === "send_otp") {
          return NextResponse.json({
            status: "pending",
            message: "Additional authentication required",
            data: {
              reference: chargeResponse.data.data.reference,
              status: chargeResponse.data.data.status
            }
          });
        }

        // For successful payments
        if (chargeResponse.data.data.status === "success") {
          return NextResponse.json({
            status: "success",
            message: "Payment successful",
            data: chargeResponse.data.data
          });
        }
      }

      // Default error response
      return NextResponse.json(
        {
          status: "error",
          message: chargeResponse.data.message || "Payment failed"
        },
        { status: 400 }
      );

    } catch (chargeError: any) {
      // Handle specific charge errors
      console.error("Charge error:", chargeError.response?.data);
      return NextResponse.json(
        {
          status: "error",
          message: chargeError.response?.data?.message || "Payment failed",
          details: chargeError.response?.data
        },
        { status: chargeError.response?.status || 400 }
      );
    }
  } catch (error: any) {
    console.error("Payment processing error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Payment processing failed",
        details: error.response?.data
      },
      { status: 500 }
    );
  }
}
