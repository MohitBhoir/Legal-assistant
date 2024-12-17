'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="text-4xl font-bold text-white">
          <Link href="/">
            Logo
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Menu Links */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:gap-8 absolute md:static top-16 left-0 w-full md:w-auto transition-all ease-in-out mx-3
          bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg md:backdrop-blur-none 
          md:bg-transparent duration-300 ${isOpen ? 'flex' : 'hidden'
            }`}
        >
          <div className={`flex ${isOpen && 'grid grid-cols-1 md:grid-cols-2'} gap-4 items-center justify-center text-center w-full px-2 py-2`}>
            <Link href="/" className="block px-4 py-2 text-xl text-white md:inline
             hover:text-cyan-200 hover:text-3xl transition-all easy-in-out delay-100">
              Home</Link>
            <Link href="/about" className="block px-4 py-2 text-white md:inline text-xl hover:text-cyan-200 hover:text-3xl transition-all easy-in-out delay-100">About</Link>
            <Link href="/templates"
              className="block px-4 py-2 text-xl text-white md:inline hover:text-cyan-200 hover:text-3xl transition-all easy-in-out delay-100">Templates</Link>
            <Link href="/lawyer"
              className="block px-4 py-2 text-xl text-white md:inline hover:text-cyan-200 hover:text-3xl transition-all easy-in-out delay-100">Lawyer</Link>
            <div className="text-center block md:hidden">
              <Link href="#get-started" className="inline-block px-4 py-2 bg-blue-800 text-white rounded-full hover:text-blue-800 hover:bg-white">Get Started</Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Link href="#get-started" className="px-6 py-2 bg-blue-800 text-white rounded-full hover:text-blue-800 hover:bg-white">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
