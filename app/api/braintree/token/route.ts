import { NextResponse } from "next/server";
import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use 'Production' in production
  merchantId: process.env.BRAINTREE_MERCHANT_ID!,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY!,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY!,
});

export async function GET() {
  try {
    const { clientToken } = await gateway.clientToken.generate({});
    return NextResponse.json({ clientToken });
  } catch (error) {
    console.error("Braintree Token Generation Error:", error); // Log the error to avoid eslint warning
    return NextResponse.json({ error: "Failed to generate client token" }, { status: 500 });
  }
}
