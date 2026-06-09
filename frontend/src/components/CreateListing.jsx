// frontend/src/components/CreateListing.jsx
import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/api";
const categories = ["Calculator","Books","Notes","Lab Equipment","Electronics","Stationery","Other"];

export default function CreateListing({ token, onCreated }) {
  const [data, setData]       = useState({ title:"", description:"", price:"", category:"Books", condition:"used", lat:"", lng:"", photo:"" });
  const [fileName, setFileName] = useState("");
  const [preview, setPreview]   = useState(null);
  const [loading, setLoading]   = useState(false);

  function onChange(e) { const {name,value}=e.target; setData(d=>({...d,[name]:value})); }

  function handleImage(e) {
    const file = e.target.files[0]; if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => { setData(d=>({...d,photo:reader.result})); setPreview(reader.result); };
    reader.readAsDataURL(file);
  }

  function useMyLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      pos => setData(d=>({...d,lat:pos.coords.latitude.toString(),lng:pos.coords.longitude.toString()})),
      err => alert("Unable to get location: "+err.message)
    );
  }

  async function submit() {
    if (!token)                           return alert("Please login to create a listing");
    if (!data.title.trim()||!data.price)  return alert("Please provide title and price");
    if (!data.lat||!data.lng)             return alert("Please provide location");
    setLoading(true);
    try {
      await axios.post(API+"/listings", {
        title:data.title, description:data.description, price:Number(data.price),
        condition:data.condition, category:data.category, photo:data.photo, lat:data.lat, lng:data.lng
      }, { headers:{"x-auth-token":token,"Content-Type":"application/json"} });
      alert("Listing created!");
      setData({title:"",description:"",price:"",category:"Books",condition:"used",lat:"",lng:"",photo:""});
      setFileName(""); setPreview(null);
      if (onCreated) onCreated();
    } catch (err) { alert(err.response?.data?.msg||"Error creating listing"); }
    finally { setLoading(false); }
  }

  return (
    <div className="form-card">
      <div className="form-grid">
        <div className="field">
          <label>Title</label>
          <input name="title" value={data.title} onChange={onChange} placeholder="e.g. Casio FX-991ES Plus" />
        </div>
        <div className="field">
          <label>Price (₹)</label>
          <input name="price" value={data.price} onChange={onChange} placeholder="e.g. 350" type="number" />
        </div>
        <div className="field" style={{gridColumn:"1/-1"}}>
          <label>Description</label>
          <input name="description" value={data.description} onChange={onChange} placeholder="Briefly describe the item, its condition, etc." />
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" value={data.category} onChange={onChange} list="categories" placeholder="Category" />
          <datalist id="categories">{categories.map(c=><option key={c} value={c}/>)}</datalist>
        </div>
        <div className="field">
          <label>Condition</label>
          <select name="condition" value={data.condition} onChange={onChange}>
            <option value="new">New</option>
            <option value="like new">Like New</option>
            <option value="used">Used</option>
            <option value="heavily used">Heavily Used</option>
          </select>
        </div>
      </div>

      {/* Location row */}
      <div style={{marginTop:20}}>
        <label>Location</label>
        <div className="form-row">
          <input name="lat" value={data.lat} onChange={onChange} placeholder="Latitude" />
          <input name="lng" value={data.lng} onChange={onChange} placeholder="Longitude" />
          <button type="button" className="small-btn" onClick={useMyLocation} style={{flexShrink:0}}>📍 Use my location</button>
        </div>
      </div>

      {/* Photo */}
      <div style={{marginTop:20}}>
        <label>Photo</label>
        <label className="file-input-container">
          <input type="file" accept="image/*" onChange={handleImage} />
          <span className="file-input-label">Choose Image</span>
          <span className="file-input-name">{fileName||"No file chosen"}</span>
        </label>
        {preview && <img src={preview} alt="preview" className="image-preview" style={{marginTop:14}} />}
      </div>

      {/* Actions */}
      <div style={{display:"flex",gap:12,marginTop:28}}>
        <button className="btn" onClick={submit} disabled={loading}>{loading?"Posting…":"🚀 Post Listing"}</button>
        <button className="btn-ghost" onClick={()=>{ setData({title:"",description:"",price:"",category:"Books",condition:"used",lat:"",lng:"",photo:""}); setFileName(""); setPreview(null); }}>Clear</button>
      </div>
    </div>
  );
}
