'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '#news' },
  { label: 'Services', href: '#services' },
  { label: 'Institutions', href: '#institutions' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const languages = ['العربية', 'Français', 'English', 'ⵜⴰⵎⴰⵣⵉⵖⵜ'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('Français');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10,110,209,0.10)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(10,110,209,0.08)' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <AppLogo size={38} />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-primary leading-none">
              DZ EHR
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase leading-none mt-0.5">
              Santé Numérique
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5"
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
            >
              <Icon name="GlobeAltIcon" size={16} />
              <span>{activeLang}</span>
              <Icon name="ChevronDownIcon" size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-card-hover border border-border overflow-hidden z-50">
                {languages?.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setActiveLang(lang); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      activeLang === lang
                        ? 'text-primary bg-primary/5 font-semibold' :'text-foreground/70 hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login */}
          <Link
            href="/sign-up-login"
            className="px-5 py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-all duration-200"
          >
            Connexion
          </Link>

          {/* Get Started */}
          <Link
            href="/sign-up-login?tab=register"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)',
              boxShadow: '0 4px 14px rgba(10, 110, 209, 0.35)',
            }}
          >
            Commencer
            <Icon name="ArrowRightIcon" size={15} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-primary/5 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 space-y-1">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              {link?.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link href="/sign-up-login" className="px-4 py-3 text-sm font-semibold text-primary border border-primary/30 rounded-xl text-center">
              Connexion
            </Link>
            <Link href="/sign-up-login" className="px-4 py-3 text-sm font-semibold text-white rounded-xl text-center" style={{ background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)' }}>
              Commencer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}