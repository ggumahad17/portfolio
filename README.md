# Gerald M. Gumahad — Portfolio

A modern, dark-navy portfolio website built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion** — designed for fast Vercel deployment.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   └── page.tsx            # Page — assembles all sections
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section
│   │   ├── About.tsx       # About / bio
│   │   ├── Skills.tsx      # Skills with tabs + progress bars
│   │   ├── Projects.tsx    # Projects with filter
│   │   ├── Experience.tsx  # Work/education timeline
│   │   └── Contact.tsx     # Contact form + social links
│   └── ui/
│       ├── Navbar.tsx      # Sticky navbar + dark mode toggle
│       ├── Footer.tsx      # Footer
│       └── ThemeProvider.tsx # Dark/light mode context
├── data/
│   └── content.json        # ✏️ ALL EDITABLE CONTENT LIVES HERE
├── public/
│   ├── images/             # Add profile.jpg, og-image.png here
│   └── Gerald_Gumahad_Resume.pdf  # Add your resume PDF here
├── styles/
│   └── globals.css         # Global styles + design tokens
├── tailwind.config.ts      # Color system + animation tokens
└── README.md
```

---

## ✏️ How to Edit Content

**Everything you need to change lives in `/data/content.json`.**
You do not need to touch any component files for content updates.

### Change your name / title / tagline

```json
"hero": {
  "name": "Gerald M. Gumahad",
  "title": "SEO Assistant · Data Analyst",
  "tagline": "Turning raw data into rankings — and insights into action."
}
```

### Add a new project

Add an object to the `projects` array in `content.json`:

```json
{
  "id": 5,
  "title": "My New Project",
  "description": "Brief description of what this project does.",
  "tags": ["SEO", "Data", "Semrush"],
  "category": "SEO",
  "live": "https://example.com",
  "github": "https://github.com/you/repo",
  "featured": false
}
```

`category` must match one of the existing categories (or add a new one — the filter will update automatically).

### Add a new experience / timeline entry

Add an object to the `experience` array:

```json
{
  "id": 6,
  "role": "Job Title",
  "company": "Company Name",
  "period": "Jan 2025 – Present",
  "type": "work",
  "description": "What you did there."
}
```

Set `"type"` to `"work"` or `"education"`.

### Update skills

Edit items inside the `skills` array. Each category has `name` (skill name) and `level` (0–100 percentage):

```json
{
  "name": "Semrush",
  "level": 85
}
```

### Update contact info and social links

Edit `contact` in `content.json`. For social links, `icon` must be one of: `email`, `whatsapp`, `linkedin`, `github`.

---

## 🖼️ Changing Images

### Profile photo

1. Add your photo to `/public/images/profile.jpg`
2. In `components/sections/About.tsx`, replace the initials `<div>` block with:

```tsx
import Image from "next/image";

<Image
  src="/images/profile.jpg"
  alt="Gerald M. Gumahad"
  fill
  className="object-cover"
  priority
/>
```

### OG / social share image

Replace `/public/images/og-image.png` with a 1200×630px image.

---

## 📧 Setting Up the Contact Form

This portfolio uses [Formspree](https://formspree.io) for form submissions.

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — you'll get a form ID like `xpwzqabc`.
3. Open `data/content.json` and set:

```json
"contact": {
  "formspreeId": "xpwzqabc"
}
```

That's it — the form will now send emails to your Formspree-connected address.

---

## 🎨 Changing the Color Scheme

All colors are defined as CSS variables in `/styles/globals.css` and as Tailwind tokens in `tailwind.config.ts`.

To change the accent color (currently teal `#00c8b4`):

```css
/* styles/globals.css */
:root {
  --color-accent: #YOUR_COLOR;
}
```

---

## 📤 Adding Your Resume

Place your PDF at `/public/Gerald_Gumahad_Resume.pdf`.

The download button in the navbar and hero section will automatically link to it via `content.json → hero.resume`.

---

## 🌐 Deploying to Vercel

1. Push your project to GitHub.
2. Go to [vercel.com](https://vercel.com) → Import Project → select your repo.
3. Vercel auto-detects Next.js — click **Deploy**.
4. Done! No additional configuration required.

---

## 🔧 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | CSS + requestAnimationFrame |
| Icons | Phosphor Icons (inline SVG) |
| Fonts | Playfair Display + DM Sans + JetBrains Mono |
| Forms | Formspree |
| Deployment | Vercel |

---

## 📄 License

MIT — free to use and adapt.
