// src/components/MainNavbar.tsx
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useSearch } from '@/context/SearchContext'; // Import the new hook

// --- Removed `MainNavbarProps` interface ---

const UserAvatar = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500">
    <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd654d324bcf8f60?s=256" alt="User Avatar" />
  </button>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0h6"
    />
  </svg>
);

// --- The component no longer accepts any props ---
export default function MainNavbar() {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get the filters and handler from the context
  const { filters, handleSearch } = useSearch();

  const toggleAvatarDropdown = () => {
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update the shared filters state via the context handler
    handleSearch({ ...filters, title: value });
  };

  const handleSearchSubmit = () => {
    // The fetch is already triggered by the useEffect in PaginationApp whenever filters change,
    // so this button simply ensures the state is set correctly.
    handleSearch(filters);
  };

  return (
    <nav className="bg-white shadow-sm z-50 sticky top-0 border-b py-1">
      <div className="container mx-auto px-6 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
            </svg>
            <span className="text-xl font-bold ml-2 whitespace-nowrap">Dayi practice</span>
          </div>
          <ul className="hidden md:flex items-center space-x-6 text-gray-600 whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link href="/DailyPractice" className="hover:text-blue-600 transition-colors duration-200">Daily Practice</Link>
            </li>
            <li>
              <Link href="/DailyPracticeDinamic" className="hover:text-blue-600 transition-colors duration-200">Dynamic Practice</Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:block flex-grow max-w-full mx-8">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              // Reverted padding to `py-2` for original height
              // Parent container set to `max-w-full` for maximum width
              className="max-w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={filters.title}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon />
          <div className="relative">
            <UserAvatar onClick={toggleAvatarDropdown} />
            {isAvatarDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-10">
                <Link href="/admin-panel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Admin Panel
                </Link>
                <button
                  onClick={() => { alert('Logged out'); setIsAvatarDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden p-4 border-t`}
      >
        <div className="space-y-2">
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={filters.title}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
          </div>
          <Link href="/" className="block px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100">Home</Link>
          <Link href="/DailyPractice" className="block px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100">Daily Practice</Link>
          <Link href="/DailyPracticeDinamic" className="block px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100">Dynamic Practice</Link>
          <Link href="/admin-panel" className="block px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100">Admin Panel</Link>
          <button
            onClick={() => { alert('Logged out'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}