// src/components/Admin/Sales.jsx
import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../utils/api";

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function isSameDay(a, b = new Date()) {
  const da = new Date(a), db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
}

function isSameWeek(a, b = new Date()) {
  const da = new Date(a), db = new Date(b);
  const dayMs = 24 * 60 * 60 * 1000;
  const startOfWeek = new Date(db);
  startOfWeek.setHours(0, 0, 0, 0);
  const day = startOfWeek.getDay();
  const diffToMon = (day + 6) % 7; // Monday as start
  startOfWeek.setTime(startOfWeek.getTime() - diffToMon * dayMs);
  const endOfWeek = new Date(startOfWeek.getTime() + 7 * dayMs);
  return da >= startOfWeek && da < endOfWeek;
}

function isSameMonth(a, b = new Date()) {
  const da = new Date(a), db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth();
}

export default function Sales() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/api/orders");
        if (data?.success) setOrders(data.orders || []);
        else setError(data?.error || "Failed to fetch orders");
      } catch (e) {
        setError(e.message || "Network error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const metrics = useMemo(() => {
    const paid = orders; // assuming all orders are sales; adjust if there's a paid flag later

    const todayOrders = paid.filter(o => isSameDay(o.createdAt));
    const weekOrders = paid.filter(o => isSameWeek(o.createdAt));
    const monthOrders = paid.filter(o => isSameMonth(o.createdAt));

    const todayRevenue = sum(todayOrders.map(o => Number(o.price || 0)));
    const weekRevenue = sum(weekOrders.map(o => Number(o.price || 0)));
    const monthRevenue = sum(monthOrders.map(o => Number(o.price || 0)));

    const pending = orders.filter(o => (o.status || "Pending") === "Pending");

    // Top selling products (by items count)
    const productMap = new Map();
    for (const o of paid) {
      const key = o.product || "Unknown";
      const qty = Number(o.items || 1);
      productMap.set(key, (productMap.get(key) || 0) + qty);
    }
    const topProducts = Array.from(productMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const recent = [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    return {
      counts: {
        today: todayOrders.length,
        week: weekOrders.length,
        month: monthOrders.length,
      },
      revenue: { today: todayRevenue, week: weekRevenue, month: monthRevenue },
      pendingCount: pending.length,
      topProducts,
      recent,
    };
  }, [orders]);

  if (loading) return <div className="container mt-4">Loading sales...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-3">Sales Overview</h2>

      {/* Summary cards */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Sales (Today)</h6>
              <div className="fs-4 fw-bold">{metrics.counts.today}</div>
              <div className="small text-secondary">Revenue: LKR {metrics.revenue.today.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Sales (This Week)</h6>
              <div className="fs-4 fw-bold">{metrics.counts.week}</div>
              <div className="small text-secondary">Revenue: LKR {metrics.revenue.week.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Sales (This Month)</h6>
              <div className="fs-4 fw-bold">{metrics.counts.month}</div>
              <div className="small text-secondary">Revenue: LKR {metrics.revenue.month.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Pending Orders</h6>
              <div className="fs-4 fw-bold">{metrics.pendingCount}</div>
              <div className="small text-secondary">Awaiting processing or delivery</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Top Selling Products */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Top-Selling Products</h5>
              {metrics.topProducts.length ? (
                <>
                  {/* Simple horizontal bar chart */}
                  {(() => {
                    const maxQty = Math.max(...metrics.topProducts.map(([, q]) => q), 1);
                    return (
                      <div>
                        {metrics.topProducts.map(([name, qty]) => (
                          <div key={name} className="mb-2">
                            <div className="d-flex justify-content-between">
                              <span className="small text-muted">{name}</span>
                              <span className="small fw-semibold">{qty}</span>
                            </div>
                            <div className="progress" style={{ height: 10 }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${Math.round((qty / maxQty) * 100)}%` }}
                                aria-valuenow={qty}
                                aria-valuemin="0"
                                aria-valuemax={maxQty}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="text-muted">No sales data yet</div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Recent Transactions</h5>
              {metrics.recent.length ? (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Items</th>
                        <th>Total (LKR)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.recent.map((o) => (
                        <tr key={o._id}>
                          <td>{new Date(o.createdAt).toLocaleString()}</td>
                          <td>{o.customerName}</td>
                          <td>{o.product}</td>
                          <td>{o.items}</td>
                          <td>{Number(o.price || 0).toLocaleString()}</td>
                          <td>{o.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-muted">No recent orders</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue mini chart */}
      <div className="row g-3 mt-3">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Revenue (Today / Week / Month)</h5>
              {(() => {
                const series = [
                  { label: "Today", value: metrics.revenue.today },
                  { label: "Week", value: metrics.revenue.week },
                  { label: "Month", value: metrics.revenue.month },
                ];
                const maxVal = Math.max(...series.map(s => s.value), 1);
                return (
                  <div className="d-flex align-items-end" style={{ gap: 16, height: 160 }}>
                    {series.map((s) => (
                      <div key={s.label} className="text-center" style={{ flex: 1 }}>
                        <div
                          className="bg-success"
                          style={{
                            height: `${Math.max(6, Math.round((s.value / maxVal) * 120))}px`,
                            borderRadius: 6,
                          }}
                          title={`${s.label}: LKR ${s.value.toLocaleString()}`}
                        />
                        <div className="small mt-2 fw-semibold">{s.label}</div>
                        <div className="small text-muted">LKR {s.value.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
