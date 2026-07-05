document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // CONFIG INJECTION ENGINE
  // ==========================================
  if (typeof CafeConfig !== 'undefined') {
    document.querySelectorAll('.cfg-brand-name').forEach(el => el.innerHTML = CafeConfig.brandName);
    document.querySelectorAll('.cfg-tagline').forEach(el => el.innerText = CafeConfig.tagline);
    document.querySelectorAll('.cfg-address-short').forEach(el => el.innerText = CafeConfig.addressShort);
    document.querySelectorAll('.cfg-address-full').forEach(el => el.innerText = CafeConfig.addressFull);
    document.querySelectorAll('.cfg-hours').forEach(el => el.innerText = CafeConfig.hoursLabel);
    document.querySelectorAll('.cfg-hours-kitchen').forEach(el => el.innerText = CafeConfig.hoursKitchen);
    document.querySelectorAll('.cfg-email').forEach(el => {
      el.innerText = CafeConfig.email;
      if (el.tagName === 'A') el.href = `mailto:${CafeConfig.email}`;
    });
    document.querySelectorAll('.cfg-instagram-handle').forEach(el => el.innerText = CafeConfig.instagram);
    document.querySelectorAll('.cfg-instagram-link').forEach(el => el.href = CafeConfig.instagramLink);
    document.querySelectorAll('.cfg-zomato-link').forEach(el => el.href = CafeConfig.zomatoLink);

    // Visit page maps injection
    const mapFrame = document.querySelector('.map-iframe');
    if (mapFrame) mapFrame.src = CafeConfig.mapsEmbedLink;
    
    const directionsBtn = document.querySelector('.map-overlay-button');
    if (directionsBtn) directionsBtn.href = CafeConfig.mapsDirectionsLink;
  }

  // ==========================================
  // MOBILE HAMBURGER MENU
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // STICKY HEADER EFFECT
  // ==========================================
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.backgroundColor = 'rgba(11, 9, 10, 0.95)';
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.padding = '';
        header.style.backgroundColor = 'rgba(11, 9, 10, 0.75)';
        header.style.boxShadow = '';
      }
    });
  }

  // ==========================================
  // INTERACTIVE MENU PAGE TOGGLES
  // ==========================================
  const toggleFood = document.getElementById('toggleFood');
  const toggleBev = document.getElementById('toggleBev');
  const foodView = document.getElementById('foodView');
  const bevView = document.getElementById('bevView');

  if (toggleFood && toggleBev && foodView && bevView) {
    toggleFood.addEventListener('click', () => {
      toggleFood.classList.add('active');
      toggleBev.classList.remove('active');
      
      bevView.classList.remove('active');
      setTimeout(() => {
        bevView.style.display = 'none';
        foodView.style.display = 'block';
        setTimeout(() => {
          foodView.classList.add('active');
        }, 50);
      }, 300);
    });

    toggleBev.addEventListener('click', () => {
      toggleBev.classList.add('active');
      toggleFood.classList.remove('active');
      
      foodView.classList.remove('active');
      setTimeout(() => {
        foodView.style.display = 'none';
        bevView.style.display = 'block';
        setTimeout(() => {
          bevView.classList.add('active');
        }, 50);
      }, 300);
    });
  }

  // ==========================================
  // SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================
  // 3D INTERACTIVE TILT EFFECT ON CARDS
  // ==========================================
  const tiltCards = document.querySelectorAll('.dish-card, .usp-card, .contact-form-section, .split-image, .instagram-item');
  
  tiltCards.forEach(card => {
    // Inject glare container dynamically if not present
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      // Calculate tilt rotation (max 8 degrees for calm feel)
      const tiltX = (yc - y) / 12;
      const tiltY = (x - xc) / 12;
      
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px) translateZ(10px)`;
      
      // Update glare gradient position
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glare.style.setProperty('--glare-x', `${px}%`);
      glare.style.setProperty('--glare-y', `${py}%`);
      glare.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      glare.style.opacity = '0';
    });
  });

  // ==========================================
  // ROTATING FOOD WHEEL SHOWCASE
  // ==========================================
  const foodWheel = document.getElementById('foodWheel');
  const wheelItems = document.querySelectorAll('.wheel-item');
  const btnNext = document.getElementById('wheelNext');
  const btnPrev = document.getElementById('wheelPrev');
  const heroContent = document.getElementById('heroTextContent');

  const heroEyebrow = document.getElementById('heroEyebrow');
  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');
  const heroCTA = document.getElementById('heroCTA');

  if (foodWheel && wheelItems.length > 0) {
    const foodData = [
      {
        eyebrow: "Jumeirah's Favorite Burger",
        title: "Spicy. Juicy.<br><span>Paneer Tikka.</span>",
        desc: "Our signature Tandoori Paneer Tikka Burger features crispy golden paneer marinated for 12 hours, stacked with fresh capsicum and topped with fiery mint mayonnaise.",
        ctaText: "Explore Burgers",
        ctaHref: "menu.html#burgersCategory"
      },
      {
        eyebrow: "Woodfired Cheesy Perfection",
        title: "Hot. Bubbly.<br><span>Chicken Pizza.</span>",
        desc: "Spiced smoked chicken tikka, hot jalapenos, mozzarella, and a dynamic garlic marinara base, baked to a perfect bubbly golden-cheese finish.",
        ctaText: "Explore Pizza",
        ctaHref: "menu.html#pizzaCategory"
      },
      {
        eyebrow: "Fiery Street Comfort",
        title: "Steaming Hot.<br><span>Chilli Momos.</span>",
        desc: "Juicy pan-fried chicken dumplings tossed in our hot garlic chilli paste, green onions, and fresh coriander, served with spicy red schezwan chutney.",
        ctaText: "Explore Momos",
        ctaHref: "menu.html#momosCategory"
      },
      {
        eyebrow: "Indulgent Creamy Shakes",
        title: "Rich. Overloaded.<br><span>Belgian Shake.</span>",
        desc: "Rich, ultra-thick milkshake blended with premium imported Belgian cocoa, topped with chocolate fudge, fresh cream, and chocolate flakes.",
        ctaText: "Explore Shakes",
        ctaHref: "menu.html#shakesCategory"
      }
    ];

    let currentIndex = 0;
    let wheelRotation = 0;
    let autoPlayTimer = null;

    function rotateTo(index) {
      if (index === currentIndex) return;

      const itemsCount = foodData.length;
      let diff = index - currentIndex;

      if (diff > itemsCount / 2) diff -= itemsCount;
      if (diff < -itemsCount / 2) diff += itemsCount;

      wheelRotation += diff * -90;
      currentIndex = (index + itemsCount) % itemsCount;

      foodWheel.style.setProperty('--wheel-rotation', `${wheelRotation}deg`);

      wheelItems.forEach((item, i) => {
        if (i === currentIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      if (heroContent) {
        heroContent.classList.add('text-changing');
        
        setTimeout(() => {
          const currentFood = foodData[currentIndex];
          if (heroEyebrow) heroEyebrow.innerText = currentFood.eyebrow;
          if (heroTitle) heroTitle.innerHTML = currentFood.title;
          if (heroDesc) heroDesc.innerText = currentFood.desc;
          if (heroCTA) {
            heroCTA.innerText = currentFood.ctaText;
            heroCTA.href = currentFood.ctaHref;
          }
          
          heroContent.classList.remove('text-changing');
        }, 300);
      }
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % foodData.length;
        rotateTo(nextIndex);
      }, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
      }
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        stopAutoPlay();
        const nextIndex = (currentIndex + 1) % foodData.length;
        rotateTo(nextIndex);
        startAutoPlay();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        stopAutoPlay();
        const prevIndex = (currentIndex - 1 + foodData.length) % foodData.length;
        rotateTo(prevIndex);
        startAutoPlay();
      });
    }

    wheelItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        stopAutoPlay();
        rotateTo(i);
        startAutoPlay();
      });
    });

    startAutoPlay();
  }

  // ==========================================
  // 3D AUTOROTATING SHOWCASE CUBE
  // ==========================================
  const cube = document.getElementById('cubeShowcase');
  if (cube) {
    let rotation = 0;
    setInterval(() => {
      rotation -= 90;
      cube.style.setProperty('--cube-rotation', `${rotation}deg`);
    }, 4500);
  }
});
