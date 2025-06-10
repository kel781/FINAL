// pages/Home.jsx
import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [dishes, setDishes] = useState([]); // State to store dishes fetched from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dishes"); // Your backend API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDishes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Pass the fetched dishes to the Menu component
  const filteredDishes = category === "all" ? dishes : dishes.filter(d => d.category === category);

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error}</div>;

  return (
    <div className="home">
      <h1>DineSwift</h1>
      <h2>Menu</h2>
      <div className="categories">
        {['all', 'pizza', 'burgers', 'drinks'].map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}>{cat}</button>
        ))}
      </div>
      {/* Pass filteredDishes to Menu */}
      <Menu dishes={filteredDishes} />
    </div>
  );
}