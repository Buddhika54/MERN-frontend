import React, { useState, useEffect } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdVisibility,
  MdSearch,
  MdFilterList,
  MdRefresh,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdTrendingUp,
  MdTrendingDown,
  MdClose,
  MdSave
} from 'react-icons/md';
import api from '../services/api';
import './InventoryList.css';

const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [stockUpdateItem, setStockUpdateItem] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    unit: 'kg',
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    unitCost: 0,
    sellingPrice: 0,
    location: {
      warehouse: '',
      shelf: '',
      row: ''
    },
    supplier: ''
  });

  // Stock update form
  const [stockForm, setStockForm] = useState({
    type: 'receive',
    quantity: 0,
    notes: '',
    performedBy: 'admin'
  });

  // Unique filter values
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    warehouses: [],
    suppliers: []
  });

  useEffect(() => {
    fetchInventoryItems();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [inventoryItems, searchTerm, categoryFilter, statusFilter, warehouseFilter]);

  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/inventory');
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setError('Failed to load inventory items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const [inventoryResponse, suppliersResponse] = await Promise.all([
        api.get('/inventory'),
        api.get('/suppliers')
      ]);

      const items = inventoryResponse.data;
      const suppliers = suppliersResponse.data;

      const categories = [...new Set(items.map(item => item.category).filter(Boolean))];
      const warehouses = [...new Set(items.map(item => item.location?.warehouse).filter(Boolean))];

      setFilterOptions({
        categories,
        warehouses,
        suppliers
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const applyFilters = () => {
    let filtered = inventoryItems;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Warehouse filter
    if (warehouseFilter !== 'all') {
      filtered = filtered.filter(item => item.location?.warehouse === warehouseFilter);
    }

    setFilteredItems(filtered);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    resetForm();
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      itemName: item.itemName || '',
      description: item.description || '',
      category: item.category || '',
      unit: item.unit || 'kg',
      currentStock: item.currentStock || 0,
      minimumStock: item.minimumStock || 0,
      maximumStock: item.maximumStock || 0,
      unitCost: item.unitCost || 0,
      sellingPrice: item.sellingPrice || 0,
      location: {
        warehouse: item.location?.warehouse || '',
        shelf: item.location?.shelf || '',
        row: item.location?.row || ''
      },
      supplier: item.supplier?._id || ''
    });
    setShowModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      try {
        await api.delete(`/inventory/${itemId}`);
        alert('Item deleted successfully!');
        fetchInventoryItems();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/inventory/${editingItem.itemId}`, formData);
        alert('Item updated successfully!');
      } else {
        await api.post('/inventory', formData);
        alert('Item added successfully!');
      }
      setShowModal(false);
      fetchInventoryItems();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    }
  };

  const handleStockUpdate = (item) => {
    setStockUpdateItem(item);
    setStockForm({
      type: 'receive',
      quantity: 0,
      notes: '',
      performedBy: 'admin'
    });
    setShowStockModal(true);
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/inventory/${stockUpdateItem.itemId}/update-stock`, stockForm);
      alert('Stock updated successfully!');
      setShowStockModal(false);
      fetchInventoryItems();
    } catch (error) {
      console.error('Error updating stock:', error);
      alert(`Failed to update stock: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      description: '',
      category: '',
      unit: 'kg',
      currentStock: 0,
      minimumStock: 0,
      maximumStock: 0,
      unitCost: 0,
      sellingPrice: 0,
      location: {
        warehouse: '',
        shelf: '',
        row: ''
      },
      supplier: ''
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock':
        return <MdCheckCircle className="status-icon success" />;
      case 'low_stock':
        return <MdWarning className="status-icon warning" />;
      case 'out_of_stock':
        return <MdError className="status-icon danger" />;
      default:
        return <MdCheckCircle className="status-icon" />;
    }
  };

  const getStockTrend = (current, minimum) => {
    const percentage = (current / minimum) * 100;
    if (percentage > 150) return <MdTrendingUp className="trend-icon positive" />;
    if (percentage < 80) return <MdTrendingDown className="trend-icon negative" />;
    return null;
  };

  if (loading) {
    return (
      <div className="inventory-list">
        <div className="page-header">
          <h2>Inventory Management</h2>
        </div>
        <div className="loading">Loading inventory items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inventory-list">
        <div className="page-header">
          <h2>Inventory Management</h2>
        </div>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchInventoryItems} className="btn btn-primary">
            <MdRefresh /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-list">
      <div className="page-header">
        <h2>Inventory Management</h2>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleAddItem}>
            <MdAdd /> Add New Item
          </button>
          <button className="btn btn-outline" onClick={fetchInventoryItems}>
            <MdRefresh /> Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-content">
            <h3>Total Items</h3>
            <div className="card-value">{inventoryItems.length}</div>
          </div>
        </div>
        <div className="card card-success">
          <div className="card-content">
            <h3>In Stock</h3>
            <div className="card-value">
              {inventoryItems.filter(item => item.status === 'in_stock').length}
            </div>
          </div>
        </div>
        <div className="card card-warning">
          <div className="card-content">
            <h3>Low Stock</h3>
            <div className="card-value">
              {inventoryItems.filter(item => item.status === 'low_stock').length}
            </div>
          </div>
        </div>
        <div className="card card-danger">
          <div className="card-content">
            <h3>Out of Stock</h3>
            <div className="card-value">
              {inventoryItems.filter(item => item.status === 'out_of_stock').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <div className="search-input-wrapper">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search items by name, ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <MdFilterList className="filter-icon" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {filterOptions.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Warehouses</option>
              {filterOptions.warehouses.map(warehouse => (
                <option key={warehouse} value={warehouse}>{warehouse}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table-container">
        {filteredItems.length > 0 ? (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Location</th>
                <th>Supplier</th>
                <th>Unit Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item._id} className={`row-${item.status}`}>
                  <td className="item-id">{item.itemId}</td>
                  <td className="item-name">
                    <div className="item-info">
                      <strong>{item.itemName}</strong>
                      {item.description && (
                        <small className="item-description">{item.description}</small>
                      )}
                    </div>
                  </td>
                  <td className="category">{item.category}</td>
                  <td className="stock-info">
                    <div className="stock-details">
                      <span className="current-stock">{item.currentStock}</span>
                      <small className="stock-limits">
                        Min: {item.minimumStock} | Max: {item.maximumStock}
                      </small>
                      {getStockTrend(item.currentStock, item.minimumStock)}
                    </div>
                  </td>
                  <td>{item.unit}</td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(item.status)}
                      <span className={`status-text ${item.status}`}>
                        {item.status?.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="location">
                    <div className="location-info">
                      <strong>{item.location?.warehouse}</strong>
                      <small>{item.location?.shelf}-{item.location?.row}</small>
                    </div>
                  </td>
                  <td className="supplier">{item.supplier?.name || 'N/A'}</td>
                  <td className="cost">${item.unitCost?.toFixed(2)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-small btn-info"
                        onClick={() => handleEditItem(item)}
                        title="Edit Item"
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="btn-small btn-success"
                        onClick={() => handleStockUpdate(item)}
                        title="Update Stock"
                      >
                        <MdTrendingUp />
                      </button>
                      <button
                        className="btn-small btn-danger"
                        onClick={() => handleDeleteItem(item.itemId)}
                        title="Delete Item"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <p>No inventory items found matching your criteria.</p>
            <button className="btn btn-primary" onClick={handleAddItem}>
              <MdAdd /> Add Your First Item
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Item Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <MdClose />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="item-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Item Name *</label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="pcs">Pieces (pcs)</option>
                    <option value="boxes">Boxes</option>
                    <option value="liters">Liters</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Supplier</label>
                  <select
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  >
                    <option value="">Select Supplier</option>
                    {filterOptions.suppliers.map(supplier => (
                      <option key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Current Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label>Minimum Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label>Maximum Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maximumStock}
                    onChange={(e) => setFormData({ ...formData, maximumStock: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label>Unit Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.unitCost}
                    onChange={(e) => setFormData({ ...formData, unitCost: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label>Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="location-group">
                <h4>Location Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Warehouse</label>
                    <input
                      type="text"
                      value={formData.location.warehouse}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, warehouse: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Shelf</label>
                    <input
                      type="text"
                      value={formData.location.shelf}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, shelf: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Row</label>
                    <input
                      type="text"
                      value={formData.location.row}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, row: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <MdSave /> {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Update Modal */}
      {showStockModal && (
        <div className="modal-overlay" onClick={() => setShowStockModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Stock - {stockUpdateItem?.itemName}</h3>
              <button className="close-btn" onClick={() => setShowStockModal(false)}>
                <MdClose />
              </button>
            </div>
            
            <form onSubmit={handleStockSubmit} className="stock-form">
              <div className="current-stock-info">
                <p><strong>Current Stock:</strong> {stockUpdateItem?.currentStock} {stockUpdateItem?.unit}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-badge ${stockUpdateItem?.status}`}>
                    {stockUpdateItem?.status?.replace('_', ' ').toUpperCase()}
                  </span>
                </p>
              </div>

              <div className="form-group">
                <label>Transaction Type</label>
                <select
                  value={stockForm.type}
                  onChange={(e) => setStockForm({ ...stockForm, type: e.target.value })}
                  required
                >
                  <option value="receive">Receive Stock</option>
                  <option value="issue">Issue/Sell Stock</option>
                  <option value="adjustment">Stock Adjustment</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  {stockForm.type === 'adjustment' ? 'New Stock Level' : 'Quantity'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={stockForm.quantity}
                  onChange={(e) => setStockForm({ ...stockForm, quantity: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={stockForm.notes}
                  onChange={(e) => setStockForm({ ...stockForm, notes: e.target.value })}
                  placeholder="Add notes about this stock transaction..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowStockModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <MdSave /> Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryList;