"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,

} from "react-icons/fa6";

import logo from "@/public/logo.png";

export default function ShopFooter({ category }) {
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
    <footer className="border-t  pt-80 border-zinc-800 bg-black text-zinc-400">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_.7fr_.7fr_.7fr]">


          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src={logo} alt="Everyday Wear" width={60} height={60} />

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

              <ul className="space-y-4">
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
