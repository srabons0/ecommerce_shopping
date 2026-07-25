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

const {totalPrice} = useMemo(() => {
   const totalPrice = cartItems.reduce(
      (acc, item) =>
        acc +
        Math.ceil(
          (item.price - (item.price * item.discountPercentage) / 100) *
            item.quantity,
        ),
      0,
    );
    return {
      totalPrice,
    };
}, [cartItems]);


  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const res = await fetch(
          `/api/products/userCart?email=${session.user.email}`,
        );
        const data = await res.json();
        setCartItems(data);

      };
      const fetchUserData = async () => {
        const res = await fetch(`/api/user/info?email=${session.user.email}`);
        const data = await res.json();
        setUser(data);

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
    <main className="mx-auto max-w-6xl mb-30 px-4 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Review your order and complete your purchase.
        </p>
      </div>

      <div
        className="mb-8 flex items-center justify-center gap-2 sm:mb-10 sm:gap-3"
        aria-label="Checkout progress"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white sm:h-8 sm:w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </span>
          <span className="hidden text-sm font-medium text-gray-500 sm:inline">
            Cart
          </span>
        </div>

        <div className="h-px w-6 bg-gray-300 sm:w-12" />

        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white ring-4 ring-gray-900/10 sm:h-8 sm:w-8 sm:text-sm">
            2
          </span>
          <span className="text-sm font-semibold text-gray-900">Checkout</span>
        </div>

        <div className="h-px w-6 bg-gray-200 sm:w-12" />

        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-400 sm:h-8 sm:w-8 sm:text-sm">
            3
          </span>
          <span className="hidden text-sm font-medium text-gray-400 sm:inline">
            Confirmation
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div className="rounded-3xl border max-h-full border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Order Summary
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {totalItems} {totalItems > 1 ? "items" : "item"} in your cart
              </p>
            </div>

            <span className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white sm:text-sm">
              {totalItems} {totalItems > 1 ? "Items" : "Item"}
            </span>
          </div>

          <div className="space-y-4  max-h-190 scrollbar-hide overflow-y-auto ">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="group flex gap-4 rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-md"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">
                  <Image
                    width={100}
                    height={100}
                    src={item.images}
                    alt={item.name}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex  items-start justify-between gap-3">
                    <div className="max-w-50">
                      <h3 className=" text-base font-semibold text-gray-900 sm:text-lg">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {item.gender}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <p className="text-base font-bold">
                        {item.discountPercentage ? (
                          <span className="text-sm text-gray-400 mr-2 line-through">
                            ${item.price}
                          </span>
                        ) : (
                          ""
                        )}
                        $
                        {Math.ceil(
                          item.price -
                            (item.price * item.discountPercentage) / 100,
                        )}
                      </p>

                      <p className="text-xs text-gray-400">
                        Qty {item.quantity} · $
                        {Math.ceil(
                          item.price - (item.price * item.discountPercentage) / 100,
                        ) * item.quantity}
                      </p>
                    </div>
                  </div>

                  {(item.sizes || item.colors) && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.sizes && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          Size: {item.sizes}
                        </span>
                      )}
                      {item.colors && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          Color: {item.colors}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 border-t border-gray-100 pt-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="tabular-nums">${totalPrice}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-green-600">$100</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-gray-900 px-5 py-3">
            <span className="text-base font-semibold text-white">Total</span>
            <span className="text-2xl font-bold tabular-nums text-white">
              ${totalPrice + 100}
            </span>
          </div>
        </div>

        <div className="max-h-full ">
          {loading && !clientSecret && (
            <div
              className="animate-pulse space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              aria-busy="true"
              aria-label="Loading payment form"
            >
              <div className="h-5 w-32 rounded-md bg-gray-200" />
              <div className="h-11 rounded-xl bg-gray-100" />
              <div className="h-11 rounded-xl bg-gray-100" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-11 rounded-xl bg-gray-100" />
                <div className="h-11 rounded-xl bg-gray-100" />
              </div>
              <div className="h-12 rounded-xl bg-gray-900/10" />
            </div>
          )}

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
