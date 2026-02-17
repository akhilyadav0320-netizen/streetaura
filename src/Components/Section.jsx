import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const Section = ({ title, items, addToCart, isLoggedIn, grid }) => {
  return (
    <div className="mb-5">
      <h3 className="fw-bold mb-4 ps-2 border-start border-4 border-danger">
        {title}
      </h3>
      <Row className="g-4">
        {items.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={grid} lg={grid}>
            <ProductCard 
              product={item} 
              addToCart={addToCart} 
              isLoggedIn={isLoggedIn} 
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Section;