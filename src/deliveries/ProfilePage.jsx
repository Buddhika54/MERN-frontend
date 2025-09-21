// ProfilePage.jsx

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contactNumber: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/profile");
      const data = await res.json();
      setProfile({
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        role: data.role
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({...profile, [name]: value});
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({...passwords, [name]: value});
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        setMessage("✅ Profile updated");
      } else {
        const errData = await res.json();
        setMessage("❌ Error: " + errData.message);
      }
    } catch (err) {
      setMessage("❌ Network error: " + err.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessage("❌ New passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/users/change-password", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });
      if (res.ok) {
        setMessage("✅ Password changed");
        setPasswords({currentPassword: "", newPassword: "", confirmNewPassword: ""});
      } else {
        const errData = await res.json();
        setMessage("❌ Error: " + errData.message);
      }
    } catch (err) {
      setMessage("❌ Network error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>

        {/* Edit Profile Info */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Update Profile</h2>
          </div>
          <div className="px-6 py-6">
            {message && (
              <div className={`p-4 mb-6 rounded-lg border ${message.startsWith("✅") ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                {message}
              </div>
            )}
            <form onSubmit={saveProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled    // assuming email is not editable
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleProfileChange}
                  pattern="^\d{10}$"
                  title="Contact number must be exactly 10 digits"
              
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              {/* Role display only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Change Password</h2>
          </div>
          <div className="px-6 py-6">
            <form onSubmit={changePassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
