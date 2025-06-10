import React from "react";
import FoodItemCard from "./FoodItemCard";

export default function Menu({ category = "all", dishes = [] }) {
  // Safely format category name with default values
  const formatCategoryName = (name) => {
    if (!name || typeof name !== 'string') return "All Dishes";
    if (name === "all") return "All Dishes";
    
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Early return if no dishes are provided
  if (!dishes || dishes.length === 0) {
    return (
      <div className="menu-section">
        <h2 className="category-heading">{formatCategoryName(category)}</h2>
        <p className="no-dishes-message">No dishes available in this category.</p>
      </div>
    );
  }

  return (
    <div className="menu-section">
      <h2 className="category-heading">{formatCategoryName(category)}</h2>
      <div className="menu-grid">
        {dishes.map(dish => (
          <FoodItemCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}