import React from "react";
import { Navbar, Nav, Container, Button, FormControl } from "react-bootstrap";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaSearch, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Topbar = ({ cartCount, isLoggedIn, onLogout, setSearchTerm, searchTerm }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname === "/admin";

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-2">
      <Container fluid className="px-lg-5">
        
        {/* BRAND LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" style={{ color: "#c60935", fontWeight: "bold", gap: "10px" }}>
          <img src="Image/BrandLogo1.png" alt="Logo" width="35" height="35" className="rounded" />
          <span className="fs-5">StreetAura</span>
        </Navbar.Brand>

        {/* SEARCH BAR (Desktop: Visible only on Large Screens) */}
        {!isLoginPage && !isAdminPage && (
          <div className="d-none d-lg-block flex-grow-1 mx-4" style={{ maxWidth: "500px" }}>
            <div className="position-relative">
              <FaSearch className="position-absolute start-0 ms-3 text-secondary" style={{ top: "50%", transform: "translateY(-50%)", zIndex: 5 }} />
              <FormControl
                type="text"
                placeholder="Search products..."
                className="ps-5 pe-5 rounded-pill border-0 shadow-none"
                style={{ backgroundColor: "#f8f9fa" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <FaTimes 
                  className="position-absolute end-0 me-3 text-secondary" 
                  onClick={() => setSearchTerm("")} 
                  style={{ top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 5 }} 
                />
              )}
            </div>
          </div>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* SEARCH BAR (Mobile: Visible only inside the Hamburger Menu) */}
          {!isLoginPage && !isAdminPage && (
            <div className="d-lg-none my-3">
              <div className="position-relative">
                <FaSearch className="position-absolute start-0 ms-3 text-secondary" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <FormControl
                  type="text"
                  placeholder="Search products..."
                  className="ps-5 rounded-pill border-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}

          <Nav className="ms-auto align-items-center">
            {/* CATEGORY LAYOUT LINKS */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3 me-lg-4 mb-3 mb-lg-0">
              <Nav.Link as={Link} to="/men" className={`fw-semibold ${location.pathname === "/men" ? "text-danger" : "text-white"}`}>MENS</Nav.Link>
              <Nav.Link as={Link} to="/kids" className={`fw-semibold ${location.pathname === "/kids" ? "text-danger" : "text-white"}`}>KIDS</Nav.Link>
              <Nav.Link as={Link} to="/shoes" className={`fw-semibold ${location.pathname === "/shoes" ? "text-danger" : "text-white"}`}>SHOES</Nav.Link>
            </div>

            <div className="d-flex align-items-center gap-4">
              {/* CART ICON */}
              {!isLoginPage && !isAdminPage && (
                <Nav.Link as={Link} to="/cart" className="text-white position-relative p-0">
                  <FaShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                      {cartCount}
                    </span>
                  )}
                </Nav.Link>
              )}

              {/* AUTH BUTTON */}
              {isLoggedIn ? (
                <Button variant="danger" size="sm" className="rounded-pill px-3 py-1 fw-bold border-0" onClick={onLogout} style={{ backgroundColor: "#c60935" }}>
                  <FaSignOutAlt className="me-1" /> Logout
                </Button>
              ) : (
                !isLoginPage && (
                  <Button as={Link} to="/login" variant="outline-light" size="sm" className="rounded-pill px-4 fw-bold">
                    Login
                  </Button>
                )
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;