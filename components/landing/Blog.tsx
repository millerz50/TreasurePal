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
  image?: string; // optional now
};

/* ----------------------------
   ENV VARIABLES
---------------------------- */
const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v2").trim();
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URLV2?.replace(/\/+$/, "") ?? "";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/${API_VERSION}/blogs`);
        if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
        const data: BlogPost[] = await res.json();
        setBlogPosts(data);
        if (data.length > 0) setActivePostId(data[0].id);
      } catch (err) {
        console.error("❌ Error fetching blog posts:", err);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const activePost = blogPosts.find((post) => post.id === activePostId);

  const getImageUrl = (url?: string) => url || "/placeholder.png";

  return (
    <section className="py-16 px-6 sm:px-10 max-w-screen-xl mx-auto">
      <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-14">
        Treasurepal Insights
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner text-primary" />
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="text-center py-12 text-base-content/70">
          <h2 className="text-lg font-semibold">No blog posts found</h2>
          <p className="text-sm">Check back later for new insights.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Main Blog Viewer */}
          <div>
            {activePost && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogArticle post={activePost} getImageUrl={getImageUrl} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar Blog Links */}
          <aside className="sticky top-20 space-y-5 max-h-[600px] overflow-y-auto">
            <h4 className="text-xl font-semibold text-accent">
              🗂 Other Posts
            </h4>
            <ul className="space-y-5">
              {blogPosts.map((post) => (
                <li key={post.id} className="flex gap-3 items-start group">
                  <div className="w-16 h-16 relative rounded-md border-2 border-primary/30 overflow-hidden shadow-sm">
                    <Image
                      src={getImageUrl(post.image)}
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
                        "text-sm text-left w-full transition font-semibold",
                        post.id === activePostId
                          ? "text-primary"
                          : "text-base-content group-hover:text-white",
                      )}
                    >
                      {post.title}
                    </button>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </section>
  );
}

function BlogArticle({
  post,
  getImageUrl,
}: {
  post: BlogPost;
  getImageUrl: (url?: string) => string;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="space-y-6">
      <motion.div
        layout
        className="relative aspect-video overflow-hidden rounded-xl shadow-xl border-4 border-accent/40 group"
      >
        <Image
          src={getImageUrl(post.image)}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          aria-label="Like post"
          aria-pressed={liked}
          className={cn(
            "btn btn-sm btn-circle absolute top-4 right-4 transition shadow-md",
            liked
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-white text-red-600 hover:bg-red-100",
          )}
        >
          {liked ? (
            <SolidHeart className="h-5 w-5" />
          ) : (
            <OutlineHeart className="h-5 w-5" />
          )}
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-transparent group-hover:text-white text-xl font-bold transition duration-300">
            {post.title}
          </span>
        </div>
      </motion.div>

      <motion.div layout className="prose prose-blue max-w-none">
        <h3 className="text-3xl font-bold text-primary">{post.title}</h3>
        <p className="text-base text-gray-700">{post.excerpt}</p>
        <p className="text-xs text-gray-500">📅 {post.date}</p>
      </motion.div>
    </article>
  );
}
