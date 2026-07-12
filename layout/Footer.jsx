"use client"
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto px-20">
      {/* Newsletter strip */}
      <div className="border-b border-gray-800">
        <div className="section py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Get the best deals first</h3>
            <p className="text-sm text-gray-400">Subscribe to our newsletter. No spam, ever.</p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" required
              className="flex-1 sm:w-64 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-700 text-white p-3 btn-sm rounded-xl shrink-0">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Links grid */}
      <div className="section py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-white font-bold text-lg">MyStore</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">Your one-stop shop for quality products at prices you'll love. Fast shipping, easy returns.</p>
            <div className="flex gap-3 mt-5">
              {['𝕏','f','in','ig'].map((icon) => (
                <a key={icon} href="#" className="w-9 h-9 bg-gray-800 hover:bg-indigo-600 rounded-xl flex items-center justify-center text-sm text-gray-400 hover:text-white transition-all duration-200">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Shop', links: [['All Products','/shop'],['New Arrivals','/shop?sort=newest'],['Best Sellers','/shop?sort=rating'],['Categories','/categories']] },
            { title: 'Account', links: [['Sign In','/login'],['Register','/register'],['My Orders','/orders'],['Wishlist','/wishlist']] },
            { title: 'Company', links: [['About Us','/about'],['Contact','/contact'],['Privacy Policy','#'],['Terms','#']] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white font-semibold text-sm mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </footer>
  )
}
