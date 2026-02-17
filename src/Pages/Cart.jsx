import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form, Spinner, Modal } from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaTag, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Cart Functions ---
  const updateQty = (index, delta) => {
    const newCart = [...cart];
    const newQty = newCart[index].qty + delta;
    if (newQty > 0) {
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // --- Coupon Logic ---
  const applyCoupon = () => {
    if (selectedCoupon === "WELCOME10") {
      setDiscount(subtotal * 0.10);
    } else if (selectedCoupon === "FLAT50" && subtotal >= 500) {
      setDiscount(50);
    } else if (selectedCoupon === "FLAT100" && subtotal >= 1000) {
      setDiscount(100);
    } else {
      setDiscount(0);
      if (selectedCoupon) alert("Criteria not met for this coupon!");
    }
  };

  // --- ✅ FIXED: Navigation & Success Overlay Logic ---
  const handleProceed = () => {
    setIsProcessing(true);

    // 1. Calculate the actual total to pass to Checkout
    const finalTotal = (subtotal - discount).toFixed(2);

    // Step 1: Simulate "Processing" logic
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true); // Trigger the Success Overlay

      // Step 2: Show success message briefly, then navigate to checkout
      setTimeout(() => {
        setShowSuccess(false);
        // ✅ CRITICAL: We pass the 'finalTotal' in the state here!
        navigate("/checkout", { state: { total: finalTotal } });
      }, 1500);
    }, 1200);
  };

  return (
    <Container className="py-5">
      <Link to="/" className="btn btn-light border mb-4 shadow-sm">
        <FaArrowLeft className="me-2" /> Back to Menu
      </Link>

      <h2 className="fw-bold mb-4">Your Shopping Cart</h2>

      <Row>
        <Col lg={8}>
          {cart.length === 0 ? (
            <div className="text-center py-5 border rounded bg-light">
              <h4>Your cart is empty</h4>
              <Link to="/" className="btn btn-primary mt-3">Shop Now</Link>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-4 p-3 border-bottom">
                <div className="d-flex align-items-center">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} 
                    className="me-4 shadow-sm"
                  />
                  <div>
                    <h5 className="fw-bold mb-1">{item.name}</h5>
                    <p className="text-muted mb-0">₹{item.price} each</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-5">
                  <div className="d-flex align-items-center border rounded p-1">
                    <Button variant="link" className="text-dark p-0 px-2" onClick={() => updateQty(index, -1)}>
                      <FaMinus size={12} />
                    </Button>
                    <span className="px-3 fw-bold">{item.qty}</span>
                    <Button variant="link" className="text-dark p-0 px-2" onClick={() => updateQty(index, 1)}>
                      <FaPlus size={12} />
                    </Button>
                  </div>
                  <h5 className="fw-bold mb-0" style={{ minWidth: "80px" }}>₹{item.price * item.qty}</h5>
                  <Button variant="danger" size="sm" className="rounded-3" onClick={() => removeItem(index)}>
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))
          )}
        </Col>

        <Col lg={4}>
          <Card className="p-4 shadow-sm border-0 bg-white" style={{ borderRadius: "15px" }}>
            <h4 className="fw-bold mb-4">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2 text-muted">
              <span className="fs-5">Subtotal</span>
              <span className="fs-5">₹{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                <span>Coupon Discount</span>
                <span>- ₹{discount.toFixed(2)}</span>
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-between mb-4 mt-2">
              <span className="fw-bold fs-4">Total Payable</span>
              <span className="fw-bold fs-4 text-primary">₹{(subtotal - discount).toFixed(2)}</span>
            </div>

            <div className="mb-4">
              <p className="mb-2 fw-semibold d-flex align-items-center gap-2">
                <FaTag className="text-dark" /> Apply Coupon
              </p>
              <Form.Select 
                className="mb-3 border-primary-subtle py-2 shadow-sm"
                value={selectedCoupon}
                onChange={(e) => setSelectedCoupon(e.target.value)}
              >
                <option value="">Select a coupon...</option>
                <option value="WELCOME10">WELCOME10 - 10% off</option>
                <option value="FLAT50">FLAT50 - ₹50 off (Min ₹500)</option>
                <option value="FLAT100">FLAT100 - ₹100 off (Min ₹1000)</option>
              </Form.Select>
              <Button 
                variant={selectedCoupon ? "dark" : "secondary"} 
                className="w-100 border-0 opacity-75 py-2 fw-bold"
                disabled={!selectedCoupon}
                onClick={applyCoupon}
              >
                Apply Coupon
              </Button>
            </div>

            <Button 
              variant="success" 
              className="w-100 py-3 fw-bold rounded-3 shadow-sm border-0 mt-3" 
              style={{ backgroundColor: "#2e7d32", transition: "0.3s" }}
              onClick={handleProceed}
              disabled={isProcessing || cart.length === 0}
            >
              {isProcessing ? (
                <><Spinner as="span" animation="grow" size="sm" className="me-2" />Processing...</>
              ) : (
                `Proceed to Checkout (₹${(subtotal - discount).toFixed(2)})`
              )}
            </Button>
          </Card>
        </Col>
      </Row>

      
      <Modal show={showSuccess} centered backdrop="static" contentClassName="bg-transparent border-0">
        <Modal.Body className="text-center">
          <div className="p-5 rounded-4 shadow-lg bg-white d-inline-block" style={{ width: "320px" }}>
            <div className="mb-3 position-relative d-flex justify-content-center">
              <div className="spinner-grow text-success" style={{ width: "4rem", height: "4rem", opacity: 0.3 }}></div>
              <FaCheckCircle className="text-success position-absolute top-50 start-50 translate-middle" size={45} />
            </div>
            <h4 className="fw-bold text-dark mb-1">Verified!</h4>
            <p className="text-muted mb-0 small text-uppercase fw-semibold">Securely Processing...</p>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Cart;