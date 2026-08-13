"use client";

import CheckoutForm from "@/components/payment/CheckoutForm";
import StripeProvider from "@/components/payment/StripeProvider";
import { Button } from "@/components/ui/button";
import useCartData from "@/store/cartStore";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function CheckoutPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const localCart = useCartData((state) => state.cartData);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [cartReady, setCartReady] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const { totalPrice } = useMemo(() => {
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
    let cancelled = false;

    async function loadCheckoutData() {
      setCartReady(false);

      try {
        if (session?.user?.email) {
          const [cartResponse, userResponse] = await Promise.all([
            fetch(`/api/products/userCart?email=${session.user.email}`),
            fetch(`/api/user/info?email=${session.user.email}`),
          ]);
          const [serverCart, userData] = await Promise.all([
            cartResponse.json(),
            userResponse.json(),
          ]);

          if (!cancelled) {
            setCartItems(Array.isArray(serverCart) ? serverCart : []);
            setUser(userData || {});
          }
          return;
        }

        if (!localCart.length) {
          if (!cancelled) setCartItems([]);
          return;
        }

        const productIds = localCart.map((item) => item._id).filter(Boolean);
        const response = await fetch(
          `/api/products/cart?ids=${productIds.join(",")}`,
        );
        const products = await response.json();
        const productMap = new Map(
          products.map((product) => [String(product._id), product]),
        );
        const hydratedCart = localCart
          .map((savedItem) => {
            const product = productMap.get(String(savedItem._id));
            return product
              ? {
                  ...product,
                  productID: product._id,
                  sizes: savedItem.sizes,
                  colors: savedItem.colors,
                  quantity: Number(savedItem.quantity || 1),
                }
              : null;
          })
          .filter(Boolean);

        if (!cancelled) setCartItems(hydratedCart);
      } catch (error) {
        console.error("Failed to load checkout data", error);
        if (!cancelled) setCartItems([]);
      } finally {
        if (!cancelled) setCartReady(true);
      }
    }

    loadCheckoutData();

    return () => {
      cancelled = true;
    };
  }, [localCart, session]);

  useEffect(() => {
    if (
      !cartItems.length ||
      paymentMethod !== "stripe" ||
      !session?.user?.email
    ) {
      return;
    }

    async function createPaymentIntent() {
      try {
        setLoading(true);
        setPaymentError("");

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
          setPaymentError(data.message || "Unable to prepare secure payment.");
        }
      } catch (err) {
        console.error(err);
        setPaymentError("Unable to prepare secure payment. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    createPaymentIntent();
  }, [cartItems, paymentMethod, session]);

  if (!cartReady) {
    return (
      <div className="mx-auto mt-20 max-w-lg space-y-4 px-4 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
        <p className="text-sm text-gray-500">Loading your cart...</p>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <main className="min-h-screen bg-[#f6f6f4] px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
          <section className="relative isolate w-full overflow-hidden bg-zinc-950 px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-20">
            <div className="absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-red-600/70 blur-3xl" />
            <div className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full border-24 border-red-500/15" />

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 text-red-400 backdrop-blur-sm">
              <ShoppingBag className="h-10 w-10" />
            </div>

            <p className="mt-8 text-xs font-bold tracking-[0.28em] text-red-400 uppercase">
              Checkout is waiting
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Your cart is empty.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-zinc-300 sm:text-base">
              There is nothing to check out yet. Find something you love and
              we&apos;ll keep it ready for you here.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-500"
              >
                Explore the shop <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:text-white"
              >
                Back home
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto mb-30 max-w-6xl px-4 py-8 sm:py-10">
      <div className="mb-8">
       <div className="flex gap-3 items-center">

          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="bg-black rounded-full w-9 h-9   text-white hover:bg-gray-200 "
          >
            <IoIosArrowBack className="h-11 w-11" />

          </Button>


        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Checkout
        </h1></div>
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
        <div className="max-h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
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

          <div className="scrollbar-hide max-h-190 space-y-4 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="group flex gap-4 rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-md"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">
                  <Image
                    width={100}
                    height={100}
                    src={item.images}
                    alt={item.name}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-start justify-between gap-3">
                    <div className="max-w-50">
                      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {item.gender}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-base font-bold">
                        {item.discountPercentage ? (
                          <span className="mr-2 text-sm text-gray-400 line-through">
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
                          item.price -
                            (item.price * item.discountPercentage) / 100,
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
            <span className="text-2xl font-bold text-white tabular-nums">
              ${totalPrice + 100}
            </span>
          </div>
        </div>

        <div className="max-h-full">
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

          {paymentError && !loading && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold">Payment form unavailable</h2>
              <p className="mt-2">{paymentError}</p>
              <button
                type="button"
                onClick={() => setCartItems((items) => [...items])}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Try again
              </button>
            </div>
          )}

          <StripeProvider clientSecret={clientSecret || undefined}>
            <CheckoutForm
              key={user?._id || "guest-checkout"}
              clientSecret={clientSecret}
              cartItems={cartItems}
              user={user}
              isAuthenticated={Boolean(session?.user?.email)}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          </StripeProvider>
        </div>
      </div>
    </main>
  );
}
