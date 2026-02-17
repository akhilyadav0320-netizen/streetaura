import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#111", color: "#fff", padding: "15px 80px" }}>
      <Container fluid>

        <Row>

          <Col md={3}>
            <h6 className="fw-bold">ONLINE SHOPPING</h6>
            <ul className="list-unstyled">
              <li>Men</li>
              <li>Kids</li>
              <li>Shoes</li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold">CUSTOMER POLICIES</h6>
            <ul className="list-unstyled">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>T&C</li>
              <li>Terms Of Use</li>
              <li>Track Orders</li>
              <li>Shipping</li>
              <li>Cancellation</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold">USEFUL LINKS</h6>
            <ul className="list-unstyled">
              <li>Blog</li>
              <li>Careers</li>
              <li>Site Map</li>
              <li>Corporate Information</li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold">KEEP IN TOUCH</h6>
            <div className="d-flex gap-3 mt-2">
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
              <FaInstagram />
            </div>

            <div className="mt-4">
              <p className="mb-1">100% ORIGINAL guarantee</p>
              <p>30 days return policy</p>
            </div>
          </Col>

        </Row>

        <hr style={{ borderColor: "#444" }} />

        <Row>
          <Col className="text-center">
            <p className="mb-0">
              © 2026 StreetAura Fashion. All rights reserved.
            </p>
          </Col>
        </Row>

      </Container>
    </footer>
  );
};

export default Footer;
