'use client';

import React, { useState, useEffect } from 'react';
import MainSideBar from '@/components/MainSideBar';

// Define the type for our data items
interface Post {
  id: number;
  title: string;
  body: string;
}

const itemsPerPage = 3;

const PaginationApp = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    id: '',
    title: '',
    body: '',
  });

  const handleSearch = (newFilters: { id: string; title: string; body: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('_page', String(currentPage));
        searchParams.append('_limit', String(itemsPerPage));

        if (filters.id) {
          searchParams.append('id', filters.id);
        }
        if (filters.title) {
          searchParams.append('title_like', filters.title);
        }
        if (filters.body) {
          searchParams.append('body_like', filters.body);
        }

        const url = `https://jsonplaceholder.typicode.com/posts?${searchParams.toString()}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const totalCount = response.headers.get('x-total-count');
        if (totalCount) {
          const totalItemsCount = parseInt(totalCount, 10);
          setTotalItems(totalItemsCount);
          setTotalPages(Math.ceil(totalItemsCount / itemsPerPage));
        } else {
          setTotalItems(0);
          setTotalPages(0);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (e: any) {
        setError(e.message);
        setPosts([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, filters]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const renderSmartPagination = () => {
    const pagesToShow = new Set<number>();
    const pageButtonLimit = 2;

    if (totalPages === 0) return null;

    pagesToShow.add(1);
    
    if (totalPages > 1) {
      pagesToShow.add(totalPages);
    }
    
    for (let i = currentPage - pageButtonLimit; i <= currentPage + pageButtonLimit; i++) {
      if (i > 1 && i < totalPages) {
        pagesToShow.add(i);
      }
    }
    
    const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);

    const buttonsToRender: (number | string)[] = [];
    let lastPageAdded = 0;

    sortedPages.forEach(page => {
      if (page > lastPageAdded + 1) {
        buttonsToRender.push('...');
      }
      buttonsToRender.push(page);
      lastPageAdded = page;
    });

    return (
      <>
        {buttonsToRender.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              className={`px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 ${page === currentPage ? 'bg-blue-600 text-white font-semibold border-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => handlePageChange(Number(page))}
              disabled={page === currentPage}
            >
              {page}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen">
      {/* The sidebar component */}
      {/* <MainSideBar onSearch={handleSearch} /> */}

      {/* Main content area */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Modern Pagination App</h1>

        {isLoading && <p>Loading posts...</p>}
        {error && <p className="text-red-500 font-bold">Error: {error}</p>}
        
        {!isLoading && !error && (
          <>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.body}</p>
                </li>
              ))}
            </ul>
            
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              {renderSmartPagination()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Showing page {currentPage} of {totalPages}. Total items: {totalItems}.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaginationApp;