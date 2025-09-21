import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { apiFetch } from "../../utils/api";

function OrderForm({ order, onClose, onSaved, refreshOrders }) {
  const location = useLocation();
  const [prefilledProduct, setPrefilledProduct] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    product: "",
    items: 1,
    productSpecifications: "",
    deliveryInstructions: "",
  });
  const [saving, setSaving] = useState(false);
  const [price, setPrice] = useState(0); // LKR

  // Per-kg prices in LKR (tea products)
  const PRODUCT_PRICES = {
    "Organic Tea": 10000,
    "Premium Black Tea": 5000,
    "Herbal Mix Tea": 4000,
    "Loose Leaf Tea": 3000,
    "Flavoured Tea": 2000,
    "Ceylon Black Tea": 1800,
    "Green Tea": 1500,
    "Mint Green Tea": 1200,
    "Chamomile Tea": 1000,
    "Cinnamon Black Tea": 1000,
  };

  // Fixed per-item prices for accessories
  const ACCESSORY_PRICES = {
    "Tea Pots": 8000,
    "Tea Warmer": 15000,
    "Tea Cups": 12000,
    "Tea Infusers": 3000,
    "Tea Holder": 8000,
    "Ecobam – Inspired Bamboo Mixer": 2000,
    "Tea Strainer": 3000,
    "Milk & Sugar Sets": 6000,
    "Tea Assortments": 20000, // (20 pack)
    "Tea Assortments (20 pack)": 20000,
  };

  const ALL_PRODUCTS = [...new Set([...Object.keys(PRODUCT_PRICES), ...Object.keys(ACCESSORY_PRICES)])];

  const computePrice = (productName, itemsCount = Number(formData.items || 1)) => {
    if (ACCESSORY_PRICES[productName] !== undefined) {
      const perItem = ACCESSORY_PRICES[productName] || 0;
      return perItem * (itemsCount || 1);
    }
    const perKg = PRODUCT_PRICES[productName] || 0;
    const kg = 1; // quantity option removed; default to 1kg per item
    return perKg * kg * (itemsCount || 1);
  };

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || "",
        customerEmail: order.customerEmail || "",
        contactNumber: order.contactNumber || "",
        product: order.product || "",
        items: Number(order.items || 1),
        productSpecifications: order.productSpecs || "",
        deliveryInstructions: order.deliveryInstructions || "",
      });
      const total = computePrice(order.product || "", Number(order.items || 1));
      setPrice(total);
    }
  }, [order]);

  // Prefill from ?product= query when creating a new order
  useEffect(() => {
    if (!order) {
      const params = new URLSearchParams(location.search);
      const productFromQuery = params.get("product");
      if (productFromQuery) {
        setPrefilledProduct(true);
        setFormData((prev) => ({ ...prev, product: productFromQuery }));
        setPrice(computePrice(productFromQuery, Number(formData.items || 1)));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: name === "items" ? Number(value) : value };
    setFormData(next);

    if (name === "product" || name === "items") {
      const pName = name === "product" ? value : next.product;
      const itemsCount = Number(name === "items" ? value : next.items) || 1;
      setPrice(computePrice(pName, itemsCount));
    }
  };

  const clamp = (n, min = 1, max = 100) => Math.max(min, Math.min(max, n));
  const incrementItems = () => {
    const nextItems = clamp(Number(formData.items || 1) + 1);
    const evt = { target: { name: "items", value: nextItems } };
    handleChange(evt);
  };
  const decrementItems = () => {
    const nextItems = clamp(Number(formData.items || 1) - 1);
    const evt = { target: { name: "items", value: nextItems } };
    handleChange(evt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extra frontend check for contactNumber
    if (!formData.contactNumber.trim()) {
      toast.error("Contact number is required");
      return;
    }

    try {
      setSaving(true);
      const path = order ? `/api/orders/${order._id}` : `/api/orders`;
      const method = order ? "PUT" : "POST";

      const isAccessory = ACCESSORY_PRICES[formData.product] !== undefined;

      const payload = {
        customerName: formData.customerName.trim(),
        contactNumber: formData.contactNumber.trim(),
        product: formData.product.trim(),
        // Quantity option removed from UI; set to 1 for all orders
        quantity: 1,
        items: Number(formData.items) || 1,
        productSpecs: formData.productSpecifications.trim(),
        deliveryInstructions: formData.deliveryInstructions.trim(),
        price: Number(price) || 0,
      };

      const data = await apiFetch(path, { method, body: payload });

      if (data && data.success) {
        toast.success("Order saved successfully");
        if (typeof onSaved === "function") onSaved(data.order);
        if (typeof refreshOrders === "function") refreshOrders();
        if (typeof onClose === "function") onClose();
      } else {
        const msg = (data && data.error) || "Failed to save order";
        toast.error(msg);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "Error saving order");
    }
    finally {
      setSaving(false);
    }
  };

  const isAccessory = ACCESSORY_PRICES[formData.product] !== undefined;

  return (
    <div className="container mt-4 p-4 border rounded bg-light">
      <h3 className="text-success mb-3">{order ? "Edit Order" : "Add New Order"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            className="form-control"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email removed as per requirements */}

        <div className="mb-2">
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            className="form-control"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
            title="Enter 10-15 digit contact number"
          />
        </div>

        <div className="mb-2">
          {prefilledProduct ? (
            <input
              type="text"
              className="form-control"
              value={formData.product}
              readOnly
            />
          ) : (
            <select
              name="product"
              className="form-select"
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Product</option>
              {ALL_PRODUCTS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          )}
        </div>
        {/* Quantity selection removed entirely */}

        <div className="mb-2">
          <label className="form-label">Items</label>
          <div className="input-group" style={{ maxWidth: 200 }}>
            <button type="button" className="btn btn-outline-secondary" onClick={decrementItems} disabled={saving || Number(formData.items) <= 1}>
              −
            </button>
            <input
              type="number"
              name="items"
              className="form-control text-center"
              min={1}
              max={100}
              value={formData.items}
              onChange={handleChange}
              required
            />
            <button type="button" className="btn btn-outline-secondary" onClick={incrementItems} disabled={saving || Number(formData.items) >= 100}>
              +
            </button>
          </div>
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="price"
            className="form-control"
            value={`LKR ${price.toLocaleString()}`}
            readOnly
          />
        </div>

        {!isAccessory && (
          <div className="mb-2">
            <textarea
              name="productSpecifications"
              placeholder="Product Specifications"
              className="form-control"
              value={formData.productSpecifications}
              onChange={handleChange}
            ></textarea>
          </div>
        )}

        <div className="mb-2">
          <textarea
            name="deliveryInstructions"
            placeholder={isAccessory ? "Address" : "Delivery Instructions"}
            className="form-control"
            value={formData.deliveryInstructions}
            onChange={handleChange}
          ></textarea>
        </div>


        <button type="submit" className="btn btn-success me-2" disabled={saving}>
          {saving ? "Saving..." : "Save Order"}
        </button>
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default OrderForm;
