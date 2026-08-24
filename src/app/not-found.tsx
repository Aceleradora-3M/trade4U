import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center font-sans">
        <div className="text-center px-4">
          <div className="font-bold text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#25a5b3] to-[#25a5b3]/30 mb-4">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/en"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#25a5b3] hover:bg-[#2ec4d4] text-white font-semibold rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
