// src/pages/customer/CustomerSales.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export default function CustomerSales() {
  // Sample data (can be replaced with API-driven data later)
  const monthlySales = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1500 },
    { month: "Mar", sales: 1800 },
    { month: "Apr", sales: 2200 },
    { month: "May", sales: 2500 },
    { month: "Jun", sales: 2800 },
  ];

  const teaTypes = [
    { name: "Black Tea", value: 45 },
    { name: "Green Tea", value: 25 },
    { name: "Herbal Tea", value: 20 },
    { name: "Others", value: 10 },
  ];

  const regionalSales = [
    { region: "Sri Lanka", sales: 1500 },
    { region: "Asia", sales: 3000 },
    { region: "Europe", sales: 2200 },
    { region: "USA", sales: 1800 },
  ];

  const yearlyTrend = [
    { year: 2021, sales: 8000 },
    { year: 2022, sales: 12000 },
    { year: 2023, sales: 16000 },
    { year: 2024, sales: 21000 },
  ];

  const totals = useMemo(() => {
    const totalPacks = 10500; // mock
    const totalRevenue = 12000000; // LKR, mock
    const customers = 7800; // mock
    return { totalPacks, totalRevenue, customers };
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center fw-bold mb-1">Our Journey in Numbers</h1>
      <p className="text-center text-muted mb-4">Discover how tea lovers worldwide have chosen us.</p>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="fw-semibold">Total Sales</h5>
              <div className="display-6 text-success">{totals.totalPacks.toLocaleString()}+</div>
              <div className="small text-muted">Tea Packs Sold Worldwide</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="fw-semibold">Revenue</h5>
              <div className="display-6 text-success">LKR {totals.totalRevenue.toLocaleString()}+</div>
              <div className="small text-muted">Across Global Markets</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="fw-semibold">Customers Served</h5>
              <div className="display-6 text-success">{totals.customers.toLocaleString()}+</div>
              <div className="small text-muted">And Counting!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-3 mb-3">
        {/* Monthly Sales (bars) */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Monthly Sales Growth</h5>
              {(() => {
                const max = Math.max(...monthlySales.map(m => m.sales), 1);
                return (
                  <div style={{ height: 260 }} className="d-flex align-items-end gap-2">
                    {monthlySales.map(m => (
                      <div key={m.month} className="text-center" style={{ flex: 1 }}>
                        <div
                          className="bg-success"
                          style={{ height: Math.max(10, Math.round((m.sales / max) * 180)), borderRadius: 6 }}
                          title={`${m.month}: ${m.sales.toLocaleString()}`}
                        />
                        <div className="small mt-2 fw-semibold">{m.month}</div>
                        <div className="small text-muted">{m.sales.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Tea Types (percent bars) */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Top Selling Tea Types</h5>
              <div>
                {teaTypes.map(t => (
                  <div key={t.name} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="small fw-semibold">{t.name}</span>
                      <span className="small text-muted">{t.value}%</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div className="progress-bar bg-success" style={{ width: `${t.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional and Yearly */}
      <div className="row g-3">
        {/* Regional Sales (bars) */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Sales by Region</h5>
              {(() => {
                const max = Math.max(...regionalSales.map(r => r.sales), 1);
                return (
                  <div>
                    {regionalSales.map(r => (
                      <div key={r.region} className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span className="small fw-semibold">{r.region}</span>
                          <span className="small text-muted">{r.sales.toLocaleString()}</span>
                        </div>
                        <div className="progress" style={{ height: 10 }}>
                          <div className="progress-bar" style={{ width: `${Math.round((r.sales / max) * 100)}%`, backgroundColor: "#6c63ff" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Yearly Trend (mini columns) */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Yearly Trend</h5>
              {(() => {
                const max = Math.max(...yearlyTrend.map(y => y.sales), 1);
                return (
                  <div style={{ height: 220 }} className="d-flex align-items-end gap-3 justify-content-around">
                    {yearlyTrend.map(y => (
                      <div key={y.year} className="text-center" style={{ width: 60 }}>
                        <div
                          className="bg-success"
                          style={{ height: Math.max(12, Math.round((y.sales / max) * 160)), borderRadius: 6 }}
                          title={`${y.year}: ${y.sales.toLocaleString()}`}
                        />
                        <div className="small mt-2 fw-semibold">{y.year}</div>
                        <div className="small text-muted">{y.sales.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Trust elements */}
              <div className="mt-4">
                <div className="row g-2">
                  <div className="col-12 col-sm-4">
                    <div className="p-3 bg-light rounded text-center">
                      <div className="fw-bold">⭐ 1000+ Happy Customers</div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="p-3 bg-light rounded text-center">
                      <div className="fw-bold">🏆 Certified Quality</div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="p-3 bg-light rounded text-center">
                      <div className="fw-bold">📦 Premium Packaging</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center my-4">
        <h3 className="fw-bold">Join thousands of tea lovers who choose us every day!</h3>
        <p className="text-muted">Be part of our journey and enjoy authentic Ceylon Tea.</p>
        <Link to="/customer/accessories" className="btn btn-success btn-lg">
          Order Now
        </Link>
      </div>
    </div>
  );
}
