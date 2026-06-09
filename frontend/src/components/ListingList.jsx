// frontend/src/components/ListingList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
const API = "http://localhost:5000/api";

export default function ListingList({ token, refreshKey }) {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => { fetchListings(); }, [refreshKey]);

  async function fetchListings() {
    setLoading(true);
    try {
      const res = await axios.get(API + "/listings");
      setItems(res.data);
    } catch { alert("Error loading listings"); }
    setLoading(false);
  }

  async function markAsSold(id) {
    const tok = localStorage.getItem("token");
    if (!tok) { alert("Login required"); return; }
    if (!window.confirm("Mark this listing as SOLD?")) return;
    try {
      const headers = { "x-auth-token": tok, "Authorization": `Bearer ${tok}`, "Content-Type": "application/json" };
      const res = await axios.put(`${API}/listings/mark-sold/${id}`, {}, { headers });
      alert(res.data?.msg || "Marked as sold");
      fetchListings();
    } catch (err) { alert(err.response?.data?.msg || err.message); }
  }

  async function deleteListing(id) {
    if (!token) { alert("Please login"); return; }
    if (!window.confirm("Do you really want to delete this listing?")) return;
    try {
      await axios.delete(`${API}/listings/${id}`, { headers: { "x-auth-token": token } });
      alert("Listing deleted");
      fetchListings();
    } catch { alert("Error deleting"); }
  }

  if (loading) return <div className="spinner">Loading listings…</div>;

  if (items.length === 0)
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🛍️</div>
        <h3>No listings yet</h3>
        <p className="muted">Be the first to post something!</p>
      </div>
    );

  return (
    <div className="listings">
      {items.map(it => {
        const seller  = it.seller;
        const isOwner = user && (user._id === seller?._id || user.id === seller?._id);
        return (
          <div key={it._id} className="listing-card fade-up">
            <img src={it.photo} className="listing-img" alt={it.title} />
            <div className="listing-main">
              <span className="listing-tag">{it.category || "Item"}</span>
              <h3 className="listing-title">
                {it.title}
                {!it.available && <span className="sold-badge">SOLD</span>}
              </h3>
              <p className="listing-desc">{it.description}</p>
              <div className="listing-price">₹ {it.price}</div>
              <div className="seller-info">
                <strong>Seller:</strong> {seller?.name}<br/>
                <strong>Phone:</strong> {seller?.phone}
              </div>
              <div className="listing-actions">
                {!isOwner && it.available && (
                  <a href={`tel:${seller?.phone}`} className="btn">📞 Contact Seller</a>
                )}
                {isOwner && it.available && (
                  <>
                    <button className="btn-ghost" onClick={() => markAsSold(it._id)}>✓ Mark as Sold</button>
                    <button className="btn-ghost" style={{borderColor:"rgba(255,107,107,0.3)",color:"#ff6b6b"}} onClick={() => deleteListing(it._id)}>Delete</button>
                  </>
                )}
                {!it.available && <button className="btn-ghost" disabled>SOLD</button>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
