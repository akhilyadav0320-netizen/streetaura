import { Routes, Route, useLocation, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Kids from "./Pages/Kids";
import Shoes from "./Pages/Shoes";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout"; 

import Topbar from "./Components/Topbar";
// Header import removed
import Footer from "./Components/Footer";
import FlashSaleBanner from "./Components/FlashSaleBanner";

function App() {
  const [cart, setCart] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(logged);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setCart([]); 
    navigate("/login");
  };

  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to your cart!");
      navigate("/login");
      return; 
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      {location.pathname === "/" && <FlashSaleBanner />}
      
      {/* Search props added to Topbar */}
      <Topbar 
        cartCount={cartTotal} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Header component section removed entirely */}

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
          <Route path="/men" element={<Men addToCart={addToCart} isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
          <Route path="/kids" element={<Kids addToCart={addToCart} isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
          <Route path="/shoes" element={<Shoes addToCart={addToCart} isLoggedIn={isLoggedIn} searchTerm={searchTerm} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/checkout" element={<Checkout setCart={setCart} />} /> 
        </Routes>
      </div>

      {location.pathname !== "/login" && 
       location.pathname !== "/checkout" && (
        <Footer />
      )}
    </div>
  );
}

export default App;