import React from "react";
import { Container } from "react-bootstrap";
import Section from "../Components/Section";

const kidsProducts = {
  collection: [
    /* Row 1 */
    { id: 1, name: "Kids T-Shirt Red", price: 499, oldPrice: 699, img: "/Image/Kids T-Shirt Red.jpg" },
    { id: 2, name: "Kids T-Shirt Blue", price: 459, oldPrice: 649, img: "/Image/Kids T-Shirt Blue.jpg" },
    { id: 3, name: "Kids T-Shirt White", price: 499, oldPrice: 699, img: "/Image/Kids T-Shirt1.jpg" },
    
    /* Row 2 */
    { id: 4, name: "Kids Shirt", price: 599, oldPrice: 799, img: "/Image/Kids Shirt1.jpg" },
    { id: 5, name: "Kids Jeans", price: 699, oldPrice: 899, img: "/Image/Kidsjeans1.jpg" },
    { id: 6, name: "Kids Jacket", price: 899, oldPrice: 1199, img: "/Image/Kidsjacket1.jpg" }
  ]
};

const Kids = ({ addToCart, isLoggedIn, searchTerm }) => {
  const filterItems = (items) => items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCollection = filterItems(kidsProducts.collection);
  const hasResults = filteredCollection.length > 0;

  return (
    <Container className="my-4">
      {hasResults ? (
        <Section 
          title="KIDS COLLECTION" 
          items={filteredCollection} 
          addToCart={addToCart} 
          isLoggedIn={isLoggedIn} 
          grid={4}  
        />
      ) : (
        <div className="text-center my-5 py-5 border rounded bg-white shadow-sm">
          <h3 className="text-muted">No items found for "{searchTerm}"</h3>
        </div>
      )}
    </Container>
  );
};

export default Kids;