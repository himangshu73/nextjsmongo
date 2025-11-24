import { PostTypes } from "@/types/post";

export default function ShowPost({ posts }: { posts: PostTypes[] }) {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 space-y-8">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <p>{post.authorId.name}</p>
          <p className="text-gray-800 text-[15px] leading-relaxed">
            {post.content}
          </p>
          <div className="border-t pt-3 mt-3 text-sm text-gray-500 flex justify-between">
            <button className="hover:text-blue-600 transition cursor-pointer">
              Like
            </button>
            <button className="hover:text-blue-600 transition cursor-pointer">
              Comment
            </button>
            <button className="hover:text-blue-600 transition cursor-pointer">
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
