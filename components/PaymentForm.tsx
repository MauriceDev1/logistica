'use client';

import React, { useState, useEffect } from 'react';
import DropIn from 'braintree-web-drop-in-react';

export default function PaymentForm() {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [amount, setAmount] = useState('10.00');

  useEffect(() => {
    // Fetch the client token from our API
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/braintree');
        const data = await response.json();

        if (data.clientToken) {
          setClientToken(data.clientToken);
        } else {
          console.error('Failed to get client token');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching client token:', error);
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  const handlePayment = async () => {
    if (!instance) {
      return;
    }

    setPaymentProcessing(true);
    setPaymentStatus(null);

    try {
      // Get payment method nonce
      const { nonce } = await instance.requestPaymentMethod();

      // Process payment on server
      const response = await fetch('/api/braintree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nonce, amount })
      });

      const result = await response.json();

      if (result.success) {
        setPaymentStatus({
          success: true,
          message: `Payment successful! Transaction ID: ${result.transaction.id}`
        });
      } else {
        setPaymentStatus({
          success: false,
          message: result.error || 'Payment failed'
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus({
        success: false,
        message: 'An error occurred during payment processing'
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading payment options...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Amount ($)
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {clientToken ? (
        <div className="mb-4">
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: 'vault'
              }
            }}
            onInstance={(instance) => setInstance(instance)}
          />

          <button
            onClick={handlePayment}
            disabled={paymentProcessing || !instance}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {paymentProcessing ? 'Processing...' : `Pay $${amount}`}
          </button>
        </div>
      ) : (
        <div className="text-red-500">
          Could not load payment system. Please try again later.
        </div>
      )}

      {paymentStatus && (
        <div className={`mt-4 p-3 rounded ${paymentStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {paymentStatus.message}
        </div>
      )}
    </div>
  );
}
