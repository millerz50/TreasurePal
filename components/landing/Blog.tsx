"use client";

import { cn } from "@/lib/utils";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activePostId, setActivePostId] = useState<number | null>(null);

  // ✅ Fetch blog posts from API
  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const res = await fetch("https://your-api-domain.com/api/blogs");
        // replace with your actual API endpoint
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        const data: BlogPost[] = await res.json();
        setBlogPosts(data);
        if (data.length > 0) {
          setActivePostId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchPosts();
  }, []);

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

function BlogArticle({ post }: { post: BlogPost }) {
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
