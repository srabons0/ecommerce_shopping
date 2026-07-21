"use client";

import { useEffect, useMemo, useState } from "react";
import CheckoutForm from "@/components/payment/CheckoutForm";
import StripeProvider from "@/components/payment/StripeProvider";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState([]);
  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const res = await fetch(
          `/api/products/userCart?email=${session.user.email}`,
        );
        const data = await res.json();
        setCartItems(data);
        console.log(data);
      };
      const fetchUserData = async () => {
        const res = await fetch(`/api/user/info?email=${session.user.email}`);
        const data = await res.json();
        setUser(data);
        console.log(data);
      };

      fetchData();
      fetchUserData();
      return;
    }
  }, [session]);

  useEffect(() => {
    if (!cartItems.length) return;

    async function createPaymentIntent() {
      try {
        setLoading(true);

        const res = await fetch("/api/payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
          }),
        });
        if (!res.ok) {
          const errorText = await res.text();
          console.error(errorText);
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setClientSecret(data.clientSecret);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    createPaymentIntent();
  }, [cartItems]);

  if (!cartItems.length) {
    return (
      <div className="mx-auto mt-20 max-w-lg text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  return (
  <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">


          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {totalItems} {totalItems > 1 ? "items" : "item"} in your cart
              </p>
            </div>

            <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
              {totalItems} Items
            </div>
          </div>



          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 rounded-2xl border border-gray-200 p-4 transition-all duration-300 hover:shadow-md"
              >


                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={item.images}
                    alt={item.name} width={300} height={300}
                    className="h-full w-full object-cover"
                  />
                </div>



                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.category}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">৳{item.price}</p>

                      <p className="text-sm text-gray-500">x {item.quantity}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.sizes && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        Size: {item.sizes}
                      </span>
                    )}

                    {item.colors && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        Color: {item.colors}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-3">
                    <span className="text-sm text-gray-500">Quantity</span>

                    <span className="font-semibold">{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>



          <div className="mt-8 space-y-4 border-t pt-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                )}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>

              <span>$100</span>
            </div>


            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>

                <span className="text-2xl font-bold">
                  ৳
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  )+100}
                </span>
              </div>
            </div>
          </div>


        </div>
        <div>
          {loading && !clientSecret && <p>Loading payment...</p>}

          {clientSecret && (
            <StripeProvider clientSecret={clientSecret}>
              <CheckoutForm
                clientSecret={clientSecret}
                cartItems={cartItems}
                user={user}
              />
            </StripeProvider>
          )}
        </div>
      </div>
    </main>
  );
}
