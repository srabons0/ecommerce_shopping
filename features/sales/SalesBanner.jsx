"use client";
import React, { useEffect, useState } from "react";

const SALE_PRODUCTS = [
  {
    id: "s001",
    name: "Oversized Drop Tee",
    price: 899,
    oldPrice: 1299,
    discount: 31,
    isOnSale: true,
    cat: "Men",
    sub: "T-Shirts",
    stock: 3,
    rating: 4.9,
    deal: null,
    tags: ["trending", "new"],
    colors: ["Black", "White", "Lime"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 11 + 1000 * 60 * 43,
  },
  {
    id: "s002",
    name: "Grid Bomber Jacket",
    price: 2999,
    oldPrice: 4999,
    discount: 40,
    isOnSale: true,
    cat: "Men",
    sub: "Jackets",
    stock: 5,
    rating: 4.8,
    deal: "B2G1",
    tags: ["drop", "limited"],
    colors: ["Black", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 3 + 1000 * 60 * 12,
  },
  {
    id: "s003",
    name: "Warp Cargo Pant",
    price: 1799,
    oldPrice: 2899,
    discount: 38,
    isOnSale: true,
    cat: "Men",
    sub: "Trousers",
    stock: 8,
    rating: 4.7,
    deal: null,
    tags: ["trending"],
    colors: ["Black", "Khaki", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 22 + 1000 * 60 * 5,
  },
  {
    id: "s004",
    name: "Phase Knit Crewneck",
    price: 1399,
    oldPrice: 2499,
    discount: 44,
    isOnSale: true,
    cat: "Men",
    sub: "Knitwear",
    stock: 12,
    rating: 4.9,
    deal: null,
    tags: ["bestseller", "new"],
    colors: ["Grey", "Navy", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 47,
  },
  {
    id: "s005",
    name: "Volt Platform Sneaker",
    price: 1999,
    oldPrice: 3499,
    discount: 43,
    isOnSale: true,
    cat: "Men",
    sub: "Shoes",
    stock: 2,
    rating: 4.8,
    deal: null,
    tags: ["drop", "limited"],
    colors: ["White", "Black", "Lime"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 33,
  },
  {
    id: "s006",
    name: "Axis Track Short",
    price: 999,
    oldPrice: 1699,
    discount: 41,
    isOnSale: true,
    cat: "Men",
    sub: "Shorts",
    stock: 18,
    rating: 4.6,
    deal: "B2G1",
    tags: ["trending"],
    colors: ["Black", "Grey", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 30,
  },
  {
    id: "s007",
    name: "Oxford Button-Down",
    price: 1199,
    oldPrice: 1999,
    discount: 40,
    isOnSale: true,
    cat: "Men",
    sub: "Shirts",
    stock: 14,
    rating: 4.5,
    deal: null,
    tags: ["new"],
    colors: ["White", "Black", "Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 72,
  },
  {
    id: "s008",
    name: "Chelsea Boot Midnight",
    price: 2999,
    oldPrice: 5499,
    discount: 45,
    isOnSale: true,
    cat: "Men",
    sub: "Shoes",
    stock: 4,
    rating: 4.9,
    deal: null,
    tags: ["bestseller", "drop"],
    colors: ["Black", "Brown"],
    sizes: ["40", "41", "42", "43", "44"],
    img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 9 + 1000 * 60 * 22,
  },
  {
    id: "s009",
    name: "Tech Fleece Hoodie",
    price: 1899,
    oldPrice: 3299,
    discount: 42,
    isOnSale: true,
    cat: "Men",
    sub: "Hoodies",
    stock: 9,
    rating: 4.7,
    deal: "B2G1",
    tags: ["trending", "new"],
    colors: ["Black", "Grey", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 16,
  },
  {
    id: "s010",
    name: "Noir Structured Blazer",
    price: 3999,
    oldPrice: 7999,
    discount: 50,
    isOnSale: true,
    cat: "Men",
    sub: "Jackets",
    stock: 2,
    rating: 4.9,
    deal: null,
    tags: ["limited", "drop"],
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 47,
  },
  {
    id: "s011",
    name: "Silk Column Dress",
    price: 2499,
    oldPrice: 4299,
    discount: 42,
    isOnSale: true,
    cat: "Women",
    sub: "Dresses",
    stock: 7,
    rating: 4.9,
    deal: null,
    tags: ["new", "trending"],
    colors: ["Black", "Cream", "Coral"],
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 19 + 1000 * 60 * 8,
  },
  {
    id: "s012",
    name: "Wide Linen Trouser",
    price: 1299,
    oldPrice: 2299,
    discount: 43,
    isOnSale: true,
    cat: "Women",
    sub: "Trousers",
    stock: 11,
    rating: 4.8,
    deal: "B2G1",
    tags: ["new"],
    colors: ["Cream", "Black", "Terracotta"],
    sizes: ["XS", "S", "M", "L"],
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 48,
  },
  {
    id: "s013",
    name: "Minimal Leather Sneaker",
    price: 1799,
    oldPrice: 3199,
    discount: 44,
    isOnSale: true,
    cat: "Women",
    sub: "Shoes",
    stock: 6,
    rating: 4.8,
    deal: null,
    tags: ["bestseller"],
    colors: ["White", "Black", "Beige"],
    sizes: ["36", "37", "38", "39", "40"],
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 13 + 1000 * 60 * 51,
  },
  {
    id: "s014",
    name: "Drop-Shoulder Hoodie",
    price: 1499,
    oldPrice: 2599,
    discount: 42,
    isOnSale: true,
    cat: "Women",
    sub: "Hoodies",
    stock: 15,
    rating: 4.7,
    deal: "B2G1",
    tags: ["trending"],
    colors: ["Grey", "Black", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 35,
  },
  {
    id: "s015",
    name: "Satin Slip Blouse",
    price: 999,
    oldPrice: 1899,
    discount: 47,
    isOnSale: true,
    cat: "Women",
    sub: "Tops",
    stock: 1,
    rating: 4.6,
    deal: null,
    tags: ["trending", "new"],
    colors: ["Cream", "Black", "Coral"],
    sizes: ["XS", "S", "M", "L"],
    img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 1 + 1000 * 60 * 18,
  },
  {
    id: "s016",
    name: "Wrap Mini Skirt",
    price: 799,
    oldPrice: 1499,
    discount: 47,
    isOnSale: true,
    cat: "Women",
    sub: "Skirts",
    stock: 19,
    rating: 4.5,
    deal: null,
    tags: ["new"],
    colors: ["Black", "Brown", "Cream"],
    sizes: ["XS", "S", "M", "L"],
    img: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 60,
  },
  {
    id: "s017",
    name: "Ribbed Thermal Knit",
    price: 999,
    oldPrice: 1999,
    discount: 50,
    isOnSale: true,
    cat: "Women",
    sub: "Knitwear",
    stock: 10,
    rating: 4.8,
    deal: null,
    tags: ["bestseller"],
    colors: ["Cream", "Black", "Brown"],
    sizes: ["XS", "S", "M", "L"],
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 28,
  },
  {
    id: "s018",
    name: "Woven Leather Sandal",
    price: 1599,
    oldPrice: 2799,
    discount: 43,
    isOnSale: true,
    cat: "Women",
    sub: "Shoes",
    stock: 13,
    rating: 4.5,
    deal: "B2G1",
    tags: ["new"],
    colors: ["Brown", "Black", "Cream"],
    sizes: ["36", "37", "38", "39", "40"],
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 52,
  },
  {
    id: "s019",
    name: "Block Logo Hoodie",
    price: 1599,
    oldPrice: 2799,
    discount: 43,
    isOnSale: true,
    cat: "Unisex",
    sub: "Hoodies",
    stock: 28,
    rating: 4.9,
    deal: "B2G1",
    tags: ["trending", "bestseller"],
    colors: ["Black", "White", "Lime"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 6 + 1000 * 60 * 55,
  },
  {
    id: "s020",
    name: "Washed Graphic Tee",
    price: 499,
    oldPrice: 999,
    discount: 50,
    isOnSale: true,
    cat: "Unisex",
    sub: "T-Shirts",
    stock: 40,
    rating: 4.7,
    deal: null,
    tags: ["trending"],
    colors: ["Black", "Grey", "Washed"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 80,
  },
  {
    id: "s021",
    name: "Panel Bomber",
    price: 1999,
    oldPrice: 3799,
    discount: 47,
    isOnSale: true,
    cat: "Unisex",
    sub: "Jackets",
    stock: 3,
    rating: 4.8,
    deal: null,
    tags: ["limited", "drop"],
    colors: ["Black", "Multi"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 4 + 1000 * 60 * 5,
  },
  {
    id: "s022",
    name: "Skate Low Sneaker",
    price: 1399,
    oldPrice: 2499,
    discount: 44,
    isOnSale: true,
    cat: "Unisex",
    sub: "Shoes",
    stock: 22,
    rating: 4.7,
    deal: "B2G1",
    tags: ["trending", "new"],
    colors: ["White", "Black", "Gum"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 44,
  },
  {
    id: "s023",
    name: "Flex Tech Jogger",
    price: 1199,
    oldPrice: 2199,
    discount: 45,
    isOnSale: true,
    cat: "Unisex",
    sub: "Trousers",
    stock: 16,
    rating: 4.8,
    deal: null,
    tags: ["bestseller", "new"],
    colors: ["Black", "Grey", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 20,
  },
  {
    id: "s024",
    name: "Solar Mesh Tank",
    price: 499,
    oldPrice: 899,
    discount: 44,
    isOnSale: true,
    cat: "Women",
    sub: "Tops",
    stock: 33,
    rating: 4.6,
    deal: "B2G1",
    tags: ["new", "trending"],
    colors: ["White", "Black", "Coral", "Lime"],
    sizes: ["XS", "S", "M", "L"],
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 65,
  },
  {
    id: "s025",
    name: "Coast Oversized Shirt",
    price: 1299,
    oldPrice: 2199,
    discount: 41,
    isOnSale: true,
    cat: "Men",
    sub: "Shirts",
    stock: 14,
    rating: 4.7,
    deal: null,
    tags: ["new"],
    colors: ["White", "Stripe", "Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 90,
  },
  {
    id: "s026",
    name: "Stretch Track Jacket",
    price: 1799,
    oldPrice: 3299,
    discount: 45,
    isOnSale: true,
    cat: "Unisex",
    sub: "Jackets",
    stock: 9,
    rating: 4.7,
    deal: "B2G1",
    tags: ["new", "drop"],
    colors: ["Black", "Navy", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 8 + 1000 * 60 * 15,
  },
  {
    id: "s027",
    name: "Compression Long Tee",
    price: 699,
    oldPrice: 1399,
    discount: 50,
    isOnSale: true,
    cat: "Unisex",
    sub: "T-Shirts",
    stock: 27,
    rating: 4.6,
    deal: null,
    tags: [],
    colors: ["Black", "White", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 100,
  },
  {
    id: "s028",
    name: "Grip Training Sneaker",
    price: 1699,
    oldPrice: 2999,
    discount: 43,
    isOnSale: true,
    cat: "Unisex",
    sub: "Shoes",
    stock: 17,
    rating: 4.8,
    deal: "B2G1",
    tags: ["bestseller", "trending"],
    colors: ["Black", "White", "Lime", "Grey"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
    img2: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=85",
    saleEnds: Date.now() + 1000 * 60 * 60 * 15 + 1000 * 60 * 30,
  },
];

function SalesBanner({ C }) {
  const p = SALE_PRODUCTS.filter((p) => p.deal !== "B2G1").sort(
    (a, b) => a.saleEnds - b.saleEnds || b.discount - a.discount,
  )[0];
  const { h, m, s } = useCountdown(p.saleEnds);
const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");
  const [hov, setHov] = useState(false);
  const [imgI, setImgI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setImgI((i) => (i === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(t);
  }, []);

  function DiscBadge({ discount, deal, big = false }) {
    if (deal === "B2G1")
      return (
        <div
          style={{
            background: C.purple,
            padding: big ? "5px 14px" : "3px 10px",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue',cursive",
              fontSize: big ? 14 : 10,
              letterSpacing: "0.1em",
              color: C.white,
            }}
          >
            BUY 2 GET 1 FREE
          </span>
        </div>
      );
    const bg = discount >= 50 ? C.coral : discount >= 40 ? C.fire : C.gold;
    const txtClr = discount >= 40 ? C.white : C.black;
    return (
      <div
        style={{
          background: bg,
          padding: big ? "6px 16px" : "3px 10px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',cursive",
            fontSize: big ? 20 : 12,
            letterSpacing: "0.06em",
            color: txtClr,
          }}
        >
          -{discount}%
        </span>
      </div>
    );
  }

  function useCountdown(endTs) {
    const calc = () => {
      const diff = Math.max(0, endTs - Date.now());
      return {
        h: Math.floor(diff / 3.6e6),
        m: Math.floor((diff % 3.6e6) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
      const t = setInterval(() => setTime(calc()), 1000);
      return () => clearInterval(t);
    }, [endTs]);
    return time;
  }

  return (
    <div>
      <div className="px-6 pt-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className="relative mb-3 overflow-hidden border transition-shadow duration-500"
            style={{
              borderColor: C.coral,
              cursor: "none",
              boxShadow: hov ? `0 0 60px ${C.coral}22` : "none",
            }}
          >
            {/* Background Images */}
            {[p.img, p.img2].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={p.name}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  imgI === i ? "opacity-100" : "opacity-0"
                } ${hov ? "scale-105" : "scale-100"}`}
                style={{
                  filter: "brightness(.25) saturate(.6)",
                }}
              />
            ))}

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${C.black}f0 0%, ${C.black}88 50%, transparent 100%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-5 px-9 py-8">
              {/* Left */}
              <div>
                <div className="mb-3 flex items-center gap-2.5">
                  <div
                    className="px-2.5 py-0.5"
                    style={{ background: C.coral }}
                  >
                    <span className="font-['Bebas_Neue'] text-[11px] tracking-[0.14em] text-white">
                      ⚡ DEAL OF THE HOUR
                    </span>
                  </div>

                  <DiscBadge discount={p.discount} deal={p.deal} big />
                </div>

                <h2 className="mb-2 font-['Bebas_Neue'] text-[clamp(28px,4vw,52px)] leading-[0.95] tracking-[0.02em] text-white">
                  {p.name}
                </h2>

                <p className="mb-4 font-mono text-[10px] text-zinc-400">
                  {p.cat} · {p.sub} ·{" "}
                  {p.stock <= 3 ? (
                    <span className="font-bold" style={{ color: C.coral }}>
                      ONLY {p.stock} LEFT!
                    </span>
                  ) : (
                    `${p.stock} in stock`
                  )}
                </p>

                <div className="flex items-baseline gap-3.5">
                  <span
                    className="font-['Bebas_Neue'] text-[38px]"
                    style={{ color: C.coral }}
                  >
                    {fmt(p.price)}
                  </span>

                  <span className="font-mono text-lg text-zinc-500 line-through">
                    {fmt(p.oldPrice)}
                  </span>

                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: C.green }}
                  >
                    YOU SAVE {fmt(p.oldPrice - p.price)}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-4">
                {/* Countdown */}
                <div>
                  <p className="mb-2 text-right font-mono text-[9px] tracking-[0.2em] text-zinc-400">
                    ENDS IN
                  </p>

                  <div className="flex gap-2">
                    {[
                      { v: h, l: "HRS" },
                      { v: m, l: "MIN" },
                      { v: s, l: "SEC" },
                    ].map((u) => (
                      <div key={u.l} className="text-center">
                        <div
                          className="min-w-[58px] border px-3.5 py-2 font-['Bebas_Neue'] text-4xl leading-none"
                          style={{
                            background: C.dark,
                            borderColor: C.border,
                            color: C.coral,
                          }}
                        >
                          {pad(u.v)}
                        </div>

                        <p className="mt-1 font-mono text-[8px] tracking-[0.14em] text-zinc-500">
                          {u.l}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  className="px-9 py-3 font-['Bebas_Neue'] text-base tracking-[0.14em] text-white transition-all duration-300 hover:pr-[46px]"
                  style={{
                    background: C.coral,
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.coralD;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = C.coral;
                  }}
                >
                  GRAB THE DEAL →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesBanner;
