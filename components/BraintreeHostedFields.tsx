"use client";

import { useEffect, useState, useRef } from "react";
import braintree from "braintree-web";
import { HostedFieldsTokenizePayload } from "braintree-web";

interface BraintreeHostedFieldsProps {
  onPaymentSuccess: (nonce: string) => void;
}

const BraintreeHostedFields: React.FC<BraintreeHostedFieldsProps> = ({ onPaymentSuccess }) => {
  const [clientToken, setClientToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [braintreeInstance, setBraintreeInstance] = useState<any>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await fetch("/api/braintree/token");
        const data = await response.json();
        setClientToken(data.clientToken);
      } catch (error) {
        console.error("Error fetching Braintree client token:", error);
      }
    };

    fetchClientToken();
  }, []);

  useEffect(() => {
    if (clientToken) {
      braintree.client.create(
        {
          authorization: clientToken,
        },
        (clientErr, clientInstance) => {
          if (clientErr) {
            console.error("Error creating Braintree client:", clientErr);
            return;
          }

          braintree.hostedFields.create(
            {
              client: clientInstance,
              styles: {
                input: {
                  "font-size": "16px",
                  color: "#333",
                  "border-radius": "4px",
                },
              },
              fields: {
                number: {
                  selector: "#card-number",
                  placeholder: "4111 1111 1111 1111",
                },
                cvv: {
                  selector: "#cvv",
                  placeholder: "123",
                },
                expirationDate: {
                  selector: "#expiration-date",
                  placeholder: "MM/YY",
                },
              },
            },
            (hostedFieldsErr, hostedFieldsInstance) => {
              if (hostedFieldsErr) {
                console.error("Error creating Braintree Hosted Fields:", hostedFieldsErr);
                return;
              }

              setBraintreeInstance(hostedFieldsInstance);
            }
          );
        }
      );
    }
  }, [clientToken]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!braintreeInstance) return;

    braintreeInstance.tokenize(async (tokenizeErr: Error | null, payload?: HostedFieldsTokenizePayload) => {
      if (tokenizeErr) {
        console.error("Error tokenizing card details:", tokenizeErr);
        return;
      }

      if (payload) {
        onPaymentSuccess(payload.nonce);
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handlePayment} className="space-y-4 p-4 border rounded">
      <label>Card Number</label>
      <div id="card-number" className="p-2 border rounded h-10 bg-white"></div>

      <label>Expiration Date</label>
      <div id="expiration-date" className="p-2 border h-10 rounded bg-white"></div>

      <label>CVV</label>
      <div id="cvv" className="p-2 border rounded h-10 bg-white"></div>

      <button
        type="submit"
        disabled={!braintreeInstance}
        className="px-4 py-2 bg-blue-600 text-white rounded w-full"
      >
        Pay Now
      </button>
    </form>
  );
};

export default BraintreeHostedFields;
