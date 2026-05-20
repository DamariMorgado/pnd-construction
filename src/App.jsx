import { useEffect, useMemo, useState } from "react";

/* ── Repair card illustrations matching the design ── */
const RepairIllustration = ({
  circleColor = "#2a2a2a",
  pentagonColor = "#6aaa50",
}) => (
  <svg
    viewBox="0 0 320 160"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
  >
    <rect width="320" height="160" fill="#f0f0ec" />
    <circle cx="120" cy="80" r="48" fill={circleColor} />
    <polygon
      points="210,30 270,55 280,110 230,140 175,115"
      fill={pentagonColor}
    />
    <path
      d="M60 130 Q160 115 260 130"
      fill="none"
      stroke="#b0b0b0"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// To add real photos: replace the `photos` arrays with actual image paths
// e.g. photos: ["/images/wall-hole-1.jpg", "/images/wall-hole-2.jpg"]
const REPAIRS = [
  {
    title: "Wall Holes",
    description:
      "Damage from accidental impact, furniture bumps, and doorknobs.",
    circleColor: "#2a2a2a",
    pentagonColor: "#5a9e42",
    photos: [], // add image paths here
  },
  {
    title: "Water Damage",
    description:
      "Stained ceilings and softened drywall after roof or plumbing leaks.",
    circleColor: "#b08050",
    pentagonColor: "#5a9e42",
    photos: ["/images/water1.jpg", "/images/water2.jpg", "/images/water3.jpg"],
  },
  {
    title: "Cracks",
    description:
      "Settling cracks, seam separation, and recurring stress lines.",
    circleColor: "#2a2a2a",
    pentagonColor: "#72b458",
    photos: [],
  },
  {
    title: "Sheetrock",
    description:
      "Raised fasteners, impact dents, and small surface imperfections.",
    circleColor: "#888",
    pentagonColor: "#5a9e42",
    photos: [],
  },
  {
    title: "Old Bad Repairs",
    description: "Previous patch jobs that look uneven, rough, or obvious.",
    circleColor: "#888",
    pentagonColor: "#4a8e38",
    photos: [],
  },
  {
    title: "Texture Issues",
    description:
      "Texture mismatches that need blending after a drywall repair.",
    circleColor: "#888",
    pentagonColor: "#72b458",
    photos: [],
  },
];

/* ── Lightbox / Carousel Modal ── */
function RepairModal({ repair, onClose }) {
  const [current, setCurrent] = useState(0);
  const hasPhotos = repair.photos && repair.photos.length > 0;
  const total = hasPhotos ? repair.photos.length : 0;

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + total) % total);
  const next = () => setCurrent((p) => (p + 1) % total);

  return (
    <div
      style={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={styles.modalBox}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <p style={styles.modalEyebrow}>Common Repair</p>
            <h3 style={styles.modalTitle}>{repair.title}</h3>
          </div>
          <button style={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Image area */}
        <div style={styles.modalImgWrap}>
          {hasPhotos ? (
            <img
              src={repair.photos[current]}
              alt={`${repair.title} ${current + 1}`}
              style={styles.modalImg}
            />
          ) : (
            /* Placeholder shown until real photos are added */
            <div style={styles.modalPlaceholder}>
              <RepairIllustration
                circleColor={repair.circleColor}
                pentagonColor={repair.pentagonColor}
              />
              <p style={styles.placeholderLabel}>📸 Photos coming soon</p>
            </div>
          )}

          {/* Prev / Next arrows — only shown when photos exist */}
          {hasPhotos && total > 1 && (
            <>
              <button style={{ ...styles.arrow, left: 12 }} onClick={prev}>
                ‹
              </button>
              <button style={{ ...styles.arrow, right: 12 }} onClick={next}>
                ›
              </button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        {hasPhotos && total > 1 && (
          <div style={styles.dots}>
            {repair.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  ...styles.dot,
                  background: i === current ? "#4fa33d" : "#d0d0cc",
                }}
              />
            ))}
          </div>
        )}

        {/* Description + counter */}
        <div style={styles.modalFooter}>
          <p style={styles.modalDesc}>{repair.description}</p>
          {hasPhotos && total > 1 && (
            <p style={styles.modalCounter}>
              {current + 1} / {total}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 900,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backdropFilter: "blur(4px)",
  },
  modalBox: {
    background: "#fff",
    borderRadius: 24,
    width: "100%",
    maxWidth: 560,
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
    animation: "modalIn 0.2s ease",
  },
  modalHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "20px 20px 16px",
    borderBottom: "1px solid #e0e0dc",
  },
  modalEyebrow: {
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "#4fa33d",
    marginBottom: 4,
  },
  modalTitle: { fontSize: 22, fontWeight: 900, color: "#111" },
  modalClose: {
    background: "#f0f0ec",
    border: "none",
    borderRadius: 9999,
    width: 36,
    height: 36,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#555",
    flexShrink: 0,
    transition: "background 0.2s",
  },
  modalImgWrap: {
    position: "relative",
    background: "#f0f0ec",
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  modalImg: { width: "100%", height: "100%", objectFit: "cover" },
  modalPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#888",
    marginTop: 12,
    letterSpacing: "0.05em",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    borderRadius: 9999,
    width: 40,
    height: 40,
    fontSize: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    padding: "12px 0 4px",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  modalFooter: {
    padding: "14px 20px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  modalDesc: { fontSize: 14, lineHeight: 1.6, color: "#666" },
  modalCounter: {
    fontSize: 13,
    fontWeight: 700,
    color: "#4fa33d",
    whiteSpace: "nowrap",
  },
};

const DEFAULT_CONTENT = {
  brandName: "PND Construction",
  brandTag: "Drywall Repair",
  heroEyebrow: "Drywall repairs first. Renovations and paint second.",
  heroTitle: "Your Local Drywall Repair Experts.",
  heroHighlight: "Drywall Repair Experts.",
  heroDesc:
    "PND Construction specializes in drywall repair for walls and ceilings, including cracks, holes, water damage, texture matching, and clean paint-ready finishing.",
  heroPhoneLabel: "All your drywall needs are just a phone call away.",
  phone: "(602) 849-6384",
  serviceArea: "Phoenix and surrounding areas",
  email: "you@example.com",
  adminPassword: "PNDadmin123",
  contactHeading: "Need drywall repair? Let's take a look.",
  contactDesc:
    "Send a quick message with what needs to be fixed. Photos help, but a short description is enough to start.",
  services: [
    {
      title: "Drywall Repair",
      desc: "Holes, cracks, water damage, popped nails, dents, and damaged corners repaired cleanly and professionally.",
      featured: true,
    },
    {
      title: "Texture Matching",
      desc: "We blend repaired areas into the surrounding wall or ceiling for a smoother finished look.",
      featured: false,
    },
    {
      title: "Renovations",
      desc: "Small renovation projects and drywall-related improvement work handled with the same detail-focused approach.",
      featured: false,
    },
    {
      title: "Paint Touch-Ups",
      desc: "Clean touch-ups and repainting around repaired areas to help the finish feel complete.",
      featured: false,
    },
  ],
  reasons: [
    "Drywall-first positioning that feels more specialized and trustworthy.",
    "A green, black, white, and gray palette that matches the brand direction.",
    "Clear hierarchy that keeps renovations and paint as secondary services.",
    "Clean calls to action that help customers request an estimate quickly.",
  ],
  process: [
    {
      step: "01",
      title: "Call or Send Photos",
      text: "Tell us what happened and send a few photos of the area that needs repair.",
    },
    {
      step: "02",
      title: "Get a Straightforward Quote",
      text: "We review the repair, explain the scope clearly, and give you a simple estimate.",
    },
    {
      step: "03",
      title: "Repair, Blend, and Finish",
      text: "We patch, sand, match texture, and leave the area looking clean and professional.",
    },
  ],
};

const STORAGE_KEY = "pnd-content-v1";
const SUBS_KEY = "pnd-submissions-v1";

/* ── Reusable field components ── */
function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function App() {
  const [activeRepair, setActiveRepair] = useState(null); // controls lightbox
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [subs, setSubs] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", details: "" });
  const [formMsg, setFormMsg] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");

  /* Load from localStorage */
  useEffect(() => {
    try {
      const c = localStorage.getItem(STORAGE_KEY);
      const s = localStorage.getItem(SUBS_KEY);
      if (c) setContent(JSON.parse(c));
      if (s) setSubs(JSON.parse(s));
    } catch {}
  }, []);

  /* Persist to localStorage */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);
  useEffect(() => {
    localStorage.setItem(SUBS_KEY, JSON.stringify(subs));
  }, [subs]);

  const stats = useMemo(
    () => [
      { label: "Primary Service", value: "Drywall Repair" },
      { label: "Secondary Services", value: "Renovations + Paint" },
      { label: "Customer Goal", value: "Flawless Finished Walls" },
    ],
    [],
  );

  /* Content updaters */
  const set = (key, val) => setContent((prev) => ({ ...prev, [key]: val }));
  const setArr = (key, i, field, val) =>
    setContent((prev) => ({
      ...prev,
      [key]: prev[key].map((item, idx) =>
        idx === i ? { ...item, [field]: val } : item,
      ),
    }));
  const setReason = (i, val) =>
    setContent((prev) => ({
      ...prev,
      reasons: prev.reasons.map((r, idx) => (idx === i ? val : r)),
    }));

  /* Form submit */
  const submitForm = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.details) return;
    setSubs((prev) => [
      { id: Date.now(), date: new Date().toLocaleString(), ...form },
      ...prev,
    ]);
    setForm({ name: "", phone: "", details: "" });
    setFormMsg("Message sent! We'll be in touch soon.");
    setTimeout(() => setFormMsg(""), 3000);
  };

  /* Admin login */
  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === content.adminPassword) {
      setLoggedIn(true);
      setPwError("");
      setPwInput("");
    } else {
      setPwError("Incorrect password.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPwInput("");
    setPwError("");
  };

  return (
    <>
      {/* ── Admin toggle ── */}
      <button className="admin-toggle" onClick={() => setAdminOpen((p) => !p)}>
        {adminOpen ? "Close Admin" : "Admin"}
      </button>

      {/* ── Admin panel ── */}
      {adminOpen && (
        <div className="admin-overlay">
          <div className="admin-panel">
            <div className="admin-head">
              <div className="admin-head-left">
                <img
                  src="/pndlogo.png"
                  alt="PND Construction"
                  style={{
                    width: 44,
                    height: 44,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
                <div>
                  <div className="admin-head-title">Admin Dashboard</div>
                  <div className="admin-head-sub">Manage Website Content</div>
                </div>
              </div>
              {loggedIn && (
                <button className="btn-logout" onClick={handleLogout}>
                  Log Out
                </button>
              )}
            </div>

            <div className="admin-body">
              {!loggedIn ? (
                <div className="admin-section">
                  <h3>Admin Login</h3>
                  <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
                    Enter your password to edit site content and view quote
                    requests.
                  </p>
                  <form
                    onSubmit={handleLogin}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <Field
                      label="Password"
                      value={pwInput}
                      onChange={setPwInput}
                      type="password"
                    />
                    {pwError && <p className="admin-error">{pwError}</p>}
                    <button type="submit" className="btn-login">
                      Log In
                    </button>
                  </form>
                  <p className="admin-hint">
                    Demo password: <strong>{content.adminPassword}</strong>
                  </p>
                </div>
              ) : (
                <>
                  {/* Site Settings */}
                  <div className="admin-section">
                    <h3>Site Settings</h3>
                    <div className="admin-grid2">
                      <Field
                        label="Business Name"
                        value={content.brandName}
                        onChange={(v) => set("brandName", v)}
                      />
                      <Field
                        label="Brand Tag"
                        value={content.brandTag}
                        onChange={(v) => set("brandTag", v)}
                      />
                      <Field
                        label="Phone"
                        value={content.phone}
                        onChange={(v) => set("phone", v)}
                      />
                      <Field
                        label="Service Area"
                        value={content.serviceArea}
                        onChange={(v) => set("serviceArea", v)}
                      />
                      <Field
                        label="Email"
                        value={content.email}
                        onChange={(v) => set("email", v)}
                      />
                      <Field
                        label="Admin Password"
                        value={content.adminPassword}
                        onChange={(v) => set("adminPassword", v)}
                        type="password"
                      />
                    </div>
                  </div>

                  {/* Hero */}
                  <div className="admin-section admin-section-white">
                    <h3>Hero Section</h3>
                    <div className="admin-stack">
                      <Field
                        label="Eyebrow Text"
                        value={content.heroEyebrow}
                        onChange={(v) => set("heroEyebrow", v)}
                      />
                      <Field
                        label="Headline"
                        value={content.heroTitle}
                        onChange={(v) => set("heroTitle", v)}
                      />
                      <TextArea
                        label="Description"
                        value={content.heroDesc}
                        onChange={(v) => set("heroDesc", v)}
                      />
                      <Field
                        label="Phone Label"
                        value={content.heroPhoneLabel}
                        onChange={(v) => set("heroPhoneLabel", v)}
                      />
                    </div>
                  </div>

                  {/* Services */}
                  <div className="admin-section admin-section-white">
                    <h3>Services</h3>
                    <div className="admin-stack">
                      {content.services.map((s, i) => (
                        <div key={i} className="admin-card">
                          <Field
                            label={`Service ${i + 1} Name`}
                            value={s.title}
                            onChange={(v) => setArr("services", i, "title", v)}
                          />
                          <TextArea
                            label="Description"
                            value={s.desc}
                            onChange={(v) => setArr("services", i, "desc", v)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Us */}
                  <div className="admin-section admin-section-white">
                    <h3>Why Choose Us</h3>
                    <div className="admin-stack">
                      {content.reasons.map((r, i) => (
                        <Field
                          key={i}
                          label={`Reason ${i + 1}`}
                          value={r}
                          onChange={(v) => setReason(i, v)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="admin-section admin-section-white">
                    <h3>Process Steps</h3>
                    <div className="admin-stack">
                      {content.process.map((p, i) => (
                        <div key={i} className="admin-card">
                          <Field
                            label={`Step ${i + 1} Title`}
                            value={p.title}
                            onChange={(v) => setArr("process", i, "title", v)}
                          />
                          <TextArea
                            label="Description"
                            value={p.text}
                            onChange={(v) => setArr("process", i, "text", v)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="admin-section admin-section-white">
                    <h3>Contact Section</h3>
                    <div className="admin-stack">
                      <Field
                        label="Heading"
                        value={content.contactHeading}
                        onChange={(v) => set("contactHeading", v)}
                      />
                      <TextArea
                        label="Description"
                        value={content.contactDesc}
                        onChange={(v) => set("contactDesc", v)}
                      />
                    </div>
                  </div>

                  {/* Inbox */}
                  <div className="admin-section admin-section-white">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <h3 style={{ margin: 0 }}>Quote Request Inbox</h3>
                      <button className="btn-clear" onClick={() => setSubs([])}>
                        Clear All
                      </button>
                    </div>
                    <div className="admin-stack">
                      {subs.length === 0 ? (
                        <div className="inbox-empty">
                          No quote requests yet.
                        </div>
                      ) : (
                        subs.map((s) => (
                          <div key={s.id} className="inbox-item">
                            <div className="inbox-item-head">
                              <span className="inbox-name">{s.name}</span>
                              <span className="inbox-date">{s.date}</span>
                            </div>
                            <p className="inbox-phone">📞 {s.phone}</p>
                            <p className="inbox-details">{s.details}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          PUBLIC WEBSITE
      ══════════════════════════════ */}

      {/* HERO */}
      <section className="hero">
        <div className="hero-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
          <div className="shape shape-4" />
          <div className="shape shape-5" />
        </div>

        {/* Nav */}
        <nav className="nav">
          <div className="nav-logo">
            <img
              src="/pndlogo.png"
              alt="PND Construction"
              style={{
                width: 80,
                height: 80,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
            <div>
              <div className="nav-logo-tag">{content.brandTag}</div>
              <div className="nav-logo-name">{content.brandName}</div>
            </div>
          </div>

          <ul className="nav-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#why">Why Us</a>
            </li>
            <li>
              <a href="#process">Process</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <a href="#contact" className="btn-nav-cta">
            Request Estimate
          </a>
        </nav>

        {/* Hero body */}
        <div className="hero-body">
          <div>
            <div className="hero-eyebrow">{content.heroEyebrow}</div>
            <h1 className="hero-h1">{content.heroTitle}</h1>
            <p className="hero-desc">{content.heroDesc}</p>
            <div className="hero-btns">
              <a href="#contact" className="btn-hero-primary">
                Request a Free Estimate
              </a>
              <a href="#services" className="btn-hero-secondary">
                Explore Services
              </a>
            </div>
            <p className="hero-phone-label">{content.heroPhoneLabel}</p>
            <a
              href={`tel:${content.phone.replace(/\D/g, "")}`}
              className="hero-phone"
            >
              {content.phone}
            </a>
            <div className="hero-tags">
              <div className="hero-tag">Drywall Repair Specialists</div>
              <div className="hero-tag">Texture Matching</div>
              <div className="hero-tag">Clean, No-Nonsense Service</div>
            </div>
          </div>

          {/* Hero card */}
          <div className="hero-card-wrap">
            <div className="hero-card">
              <div className="hero-card-top">
                <div>
                  <div className="hero-card-label">Most Requested</div>
                  <div className="hero-card-title">Drywall Repairs</div>
                </div>
                <div className="hero-card-badge">Specialist Focus</div>
              </div>
              <div className="hero-list">
                {[
                  "Wall and ceiling holes",
                  "Cracks and seam issues",
                  "Water damage restoration",
                  "Texture blending",
                  "Paint-ready finishing",
                ].map((item) => (
                  <div key={item} className="hero-list-item">
                    <div className="hero-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="hero-also">
                <div className="hero-also-label">Also Available</div>
                <div className="hero-also-text">
                  Small renovations and light paint work that support the repair
                  and finishing process.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={i < stats.length - 1 ? "stat-divider" : ""}
              style={{ padding: "8px 0" }}
            >
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="services-bg" id="services">
        <div className="section">
          <div className="eyebrow">Services</div>
          <h2 className="section-title">
            A cleaner look built around
            <br />
            drywall repair.
          </h2>
          <p className="section-desc">
            The page uses green, black, white, and gray tones that keep the
            brand feeling consistent and professional.
          </p>
          <div className="services-grid">
            {content.services.map((s, i) => (
              <div
                key={i}
                className={`service-card${s.featured ? " featured" : ""}`}
              >
                <div className="service-badge">
                  {s.featured ? "Featured" : "Service"}
                </div>
                <div className="service-name">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REPAIR LIGHTBOX MODAL */}
      {activeRepair !== null && (
        <RepairModal
          repair={REPAIRS[activeRepair]}
          onClose={() => setActiveRepair(null)}
        />
      )}

      {/* COMMON REPAIRS */}
      <div className="repairs-bg">
        <div className="section">
          <div className="eyebrow">Common Repairs</div>
          <h2 className="section-title">
            The drywall issues customers
            <br />
            call about most.
          </h2>
          <p className="section-desc">
            Click any card to see photos. This section helps visitors recognize
            their problem quickly.
          </p>
          <div className="repairs-grid">
            {REPAIRS.map((r, i) => (
              <div
                key={i}
                className="repair-card"
                onClick={() => setActiveRepair(i)}
                style={{ cursor: "pointer" }}
              >
                <div className="repair-illustration">
                  <RepairIllustration
                    circleColor={r.circleColor}
                    pentagonColor={r.pentagonColor}
                  />
                </div>
                <div className="repair-body">
                  <div className="repair-title">{r.title}</div>
                  <div className="repair-desc">{r.description}</div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#4fa33d",
                      marginTop: 8,
                    }}
                  >
                    View photos →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="why-bg" id="why">
        <div className="section">
          <div className="why-grid">
            <div className="why-dark-card">
              <div className="eyebrow" style={{ color: "#8ccf5a" }}>
                Why This Works Better
              </div>
              <h2 className="section-title">
                Positioned like a drywall specialist, not a general contractor.
              </h2>
              <p className="section-desc">
                The updated palette and messaging feel sharper, more focused,
                and more aligned with your logo and ad style while still looking
                modern and professional.
              </p>
            </div>
            <div className="why-reasons">
              {content.reasons.map((r, i) => (
                <div key={i} className="why-reason">
                  <div className="why-num">{i + 1}</div>
                  <div className="why-text">{r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div
        style={{
          background:
            "linear-gradient(180deg, #1e3d1a 0%, #1a3316 25%, #152810 50%, #0f1e0b 75%, #080e06 90%, #111 100%)",
        }}
        className="section-full"
        id="process"
      >
        <div className="section-inner">
          <div className="eyebrow eyebrow-light">Process</div>
          <h2 className="section-title" style={{ color: "#fff" }}>
            Simple from first call
            <br />
            to final finish.
          </h2>
          <div className="process-cards">
            {content.process.map((p, i) => (
              <div key={i} className="process-card">
                <div className="process-step">0 {i + 1}</div>
                <div className="process-title">{p.title}</div>
                <div className="process-text">{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BEFORE / AFTER */}
      <div className="ba-bg">
        <div className="section">
          <div className="ba-grid">
            <div>
              <div className="eyebrow">Before / After Area</div>
              <h2 className="section-title">
                A strong place for your repair photos.
              </h2>
              <p className="section-desc">
                Real project photos here will make the drywall specialty even
                more obvious and build trust fast.
              </p>
            </div>
            <div className="ba-cards">
              <div className="ba-card">
                <div className="ba-card-head">
                  <span className="ba-badge-before">Before</span>
                  <span className="ba-side-label">Drywall Damage</span>
                </div>
                <div
                  className="ba-img"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f0f0ec",
                  }}
                >
                  <RepairIllustration
                    circleColor="#2a2a2a"
                    pentagonColor="#5a9e42"
                  />
                </div>
              </div>
              <div className="ba-arrow-wrap">
                <div className="ba-arrow">Before → After</div>
              </div>
              <div className="ba-card">
                <div className="ba-card-head">
                  <span className="ba-badge-after">After</span>
                  <span className="ba-side-label">Clean Finished Repair</span>
                </div>
                <div
                  className="ba-img"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f0f0ec",
                  }}
                >
                  <RepairIllustration
                    circleColor="#aaa"
                    pentagonColor="#8ccf5a"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT THE OWNER */}
      <div style={{ background: "#111", padding: "80px 0" }}>
        <div className="section-inner">
          <div
            style={{
              background:
                "linear-gradient(160deg, #1a1a1a 0%, #1c1c1c 50%, #2a4a1e 100%)",
              borderRadius: 28,
              padding: "48px",
              border: "1px solid rgba(79,163,61,0.2)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.35em",
                color: "#4fa33d",
                marginBottom: 16,
              }}
            >
              About The Owner
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 20,
                maxWidth: 600,
              }}
            >
              Built on honest work, clean repairs, and treating customers right.
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.7)",
                maxWidth: 680,
                marginBottom: 36,
              }}
            >
              Hi, I'm Juan, owner of PND Construction. I started this company
              with the goal of providing drywall repairs that homeowners can
              feel confident about. I believe in showing up on time,
              communicating clearly, and leaving every repair looking clean and
              professional. From small wall patches to larger drywall damage
              repairs, I treat every project like it's in my own home. My focus
              has always been quality work, fair pricing, and making sure
              customers feel comfortable throughout the process.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Locally owned and operated",
                "Focused primarily on drywall repair and texture matching",
                "Clean workmanship and respectful service",
                "Honest communication and straightforward pricing",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "rgba(79,163,61,0.12)",
                    border: "1px solid rgba(79,163,61,0.25)",
                    borderRadius: 12,
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#4fa33d",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}
                    >
                      ✓
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div
        style={{
          background: "#141414",
          position: "relative",
          overflow: "hidden",
        }}
        id="contact"
      >
        {/* Same diagonal shapes as hero */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: "-5%",
              width: "55%",
              background: "rgba(255,255,255,0.04)",
              transform: "skewX(-12deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: "8%",
              width: "35%",
              background: "rgba(255,255,255,0.035)",
              transform: "skewX(-12deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: "18%",
              width: "20%",
              height: "70%",
              background: "rgba(100,160,80,0.18)",
              transform: "skewX(-12deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: "26%",
              width: "10%",
              height: "50%",
              background: "rgba(130,190,100,0.14)",
              transform: "skewX(-12deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: "32%",
              width: "6%",
              height: "35%",
              background: "rgba(160,210,130,0.12)",
              transform: "skewX(-12deg)",
            }}
          />
        </div>
        <div
          className="contact-inner"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.35em",
                color: "#4fa33d",
                marginBottom: 12,
              }}
            >
              Get Started
            </div>
            <h2 className="contact-title">{content.contactHeading}</h2>
            <p className="contact-desc">{content.contactDesc}</p>
            {formMsg && (
              <p
                className="save-msg"
                style={{ color: "#4fa33d", marginTop: 16 }}
              >
                {formMsg}
              </p>
            )}
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(79,163,61,0.25)",
              backdropFilter: "blur(12px)",
              borderRadius: 32,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#4fa33d",
                  marginBottom: 6,
                }}
              >
                Phone
              </div>
              <div style={{ fontSize: 19, fontWeight: 900, color: "#fff" }}>
                {content.phone}
              </div>
            </div>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#4fa33d",
                  marginBottom: 6,
                }}
              >
                Service Area
              </div>
              <div style={{ fontSize: 19, fontWeight: 900, color: "#fff" }}>
                {content.serviceArea}
              </div>
            </div>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#4fa33d",
                  marginBottom: 6,
                }}
              >
                Email
              </div>
              <div style={{ fontSize: 19, fontWeight: 900, color: "#fff" }}>
                {content.email}
              </div>
            </div>
            <form className="contact-form" onSubmit={submitForm}>
              <input
                className="contact-input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                }}
              />
              <input
                className="contact-input"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                }}
              />
              <textarea
                className="contact-textarea"
                placeholder="Tell us about the repair you need"
                rows={5}
                value={form.details}
                onChange={(e) =>
                  setForm((p) => ({ ...p, details: e.target.value }))
                }
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                }}
              />
              <button
                type="submit"
                className="btn-submit"
                style={{ background: "#4fa33d" }}
              >
                Request Estimate
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
