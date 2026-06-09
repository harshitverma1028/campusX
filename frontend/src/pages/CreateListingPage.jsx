// frontend/src/pages/CreateListingPage.jsx
import React from "react";
import CreateListing from "../components/CreateListing";

export default function CreateListingPage({ token, onCreated }) {
  return (
    <div style={{ maxWidth: 860 }}>
      <div className="page-header">
        <div className="section-label">New Listing</div>
        <h1 className="section-title">Post an Item<br/><span className="grad-text">Sell Instantly.</span></h1>
        <p className="muted" style={{marginTop:12,maxWidth:480}}>
          Fill in the details below, upload a photo and set your price. Your item goes live in seconds.
        </p>
      </div>
      <CreateListing token={token} onCreated={onCreated} />
    </div>
  );
}
