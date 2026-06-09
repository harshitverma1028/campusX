// frontend/src/components/Auth.jsx  — logic UNCHANGED, wrapper only re-styled
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name:"", email:"", password:"", phone:"", college:"" });
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = location.state?.from?.pathname || "/";

  function updateField(e) { const {name,value}=e.target; setForm(f=>({...f,[name]:value})); }

  async function submit() {
    try {
      setLoading(true);
      const url = API + (isLogin ? "/auth/login" : "/auth/register");
      const payload = isLogin
        ? { email:form.email, password:form.password }
        : { name:form.name, email:form.email, password:form.password, phone:form.phone, college:form.college };
      const res   = await axios.post(url, payload);
      const token = res.data?.token;
      const user  = res.data?.user;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user",  JSON.stringify(user||{}));
        axios.defaults.headers.common["x-auth-token"]   = token;
        axios.defaults.headers.common["Authorization"]  = `Bearer ${token}`;
        if (typeof onLoginSuccess==="function") onLoginSuccess(token, user);
        alert(isLogin?"Logged in":"Registered and logged in");
        navigate(from, { replace:true });
      } else {
        alert("Unexpected response: "+JSON.stringify(res.data));
      }
    } catch (err) {
      alert(err.response?.data?.msg||err.message||"Error");
    } finally { setLoading(false); }
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {!isLogin && (
        <input name="name" value={form.name} onChange={updateField} placeholder="Full name" />
      )}
      <input name="email"    value={form.email}    onChange={updateField} placeholder="Enter your email" />
      <input name="password" value={form.password} onChange={updateField} placeholder="Password" type="password" />
      {!isLogin && (
        <>
          <input name="phone"   value={form.phone}   onChange={updateField} placeholder="Phone" />
          <input name="college" value={form.college} onChange={updateField} placeholder="College name" />
        </>
      )}
      <div style={{display:"flex",gap:10,marginTop:4}}>
        <button onClick={submit} disabled={loading} className="btn" style={{flex:1}}>
          {loading ? (isLogin?"Logging in…":"Registering…") : (isLogin?"Login →":"Create Account →")}
        </button>
        <button onClick={()=>setIsLogin(!isLogin)} className="btn-ghost">
          {isLogin?"Register":"Login"}
        </button>
      </div>
    </div>
  );
}
