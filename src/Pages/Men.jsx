import React from "react";
import { Container } from "react-bootstrap";
import Section from "../Components/Section";

const menProducts = {
  tshirt: [
    { id: 1, name: "Men T-Shirt Black", price: 799, oldPrice: 999, img: "/Image/Men T-Shirt Black.jpg" },
    { id: 2, name: "Men T-Shirt White", price: 699, oldPrice: 899, img: "/Image/Men T-Shirt White.jpg" },
    { id: 3, name: "Men T-Shirt Blue", price: 899, oldPrice: 1199, img: "/Image/Men T-Shirt Blue.jpg" }
  ],
  shirt: [
    { id: 4, name: "Men Shirt Formal", price: 1099, oldPrice: 1499, img: "/Image/shirt1.jpg" },
    { id: 5, name: "Men Shirt Casual", price: 999, oldPrice: 1299, img: "/Image/Men Shirt Casual.jpg" },
    { id: 6, name: "Men Shirt Checked", price: 1199, oldPrice: 1599, img: "/Image/Men Shirt Checked.jpg" }
  ],
  jacket: [
    { id: 10, name: "Men Jacket Leather", price: 2999, oldPrice: 3999, img: "/Image/Men Jacket Leather.jpg" },
    { id: 11, name: "Men Jacket Winter", price: 2499, oldPrice: 3299, img: "/Image/Men Jacket Winter.jpg" },
    { id: 12, name: "Men Jacket Denim", price: 1999, oldPrice: 2599, img: "/Image/Men Jacket Denim.jpg" }
  ]
};

const Men = ({ addToCart, isLoggedIn, searchTerm }) => {
  const filterItems = (items) => items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sections = [
    { title: "MEN T-SHIRT", data: filterItems(menProducts.tshirt) },
    { title: "MEN SHIRT", data: filterItems(menProducts.shirt) },
    { title: "MEN JACKET", data: filterItems(menProducts.jacket) }
  ];

  const hasResults = sections.some(s => s.data.length > 0);

  return (
    <Container className="my-4">
      {hasResults ? (
        sections.map(s => s.data.length > 0 && (
          <Section 
            key={s.title} 
            title={s.title} 
            items={s.data} 
            addToCart={addToCart} 
            isLoggedIn={isLoggedIn} 
            grid={4} /* ✅ This ensures 3 items per row (12/4 = 3) */
          />
        ))
      ) : (
        <div className="text-center my-5 py-5">
          <h3 className="text-muted">No men's items found for "{searchTerm}"</h3>
        </div>
      )}
    </Container>
  );
};

export default Men;