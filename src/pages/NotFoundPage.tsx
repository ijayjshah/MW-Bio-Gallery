import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-[#FAF6EF] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F1E8DC] text-[#4B1020] flex items-center justify-center mx-auto border border-[#E7DCD2]">
          <Compass className="w-8 h-8 text-[#C7A36A]" />
        </div>
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#C7A36A] font-bold block">
          404 · Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B1020]">
          Lost in the Gallery?
        </h1>
        <p className="text-sm text-[#786B6B] leading-relaxed">
          The page you are looking for does not exist or has been moved. Return to the home gallery or start creating your marriage biodata.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-2.5 text-xs font-semibold text-[#FAF6EF] bg-[#4B1020] hover:bg-[#671C32] rounded-sm transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/create-biodata"
            className="px-6 py-2.5 text-xs font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] rounded-sm transition-colors"
          >
            Create My Biodata
          </Link>
        </div>
      </div>
    </div>
  );
};
