"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { SendHorizontal } from "lucide-react";

import logo from "@/public/logo.png";

export default function Footer({ category }) {
  const year = new Date().getFullYear();
  const menCategory = category?.find((item) => item.gender === "men");

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", href: "/" },
        { name: "Shop", href: `/shop/men/${menCategory?.slug}/newest` },
        { name: "Collections", href: "/collections/men/summer" },
        {
          name: "Sale",
          href: menCategory
            ? `/sale/men/${menCategory?.slug}/newest`
            : "/sale/men/men-tops/newest",
        },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faq" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Story", href: "/about" },
        { name: "Latest News", href: "/blog" },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-800 bg-black text-zinc-400">
      <section className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-16 lg:flex-row">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
              Newsletter
            </p>

            <h2 className="text-3xl font-bold text-white">
              Join the Everyday Wear
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
              Receive exclusive offers, early access to new collections,
              seasonal sales and fashion inspiration directly in your inbox.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="lg:h-14 h-11 flex-1 bg-transparent pl-5 lg:px-5 text-white outline-none placeholder:text-zinc-600"
            />

            <button
              type="submit"
              className="group hidden lg:inline-flex  h-11 lg:h-14 items-center justify-center gap-2 rounded-br-2xl bg-zinc-950 px-7 font-semibold text-white transition-all duration-300  hover:bg-zinc-800 active:scale-95"
            >
              Subscribe
              <SendHorizontal
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              type="submit"
              className="group lg:hidden inline-flex  h-11 lg:h-14 items-center justify-center gap-2 rounded-br-2xl bg-zinc-950 px-4 font-semibold text-white transition-all duration-300 hover:bg-zinc-800 active:scale-95"
            >

              <SendHorizontal
                size={18}
                className="transition-transform text-red-600 duration-300 group-hover:translate-x-1"
              />
            </button>

          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 grid-cols-2  lg:grid-cols-[1.3fr_.7fr_.7fr_.7fr] lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={logo}
                alt="Everyday Wear"
                className="w-14 h-11"
                width={60}
                height={60}
              />

              <div>
                <h2 className="text-xl font-bold tracking-wider text-white">
                  EVERYDAY
                </h2>

                <p className="text-xs uppercase tracking-[0.4em] text-red-500">
                  Wear
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
              Everyday Wear brings premium fashion with timeless design,
              exceptional quality and modern comfort. Discover clothing crafted
              for every season and every lifestyle.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                {
                  icon: <FaFacebookF />,
                  href: "#",
                },
                {
                  icon: <FaInstagram />,
                  href: "#",
                },
                {
                  icon: <FaXTwitter />,
                  href: "#",
                },
                {
                  icon: <FaLinkedinIn />,
                  href: "#",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-600 hover:text-white"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white">
                {column.title}
              </h3>

              <ul className="space-y-2">
                {column.links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center text-sm transition hover:text-white"
                    >
                      <span className="mr-2 h-[1px] w-0 bg-red-500 transition-all duration-300 group-hover:w-5" />

                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 lg:flex-row">
          <p>© {year} Everyday Wear. All rights reserved.</p>

          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
