import { PostTypes } from "@/types/post";

export default function ShowPost({ posts }: { posts: PostTypes[] }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>{post.content}</div>
      ))}
    </div>
  );
}
