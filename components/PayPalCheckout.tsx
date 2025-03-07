import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CustomPayPalCheckout = () => {
  const [paid, setPaid] = useState(false);

  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: "10.00"
        }
      }]
    });
  };

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    setPaid(true);
    console.log('Transaction completed by ' + details.payer.name.given_name);
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="custom-paypal-container">
        {!paid ? (
          <div>
            <h2>Complete Your Purchase</h2>
            <p>Total: $10.00</p>

            {/* Custom button wrapper */}
            <div className="custom-paypal-button">
              <PayPalButtons
                style={{
                  layout: 'horizontal',
                  color:  'blue',
                  shape:  'pill',
                  label:  'paypal'
                }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </div>
          </div>
        ) : (
          <div className="success-message">
            Payment Successful! Thank you for your purchase.
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default CustomPayPalCheckout;
