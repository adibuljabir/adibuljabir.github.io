/**
 * Leven Minimalist - Main JavaScript
 * Author: Adibul Jabir
 * Pure JSON-Driven Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Initial Embedded Fallback Data (Ensures instant zero-latency render and offline/file:// support)
  const INITIAL_MAIN_DATA = {
  "collaboratedWith": [
    {
      "name": "Sprigs",
      "url": "https://sprigs.com/",
      "logo": "images/sprigs.png",
      "alt": "Sprigs"
    },
    {
      "name": "KKBAU",
      "url": "https://www.kkbau.ac.bd/",
      "logo": "images/kkbau.png",
      "alt": "KKBAU"
    },
    {
      "name": "PRISM Club",
      "url": "https://www.facebook.com/prism.kkbau.ac.bd",
      "logo": "images/prism-club.png",
      "alt": "PRISM Club"
    },
    {
      "name": "Chisas",
      "url": "https://www.facebook.com/Chinnomul.Samajik.Songstha",
      "logo": "images/chisas.png",
      "alt": "Chisas"
    }
  ],
  "whatIDo": [
    {
      "icon": "fas fa-layer-group",
      "title": "UI/UX Design",
      "description": "Crafting intuitive user interfaces, interactive wireframes, responsive web/mobile designs, and modern component design systems."
    },
    {
      "icon": "fas fa-code",
      "title": "Developer",
      "description": "Building clean, responsive, high-performance web applications and software solutions with modern JavaScript, Python, and CSE foundations."
    },
    {
      "icon": "fas fa-cube",
      "title": "3D & Motion Designer",
      "description": "Precision 3D product modeling, cinematic motion graphics, photorealistic PBR rendering, and video visual effects in Blender and After Effects."
    },
    {
      "icon": "fas fa-vector-square",
      "title": "Brand Design",
      "description": "Creating distinct brand marks, scalable vector identity systems, cohesive color theory palettes, and visual style guidelines."
    }
  ],
  "funFacts": [
    {
      "icon": "fas fa-calendar-alt",
      "title": "Years of Journey",
      "count": "8+"
    },
    {
      "icon": "fas fa-handshake",
      "title": "Collaborated With",
      "count": "23+"
    },
    {
      "icon": "fas fa-star",
      "title": "Client Review",
      "count": "5/5"
    },
    {
      "icon": "fas fa-check-circle",
      "title": "Projects Done",
      "count": "30+"
    }
  ],
  "achievements": [
    {
      "period": "5.0 Star Rating",
      "company": "Upwork\u00ae Global Inc",
      "title": "5-Star Rated Freelance 3D Specialist",
      "description": "Maintained a 100% five-star rating with stellar client reviews across precision 3D product visualizations, hard-surface assets, and motion graphics."
    },
    {
      "period": "Grant & Innovation",
      "company": "Shasthocare Healthtech",
      "title": "UIHP Seed Stage Innovation",
      "description": "Selected and recognized in the University Innovation Hub Program (UIHP) Seed stage for human-centric digital healthcare interface design."
    },
    {
      "period": "Competitive Programming",
      "company": "KKBAU Computer Science",
      "title": "University Programming Contest",
      "description": "Active participant in university programming competitions, solving algorithmic challenges in C/C++ and Python with clean logic."
    }
  ],
  "experience": [
    {
      "period": "April 2025 - Present",
      "company": "PRISM Club",
      "companyUrl": "https://www.facebook.com/prism.kkbau.ac.bd",
      "title": "Print & Media Secretary",
      "description": "Managing branding, event media, website UI/UX, banners, cards & social media posts. Coordinated decoration team for branding consistency & provided technical support such as live sessions with international guests."
    },
    {
      "period": "May 2025 - July 2025",
      "company": "KU IC-5, University Innovation Hub Program",
      "title": "Student Startup Venture (SasthoCare)",
      "description": "A digital doctor consultation platform called SasthoCare. Responsible for UI/UX, Data to visuals, Designing & Presenting the pitch. Awarded Pre-Seed Fund of 20,000 BDT. Learned how a startup works, teamwork, Slack, and pitching."
    },
    {
      "period": "Aug 2018 - Aug 2025",
      "company": "CHISAS",
      "companyUrl": "https://www.facebook.com/Chinnomul.Samajik.Songstha",
      "title": "IT Affairs Secretary",
      "description": "Designed banners, edited videos and rebranded logo/brand colors. Implemented member registration. Captured & edited videos. Coordinated Ramadan Iftar food distribution & children's games. Participated in fundraising for Sylhet flood crisis."
    },
    {
      "period": "June 2023 - July 2023",
      "company": "Upwork.com",
      "companyUrl": "https://www.upwork.com/freelancers/~01693e221fbc54449b",
      "title": "Freelance Illustrator",
      "description": "Designed pattern illustrations for Sprigs, a New York based garment company. Crafted garment designs and delivered on time. Kept a 5-star rating throughout and earned 181.25 USD. Learned how to communicate with clients and handle feedback."
    }
  ],
  "education": [
    {
      "period": "Expected 2027 \u2022 CGPA: 3.08",
      "company": "Khulna Khan Bahadur Ahsanullah University",
      "title": "Bachelor of Science (B.Sc.) in Computer Science and Engineering",
      "description": "Undergraduate studies covering core computing foundations: Data Structures, Algorithms, Software Engineering, Database Management Systems, and Human-Computer Interaction (HCI)."
    },
    {
      "period": "2023 \u2022 GPA: 3.75 / 5.00",
      "company": "Bangladesh Navy School & College, Khulna",
      "title": "Higher Secondary Certificate (HSC) in Science",
      "description": "Completed higher secondary education in the Science discipline with emphasis on Higher Mathematics, Physics, Chemistry, and Information & Communication Technology."
    },
    {
      "period": "2020 \u2022 GPA: 4.06 / 5.00",
      "company": "Bangladesh Navy School & College, Khulna",
      "title": "Secondary School Certificate (SSC) in Science",
      "description": "Completed secondary education under Science group with focus on General Science, Higher Mathematics, and Physics, building strong analytical and problem-solving foundations."
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
      "description": "Professional training covering modern UI/UX workflows, responsive screen design, interactive prototyping, Figma design systems, and developer handoff practices."
    },
    {
      "period": "English & Communication Training",
      "company": "Fondi (Japan)",
      "instructor": "Tatsuto Nohara",
      "title": "Boost Career Path Program",
      "description": "Interactive English conversation, spoken communication, and career development program utilizing Fondi's virtual interactive application for real-time global speaking practice and workplace communication skills."
    }
  ],
  "testimonials": [
    {
      "name": "Val Ciptak Viera",
      "role": "President at Sprigs \u2022 New York, USA",
      "linkedinUrl": "https://www.linkedin.com/in/val-ciptak-viera-35a4737/",
      "avatar": "https://media.licdn.com/dms/image/v2/C4E03AQE0W1zda-wEQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1632862845898?e=1789603200&v=beta&t=sF25WVieGS97Iwn1oVNF6Wd0-GzNrp8Rx7gGvrvLFR8",
      "quote": "Adibul was great. We worked in real time together to edit a jpg into a vector and make changes to it. He was fast and understood what was needed. Good job!!!"
    },
    {
      "name": "Val Ciptak Viera",
      "role": "President at Sprigs \u2022 New York, USA",
      "linkedinUrl": "https://www.linkedin.com/in/val-ciptak-viera-35a4737/",
      "avatar": "https://media.licdn.com/dms/image/v2/C4E03AQE0W1zda-wEQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1632862845898?e=1789603200&v=beta&t=sF25WVieGS97Iwn1oVNF6Wd0-GzNrp8Rx7gGvrvLFR8",
      "quote": "Adibul was great. We worked in real time together to edit a jpg into a vector and make changes to it. He was fast and understood what was needed. Good job!!!"
    },
    {
      "name": "Val Ciptak Viera",
      "role": "President at Sprigs \u2022 New York, USA",
      "linkedinUrl": "https://www.linkedin.com/in/val-ciptak-viera-35a4737/",
      "avatar": "https://media.licdn.com/dms/image/v2/C4E03AQE0W1zda-wEQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1632862845898?e=1789603200&v=beta&t=sF25WVieGS97Iwn1oVNF6Wd0-GzNrp8Rx7gGvrvLFR8",
      "quote": "Adibul was great. We worked in real time together to edit a jpg into a vector and make changes to it. He was fast and understood what was needed. Good job!!!"
    }
  ]
};

  const INITIAL_ROLES_DATA = {
  "uiux": {
    "roleId": "uiux",
    "roleName": "UI/UX Designer",
    "downloadLabel": "Download UI/UX Resume",
    "downloadUrl": "https://ventrixon-my.sharepoint.com/:b:/g/personal/adibuljabir_ventrixon_onmicrosoft_com/IQAq6JaX4ty1TJESMaSdDavPAc9eykyzS5kuyKg3bpI3dYA?e=CsBjEm",
    "resumeFileName": "Adibul Jabir_UIUX Designer_V7_30-08-2026.pdf",
    "portfolio": [
      {
        "id": "cellfin-app",
        "category": "uiux",
        "title": "Cellfin Banking App",
        "subtitle": "UI/UX Case Study",
        "description": "Complete mobile banking redesign simplifying transaction flows and user confidence.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/403a00248330667.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/403a00248330667.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "behanceUrl": "https://www.behance.net/gallery/248330667/Cellfin-Banking-App-%28Case-Study%29"
      },
      {
        "id": "saas-landing",
        "category": "uiux",
        "title": "SaaS Landing Page",
        "subtitle": "Web & UI/UX",
        "description": "Conversion-focused, scalable design system created for high-growth SaaS web platforms.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/e3b8d7247425937.Y3JvcCwxMzQyLDEwNTAsMjksMA.png",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/e3b8d7247425937.Y3JvcCwxMzQyLDEwNTAsMjksMA.png",
        "behanceUrl": "https://www.behance.net/gallery/247425937/SaaS-Landing-Page"
      },
      {
        "id": "nsaas-dashboard",
        "category": "uiux",
        "title": "NSaaS Analytics Dashboard",
        "subtitle": "Dashboard UI",
        "description": "Modern SaaS analytics dashboard engineered for complex metrics and clean readability.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/3e8d3a246613705.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/3e8d3a246613705.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "behanceUrl": "https://www.behance.net/gallery/246613705/NSaaS-Analytics-Dashboard-Modern-SaaS-UI-Design"
      },
      {
        "id": "gaming-controller",
        "category": "uiux",
        "title": "Gaming Controller Landing Page",
        "subtitle": "Product Landing Page",
        "description": "Bold and immersive product landing page design showcasing gaming hardware.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/bafc7f246580577.Y3JvcCwxMzQyLDEwNTAsMjksMA.png",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/bafc7f246580577.Y3JvcCwxMzQyLDEwNTAsMjksMA.png",
        "behanceUrl": "https://www.behance.net/gallery/246580577/Gaming-Controller-Landing-Page"
      },
      {
        "id": "tech-community",
        "category": "uiux",
        "title": "Tech Community Platform",
        "subtitle": "Web Platform UI",
        "description": "Structured community hub UI designed to promote collaboration and event engagement.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/80ca76246457181.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/80ca76246457181.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "behanceUrl": "https://www.behance.net/gallery/246457181/Tech-Community-Platform-UI-Innovation-Club"
      },
      {
        "id": "fast-food-ui",
        "category": "uiux",
        "title": "Fast Food Restaurant UI",
        "subtitle": "UI / Web Design",
        "description": "Modern ordering interface designed for swift digital menu browsing and checkout.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/dcec4c246406463.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/dcec4c246406463.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "behanceUrl": "https://www.behance.net/gallery/246406463/Fast-Food-Restaurant-Website-UI"
      },
      {
        "id": "ngo-charity-ui",
        "category": "uiux",
        "title": "NGO Charity Platform",
        "subtitle": "UI / Social Impact",
        "description": "Accessible charity portal with structured donation flows and expense tracking dashboard.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/56a9ee246404011.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/56a9ee246404011.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "behanceUrl": "https://www.behance.net/gallery/246404011/NGO-Charity-Platform-UI-Donation-Volunteer"
      }
    ],
    "skills": [
      {
        "category": "UI/UX Design (Primary)",
        "items": [
          "User Interface Design (Web, Mobile & SaaS)",
          "User Research & Competitive Analysis",
          "Wireframing & Prototyping (Figma)",
          "Design Systems & Component based UI",
          "Responsive Design & Accessibility"
        ]
      },
      {
        "category": "Supporting Skills",
        "items": [
          "Brand Identity & Visual Design",
          "Basic Motion",
          "Presentation Design & Presenting",
          "HTML, CSS, JS, XML, XAML"
        ]
      },
      {
        "category": "Technical Awareness",
        "items": [
          "Basic knowledge of Java, Kotlin, Python, C#"
        ]
      },
      {
        "category": "AI-Assisted Design Workflow",
        "items": [
          "Ideation & concept by Stitch & Figma Make",
          "Rapid iteration using AI-supported tools"
        ]
      },
      {
        "category": "Design Tools",
        "items": [
          "Figma, Adobe Illustrator",
          "After Effects & Blender"
        ]
      },
      {
        "category": "Collaboration",
        "items": [
          "Agile team collaboration",
          "Stakeholder & Dev communication"
        ]
      }
    ]
  },
  "developer": {
    "roleId": "developer",
    "roleName": "Developer",
    "downloadLabel": "Download Developer Resume",
    "downloadUrl": "https://ventrixon-my.sharepoint.com/:b:/g/personal/adibuljabir_ventrixon_onmicrosoft_com/IQCovd7ZTccKRJQHHjli2ITEAbCi5NuyEgeY1HZigXmnFsc?e=OdaAJ5",
    "resumeFileName": "Adibul Jabir Developer V2_30-08-2026.pdf",
    "portfolio": [
      {
        "id": "tada-tour-bill",
        "category": "dev",
        "type": "code",
        "title": "TA-DA Bill Generator",
        "subtitle": "C \u2022 CLI \u2022 File I/O",
        "description": "CLI logistics & allowance calculator with robust file stream persistence in C.",
        "langTag": "C / Systems",
        "roleTag": "Author & Maintainer",
        "codeSnippet": [
          "FILE *Tour_Diary = fopen(\"Tour_Diary.txt\", \"a\");",
          "int distance, expense1, expense2;",
          "fprintf(Transport_Bill, \"| %02d-%02d-%04d |...\");"
        ],
        "repoName": "adibuljabir/TA-DA-Tour...",
        "stars": "1",
        "githubUrl": "https://github.com/adibuljabir/TA-DA-Tour-Transport-Bill-Generator",
        "sourceUrl": "https://github.com/adibuljabir/TA-DA-Tour-Transport-Bill-Generator/blob/master/TourBill.c"
      },
      {
        "id": "findit-app",
        "category": "dev",
        "type": "code",
        "title": "FindIT Mobile App",
        "subtitle": "Android \u2022 Kotlin \u2022 Mobile",
        "description": "Native Android utility built for intuitive item tracking and index discovery.",
        "langTag": "Kotlin / Android",
        "langColor": "#a78bfa",
        "roleTag": "Android App",
        "codeSnippet": [
          "class FindItemActivity : AppCompatActivity() {",
          "  val tracker = rememberTracker()",
          "  initLocationIndex(savedInstanceState)",
          "}"
        ],
        "repoName": "adibuljabir/FindIT",
        "footerMeta": "Gradle \u2022 Kotlin",
        "githubUrl": "https://github.com/adibuljabir/FindIT"
      },
      {
        "id": "khaon-management",
        "category": "dev",
        "type": "code",
        "title": "Khaon Food Management",
        "subtitle": "Java \u2022 Software Architecture",
        "description": "Modular food ordering and inventory system built with clean OOP architecture.",
        "langTag": "Java / OOP",
        "langColor": "#fb923c",
        "roleTag": "Software System",
        "codeSnippet": [
          "public class KhaonManager {",
          "  private List<OrderItem> orders;",
          "  public double calculateInventory() { ... }",
          "}"
        ],
        "repoName": "adibuljabir/Khaon",
        "footerMeta": "Java \u2022 OOP Design",
        "githubUrl": "https://github.com/adibuljabir/Khaon"
      },
      {
        "id": "collab-repos",
        "category": "dev",
        "type": "code",
        "title": "Collaborative Repos & PRs",
        "subtitle": "Git \u2022 Open Source \u2022 Team Repos",
        "description": "Active collaborator in university competitions, team projects, and open repositories.",
        "langTag": "Open Source",
        "langColor": "#4ade80",
        "roleTag": "Contributor",
        "codeSnippet": [
          "git checkout -b feature/ui-improvement",
          "git commit -m \"feat: optimize pipeline\"",
          "git push origin pull-request"
        ],
        "repoName": "github.com/adibuljabir",
        "footerMeta": "PRs \u2022 Code Review",
        "githubUrl": "https://github.com/adibuljabir"
      }
    ],
    "skills": [
      {
        "category": "Languages",
        "items": [
          "C#",
          "C/C++",
          "Java",
          "Kotlin",
          "Python",
          "JavaScript (ES6+)",
          "SQL",
          "HTML5/CSS3"
        ]
      },
      {
        "category": "Frameworks & Runtimes",
        "items": [
          ".NET 8 (WPF)",
          "Android SDK",
          "Entity Framework Core",
          "Node.js"
        ]
      },
      {
        "category": "Architecture & Practices",
        "items": [
          "MVVM",
          "OOP",
          "Async / Multi-threaded Systems",
          "Responsive"
        ]
      },
      {
        "category": "Databases & Cloud",
        "items": [
          "PostgreSQL",
          "Neon.tech (Serverless)",
          "RESTful APIs",
          "Git / GitHub Actions"
        ]
      },
      {
        "category": "Tools & Libraries",
        "items": [
          "QuestPDF",
          "LiveCharts2",
          "Figma",
          "VS Code"
        ]
      },
      {
        "category": "Design Crossover",
        "items": [
          "UI/UX Design",
          "Figma-to-Code Workflow",
          "Design Systems"
        ]
      }
    ]
  },
  "brand": {
    "roleId": "brand",
    "roleName": "Brand Designer",
    "downloadLabel": "Download Brand Designer Resume",
    "downloadUrl": "https://ventrixon-my.sharepoint.com/:b:/g/personal/adibuljabir_ventrixon_onmicrosoft_com/IQC-DuPUmmN7RbaGlFJsBFEDAZPRSmrtVbYkz0wlJR9si3o?e=BJUUTv",
    "resumeFileName": "Adibul Jabir_Brand Designer_Resume_30-08-2026.pdf",
    "portfolio": [
      {
        "id": "prism-club-branding",
        "category": "branding",
        "title": "PRISM Club",
        "subtitle": "Brand Identity & Media",
        "description": "Designed complete visual identity: official logo, social media appearance, event banners, and brand assets.",
        "thumbnail": "images/prism-brand.jpg",
        "lightboxType": "image",
        "lightboxSrc": "images/prism-brand.jpg",
        "facebookUrl": "https://www.facebook.com/prism.kkbau.ac.bd/"
      },
      {
        "id": "chisas-brand-redesign",
        "category": "branding",
        "title": "CHISAS",
        "subtitle": "Brand Identity & Social Impact",
        "description": "Redesigned official logo, social media appearance, event banners, visual assets, and video content.",
        "thumbnail": "images/chisas-brand.jpg",
        "lightboxType": "image",
        "lightboxSrc": "images/chisas-brand.jpg",
        "facebookUrl": "https://www.facebook.com/Chinnomul.Samajik.Songstha/"
      },
      {
        "id": "rxt-gaming-stream",
        "category": "branding motion",
        "title": "RXT Gaming",
        "subtitle": "Stream Branding & Motion Assets",
        "description": "Designed dynamic animated stream identity: Starting Scene, End Scene, in-game overlays, popups, and synced motion branding.",
        "thumbnail": "images/rxt-gaming.jpg",
        "lightboxType": "image",
        "lightboxSrc": "images/rxt-gaming.jpg",
        "facebookUrl": "https://www.facebook.com/rxtgaming7025"
      }
    ],
    "skills": [
      {
        "category": "Brand Design",
        "items": [
          "Consistency",
          "Design System",
          "Synced Motion"
        ]
      },
      {
        "category": "Design Tools",
        "items": [
          "Blender",
          "Adobe Illustrator",
          "Figma",
          "Adobe After Effects"
        ]
      },
      {
        "category": "Additional Skills",
        "items": [
          "UI/UX Design & Dev",
          "Presentation Design & Presenting"
        ]
      },
      {
        "category": "Data Visualization",
        "items": [
          "Charts",
          "Bars etc"
        ]
      }
    ]
  },
  "3d": {
    "roleId": "3d",
    "roleName": "3D & Motion Designer",
    "downloadLabel": "Download 3D & Motion Designer Resume",
    "downloadUrl": "https://ventrixon-my.sharepoint.com/:b:/g/personal/adibuljabir_ventrixon_onmicrosoft_com/IQAyp5OQM6Y3S65EkHIzoBYxAVHXcwN8zIAbHn78KtKRkSU?e=etSREg",
    "resumeFileName": "Adibul Jabir 3D & Motion Designer V3_30-08-2026.pdf",
    "portfolio": [
      {
        "id": "ventrixon-logo-anim",
        "category": "branding 3d",
        "title": "Ventrixon Logo Animation",
        "subtitle": "Brand Motion Graphics",
        "description": "Smooth brand-driven motion graphics and cinematic reveal timing in After Effects.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/40fb3f246479509.Y3JvcCwxNTM0LDEyMDAsMzQsMA.gif",
        "badge": "Branding Motion",
        "youtubeUrl": "https://www.youtube.com/@Ventrixon",
        "behanceUrl": "https://www.behance.net/gallery/246479509/Ventrixon-Logo-Animation"
      },
      {
        "id": "motion-logo-intro",
        "category": "branding 3d",
        "title": "4K Motion Logo Intro",
        "subtitle": "Brand Motion Graphics",
        "description": "Cinematic 4K brand-driven motion graphics and fluid reveal animations.",
        "thumbnail": "https://i.ytimg.com/vi/hBbHoIONYf0/hqdefault.jpg",
        "badge": "4K Motion",
        "ytId": "hBbHoIONYf0",
        "youtubeUrl": "https://www.youtube.com/watch?v=hBbHoIONYf0",
        "lightboxType": "video",
        "lightboxSrc": "https://www.youtube-nocookie.com/embed/hBbHoIONYf0?autoplay=1&rel=0"
      },
      {
        "id": "hoodie-3d-cloth",
        "category": "branding 3d",
        "title": "Hoodie Apparel Animation",
        "subtitle": "3D Branding Simulation",
        "description": "Dynamic cloth simulation and stylized commercial showcase for apparel brands.",
        "thumbnail": "https://i.ytimg.com/vi/-oDgaHYAk5M/hqdefault.jpg",
        "badge": "3D Cloth Sim",
        "ytId": "-oDgaHYAk5M",
        "youtubeUrl": "https://www.youtube.com/shorts/-oDgaHYAk5M",
        "lightboxType": "video",
        "lightboxSrc": "https://www.youtube-nocookie.com/embed/-oDgaHYAk5M?autoplay=1&rel=0"
      },
      {
        "id": "motherboard-3d",
        "category": "3d",
        "title": "Motherboard 3D Animation",
        "subtitle": "3D Animation",
        "description": "Detailed hardware component visualization and cinematic motion graphics.",
        "thumbnail": "https://i.ytimg.com/vi/0Eb3AAcaTEc/hqdefault.jpg",
        "badge": "3D Hardware",
        "ytId": "0Eb3AAcaTEc",
        "youtubeUrl": "https://www.youtube.com/watch?v=0Eb3AAcaTEc",
        "behanceUrl": "https://www.behance.net/gallery/212128653/Full-Youtube-Video-of-Motherboard-Animation",
        "lightboxType": "video",
        "lightboxSrc": "https://www.youtube-nocookie.com/embed/0Eb3AAcaTEc?autoplay=1&rel=0"
      },
      {
        "id": "refrigerator-ad",
        "category": "3d",
        "title": "Refrigerator Commercial Ad",
        "subtitle": "Commercial 3D Video",
        "description": "Commercial product video featuring photorealistic lighting, shaders, and appliance animation.",
        "thumbnail": "https://i.ytimg.com/vi/FkkAfB6_9SU/hqdefault.jpg",
        "badge": "Commercial 3D",
        "ytId": "FkkAfB6_9SU",
        "youtubeUrl": "https://www.youtube.com/watch?v=FkkAfB6_9SU",
        "behanceUrl": "https://www.behance.net/gallery/215395279/Animation-of-Refrigerator-Advertisement",
        "lightboxType": "video",
        "lightboxSrc": "https://www.youtube-nocookie.com/embed/FkkAfB6_9SU?autoplay=1&rel=0"
      },
      {
        "id": "low-poly-gun",
        "category": "3d",
        "title": "Low Poly Anti-Aircraft Gun",
        "subtitle": "3D Modeling",
        "description": "Stylized game-ready 3D prop modeled with clean topology and color-based materials.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/3c7be7246476437.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "behanceUrl": "https://www.behance.net/gallery/246476437/Low-Poly-Anti-Aircraft-Gun",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/3c7be7246476437.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png"
      },
      {
        "id": "low-poly-train",
        "category": "3d",
        "title": "Low Poly Train Model",
        "subtitle": "3D Modeling",
        "description": "Stylized 3D model of the EMD GT42ACL locomotive with passenger coach in Blender.",
        "thumbnail": "https://mir-s3-cdn-cf.behance.net/projects/404/59f610246476151.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png",
        "behanceUrl": "https://www.behance.net/gallery/246476151/Low-Poly-Train-Model",
        "lightboxType": "image",
        "lightboxSrc": "https://mir-s3-cdn-cf.behance.net/projects/404/59f610246476151.Y3JvcCwxNTM0LDEyMDAsMzQsMA.png"
      },
      {
        "id": "locomotive-anim",
        "category": "3d",
        "title": "Locomotive 3D Animation",
        "subtitle": "3D Vehicle Animation",
        "description": "Stylized 3D low poly train animation featuring realistic mechanical motion.",
        "thumbnail": "https://i.ytimg.com/vi/9dpz015aejE/hqdefault.jpg",
        "badge": "3D Animation",
        "ytId": "9dpz015aejE",
        "youtubeUrl": "https://www.youtube.com/watch?v=9dpz015aejE",
        "lightboxType": "video",
        "lightboxSrc": "https://www.youtube-nocookie.com/embed/9dpz015aejE?autoplay=1&rel=0"
      },
      {
        "id": "donut-recreation",
        "category": "3d",
        "title": "Realistic 3D Donut",
        "subtitle": "3D Modeling & Shading",
        "description": "Photorealistic procedural texturing, particle sprinkles, and lighting in Blender.",
        "thumbnail": "https://i.ytimg.com/vi/dYq1ATkLAj8/hqdefault.jpg",
        "badge": "3D Shading",
        "ytId": "dYq1ATkLAj8",
        "youtubeUrl": "https://www.youtube.com/watch?v=dYq1ATkLAj8",
        "lightboxType": "video",
        "lightboxSrc": "https://www.youtube-nocookie.com/embed/dYq1ATkLAj8?autoplay=1&rel=0"
      }
    ],
    "skills": [
      {
        "category": "3D Design & Visualization (Primary)",
        "items": [
          "Blender",
          "Hard-Surface Modeling",
          "Product Visualization",
          "Basic Texturing",
          "Lighting",
          "Rendering",
          "Animation",
          "Motion Graphics"
        ]
      },
      {
        "category": "Design Tools",
        "items": [
          "Blender",
          "Adobe Illustrator",
          "Figma",
          "Adobe After Effects"
        ]
      },
      {
        "category": "Technical Awareness",
        "items": [
          "Basic knowledge of Java, Kotlin, Python"
        ]
      },
      {
        "category": "Additional Skills",
        "items": [
          "UI/UX Design",
          "Brand Identity & Visual Design",
          "Presentation Design & Presenting"
        ]
      },
      {
        "category": "Collaboration",
        "items": [
          "Stakeholder & Dev communication"
        ]
      }
    ]
  }
};

  // 1. Theme Management (System Detection & Saved Persistence)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  function applyTheme(theme, save = true) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (save) localStorage.setItem('theme', 'dark');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
        btn.setAttribute('title', 'Switch to Light Theme');
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (save) localStorage.setItem('theme', 'light');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        btn.setAttribute('title', 'Switch to Dark Theme');
      });
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else {
    applyTheme(prefersDarkScheme.matches ? 'dark' : 'light', false);
  }

  if (prefersDarkScheme.addEventListener) {
    prefersDarkScheme.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark', true);
    });
  });

  // 2. Single-Page Navigation, Smooth Scroll & ScrollSpy
  const navLinks = document.querySelectorAll('.site-nav .nav-item a');
  const sections = document.querySelectorAll('.tab-section, .page-section, section[id]');
  const mobileMenuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.site-nav');

  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    updateActiveNavLink(targetId);

    if (targetId === 'resume') {
      animateActiveSkillBars();
    }
  }

  function updateActiveNavLink(currentId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkId = href.replace('#', '');
      if (linkId === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function switchToRole(roleKey) {
    const targetBtn = document.querySelector(`.resume-filter-btn[data-role="${roleKey}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }

  // ScrollSpy with IntersectionObserver
  function initScrollSpy() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            updateActiveNavLink(sectionId);
            if (sectionId === 'resume') {
              animateActiveSkillBars();
            }
          }
        }
      });
    }, observerOptions);

    sections.forEach(sec => spyObserver.observe(sec));
  }

  // Handle all internal hash clicks
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        
        if (navMenu) {
          navMenu.classList.remove('open');
        }

        if (targetId === 'dev' || targetId === 'code' || targetId === 'developer') {
          e.preventDefault();
          history.pushState(null, null, href);
          switchToRole('developer');
          scrollToSection('resume');
        } else if (targetId === '3d') {
          e.preventDefault();
          history.pushState(null, null, href);
          switchToRole('3d');
          scrollToSection('resume');
        } else if (targetId === 'uiux' || targetId === 'ui-ux' || targetId === 'design') {
          e.preventDefault();
          history.pushState(null, null, href);
          switchToRole('uiux');
          scrollToSection('resume');
        } else if (targetId === 'branding' || targetId === 'brand') {
          e.preventDefault();
          history.pushState(null, null, href);
          switchToRole('brand');
          scrollToSection('resume');
        } else if (targetId === 'portfolio') {
          e.preventDefault();
          history.pushState(null, null, href);
          scrollToSection('resume');
        } else if (document.getElementById(targetId)) {
          e.preventDefault();
          history.pushState(null, null, href);
          scrollToSection(targetId);
        }
      }
    });
  });

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  initScrollSpy();

  if (window.location.hash) {
    const rawHash = window.location.hash.substring(1);
    setTimeout(() => {
      if (['uiux', 'developer', 'brand', '3d'].includes(rawHash)) {
        switchToRole(rawHash);
        scrollToSection('resume');
      } else if (document.getElementById(rawHash)) {
        scrollToSection(rawHash);
      }
    }, 150);
  }

  // 3. 3D Tilt Effect on Hero Photo
  const homePhoto = document.querySelector('.home-photo');
  const hpInner = document.querySelector('.hp-inner');
  if (homePhoto && hpInner) {
    homePhoto.addEventListener('mousemove', (e) => {
      const rect = homePhoto.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 14;
      const rotateY = (x / (rect.width / 2)) * 14;
      hpInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    homePhoto.addEventListener('mouseleave', () => {
      hpInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 4. Typing Effect for Subtitle Roles
  const typingEl = document.querySelector('.role-typing');
  if (typingEl) {
    const roles = [
      'CSE Student @ KKBAU',
      'UI/UX Designer',
      'Developer',
      'Brand Designer',
      '3D & Motion Designer',
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 45;
      } else {
        typingEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // 5. Dynamic Data Render Engine (Pure JSON-Driven)
  let currentResumeData = null;

  // --- What I Do Renderer ---
  function renderWhatIDo(items) {
    const container = document.getElementById('services-list');
    if (!container || !items || !items.length) return;

    container.innerHTML = items.map(item => `
      <div class="service-item">
        <div class="service-icon">
          <i class="${item.icon}"></i>
        </div>
        <div class="service-content">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      </div>
    `).join('');
  }

  // --- Fun Facts Renderer ---
  function renderFunFacts(facts) {
    const container = document.getElementById('fun-facts-grid');
    if (!container || !facts || !facts.length) return;

    container.innerHTML = facts.map(f => {
      const cleanCount = (f.count || '').toString();
      return `
        <div class="fact-box">
          <div class="fact-icon"><i class="${f.icon}"></i></div>
          <div class="fact-title">${f.title}</div>
          <div class="fact-number" data-count="${cleanCount}">${cleanCount}</div>
        </div>
      `;
    }).join('');
  }

  // --- Testimonials Renderer (Infinite Horizontal Animated Marquee) ---
  function renderTestimonials(testimonials) {
    const track = document.getElementById('testimonials-marquee-track');
    if (!track || !testimonials || !testimonials.length) return;

    const makeGroup = (isAriaHidden = false) => `
      <div class="testimonials-track-group" ${isAriaHidden ? 'aria-hidden="true"' : ''}>
        ${testimonials.map(t => `
          <div class="testimonial-card">
            <div class="testimonial-avatar">
              <img src="${t.avatar}" alt="${t.name}" width="48" height="48" loading="lazy" decoding="async" referrerpolicy="no-referrer">
            </div>
            <div class="testimonial-text">
              "${t.quote}"
            </div>
            <div class="testimonial-author-box">
              <div class="testimonial-author">
                <h5><a href="${t.linkedinUrl || '#'}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${t.name}</a></h5>
                <span>${t.role}</span>
              </div>
              <div class="testimonial-quote-icon"><i class="fas fa-quote-right"></i></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    track.innerHTML = makeGroup(false) + makeGroup(true) + makeGroup(true);
  }

  // --- Collaborated With Marquee Renderer ---
  function renderCollaboratedWith(clients) {
    const track = document.getElementById('clients-marquee-track');
    if (!track || !clients || !clients.length) return;

    const makeGroup = (isAriaHidden = false) => `
      <div class="clients-track-group" ${isAriaHidden ? 'aria-hidden="true"' : ''}>
        ${clients.map(c => `
          <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="client-item" title="${c.name}">
            <img src="${c.logo}" alt="${c.alt || c.name}" width="120" height="40" loading="lazy" decoding="async">
          </a>
        `).join('')}
      </div>
    `;

    track.innerHTML = makeGroup(false) + makeGroup(true) + makeGroup(true);
  }

  // --- Achievements Renderer (Universal Timeline from main.json) ---
  function renderAchievements(achievements) {
    const container = document.getElementById('achievements-timeline');
    if (!container || !achievements || !Array.isArray(achievements) || !achievements.length) return;

    container.innerHTML = achievements.map(item => `
      <div class="timeline-item">
        <span class="timeline-period">${item.period || ''}</span>
        <span class="timeline-company">${item.company || ''}</span>
        <h4 class="timeline-title">${item.title || ''}</h4>
        <p class="timeline-desc">${item.description || ''}</p>
      </div>
    `).join('');
  }

  // --- Experience & Education Renderer (Universal Timeline from main.json) ---
  function renderExperienceAndEducation(experience, education) {
    const expContainer = document.getElementById('experience-timeline');
    const eduContainer = document.getElementById('education-timeline');

    const makeItemHtml = (item) => {
      const companyHtml = item.companyUrl
        ? `<a href="${item.companyUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; text-underline-offset: 3px;">${item.company}</a>`
        : (item.company || '');

      return `
        <div class="timeline-item">
          <span class="timeline-period">${item.period || ''}</span>
          <span class="timeline-company">${companyHtml}</span>
          <h4 class="timeline-title">${item.title || ''}</h4>
          <p class="timeline-desc">${item.description || item.desc || ''}</p>
        </div>
      `;
    };

    if (expContainer && experience && Array.isArray(experience)) {
      expContainer.innerHTML = experience.map(makeItemHtml).join('');
    }
    if (eduContainer && education && Array.isArray(education)) {
      eduContainer.innerHTML = education.map(makeItemHtml).join('');
    }
  }

  // --- Languages Renderer (Universal from main.json) ---
  function renderLanguages(languages) {
    const container = document.getElementById('languages-container');
    if (!container || !languages || !Array.isArray(languages)) return;
    container.innerHTML = languages.map(l => `<span class="badge-item">${l}</span>`).join('');
  }

  // --- Certifications & Training Renderer (Universal Timeline from main.json) ---
  function renderCertifications(certifications) {
    const container = document.getElementById('certifications-timeline');
    if (!container || !certifications || !Array.isArray(certifications) || !certifications.length) return;

    container.innerHTML = certifications.map(item => {
      const instructorText = item.instructor ? ` • Instructor: ${item.instructor}` : '';
      return `
        <div class="timeline-item">
          <span class="timeline-period">${item.period || 'Certification'}</span>
          <span class="timeline-company">${item.company || ''}${instructorText}</span>
          <h4 class="timeline-title">${item.title || ''}</h4>
          <p class="timeline-desc">${item.description || item.desc || ''}</p>
        </div>
      `;
    }).join('');
  }

  // --- Portfolio Single Card HTML Generator ---
  function generatePortfolioCardHtml(item) {
    if (item.type === 'code') {
      const langStyle = item.langColor ? `style="color: ${item.langColor}; border-color: ${item.langColor}40;"` : '';
      const snippetHtml = (item.codeSnippet || []).map(line => `<div>${line}</div>`).join('');
      const footerSpan2 = item.stars ? `<span><i class="fas fa-star" style="color: #fbbf24;"></i> ${item.stars}</span>` : `<span>${item.footerMeta || ''}</span>`;
      const sourceBtn = item.sourceUrl ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" title="View Source Code"><i class="fas fa-code"></i></a>` : '';

      return `
        <div class="portfolio-card" data-category="${item.category}">
          <div class="portfolio-thumb-box">
            <div class="code-thumb-preview">
              <div class="code-thumb-header">
                <span class="code-lang-tag" ${langStyle}>${item.langTag || 'Code'}</span>
                <span class="code-role-tag">${item.roleTag || 'Project'}</span>
              </div>
              <div class="code-thumb-snippet">
                ${snippetHtml}
              </div>
              <div class="code-thumb-footer">
                <span><i class="fab fa-github"></i> ${item.repoName || 'Repository'}</span>
                ${footerSpan2}
              </div>
            </div>
            <div class="portfolio-overlay">
              <a href="${item.githubUrl}" target="_blank" rel="noopener noreferrer" title="View Repository on GitHub"><i class="fab fa-github"></i></a>
              ${sourceBtn}
            </div>
          </div>
          <div class="portfolio-details">
            <span class="portfolio-category">${item.subtitle || ''}</span>
            <h4 class="portfolio-title">${item.title}</h4>
            <p class="portfolio-desc">${item.description || ''}</p>
          </div>
        </div>
      `;
    }

    // Image / Video Card
    const isVideoCard = Boolean(item.ytId || item.video || item.lightboxType === 'video');
    const ytAttr = item.ytId ? `data-yt-id="${item.ytId}"` : '';
    const badgeHtml = isVideoCard ? `<div class="video-play-badge"><i class="fas fa-play"></i> Autoplay</div>` : '';
    
    let overlayActions = '';
    if (item.youtubeUrl) {
      overlayActions += `<a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" title="Watch on YouTube"><i class="fab fa-youtube"></i></a>`;
    }
    if (item.lightboxType) {
      overlayActions += `<button class="open-lightbox" data-type="${item.lightboxType}" data-src="${item.lightboxSrc}" data-title="${item.title}" data-desc="${item.description || ''}"><i class="${item.lightboxType === 'video' ? 'fas fa-play' : 'fas fa-search-plus'}"></i></button>`;
    }
    if (item.behanceUrl) {
      overlayActions += `<a href="${item.behanceUrl}" target="_blank" rel="noopener noreferrer" title="View on Behance"><i class="fab fa-behance"></i></a>`;
    }
    if (item.facebookUrl) {
      overlayActions += `<a href="${item.facebookUrl}" target="_blank" rel="noopener noreferrer" title="View on Facebook"><i class="fab fa-facebook-f"></i></a>`;
    }
    if (item.externalUrl || item.linkUrl) {
      overlayActions += `<a href="${item.externalUrl || item.linkUrl}" target="_blank" rel="noopener noreferrer" title="Visit Link"><i class="fas fa-external-link-alt"></i></a>`;
    }

    return `
      <div class="portfolio-card" data-category="${item.category}" ${ytAttr}>
        <div class="portfolio-thumb-box">
          <img src="${item.thumbnail}" alt="${item.title}" width="400" height="250" referrerpolicy="no-referrer" loading="lazy" decoding="async">
          ${badgeHtml}
          <div class="portfolio-overlay">
            ${overlayActions}
          </div>
        </div>
        <div class="portfolio-details">
          <span class="portfolio-category">${item.subtitle || ''}</span>
          <h4 class="portfolio-title">${item.title}</h4>
          <p class="portfolio-desc">${item.description || ''}</p>
        </div>
      </div>
    `;
  }

  // --- Dynamic Resume Download Button Updater ---
  function updateResumeDownloadButton(roleKey) {
    const dlBtn = document.getElementById('resume-download-btn');
    const dlText = document.getElementById('resume-download-text');
    if (!dlBtn) return;

    const key = roleKey || 'uiux';
    const roleData = currentResumeData && currentResumeData[key];
    if (!roleData) return;

    const url = roleData.downloadUrl || `assets/Adibul_Jabir_${key}_Resume.pdf`;
    const filename = roleData.resumeFileName || `Adibul_Jabir_${key}_Resume.pdf`;
    const label = roleData.downloadLabel || `Download ${roleData.roleName || 'Role'} Resume`;

    dlBtn.href = url;
    dlBtn.setAttribute('download', filename);
    dlBtn.title = label;
    dlBtn.setAttribute('aria-label', label);
    if (dlText) {
      dlText.textContent = label;
    }
  }

  // --- Unified Resume & Portfolio Roles Renderer ---
  function renderResumeRoles(rolesData) {
    const container = document.getElementById('resume-panes-container');
    if (!container || !rolesData) return;

    currentResumeData = rolesData;

    const currentActiveRole = document.querySelector('.resume-filter-btn.active')?.getAttribute('data-role') || 'uiux';
    const roleKeys = Object.keys(rolesData);
    container.innerHTML = roleKeys.map((key) => {
      const role = rolesData[key];
      const activeClass = key === currentActiveRole ? 'active' : '';

      const eduItems = (role.education || []).map(e => `
        <div class="timeline-item">
          <span class="timeline-period">${e.period || ''}</span>
          <span class="timeline-company">${e.company || ''}</span>
          <h4 class="timeline-title">${e.title || ''}</h4>
          <p class="timeline-desc">${e.description || e.desc || ''}</p>
        </div>
      `).join('');

      const expItems = (role.experience || []).map(e => `
        <div class="timeline-item">
          <span class="timeline-period">${e.period || ''}</span>
          <span class="timeline-company">${e.company || ''}</span>
          <h4 class="timeline-title">${e.title || ''}</h4>
          <p class="timeline-desc">${e.description || e.desc || ''}</p>
        </div>
      `).join('');

      // Skills renderer supporting structured category groups
      const renderSkillGroup = (group) => {
        if (!group) return '';
        const title = group.category || group.name || 'Skills';
        const items = Array.isArray(group.items)
          ? group.items
          : (Array.isArray(group.skills) ? group.skills : (group.name ? [group.name] : []));

        const badgesHtml = items.map(item => {
          const itemName = typeof item === 'string' ? item : (item.name || '');
          return `<li class="skill-badge">${itemName}</li>`;
        }).join('');

        return `
          <div class="skill-group-card">
            <h4 class="skill-group-title">${title}</h4>
            <ul class="skill-group-items">
              ${badgesHtml}
            </ul>
          </div>
        `;
      };

      const skillsGridHtml = Array.isArray(role.skills) && role.skills.length > 0
        ? `
          <div class="block-title" style="margin-top: 10px;">
            <h2>Skills</h2>
          </div>
          <div class="skills-category-grid">
            ${role.skills.map(renderSkillGroup).join('')}
          </div>
        `
        : '';

      // Merged portfolio directly from the role's JSON definition with continuous horizontal marquee animation
      const roleProjects = role.portfolio || [];
      const makePortfolioGroup = (isAriaHidden = false) => `
        <div class="portfolio-track-group" ${isAriaHidden ? 'aria-hidden="true"' : ''}>
          ${roleProjects.map(generatePortfolioCardHtml).join('')}
        </div>
      `;

      const portfolioMarqueeHtml = roleProjects.length > 0 ? `
        <div class="role-portfolio-wrapper" style="margin-bottom: 45px;">
          <div class="portfolio-marquee-wrapper">
            <div class="portfolio-marquee-track">
              ${makePortfolioGroup(false) + makePortfolioGroup(true) + makePortfolioGroup(true)}
            </div>
          </div>
        </div>
      ` : '';

      return `
        <div class="resume-role-pane ${activeClass}" id="role-${key}">
          <!-- 1. Featured Portfolio Projects (Horizontal Animated Showcase) -->
          ${portfolioMarqueeHtml}

          <!-- 2. Unified Skills Section -->
          ${skillsGridHtml}
        </div>
      `;
    }).join('');

    initResumeRoleTabs();
    initLightboxEvents();
    initVideoHoverPlayback();
    initScrollAnimations();
    updateResumeDownloadButton(currentActiveRole);
  }

  // 6. Skill Bars Animation
  function animateActiveSkillBars() {
    const activePane = document.querySelector('.resume-role-pane.active') || document.getElementById('role-uiux');
    if (!activePane) return;
    const skillBars = activePane.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') || '80%';
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 50);
    });
  }

  // 7. Resume Role Tabs
  function initResumeRoleTabs() {
    const resumeRoleBtns = document.querySelectorAll('.resume-filter-btn');

    resumeRoleBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        resumeRoleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const role = btn.getAttribute('data-role');
        const targetPane = document.getElementById(`role-${role}`);
        const resumePanes = document.querySelectorAll('.resume-role-pane');

        resumePanes.forEach(pane => pane.classList.remove('active'));
        if (targetPane) {
          targetPane.classList.add('active');
          animateActiveSkillBars();
        }

        updateResumeDownloadButton(role);
      };
    });
  }

  // Render All Site Sections from JSON
  function renderAllSiteSections(siteData) {
    if (!siteData) return;
    if (siteData.whatIDo) renderWhatIDo(siteData.whatIDo);
    if (siteData.funFacts) renderFunFacts(siteData.funFacts);
    if (siteData.achievements) renderAchievements(siteData.achievements);
    if (siteData.languages) renderLanguages(siteData.languages);
    if (siteData.experience || siteData.education) renderExperienceAndEducation(siteData.experience, siteData.education);
    if (siteData.certifications) renderCertifications(siteData.certifications);
    if (siteData.testimonials) renderTestimonials(siteData.testimonials);
    if (siteData.collaboratedWith) renderCollaboratedWith(siteData.collaboratedWith);
    initScrollAnimations();
  }

  // Live Concurrent Async JSON Fetcher (Parallel HTTP/2 Stream with Cache-Busting)
  async function loadJsonData() {
    try {
      const fetchJson = async (url) => {
        const bustUrl = `${url}?v=${Date.now()}`;
        const res = await fetch(encodeURI(bustUrl), { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        return await res.json();
      };

      const [mainRes, uiuxRes, devRes, brandRes, d3Res] = await Promise.all([
        fetchJson('./data/main.json').catch(e => { console.warn(e); return null; }),
        fetchJson('./data/roles/UI-UX Designer.json').catch(e => { console.warn(e); return null; }),
        fetchJson('./data/roles/Developer.json').catch(e => { console.warn(e); return null; }),
        fetchJson('./data/roles/Brand Designer.json').catch(e => { console.warn(e); return null; }),
        fetchJson('./data/roles/3D & Motion Designer.json').catch(e => { console.warn(e); return null; })
      ]);

      if (mainRes) {
        renderAllSiteSections(mainRes);
      }

      const rolesData = { ...INITIAL_ROLES_DATA };
      if (uiuxRes) rolesData['uiux'] = uiuxRes;
      if (devRes) rolesData['developer'] = devRes;
      if (brandRes) rolesData['brand'] = brandRes;
      if (d3Res) rolesData['3d'] = d3Res;

      renderResumeRoles(rolesData);
    } catch (e) {
      console.warn('Could not load role datasets:', e);
    }
  }

  // 8. Lightbox Modal
  const modal = document.getElementById('lightbox-modal');
  const modalMedia = document.getElementById('lightbox-media');
  const modalTitle = document.getElementById('lightbox-title');
  const modalDesc = document.getElementById('lightbox-desc');
  const modalClose = document.getElementById('lightbox-close');

  function openModal(type, src, title, desc) {
    if (!modal) return;
    modalMedia.innerHTML = '';
    
    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      modalMedia.appendChild(img);
    } else if (type === 'video' || type === 'iframe') {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      modalMedia.appendChild(iframe);
    }

    modalTitle.textContent = title || '';
    modalDesc.textContent = desc || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modalMedia.innerHTML = '';
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function initLightboxEvents() {
    const lightboxBtns = document.querySelectorAll('.open-lightbox');
    lightboxBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const type = btn.getAttribute('data-type');
        const src = btn.getAttribute('data-src');
        const title = btn.getAttribute('data-title');
        const desc = btn.getAttribute('data-desc');
        openModal(type, src, title, desc);
      };
    });
  }

  // 9. Contact Form AJAX Submission
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!formFeedback) return;

      const submitBtn = document.getElementById('contact-submit-btn') || contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
      }

      formFeedback.textContent = 'Sending message...';
      formFeedback.className = 'form-status';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
          formFeedback.className = 'form-status success';
          contactForm.reset();
        } else {
          formFeedback.textContent = data.message || 'Something went wrong. Please try again.';
          formFeedback.className = 'form-status error';
        }
      } catch (err) {
        formFeedback.textContent = 'Network error. Please try again later or email me directly.';
        formFeedback.className = 'form-status error';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  // 10. Scroll Reveal & Counter Animations
  function initScrollAnimations() {
    const animatedSelectors = [
      '.home-hero',
      '.block-title',
      '.service-item',
      '.fact-box',
      '.timeline-item',
      '.skill-group-card',
      '.contact-info-col',
      '.contact-form-col'
    ];

    const elementsToAnimate = document.querySelectorAll(animatedSelectors.join(', '));

    elementsToAnimate.forEach((el) => {
      if (!el.classList.contains('reveal-scroll')) {
        el.classList.add('reveal-scroll');
      }
      if (el.parentElement && (
        el.parentElement.classList.contains('fun-facts-grid') ||
        el.parentElement.classList.contains('services-list') ||
        el.parentElement.classList.contains('skills-category-grid') ||
        el.parentElement.classList.contains('timeline')
      )) {
        el.classList.add('reveal-stagger');
      }
    });

    const observerOptions = {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          
          if (entry.target.classList.contains('fact-box')) {
            animateFactCounter(entry.target);
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elementsToAnimate.forEach(el => scrollObserver.observe(el));

    requestAnimationFrame(() => {
      document.body.classList.add('js-reveal-ready');
    });
  }

  function animateFactCounter(factBox) {
    const numEl = factBox.querySelector('.fact-number');
    if (!numEl || numEl.dataset.animated) return;
    numEl.dataset.animated = 'true';

    const targetVal = (numEl.getAttribute('data-count') || numEl.textContent || '').trim();
    if (!targetVal) return;

    if (targetVal.includes('/')) {
      const parts = targetVal.split('/');
      const targetNumerator = parseFloat(parts[0]) || 0;
      const denominator = parts[1] || '5';
      const duration = 1200;
      const startTime = performance.now();

      function updateFraction(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeProgress * targetNumerator);
        numEl.textContent = `${current}/${denominator}`;

        if (progress < 1) {
          requestAnimationFrame(updateFraction);
        } else {
          numEl.textContent = `${targetNumerator}/${denominator}`;
        }
      }

      requestAnimationFrame(updateFraction);
      return;
    }

    const isStar = targetVal.toLowerCase().includes('star') || targetVal.includes('★');
    const isPlus = targetVal.includes('+');
    const cleanNum = parseFloat(targetVal.replace(/[^0-9.]/g, ''));
    if (isNaN(cleanNum)) {
      numEl.textContent = targetVal;
      return;
    }

    const isDecimal = targetVal.includes('.');
    const duration = 1200;
    const startTime = performance.now();

    function updateCount(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal ? (easeProgress * cleanNum).toFixed(1) : Math.floor(easeProgress * cleanNum);

      let suffix = '';
      if (isPlus) suffix = '+';
      else if (isStar) suffix = ' Star';

      numEl.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        numEl.textContent = (isDecimal ? cleanNum.toFixed(1) : cleanNum.toLocaleString()) + suffix;
      }
    }

    requestAnimationFrame(updateCount);
  }

  // 11. YouTube & Video Hover Playback Controller
  function initVideoHoverPlayback() {
    const videoCards = document.querySelectorAll('.portfolio-card[data-yt-id], .portfolio-card[data-category*="video"]');
    
    videoCards.forEach(card => {
      const ytId = card.getAttribute('data-yt-id');
      const thumbBox = card.querySelector('.portfolio-thumb-box');
      const video = card.querySelector('video');

      if (video) {
        card.addEventListener('mouseenter', () => {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        });
        card.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      }

      if (ytId && thumbBox) {
        let previewIframe = null;
        let hoverTimeout = null;

        card.addEventListener('mouseenter', () => {
          hoverTimeout = setTimeout(() => {
            if (!previewIframe && !thumbBox.querySelector('.yt-hover-iframe')) {
              previewIframe = document.createElement('iframe');
              previewIframe.className = 'yt-hover-iframe';
              previewIframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1`;
              previewIframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
              previewIframe.setAttribute('title', 'Video Preview');
              thumbBox.appendChild(previewIframe);
            }
          }, 50);
        });

        card.addEventListener('mouseleave', () => {
          if (hoverTimeout) clearTimeout(hoverTimeout);
          if (previewIframe) {
            previewIframe.remove();
            previewIframe = null;
          }
        });
      }
    });
  }

  // 12. Header Scroll Reading Progress Bar
  function initScrollProgressBar() {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const progress = (scrollTop / scrollHeight) * 100;
        bar.style.width = `${Math.min(progress, 100)}%`;
      }
    }, { passive: true });
  }

  // 13. Live Serverless Visitor & Reaction Like Counter
  function initVisitorAndReactionCounters() {
    const visitorEl = document.getElementById('visitor-count');
    const likeBtn = document.getElementById('like-btn');
    const likeCountEl = document.getElementById('like-count');

    if (!visitorEl || !likeBtn || !likeCountEl) return;

    const VIEWS_KEY = 'adibuljabir_github_io_views';
    const LIKES_KEY = 'adibuljabir_github_io_likes';
    const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

    const formatNumber = (num) => {
      const n = Number(num);
      if (isNaN(n)) return '1';
      if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
      if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k';
      return n.toString();
    };

    // 1. Fetch or Increment Page Views (1 view count per browser session)
    const hasVisitedSession = sessionStorage.getItem('portfolio_session_visited');
    const viewEndpoint = hasVisitedSession
      ? `${API_BASE}/get/${VIEWS_KEY}`
      : `${API_BASE}/hit/${VIEWS_KEY}`;

    fetch(viewEndpoint)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data && typeof data.value !== 'undefined') {
          visitorEl.textContent = formatNumber(data.value);
          sessionStorage.setItem('portfolio_session_visited', 'true');
        }
      })
      .catch(() => {
        visitorEl.textContent = '1';
      });

    // 2. Fetch Initial Like Count & User Liked State
    let currentLikes = 0;
    const isLikedLocally = localStorage.getItem('portfolio_user_liked') === 'true';

    if (isLikedLocally) {
      likeBtn.classList.add('liked');
      likeBtn.title = 'Thank you for liking!';
    }

    fetch(`${API_BASE}/get/${LIKES_KEY}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data && typeof data.value !== 'undefined') {
          currentLikes = data.value;
          likeCountEl.textContent = formatNumber(currentLikes);
        }
      })
      .catch(() => {
        fetch(`${API_BASE}/hit/${LIKES_KEY}`)
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data && typeof data.value !== 'undefined') {
              currentLikes = data.value;
              likeCountEl.textContent = formatNumber(currentLikes);
            } else {
              likeCountEl.textContent = '1';
            }
          })
          .catch(() => {
            likeCountEl.textContent = '1';
          });
      });

    // 3. Handle Interactive Like Button Click
    likeBtn.addEventListener('click', () => {
      const alreadyLiked = localStorage.getItem('portfolio_user_liked') === 'true';

      likeBtn.classList.remove('animating');
      void likeBtn.offsetWidth;
      likeBtn.classList.add('animating');

      if (!alreadyLiked) {
        currentLikes += 1;
        likeCountEl.textContent = formatNumber(currentLikes);
        likeBtn.classList.add('liked');
        likeBtn.title = 'Thank you for liking!';
        localStorage.setItem('portfolio_user_liked', 'true');

        fetch(`${API_BASE}/hit/${LIKES_KEY}`).catch(() => {});
      }
    });
  }

    // Initial Immediate Render (guarantees UI renders instantly in any environment)
  renderAllSiteSections(INITIAL_MAIN_DATA);
  renderResumeRoles(INITIAL_ROLES_DATA);

  // Pure JSON Loading Initiation (fetches latest updates if on HTTP/HTTPS)
  loadJsonData();
  initScrollAnimations();
  initVideoHoverPlayback();
  initScrollProgressBar();
  initVisitorAndReactionCounters();
});