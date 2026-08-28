/**
 * Leven Minimalist - Main JavaScript
 * Author: Adibul Jabir
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
        btn.setAttribute('title', 'Switch to Light Theme');
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        btn.setAttribute('title', 'Switch to Dark Theme');
      });
    }
  }

  // Load saved theme or default to light / system
  const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  // 2. Navigation & Hash Router
  const navLinks = document.querySelectorAll('.site-nav .nav-item a');
  const sections = document.querySelectorAll('.tab-section');
  const mobileMenuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.site-nav');

  function switchTab(targetHash) {
    let cleanHash = targetHash ? targetHash.replace('#', '') : 'about';
    let filterToApply = null;

    if (cleanHash === 'videos') {
      cleanHash = 'portfolio';
      filterToApply = 'video';
    }

    const targetSection = document.getElementById(cleanHash) || document.getElementById('about');

    if (!targetSection) return;

    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + cleanHash || href === cleanHash) {
        link.classList.add('active');
      }
    });

    targetSection.classList.add('active');
    
    // Trigger animations
    if (cleanHash === 'resume') {
      animateActiveSkillBars();
    }

    if (cleanHash === 'portfolio' && filterToApply) {
      applyPortfolioFilter(filterToApply);
    }

    // Scroll smoothly to top on tab switch
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Handle URL hash on load
  if (window.location.hash) {
    switchTab(window.location.hash);
  } else {
    switchTab('about');
  }

  // Handle Hash Changes
  window.addEventListener('hashchange', () => {
    switchTab(window.location.hash);
  });

  // Handle click on any internal hash link
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const targetSection = document.getElementById(targetId);
        if (targetSection || targetId === 'videos') {
          e.preventDefault();
          history.pushState(null, null, href);
          switchTab(targetId);
          
          if (navMenu) {
            navMenu.classList.remove('open');
          }
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

  // 3. Typing / Rotating Text in Hero
  const typingEl = document.querySelector('.role-typing');
  if (typingEl) {
    const roles = [
      '3D Animator',
      '3D Modeler',
      'Illustrator',
      'Founder @ Ventrixon',
      'CSE Student @ KKBAU'
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

  // 4. Skill Bars Animation
  function animateActiveSkillBars() {
    const activePane = document.querySelector('.resume-role-pane.active') || document.getElementById('role-all');
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

  // 5. Resume Role Tabs
  const resumeRoleBtns = document.querySelectorAll('.resume-filter-btn');
  const resumePanes = document.querySelectorAll('.resume-role-pane');

  resumeRoleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resumeRoleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const role = btn.getAttribute('data-role');
      const targetPane = document.getElementById(`role-${role}`) || document.getElementById('role-all');

      resumePanes.forEach(pane => pane.classList.remove('active'));
      if (targetPane) {
        targetPane.classList.add('active');
        animateActiveSkillBars();
      }
    });
  });

  // 6. Portfolio Category Filtering
  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filters:not(.resume-role-filters) .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  function applyPortfolioFilter(filterValue) {
    portfolioFilterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === filterValue) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    portfolioCards.forEach(item => {
      const itemCategory = (item.getAttribute('data-category') || '').toLowerCase();
      const categories = itemCategory.split(/\s+/);
      if (filterValue === 'all' || categories.includes(filterValue.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter') || 'all';
      applyPortfolioFilter(filterValue);
    });
  });

  // 7. Lightbox Modal
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

  document.querySelectorAll('.open-lightbox').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-type') || 'image';
      const src = btn.getAttribute('data-src') || btn.getAttribute('href');
      const title = btn.getAttribute('data-title') || '';
      const desc = btn.getAttribute('data-desc') || '';
      openModal(type, src, title, desc);
    });
  });

  // 8. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        if (formFeedback) {
          formFeedback.className = 'form-status success';
          formFeedback.innerHTML = 'Thank you! Your message has been sent successfully.';
          formFeedback.style.display = 'block';

          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 5000);
        }
      }, 800);
    });
  }
});
