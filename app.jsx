import { useEffect, useMemo, useState } from "react";

export default function DrywallSpecialistWebsite() {
  // Built-in logo used in the header and admin area.
  const logoSrc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACbCAYAAAB1YemMAABAr0lEQVR4nO2deXxUVdr3f+fcnaSQQkJIQkJIkEI2EMg0mDShkEUQ0A2E2xVnQZfV1x3Z0dWZ7u7b7r6vW/2quu3u7j1b1fW6u7s7r7v7m+9zv3POfQ2mM0lQk0iH5w0M8yQkM5A7v5z7znn3nPuec85x7zv3e8H4QAAQBAEAQBEEARBEAQBEEARBEAQBEEARBEAQBEEARBEAQBEEARBEAQBEEARBEB4W7fG1l6H2+2eP3/+9m8vLS1t2rTpk08//XSxWKwYjUaLxWJbt25dV1fX0NBQd3d3S0vLxo0bF4vF4uPjKysr8/Pz6+vrMzMzy8vLJ0+e7Ny5c+fOnS+++OL8/Pw8PDxwOByLxaK9vb2pqamlpWW1tbX5+fkKhUJdXV0ymYzBYHB4ePjEiRN79uxJTEw0NDS8+OKL+fn5o0eP9vf3h4eHh4eH2dnZZWVl4eHhCwsL8/Pz8/PzJSUlf/31V0dHR319fXd3d0tLS6dOnWpoaNjS0jI8PDw8PDwRERFpaWnLli3bu3fvsWPHSkpKqqqqvv322+Li4oaGhnZ2dt7e3u7u7iYmJoaGhhYWF/f39Dw8P6+vr0Wg0IyMj4eHhYWFh8fHxV69eVVVV6enpRUVFjY2NJSUlcXFxJ0+e7O3tHR0d5eXlV69ePX36dHZ2dn9/f319fYWFhWZmZqWlpb6+vtHR0b29vQ8PD3V1dSUlJdXV1aGhocHBwampqQkJC2tra9fX1nZ2dCQkJtbW1vb29t7e3q6ur5eXl+fn5BQUFFRUVcXFxQ0ND5eXl9fX1fX19X19fQ0NDMzMzQ0NDdXV1dXV1I0eOePbs2bNnT2tra7u7u+3t7cnJyRkZGTY2NmpqanR0dP39/fX19erq6uHh4VtbW0VFRR4eHvLy8sLCwvDw8KSkpKysrEtLS8vLy9XV1XJyciQSCWdnZzY2Nubm5hwcHHR0dKqqqtbW1hYWFhQUBAEAQBEEARBEAQBEEARBEAQBEEARBEAQBEEARBEAQBEEQPgP8v9d3U6t8W0kAAAAASUVORK5CYII=";

  // Default website content. The admin panel edits these values and stores them in localStorage.
  const defaultContent = {
    brandName: "PND Construction",
    brandTag: "Drywall Repair",
    heroEyebrow: "Drywall repairs first. Renovations and paint second.",
    heroTitle: "Your Local Drywall Repair Experts.",
    heroHighlight: "Drywall Repair",
    heroDescription:
      "PND Construction specializes in drywall repair for walls and ceilings, including cracks, holes, water damage, texture matching, and clean paint-ready finishing. Renovations and light paint work are available as supporting services.",
    heroPhoneLabel: "All your drywall needs are just a phone call away.",
    phone: "(602) 849-6384",
    serviceArea: "Mesa & Greater Phoenix, AZ",
    email: "you@example.com",
    contactHeading: "Need drywall repair? Let's take a look.",
    contactDescription:
      "Use the admin panel to update your business details, photos, and service messaging without touching code.",
    adminPassword: "PNDadmin123",
    services: [
      {
        title: "Drywall Repair",
        description:
          "Holes, cracks, water damage, popped nails, dents, and damaged corners repaired cleanly and professionally.",
        featured: true,
      },
      {
        title: "Texture Matching",
        description:
          "We blend repaired areas into the surrounding wall or ceiling for a smoother finished look.",
        featured: false,
      },
      {
        title: "Renovations",
        description:
          "Small renovation projects and drywall-related improvement work handled with the same detail-focused approach.",
        featured: false,
      },
      {
        title: "Paint Touch-Ups",
        description:
          "Clean touch-ups and repainting around repaired areas to help the finish feel complete.",
        featured: false,
      },
    ],
    repairs: [
      {
        title: "Wall Holes",
        description:
          "Damage from accidental impact, furniture bumps, and doorknobs.",
        image: `data:image/svg+xml;utf8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
            <defs><linearGradient id="bg1" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#eef3eb"/><stop offset="100%" stop-color="#dbe8d6"/></linearGradient></defs>
            <rect width="800" height="520" fill="url(#bg1)"/>
            <rect x="80" y="90" width="640" height="340" rx="18" fill="#f8f8f5" stroke="#c9d6c2" stroke-width="6"/>
            <circle cx="315" cy="255" r="82" fill="#4d4d4d"/><circle cx="315" cy="255" r="56" fill="#1c1c1c"/>
            <path d="M380 180 L470 120 L540 165 L500 250 L410 240 Z" fill="#9dc57c" opacity=".9"/>
            <path d="M415 282 L528 310 L485 385 L392 360 Z" fill="#6ea34a" opacity=".95"/>
            <text x="80" y="475" font-family="Arial" font-size="34" font-weight="700" fill="#111111">Example: wall hole patch repair</text>
          </svg>
        `)}`,
      },
      {
        title: "Water Damage",
        description:
          "Stained ceilings and softened drywall after roof or plumbing leaks.",
        image: `data:image/svg+xml;utf8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
            <defs><linearGradient id="bg2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#f4f4f2"/><stop offset="100%" stop-color="#dfe8db"/></linearGradient></defs>
            <rect width="800" height="520" fill="url(#bg2)"/>
            <rect x="70" y="80" width="660" height="360" rx="20" fill="#fafaf8" stroke="#d7d7d2" stroke-width="6"/>
            <ellipse cx="395" cy="220" rx="175" ry="88" fill="#c8b28b" opacity=".7"/>
            <ellipse cx="395" cy="220" rx="120" ry="56" fill="#a98d64" opacity=".78"/>
            <path d="M395 150 C430 200 450 225 450 255 C450 289 425 315 395 315 C365 315 340 289 340 255 C340 225 360 200 395 150 Z" fill="#6ea34a" opacity=".8"/>
            <circle cx="395" cy="275" r="18" fill="#4fa33d"/>
            <text x="70" y="475" font-family="Arial" font-size="34" font-weight="700" fill="#111111">Example: ceiling water damage repair</text>
          </svg>
        `)}`,
      },
      {
        title: "Cracks",
        description:
          "Settling cracks, seam separation, and recurring stress lines.",
        image: `data:image/svg+xml;utf8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
            <rect width="800" height="520" fill="#edf1ea"/>
            <rect x="70" y="80" width="660" height="360" rx="20" fill="#fbfbf9" stroke="#d8d8d4" stroke-width="6"/>
            <path d="M420 95 L400 155 L448 185 L405 235 L445 270 L402 320 L445 355 L420 430" fill="none" stroke="#1a1a1a" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M395 150 L350 185" fill="none" stroke="#555555" stroke-width="7" stroke-linecap="round"/>
            <path d="M432 230 L485 205" fill="none" stroke="#555555" stroke-width="7" stroke-linecap="round"/>
            <path d="M405 320 L345 345" fill="none" stroke="#555555" stroke-width="7" stroke-linecap="round"/>
            <path d="M435 355 L500 385" fill="none" stroke="#6ea34a" stroke-width="9" stroke-linecap="round"/>
            <text x="70" y="475" font-family="Arial" font-size="34" font-weight="700" fill="#111111">Example: crack repair and seam blending</text>
          </svg>
        `)}`,
      },
      {
        title: "Nail Pops & Dents",
        description:
          "Raised fasteners, impact dents, and small surface imperfections.",
        image: `data:image/svg+xml;utf8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
            <rect width="800" height="520" fill="#f0f3ed"/>
            <rect x="80" y="90" width="640" height="340" rx="18" fill="#fbfbf8" stroke="#d7d7d2" stroke-width="6"/>
            <circle cx="245" cy="210" r="24" fill="#7f7f7f"/><circle cx="245" cy="210" r="9" fill="#f6f6f3"/>
            <circle cx="425" cy="280" r="26" fill="#7f7f7f"/><circle cx="425" cy="280" r="10" fill="#f6f6f3"/>
            <ellipse cx="570" cy="215" rx="75" ry="48" fill="#d7dfd0"/><ellipse cx="570" cy="215" rx="42" ry="24" fill="#c1ceb8"/>
            <path d="M520 340 C560 300 635 300 675 340" fill="none" stroke="#6ea34a" stroke-width="12" stroke-linecap="round"/>
            <text x="80" y="475" font-family="Arial" font-size="34" font-weight="700" fill="#111111">Example: patching dents and nail pops</text>
          </svg>
        `)}`,
      },
      {
        title: "Old Bad Repairs",
        description: "Previous patch jobs that look uneven, rough, or obvious.",
        image: `data:image/svg+xml;utf8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
            <rect width="800" height="520" fill="#eef2ec"/>
            <rect x="70" y="80" width="660" height="360" rx="20" fill="#fbfbf8" stroke="#d8d8d4" stroke-width="6"/>
            <rect x="250" y="145" width="300" height="190" rx="20" fill="#d7d7d2"/>
            <rect x="285" y="175" width="230" height="130" rx="16" fill="#b8b8b0"/>
            <path d="M280 170 L525 305" stroke="#8f8f8a" stroke-width="8"/><path d="M520 175 L280 305" stroke="#8f8f8a" stroke-width="8"/>
            <rect x="555" y="150" width="65" height="180" rx="10" fill="#6ea34a"/><rect x="570" y="130" width="35" height="40" rx="8" fill="#111111"/>
            <text x="70" y="475" font-family="Arial" font-size="34" font-weight="700" fill="#111111">Example: redoing a poor patch job</text>
          </svg>
        `)}`,
      },
      {
        title: "Texture Issues",
        description:
          "Texture mismatches that need blending after a drywall repair.",
        image: `data:image/svg+xml;utf8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
            <rect width="800" height="520" fill="#eef2ec"/>
            <rect x="70" y="80" width="660" height="360" rx="20" fill="#fbfbf8" stroke="#d8d8d4" stroke-width="6"/>
            <text x="200" y="280" font-family="Arial" font-size="34" font-weight="700" fill="#111111">Example: texture blending repair</text>
          </svg>
        `)}`,
      },
    ],
    reasons: [
      "Drywall-first positioning that feels more specialized and trustworthy",
      "A green, black, white, and gray palette pulled from your logo and mockup",
      "Clear hierarchy that keeps renovations and paint secondary",
      "Clean calls to action that feel polished without looking too generic",
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

  const storageKey = "pnd-site-content-v1";
  const submissionsKey = "pnd-site-submissions-v1";

  const [content, setContent] = useState(defaultContent);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    details: "",
  });
  const [submissions, setSubmissions] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  // Load saved site content and quote requests on first render.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedContent = window.localStorage.getItem(storageKey);
    const savedSubmissions = window.localStorage.getItem(submissionsKey);
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch {
        /* fall back to defaults */
      }
    }
    if (savedSubmissions) {
      try {
        setSubmissions(JSON.parse(savedSubmissions));
      } catch {
        /* fall back to empty */
      }
    }
  }, []);

  // Persist website content so admin edits survive refreshes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(content));
  }, [content]);

  // Persist lead submissions to create a lightweight admin inbox.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(submissionsKey, JSON.stringify(submissions));
  }, [submissions]);

  const stats = useMemo(
    () => [
      { label: "Primary Service", value: "Drywall Repair" },
      { label: "Secondary Services", value: "Renovations + Paint" },
      { label: "Customer Goal", value: "Flawless Finished Walls" },
    ],
    [],
  );

  const updateField = (field, value) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (field, index, key, value) => {
    setContent((prev) => ({
      ...prev,
      [field]: prev[field].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const updateReason = (index, value) => {
    setContent((prev) => ({
      ...prev,
      reasons: prev.reasons.map((reason, reasonIndex) =>
        reasonIndex === index ? value : reason,
      ),
    }));
  };

  const submitQuoteRequest = (event) => {
    event.preventDefault();
    if (!quoteForm.name || !quoteForm.phone || !quoteForm.details) return;
    const newSubmission = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      ...quoteForm,
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
    setQuoteForm({ name: "", phone: "", details: "" });
    setSaveMessage("Quote request saved to the admin inbox.");
    window.setTimeout(() => setSaveMessage(""), 2500);
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();
    if (passwordInput === content.adminPassword) {
      setIsAdminLoggedIn(true);
      setPasswordError("");
      setPasswordInput("");
      return;
    }
    setPasswordError("Incorrect password. Try again.");
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setPasswordInput("");
    setPasswordError("");
  };

  const clearSubmissions = () => setSubmissions([]);

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-[#111111]">
      {/* Floating admin toggle */}
      <button
        type="button"
        onClick={() => setIsAdminOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white shadow-2xl"
      >
        {isAdminOpen ? "Close Admin" : "Admin"}
      </button>

      {/* Admin slide-over panel */}
      {isAdminOpen && (
        <aside className="fixed right-0 top-0 z-40 h-full w-full max-w-2xl overflow-y-auto border-l border-black/10 bg-white shadow-2xl">
          <div className="sticky top-0 border-b border-[#d8d8d4] bg-[#f7f7f5] px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow">
                  <img
                    src={logoSrc}
                    alt="PND Construction logo"
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#4fa33d]">
                    Admin Dashboard
                  </p>
                  <h2 className="text-xl font-black text-[#111111]">
                    Manage Website Content
                  </h2>
                </div>
              </div>
              {isAdminLoggedIn && (
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="rounded-2xl border border-[#d8d8d4] px-4 py-2 text-sm font-bold text-[#111111]"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>

          {!isAdminLoggedIn ? (
            <div className="p-6">
              <div className="rounded-[2rem] border border-[#d8d8d4] bg-[#f7f7f5] p-6">
                <h3 className="text-2xl font-black">Admin Login</h3>
                <p className="mt-2 text-sm leading-6 text-[#555555]">
                  This unlocks editing for headlines, services, repairs, contact
                  info, and quote requests.
                </p>
                <form onSubmit={handleAdminLogin} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-[#111111]">
                      Password
                    </span>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(event) => setPasswordInput(event.target.value)}
                      className="w-full rounded-2xl border border-[#d8d8d4] px-4 py-3 outline-none"
                      placeholder="Enter admin password"
                    />
                  </label>
                  {passwordError && (
                    <p className="text-sm font-semibold text-red-600">
                      {passwordError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="rounded-2xl bg-[#4fa33d] px-5 py-3 font-black text-white"
                  >
                    Log In
                  </button>
                </form>
                <p className="mt-4 text-xs text-[#777777]">
                  Current demo password:{" "}
                  <span className="font-bold">{content.adminPassword}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 p-6">
              <section className="rounded-[2rem] border border-[#d8d8d4] bg-[#f7f7f5] p-6">
                <h3 className="text-2xl font-black">Site Settings</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Business Name"
                    value={content.brandName}
                    onChange={(v) => updateField("brandName", v)}
                  />
                  <Field
                    label="Brand Tag"
                    value={content.brandTag}
                    onChange={(v) => updateField("brandTag", v)}
                  />
                  <Field
                    label="Phone Number"
                    value={content.phone}
                    onChange={(v) => updateField("phone", v)}
                  />
                  <Field
                    label="Service Area"
                    value={content.serviceArea}
                    onChange={(v) => updateField("serviceArea", v)}
                  />
                  <Field
                    label="Email"
                    value={content.email}
                    onChange={(v) => updateField("email", v)}
                  />
                  <Field
                    label="Admin Password"
                    value={content.adminPassword}
                    onChange={(v) => updateField("adminPassword", v)}
                  />
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#d8d8d4] bg-white p-6">
                <h3 className="text-2xl font-black">Hero Content</h3>
                <div className="mt-5 space-y-4">
                  <Field
                    label="Eyebrow"
                    value={content.heroEyebrow}
                    onChange={(v) => updateField("heroEyebrow", v)}
                  />
                  <Field
                    label="Title"
                    value={content.heroTitle}
                    onChange={(v) => updateField("heroTitle", v)}
                  />
                  <Field
                    label="Highlighted Word"
                    value={content.heroHighlight}
                    onChange={(v) => updateField("heroHighlight", v)}
                  />
                  <TextArea
                    label="Hero Description"
                    value={content.heroDescription}
                    onChange={(v) => updateField("heroDescription", v)}
                  />
                  <Field
                    label="Phone Label"
                    value={content.heroPhoneLabel}
                    onChange={(v) => updateField("heroPhoneLabel", v)}
                  />
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#d8d8d4] bg-white p-6">
                <h3 className="text-2xl font-black">Services</h3>
                <div className="mt-5 space-y-5">
                  {content.services.map((service, index) => (
                    <div
                      key={service.title + index}
                      className="rounded-[1.5rem] border border-[#e2e2dd] p-4"
                    >
                      <div className="grid gap-4">
                        <Field
                          label={`Service ${index + 1} Title`}
                          value={service.title}
                          onChange={(v) =>
                            updateArrayItem("services", index, "title", v)
                          }
                        />
                        <TextArea
                          label="Description"
                          value={service.description}
                          onChange={(v) =>
                            updateArrayItem("services", index, "description", v)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#d8d8d4] bg-white p-6">
                <h3 className="text-2xl font-black">Common Repairs</h3>
                <p className="mt-2 text-sm text-[#666666]">
                  You can replace the sample art with your own image URLs or
                  uploads later.
                </p>
                <div className="mt-5 space-y-5">
                  {content.repairs.map((repair, index) => (
                    <div
                      key={repair.title + index}
                      className="rounded-[1.5rem] border border-[#e2e2dd] p-4"
                    >
                      <div className="grid gap-4">
                        <Field
                          label={`Repair ${index + 1} Title`}
                          value={repair.title}
                          onChange={(v) =>
                            updateArrayItem("repairs", index, "title", v)
                          }
                        />
                        <TextArea
                          label="Description"
                          value={repair.description}
                          onChange={(v) =>
                            updateArrayItem("repairs", index, "description", v)
                          }
                        />
                        <TextArea
                          label="Image URL or Data URI"
                          value={repair.image}
                          onChange={(v) =>
                            updateArrayItem("repairs", index, "image", v)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#d8d8d4] bg-white p-6">
                <h3 className="text-2xl font-black">Why Choose Us</h3>
                <div className="mt-5 space-y-4">
                  {content.reasons.map((reason, index) => (
                    <Field
                      key={index}
                      label={`Reason ${index + 1}`}
                      value={reason}
                      onChange={(v) => updateReason(index, v)}
                    />
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#d8d8d4] bg-white p-6">
                <h3 className="text-2xl font-black">Process Steps</h3>
                <div className="mt-5 space-y-5">
                  {content.process.map((item, index) => (
                    <div
                      key={item.step + index}
                      className="rounded-[1.5rem] border border-[#e2e2dd] p-4"
                    >
                      <div className="grid gap-4">
                        <Field
                          label={`Step ${index + 1} Label`}
                          value={item.step}
                          onChange={(v) =>
                            updateArrayItem("process", index, "step", v)
                          }
                        />
                        <Field
                          label="Title"
                          value={item.title}
                          onChange={(v) =>
                            updateArrayItem("process", index, "title", v)
                          }
                        />
                        <TextArea
                          label="Description"
                          value={item.text}
                          onChange={(v) =>
                            updateArrayItem("process", index, "text", v)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#d8d8d4] bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">Quote Request Inbox</h3>
                    <p className="mt-2 text-sm text-[#666666]">
                      Review messages submitted from the contact form.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearSubmissions}
                    className="rounded-2xl border border-[#d8d8d4] px-4 py-2 text-sm font-bold text-[#111111]"
                  >
                    Clear Inbox
                  </button>
                </div>
                <div className="mt-5 space-y-4">
                  {submissions.length === 0 ? (
                    <div className="rounded-2xl bg-[#f7f7f5] p-4 text-sm text-[#666666]">
                      No quote requests yet.
                    </div>
                  ) : (
                    submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="rounded-2xl border border-[#e2e2dd] p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-lg font-black text-[#111111]">
                            {submission.name}
                          </p>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4fa33d]">
                            {submission.createdAt}
                          </p>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-[#111111]">
                          Phone: {submission.phone}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[#555555]">
                          {submission.details}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}
        </aside>
      )}

      {/* ── PUBLIC SITE ── */}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#4fa33d] text-white">
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-y-0 right-[-10%] w-[55%] -skew-x-[35deg] bg-white/8" />
          <div className="absolute bottom-0 left-[-8%] h-[68%] w-[28%] -skew-x-[35deg] bg-white/12" />
          <div className="absolute bottom-0 left-[10%] h-[56%] w-[14%] -skew-x-[35deg] bg-[#cfe8c9]/70" />
          <div className="absolute bottom-0 left-[25%] h-[36%] w-[6%] -skew-x-[35deg] bg-[#78ad67]/80" />
        </div>

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-lg shadow-black/20">
              <img
                src={logoSrc}
                alt="PND Construction logo"
                className="h-16 w-16 rounded-xl object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#8ccf5a]">
                {content.brandTag}
              </p>
              <p className="text-xl font-black">{content.brandName}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/85 md:flex">
            <a href="#services" className="transition hover:text-[#cfe8c9]">
              Services
            </a>
            <a href="#about" className="transition hover:text-[#cfe8c9]">
              Why Us
            </a>
            <a href="#process" className="transition hover:text-[#cfe8c9]">
              Process
            </a>
            <a href="#contact" className="transition hover:text-[#cfe8c9]">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-2xl border border-[#8ccf5a] bg-[#4fa33d] px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#5ead49]"
          >
            Request Estimate
          </a>
        </header>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-28 lg:pt-14">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              {content.heroEyebrow}
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
              {content.heroTitle.replace(content.heroHighlight, "")}
              <span className="text-[#8ccf5a]">{content.heroHighlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
              {content.heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="rounded-2xl bg-[#4fa33d] px-7 py-4 text-center text-base font-extrabold text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#5ead49]"
              >
                Request a Free Estimate
              </a>
              <a
                href="#services"
                className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-center text-base font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Explore Services
              </a>
            </div>
            <div className="mt-8 text-white/75">
              <p className="text-base font-medium">{content.heroPhoneLabel}</p>
              <p className="mt-2 text-3xl font-black text-[#8ccf5a]">
                {content.phone}
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                "Drywall Repair Specialists",
                "Texture Matching",
                "Clean, No-Nonsense Service",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold text-white/92 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#f7f7f5] p-5 text-[#111111] shadow-xl">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4fa33d]">
                      Most Requested
                    </p>
                    <h2 className="mt-1 text-2xl font-black">
                      Drywall Repairs
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-[#cfe8c9] px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-[#1a1a1a]">
                    Specialist Focus
                  </div>
                </div>
                <div className="grid gap-3">
                  {[
                    "Wall and ceiling holes",
                    "Cracks and seam issues",
                    "Water damage restoration",
                    "Texture blending",
                    "Paint-ready finishing",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-[#ddddda] bg-white px-4 py-3"
                    >
                      <div className="h-3 w-3 rounded-full bg-[#4fa33d]" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-[#111111] p-5 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8ccf5a]">
                    Also Available
                  </p>
                  <p className="mt-2 text-base text-white/82">
                    Small renovations and light paint work that support the
                    repair and finishing process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#d8d8d4] bg-[#f7f7f5]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 text-center sm:grid-cols-3 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#4fa33d]">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#4fa33d]">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            A cleaner look built around drywall repair.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#555555]">
            The page uses green, black, white, and gray tones that keep the
            brand feeling consistent and professional.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {content.services.map((service) => (
            <div
              key={service.title}
              className={`rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                service.featured
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#d8d8d4] bg-white text-[#111111]"
              }`}
            >
              <div
                className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.25em] ${
                  service.featured
                    ? "bg-[#8ccf5a] text-[#111111]"
                    : "bg-[#e8f4e3] text-[#4fa33d]"
                }`}
              >
                {service.featured ? "Featured" : "Service"}
              </div>
              <h3 className="text-2xl font-black">{service.title}</h3>
              <p
                className={`mt-4 leading-7 ${service.featured ? "text-white/80" : "text-[#5d5d5d]"}`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Repairs */}
      <section className="bg-[#ededea] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#4fa33d]">
              Common Repairs
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              The drywall issues customers call about most.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#555555]">
              This section helps visitors recognize their problem quickly and
              reinforces that drywall repair is your main specialty.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.repairs.map((problem) => (
              <div
                key={problem.title}
                className="overflow-hidden rounded-[1.75rem] border border-[#d8d8d4] bg-white shadow-sm transition hover:shadow-lg"
              >
                <img
                  src={problem.image}
                  alt={problem.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-lg font-black text-[#1a1a1a]">
                    {problem.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#555555]">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-[#111111] p-8 text-white shadow-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#8ccf5a]">
              Why This Works Better
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Positioned like a drywall specialist, not a general contractor.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/82">
              The updated palette and messaging feel sharper, more focused, and
              more aligned with your logo and ad style while still looking
              modern and professional.
            </p>
          </div>
          <div className="grid gap-4">
            {content.reasons.map((reason, index) => (
              <div
                key={reason}
                className="flex gap-4 rounded-[1.75rem] border border-[#d8d8d4] bg-white p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4fa33d] text-lg font-black text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-base font-semibold leading-7 text-[#1a1a1a]">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        className="bg-gradient-to-br from-[#111111] to-[#4fa33d] py-20 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#cfe8c9]">
              Process
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Simple from first call to final finish.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.process.map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur"
              >
                <div className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#cfe8c9]">
                  {item.step}
                </div>
                <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] bg-[#f0f0ed] p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#4fa33d]">
              Before / After Area
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              A strong place for your repair photos.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#555555]">
              Real project photos here will make the drywall specialty even more
              obvious and build trust fast.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-[#d8d8d4] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-white">
                  Before
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4fa33d]">
                  Drywall Damage
                </span>
              </div>
              <img
                src={
                  content.repairs[0]?.image || defaultContent.repairs[0].image
                }
                alt="Before drywall repair example"
                className="h-56 w-full rounded-[1.25rem] object-cover"
              />
            </div>
            <div className="flex justify-center">
              <div className="rounded-full bg-[#4fa33d] px-5 py-2 text-sm font-black uppercase tracking-[0.25em] text-white shadow-lg shadow-black/15">
                Before → After
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-[#d8d8d4] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-[#4fa33d] px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-white">
                  After
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4fa33d]">
                  Clean Finished Repair
                </span>
              </div>
              <img
                src={
                  content.repairs[5]?.image || defaultContent.repairs[5].image
                }
                alt="After drywall repair example"
                className="h-56 w-full rounded-[1.25rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#4fa33d] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-[#dff0da]">
                Get Started
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                {content.contactHeading}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
                {content.contactDescription}
              </p>
              {saveMessage && (
                <p className="mt-4 text-sm font-bold text-white">
                  {saveMessage}
                </p>
              )}
            </div>
            <div className="rounded-[2rem] bg-[#f7f7f5] p-6 text-[#111111] shadow-2xl">
              <div className="grid gap-4">
                <div className="rounded-2xl border border-[#d8d8d4] px-4 py-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6f6f6f]">
                    Phone
                  </p>
                  <p className="mt-2 text-xl font-black">{content.phone}</p>
                </div>
                <div className="rounded-2xl border border-[#d8d8d4] px-4 py-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6f6f6f]">
                    Service Area
                  </p>
                  <p className="mt-2 text-xl font-black">
                    {content.serviceArea}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#d8d8d4] px-4 py-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6f6f6f]">
                    Email
                  </p>
                  <p className="mt-2 text-xl font-black">{content.email}</p>
                </div>
                <form onSubmit={submitQuoteRequest} className="grid gap-3">
                  <input
                    value={quoteForm.name}
                    onChange={(e) =>
                      setQuoteForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className="rounded-2xl border border-[#d8d8d4] px-4 py-3 outline-none"
                  />
                  <input
                    value={quoteForm.phone}
                    onChange={(e) =>
                      setQuoteForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="Phone number"
                    className="rounded-2xl border border-[#d8d8d4] px-4 py-3 outline-none"
                  />
                  <textarea
                    value={quoteForm.details}
                    onChange={(e) =>
                      setQuoteForm((prev) => ({
                        ...prev,
                        details: e.target.value,
                      }))
                    }
                    placeholder="Tell us about the repair you need"
                    rows={4}
                    className="rounded-2xl border border-[#d8d8d4] px-4 py-3 outline-none"
                  />
                  <button className="mt-2 rounded-2xl bg-[#111111] px-5 py-4 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#1f1f1f]">
                    Request Estimate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#111111]">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#d8d8d4] px-4 py-3 outline-none"
      />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#111111]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-2xl border border-[#d8d8d4] px-4 py-3 outline-none"
      />
    </label>
  );
}
