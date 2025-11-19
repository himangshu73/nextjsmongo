"use client";

import Post from "@/components/Post";
import ShowPost from "@/components/ShowPost";
import { useEffect, useState } from "react";
import type { PostTypes } from "@/types/post";

export default function Home() {
  const [posts, setPosts] = useState<PostTypes[]>([]);

  async function loadPosts() {
    try {
      const res = await fetch("/api/showpost");
      const data = await res.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchData() {
      await loadPosts();
    }
    fetchData();
  }, []);
  return (
    <div>
      <Post loadPosts={loadPosts} />
      <ShowPost posts={posts} />
    </div>
  );
}
