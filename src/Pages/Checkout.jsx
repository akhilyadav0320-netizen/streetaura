import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUser, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";

const Checkout = ({ setCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const totalAmount = location.state?.total || "0.00";

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if(setCart) setCart([]); 
    setIsSubmitted(true);
  };

  //  MEDIUM-SIZED SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <Card 
          className="p-4 shadow border-0 text-center" 
          style={{ 
            maxWidth: "550px", 
            borderRadius: "12px",
            width: "100%" 
          }}
        >
          <div className="mb-3">
            <FaCheckCircle size={60} className="text-success" />
          </div>
          
          <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fff9", border: "1px solid #d4edda" }}>
            <h2 className="fw-bold text-dark mb-2" style={{ fontSize: "1.5rem" }}>
              Order Placed Successfully!
            </h2>
            <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
              Thank you for your order. Your delicious food is being prepared and will be delivered soon.
            </p>
            <p className="fw-bold mb-0" style={{ fontSize: "1rem" }}>
              Payment Method: <span className="text-success">Cash on Delivery (COD)</span>
            </p>
          </div>

          <Button 
            variant="primary" 
            className="mt-4 py-2 px-4 fw-bold" 
            onClick={() => navigate("/")}
            style={{ borderRadius: "8px", width: "fit-content", alignSelf: "center" }}
          >
            Continue Shopping
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>
      <Row>
        <Col lg={7}>
          <Card className="p-4 shadow-sm border-0 mb-4">
            <h5 className="mb-4 d-flex align-items-center bg-light p-2 rounded">
              <FaMapMarkerAlt className="me-2 text-dark" /> Delivery Address
            </h5>
            <Form onSubmit={handlePlaceOrder}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label><FaPhoneAlt className="me-2" />Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text" placeholder="" required />
              </Form.Group>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Col>
              </Row>
              
              <h5 className="mt-4 mb-3 fw-bold">Payment Method</h5>
              <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: "#e1f5fe", color: "#01579b", border: "1px solid #b3e5fc" }}>
                Only <strong>Cash on Delivery (COD)</strong> is available.
              </div>

              {/* UPDATED: MEDIUM-SIZED CENTERED BUTTON */}
              <div className="d-flex justify-content-center">
                <Button 
                  type="submit"
                  variant="success" 
                  className="py-2 px-5 fw-bold rounded-3 shadow-sm" 
                  style={{ 
                    backgroundColor: "#198754", 
                    border: "none", 
                    fontSize: "1rem",
                    minWidth: "280px", // Standard medium size
                    width: "auto"
                  }}
                >
                  Place Order (Pay ₹{totalAmount})
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="p-4 shadow-sm border-0 bg-white" style={{ borderRadius: "12px" }}>
            <h5 className="fw-bold mb-3 bg-light p-2 rounded text-center">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2 p-2 border-bottom">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold">₹{totalAmount}</span>
            </div>
            <div className="d-flex justify-content-between mt-3 p-2">
              <span className="fw-bold fs-5">Total Payable (COD)</span>
              <span className="fw-bold fs-5 text-success">₹{totalAmount}</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;