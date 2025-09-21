// src/components/Accessories/Accessories.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// Items provided by the user
const SAMPLE_ITEMS = [
  { name: "Tea Pots", img: "/assets/accessories/TeaPot2.jpg" },
  { name: "Tea Warmer", img: "/assets/accessories/Warmer.jpg" },
  { name: "Tea Cups", img: "/assets/accessories/TeaCups.jpg" },
  { name: "Tea Infusers", img: "/assets/accessories/Infuser.jpg" },
  { name: "Tea Holder", img: "/assets/accessories/Holder.jpg" },
  { name: "Ecobam – Inspired Bamboo Mixer", img: "/assets/accessories/Mixer.jpg" },
  { name: "Tea Strainer", img: "/assets/accessories/Strainer.jpg" },
  { name: "Milk & Sugar Sets", img: "/assets/accessories/Sugar.jpg" },
  { name: "Tea Assortments", img: "/assets/accessories/Assort.jpg" },
];

export default function Accessories() {
  const navigate = useNavigate();
  const handleOrder = (name) => {
    navigate(`/orders/new?product=${encodeURIComponent(name)}`);
  };

  return (
    <div className="container mt-4">
      <h2
        className="mb-3"
        style={{ color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.8)", fontWeight: 800 }}
      >
        Tea Accessories
      </h2>

      <div className="row g-3">
        {SAMPLE_ITEMS.map((item) => (
          <div className="col-12 col-sm-6 col-lg-4" key={item.img}>
            <figure className="m-0">
              {/* Fixed-height image box to standardize visible size */}
              <div style={{ width: "100%", height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                  src={item.img}
                  alt={`${item.name} image`}
                  style={{ height: "100%", width: "auto", maxWidth: "100%", objectFit: "contain", backgroundColor: "transparent", display: "block" }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x600?text=Accessory";
                  }}
                />
              </div>
              <figcaption className="mt-2" style={{ marginTop: 8 }}>
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{ minHeight: 44 }}
                >
                  <h5
                    className="mb-0"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1,
                      color: "#ffffff",
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    {item.name}
                  </h5>
                  <button className="btn btn-success btn-sm" style={{ lineHeight: 1.1 }} onClick={() => handleOrder(item.name)}>
                    Order
                  </button>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      {/* Removed placeholder instructions paragraph */}
    </div>
  );
}
