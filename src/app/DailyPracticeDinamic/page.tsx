'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainSideBar from '@/components/MainSideBar';

// ... (existing interfaces and itemsPerPage) ...
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

        // Use the `_like` operator for partial search on title and body
        if (filters.id) {
          // ID search is still exact, as it's a specific identifier
          searchParams.append('id', filters.id);
        }
        if (filters.title) {
          // Changed from 'title' to 'title_like'
          searchParams.append('title_like', filters.title);
        }
        if (filters.body) {
          // Changed from 'body' to 'body_like'
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
          // The API sometimes doesn't return the header with filtered data,
          // so we need a fallback to prevent issues.
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
  }, [currentPage, filters]); // The dependencies are unchanged

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // ... (renderSmartPagination and other rendering logic remains the same) ...
  // Note: I'm just showing the new layout. The pagination logic is unchanged.
  
  const renderSmartPagination = () => { /* ... (your corrected logic goes here) ... */ return null };

  return (
    <Container fluid>
      <Row>
        {/* Pass the onSearch callback to the sidebar */}
        <Col md={3}>
          <MainSideBar onSearch={handleSearch} />
        </Col>

        <Col md={9} className="mainContent">
          <h1>Modern Pagination App</h1>

          {isLoading && <p>Loading posts...</p>}
          {error && <p className="errorMessage">Error: {error}</p>}
          
          {!isLoading && !error && (
            <>
              <ul className="postList">
                {posts.map((post) => (
                  <li key={post.id} className="postItem">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
              
              <div className="paginationControls">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pageButton"
                >
                  Previous
                </button>
                {renderSmartPagination()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pageButton"
                >
                  Next
                </button>
              </div>

              <p className="summary">
                Showing page {currentPage} of {totalPages}.
                <br />
                Total items: {totalItems}.
              </p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaginationApp;