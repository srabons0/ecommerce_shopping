"use client";

import DashboardNavbar from "@/features/user/DashboardNavbar/DashboardNavbar";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Mail,
  MessageCircle,
  Package,
  Search,
  Send,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const topics = [
  { label: "Orders & delivery", icon: Package, count: "08 articles" },
  { label: "Returns & refunds", icon: Truck, count: "06 articles" },
  { label: "Payments", icon: FileText, count: "05 articles" },
  { label: "Account & wishlist", icon: ShoppingBag, count: "04 articles" },
];

const faqs = [
  {
    category: "Orders & delivery",
    question: "Where is my order?",
    answer:
      "Open Orders from your dashboard to see the latest status and tracking link. Tracking usually becomes active within 24 hours of dispatch.",
  },
  {
    category: "Returns & refunds",
    question: "How do I start a return?",
    answer:
      "Choose the order from your Orders page and select Start a return. Items should be unworn, with original tags attached, within 30 days of delivery.",
  },
  {
    category: "Payments",
    question: "Which payment methods do you accept?",
    answer:
      "We accept major debit and credit cards, along with secure checkout through Stripe. Your payment details are never stored by Everyday Wear.",
  },
  {
    category: "Account & wishlist",
    question: "How can I update my account details?",
    answer:
      "Visit Profile in your dashboard to update your name, contact details, and delivery information. Changes are saved as soon as you submit the form.",
  },
  {
    category: "Orders & delivery",
    question: "Can I change my delivery address?",
    answer:
      "If your order has not shipped, contact us as soon as possible with your order number. We will do our best to update the address before dispatch.",
  },
];

export default function SupportPage() {
  const [activeTopic, setActiveTopic] = useState("All topics");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesTopic =
        activeTopic === "All topics" || faq.category === activeTopic;
      const matchesSearch =
        !query || `${faq.question} ${faq.answer}`.toLowerCase().includes(query);
      return matchesTopic && matchesSearch;
    });
  }, [activeTopic, search]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-zinc-950">
      <DashboardNavbar
        path="Support"
        name="Support center"
        desc="Find answers, track a request, or talk to our team"
      />
      <main className="px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-8 text-white shadow-2xl sm:px-10 sm:py-11 lg:px-14">
          <div className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-red-600/80 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 -z-10 h-36 w-36 rounded-full border-24 border-red-500/20" />
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500" /> We&apos;re
              here to help
            </p>
            <h2 className="max-w-xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              What can we help you solve today?
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-300 sm:text-base">
              Search our quick answers or send the support team a note. We
              usually reply within one business day.
            </p>
           
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {topics.map(({ label, icon: Icon, count }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveTopic(label)}
              className={`group flex items-center gap-4 border bg-white p-5 text-left transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg ${activeTopic === label ? "border-red-500 shadow-md" : "border-zinc-200"}`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center ${activeTopic === label ? "bg-red-600 text-white" : "bg-red-50 text-red-600"}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <strong className="block text-sm font-bold">{label}</strong>
                <span className="mt-1 block text-xs text-zinc-500">
                  {count}
                </span>
              </span>
              <ArrowUpRight className="ml-auto h-4 w-4 text-zinc-300 transition group-hover:text-red-600" />
            </button>
          ))}
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <section>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                  Quick answers
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">
                  Frequently asked questions
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTopic("All topics");
                  setSearch("");
                }}
                className="text-sm font-semibold text-zinc-500 underline decoration-red-500 underline-offset-4 hover:text-red-600"
              >
                View all
              </button>
            </div>
            <div className="border-y border-zinc-200 bg-white">
              {filteredFaqs.length ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.question}
                      className="border-b border-zinc-200 last:border-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                      >
                        <span>
                          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
                            {faq.category}
                          </span>
                          <span className="text-sm font-bold sm:text-base">
                            {faq.question}
                          </span>
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-red-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="max-w-2xl px-5 pb-5 text-sm leading-6 text-zinc-600 sm:px-6">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="px-6 py-10 text-center text-sm text-zinc-500">
                  No articles match that search yet. Try another phrase or send
                  us a message.
                </p>
              )}
            </div>
          </section>
          <aside className="space-y-4">
            <div className="bg-red-600 p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <MessageCircle className="h-7 w-7" />
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  Typical reply: 1 day
                </span>
              </div>
              <h2 className="mt-8 text-2xl font-black tracking-tight">
                Still need a hand?
              </h2>
              <p className="mt-2 text-sm leading-6 text-red-100">
                Tell us what happened and a real person will pick it up.
              </p>
              <a
                href="#contact-form"
                className="mt-6 inline-flex items-center gap-2 bg-white px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-zinc-100"
              >
                Contact support <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="mailto:hello@everydaywear.com"
                className="border border-zinc-200 bg-white p-5 transition hover:border-red-400"
              >
                <Mail className="h-5 w-5 text-red-600" />
                <strong className="mt-5 block text-sm">Email us</strong>
                <span className="mt-1 block text-xs text-zinc-500">
                  hello@everydaywear.com
                </span>
              </a>
              <div className="border border-zinc-200 bg-white p-5">
                <Clock3 className="h-5 w-5 text-red-600" />
                <strong className="mt-5 block text-sm">Hours</strong>
                <span className="mt-1 block text-xs leading-5 text-zinc-500">
                  Mon–Fri
                  <br />
                  9am–6pm
                </span>
              </div>
            </div>
          </aside>
        </div>

        <section
          id="contact-form"
          className="mt-10 border border-zinc-200 bg-white p-6 sm:p-8"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                Open a ticket
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">
                Tell us what&apos;s going on
              </h2>
            </div>
            <p className="text-sm text-zinc-500">
              Fields marked * are required.
            </p>
          </div>
          {submitted ? (
            <div className="flex items-center gap-4 py-10 text-sm">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <strong className="block text-base">
                  Your message is ready to send.
                </strong>
                <span className="text-zinc-500">
                  Our team will get back to you within one business day.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="ml-auto text-sm font-bold text-red-600 underline underline-offset-4"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 pt-6 sm:grid-cols-2"
            >
              <label className="text-sm font-bold">
                Order number <span className="text-red-600">*</span>
                <input
                  required
                  name="order"
                  placeholder="e.g. EW-10482"
                  className="mt-2 block h-12 w-full border border-zinc-200 px-4 font-normal outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              <label className="text-sm font-bold">
                Topic <span className="text-red-600">*</span>
                <select
                  required
                  name="topic"
                  className="mt-2 block h-12 w-full border border-zinc-200 bg-white px-4 font-normal outline-none focus:border-red-500"
                >
                  <option value="">Choose a topic</option>
                  <option>Order & delivery</option>
                  <option>Returns & refunds</option>
                  <option>Payment</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="text-sm font-bold sm:col-span-2">
                How can we help? <span className="text-red-600">*</span>
                <textarea
                  required
                  name="message"
                  rows="4"
                  placeholder="Share a few details so we can help faster..."
                  className="mt-2 block w-full resize-y border border-zinc-200 p-4 font-normal outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              <div className="flex justify-end sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-zinc-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  Send message <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </section>
        <p className="pb-4 pt-8 text-center text-xs text-zinc-500">
          Can&apos;t find what you need?{" "}
          <Link
            href="/dashboard/orders"
            className="font-bold text-red-600 hover:underline"
          >
            Check your orders
          </Link>{" "}
          or contact our team directly.
        </p>
      </main>
    </div>
  );
}
