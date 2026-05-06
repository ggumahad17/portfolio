"use client";

import { useState, useRef, useEffect } from "react";

/* ============================================================
   AI CHAT ASSISTANT
   Powered by Claude API (Anthropic)
   Knowledge base built from Gerald's Q&A data
   To update responses: edit the KNOWLEDGE_BASE below
   ============================================================ */

const KNOWLEDGE_BASE = `
You are Gerald Gumahad's personal AI assistant on his portfolio website. You represent Gerald professionally and answer questions about him. Be friendly, concise, and helpful. Always refer to Gerald in third person or say "Gerald" — not "I" unless the question is specifically asking you to speak as Gerald.

Here is everything you know about Gerald:

PERSONAL INFO:
- Full name: Gerald M. Gumahad
- Location: Cebu City, Philippines
- Background: Chemical Engineer transitioning into Data Analytics and SEO
- Email: gerald.gumahad17@gmail.com
- WhatsApp: +63 945 793 8546

WHO HE IS:
- Gerald is a data-driven professional with a background in chemical engineering, now focused on data analytics and SEO.
- He works with data—analyzing it, cleaning it, and turning it into insights that improve performance, whether in operations or digital marketing.
- His current focus is data analytics and SEO, helping businesses make smarter decisions based on data.

CORE SKILLS:
- Data analysis, Excel and Google Sheets, SEO research, data visualization, and performance tracking
- Tools: Excel, Google Sheets, Minitab, Semrush, Google Search Console, GA4, Google PageSpeed Insights, Power BI, Excel VBA
- Platforms: WordPress, Divi, ClickUp, Asana, Slack, Microsoft Teams, Google Workspace

SEO EXPERIENCE:
- Gerald works on keyword research, content optimization, and analyzing search performance to improve visibility and traffic
- He focuses on keyword research, competitor analysis, and optimizing content based on search intent and performance data
- He analyzes keywords, reviews competitors, audits content, and tracks performance metrics to continuously improve rankings
- Managed websites: LevyLaw, GGHLaw, valtrixpowertrain.com, alsaudiatibbifoundation.pk

DATA ANALYTICS:
- He starts by cleaning and organizing the data, then analyzes trends and patterns to generate actionable insights
- He combines technical thinking with real-world problem-solving
- Has worked with large operational datasets, organizing and analyzing them to improve efficiency and reporting accuracy
- Uses Minitab for statistical analysis and interpreting experimental or performance data
- Creates structured reports and dashboards that translate complex data into clear, actionable insights

ENGINEERING BACKGROUND:
- His engineering background trained him to work with complex datasets, identify inefficiencies, and apply structured problem-solving
- Still uses engineering skills especially in data analysis, problem-solving, and process improvement

WORK EXPERIENCE:
- SEO Intern at Growth Orbit Marketing Agency (April 14, 2026 – Present): backlinking and keyword research for valtrixpowertrain.com and alsaudiatibbifoundation.pk
- SEO Assistant/Intern at Zenith Collective (July 2025 – December 2025)
- Researcher at Department of Science and Technology (June 2024 – December 2025)
- Process Engineer at Taganito HPAL Nickel Corporation (December 2020 – December 2023)

EDUCATION:
- Bachelor of Science in Chemical Engineering, Mindanao State University – Iligan Institute of Technology (2015–2019)
- Diploma in Chemical Engineering Technology, MSU-IIT (2012–2015)

AVAILABILITY & WORK:
- Open to freelance, contract, or full-time opportunities depending on the project
- Open to remote and international opportunities
- Can start within one week after an offer
- Open to discussing compensation based on the role and responsibilities
- Can work with small businesses to improve online visibility using practical and data-driven SEO strategies
- Can handle multiple projects by prioritizing based on impact and deadlines

PORTFOLIO:
- Visitors can explore projects and case studies on this website
- Kaggle profile available for data work samples

CONTACT:
- Visitors can reach Gerald through the contact section on the website
- Email: gerald.gumahad17@gmail.com

PERSONALITY & APPROACH:
- Both technical and analytical — has a technical foundation from engineering and strong focus on data-driven decision-making
- Comfortable working with teams and communicates insights clearly
- Stays focused on priorities, relies on data, and works efficiently to meet deadlines
- Continuously explores new tools, trends, and techniques in data analytics and SEO
- Handles messy/unstructured data by cleaning, organizing, and standardizing before analyzing

WHAT MAKES HIM UNIQUE:
- Unique mix of engineering discipline and digital analytics skills
- Approaches problems with structure and precision
- Connects data analytics with SEO — uses analytics to guide optimization strategies
- SEO is driven by data — keyword trends, user behavior, and performance metrics

If asked something not in this knowledge base, say: "I might not have that specific answer, but feel free to reach out to Gerald directly through the contact section and he'll get back to you!"

Keep responses concise — 2-4 sentences max unless more detail is needed. Be warm and professional.
`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What does Gerald do?",
  "What are his skills?",
  "Is he available for work?",
  "How can I contact him?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm Gerald's AI assistant. Ask me anything about his skills, experience, or availability!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: KNOWLEDGE_BASE,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: text },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try reaching out to Gerald directly through the contact section!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-4 md:right-6 z-50 flex flex-col"
          style={{
            width: "min(380px, calc(100vw - 32px))",
            height: "500px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,180,0.2)",
            background: "var(--color-surface, #071428)",
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
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(0,200,180,0.2), rgba(18,45,92,0.6))",
                  border: "1px solid rgba(0,200,180,0.3)",
                  color: "#00c8b4",
                }}
              >
                GG
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#e8edf5" }}>
                  Gerald's Assistant
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs" style={{ color: "#00c8b4" }}>
                    Online
                  </p>
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

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
            style={{ background: "#040d1a" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          background: "linear-gradient(135deg, #00c8b4, #3b6dbf)",
                          color: "#fff",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          background: "rgba(7,20,40,0.9)",
                          border: "1px solid rgba(18,45,92,0.6)",
                          color: "#e8edf5",
                          borderBottomLeftRadius: "4px",
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                  style={{
                    background: "rgba(7,20,40,0.9)",
                    border: "1px solid rgba(18,45,92,0.6)",
                    borderBottomLeftRadius: "4px",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        background: "#00c8b4",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="flex flex-col gap-2 mt-1">
                <p className="text-xs font-mono" style={{ color: "#4a6490" }}>
                  Suggested questions:
                </p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs px-3 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(0,200,180,0.06)",
                      border: "1px solid rgba(0,200,180,0.2)",
                      color: "#00c8b4",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
            style={{
              background: "rgba(7,20,40,0.95)",
              borderTop: "1px solid rgba(18,45,92,0.5)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: "#e8edf5" }}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 flex-shrink-0"
              style={{
                background: input.trim() && !loading ? "#00c8b4" : "rgba(18,45,92,0.6)",
                color: input.trim() && !loading ? "#040d1a" : "#4a6490",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
                <path d="M231.4,44.34s0,.1,0,.15l-58.17,191.84a15.88,15.88,0,0,1-14.26,10.89,16.18,16.18,0,0,1-15.31-9.21L108,172l-65.97-35.58a16,16,0,0,1,.53-29.09L224.89,29.14a16,16,0,0,1,6.51,15.2Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: open
            ? "rgba(7,20,40,0.9)"
            : "linear-gradient(135deg, #00c8b4, #3b6dbf)",
          boxShadow: "0 8px 30px rgba(0,200,180,0.4)",
          border: "2px solid rgba(0,200,180,0.3)",
        }}
        aria-label="Open chat assistant"
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

      {/* Notification dot — shows on first load */}
      {!open && (
        <div
          className="fixed bottom-16 right-4 md:right-6 z-50 px-3 py-1.5 rounded-full text-xs font-medium animate-bounce"
          style={{
            background: "rgba(7,20,40,0.95)",
            border: "1px solid rgba(0,200,180,0.3)",
            color: "#00c8b4",
            pointerEvents: "none",
          }}
        >
          Ask me anything! 👋
        </div>
      )}
    </>
  );
}
