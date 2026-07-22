"use client";

import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { MdShoppingCartCheckout } from "react-icons/md";
const stripeElementStyle = {
  style: {
    base: {
      color: "#111827",
      fontSize: "16px",
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

      "::placeholder": {
        color: "#9CA3AF",
      },

      iconColor: "#6B7280",
    },

    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
};
export default function CheckoutForm({ clientSecret, cartItems, user }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipping, setShipping] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.number || "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setShipping((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function validateForm() {
    if (!shipping.fullName.trim()) return "Full name is required.";

    if (!shipping.email.trim()) return "Email is required.";

    if (!shipping.phone.trim()) return "Phone number is required.";

    if (!shipping.address.trim()) return "Address is required.";

    if (!shipping.city.trim()) return "City is required.";

    if (!shipping.postalCode.trim()) return "Postal Code is required.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setError("Card element not found.");
      return;
    }

    try {
      setLoading(true);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: shipping.fullName,
              email: shipping.email,
              phone: shipping.phone,
              address: {
                city: shipping.city,
                postal_code: shipping.postalCode,
                line1: shipping.address,
              },
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      if (paymentIntent.status !== "succeeded") {
        setError("Payment failed.");
        return;
      }
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          userId: user._id,
          items: cartItems,
          shipping,
          paymentMethod: "stripe",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to create order.");
        return;
      }

      router.push(`/payment-success?id=${data.order._id}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex gap-2 items-center">
            Checkout <MdShoppingCartCheckout />
          </h2>

          <p className="mt-2 text-gray-500">
            Complete your order securely with Stripe.
          </p>
        </div>
      </div>
      <div>
        <h3 className="mb-6 text-xl font-semibold">Shipping Address</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 text-sm font-medium flex items-center gap-1 ">
              Full Name
              {(!user?.name || !shipping.fullName.length) && (
                <span className="text-red-600 text-xl">*</span>
              )}
            </label>
            <input
              name="fullName"
              value={shipping.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              placeholder="Name..."
            />
          </div>
          <div>
            <label className="mb-2 text-sm font-medium flex items-center gap-1 ">
              Email{" "}
              {!user?.email && <span className="text-red-600 text-xl">*</span>}
            </label>
            <input
              type="email"
              disabled={user?.email ? true : false}
              name="email"
              value={shipping.email}
              onChange={handleChange}
              className={`w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black ${user?.email ? "bg-[#0000000d] cursor-not-allowed text-sm" : ""}`}
              placeholder="....@email.com"
            />
          </div>
          <div>
            <label className="mb-2 text-sm font-medium flex items-center gap-1 ">
              Phone Number
              {(!user?.number || !shipping.phone.length) && (
                <span className="text-red-600 text-xl">*</span>
              )}
            </label>

            <input
              name="phone"
              value={shipping.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              placeholder="+8801XXXXXXXXX"
            />
          </div>
          <div>
            <label className="mb-2 text-sm font-medium flex items-center gap-1 ">
              City<span className="text-red-600 text-xl">*</span>
            </label>
            <input
              name="city"
              value={shipping.city}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              placeholder="Dhaka..."
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="mb-2 text-sm font-medium flex items-center gap-1 ">
            Street Address<span className="text-red-600 text-xl">*</span>
          </label>
          <textarea
            rows={2}
            name="address"
            value={shipping.address}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-black"
            placeholder="House, Road, Area..."
          />
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 text-sm font-medium flex items-center gap-1 ">
              Postal Code<span className="text-red-600 text-xl">*</span>
            </label>
            <input
              name="postalCode"
              value={shipping.postalCode}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              placeholder="1230..."
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Payment Details
            </h3>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card Number
          </label>

          <div className="rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 transition-all duration-300 focus-within:border-black focus-within:bg-white focus-within:ring-4 focus-within:ring-black/5">
            <CardNumberElement options={stripeElementStyle} />
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Expiry Date
            </label>

            <div className="rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 transition-all duration-300 focus-within:border-black focus-within:bg-white focus-within:ring-4 focus-within:ring-black/5">
              <CardExpiryElement options={stripeElementStyle} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Security Code
            </label>

            <div className="rounded-2xl border border-gray-300 bg-gray-50 px-5 py-4 transition-all duration-300 focus-within:border-black focus-within:bg-white focus-within:ring-4 focus-within:ring-black/5">
              <CardCvcElement options={stripeElementStyle} />
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-black text-lg font-semibold text-white transition-all duration-300 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processing Payment...
          </div>
        ) : (
          "Complete Order"
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        By placing your order, you agree to our Terms & Conditions and Privacy
        Policy.
      </p>
    </form>
  );
}
