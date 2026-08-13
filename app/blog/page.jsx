import BlogClient from "@/components/blog/BlogClient";

const SAMPLE_POSTS = [
  {
    id: "1",
    title: "The Modern Man's Guide to a Capsule Wardrobe",
    excerpt:
      "Build a smarter wardrobe with versatile essentials that work across casual, office, travel, and evening looks.",
    date: "2026-07-22",
    tag: "Men",
    image:
      "https://media.gq.com/photos/64a5ecf4c7b7b5b2e3d5f3a1/16:9/w_1280,c_limit/mens-capsule-wardrobe.jpg",
  },
  {
    id: "2",
    title: "From Morning to Midnight: Women's Everyday Style",
    excerpt:
      "Discover versatile outfits that move effortlessly from coffee runs and office hours to dinner and late-night plans.",
    date: "2026-07-18",
    tag: "Women",
    image:
      "https://images.squarespace-cdn.com/content/v1/547a3834e4b053a861c4874e/69c1f6df-e4f6-43bb-b353-666b506c40f4/Sustainably%2BChic%2B%7CSustainable%2BFashion%2BBlog%2B%7C%2BBrands%2Bthat%2BEmpower%2BWomen%2B%7C%2BAnchal.jpg?format=1000w",
  },
  {
    id: "3",
    title: "Couple Style: Coordinated Without Looking Identical",
    excerpt:
      "Learn how couples can combine colors, textures, and silhouettes to create outfits that feel connected but individual.",
    date: "2026-07-14",
    tag: "Couple",
    image:
      "https://i.pinimg.com/originals/ae/28/15/ae28159be095b3cd7ceefb5d597b5477.jpg",
  },
  {
    id: "4",
    title: "Beyond Gender: The Rise of Universal Dressing",
    excerpt:
      "Explore relaxed silhouettes, neutral palettes, and adaptable pieces designed to move beyond traditional fashion categories.",
    date: "2026-07-09",
    tag: "Universal",
    image:
      "https://media.vogue.es/photos/607d85dce9268df4fadd0e4e/1%3A1/w_2757%2Ch_2757%2Cc_limit/Vogue-Sustainability-Guide-credit-Justin-Polkey.jpg",
  },
  {
    id: "5",
    title: "Streetwear Essentials That Never Go Out of Style",
    excerpt:
      "From oversized layers to statement sneakers, these streetwear foundations can anchor dozens of everyday looks.",
    date: "2026-07-03",
    tag: "Streetwear",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "6",
    title: "The Art of Dressing Well in Hot Weather",
    excerpt:
      "Stay comfortable without sacrificing style with breathable fabrics, relaxed silhouettes, and lightweight layering.",
    date: "2026-06-27",
    tag: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "7",
    title: "Linen Season: Why Natural Fabrics Keep Winning",
    excerpt:
      "Linen brings texture, breathability, and effortless sophistication to warm-weather dressing for every wardrobe.",
    date: "2026-06-21",
    tag: "Fabrics",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "8",
    title: "Smart Casual, Finally Explained",
    excerpt:
      "Decode the most confusing dress code with simple combinations of tailored pieces, elevated basics, and clean footwear.",
    date: "2026-06-15",
    tag: "Style Guide",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "9",
    title: "How to Build Outfits Around One Statement Piece",
    excerpt:
      "Start with one bold garment and learn how to balance color, proportion, and accessories around it.",
    date: "2026-06-10",
    tag: "Styling",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "10",
    title: "The New Minimalism: Fewer Clothes, Better Outfits",
    excerpt:
      "Minimalism is not about wearing less personality. It's about choosing pieces that work harder and last longer.",
    date: "2026-06-02",
    tag: "Minimal",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "11",
    title: "Sustainable Style Without Sacrificing Good Design",
    excerpt:
      "Discover practical ways to make your wardrobe more responsible through better materials, care, and smarter buying.",
    date: "2026-05-26",
    tag: "Sustainable",
    image:
      "https://media.vogue.es/photos/607d85dce9268df4fadd0e4e/1%3A1/w_2757%2Ch_2757%2Cc_limit/Vogue-Sustainability-Guide-credit-Justin-Polkey.jpg",
  },
  {
    id: "12",
    title: "Five Color Combinations That Always Look Expensive",
    excerpt:
      "You don't need designer labels to create a refined look. Start with timeless color pairings that naturally work together.",
    date: "2026-05-19",
    tag: "Color",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "13",
    title: "Travel Light: The Perfect Weekend Fashion Capsule",
    excerpt:
      "Pack smarter with a compact wardrobe that can create multiple outfits without filling your entire suitcase.",
    date: "2026-05-11",
    tag: "Travel",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "14",
    title: "The Details Matter: Accessories That Transform an Outfit",
    excerpt:
      "Belts, watches, sunglasses, bags, and jewelry can completely change the character of even the simplest outfit.",
    date: "2026-05-05",
    tag: "Accessories",
    image:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "15",
    title: "Summer Nights: Dressing Up Without Overdressing",
    excerpt:
      "Master the balance between relaxed and refined with lightweight tailoring, open collars, and understated accessories.",
    date: "2026-04-28",
    tag: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "16",
    title: "Fit First: Why Great Style Starts With the Right Silhouette",
    excerpt:
      "Before chasing trends, understand proportions, shoulder lines, trouser breaks, and the details that make clothing look intentional.",
    date: "2026-04-20",
    tag: "Fit",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BlogPage() {

  return (
    <main className="bg-white py-16">
      <div className="mx-auto px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Wear Notes — Men, Women & Couple Style
          </h1>

          <p className="mt-4 text-lg text-zinc-600">
            Styling guides, lookbook highlights, and product notes for every
            wardrobe — men, women, couples, and universal fits.
          </p>
        </header>

        <section className="mt-12">
          <BlogClient posts={SAMPLE_POSTS} />
        </section>
      </div>
    </main>
  );
}
