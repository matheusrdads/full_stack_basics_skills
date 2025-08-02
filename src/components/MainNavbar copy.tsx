// src/components/MainNavbar.tsx
'use client';

import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function MainNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">🌐 My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">🏠 Home</Nav.Link>
            <Nav.Link as={Link} href="/DailyPractice">📘 Daily Practice</Nav.Link>
            <Nav.Link as={Link} href="/DailyPracticeDinamic">📘 Daily Practice Dinamic</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
