import React, { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../services/api";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) { console.error(err); }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      fetchNotifications();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      <ul className="notif-list">
        {notifications.map(n => (
          <li key={n._id} className={n.read ? "read" : "unread"}>
            {n.message} 
            {!n.read && <button onClick={() => handleMarkRead(n._id)}>Mark as Read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
