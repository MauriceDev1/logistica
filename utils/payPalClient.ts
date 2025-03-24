import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// This would typically come from environment variables
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'YOUR_PAYPAL_CLIENT_SECRET';

// Set environment to sandbox (for testing) or live (for production)
const environment = () => {
  if (process.env.NODE_ENV === 'production') {
    return new checkoutNodeJssdk.core.LiveEnvironment(
      PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET
    );
  }
  return new checkoutNodeJssdk.core.SandboxEnvironment(
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET
  );
};

// PayPal HTTP client instance
const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
};

// Create a named object before exporting
const paypalClient = { client };

// Export the named object
export default paypalClient;
