/**
 * Leven Minimalist - Main JavaScript
 * Author: Adibul Jabir
 * Pure JSON-Driven Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
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

    const roleKeys = Object.keys(rolesData);
    container.innerHTML = roleKeys.map((key, index) => {
      const role = rolesData[key];
      const activeClass = index === 0 ? 'active' : '';

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
    updateResumeDownloadButton('uiux');
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

      const rolesData = {};
      if (uiuxRes) rolesData['uiux'] = uiuxRes;
      if (devRes) rolesData['developer'] = devRes;
      if (brandRes) rolesData['brand'] = brandRes;
      if (d3Res) rolesData['3d'] = d3Res;

      if (Object.keys(rolesData).length > 0) {
        renderResumeRoles(rolesData);
      }
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
      '.skill-item',
      '.pricing-card',
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
        el.parentElement.classList.contains('pricing-grid') ||
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

    const targetVal = numEl.getAttribute('data-count') || numEl.textContent;
    const isPlus = targetVal.includes('+');
    const cleanNum = parseInt(targetVal.replace(/[^0-9]/g, ''), 10);
    if (isNaN(cleanNum)) return;

    const duration = 1200;
    const startTime = performance.now();

    function updateCount(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
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

  // Pure JSON Loading Initiation
  loadJsonData();
  initScrollAnimations();
  initVideoHoverPlayback();
  initScrollProgressBar();
  initVisitorAndReactionCounters();
});