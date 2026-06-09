// frontend/src/pages/MyListingsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function MyListingsPage({ token }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading]   = useState(false);

  async function fetchMy() {
    setLoading(true);
    try {
      const res = await axios.get(API + "/listings/my", {
        headers: { "x-auth-token": localStorage.getItem("token") || token || "" }
      });
      setListings(res.data || []);
    } catch (err) {
      alert(err.response?.data?.msg || "Error fetching your listings");
    } finally { setLoading(false); }
  }

  useEffect(() => { if (token || localStorage.getItem("token")) fetchMy(); }, [token]);

  async function markAsSold(id) {
    if (!window.confirm("Mark this listing as SOLD?")) return;
    try {
      await axios.put(`${API}/listings/mark-sold/${id}`, {}, {
        headers: { "x-auth-token": localStorage.getItem("token") || token || "" }
      });
      fetchMy();
    } catch (err) { alert(err.response?.data?.msg || "Error marking as sold"); }
  }

  async function deleteListing(id) {
    if (!window.confirm("Delete this listing permanently?")) return;
    try {
      await axios.delete(`${API}/listings/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") || token || "" }
      });
      fetchMy();
    } catch (err) { alert(err.response?.data?.msg || "Error deleting"); }
  }

  return (
    <div>
      <div className="page-header">
        <div className="section-label">Dashboard</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16}}>
          <h1 className="section-title">My Listings<br/><span className="grad-text">Manage Yours.</span></h1>
          <Link to="/create" className="btn">+ New Listing</Link>
        </div>
        <p className="muted" style={{marginTop:12}}>Mark items as sold or delete them once your deal is done.</p>
      </div>

      {loading && <div className="spinner">Loading your listings…</div>}

      {!loading && listings.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No listings yet</h3>
          <p className="muted" style={{marginBottom:24}}>Post your first item and start selling to students near you.</p>
          <Link to="/create" className="btn">Create your first listing →</Link>
        </div>
      )}

      <div className="listings">
        {listings.map(it => (
          <div key={it._id} className="listing-card fade-up">
            {it.photo && <img src={it.photo} className="listing-img" alt={it.title} />}
            <div className="listing-main">
              <span className="listing-tag">{it.category || "Item"}</span>
              <h3 className="listing-title">
                {it.title}
                {!it.available && <span className="sold-badge">SOLD</span>}
              </h3>
              <p className="listing-desc">{it.description}</p>
              <div className="listing-price">₹ {it.price}</div>
              <div className="seller-info">
                <strong>Condition:</strong> {it.condition}<br/>
                <strong>Phone:</strong> {it.sellerPhone || it.seller?.phone || "—"}
              </div>
              <div className="listing-actions">
                {it.available
                  ? <button className="btn-ghost" onClick={() => markAsSold(it._id)}>✓ Mark as Sold</button>
                  : <button className="btn-ghost" disabled>SOLD</button>
                }
                <button className="btn-ghost" style={{borderColor:"rgba(255,107,107,0.3)",color:"#ff6b6b"}} onClick={() => deleteListing(it._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
