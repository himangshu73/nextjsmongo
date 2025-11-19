"use client";

import React, { useState } from "react";

export default function Post({ loadPosts }: { loadPosts: () => void }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        console.log("Failed to save post.");
        return;
      }

      if (res.ok) {
        console.log("Successfuly post message.");
        setMessage("");
        loadPosts();
      }
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 border"
      >
        <textarea
          name="message"
          rows={4}
          placeholder="Share your thoughts..."
          required
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
          }}
          className="p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none border resize-none"
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
