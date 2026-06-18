import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fff9f5] px-6 text-brand-ink">
      <div className="max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-soft ring-1 ring-black/5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-pink">Page not found</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">We could not find that page.</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">Head back to the homepage and we&apos;ll get you to the right place.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-brand-pink px-6 py-3 font-medium text-white shadow-soft transition-transform hover:-translate-y-0.5">
          Back home
        </Link>
      </div>
    </main>
  );
}