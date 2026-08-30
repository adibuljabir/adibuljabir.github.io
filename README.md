# 🌐 Adibul Jabir — Portfolio & Resume Architecture & Maintenance Guide

Welcome to the official documentation and developer guide for **[adibuljabir.github.io](https://adibuljabir.github.io/)**.

This document outlines the **site information hierarchy**, details **which sections are static vs. JSON-powered**, and provides consistent schemas for **how to update, add projects, modify career history, and maintain the site**.

---

## 📋 Table of Contents
1. [Architecture Overview](#-architecture-overview)
2. [Section Breakdown: Static vs. JSON](#-section-breakdown-static-vs-json)
3. [Site Information Hierarchy & Standardized JSON Schemas](#-site-information-hierarchy--standardized-json-schemas)
   - [A. General Site Data (`data/main.json`)](#a-general-site-data-datamainjson)
   - [B. Roles, Resume & Portfolio (`data/roles/*.json`)](#b-roles-resume--portfolio-datarolesjson)
4. [How to Update Static Sections (`index.html`)](#-how-to-update-static-sections-indexhtml)
5. [Managing Assets (PDFs, Images, Videos)](#-managing-assets-pdfs-images-videos)
6. [Local Testing & Deployment](#-local-testing--deployment)

---

## 🏗️ Architecture Overview

The site is built with pure, high-performance web standards (**Semantic HTML5**, **Modern CSS3**, and **Vanilla JavaScript ES6+**):
- **⚡ Pure Modular JSON-Driven Rendering**:
  - `main.js` dynamically loads data directly from `data/main.json` and parallel-fetches modular role files from `data/roles/*.json` using non-blocking asynchronous `fetch()`.
  - Edits to JSON files immediately update the site on refresh without rebuilding JavaScript.
- **📱 100% Responsive & Dark/Light Mode**:
  - Automatically respects user OS system preference with local storage persistence and manual toggle.
- **🏎️ GPU-Accelerated Scroll Motion & Progress**:
  - Smooth staggered entry animations, infinite marquee carousels, and slim scroll reading progress bar.

---

## 📊 Section Breakdown: Static vs. JSON

| Section / Feature | Data Type | Source File | Description |
|---|---|---|---|
| **Header & Navbar** | `Static` | `index.html` | Logo, navigation links, theme toggle, and mobile menu button. |
| **Hero (About Top)** | `Static` | `index.html` | Profile avatar, typing animated role, bio description, CTA buttons. |
| **Collaborated With** | `Dynamic JSON` | `data/main.json` → `"collaboratedWith"` | Infinite partner marquee with logos and links. |
| **What I Do** | `Dynamic JSON` | `data/main.json` → `"whatIDo"` | Core capabilities and service cards with icons and descriptions. |
| **Fun Facts** | `Dynamic JSON` | `data/main.json` → `"funFacts"` | Animated numerical metric counters. |
| **Resume & Portfolio (Tabs)** | `Dynamic JSON` | `data/roles/*.json` | 4 modular role files (`UI-UX Designer.json`, `Developer.json`, `Brand Designer.json`, `3D & Motion Designer.json`) containing selected works, working skills, specialized competencies, and PDF download buttons. |
| **Achievements** | `Dynamic JSON` | `data/main.json` → `"achievements"` | Awards and milestones (auto-distributed: left column first, then right column). |
| **Languages** | `Dynamic JSON` | `data/main.json` → `"languages"` | Spoken and professional communication languages badges. |
| **Experience & Education** | `Dynamic JSON` | `data/main.json` → `"experience"`, `"education"` | Universal career timeline and academic background. |
| **Certifications & Training** | `Dynamic JSON` | `data/main.json` → `"certifications"` | Professional certifications, instructor courses, and career accelerators. |
| **Testimonials** | `Dynamic JSON` | `data/main.json` → `"testimonials"` | Client feedback, avatars, company roles, and LinkedIn links. |
| **Collaboration Packages** | `Static` | `index.html` | Pricing cards with deliverables and features list. |
| **Contact Form & Info** | `Static` | `index.html` | Location, direct email, WhatsApp chat, and Web3Forms AJAX form. |
| **Footer & Social Links** | `Static` | `index.html` | Copyright and social media profile icons. |

---

## 📝 Site Information Hierarchy & Standardized JSON Schemas

All JSON files strictly mirror the visual information hierarchy of the website and use standardized field names (`period`, `company`, `title`, `description`).

### A. General Site Data (`data/main.json`)

Location: [`data/main.json`](data/main.json)

The keys in `data/main.json` follow the top-to-bottom page hierarchy:

```json
{
  "collaboratedWith": [
    {
      "name": "Sprigs",
      "url": "https://sprigs.com/",
      "logo": "images/sprigs.png",
      "alt": "Sprigs"
    }
  ],
  "whatIDo": [
    {
      "icon": "fas fa-cube",
      "title": "3D & Motion Designer",
      "description": "Precision 3D product modeling, cinematic motion graphics, and photorealistic PBR rendering."
    }
  ],
  "funFacts": [
    {
      "icon": "far fa-heart",
      "title": "Happy Clients",
      "count": "50+"
    }
  ],
  "achievements": [
    {
      "period": "5.0 Star Rating",
      "company": "Upwork® Global Inc",
      "title": "5-Star Rated Freelance 3D Specialist",
      "description": "Maintained a 100% five-star rating with stellar client reviews."
    }
  ],
  "experience": [
    {
      "period": "2023 - Present",
      "company": "Ventrixon Studio",
      "title": "Founder, Lead 3D & Creative Director",
      "description": "Directing 3D animations, product visualizations, motion graphics, and UI/UX solutions."
    }
  ],
  "education": [
    {
      "period": "Expected 2027 • CGPA: 3.08",
      "company": "Khulna Khan Bahadur Ahsanullah University",
      "title": "BSc in Computer Science & Engineering",
      "description": "Core computer science foundations, algorithms, and human-computer interaction."
    }
  ],
  "languages": [
    "Bengali (Native)",
    "English (Fluent)",
    "Arabic (Conversational)"
  ],
  "certifications": [
    {
      "period": "UI/UX Certification",
      "company": "Betterskills.io",
      "instructor": "Saidul Islam",
      "title": "Figma UI/UX Design",
      "description": "Professional training covering modern UI/UX workflows, interactive prototyping, and design systems."
    },
    {
      "period": "English & Communication Training",
      "company": "Fondi (Japan)",
      "instructor": "Tatsuto Nohara",
      "title": "Boost Career Path Program",
      "description": "Interactive English conversation, spoken communication, and career development program utilizing Fondi's virtual interactive application."
    }
  ],
  "testimonials": [
    {
      "name": "Val Ciptak Viera",
      "role": "President at Sprigs • New York, USA",
      "linkedinUrl": "https://www.linkedin.com/in/val-ciptak-viera-35a4737/",
      "avatar": "https://media.licdn.com/dms/image/...",
      "quote": "Adibul was great. He was fast and understood what was needed."
    }
  ]
}
```

---

### B. Roles, Resume & Portfolio (`data/roles/*.json`)

Location: [`data/roles/`](data/roles/):
- `data/roles/UI-UX Designer.json`
- `data/roles/Developer.json`
- `data/roles/Brand Designer.json`
- `data/roles/3D & Motion Designer.json`

Each role file strictly follows the visual structure of a role tab:
1. **Identity & Resume Download**: `roleId`, `roleName`, `downloadLabel`, `downloadUrl`, `resumeFileName`
2. **Top Showcase**: `portfolio: [...]`
3. **Working Skills (Left Column)**: `skills: [...]`
4. **Specialized Competencies (Right Column)**: `competencies: [...]`

#### Standardized Role Schema:
```json
{
  "roleId": "uiux",
  "roleName": "UI/UX Designer",
  "downloadLabel": "Download UI/UX Resume",
  "downloadUrl": "assets/Adibul_Jabir_UIUX_Resume.pdf",
  "resumeFileName": "Adibul_Jabir_UIUX_Resume.pdf",
  
  "portfolio": [
    {
      "id": "cellfin-app",
      "category": "uiux",
      "title": "Cellfin Banking App",
      "subtitle": "UI/UX Case Study",
      "description": "Complete mobile banking redesign simplifying transaction flows.",
      "thumbnail": "https://mir-s3-cdn-cf.behance.net/...",
      "lightboxType": "image",
      "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/...",
      "behanceUrl": "https://www.behance.net/gallery/..."
    }
  ],

  "skills": [
    {
      "name": "Figma (UI/UX Design & Prototyping)",
      "percent": "95%"
    }
  ],

  "competencies": [
    "User Flow Mapping",
    "Interactive Wireframes",
    "Design Systems"
  ]
}
```

---

## 📄 How to Update Static Sections (`index.html`)

Location: [`index.html`](index.html)

1. **Hero Bio & Typing Badge**:
   - Lines ~120-132: Modify bio text or typing roles in `.home-desc`.
2. **Pricing Packages**:
   - Lines ~200-260: Update pricing tiers and deliverables lists in `.pricing-grid`.
3. **Contact Info**:
   - Lines ~270-340: Update location, email address, or WhatsApp username in `.contact-info-col`.
4. **Social Links**:
   - Lines ~350-365: Update social profile URLs in `.footer-social-icons`.

---

## 📦 Managing Assets (PDFs, Images, Videos)

- **PDF Resumes**: Place your resume PDFs inside the `assets/` directory (`assets/Adibul_Jabir_UIUX_Resume.pdf`, etc.).
- **Images & Logos**: Place local PNG/JPG images in the `images/` directory.
- **YouTube Videos**: Set the 11-character YouTube video ID in `ytId` within the appropriate role file in `data/roles/<role>.json`.

---

## 🚀 Local Testing & Deployment

### Local Preview:
Run a local web server to preview changes:
```bash
# Python
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Deploying to GitHub Pages:
```bash
git add .
git commit -m "Update portfolio projects and resume data"
git push origin main
```
Your GitHub Pages site will automatically update within seconds.