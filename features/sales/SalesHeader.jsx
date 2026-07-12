"use client";
import React, { useMemo, useState } from "react";

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





function SalesHeader({ C }) {
  const [cat, setCat] = useState("All");
  const [subs, setSubs] = useState([]);
 const [colors, setColors] = useState([]);
 const [sort, setSort] = useState("discount");
 const [price, setPrice] = useState([0, 8000]);
  const [sizes, setSizes] = useState([]);
  const [discMin, setDiscMin] = useState(0);
  const [dealOnly, setDealOnly] = useState(false);
  const [search, setSearch] = useState("");
function Breadcrumb({ parts }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {parts.map((b, i, arr) => (
        <span key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 9,
              color: i === arr.length - 1 ? C.coral : C.grey,
              letterSpacing: "0.1em",
              cursor: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (i < arr.length - 1) e.target.style.color = C.white;
            }}
            onMouseLeave={(e) => {
              if (i < arr.length - 1) e.target.style.color = C.grey;
            }}
          >
            {b.toUpperCase()}
          </span>
          {i < arr.length - 1 && (
            <svg
              width={10}
              height={10}
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.border}
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

const filtered=useMemo(()=>{
    let items=[...SALE_PRODUCTS];
    if(cat!=="All") items=items.filter(p=>p.cat===cat);
    if(subs.length)  items=items.filter(p=>subs.includes(p.sub));
    if(colors.length)items=items.filter(p=>p.colors.some(c=>colors.includes(c)));
    if(sizes.length) items=items.filter(p=>p.sizes.some(s=>sizes.includes(s)));
    if(discMin>0)    items=items.filter(p=>p.discount>=discMin);
    if(dealOnly)     items=items.filter(p=>p.deal==="B2G1");
    if(search)       items=items.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.sub.toLowerCase().includes(search.toLowerCase()));
    items=items.filter(p=>p.price>=price[0]&&p.price<=price[1]);
    switch(sort){
      case "discount":  return items.sort((a,b)=>b.discount-a.discount);
      case "price-asc": return items.sort((a,b)=>a.price-b.price);
      case "price-desc":return items.sort((a,b)=>b.price-a.price);
      case "newest":    return items.sort((a,b)=>b.tags.includes("new")-a.tags.includes("new"));
      case "popular":   return items.sort((a,b)=>b.tags.includes("trending")-a.tags.includes("trending"));
      case "ending":    return items.sort((a,b)=>a.saleEnds-b.saleEnds);
      default:          return items;
    }
  },[cat,subs,colors,sizes,discMin,dealOnly,search,price,sort]);



  const crumb = [
    "Home",
    "Sale",
    cat !== "All" ? cat : null,
    ...subs.slice(0, 1),
  ].filter(Boolean);
  return (
    <div
      className="relative overflow-hidden border-b px-6 py-9 pb-7 lg:px-10"
      style={{
        background: `linear-gradient(135deg, ${C.black} 60%, ${C.coralD}15)`,
        borderColor: C.border,
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
        linear-gradient(${C.coral}06 1px, transparent 1px),
        linear-gradient(90deg, ${C.coral}06 1px, transparent 1px)
      `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background Text */}
      <div
        className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 font-['Bebas_Neue'] text-[clamp(100px,18vw,240px)] leading-none opacity-[0.04]"
        style={{ color: C.coral }}
      >
        SALE
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <Breadcrumb parts={crumb} />

        <div className="mt-3.5 flex flex-wrap items-end justify-between gap-3">
          {/* Left */}
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div
                className="h-[2px] w-[18px]"
                style={{ background: C.coral }}
              />

              <span
                className="font-mono text-[9px] font-bold tracking-[0.28em]"
                style={{ color: C.coral }}
              >
                VOLTAGE / SALE EVENT
              </span>
            </div>

            <h1
              className="font-['Bebas_Neue'] text-[clamp(44px,6.5vw,88px)] leading-[0.9] tracking-[0.02em] text-white"
              style={{
                animation: "fadeUp .7s ease .1s both",
              }}
            >
              MEGA <span style={{ color: C.coral }}>SALE</span>
              <span
                className="ml-4 align-middle text-[0.5em] tracking-[0.08em]"
                style={{ color: C.grey }}
              >
                UP TO 50% OFF
              </span>
            </h1>
          </div>

          {/* Right */}
          <div className="text-right">
            <div
              className="font-['Bebas_Neue'] text-[52px] leading-none"
              style={{ color: C.coral }}
            >
              {filtered.length}
            </div>

            <div
              className="font-mono text-[9px] tracking-[0.16em]"
              style={{ color: C.grey }}
            >
              ITEMS ON SALE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesHeader;
