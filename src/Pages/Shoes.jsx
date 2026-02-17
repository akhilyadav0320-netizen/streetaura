import React from "react";
import { Container } from "react-bootstrap";
import Section from "../Components/Section";

const shoesProducts = {
  running: [
    { id: 41, name: "Alpha Running Red", price: 1499, oldPrice: 1999, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
    { id: 42, name: "Neon Speed Runner", price: 1899, oldPrice: 2499, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80" },
    { id: 43, name: "Dark Shadow Sport", price: 1699, oldPrice: 2199, img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80" }
  ],
  sneakers: [
    { id: 45, name: "Urban Street White", price: 2199, oldPrice: 2999, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80" },
    { id: 46, name: "Classic Hype Black", price: 2499, oldPrice: 3499, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80" },
    { id: 47, name: "Retro Vibe Orange", price: 1999, oldPrice: 2599, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80" }
  ]
};

const Shoes = ({ addToCart, isLoggedIn, searchTerm }) => {
  const filterItems = (items) => items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRunning = filterItems(shoesProducts.running);
  const filteredSneakers = filterItems(shoesProducts.sneakers);

  const hasResults = filteredRunning.length > 0 || filteredSneakers.length > 0;

  return (
    <Container className="my-4">
      {hasResults ? (
        <>
          {/* Row 1: Running Shoes (3 items per row) */}
          {filteredRunning.length > 0 && (
            <div className="mb-5">
              <Section 
                title="RUNNING SHOES" 
                items={filteredRunning} 
                addToCart={addToCart} 
                isLoggedIn={isLoggedIn}
                grid={4} // ✅ Added: This forces 3 columns
              />
            </div>
          )}

          {/* Row 2: Sneakers (3 items per row) */}
          {filteredSneakers.length > 0 && (
            <Section 
              title="STREET SNEAKERS" 
              items={filteredSneakers} 
              addToCart={addToCart} 
              isLoggedIn={isLoggedIn}
              grid={4} // ✅ Added: This forces 3 columns
            />
          )}
        </>
      ) : (
        <div className="text-center my-5 py-5 border rounded bg-white shadow-sm">
          <h3 className="text-muted">No shoes found for "{searchTerm}"</h3>
        </div>
      )}
    </Container>
  );
};

export default Shoes;