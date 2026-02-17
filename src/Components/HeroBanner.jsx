import React, { useState, useEffect } from "react";
import { Carousel, Button, Container, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// --- Internal Timer & Stock Component ---
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [stockLevel, setStockLevel] = useState(85);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    const stockTimer = setInterval(() => {
      setStockLevel((prev) => (prev > 12 ? prev - 1 : prev));
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(stockTimer);
    };
  }, [targetDate]);

  const timerBoxStyle = {
    width: "60px",
    height: "60px",
    fontSize: "1.1rem",
    lineHeight: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div style={{ maxWidth: "300px" }}>
      <div className="d-flex gap-2 mb-4">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="text-center">
            <div className="bg-white text-dark fw-bold rounded-circle shadow border border-warning" style={timerBoxStyle}>
              {value}
              <span style={{ fontSize: "0.55rem" }} className="text-uppercase fw-normal">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 p-3 rounded-3" style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="d-flex justify-content-between mb-1">
          <span className="small fw-bold text-warning text-uppercase">🔥 Hurry! Limited Stock</span>
          <span className="small text-white opacity-75">{stockLevel}% Left</span>
        </div>
        <ProgressBar now={stockLevel} variant="danger" animated style={{ height: "8px", borderRadius: "10px" }} />
        <p className="mt-2 mb-0" style={{ fontSize: "0.75rem", color: "#ced4da" }}>
          Almost Sold Out! Only a few items remaining in your area.
        </p>
      </div>
    </div>
  );
};

// Main HeroBanner Component 
const HeroBanner = () => {
  const navigate = useNavigate();

  const bannerData = [
    {
      id: 1,
      image: "/Image/banner-men.jpg",
      title: "SUMMER SALE 2026",
      subtitle: "Get up to 70% Off on Men's Essentials",
      link: "/men",
      showTimer: true,
    },
    {
      id: 2,
      image: "/Image/banner-kids.jpg",
      title: "KIDS SPECIAL EDITIONS",
      subtitle: "Style and comfort for your little ones",
      link: "/kids",
      showTimer: false,
    },
    {
      id: 3,
      image: "/Image/banner-shoes.jpg",
      title: "STEP INTO STYLE",
      subtitle: "New Premium Footwear Arrivals",
      link: "/shoes",
      showTimer: false,
    }
  ];

  return (
    <Carousel fade controls={false} interval={4000} pause={false}>
      {bannerData.map((banner) => (
        <Carousel.Item key={banner.id} style={{ height: "650px", backgroundColor: "#000", overflow: "hidden" }}>
          
          {/* 1. Blurred Background Layer (The "Aura" effect) */}
          <div 
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(30px) brightness(0.3)",
              transform: "scale(1.1)",
              zIndex: 1
            }}
          />

          <Container className="h-100 position-relative" style={{ zIndex: 2 }}>
            <div className="row h-100 align-items-center">
              
              {/* 2. Left Side: Text Content with Glassmorphism */}
              <div className="col-lg-6">
                <div 
                  className="p-4 p-md-5 rounded-4 shadow-lg" 
                  style={{ 
                    background: "rgba(255, 255, 255, 0.05)", 
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <h6 className="text-uppercase mb-3" style={{ letterSpacing: "5px", color: "#ffc107", fontWeight: "bold" }}>
                     Limited Edition Sale
                  </h6>
                  <h1 className="display-3 fw-bold mb-3 text-white" style={{ lineHeight: "1.1" }}>
                    {banner.title}
                  </h1>
                  <p className="fs-5 mb-4 text-white opacity-75">
                    {banner.subtitle}
                  </p>

                  {banner.showTimer && (
                    <div className="mb-4">
                      <CountdownTimer targetDate="2026-03-01T23:59:59" />
                    </div>
                  )}

                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-5 py-3 fw-bold rounded-pill shadow-lg border-0"
                    onClick={() => navigate(banner.link)}
                    style={{ background: "linear-gradient(45deg, #0d6efd, #0099ff)" }}
                  >
                    SHOP THE COLLECTION
                  </Button>
                </div>
              </div>

              {/* 3. Right Side: The Main Image (Maintains Original Proportion) */}
              <div className="col-lg-6 d-none d-lg-flex justify-content-center h-100 pt-5">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="img-fluid mt-auto"
                  style={{ 
                    height: "90%", 
                    width: "auto", 
                    objectFit: "contain",
                    filter: "drop-shadow(0px 20px 50px rgba(0,0,0,0.9))",
                  }}
                />
              </div>

            </div>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroBanner;