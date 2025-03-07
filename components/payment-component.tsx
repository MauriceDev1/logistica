"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from '@/components/ui/checkbox'
import Link from "next/link";

const CustomPayPalForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const email = "user@example.com";
  const amount = 10.00; // Amount in USD
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const initiatePayPalOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus(null);

    try {
      // Step 1: Create PayPal Order
      const orderResponse = await axios.post("/api/paypal/create-order", {
        amount,
        currency: "USD"
      });

      // Store the order ID for subsequent capture
      setOrderId(orderResponse.data.orderId);

      // Prepare card details for validation/processing
      const cardDetails = {
        number: cardNumber,
        cvv,
        expiry_month: expiryMonth,
        expiry_year: expiryYear
      };

      // Optional: You might want to validate card details here client-side
      // or send them to your backend for additional processing

      setMessage("Order created. Proceeding with payment...");
      setStatus("success");
    } catch (error) {
      console.error("PayPal order creation failed:", error);
      setMessage("Failed to initiate payment ❌");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const capturePayPalPayment = async () => {
    if (!orderId) return;

    setLoading(true);
    try {
      // Step 2: Capture the PayPal Order
      const captureResponse = await axios.post("/api/paypal/capture-order", {
        orderId,
        cardDetails: {
          number: cardNumber,
          cvv,
          expiry_month: expiryMonth,
          expiry_year: expiryYear
        }
      });

      if (captureResponse.data.status === "COMPLETED") {
        setMessage("Payment Successful 🎉");
        setStatus("success");
      } else {
        setMessage("Payment Failed ❌");
        setStatus("error");
      }
    } catch (error) {
      console.error("PayPal payment capture failed:", error);
      setMessage("Payment Failed ❌");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={initiatePayPalOrder} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-2">
          <Label htmlFor="expiryMonth">Month</Label>
          <Input
            id="expiryMonth"
            type="text"
            placeholder="MM"
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiryYear">Year</Label>
          <Input
            id="expiryYear"
            type="text"
            placeholder="YY"
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
      </div>

      <div className='w-full items-center text-sm flex gap-2'>
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
        />
        <p>Click to accept <Link href="/terms-conditions"><span className="text-blue-500">terms and conditions</span></Link></p>
      </div>

      {!orderId ? (
        <Button
          type="submit"
          disabled={loading || !termsAccepted}
          className="w-full"
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={capturePayPalPayment}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Confirming Payment..." : "Confirm Payment"}
        </Button>
      )}

      {message && (
        <Alert variant={status === "success" ? "default" : "destructive"} className="mt-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default CustomPayPalForm;
