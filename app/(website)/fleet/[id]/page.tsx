"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Fleet from "@/data/mock/Fleet.json"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ChartSpline, Minus, Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/app/context/AuthContext'

const Details = () => {
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const params = useParams();
  const { toast } = useToast();
  const TruckData = Fleet.find(i => i.id === Number(params.id));
  const { user } = useAuth();

  const fetchUserData = async () => {
    // Simulate an API call
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  useEffect(() => {
    setIsLoadingUser(true);
    fetchUserData().then(() => setIsLoadingUser(false));
  }, []);

  const increment = () => {
    setCount(prv => prv + 1);
  };

  const decrement = () => {
    if(count === 1) return;
    setCount(prv => prv - 1);
  };

  // Improved reference generator with more entropy to avoid duplicates
  const generateReference = () => {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const userPart = user && user.email ? user.email.substring(0, 3) : 'usr';

    return `tx_${timestamp}_${randomPart}_${userPart}`;
};

  const handlePayment = async () => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with payment",
        variant: "destructive"
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions before proceeding",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);

      // Generate a unique reference for this transaction
      const reference = generateReference();
      const amount = count * 1000 * 100; // Convert to kobo (smallest currency unit)

      // Skip the API call to your backend and directly use Paystack inline
      try {
        // Dynamically import Paystack
        const PaystackPop = await import('@paystack/inline-js').then(module => module.default || module);

        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
          email: user.email!,
          amount: amount,
          reference: reference,
          currency: 'ZAR', // Add currency explicitly
          onSuccess: (transaction) => {
            // Handle successful payment
            toast({
              title: "Payment Successful",
              description: `Transaction Reference: ${transaction.reference}`,
              variant: "default"
            });

            // Optionally record the successful transaction in your backend
            recordSuccessfulPayment(transaction.reference);
          },
          onCancel: () => {
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment",
              variant: "destructive"
            });
          }
        });
      } catch (error) {
        console.error("Paystack initialization error:", error);
        toast({
          title: "Payment Error",
          description: "Could not initialize payment gateway",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "An error occurred while processing your payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to record successful payment
  const recordSuccessfulPayment = async (reference: string) => {
    try {
      // Call your backend API to record the successful transaction
      const response = await fetch('/api/paystack/record-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference,
          amount: count * 1000,
          email: user?.email,
          productId: params.id
        }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error("Failed to record payment:", data.message);
      }
    } catch (error) {
      console.error("Error recording payment:", error);
    }
  };

  return (
    <div className='w-full'>
    <div className='pb-3'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fleet">Fleet</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{TruckData?.make}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
      <div className='w-full flex justify-between text-3xl pb-4'>
        <h1 className='text-gray-600'>
          {`${TruckData?.year} ${TruckData?.make} ${TruckData?.model}`}
        </h1>
        <h1 className='text-customBlue font-semibold'>
          ZAR {TruckData?.price}
        </h1>
      </div>
      <div className='w-full flex flex-wrap lg:flex-nowrap gap-5'>
        <div className='w-full lg:w-2/3'>
          <Image
            src={TruckData?.image ?? "/fallback-image.jpg"}
            alt={`${TruckData?.make ?? "Unknown"} ${TruckData?.model ?? "Truck"}`}
            width={1000}
            height={1000}
            className='w-full pb-5'
          />
        </div>
        <div className='w-full fixed bottom-0 left-0 lg:w-1/3 lg:sticky lg:top-20 '>
          <Card className="lg:w-[450px] p-5 rounded-sm">
            <div className='w-full flex justify-between text-xl'>
              <h1 className='flex gap-2'><ChartSpline className='text-green-600' /> Price per Block:</h1>
              <h1 className='text-green-600 font-semibold'>R 1000.00</h1>
            </div>
            <Separator className='my-3 bg-gray-300'/>
            <div className=''>
              <p>How many blocks would you like to purchase:</p>
            </div>
            <div className='w-full flex gap-3 py-3'>
                <Button onClick={decrement} className='bg-black'>
                  <Minus />
                </Button>
                <div className='w-28 border border-gray-300 rounded-sm text-xl flex h-9'>
                  <p className='m-auto'>{count}</p>
                </div>
                <Button onClick={increment} className='bg-black'>
                  <Plus />
                </Button>
            </div>
            <div className='flex justify-between text-xl'>
              <h2>Total:</h2>
              <h2 className='text-green-600 font-semibold'>R {count * 1000}.00</h2>
            </div>
            <div className='w-full flex mt-5 text-gray-700 items-center gap-2'>
            <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
              />
              <label htmlFor="terms">
                I accept the terms and conditions
              </label>
            </div>
            {isLoadingUser ? (
              <Button className='w-full bg-gray-500 mt-5 h-10' disabled>
                Loading...
              </Button>
            ) : user ? (
              <Button
                className='w-full bg-black mt-5 h-10'
                onClick={handlePayment}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : `Process Payment R${count * 1000}.00`}
              </Button>
            ) : (
              <Button
                className='w-full bg-blue-600 mt-5 h-10'
                onClick={() => window.location.href = '/login'}
              >
                Login to Purchase
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Details
