// frontend/src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "📸", title: "Instant Listings", desc: "Upload a photo, set a price and go live in under 60 seconds. Your item reaches every nearby student immediately." },
  { icon: "📍", title: "Campus-Local Only", desc: "All listings are filtered to your campus radius — no shipping, no strangers, just familiar faces." },
  { icon: "💸", title: "UPI-Friendly Deals", desc: "Every listing shows the seller's UPI handle and phone. Pay directly — zero platform fees, zero middlemen." },
  { icon: "🔒", title: "Verified Students", desc: "Sign up with your college email. Every profile is a real student from your institution." },
  { icon: "🔔", title: "Real-time Alerts", desc: "Get notified the moment a wishlist item is posted. Never miss a deal again." },
  { icon: "♻️", title: "Circular Economy", desc: "Give old gear a second life. Good for your wallet and the planet." },
];

const CATEGORIES = [
  { emoji: "🧮", name: "Calculators", count: "142 listings" },
  { emoji: "📚", name: "Textbooks",   count: "318 listings" },
  { emoji: "🔬", name: "Lab Kits",    count: "87 listings"  },
  { emoji: "✏️", name: "Stationery",  count: "253 listings" },
  { emoji: "💻", name: "Electronics", count: "196 listings" },
  { emoji: "📓", name: "Notes",       count: "421 listings" },
  { emoji: "🎒", name: "Bags",        count: "74 listings"  },
  { emoji: "🩺", name: "Med Supplies",count: "59 listings"  },
];

const TESTIMONIALS = [
  { text: "Sold my Casio within 3 hours of listing. The buyer was from my own hostel block!", author: "Divya Rao", college: "IIT Bombay · CSE '26", initial: "D" },
  { text: "Saved ₹2000 on textbooks this semester — every book I needed was from seniors at half price.", author: "Rahul Sinha", college: "NIT Trichy · Mechanical '25", initial: "R" },
  { text: "UPI-direct model means I get paid instantly. No delays, no platform cuts. 10/10.", author: "Sneha Patel", college: "BITS Pilani · ECE '27", initial: "S" },
];

const TICKER_ITEMS = [
  "Casio FX-991 · ₹350","Engineering Drawing Set · ₹180","Organic Chemistry Book · ₹200",
  "Lab Coat (M) · ₹90","Scientific Notes Bundle · ₹60","Graph Sheets Pack · ₹40",
  "Laptop Stand · ₹250","Drafter Kit · ₹320",
];

const STEPS = [
  { title: "Create Your Account", desc: "Sign up with your college email. Takes 30 seconds — no fees, no lengthy verification." },
  { title: "Post a Listing",      desc: "Upload a photo, write a title, set price and UPI handle. Live instantly." },
  { title: "Browse & Discover",   desc: "Filter by category, price or distance. Find what you need within your campus." },
  { title: "Connect & Transact",  desc: "Contact the seller directly by phone. Pay via UPI, collect in person — done!" },
];

const STEP_IMGS = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
];

