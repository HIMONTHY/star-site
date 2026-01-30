export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl md:text-7xl font-serif mb-6">
        STAR
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl">
        Beautiful. Intentional. Designed with purpose.
      </p>

      <div className="flex gap-4">
        <a
          href="#"
          className="border border-black px-6 py-3 text-black hover:bg-black hover:text-white transition"
        >
          Explore
        </a>

        <a
          href="#"
          className="px-6 py-3 text-gray-700 hover:text-black transition"
        >
          Contact
        </a>
      </div>
    </main>
  );
}
