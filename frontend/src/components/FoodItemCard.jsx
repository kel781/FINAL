import React from "react";
import "../App.css";
import { useCart } from "../context/CartContext";

export default function FoodItemCard({ dish }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(dish);
  };

  return (
    <div className="dish-card">
      <div className="image-container">
        <img src={dish.image} alt={dish.name} className="dish-image" />
        {/* Popular badge */}
        {dish.popularity >= 4.5 && (
          <span className="popular-badge">Popular</span>
        )}
      </div>
      <div className="dish-header">
        <h3>{dish.name}</h3>
        {/* Vegetarian indicator */}
        {dish.is_vegetarian && (
          <span className="vegetarian-indicator" aria-label="Vegetarian">🌱</span>
        )}
      </div>
      <p>{dish.description}</p>
      <p className="price">${dish.price.toFixed(2)}</p>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}