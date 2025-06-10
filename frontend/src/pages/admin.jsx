//pages/admin.jsx
import React, { useState } from "react";
import "../App.css";

export default function Admin() {
  const [newDish, setNewDish] = useState({ name: "", description: "", price: "", category: "", image: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/dishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDish),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const addedDish = await response.json();
      setMessage(`Dish "${addedDish.name}" added successfully!`);
      setNewDish({ name: "", description: "", price: "", category: "", image: "" });
    } catch (error) {
      setMessage(`Failed to add dish: ${error.message}`);
      console.error("Error adding dish:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      {message && <div className={message.includes("successfully") ? "success-message" : "error-message"}>{message}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <input value={newDish.name} onChange={e => setNewDish({ ...newDish, name: e.target.value })} placeholder="Dish Name" required />
        <input value={newDish.description} onChange={e => setNewDish({ ...newDish, description: e.target.value })} placeholder="Description" required />
        <input type="number" value={newDish.price} onChange={e => setNewDish({ ...newDish, price: parseFloat(e.target.value) })} placeholder="Price" required />
        <input value={newDish.category} onChange={e => setNewDish({ ...newDish, category: e.target.value })} placeholder="Category" required />
        <input value={newDish.image} onChange={e => setNewDish({ ...newDish, image: e.target.value })} placeholder="Image URL" required />
        <button type="submit">Add Dish</button>
      </form>
    </div>
  );
}


