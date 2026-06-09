// frontend/src/pages/ListingsPage.jsx
import React from "react";
import ListingList from "../components/ListingList";
import { Link } from "react-router-dom";

export default function ListingsPage({ token, refreshKey }) {
  return (
    <div>
      <div className="page-header">
        <div className="section-label">Marketplace</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16 }}>
          <h1 className="section-title">All Listings<br/><span className="grad-text">Near You.</span></h1>
          <Link to="/create" className="btn">+ Post an Item</Link>
        </div>
        <p className="muted" style={{marginTop:12,maxWidth:520}}>
          Browse items posted by students on your campus. Contact sellers directly and pay via UPI — zero fees.
        </p>
      </div>
      <ListingList token={token} refreshKey={refreshKey} />
    </div>
  );
}
