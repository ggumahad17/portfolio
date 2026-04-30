"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";

/* ============================================================
   CONTACT SECTION
   Content editable in /data/content.json → contact
   To use Formspree: set your form ID in content.json → contact.formspreeId
   or replace the form action with your preferred service.
   ============================================================ */
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(
        `https://formspree.io/f/${content.contact.formspreeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const { contact } = content;

  const socialIcons: Record<string, React.ReactNode> = {
    email: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
      </svg>
    ),
    whatsapp: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,128.14,128.14,0,0,0,128,128,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM192,216A112.13,112.13,0,0,1,80,104a24,24,0,0,1,19.29-23.54l11.48,22.95L101,117.11a8,8,0,0,0-.73,7.65,56.53,56.53,0,0,0,30.15,30.15,8,8,0,0,0,7.65-.73l13.2-8.8,22.95,11.48A24,24,0,0,1,192,216ZM128,24a104,104,0,0,1,91.29,154.21,8,8,0,1,1-14-7.71A88,88,0,1,0,40,128a87.62,87.62,0,0,0,13,46.1,8,8,0,1,1-13.54,8.54A104,104,0,1,1,128,24Z" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
      </svg>
    ),
    github: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68Z" />
      </svg>
    ),
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Bottom glow */}
      <div
        className="absolute left-1/2 bottom-0 w-96 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,200,180,0.4), transparent)",
          transform: "translateX(-50%)",
        }}
      />

      <div className="container-max" ref={ref}>
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <span>05</span>
              <span>Contact</span>
            </div>
            <h2 className="section-heading">
              Let&apos;s work{" "}
              <span className="text-gradient">together</span>
            </h2>
            <p
              className="max-w-lg mx-auto text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Whether you have a project in mind, a role that fits, or just want to say
              hello — my inbox is always open.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
            {/* Left info panel */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Info cards */}
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: contact.email,
                  href: `mailto:${contact.email}`,
                },
                {
                  icon: "📱",
                  label: "WhatsApp",
                  value: contact.phone,
                  href: `https://wa.me/639457938546`,
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: contact.location,
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="card p-4 flex items-center gap-4"
                  style={{ border: "1px solid rgba(18,45,92,0.6)" }}
                >
                  <span className="text-xl w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: "rgba(0,200,180,0.08)", border: "1px solid rgba(0,200,180,0.15)" }}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: "var(--color-text-primary)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8b4")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div>
                <p
                  className="text-xs font-mono uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Connect
                </p>
                <div className="flex gap-3">
                  {contact.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.icon !== "email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-1"
                      style={{
                        backgroundColor: "rgba(18,45,92,0.6)",
                        border: "1px solid rgba(18,45,92,0.8)",
                        color: "var(--color-text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(0,200,180,0.5)";
                        e.currentTarget.style.color = "#00c8b4";
                        e.currentTarget.style.backgroundColor = "rgba(0,200,180,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(18,45,92,0.8)";
                        e.currentTarget.style.color = "var(--color-text-secondary)";
                        e.currentTarget.style.backgroundColor = "rgba(18,45,92,0.6)";
                      }}
                    >
                      {socialIcons[s.icon]}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="lg:col-span-3">
              <div
                className="card p-6 md:p-8"
                style={{ border: "1px solid rgba(18,45,92,0.6)" }}
              >
                {status === "sent" ? (
                  <div className="flex flex-col items-center justify-center h-full py-10 gap-4 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                      style={{ backgroundColor: "rgba(0,200,180,0.1)", border: "2px solid rgba(0,200,180,0.4)" }}
                    >
                      ✅
                    </div>
                    <h3 className="text-xl font-display font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      Message sent!
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      Thanks for reaching out. I&apos;ll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn-outline text-sm mt-2"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="block text-xs font-mono uppercase tracking-wider mb-2"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-mono uppercase tracking-wider mb-2"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-xs font-mono uppercase tracking-wider mb-2"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me about your project or opportunity..."
                        className="form-input resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm" style={{ color: "#f87171" }}>
                        Something went wrong. Please try again or email me directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary justify-center"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M231.4,44.34s0,.1,0,.15l-58.17,191.84a15.88,15.88,0,0,1-14.26,10.89,16.18,16.18,0,0,1-15.31-9.21L108,172l-65.97-35.58a16,16,0,0,1,.53-29.09L224.89,29.14a16,16,0,0,1,6.51,15.2ZM108,168.13,135.41,226.5,184,60.5Zm-3.73-4.13L208.07,60.5l-137,39Z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
