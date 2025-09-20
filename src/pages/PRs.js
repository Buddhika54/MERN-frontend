import React, { useEffect, useState } from "react";
import { getPRs, approvePR } from "../services/api";
import "./PRs.css";

const PRs = () => {
  const [prs, setPRs] = useState([]);

  useEffect(() => { fetchPRs(); }, []);

  const fetchPRs = async () => {
    try {
      const data = await getPRs();
      setPRs(data);
    } catch (err) { console.error(err); }
  };

  const handleApprove = async (prId) => {
    try {
      await approvePR(prId);
      fetchPRs();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="pr-list-container">
      <div className="pr-card">
        <h2>Purchase Requests</h2>
        <table className="pr-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prs.map(pr => (
              <tr key={pr._id}>
                <td>{pr.item?.name}</td>
                <td>{pr.quantity}</td>
                <td>{pr.status}</td>
                <td>
                  {pr.status === "pending" && (
                    <button className="approve-btn" onClick={() => handleApprove(pr._id)}>Approve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PRs; 
