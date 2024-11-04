import randomJoke from "@/lib/jokes";

export default function Loading() {
  const joke = randomJoke();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>

      {/* Joke Text */}
      <p className="text-gray-700 text-lg font-semibold text-center max-w-xs">
        {joke}
      </p>
    </div>
  );
}
