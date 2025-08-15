import Link from 'next/link';

export default function Page() {
  return (
    <section className="container py-10">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-3">Sell your car. Directly.</h1>
          <p className="text-neutral-400 mb-6">No dealers. Post in minutes, chat with buyers, and close the deal on your terms.</p>
          <div className="flex gap-3">
            <Link className="px-4 py-2 rounded-lg bg-sky-500 font-semibold" href="/listings/new">List a Car</Link>
            <Link className="px-4 py-2 rounded-lg border border-neutral-700" href="/listings">Browse Listings</Link>
          </div>
        </div>
        <img className="rounded-xl border border-neutral-800" src="https://images.unsplash.com/photo-1549925885-c4c66f6f0f29?q=80&w=1200&auto=format&fit=crop" alt="hero" />
      </div>
    </section>
  );
}