const CSS = `
  .hp-hero { min-height:calc(100vh - 80px); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:60px 0 40px; position:relative; overflow:hidden; }
  .hp-orb { position:absolute; border-radius:50%; filter:blur(120px); pointer-events:none; z-index:0; }
  .hp-orb1 { width:560px;height:560px;background:rgba(232,255,71,0.09);top:-120px;left:-120px; }
  .hp-orb2 { width:460px;height:460px;background:rgba(71,255,232,0.07);bottom:-80px;right:-80px; }
  .hp-badge { display:inline-flex;align-items:center;gap:8px;background:rgba(232,255,71,0.08);border:1px solid rgba(232,255,71,0.2);border-radius:50px;padding:5px 16px;font-size:12px;font-weight:500;color:#e8ff47;margin-bottom:24px;position:relative;z-index:1;animation:fadeUp .7s ease both; }
  .hp-bdot { width:6px;height:6px;border-radius:50%;background:#e8ff47;animation:pulse 2s infinite; }
  .hp-h1 { font-family:'Syne',sans-serif;font-size:clamp(52px,8.5vw,100px);font-weight:800;line-height:1.0;letter-spacing:-3px;color:#f0f0f5;position:relative;z-index:1;animation:fadeUp .8s .1s ease both; }
  .hp-sub { max-width:560px;margin:22px auto 0;font-size:17px;line-height:1.75;color:#7a7a90;font-weight:300;position:relative;z-index:1;animation:fadeUp .8s .2s ease both; }
  .hp-actions { display:flex;gap:14px;margin-top:38px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;animation:fadeUp .8s .3s ease both; }
  .hp-stats { display:flex;gap:44px;margin-top:64px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;animation:fadeUp .8s .4s ease both;border-top:1px solid rgba(255,255,255,0.07);padding-top:36px; }
  .hp-stat-num { font-family:'Syne',sans-serif;font-size:34px;font-weight:800;color:#f0f0f5;letter-spacing:-1px; }
  .hp-stat-num span { color:#e8ff47; }
  .hp-stat-label { font-size:12px;color:#7a7a90;margin-top:4px; }
  /* ticker */
  .hp-ticker { border-top:1px solid rgba(255,255,255,0.07);border-bottom:1px solid rgba(255,255,255,0.07);overflow:hidden;padding:13px 0;background:rgba(255,255,255,0.015); }
  .hp-ticker-inner { display:flex;width:max-content;animation:ticker 28s linear infinite; }
  .hp-ticker-item { display:flex;align-items:center;gap:10px;padding:0 32px;font-size:12px;font-weight:500;color:#7a7a90;white-space:nowrap; }
  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  /* trust */
  .hp-trust { display:flex;gap:28px;flex-wrap:wrap;justify-content:center;padding:32px 0;border-bottom:1px solid rgba(255,255,255,0.07); }
  .hp-trust-item { display:flex;align-items:center;gap:8px;font-size:13px;color:#7a7a90; }
  /* sections */
  .hp-sec { padding:80px 0; }
  /* features grid */
  .hp-feat-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;margin-top:52px; }
  .hp-feat-card { background:#13131a;padding:36px;position:relative;overflow:hidden;transition:background .3s; }
  .hp-feat-card::before { content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(135deg,#e8ff47,#47ffe8);transform:scaleX(0);transform-origin:left;transition:transform .4s; }
  .hp-feat-card:hover { background:#181820; }
  .hp-feat-card:hover::before { transform:scaleX(1); }
  .hp-feat-icon { width:48px;height:48px;border-radius:12px;background:rgba(232,255,71,0.08);border:1px solid rgba(232,255,71,0.15);display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:22px; }
  .hp-feat-title { font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#f0f0f5;margin-bottom:10px; }
  .hp-feat-desc { font-size:14px;color:#7a7a90;line-height:1.7;font-weight:300; }
  /* how */
  .hp-how-wrap { display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;margin-top:64px; }
  .hp-step { display:flex;gap:20px;padding:24px 0;border-bottom:1px solid rgba(255,255,255,0.07);cursor:pointer;transition:all .3s; }
  .hp-step:last-child { border-bottom:none; }
  .hp-step-num { flex-shrink:0;width:42px;height:42px;border-radius:50%;background:#13131a;border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#7a7a90;transition:all .3s; }
  .hp-step.active .hp-step-num { background:#e8ff47;border-color:#e8ff47;color:#0a0a0f; }
  .hp-step-title { font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:#7a7a90;margin-bottom:6px;transition:color .3s; }
  .hp-step.active .hp-step-title { color:#f0f0f5; }
  .hp-step-desc { font-size:13px;color:#7a7a90;line-height:1.6;font-weight:300; }
  .hp-how-visual { background:#13131a;border:1px solid rgba(255,255,255,0.07);border-radius:22px;overflow:hidden;aspect-ratio:4/3;position:relative; }
  .hp-how-visual img { width:100%;height:100%;object-fit:cover;opacity:.7;animation:fadeUp .5s ease both; }
  .hp-how-overlay { position:absolute;inset:0;background:linear-gradient(135deg,rgba(232,255,71,0.08),rgba(71,255,232,0.04)); }
  /* categories */
  .hp-cat-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-top:48px; }
  .hp-cat-card { background:#13131a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px 18px;text-align:center;cursor:pointer;transition:border-color .25s,transform .25s,box-shadow .25s;text-decoration:none;display:block; }
  .hp-cat-card:hover { border-color:rgba(232,255,71,0.3);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.4); }
  .hp-cat-emoji { font-size:30px;margin-bottom:10px;display:block; }
  .hp-cat-name { font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#f0f0f5;margin-bottom:5px; }
  .hp-cat-count { font-size:11px;color:#7a7a90; }
  /* testimonials */
  .hp-test-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;margin-top:48px; }
  .hp-test { background:#13131a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;position:relative; }
  .hp-test::before { content:'"';font-family:'Syne',sans-serif;font-size:72px;font-weight:800;color:#e8ff47;opacity:.12;position:absolute;top:-8px;right:18px;line-height:1; }
  .hp-stars { color:#e8ff47;font-size:12px;margin-bottom:14px; }
  .hp-test-text { font-size:14px;color:#f0f0f5;line-height:1.8;font-style:italic;font-weight:300;margin-bottom:20px; }
  .hp-test-author { display:flex;align-items:center;gap:12px; }
  .hp-avatar { width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#e8ff47,#47ffe8);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:15px;color:#0a0a0f;flex-shrink:0; }
  .hp-author-name { font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#f0f0f5; }
  .hp-author-college { font-size:11px;color:#7a7a90;margin-top:2px; }
  /* cta */
  .hp-cta { background:linear-gradient(135deg,rgba(232,255,71,0.07),rgba(71,255,232,0.05));border:1px solid rgba(232,255,71,0.14);border-radius:26px;padding:64px 48px;text-align:center;position:relative;overflow:hidden;margin-top:80px; }
  .hp-cta::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 0%,rgba(232,255,71,0.07),transparent);pointer-events:none; }
  .hp-cta-title { font-family:'Syne',sans-serif;font-size:clamp(26px,4vw,48px);font-weight:800;letter-spacing:-2px;color:#f0f0f5;position:relative;z-index:1; }
  .hp-cta-sub { font-size:16px;color:#7a7a90;margin:14px auto 36px;max-width:460px;line-height:1.7;font-weight:300;position:relative;z-index:1; }
  .hp-cta-actions { display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1; }
  @media(max-width:900px){ .hp-how-wrap{grid-template-columns:1fr} .hp-h1{font-size:52px;letter-spacing:-2px} }
  @media(max-width:600px){ .hp-stats{gap:24px} .hp-cta{padding:40px 24px} }
`;

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* ── Hero ── */}
      <section className="hp-hero">
        <div className="hp-orb hp-orb1" />
        <div className="hp-orb hp-orb2" />
        <div className="hp-badge"><span className="hp-bdot" /> Now live across 40+ campuses in India</div>
        <h1 className="hp-h1">The Student<br/>Marketplace<br/><span className="grad-text">Built for Campus.</span></h1>
        <p className="hp-sub">Buy and sell calculators, textbooks, lab kits and stationery with students who live right next door. No shipping. No fees. Fast, trusted deals on campus.</p>
        <div className="hp-actions">
          <Link to="/listings" className="btn">Browse Listings →</Link>
          <Link to="/create"   className="btn-outline">Sell an Item</Link>
        </div>
        <div className="hp-stats">
          {[["12K+","Active Students"],["3K+","Items Listed"],["40+","Campuses"],["₹0","Platform Fees"]].map(([n,l])=>(
            <div key={l}>
              <div className="hp-stat-num">{n}</div>
              <div className="hp-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="hp-ticker">
        <div className="hp-ticker-inner">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i)=>(
            <div className="hp-ticker-item" key={i}>
              <svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2.5" fill="#e8ff47"/></svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust bar ── */}
      <div className="hp-trust">
        {[["🎓","College email verified"],["🔒","Zero platform fees"],["📍","Campus-only listings"],["⚡","Instant UPI payments"],["♻️","Sustainable resale"],["📱","Works on any device"]].map(([icon,label])=>(
          <div className="hp-trust-item" key={label}><span>{icon}</span>{label}</div>
        ))}
      </div>

      {/* ── Features ── */}
      <section className="hp-sec">
        <div className="section-label">Why CampusX</div>
        <h2 className="section-title">Everything students need<br/><span className="grad-text">in one place.</span></h2>
        <div className="hp-feat-grid">
          {FEATURES.map(f=>(
            <div className="hp-feat-card" key={f.title}>
              <div className="hp-feat-icon">{f.icon}</div>
              <div className="hp-feat-title">{f.title}</div>
              <p className="hp-feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="hp-sec" style={{paddingTop:0}}>
        <div className="section-label">How it Works</div>
        <h2 className="section-title">From listing to deal<br/><span className="grad-text">in four steps.</span></h2>
        <div className="hp-how-wrap">
          <div>
            {STEPS.map((s,i)=>(
              <div key={i} className={`hp-step${activeStep===i?" active":""}`} onClick={()=>setActiveStep(i)}>
                <div className="hp-step-num">{String(i+1).padStart(2,"0")}</div>
                <div><div className="hp-step-title">{s.title}</div><p className="hp-step-desc">{s.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="hp-how-visual">
            <img src={STEP_IMGS[activeStep]} alt="step" key={activeStep} />
            <div className="hp-how-overlay" />
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="hp-sec" style={{paddingTop:0}}>
        <div className="section-label">Categories</div>
        <h2 className="section-title">Find what you need<br/><span className="grad-text">by category.</span></h2>
        <div className="hp-cat-grid">
          {CATEGORIES.map(c=>(
            <Link to="/listings" className="hp-cat-card" key={c.name}>
              <span className="hp-cat-emoji">{c.emoji}</span>
              <div className="hp-cat-name">{c.name}</div>
              <div className="hp-cat-count">{c.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="hp-sec" style={{paddingTop:0}}>
        <div className="section-label">Student Reviews</div>
        <h2 className="section-title">Loved by students<br/><span className="grad-text">across India.</span></h2>
        <div className="hp-test-grid">
          {TESTIMONIALS.map(t=>(
            <div className="hp-test" key={t.author}>
              <div className="hp-stars">★★★★★</div>
              <p className="hp-test-text">"{t.text}"</p>
              <div className="hp-test-author">
                <div className="hp-avatar">{t.initial}</div>
                <div><div className="hp-author-name">{t.author}</div><div className="hp-author-college">{t.college}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="hp-cta">
        <h2 className="hp-cta-title">Ready to buy or sell?</h2>
        <p className="hp-cta-sub">Join 12,000+ students saving money and making extra cash on campus. Completely free.</p>
        <div className="hp-cta-actions">
          <Link to="/create"   className="btn">List Your Item — Free →</Link>
          <Link to="/listings" className="btn-outline">Explore Marketplace</Link>
        </div>
      </div>
    </>
  );
}
