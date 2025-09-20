import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";
import "./Items.css";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="items-page">
      <h2>Items</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Supplier</th>
            <th>Reorder Point</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemId}</td>
              <td>{item.name}</td>
              <td>{item.supplier?.name || "-"}</td>
              <td>{item.reorderPoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
