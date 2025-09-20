import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

//Inventory 
export const getItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
// ===== Purchase Requests =====
export const getPRs = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/inventory/purchaserequests`);
    return res.data;
  } catch (err) {
    console.error("Error fetching PRs:", err);
    return [];
  }
};

export const approvePR = async (prId, supplierId) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/inventory/purchaserequests/approve`, { prId, supplierId });
    return res.data;
  } catch (err) {
    console.error("Error approving PR:", err);
    return null;
  }
};

// Purchase Orders 
export const getPOs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/purchaseorders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching POs:", error);
    return [];
  }
};

export const updateDeliveryStatus = async (poId, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/purchaseorders/${poId}/update-status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating delivery status:", error);
    return null;
  }
};

// Suppliers
export const getSuppliers = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/suppliers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return [];
  }
};

export const deleteSupplier = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/suppliers/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return null;
  }
};

// Warehouses 
export const getWarehouses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/warehouses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return [];
  }
};

export const deleteWarehouse = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/warehouses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting warehouse:", error);
    return null;
  }
};

//  Notifications 
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markAsRead = async (notifId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notifications/mark-read/${notifId}`);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }
};

//  Dashboard 
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { totalItems: 0, lowStock: 0, outOfStock: 0 };
  }
};

//  Inventory Flow 
export const getInventoryFlow = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/flow`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory flow:", error);
    return [];
  }
};

// Low Stock Report
export const getLowStockReport = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/low-stock`);
    return response.data;
  } catch (error) {
    console.error("Error fetching low stock report:", error);
    return [];
  }
};

//  Generic POST / PUT / DELETE
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    return null;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error putting to ${endpoint}:`, error);
    return null;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ${endpoint}:`, error);
    return null;
  }
};
