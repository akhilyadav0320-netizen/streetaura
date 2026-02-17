import React from "react";
import { Container } from "react-bootstrap";

const FlashSaleBanner = () => {
  // We use a constant for the animation to keep the JSX clean
  const marqueeAnimation = {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: "marquee 20s linear infinite",
  };

  const marqueeText = "⚡ FLASH SALE: UP TO 70% OFF! ⚡ FREE SHIPPING ON ORDERS OVER ₹999 ⚡ NEW TRENDS ADDED ⚡ SHOP STREET AURA ⚡";

  return (
    /* bg-dark, text-white, and py-2 are inbuilt Bootstrap classes */
    <div className="bg-dark text-white py-2 overflow-hidden shadow-sm" style={{ width: "100%" }}>
      <div style={marqueeAnimation}>
        <span className="fw-bold px-4" style={{ fontSize: "13px", letterSpacing: "1px" }}>
          {marqueeText}
        </span>
        <span className="fw-bold px-4" style={{ fontSize: "13px", letterSpacing: "1px" }}>
          {marqueeText}
        </span>
      </div>

      {/* Since Bootstrap doesn't have @keyframes, 
         we keep this tiny block to define the "marquee" behavior 
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default FlashSaleBanner;