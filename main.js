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

    if (typeof refreshScrollAnimations === 'function') {
      setTimeout(refreshScrollAnimations, 60);
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
  initScrollAnimations();
  initVideoHoverPlayback();
});
