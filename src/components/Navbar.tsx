import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Sparkles, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#4B1020] text-[#FAF6EF] border-b border-[#310914] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif font-bold tracking-wide text-[#FAF6EF] hover:text-[#C7A36A] transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-full bg-[#FAF6EF]/10 border border-[#C7A36A]/50 flex items-center justify-center text-[#C7A36A] group-hover:bg-[#C7A36A] group-hover:text-[#310914] transition-all">
            <Crown className="w-4 h-4" />
          </div>
          <span>MW Bio Gallery</span>
        </Link>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#FAF6EF]/85">
          <Link
            to="/"
            className={`hover:text-[#C7A36A] transition-colors whitespace-nowrap shrink-0 ${
              location.pathname === '/' ? 'text-[#C7A36A] font-semibold' : ''
            }`}
          >
            Home
          </Link>
          <a
            href="/#templates"
            className="hover:text-[#C7A36A] transition-colors whitespace-nowrap shrink-0"
          >
            Templates
          </a>
          <a
            href="/#how-it-works"
            className="hover:text-[#C7A36A] transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="/#faq"
            className="hover:text-[#C7A36A] transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/create-biodata"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0"
          >
            <Heart className="w-3.5 h-3.5 fill-[#310914]" />
            <span>Create My Biodata</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
