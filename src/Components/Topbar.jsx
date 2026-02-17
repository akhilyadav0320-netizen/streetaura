import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Removed FaUserShield
import { Link, useLocation } from "react-router-dom";

const Topbar = ({ cartCount, isLoggedIn, onLogout }) => { // Removed isAdmin prop
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAdminPage = location.pathname === "/admin";

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="shadow-sm" style={{ padding: "10px 0" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" style={{ color: "#c60935", fontWeight: "bold", gap: "10px" }}>
          <img src="Image/BrandLogo1.png" alt="Logo" width="40" height="40" className="rounded" />
          StreetAura
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center mt-3 mt-lg-0">
            
            {/* CART BUTTON - Hidden on Login and Admin pages */}
            {!isLoginPage && !isAdminPage && (
              <Nav.Link as={Link} to="/cart" className="text-white position-relative d-flex align-items-center me-lg-4 mb-3 mb-lg-0">
                <FaShoppingCart size={18} className="me-2" /> Cart
                {cartCount > 0 && (
                  <span style={{ position: "absolute", top: "-5px", right: "-10px", background: "#c60935", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "11px", fontWeight: "bold" }}>
                    {cartCount}
                  </span>
                )}
              </Nav.Link>
            )}

            {/* ACTION BUTTONS */}
            <div className="d-flex align-items-center gap-2">
              {isLoggedIn ? (
                <>
                  {/* LOGOUT BUTTON */}
                  <Button 
                    variant="danger" 
                    size="sm"
                    className="px-3 py-1 d-flex align-items-center border-0 shadow-sm" 
                    style={{ backgroundColor: "#c60935" }}
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </Button>
                </>
              ) : (
                /* LOGIN BUTTON */
                !isLoginPage && (
                  <Nav.Link as={Link} to="/login" className="text-white border rounded px-4 py-1">
                    <FaSignInAlt className="me-2" /> Login
                  </Nav.Link>
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