"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function BlogClient({ posts = [] }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const topics = ["Men", "Women", "Couple", "Universal"];

  const filtered = useMemo(() => {
    return posts
      .filter((p) => (selectedTag ? p.tag === selectedTag : true))
      .filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase()),
      );
  }, [posts, query, selectedTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);
  const [selectedPost, setSelectedPost] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (selectedPost) {
      
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="space-y-6 lg:col-span-3">
        <div className="rounded-2xl bg-linear-to-r from-red-900 to-black p-8 text-white shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Wear Notes & Lookbooks</h2>
              <p className="mt-1 max-w-xl text-zinc-200">
                Styling guides, product highlights and how-to wear notes for our
                collections.
              </p>
            </div>

            <div className="mt-4 w-full max-w-md lg:mt-0">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search looks, tips, or product names"
                className="w-full rounded-2xl border border-zinc-200 bg-white/10 px-4 py-3 text-sm placeholder-zinc-200 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {pageItems.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-44 sm:h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                    {post.tag}
                  </span>
                  <time className="text-xs text-zinc-400">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-zinc-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">{post.excerpt}</p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-sm font-semibold text-red-700 hover:text-red-900"
                  >
                    Read article →
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.href + "#" + post.id,
                      );
                    }}
                    className="text-xs text-zinc-500"
                  >
                    Share
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-500">
            Page {page} / {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded bg-zinc-100 px-3 py-2 text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded bg-zinc-900 px-3 py-2 text-sm text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <aside className="order-first lg:order-last lg:col-span-1">
        <div className="sticky top-28 space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold">Topics</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedTag("");
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1 text-sm ${selectedTag === "" ? "bg-red-900 text-white" : "bg-zinc-100 text-zinc-700"}`}
              >
                All
              </button>
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTag(t);
                    setPage(1);
                  }}
                  className={`rounded-full px-3 py-1 text-sm ${selectedTag === t ? "bg-red-900 text-white" : "bg-zinc-100 text-zinc-700"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold">Recent posts</h4>
            <div className="mt-3 space-y-3">
              {posts.slice(0, 4).map((p) => (
                <a
                  key={p.id}
                  className="block text-sm text-zinc-700 hover:text-zinc-900"
                >
                  {p.title}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold">Subscribe</h4>
            <p className="mt-2 text-sm text-zinc-500">
              Get new articles in your inbox.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                placeholder="Email address"
                className="flex-1 rounded-2xl border border-zinc-200 px-3 py-2 text-sm outline-none"
              />
              <button className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </aside>
      {selectedPost && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-500 flex items-start justify-center overflow-auto bg-black/60 p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative mx-auto max-w-3xl rounded-2xl bg-white shadow-2xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 text-zinc-700 shadow"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="relative h-56 w-full">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                className="rounded-t-2xl object-cover"
              />
            </div>

            <div className="p-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                  {selectedPost.tag}
                </span>
                <time className="text-xs text-zinc-400">
                  {new Date(selectedPost.date).toLocaleDateString()}
                </time>
              </div>

              <h2 className="text-2xl font-bold text-zinc-900">
                {selectedPost.title}
              </h2>

              <p className="mt-4 text-zinc-700">{selectedPost.excerpt}</p>

              <div className="mt-6">
                <p className="text-sm text-zinc-600">
                  (Full article content placeholder — replace with real content
                  or article page.)
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
