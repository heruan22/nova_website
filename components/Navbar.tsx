'use client';

import { useState, useEffect } from 'react';
import { useContact } from '@/components/ContactContext';

export default function Navbar({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (value: boolean) => void }) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { openChat } = useContact();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', href: '#' },
    { name: '关于我们', href: '#about' },
    { name: '主营业务', href: '#business' },
    { name: '案例介绍', href: '#cases' },
    { name: '航贸百科', href: '#wiki' },
    { name: '联系我们', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        hasScrolled 
          ? 'bg-white shadow-md dark:bg-gray-950' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <div className={`h-10 w-32 flex items-center justify-center rounded-md font-bold ${
                hasScrolled 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600'
              }`}>
                华顺船务
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`transition ${
                  hasScrolled
                    ? 'text-gray-900 hover:text-blue-600 dark:text-gray-100'
                    : 'text-white hover:text-blue-200'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            <button
              onClick={() => openChat()}
              className={`px-6 py-2 rounded-lg font-medium transition ${
              hasScrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
            >
              联系我们
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                hasScrolled
                  ? 'text-gray-900 hover:text-blue-600 dark:text-gray-300'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${hasScrolled ? 'bg-white dark:bg-gray-900' : 'bg-blue-900/95'}`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium transition ${
                  hasScrolled
                    ? 'text-gray-900 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-100'
                    : 'text-white hover:bg-blue-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}