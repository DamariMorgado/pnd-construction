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

const REPAIRS = [
  {
    title: "Wall Holes",
    description:
      "Damage from accidental impact, furniture bumps, and doorknobs.",
    circleColor: "#2a2a2a",
    pentagonColor: "#5a9e42",
  },
  {
    title: "Water Damage",
    description:
      "Stained ceilings and softened drywall after roof or plumbing leaks.",
    circleColor: "#b08050",
    pentagonColor: "#5a9e42",
  },
  {
    title: "Cracks",
    description:
      "Settling cracks, seam separation, and recurring stress lines.",
    circleColor: "#2a2a2a",
    pentagonColor: "#72b458",
  },
  {
    title: "Nail Pops & Dents",
    description:
      "Raised fasteners, impact dents, and small surface imperfections.",
    circleColor: "#888",
    pentagonColor: "#5a9e42",
  },
  {
    title: "Old Bad Repairs",
    description: "Previous patch jobs that look uneven, rough, or obvious.",
    circleColor: "#888",
    pentagonColor: "#4a8e38",
  },
  {
    title: "Texture Issues",
    description:
      "Texture mismatches that need blending after a drywall repair.",
    circleColor: "#888",
    pentagonColor: "#72b458",
  },
];

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
                <div
                  style={{ background: "#fff", borderRadius: 12, padding: 8 }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="100" height="100" rx="20" fill="#111" />
                    <polygon
                      points="15,85 15,30 40,10 85,10 85,55 60,85"
                      fill="#4fa33d"
                    />
                    <polygon
                      points="15,85 15,30 40,10 85,10 85,55 60,85"
                      fill="url(#stripes)"
                      opacity="0.4"
                    />
                    <defs>
                      <pattern
                        id="stripes"
                        width="10"
                        height="10"
                        patternTransform="rotate(45)"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="10"
                          stroke="#fff"
                          strokeWidth="4"
                        />
                      </pattern>
                    </defs>
                    <text
                      x="28"
                      y="68"
                      fontFamily="Arial Black, sans-serif"
                      fontWeight="900"
                      fontSize="36"
                      fill="#fff"
                    >
                      P
                    </text>
                  </svg>
                </div>
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
            <svg
              width="64"
              height="64"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="nav-logo-img"
              style={{ padding: 0 }}
            >
              <rect width="100" height="100" rx="18" fill="#fff" />
              <polygon
                points="12,88 12,28 38,8 88,8 88,58 62,88"
                fill="#4fa33d"
              />
              <polygon
                points="12,88 12,28 38,8 88,8 88,58 62,88"
                fill="url(#s2)"
                opacity="0.35"
              />
              <defs>
                <pattern
                  id="s2"
                  width="12"
                  height="12"
                  patternTransform="rotate(45)"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="12"
                    stroke="#000"
                    strokeWidth="5"
                  />
                </pattern>
              </defs>
              <text
                x="24"
                y="74"
                fontFamily="Arial Black, sans-serif"
                fontWeight="900"
                fontSize="44"
                fill="#fff"
              >
                P
              </text>
            </svg>
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
            This section helps visitors recognize their problem quickly and
            reinforces that drywall repair is your main specialty.
          </p>
          <div className="repairs-grid">
            {REPAIRS.map((r, i) => (
              <div key={i} className="repair-card">
                <div className="repair-illustration">
                  <RepairIllustration
                    circleColor={r.circleColor}
                    pentagonColor={r.pentagonColor}
                  />
                </div>
                <div className="repair-body">
                  <div className="repair-title">{r.title}</div>
                  <div className="repair-desc">{r.description}</div>
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
      <div className="process-bg section-full" id="process">
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

      {/* CONTACT */}
      <div className="contact-bg" id="contact">
        <div className="contact-inner">
          <div>
            <div className="eyebrow contact-eyebrow">Get Started</div>
            <h2 className="contact-title">{content.contactHeading}</h2>
            <p className="contact-desc">{content.contactDesc}</p>
            {formMsg && (
              <p className="save-msg" style={{ color: "#fff", marginTop: 16 }}>
                {formMsg}
              </p>
            )}
          </div>

          <div className="contact-card">
            <div className="contact-info">
              <div className="contact-info-label">Phone</div>
              <div className="contact-info-value">{content.phone}</div>
            </div>
            <div className="contact-info">
              <div className="contact-info-label">Service Area</div>
              <div className="contact-info-value">{content.serviceArea}</div>
            </div>
            <div className="contact-info">
              <div className="contact-info-label">Email</div>
              <div className="contact-info-value">{content.email}</div>
            </div>
            <form className="contact-form" onSubmit={submitForm}>
              <input
                className="contact-input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
              <input
                className="contact-input"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <textarea
                className="contact-textarea"
                placeholder="Tell us about the repair you need"
                rows={5}
                value={form.details}
                onChange={(e) =>
                  setForm((p) => ({ ...p, details: e.target.value }))
                }
              />
              <button type="submit" className="btn-submit">
                Request Estimate
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
