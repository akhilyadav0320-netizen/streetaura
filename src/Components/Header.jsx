import React from "react";
import { Container, Button, FormControl } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa"; // Added FaTimes to clear search

const Header = ({ setSearchTerm, searchTerm }) => {
  const location = useLocation();

  return (
    <div style={{ padding: "15px 80px" }}>
      <Container fluid>

        {/*  Search Bar Connected to App State */}
        <div className="mb-4">
          <div className="position-relative">
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                color: "gray",
                zIndex: 5
              }}
            />
            <FormControl
              type="text"
              placeholder="Search for products (e.g. Jacket, T-Shirt)..."
              className="ps-5 py-2 shadow-sm"
              style={{ borderRadius: "30px" }}
              value={searchTerm} // Controlled component
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on type
            />
            {/* Show an 'X' to clear search if text exists */}
            {searchTerm && (
              <FaTimes 
                onClick={() => setSearchTerm("")}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  color: "gray",
                  cursor: "pointer",
                  zIndex: 5
                }}
              />
            )}
          </div>
        </div>

        {/* 🔘 Category Buttons */}
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex gap-3 flex-wrap align-items-center">
            <Button
              as={Link}
              to="/"
              variant={location.pathname === "/" ? "primary" : "outline-primary"}
              className="rounded-pill px-4 fw-bold"
            >
              HOME
            </Button>

            <Button
              as={Link}
              to="/men"
              variant={location.pathname.startsWith("/men") ? "primary" : "outline-primary"}
              className="rounded-pill px-4 fw-bold"
            >
              MENS
            </Button>

            <Button
              as={Link}
              to="/kids"
              variant={location.pathname.startsWith("/kids") ? "primary" : "outline-primary"}
              className="rounded-pill px-4 fw-bold"
            >
              KIDS
            </Button>

            <Button
              as={Link}
              to="/shoes"
              variant={location.pathname.startsWith("/shoes") ? "primary" : "outline-primary"}
              className="rounded-pill px-4 fw-bold"
            >
              SHOES
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
};

export default Header;