export default function Post() {
  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <form className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 border">
        <textarea
          name="message"
          rows={4}
          placeholder="Share your thoughts..."
          required
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
