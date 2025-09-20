import React from "react";
import "./Card.css";

const Card = ({ title, value, warning }) => {
  return (
    <div className={`card ${warning ? "warning" : ""}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Card;
