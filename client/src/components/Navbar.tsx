import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 bg-brand-navy shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform group-hover:scale-105"
          >
            {/* Minimalist Circuit/Node K */}
            <path
              d="M20 12 L20 52 M20 32 L36 16 M20 32 L36 48 M36 16 L48 10 M36 48 L48 54 M30 22 L44 28 M30 42 L44 36"
              stroke="#2979F2"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="12" r="4" fill="#13C8B8" />
            <circle cx="20" cy="52" r="4" fill="#13C8B8" />
            <circle cx="48" cy="10" r="4" fill="#13C8B8" />
            <circle cx="48" cy="54" r="4" fill="#13C8B8" />
            <circle cx="44" cy="28" r="3" fill="#13C8B8" />
            <circle cx="44" cy="36" r="3" fill="#13C8B8" />
            <circle cx="20" cy="32" r="4" fill="#13C8B8" />
          </svg>
          <span className="text-2xl font-bold tracking-wide text-brand-gray">
            Kodas<span className="text-brand-blue">Hub</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-brand-gray font-medium">
        <Link href="/domains" className="hover:text-brand-teal transition-colors">
          Domains
        </Link>
        <Link href="#tools" className="hover:text-brand-teal transition-colors">
          Online Tools
        </Link>
        <Link href="#devops" className="hover:text-brand-teal transition-colors">
          DevOps Services
        </Link>
      </div>

      <div className="flex gap-4">
        <button className="px-5 py-2 rounded-md font-semibold text-brand-navy bg-brand-teal hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(19,200,184,0.3)] hover:shadow-[0_0_20px_rgba(19,200,184,0.6)]">
          Get Started
        </button>
      </div>
    </nav>
  );
}
