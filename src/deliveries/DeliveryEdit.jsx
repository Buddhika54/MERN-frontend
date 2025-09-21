import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeliveryEdit() {
  const { id } = useParams(); // delivery id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    contact: "",
    product: "",
    orderQuantity: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch delivery details
  useEffect(() => {
    fetch(`http://localhost:5000/api/deliveries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          customerName: data.customerName,
          contact: data.contact,
          product: data.product,
          orderQuantity: data.orderQuantity,
          status: data.status,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching delivery:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/deliveries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Delivery updated successfully!");
        navigate("/deliveries"); // redirect back to list
      } else {
        alert("Failed to update delivery.");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Delivery</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
            required
            pattern="^\d{10}$"
            title="Contact number must be exactly 10 digits"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product
          </label>
          <input
            type="text"
            name="product"
            value={form.product}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="orderQuantity"
            value={form.orderQuantity}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 w-full border rounded p-2"
          >
            <option>Pending</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {saving ? "Saving..." : "Update Delivery"}
        </button>
      </form>
    </div>
  );
}
