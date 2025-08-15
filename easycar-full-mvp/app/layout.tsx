import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'EasyCar — P2P Car Marketplace',
  description: 'Sell your car directly to buyers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur">
          <div className="container h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold">EasyCar</Link>
            <nav className="hidden sm:flex gap-4 text-neutral-300">
              <Link href="/listings">Marketplace</Link>
              <Link href="/listings/new">List a Car</Link>
              <Link href="/account">Account</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-neutral-800 py-6 mt-12">
          <div className="container text-sm text-neutral-400 flex justify-between">
            <div>© 2025 EasyCar</div>
            <div className="space-x-4"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div>
          </div>
        </footer>
      </body>
    </html>
  );
}