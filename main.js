/**
 * Leven Minimalist - Main JavaScript
 * Author: Adibul Jabir
 */

document.addEventListener('DOMContentLoaded', () => {
  // Preloader Fast Reveal (Optimized for Core Web Vitals LCP/FCP)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 400);
    };

    // Instant fade-out as soon as interactive DOM is ready
    requestAnimationFrame(() => {
      setTimeout(hidePreloader, 150);
    });
  }

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

  // Load previously saved theme OR fallback to current system OS theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else {
    applyTheme(prefersDarkScheme.matches ? 'dark' : 'light', false);
  }

  // Listen for live system theme changes if user hasn't manually chosen a preference
  if (prefersDarkScheme.addEventListener) {
    prefersDarkScheme.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  // Manual Toggle by user (persists to localStorage)
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

  function scrollToSection(targetId, filterToApply = null) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    if (filterToApply && typeof applyPortfolioFilter === 'function') {
      applyPortfolioFilter(filterToApply);
    }

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

  function handleHashRoute(rawHash) {
    if (!rawHash) return;
    const clean = rawHash.replace('#', '').toLowerCase();
    
    if (clean === 'dev' || clean === 'code') {
      scrollToSection('portfolio', 'dev');
    } else if (clean === '3d') {
      scrollToSection('portfolio', '3d');
    } else if (clean === 'uiux' || clean === 'ui-ux' || clean === 'design') {
      scrollToSection('portfolio', 'uiux');
    } else if (clean === 'branding') {
      scrollToSection('portfolio', 'branding');
    } else if (document.getElementById(clean)) {
      scrollToSection(clean);
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

        if (targetId === 'dev' || targetId === 'code') {
          e.preventDefault();
          history.pushState(null, null, href);
          scrollToSection('portfolio', 'dev');
        } else if (targetId === '3d') {
          e.preventDefault();
          history.pushState(null, null, href);
          scrollToSection('portfolio', '3d');
        } else if (targetId === 'uiux' || targetId === 'ui-ux' || targetId === 'design') {
          e.preventDefault();
          history.pushState(null, null, href);
          scrollToSection('portfolio', 'uiux');
        } else if (targetId === 'branding') {
          e.preventDefault();
          history.pushState(null, null, href);
          scrollToSection('portfolio', 'branding');
        } else if (document.getElementById(targetId)) {
          e.preventDefault();
          history.pushState(null, null, href);
          scrollToSection(targetId);
        }
      }
    });
  });

  // Mobile menu toggle
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Initialize ScrollSpy
  initScrollSpy();

  // On page load handle hash if present
  if (window.location.hash) {
    setTimeout(() => {
      handleHashRoute(window.location.hash);
    }, 120);
  }

  window.addEventListener('hashchange', () => {
    handleHashRoute(window.location.hash);
  });

  // 3. Interactive 3D Parallax Tilt for Profile Picture
  const homePhoto = document.querySelector('.home-photo');
  const hpInner = document.querySelector('.hp-inner');
  if (homePhoto && hpInner) {
    homePhoto.addEventListener('mousemove', (e) => {
      const rect = homePhoto.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      hpInner.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    homePhoto.addEventListener('mouseleave', () => {
      hpInner.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 4. Typing / Rotating Text in Hero
  const typingEl = document.querySelector('.role-typing');
  if (typingEl) {
    const roles = [
      '3D Artist',
      'UI/UX Designer',
      'Developer',
      'Brand Designer',
      'Founder @ Ventrixon'
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

  // 4. Dynamic Data Loader & Render Engine
  const DEFAULT_PORTFOLIO = [
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
  },
  {
    "id": "tada-tour-bill",
    "category": "dev",
    "type": "code",
    "title": "TA-DA Bill Generator",
    "subtitle": "C â€¢ CLI â€¢ File I/O",
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
    "subtitle": "Android â€¢ Kotlin â€¢ Mobile",
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
    "footerMeta": "Gradle â€¢ Kotlin",
    "githubUrl": "https://github.com/adibuljabir/FindIT"
  },
  {
    "id": "khaon-management",
    "category": "dev",
    "type": "code",
    "title": "Khaon Food Management",
    "subtitle": "Java â€¢ Software Architecture",
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
    "footerMeta": "Java â€¢ OOP Design",
    "githubUrl": "https://github.com/adibuljabir/Khaon"
  },
  {
    "id": "collab-repos",
    "category": "dev",
    "type": "code",
    "title": "Collaborative Repos & PRs",
    "subtitle": "Git â€¢ Open Source â€¢ Team Repos",
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
    "footerMeta": "PRs â€¢ Code Review",
    "githubUrl": "https://github.com/adibuljabir"
  },
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
    "ytId": "hBbHoIONYf0",
    "thumbnail": "https://i.ytimg.com/vi/hBbHoIONYf0/hqdefault.jpg",
    "badge": "4K Motion",
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
    "ytId": "-oDgaHYAk5M",
    "thumbnail": "https://i.ytimg.com/vi/-oDgaHYAk5M/hqdefault.jpg",
    "badge": "3D Cloth Sim",
    "youtubeUrl": "https://www.youtube.com/shorts/-oDgaHYAk5M",
    "lightboxType": "video",
    "lightboxSrc": "https://www.youtube-nocookie.com/embed/-oDgaHYAk5M?autoplay=1&rel=0"
  },
  {
    "id": "dpxi-fc-intro",
    "category": "branding",
    "title": "DP Xi FC Video Intro",
    "subtitle": "Branding & Video",
    "description": "High-energy cinematic sports promo with synchronized beat cuts and titles.",
    "ytId": "khtonJIabQ0",
    "thumbnail": "https://i.ytimg.com/vi/khtonJIabQ0/hqdefault.jpg",
    "badge": "Branding Video",
    "youtubeUrl": "https://www.youtube.com/watch?v=khtonJIabQ0",
    "lightboxType": "video",
    "lightboxSrc": "https://www.youtube-nocookie.com/embed/khtonJIabQ0?autoplay=1&rel=0"
  },
  {
    "id": "motherboard-3d",
    "category": "3d",
    "title": "Motherboard 3D Animation",
    "subtitle": "3D Animation",
    "description": "Detailed hardware component visualization and cinematic motion graphics.",
    "ytId": "0Eb3AAcaTEc",
    "thumbnail": "https://i.ytimg.com/vi/0Eb3AAcaTEc/hqdefault.jpg",
    "badge": "3D Hardware",
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
    "ytId": "FkkAfB6_9SU",
    "thumbnail": "https://i.ytimg.com/vi/FkkAfB6_9SU/hqdefault.jpg",
    "badge": "Commercial 3D",
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
    "ytId": "9dpz015aejE",
    "thumbnail": "https://i.ytimg.com/vi/9dpz015aejE/hqdefault.jpg",
    "badge": "3D Animation",
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
    "ytId": "dYq1ATkLAj8",
    "thumbnail": "https://i.ytimg.com/vi/dYq1ATkLAj8/hqdefault.jpg",
    "badge": "3D Shading",
    "youtubeUrl": "https://www.youtube.com/watch?v=dYq1ATkLAj8",
    "lightboxType": "video",
    "lightboxSrc": "https://www.youtube-nocookie.com/embed/dYq1ATkLAj8?autoplay=1&rel=0"
  }
];
  const DEFAULT_RESUME = {
    "uiux":  {
                 "roleId":  "uiux",
                 "roleName":  "UI/UX Designer",
                 "education":  [
                                   {
                                       "period":  "2024 - 2028 (Ongoing)",
                                       "company":  "Khulna Khan Bahadur Ahsanullah University (KKBAU)",
                                       "title":  "BSc in Computer Science \u0026 Engineering (HCI Focus)",
                                       "desc":  "Human-Computer Interaction (HCI), design systems, web ergonomics, and user-centric software design."
                                   },
                                   {
                                       "period":  "Continuous Specialization",
                                       "company":  "Self-Directed \u0026 Applied Practice",
                                       "title":  "Design Systems \u0026 Interactive Prototyping",
                                       "desc":  "Advanced Figma components, auto-layout, interactive variants, and scalable web/mobile design frameworks."
                                   }
                               ],
                 "experience":  [
                                    {
                                        "period":  "2023 - Present",
                                        "company":  "Ventrixon Studio",
                                        "title":  "UI/UX Designer \u0026 Prototyper",
                                        "desc":  "Designing user interfaces, wireframes, and responsive web/mobile prototypes in Figma for software and digital platforms."
                                    },
                                    {
                                        "period":  "2023 - Present",
                                        "company":  "Freelance \u0026 Client Projects",
                                        "title":  "Product Designer",
                                        "desc":  "Delivering high-converting landing pages, SaaS dashboards, and digital product redesigns."
                                    }
                                ],
                 "skills":  [
                                {
                                    "name":  "Figma (UI/UX Design \u0026 Prototyping)",
                                    "percent":  "95%"
                                },
                                {
                                    "name":  "User Interface \u0026 Wireframing",
                                    "percent":  "92%"
                                },
                                {
                                    "name":  "Design Systems \u0026 Component Libraries",
                                    "percent":  "90%"
                                },
                                {
                                    "name":  "Adobe Photoshop \u0026 Illustrator",
                                    "percent":  "88%"
                                },
                                {
                                    "name":  "Responsive Mobile \u0026 Web UI",
                                    "percent":  "92%"
                                },
                                {
                                    "name":  "Human-Computer Interaction (HCI)",
                                    "percent":  "85%"
                                }
                            ],
                 "competencies":  [
                                      "User Flow Mapping",
                                      "Interactive Wireframes",
                                      "Design Systems",
                                      "Mobile UI",
                                      "Web Prototyping",
                                      "Usability Principles",
                                      "Figma Variables",
                                      "Auto Layout Master",
                                      "Visual Hierarchy",
                                      "Micro-interactions"
                                  ],
                 "languages":  [
                                   "Bengali (Native)",
                                   "English (Fluent)",
                                   "Arabic (Conversational)"
                               ],
                 "downloadUrl":  "assets/Adibul_Jabir_UIUX_Resume.pdf",
                 "resumeFileName":  "Adibul_Jabir_UIUX_Resume.pdf"
             },
    "developer":  {
                      "roleId":  "developer",
                      "roleName":  "Developer",
                      "education":  [
                                        {
                                            "period":  "2024 - 2028 (Ongoing)",
                                            "company":  "Khulna Khan Bahadur Ahsanullah University (KKBAU)",
                                            "title":  "BSc in Computer Science and Engineering",
                                            "desc":  "Algorithms, Data Structures, Database Management Systems, Computer Networks, and Object-Oriented Software Design."
                                        },
                                        {
                                            "period":  "Continuous",
                                            "company":  "Competitive Programming \u0026 Problem Solving",
                                            "title":  "Algorithmic Logic \u0026 C/C++ / Python",
                                            "desc":  "Active participation in university contests, implementing algorithmic solutions with clean time/space efficiency."
                                        }
                                    ],
                      "experience":  [
                                         {
                                             "period":  "2023 - Present",
                                             "company":  "Independent \u0026 Open Source",
                                             "title":  "Frontend \u0026 Software Developer",
                                             "desc":  "Building high-performance web applications and software utilities with modern JavaScript (ES6+), Python, HTML5, and CSS3."
                                         },
                                         {
                                             "period":  "2023 - Present",
                                             "company":  "Ventrixon Digital Platforms",
                                             "title":  "Web Solutions Architect",
                                             "desc":  "Architecting clean, responsive web platforms, portfolio systems, and API-driven interactive user interfaces."
                                         }
                                     ],
                      "skills":  [
                                     {
                                         "name":  "Web Development (HTML5 / CSS3 / Modern JS)",
                                         "percent":  "90%"
                                     },
                                     {
                                         "name":  "C / C++ (Algorithms \u0026 Systems)",
                                         "percent":  "85%"
                                     },
                                     {
                                         "name":  "Python \u0026 Scripting",
                                         "percent":  "82%"
                                     },
                                     {
                                         "name":  "Java \u0026 OOP Principles",
                                         "percent":  "80%"
                                     },
                                     {
                                         "name":  "Git, GitHub \u0026 Version Control",
                                         "percent":  "88%"
                                     },
                                     {
                                         "name":  "REST APIs \u0026 Data Structures",
                                         "percent":  "82%"
                                     }
                                 ],
                      "competencies":  [
                                           "Data Structures",
                                           "Algorithms",
                                           "DOM Manipulation",
                                           "Clean Code Architecture",
                                           "Git Version Control",
                                           "REST APIs",
                                           "Object-Oriented Design",
                                           "Linux \u0026 CLI",
                                           "Software Testing",
                                           "Optimization"
                                       ],
                      "languages":  [
                                        "Bengali (Native)",
                                        "English (Fluent)",
                                        "Arabic (Conversational)"
                                    ],
                      "downloadUrl":  "assets/Adibul_Jabir_Developer_Resume.pdf",
                      "resumeFileName":  "Adibul_Jabir_Developer_Resume.pdf"
                  },
    "brand":  {
                  "roleId":  "brand",
                  "roleName":  "Brand Designer",
                  "education":  [
                                    {
                                        "period":  "Applied Mastery",
                                        "company":  "Self-Directed \u0026 Professional Practice",
                                        "title":  "Vector Design \u0026 Visual Identity Systems",
                                        "desc":  "Logo design theory, scalable vector construction in Adobe Illustrator, color palettes, and typographic pairings."
                                    }
                                ],
                  "experience":  [
                                     {
                                         "period":  "2023 - Present",
                                         "company":  "Ventrixon Studio",
                                         "title":  "Brand Identity \u0026 Visual Mark Designer",
                                         "desc":  "Created the complete Ventrixon brand mark, vector style guide, typography pairing, and visual assets."
                                     },
                                     {
                                         "period":  "2023 - Present",
                                         "company":  "Global Clients",
                                         "title":  "Freelance Brand \u0026 Vector Designer",
                                         "desc":  "Delivered vector marks, typography pairings, color palettes, and brand guidelines for international businesses."
                                     }
                                 ],
                  "skills":  [
                                 {
                                     "name":  "Adobe Illustrator (Vector Marks)",
                                     "percent":  "95%"
                                 },
                                 {
                                     "name":  "Brand Identity Systems",
                                     "percent":  "92%"
                                 },
                                 {
                                     "name":  "Color Theory \u0026 Palette Harmony",
                                     "percent":  "90%"
                                 },
                                 {
                                     "name":  "Typography Pairing \u0026 Hierarchy",
                                     "percent":  "88%"
                                 },
                                 {
                                     "name":  "Adobe Photoshop (Mockups \u0026 Visuals)",
                                     "percent":  "85%"
                                 },
                                 {
                                     "name":  "Print \u0026 Vector Asset Packaging",
                                     "percent":  "90%"
                                 }
                             ],
                  "competencies":  [
                                       "Logo Design",
                                       "Vector Graphics",
                                       "Color Palette Systems",
                                       "Typography Styling",
                                       "Brand Guidelines",
                                       "Iconography",
                                       "Vector Merchandise",
                                       "Print Ready Art",
                                       "Visual Assets"
                                   ],
                  "languages":  [
                                    "Bengali (Native)",
                                    "English (Fluent)",
                                    "Arabic (Conversational)"
                                ],
                  "downloadUrl":  "assets/Adibul_Jabir_Brand_Designer_Resume.pdf",
                  "resumeFileName":  "Adibul_Jabir_Brand_Designer_Resume.pdf"
              },
    "3d":  {
               "roleId":  "3d",
               "roleName":  "3D Artist",
               "education":  [
                                 {
                                     "period":  "2023 - Present",
                                     "company":  "Specialized Applied Practice",
                                     "title":  "Hard-Surface 3D Modeling \u0026 Animation Pipelines",
                                     "desc":  "Mastering topology, PBR node shading, procedural textures, cinematic camera animation, and particle simulations in Blender."
                                 }
                             ],
               "experience":  [
                                  {
                                      "period":  "2023 - Present",
                                      "company":  "Ventrixon Studio",
                                      "title":  "Founder \u0026 Lead 3D Artist",
                                      "desc":  "Directing 3D animations, product visualizations, motion graphics, and educational 3D modeling content on YouTube."
                                  },
                                  {
                                      "period":  "2023 - Present",
                                      "company":  "UpworkÂ® Global Inc",
                                      "title":  "Freelance 3D Specialist (5-Star Track)",
                                      "desc":  "Delivering custom 3D animations, photorealistic product visualizations, and cinematic renders for international clients."
                                  }
                              ],
               "skills":  [
                              {
                                  "name":  "Blender 3D Modeling \u0026 Topology",
                                  "percent":  "95%"
                              },
                              {
                                  "name":  "PBR Material Shading \u0026 Texturing",
                                  "percent":  "92%"
                              },
                              {
                                  "name":  "Cinematic Lighting \u0026 Cameras",
                                  "percent":  "92%"
                              },
                              {
                                  "name":  "Commercial Product Animation",
                                  "percent":  "90%"
                              },
                              {
                                  "name":  "Adobe After Effects (Motion Post)",
                                  "percent":  "88%"
                              },
                              {
                                  "name":  "Hard-Surface Asset Optimization",
                                  "percent":  "90%"
                              }
                          ],
               "competencies":  [
                                    "Hard Surface Modeling",
                                    "PBR Shaders",
                                    "Cycles \u0026 Eevee",
                                    "Motion Graphics",
                                    "Cloth Physics Simulation",
                                    "Low-Poly Assets",
                                    "Cinematic Lighting",
                                    "Video Post-Production",
                                    "DaVinci Resolve",
                                    "Animation Curves"
                                ],
               "languages":  [
                                 "Bengali (Native)",
                                 "English (Fluent)",
                                 "Arabic (Conversational)"
                             ],
               "downloadUrl":  "assets/Adibul_Jabir_3D_Artist_Resume.pdf",
               "resumeFileName":  "Adibul_Jabir_3D_Artist_Resume.pdf"
           }
};
  const DEFAULT_SITE = {
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
      "title": "3D Artist",
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
      "icon": "far fa-heart",
      "title": "Happy Clients",
      "count": "50+"
    },
    {
      "icon": "far fa-clock",
      "title": "Working Hours",
      "count": "4,500"
    },
    {
      "icon": "far fa-star",
      "title": "3D Assets Created",
      "count": "120"
    },
    {
      "icon": "fas fa-coffee",
      "title": "Coffee Consumed",
      "count": "1,286"
    }
  ],
  "testimonials": [
    {
      "name": "Val Ciptak Viera",
      "role": "President at Sprigs • New York, USA",
      "linkedinUrl": "https://www.linkedin.com/in/val-ciptak-viera-35a4737/",
      "avatar": "https://media.licdn.com/dms/image/v2/C4E03AQE0W1zda-wEQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1632862845898?e=1789603200&v=beta&t=sF25WVieGS97Iwn1oVNF6Wd0-GzNrp8Rx7gGvrvLFR8",
      "quote": "Adibul was great. We worked in real time together to edit a jpg into a vector and make changes to it. He was fast and understood what was needed. Good job!!!"
    }
  ],
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
  ]
}
;

  let currentPortfolioFilter = 'uiux';
  let currentResumeData = DEFAULT_RESUME;

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

  // --- Testimonials Renderer ---
  function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonials-grid');
    if (!container || !testimonials || !testimonials.length) return;

    container.innerHTML = testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-avatar">
          <img src="${t.avatar}" alt="${t.name}" width="40" height="40" loading="lazy" referrerpolicy="no-referrer">
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
    `).join('');
  }

  // --- Collaborated With Marquee Renderer ---
  function renderCollaboratedWith(clients) {
    const track = document.getElementById('clients-marquee-track');
    if (!track || !clients || !clients.length) return;

    const makeGroup = (isAriaHidden = false) => `
      <div class="clients-track-group" ${isAriaHidden ? 'aria-hidden="true"' : ''}>
        ${clients.map(c => `
          <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="client-item" title="${c.name}">
            <img src="${c.logo}" alt="${c.alt || c.name}" width="120" height="40" loading="lazy">
          </a>
        `).join('')}
      </div>
    `;

    track.innerHTML = makeGroup(false) + makeGroup(true) + makeGroup(true);
  }

  // --- Portfolio Cards Renderer ---
  function renderPortfolioCards(items) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !items || !items.length) return;

    grid.innerHTML = items.map(item => {
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
      const ytAttr = item.ytId ? `data-yt-id="${item.ytId}"` : '';
      const badgeHtml = item.badge ? `<div class="video-play-badge"><i class="fas fa-play"></i> ${item.badge}</div>` : '';
      
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

      return `
        <div class="portfolio-card" data-category="${item.category}" ${ytAttr}>
          <div class="portfolio-thumb-box">
            <img src="${item.thumbnail}" alt="${item.title}" width="400" height="250" referrerpolicy="no-referrer" loading="lazy">
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
    }).join('');

    initLightboxEvents();
    initVideoHoverPlayback();
    applyPortfolioFilter(currentPortfolioFilter || 'uiux');
  }

  // --- Dynamic Resume Download Button Updater ---
  function updateResumeDownloadButton(roleKey) {
    const dlBtn = document.getElementById('resume-download-btn');
    const dlText = document.getElementById('resume-download-text');
    if (!dlBtn) return;

    const key = roleKey || 'uiux';
    const roleData = (currentResumeData && currentResumeData[key]) || (DEFAULT_RESUME && DEFAULT_RESUME[key]);
    if (!roleData) return;

    const url = roleData.downloadUrl || `assets/Adibul_Jabir_${key}_Resume.pdf`;
    const filename = roleData.resumeFileName || `Adibul_Jabir_${key}_Resume.pdf`;
    const label = roleData.downloadLabel || `Download ${roleData.roleName || 'Role'} CV`;

    dlBtn.href = url;
    dlBtn.setAttribute('download', filename);
    if (dlText) {
      dlText.textContent = label;
    }
  }

  // --- Resume Roles Renderer ---
  function renderResumeRoles(rolesData) {
    const container = document.getElementById('resume-panes-container');
    if (!container || !rolesData) return;

    currentResumeData = rolesData;
    const roleKeys = Object.keys(rolesData);
    container.innerHTML = roleKeys.map((key, index) => {
      const role = rolesData[key];
      const activeClass = index === 0 ? 'active' : '';

      const eduItems = (role.education || []).map(e => `
        <div class="timeline-item">
          <span class="timeline-period">${e.period}</span>
          <span class="timeline-company">${e.company}</span>
          <h4 class="timeline-title">${e.title}</h4>
          <p class="timeline-desc">${e.desc}</p>
        </div>
      `).join('');

      const expItems = (role.experience || []).map(e => `
        <div class="timeline-item">
          <span class="timeline-period">${e.period}</span>
          <span class="timeline-company">${e.company}</span>
          <h4 class="timeline-title">${e.title}</h4>
          <p class="timeline-desc">${e.desc}</p>
        </div>
      `).join('');

      const skillItems = (role.skills || []).map(s => `
        <div class="skill-item">
          <div class="skill-info">
            <span>${s.name}</span>
            <span>${s.percent}</span>
          </div>
          <div class="skill-bar"><div class="skill-fill" data-width="${s.percent}" style="width: 0%;"></div></div>
        </div>
      `).join('');

      const compBadges = (role.competencies || []).map(c => `<span class="badge-item">${c}</span>`).join('');
      const langBadges = (role.languages || ['Bengali (Native)', 'English (Fluent)', 'Arabic (Conversational)']).map(l => `<span class="badge-item">${l}</span>`).join('');

      return `
        <div class="resume-role-pane ${activeClass}" id="role-${key}">
          <div class="resume-columns">
            <div>
              <div class="block-title">
                <h2>Education</h2>
              </div>
              <div class="timeline">
                ${eduItems}
              </div>
            </div>

            <div>
              <div class="block-title">
                <h2>Experience</h2>
              </div>
              <div class="timeline">
                ${expItems}
              </div>
            </div>
          </div>

          <div class="resume-columns">
            <div>
              <div class="block-title">
                <h2>Working Skills</h2>
              </div>
              ${skillItems}
            </div>

            <div>
              <div class="block-title">
                <h2>Specialized Competencies</h2>
              </div>
              <div class="badges-cloud">
                ${compBadges}
              </div>

              <div class="block-title" style="margin-top: 30px;">
                <h2>Languages</h2>
              </div>
              <div class="badges-cloud">
                ${langBadges}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    initResumeRoleTabs();
    updateResumeDownloadButton('uiux');
  }

  // 5. Skill Bars Animation
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

  // 6. Resume Role Tabs
  function initResumeRoleTabs() {
    const resumeRoleBtns = document.querySelectorAll('.resume-filter-btn');

    resumeRoleBtns.forEach(btn => {
      btn.onclick = () => {
        resumeRoleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const role = btn.getAttribute('data-role');
        const targetPane = document.getElementById(`role-${role}`) || document.getElementById('role-uiux');
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

  // 7. Portfolio Category Filtering
  function applyPortfolioFilter(filterValue) {
    currentPortfolioFilter = filterValue || 'uiux';
    const filterBtns = document.querySelectorAll('.portfolio-filters:not(.resume-role-filters) .filter-btn');
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === currentPortfolioFilter) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(item => {
      const itemCategory = (item.getAttribute('data-category') || '').toLowerCase();
      const categories = itemCategory.split(/\\s+/);
      if (categories.includes(currentPortfolioFilter.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filters:not(.resume-role-filters) .filter-btn');
  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter') || 'uiux';
      applyPortfolioFilter(filterValue);
    });
  });

  // Dual-Layer Initial Render & Async JSON Sync
  function renderAllSiteSections(siteData) {
    if (!siteData) return;
    if (siteData.whatIDo) renderWhatIDo(siteData.whatIDo);
    if (siteData.funFacts) renderFunFacts(siteData.funFacts);
    if (siteData.testimonials) renderTestimonials(siteData.testimonials);
    if (siteData.collaboratedWith) renderCollaboratedWith(siteData.collaboratedWith);
  }

  renderAllSiteSections(DEFAULT_SITE);
  renderPortfolioCards(DEFAULT_PORTFOLIO);
  renderResumeRoles(DEFAULT_RESUME);

  async function loadJsonData() {
    try {
      const sRes = await fetch('./data/site.json');
      if (sRes.ok) {
        const sData = await sRes.json();
        renderAllSiteSections(sData);
      }
    } catch (e) {}

    try {
      const pRes = await fetch('./data/portfolio.json');
      if (pRes.ok) {
        const pData = await pRes.json();
        if (Array.isArray(pData) && pData.length) {
          renderPortfolioCards(pData);
        }
      }
    } catch (e) {}

    try {
      const rRes = await fetch('./data/resume.json');
      if (rRes.ok) {
        const rData = await rRes.json();
        if (rData && typeof rData === 'object') {
          renderResumeRoles(rData);
        }
      }
    } catch (e) {}
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
    document.querySelectorAll('.open-lightbox').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const type = btn.getAttribute('data-type') || 'image';
        const src = btn.getAttribute('data-src') || btn.getAttribute('href');
        const title = btn.getAttribute('data-title') || '';
        const desc = btn.getAttribute('data-desc') || '';
        openModal(type, src, title, desc);
      };
    });
  }

  // 8. Contact Form Handler (Web3Forms AJAX Integration)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (response.status === 200 && result.success) {
          contactForm.reset();
          if (formFeedback) {
            formFeedback.className = 'form-status success';
            formFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
            formFeedback.style.display = 'block';
          }
        } else {
          if (formFeedback) {
            formFeedback.className = 'form-status error';
            formFeedback.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${result.message || 'Something went wrong. Please try again later.'}`;
            formFeedback.style.display = 'block';
          }
        }
      } catch (error) {
        if (formFeedback) {
          formFeedback.className = 'form-status error';
          formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please check your network connection.';
          formFeedback.style.display = 'block';
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if (formFeedback) {
          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 6000);
        }
      }
    });
  }

  // 9. Section-wise Scroll Reveal & Stagger Animations
  function initScrollAnimations() {
    const animatedSelectors = [
      '.home-hero',
      '.block-title',
      '.page-title',
      '.service-card',
      '.timeline-item',
      '.testimonial-card',
      '.client-item',
      '.fact-box',
      '.portfolio-card',
      '.resume-card',
      '.skill-item',
      '.contact-info-block',
      '.contact-form-col'
    ];

    const elementsToAnimate = document.querySelectorAll(animatedSelectors.join(', '));

    elementsToAnimate.forEach((el) => {
      el.classList.add('reveal-scroll');
      if (el.parentElement && (
        el.parentElement.classList.contains('portfolio-grid') ||
        el.parentElement.classList.contains('clients-grid') ||
        el.parentElement.classList.contains('fun-facts-grid') ||
        el.parentElement.classList.contains('services-grid')
      )) {
        el.classList.add('reveal-stagger');
      }
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
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

    window.refreshScrollAnimations = function() {
      const activeSection = document.querySelector('.tab-section.active');
      if (activeSection) {
        const inViewElements = activeSection.querySelectorAll('.reveal-scroll:not(.is-revealed)');
        inViewElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('is-revealed');
            if (el.classList.contains('fact-box')) animateFactCounter(el);
          } else {
            scrollObserver.observe(el);
          }
        });
      }
    };
  }

  // Smooth Numeric Count-Up for Fun Fact counters
  function animateFactCounter(factBox) {
    const numEl = factBox.querySelector('.fact-number');
    if (!numEl || numEl.dataset.animated) return;
    numEl.dataset.animated = 'true';

    const targetVal = numEl.getAttribute('data-count') || numEl.textContent;
    const isPlus = targetVal.includes('+');
    const cleanNum = parseInt(targetVal.replace(/[^0-9]/g, ''), 10);
    if (isNaN(cleanNum)) return;

    const duration = 1200;
    const startTime = performance.now();

    function updateCount(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      const current = Math.floor(easeProgress * cleanNum);

      numEl.textContent = current.toLocaleString() + (isPlus ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        numEl.textContent = cleanNum.toLocaleString() + (isPlus ? '+' : '');
      }
    }

    requestAnimationFrame(updateCount);
  }

  // 10. YouTube & Video Hover Playback Controller
  function initVideoHoverPlayback() {
    const videoCards = document.querySelectorAll('.portfolio-card[data-yt-id], .portfolio-card[data-category*="video"]');
    
    videoCards.forEach(card => {
      const ytId = card.getAttribute('data-yt-id');
      const thumbBox = card.querySelector('.portfolio-thumb-box');
      const video = card.querySelector('video');

      // Native HTML5 Video support
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

      // YouTube Hover Preview Stream
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

  // Initialize Features
  loadJsonData();
  initScrollAnimations();
  initVideoHoverPlayback();
});
