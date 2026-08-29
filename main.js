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
  let currentPortfolioFilter = 'uiux';

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

  function renderResumeRoles(rolesData) {
    const container = document.getElementById('resume-panes-container');
    if (!container || !rolesData) return;

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
    const resumePanes = document.querySelectorAll('.resume-role-pane');

    resumeRoleBtns.forEach(btn => {
      btn.onclick = () => {
        resumeRoleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const role = btn.getAttribute('data-role');
        const targetPane = document.getElementById(`role-${role}`) || document.getElementById('role-uiux');

        resumePanes.forEach(pane => pane.classList.remove('active'));
        if (targetPane) {
          targetPane.classList.add('active');
          animateActiveSkillBars();
        }
      };
    });
  }

  // 7. Portfolio Category Filtering
  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filters:not(.resume-role-filters) .filter-btn');

  function applyPortfolioFilter(filterValue) {
    currentPortfolioFilter = filterValue || 'uiux';
    portfolioFilterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === currentPortfolioFilter) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(item => {
      const itemCategory = (item.getAttribute('data-category') || '').toLowerCase();
      const categories = itemCategory.split(/\s+/);
      if (categories.includes(currentPortfolioFilter.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter') || 'uiux';
      applyPortfolioFilter(filterValue);
    });
  });

  // Async JSON Fetcher
  async function loadJsonData() {
    try {
      const pRes = await fetch('data/portfolio.json');
      if (pRes.ok) {
        const pData = await pRes.json();
        if (Array.isArray(pData) && pData.length) {
          renderPortfolioCards(pData);
        }
      }
    } catch (e) {
      console.error('Error fetching data/portfolio.json:', e);
    }

    try {
      const rRes = await fetch('data/resume.json');
      if (rRes.ok) {
        const rData = await rRes.json();
        if (rData && typeof rData === 'object') {
          renderResumeRoles(rData);
        }
      }
    } catch (e) {
      console.error('Error fetching data/resume.json:', e);
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
