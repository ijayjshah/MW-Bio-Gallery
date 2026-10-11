import React from 'react';
import { Link } from 'react-router-dom';

export const INSTAGRAM_URL = 'https://www.instagram.com/mwartgallery';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#310914] text-[#FAF6EF] border-t border-[#4B1020] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#FAF6EF]/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-2xl font-serif font-bold text-[#FAF6EF] tracking-wide">
              MW Bio Gallery
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C7A36A] font-sans font-semibold">
              Marriage Biodata, Made Beautiful.
            </p>
            <p className="text-sm text-[#FAF6EF]/75 max-w-sm leading-relaxed">
              Beautifully designed marriage biodatas, made simple for everyone.
              Personalize your details, explore handcrafted templates, and export high-resolution PDFs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C7A36A] font-sans font-semibold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6EF]/80">
              <li>
                <Link to="/" className="hover:text-[#C7A36A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create-biodata" className="hover:text-[#C7A36A] transition-colors">
                  Create My Biodata
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#C7A36A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#C7A36A] transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Social */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C7A36A] font-sans font-semibold">
              Studio & Connect
            </h4>
            <p className="text-sm text-[#FAF6EF]/80">
              Pune, Maharashtra, India
            </p>
            <div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#C7A36A] hover:text-[#FAF6EF] transition-colors"
              >
                <span>Instagram @mwartgallery</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="text-xs text-[#FAF6EF]/60 pt-2">
              Parent Studio: MW Art Gallery
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#FAF6EF]/60">
          <p>© {currentYear} MW Bio Gallery. All rights reserved.</p>
          <p className="text-[#C7A36A]">Crafted with care by MW Art Gallery.</p>
        </div>
      </div>
    </footer>
  );
};
