import React from "react";
import { Container } from "react-bootstrap";
import Section from "../Components/Section";
import HeroBanner from "../Components/HeroBanner"; 

const products = {
  men: [
    { id: 1, name: "Men T-Shirt", price: 799, oldPrice: 999, img: "/Image/tshirt1.jpg" },
    { id: 2, name: "Men Shirt", price: 999, oldPrice: 1299, img: "/Image/shirt1.jpg" },
    { id: 3, name: "Men Jeans", price: 1299, oldPrice: 1599, img: "/Image/jeans1.jpg" },
    { id: 4, name: "Men Jacket", price: 1999, oldPrice: 2499, img: "/Image/jacket1.jpg" }
  ],
  kids: [
    { id: 5, name: "Kids T-Shirt", price: 499, oldPrice: 699, img: "/Image/Kids T-Shirt1.jpg" },
    { id: 6, name: "Kids Shirt", price: 599, oldPrice: 799, img: "/Image/Kids Shirt1.jpg" },
    { id: 7, name: "Kids Jeans", price: 699, oldPrice: 899, img: "/Image/Kidsjeans1.jpg" },
    { id: 8, name: "Kids Jacket", price: 899, oldPrice: 1199, img: "/Image/Kidsjacket1.jpg" }
  ],
  shoes: [
    { id: 9, name: "Running Shoes", price: 1499, oldPrice: 1999, img: "/Image/RunningShoes1.jpg" },
    { id: 10, name: "Casual Shoes", price: 1299, oldPrice: 1699, img: "/Image/Causal1.jpg" },
    { id: 11, name: "Sneakers", price: 1799, oldPrice: 2299, img: "Image/Sneakers1.jpg" },
    { id: 12, name: "Formal Shoes", price: 1999, oldPrice: 2499, img: "Image/Formal1.jpg" }
  ]
};

const Home = ({ addToCart, isLoggedIn, searchTerm }) => {
  const filterItems = (items) => items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMen = filterItems(products.men);
  const filteredKids = filterItems(products.kids);
  const filteredShoes = filterItems(products.shoes);

  const hasResults = filteredMen.length > 0 || filteredKids.length > 0 || filteredShoes.length > 0;

  return (
    <>
      {!searchTerm && <HeroBanner />}

      <Container className="my-4">
        {hasResults ? (
          <>
            
            {filteredMen.length > 0 && (
              <Section 
                title="MEN COLLECTION" 
                items={filteredMen} 
                addToCart={addToCart} 
                isLoggedIn={isLoggedIn} 
                grid={3} 
              />
            )}
            
            {filteredKids.length > 0 && (
              <Section 
                title="KIDS COLLECTION" 
                items={filteredKids} 
                addToCart={addToCart} 
                isLoggedIn={isLoggedIn} 
                grid={3} 
              />
            )}
            
            {filteredShoes.length > 0 && (
              <Section 
                title="SHOES COLLECTION" 
                items={filteredShoes} 
                addToCart={addToCart} 
                isLoggedIn={isLoggedIn} 
                grid={3} 
              />
            )}
          </>
        ) : (
          <div className="text-center my-5 py-5">
            <h3 className="text-muted">No products found for "{searchTerm}"</h3>
            <p>Try searching for something else, like "Jacket" or "Shoes".</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;