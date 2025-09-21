// src/components/Auctions/AuctionsList.jsx
import React, { useEffect, useState } from "react";
import AuctionForm from "./AuctionForm";
import { toast } from "react-toastify";
import { apiFetch } from "../../utils/api";

export default function AuctionsList() {
  const [auctions, setAuctions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [closing, setClosing] = useState({}); // { [id]: boolean }

  const fetchAuctions = async () => {
    try {
      const data = await apiFetch("/api/auctions");
      if (data && data.success) {
        setAuctions(data.auctions);
      } else {
        toast.error((data && data.error) || "Failed to fetch auctions");
      }
    } catch (err) {
      console.error("Error fetching auctions:", err);
      toast.error(err.message || "Network error while fetching auctions");
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Auctions</h3>
      <button
        className="btn btn-success mb-3"
        onClick={() => setShowForm(true)}
      >
        Create New Auction
      </button>

      {showForm && (
        <AuctionForm
          onClose={() => {
            setShowForm(false);
            fetchAuctions();
          }}
        />
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order</th>
            <th>Start</th>
            <th>End</th>
            <th>Min Bid</th>
            <th>Highest Bid</th>
            <th>Highest Bidder</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((auction) => (
            <tr key={auction._id}>
              <td>{auction.orderId?.product || "N/A"}</td>
              <td>{new Date(auction.startDate).toLocaleString()}</td>
              <td>{new Date(auction.endDate).toLocaleString()}</td>
              <td>{auction.minBid}</td>
              <td>{auction.highestBid}</td>
              <td>{auction.highestBidder || "-"}</td>
              <td>{auction.status}</td>
              <td>
                {auction.status === "Open" && (
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={!!closing[auction._id]}
                    onClick={async () => {
                      try {
                        setClosing((s) => ({ ...s, [auction._id]: true }));
                        const data = await apiFetch(`/api/auctions/${auction._id}/close`, { method: "PUT" });
                        if (data && data.success) {
                          toast.success("Auction closed");
                          fetchAuctions();
                        } else {
                          toast.error((data && data.error) || "Failed to close auction");
                        }
                      } catch (e) {
                        toast.error(e.message || "Error closing auction");
                      } finally {
                        setClosing((s) => ({ ...s, [auction._id]: false }));
                      }
                    }}
                  >
                    {closing[auction._id] ? "Closing…" : "Close"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
