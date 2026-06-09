// frontend/src/pages/LoginPage.jsx
import React from "react";
import Auth from "../components/Auth";

const CSS = `
  .login-pg { min-height:calc(100vh - 80px); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px; position:relative; }
  .login-orb { position:absolute; border-radius:50%; filter:blur(110px); pointer-events:none; z-index:0; }
  .login-orb1 { width:500px;height:500px;background:rgba(232,255,71,0.08);top:-100px;left:-100px; }
  .login-orb2 { width:400px;height:400px;background:rgba(71,255,232,0.06);bottom:-80px;right:-80px; }
  .login-card { position:relative;z-index:1;width:100%;max-width:440px;background:#13131a;border:1px solid rgba(255,255,255,0.07);border-radius:24px;padding:44px 40px;box-shadow:0 40px 80px rgba(0,0,0,0.6);animation:fadeUp .7s ease both; }
  .login-card::before { content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:60%;height:1px;background:linear-gradient(90deg,transparent,#e8ff47,transparent);border-radius:50%; }
  .login-badge { display:inline-flex;align-items:center;gap:8px;background:rgba(232,255,71,0.08);border:1px solid rgba(232,255,71,0.2);border-radius:50px;padding:5px 16px;font-size:11px;font-weight:600;color:#e8ff47;margin-bottom:22px;text-transform:uppercase;letter-spacing:.5px; }
  .login-bdot { width:6px;height:6px;border-radius:50%;background:#e8ff47;animation:pulse 2s infinite; }
  .login-title { font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#f0f0f5;letter-spacing:-1px;line-height:1.1;margin-bottom:8px; }
  .login-sub { font-size:13px;color:#7a7a90;line-height:1.6;font-weight:300;margin-bottom:28px; }
  .login-divider { height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px; }
  .login-trust { display:flex;gap:8px;flex-wrap:wrap;margin-top:24px; }
  .login-pill { display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:50px;padding:4px 12px;font-size:11px;color:#7a7a90; }
  .login-footer { text-align:center;margin-top:18px;font-size:12px;color:#7a7a90;position:relative;z-index:1;animation:fadeUp .7s .15s ease both; }
  .login-footer a { color:#e8ff47;text-decoration:none;font-weight:500; }

  /* ── Override Auth inner box ── */
  .login-card .auth-inner { background:transparent !important; border:none !important; padding:0 !important; }
  .login-card input { background:rgba(255,255,255,0.04) !important; border:1px solid rgba(255,255,255,0.1) !important; border-radius:12px !important; color:#f0f0f5 !important; font-family:'DM Sans',sans-serif !important; font-size:14px !important; padding:12px 16px !important; margin-bottom:0 !important; }
  .login-card input::placeholder { color:#7a7a90 !important; }
  .login-card input:focus { border-color:rgba(232,255,71,0.4) !important; box-shadow:0 0 0 3px rgba(232,255,71,0.07) !important; background:rgba(255,255,255,0.06) !important; }
  .login-card h2 { display:none !important; }
  .login-card .btn { background:#e8ff47 !important; color:#0a0a0f !important; border:none !important; border-radius:50px !important; padding:13px 28px !important; font-family:'Syne',sans-serif !important; font-weight:700 !important; font-size:14px !important; width:100% !important; margin-top:4px !important; transition:transform .2s,box-shadow .3s !important; }
  .login-card .btn:hover { transform:translateY(-2px) !important; box-shadow:0 16px 40px rgba(232,255,71,0.25) !important; }
  .login-card button:not(.btn) { background:rgba(255,255,255,0.04) !important; border:1px solid rgba(255,255,255,0.1) !important; color:#7a7a90 !important; border-radius:50px !important; padding:10px 20px !important; font-family:'DM Sans',sans-serif !important; font-size:13px !important; cursor:pointer !important; transition:border-color .2s !important; }
  .login-card button:not(.btn):hover { border-color:rgba(255,255,255,0.22) !important; color:#f0f0f5 !important; }
  .login-card > div > div { display:flex !important; flex-direction:column !important; gap:12px !important; }
  .login-card > div > div > div { display:flex !important; gap:10px !important; flex-direction:row !important; }
`;

export default function LoginPage({ onLoginSuccess }) {
  return (
    <>
      <style>{CSS}</style>
      <div className="login-pg">
        <div className="login-orb login-orb1" />
        <div className="login-orb login-orb2" />

        <div className="login-card">
          <div className="login-badge"><span className="login-bdot" />Student-only marketplace</div>
          <h2 className="login-title">Welcome to <span className="grad-text">CampusX</span></h2>
          <p className="login-sub">Sign in or create your free account to start buying and selling campus essentials with students near you.</p>
          <div className="login-divider" />
          <Auth onLoginSuccess={onLoginSuccess} />
          <div className="login-trust">
            {["🔒 Secure","✉️ College email","₹0 Fees","⚡ Instant access"].map(t=>(
              <div className="login-pill" key={t}>{t}</div>
            ))}
          </div>
        </div>

        <p className="login-footer">
          By continuing you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </>
  );
}
