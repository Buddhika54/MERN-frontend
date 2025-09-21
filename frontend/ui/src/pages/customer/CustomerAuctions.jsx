// src/pages/customer/CustomerAuctions.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../../utils/api";

export default function CustomerAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bidderName, setBidderName] = useState("");
  const [placing, setPlacing] = useState({}); // { [auctionId]: boolean }

  // Auto-bid state per auction id
  const [autoBid, setAutoBid] = useState({}); // { [auctionId]: { enabled, max, step } }
  const pollRef = useRef(null);

  const safeBidder = useMemo(() => bidderName.trim() || "Verified Buyer", [bidderName]);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/auctions");
      if (data && data.success) {
        setAuctions(data.auctions || []);
      } else {
        toast.error((data && data.error) || "Failed to load auctions");
      }
    } catch (e) {
      toast.error(e.message || "Network error loading auctions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
    // Poll every 4 seconds
    pollRef.current = setInterval(fetchAuctions, 4000);
    return () => pollRef.current && clearInterval(pollRef.current);
  }, []);

  const placeBid = async (auctionId, amount) => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Enter a valid bid amount");
      return;
    }
    setPlacing((p) => ({ ...p, [auctionId]: true }));
    try {
      const data = await apiFetch(`/api/auctions/${auctionId}/bid`, {
        method: "POST",
        body: { bidderName: safeBidder, amount: Number(amount) },
      });
      if (data && data.success) {
        toast.success("Bid placed");
        // Refresh quickly
        fetchAuctions();
        return true;
      } else {
        toast.error((data && data.error) || "Failed to place bid");
      }
    } catch (e) {
      toast.error(e.message || "Error placing bid");
    } finally {
      setPlacing((p) => ({ ...p, [auctionId]: false }));
    }
    return false;
  };

  // Auto-bid logic: if enabled and highestBid < max, place next bid = min(highestBid + step, max)
  useEffect(() => {
    const handleAutoBid = async () => {
      for (const a of auctions) {
        const cfg = autoBid[a._id];
        if (!cfg || !cfg.enabled) continue;
        if (a.status !== "Open") continue;

        const current = Number(a.highestBid || 0);
        const max = Number(cfg.max || 0);
        const step = Math.max(1, Number(cfg.step || 1));

        if (max > 0 && current < max) {
          const next = Math.min(current + step, max);
          // Avoid duplicate auto-bids if we're already the highest bidder
          if (a.highestBidder && a.highestBidder === safeBidder) continue;
          await placeBid(a._id, next);
        }
      }
    };

    // Run after every auctions update
    handleAutoBid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctions]);

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-3">Customer Auctions</h2>

      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-auto">
            <label className="form-label mb-0">Your Bidder Name</label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Company / Buyer Name"
              value={bidderName}
              onChange={(e) => setBidderName(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <span className="text-muted">Used on bids and auto-bids</span>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Live Catalog</h5>
        {loading && <span className="text-muted">Refreshing…</span>}
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-success">
            <tr>
              <th>Product</th>
              <th>Quantity (kg)</th>
              <th>Min Bid</th>
              <th>Highest Bid</th>
              <th>Highest Bidder</th>
              <th>Status</th>
              <th style={{ width: 300 }}>Bid</th>
              <th style={{ width: 360 }}>Auto-Bid</th>
            </tr>
          </thead>
          <tbody>
            {auctions.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No auctions available
                </td>
              </tr>
            )}
            {auctions.map((a) => {
              const cfg = autoBid[a._id] || { enabled: false, max: "", step: 100 };
              return (
                <AuctionRow
                  key={a._id}
                  auction={a}
                  bidderName={safeBidder}
                  placing={!!placing[a._id]}
                  cfg={cfg}
                  onChangeCfg={(next) => setAutoBid((s) => ({ ...s, [a._id]: next }))}
                  onBid={placeBid}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuctionRow({ auction, bidderName, placing, cfg, onChangeCfg, onBid }) {
  const [amount, setAmount] = useState("");
  const [localCfg, setLocalCfg] = useState(cfg);

  useEffect(() => setLocalCfg(cfg), [cfg]);

  const applyCfg = (patch) => {
    const next = { ...localCfg, ...patch };
    setLocalCfg(next);
    onChangeCfg(next);
  };

  const minNextBid = Math.max(Number(auction.minBid || 0), Number(auction.highestBid || 0) + 1);

  return (
    <tr>
      <td>
        <div className="fw-semibold">{auction.orderId?.product || "Tea"}</div>
        <div className="small text-muted">{auction.orderId?.productSpecs || "—"}</div>
      </td>
      <td>{Number(auction.orderId?.quantity || 0)}</td>
      <td>LKR {Number(auction.minBid || 0).toLocaleString()}</td>
      <td className="fw-semibold">LKR {Number(auction.highestBid || 0).toLocaleString()}</td>
      <td>{auction.highestBidder || "-"}</td>
      <td>
        {auction.status}
        <div className="small text-muted">
          {new Date(auction.startDate).toLocaleString()} → {new Date(auction.endDate).toLocaleString()}
        </div>
      </td>
      <td>
        <div className="input-group">
          <span className="input-group-text">LKR</span>
          <input
            type="number"
            className="form-control"
            min={minNextBid}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`≥ ${minNextBid}`}
            disabled={auction.status !== "Open"}
          />
          <button
            className="btn btn-primary"
            disabled={auction.status !== "Open" || placing}
            onClick={() => onBid(auction._id, Number(amount || 0))}
          >
            {placing ? "Placing…" : "Place Bid"}
          </button>
        </div>
      </td>
      <td>
        <div className="row g-2">
          <div className="col-12">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!!localCfg.enabled}
                onChange={(e) => applyCfg({ enabled: e.target.checked })}
                disabled={auction.status !== "Open"}
              />
              <label className="form-check-label ms-2">Enable auto-bid (proxy)</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-sm">
              <span className="input-group-text">Max</span>
              <input
                type="number"
                className="form-control"
                value={localCfg.max || ""}
                min={minNextBid}
                onChange={(e) => applyCfg({ max: Number(e.target.value) })}
                placeholder={`≥ ${minNextBid}`}
                disabled={!localCfg.enabled || auction.status !== "Open"}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-sm">
              <span className="input-group-text">Step</span>
              <input
                type="number"
                className="form-control"
                value={localCfg.step || 100}
                min={1}
                onChange={(e) => applyCfg({ step: Number(e.target.value) })}
                disabled={!localCfg.enabled || auction.status !== "Open"}
              />
            </div>
          </div>
          <div className="col-12 small text-muted">
            Auto-bid will place the next valid bid up to your Max using the given Step when you are outbid.
          </div>
        </div>
      </td>
    </tr>
  );
}

