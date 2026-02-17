import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const ProductCard = ({ product, addToCart, isLoggedIn }) => {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <Card className="h-100 border-0 shadow-sm rounded-3 overflow-hidden product-card">
      <div className="position-relative overflow-hidden">
        <Card.Img 
          variant="top" 
          src={product.img} 
          className="product-image"
          style={{ height: "280px", objectFit: "cover" }} 
        />
        <Badge bg="danger" className="position-absolute top-0 start-0 m-2 fw-normal">
          {discount}% OFF
        </Badge>
      </div>

      <Card.Body className="p-3 d-flex flex-column">
        <small className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>
          STREET AURA
        </small>
        
        <Card.Title className="fs-6 fw-bold text-dark text-truncate mb-2">
          {product.name}
        </Card.Title>

        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fw-bold fs-5">₹{product.price}</span>
          <span className="text-muted text-decoration-line-through small">₹{product.oldPrice}</span>
        </div>

       
        <Button 
          variant="dark" 
          className="mt-auto rounded-1 fw-bold py-2 border-0 add-to-cart-btn"
          style={{ backgroundColor: '#c60935' }}
          onClick={() => addToCart(product)}
        >
          {isLoggedIn ? "Add to Cart" : "Login to Buy"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;