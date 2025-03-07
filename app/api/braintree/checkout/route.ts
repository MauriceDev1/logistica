import { NextRequest, NextResponse } from "next/server";
import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID!,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY!,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY!,
});

export async function POST(req: NextRequest) {
    try {
      const { nonce, amount } = await req.json();

      const saleResult = await gateway.transaction.sale({
        amount,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      });

      if (saleResult.success) {
        return NextResponse.json({ success: true, transaction: saleResult.transaction });
      } else {
        return NextResponse.json({ success: false, error: saleResult.message }, { status: 400 });
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Payment failed", details: (error as Error).message },
        { status: 500 }
      );
    }
}
