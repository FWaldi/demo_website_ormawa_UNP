
// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/ormawa", label: "Ormawa" },
  { href: "/kalender", label: "Kalender" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent")}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Typography as='span' variant='large' className="font-bold">ORMAWA UNP</Typography>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary text-foreground/80">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">Login Admin</Button>
          <Button className="md:hidden" size="icon" variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      <div className={cn(
        "md:hidden border-t bg-background/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out",
        mobileMenuOpen? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container flex flex-col py-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="py-2 text-foreground/80 transition-colors hover:text-primary text-center" onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Button variant="outline" size="sm" className="mt-4">Login Admin</Button>
        </nav>
      </div>
    </header>
  );
}
