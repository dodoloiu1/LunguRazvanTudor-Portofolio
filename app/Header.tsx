"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => `${pathname === href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'} transition-colors`;
  return (
    <header className="border-b border-border/20">
      <div className="px-6 py-8 w-full">
        <nav className="w-full flex items-center justify-between">
          <Link href="/" className="text-xl font-medium tracking-tight">Răzvan–Tudor Lungu</Link>
          <div className="flex items-center gap-8">
            <Link href="/" className={isActive('/')}>Home</Link>
            <Link href="/gallery" className={isActive('/gallery')}>Gallery</Link>
            <Link href="/contact" className={isActive('/contact')}>Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

