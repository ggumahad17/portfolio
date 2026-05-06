"use client";

import { useState } from "react";

/* ============================================================
   FAQ CHAT WIDGET — 100% FREE, NO API NEEDED
   To update Q&A: edit the FAQ_DATA array below
   ============================================================ */

const FAQ_DATA = [
  {
    category: "About Gerald",
    icon: "👤",
    questions: [
      { q: "Who is Gerald?", a: "Gerald Gumahad is a data-driven professional from Cebu City, Philippines, with a background in Chemical Engineering. He's now focused on Data Analytics and SEO, helping businesses make smarter decisions based on data." },
      { q: "What does he do?", a: "Gerald works with data — analyzing it, cleaning it, and turning it into insights that improve performance, whether in operations or digital marketing. He also specializes in SEO including keyword research, content optimization, and performance tracking." },
      { q: "What makes him unique?", a: "Gerald brings a unique mix of engineering discipline and digital analytics skills. His engineering background trained him to work with complex datasets, identify inefficiencies, and apply structured problem-solving — all of which translate directly to data analytics and SEO." },
    ],
  },
  {
    category: "Skills & Tools",
    icon: "🛠️",
    questions: [
      { q: "What are his core skills?", a: "Gerald's core skills include data analysis, Excel and Google Sheets, SEO research, data visualization, and performance tracking. He combines technical thinking with real-world problem-solving." },
      { q: "What tools does he use?", a: "For data: Excel VBA, Google Sheets, Power BI, Minitab, GA4. For SEO: Semrush, Google Search Console, Google PageSpeed Insights. For project management: ClickUp, Asana, Slack, Microsoft Teams, Google Workspace." },
      { q: "Does he have SEO experience?", a: "Yes! Gerald works on keyword research, on-page optimization, site audits, competitor analysis, and off-page SEO including backlink outreach. He has managed websites like LevyLaw, GGHLaw, valtrixpowertrain.com, and alsaudiatibbifoundation.pk." },
      { q: "Does he know data analytics?", a: "Yes. Gerald has worked with large operational datasets, built dashboards, tracked KPIs, and produced comprehensive technical reports. He uses tools like Excel VBA, Power BI, and Google Sheets for data cleaning, analysis, and visualization." },
    ],
  },
  {
    category: "Experience",
    icon: "💼",
    questions: [
      { q: "Where has he worked?", a: "Gerald is currently an SEO Intern at Growth Orbit Marketing Agency (April 2026–Present). Previously: SEO Assistant at Zenith Collective (2025), Researcher at DOST (2024–2025), and Process Engineer at Taganito HPAL Nickel Corporation (2020–2023)." },
      { q: "What's his educational background?", a: "Gerald holds a Bachelor of Science in Chemical Engineering from Mindanao State University – Iligan Institute of Technology (2015–2019), and a Diploma in Chemical Engineering Technology from the same institution (2012–2015)." },
      { q: "Does he have a portfolio?", a: "Yes! You can explore his projects and sample works right here on this website. Scroll up to the Projects section to see his SEO work, data dashboards, Canva designs, and more. He also has data projects on Kaggle." },
    ],
  },
  {
    category: "Availability",
    icon: "📅",
    questions: [
      { q: "Is he available for work?", a: "Yes! Gerald is open to freelance, contract, or full-time opportunities depending on the project. He's also open to remote and international work." },
      { q: "When can he start?", a: "Gerald can start within one week after an offer is made." },
      { q: "Does he do freelance?", a: "Yes, Gerald is open to freelance and contract work. He can help with SEO strategy, keyword research, data analysis, reporting, and more." },
      { q: "What's his expected salary?", a: "Gerald is open to discussing compensation based on the role and responsibilities. Feel free to reach out through the contact section to discuss further." },
    ],
  },
  {
    category: "Contact",
    icon: "📩",
    questions: [
      { q: "How can I contact him?", a: "You can reach Gerald through the Contact section on this website, or directly via email at gerald.gumahad17@gmail.com or WhatsApp at +63 945 793 8546." },
      { q: "Can he work with small businesses?", a: "Absolutely! Gerald can help small businesses improve their online visibility using practical, data-driven SEO strategies tailored to their goals and budget." },
      { q: "Can he handle multiple projects?", a: "Yes, Gerald manages tasks by prioritizing based on impact and deadlines, making him capable of handling multiple projects efficiently." },
    ],
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showNotification, setShowNotification] = useState(true);

  const allQuestions = FAQ_DATA.flatMap((cat) =>
    cat.questions.map((q) => ({ ...q, category: cat.category, icon: cat.icon }))
  );

  const filtered = search.trim()
    ? allQuestions.filter(
        (q) =>
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const displayQuestions = filtered || FAQ_DATA[activeCategory].questions;

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-4 md:right-6 z-50 flex flex-col"
          style={{
            width: "min(380px, calc(100vw - 32px))",
            height: "520px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,180,0.2)",
            background: "#040d1a",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #071428, #0a1d3a)",
              borderBottom: "1px solid rgba(0,200,180,0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(0,200,180,0.2), rgba(18,45,92,0.6))",
                  border: "1px solid rgba(0,200,180,0.3)",
                }}
              >
                🤖
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#e8edf5" }}>
                  Gerald's Assistant
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs" style={{ color: "#00c8b4" }}>Ask me anything!</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/10"
              style={{ color: "#8ba3c7" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div
            className="px-3 py-2 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(18,45,92,0.5)", background: "rgba(7,20,40,0.9)" }}
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(18,45,92,0.4)", border: "1px solid rgba(18,45,92,0.6)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#4a6490" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.07a88,88,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.31ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="flex-1 text-xs outline-none bg-transparent"
                style={{ color: "#e8edf5" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ color: "#4a6490" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category tabs — hidden when searching */}
          {!search && (
            <div
              className="flex gap-1 px-3 py-2 flex-shrink-0 overflow-x-auto"
              style={{ borderBottom: "1px solid rgba(18,45,92,0.5)", background: "rgba(7,20,40,0.8)" }}
            >
              {FAQ_DATA.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveCategory(i); setOpenQuestion(null); }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex-shrink-0"
                  style={{
                    background: activeCategory === i ? "rgba(0,200,180,0.15)" : "transparent",
                    border: activeCategory === i ? "1px solid rgba(0,200,180,0.4)" : "1px solid transparent",
                    color: activeCategory === i ? "#00c8b4" : "#8ba3c7",
                  }}
                >
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.category}</span>
                </button>
              ))}
            </div>
          )}

          {/* Questions accordion */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
            {filtered && filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <span className="text-3xl">🔍</span>
                <p className="text-sm" style={{ color: "#8ba3c7" }}>No results found.</p>
                <p className="text-xs" style={{ color: "#4a6490" }}>Try a different keyword or browse the categories above.</p>
              </div>
            ) : (
              displayQuestions.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all duration-200"
                  style={{ border: openQuestion === i ? "1px solid rgba(0,200,180,0.3)" : "1px solid rgba(18,45,92,0.5)" }}
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-left transition-all duration-200"
                    style={{ background: openQuestion === i ? "rgba(0,200,180,0.08)" : "rgba(7,20,40,0.6)" }}
                  >
                    <span className="text-xs font-medium pr-2" style={{ color: openQuestion === i ? "#00c8b4" : "#e8edf5" }}>
                      {item.q}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="#00c8b4"
                      viewBox="0 0 256 256"
                      style={{ transform: openQuestion === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
                    >
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </button>
                  {openQuestion === i && (
                    <div className="px-3 py-2.5" style={{ background: "rgba(4,13,26,0.8)", borderTop: "1px solid rgba(18,45,92,0.4)" }}>
                      <p className="text-xs leading-relaxed" style={{ color: "#8ba3c7" }}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Contact CTA at bottom */}
            <div
              className="mt-2 p-3 rounded-xl text-center"
              style={{ background: "rgba(0,200,180,0.06)", border: "1px solid rgba(0,200,180,0.15)" }}
            >
              <p className="text-xs mb-2" style={{ color: "#8ba3c7" }}>
                Still have questions?
              </p>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{ background: "rgba(0,200,180,0.15)", border: "1px solid rgba(0,200,180,0.3)", color: "#00c8b4" }}
              >
                📩 Contact Gerald directly
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toggle bubble */}
      <button
        onClick={() => { setOpen(!open); setShowNotification(false); }}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: open ? "rgba(7,20,40,0.9)" : "linear-gradient(135deg, #00c8b4, #3b6dbf)",
          boxShadow: "0 8px 30px rgba(0,200,180,0.4)",
          border: "2px solid rgba(0,200,180,0.3)",
        }}
        aria-label="Open FAQ assistant"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00c8b4" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 256 256">
            <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM100,140a12,12,0,1,1,12-12A12,12,0,0,1,100,140Zm56,0a12,12,0,1,1,12-12A12,12,0,0,1,156,140Zm-6.22,36.29a48.07,48.07,0,0,1-43.56,0,8,8,0,1,1,7.26-14.24,32,32,0,0,0,29,0,8,8,0,1,1,7.26,14.24ZM72,96H184a8,8,0,0,1,0,16H72a8,8,0,0,1,0-16Z"/>
          </svg>
        )}
      </button>

      {/* Notification bubble */}
      {!open && showNotification && (
        <div
          className="fixed bottom-16 right-4 md:right-6 z-50 px-3 py-1.5 rounded-full text-xs font-medium animate-bounce cursor-pointer"
          style={{
            background: "rgba(7,20,40,0.95)",
            border: "1px solid rgba(0,200,180,0.3)",
            color: "#00c8b4",
          }}
          onClick={() => { setOpen(true); setShowNotification(false); }}
        >
          Ask me anything! 👋
        </div>
      )}
    </>
  );
}
