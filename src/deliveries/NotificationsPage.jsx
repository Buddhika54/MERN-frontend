// src/notifications/NotificationsPage.jsx
import { useState, useEffect } from "react";

// LocalStorage key fallback
const LOCAL_STORAGE_KEY = "dms_notifications_v1";

// Sample notification types for styling
const TYPE_STYLES = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    inApp: true,
  });
  const [message, setMessage] = useState("");

  // Load notifications and settings
  useEffect(() => {
    fetchNotifications();
    fetchSettings();
  }, []);

  // Fetch notifications from API or fallback to localStorage
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notifications");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setNotifications(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } else {
        // fallback to localStorage
        const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        setNotifications(localData);
      }
    } catch (err) {
      console.error("Error fetching notifications, using localStorage fallback:", err);
      const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      setNotifications(localData);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notifications/settings");
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  const handleSettingChange = (e) => {
    const { name, checked } = e.target;
    setSettings({ ...settings, [name]: checked });
  };

  const saveSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notifications/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) setMessage("✅ Settings saved");
      else {
        const errData = await res.json();
        setMessage("❌ Error saving: " + errData.message);
      }
    } catch (err) {
      setMessage("❌ Network error: " + err.message);
    }
  };

  const markAsRead = (id) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const dismissNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-full bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            Mark All Read
          </button>
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
          </div>
          <div className="px-6 py-6">
            {message && (
              <div
                className={`p-4 mb-6 rounded-lg border ${
                  message.startsWith("✅") ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                {message}
              </div>
            )}
            <div className="space-y-4">
              {Object.keys(settings).map((key) => (
                <label className="flex items-center" key={key}>
                  <input
                    type="checkbox"
                    name={key}
                    checked={settings[key]}
                    onChange={handleSettingChange}
                    className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)} Notifications</span>
                </label>
              ))}
            </div>
            <button
              onClick={saveSettings}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Recent Notifications</h2>
            <span className="text-sm text-green-100">{notifications.filter(n => !n.read).length} unread</span>
          </div>
          <div className="px-6 py-6 space-y-4 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Loading notifications...</span>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((note) => (
                <div
                  key={note.id}
                  className={`border rounded-lg p-4 flex justify-between items-start ${
                    TYPE_STYLES[note.type || "info"]
                  } ${!note.read ? "font-semibold" : ""}`}
                >
                  <div>
                    <p className="text-gray-800">{note.title}</p>
                    <p className="text-sm text-gray-700 mt-1">{note.message}</p>
                    <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col space-y-1 ml-4">
                    {!note.read && (
                      <button
                        onClick={() => markAsRead(note.id)}
                        className="text-sm px-2 py-1 rounded bg-blue-200 hover:bg-blue-300"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => dismissNotification(note.id)}
                      className="text-sm px-2 py-1 rounded bg-red-200 hover:bg-red-300"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notifications found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
