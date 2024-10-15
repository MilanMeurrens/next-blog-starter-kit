import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Next.js Blog Starter Kit</h1>
        <p className="max-w-[600px] text-center text-lg">
          {`This is a starter kit for a blog built with Next.js using MDX. It is
          designed to be a simple and easy-to-use starter kit for anyone looking
          to get started with a blog.`}
        </p>
        <Link href="/blog" className="rounded-md bg-black px-4 py-2 text-white">
          <button>Go to Blog</button>
        </Link>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
    </div>
  );
}
