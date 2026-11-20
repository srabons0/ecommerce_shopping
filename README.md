# Everyday Wears: Full-Stack Fashion E-Commerce Platform

A modern fashion e-commerce platform built for everyday wear. It has men's and women's collections, product search with filtering and sorting, wishlist and cart, secure checkout, customer authentication, order management, a fashion blog, and a dedicated admin dashboard.

**Live demo:** https://everydaywears.netlify.app/

## Features

**Customers**
- Men's and women's collections with a dynamic product catalog
- Search, filtering (category, size, color, rating, price) and sorting
- Persistent shopping cart and wishlist
- Checkout with Stripe or cash on delivery
- Sign in with Google (NextAuth.js)
- User dashboard with profile, orders and wishlist
- Fashion blog

**Admin**
- Manage products (create, read, update, delete), orders and customers
- Analytics dashboard with revenue and order statistics (Recharts)

**Security**
- Authentication with NextAuth.js and Google login
- Protected routes and separate customer and admin access

**Interface**
- Responsive on mobile, tablet and desktop
- Animations with Framer Motion and GSAP, product sliders with Swiper

## Tech Stack

| Area | Tools |
|------|-------|
| Framework | Next.js (App Router), React, JavaScript |
| Styling | Tailwind CSS, DaisyUI |
| Database | MongoDB Atlas |
| Auth | NextAuth.js, Google Authentication |
| Payments | Stripe, Cash on Delivery |
| State and data | Zustand, TanStack Query |
| Charts | Recharts |
| Animation and UI | Framer Motion, GSAP, Swiper |
| Deployment | Netlify |

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | [add demo email] | [add demo password] |
| Admin | [add demo email] | [add demo password] |

If Stripe is in test mode, use card `4242 4242 4242 4242`, any future date and any CVC.

## Screenshots

| Storefront | Product Filters | Checkout |
|------------|-----------------|----------|
| ![](screenshots/store.png) | ![](screenshots/filters.png) | ![](screenshots/checkout.png) |

| User Dashboard | Admin Dashboard | Blog |
|----------------|-----------------|------|
| ![](screenshots/user.png) | ![](screenshots/admin.png) | ![](screenshots/blog.png) |

## Run Locally

```bash
git clone https://github.com/srabons0/ecommerce_shopping.git
cd ecommerce_shopping
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000

## Environment Variables

Create a `.env.local` file with:

```
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

(Check your own code and change these names to match what you really use.)

## What I Learned / Next Steps

- [Add 1-2 honest lines, for example: building role-based access, handling Stripe payments.]
- Planned: add automated tests for payment and order logic.

## Author

Sadman Sakid | [GitHub](https://github.com/srabons0) | [LinkedIn](https://www.linkedin.com/in/sadman-sakid/) | [Portfolio](https://sadmanpfl.netlify.app)
