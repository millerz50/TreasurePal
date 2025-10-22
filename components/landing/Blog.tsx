"use client";

import { cn } from "@/lib/utils";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Exploring Bindura’s Hidden Gems",
    excerpt:
      "Discover the most underrated spots in Bindura—from scenic trails to local cafés.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    date: "September 20, 2025",
  },
  {
    id: 2,
    title: "How Tech Is Transforming Zimbabwean Real Estate",
    excerpt:
      "A look into how platforms like TreasurePal are reshaping property discovery.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    date: "September 24, 2025",
  },
  {
    id: 3,
    title: "Designing for Mobile in Zimbabwe",
    excerpt:
      "Why responsive design is more than a trend — it’s a necessity for local engagement.",
    image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
    date: "September 25, 2025",
  },
  {
    id: 4,
    title: "Building SEO-Optimized Platforms for Local Businesses",
    excerpt:
      "How Netspace is helping Zimbabwean brands rank higher and reach wider audiences.",
    image: "https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg",
    date: "September 26, 2025",
  },
  {
    id: 5,
    title: "Modular UI Systems for Scalable Dashboards",
    excerpt:
      "A guide to designing reusable components that power Netspace’s admin tools.",
    image: "https://images.pexels.com/photos/1643386/pexels-photo-1643386.jpeg",
    date: "September 27, 2025",
  },
];

export default function BlogSection() {
  const [activePostId, setActivePostId] = useState(blogPosts[0]?.id ?? 1);
  const activePost = blogPosts.find((post) => post.id === activePostId);

  if (!activePost) return null;

  return (
    <section className="py-12 px-4 sm:px-8 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
        Netspace Insights
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* Main Blog Viewer */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePost.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}>
              <BlogArticle post={activePost} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Blog Links with Images */}
        <aside className="sticky top-20 space-y-4 max-h-[600px] overflow-y-auto">
          <h4 className="text-lg font-semibold text-blue-600">🗂 Other Posts</h4>
          <ul className="space-y-4">
            {blogPosts.map((post) => (
              <li key={post.id} className="flex gap-3 items-start">
                <div className="w-16 h-16 relative rounded-md border border-blue-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => setActivePostId(post.id)}
                    className={cn(
                      "text-sm text-left w-full transition font-medium",
                      post.id === activePostId
                        ? "text-blue-900"
                        : "text-blue-700 hover:underline hover:text-blue-900"
                    )}>
                    {post.title}
                  </button>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

function BlogArticle({ post }: { post: (typeof blogPosts)[0] }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="space-y-6">
      <motion.div
        layout
        className="relative aspect-video overflow-hidden rounded-xl shadow-lg border border-blue-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          aria-label="Like post"
          aria-pressed={liked}
          className={cn(
            "btn btn-sm btn-circle absolute top-4 right-4 transition",
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-red-500 hover:bg-red-100"
          )}>
          {liked ? (
            <SolidHeart className="h-5 w-5" />
          ) : (
            <OutlineHeart className="h-5 w-5" />
          )}
        </button>
      </motion.div>

      <motion.div layout className="prose prose-blue max-w-none">
        <h3 className="text-3xl font-bold">{post.title}</h3>
        <p className="text-base text-muted-foreground">{post.excerpt}</p>
        <p className="text-xs text-gray-500">📅 {post.date}</p>
      </motion.div>
    </article>
  );
}
