'use client';

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

// Define the props for the sidebar component
interface MainSideBarProps {
  onSearch: (filters: { id: string; title: string; body: string }) => void;
}

const MainSideBar: React.FC<MainSideBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    id: '',
    title: '',
    body: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchClick = () => {
    onSearch(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      id: '',
      title: '',
      body: '',
    });
    onSearch({
      id: '',
      title: '',
      body: '',
    });
  };

  return (
    <div className="sidebar">
      <h3>Filter Posts</h3>
      <Form>
        <Form.Group className="mb-3" controlId="filterId">
          <Form.Label>Search by ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g., 123"
            name="id"
            value={filters.id}
            onChange={handleFilterChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="filterTitle">
          <Form.Label>Search by Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., sunt aut"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="filterBody">
          <Form.Label>Search by Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., et iusto sed"
            name="body"
            value={filters.body}
            onChange={handleFilterChange}
          />
        </Form.Group>
        {/* We can use a search button to trigger the search explicitly */}
        <Button variant="primary" onClick={handleSearchClick} className="w-100 mt-2">
            Search
        </Button>
        <Button variant="secondary" onClick={handleClearFilters} className="w-100 mt-2">
          Clear Filters
        </Button>
      </Form>
    </div>
  );
};

export default MainSideBar;