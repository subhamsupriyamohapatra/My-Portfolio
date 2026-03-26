document.addEventListener('DOMContentLoaded', () => {
  // Typing animation with multiple statements
  const typedTextElement = document.querySelector('.typed-text');
  const phrases = [
    'Frontend Developer',
    'Java Backend Developer',
    'Software Engineer',
    'FullStack Developer'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  typeEffect();

  // Skills bar animation with percentage counter
  const skillBars = document.querySelectorAll('.skill-bar-card');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const progress = parseInt(card.dataset.progress);
        const fill = card.querySelector('.skill-bar-fill');
        const percentage = card.querySelector('.skill-percentage');
        
        // Animate the bar width
        fill.style.width = progress + '%';
        
        // Animate the percentage counter
        let currentPercent = 0;
        const counter = setInterval(() => {
          currentPercent += 1;
          percentage.textContent = currentPercent + '%';
          if (currentPercent >= progress) {
            clearInterval(counter);
          }
        }, 1500 / progress);
        
        skillObserver.unobserve(card);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      skillObserver.observe(bar);
    }, index * 100);
  });

  // Circular Skills Chart Animation
  const chartSegments = document.querySelectorAll('.chart-segment');
  const chartCircle = document.querySelector('.chart-circle');
  const chartPercent = document.querySelector('.chart-percent');
  const chartLabel = document.querySelector('.chart-label');
  
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        chartSegments.forEach((segment, index) => {
          const skill = parseInt(segment.dataset.skill);
          setTimeout(() => {
            segment.classList.add('animated');
          }, index * 200);
        });
        
        // Animate center text
        let percent = 0;
        const targetPercent = 95;
        const counter = setInterval(() => {
          percent += 1;
          chartPercent.textContent = percent + '%';
          if (percent >= targetPercent) {
            clearInterval(counter);
          }
        }, 30);
        
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (chartCircle) {
    chartObserver.observe(chartCircle);
  }

  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Add 3D tilt effect during scroll
        document.body.style.perspective = '2000px';
        setTimeout(() => {
          document.body.style.perspective = '1000px';
        }, 800);
        
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect with 3D transform
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.transform = 'translateZ(10px)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.transform = 'translateZ(0)';
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // 3D Section reveal on scroll
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation with delay based on index
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        
        // Add 3D rotation during reveal
        entry.target.style.transform = 'translateZ(0) rotateX(0)';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Parallax mouse movement for hero section
  const heroSection = document.querySelector('.hero-section');
  
  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');
    
    heroText.style.transform = `translateZ(50px) translateX(${x}px) translateY(${y}px)`;
    heroVisual.style.transform = `translateZ(50px) translateX(${-x}px) translateY(${-y}px)`;
  });

  // Profile card 3D tilt effect
  const profileCard = document.querySelector('.profile-card');
  
  profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    profileCard.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
  });

  profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  });

  // Skill cards 3D hover effect
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    category.addEventListener('mousemove', (e) => {
      const rect = category.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      category.style.transform = `translateZ(30px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    });
    
    category.addEventListener('mouseleave', () => {
      category.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
    });
  });

  // Project cards 3D flip effect
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(1000px) translateZ(40px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) translateZ(0) rotateY(0) rotateX(0)';
    });
  });

  // Timeline 3D scroll animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateZ(0) translateX(0)';
        }, index * 200);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = item.dataset.position === 'left' 
      ? 'translateZ(-50px) translateX(-50px)' 
      : 'translateZ(-50px) translateX(50px)';
    item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    timelineObserver.observe(item);
  });

  // Contact items 3D stagger reveal
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateZ(-30px) translateY(30px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const contactObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateZ(0) translateY(0)';
        }, index * 150);
        contactObserver.unobserve(item);
      }
    }, { threshold: 0.5 });
    
    contactObserver.observe(item);
  });

  // Hamburger menu toggle with 3D animation
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    
    // 3D transform for menu items
    const links = navLinksContainer.querySelectorAll('li');
    links.forEach((link, index) => {
      if (navLinksContainer.classList.contains('active')) {
        link.style.opacity = '0';
        link.style.transform = 'translateZ(-30px) translateY(-20px)';
        setTimeout(() => {
          link.style.opacity = '1';
          link.style.transform = 'translateZ(0) translateY(0)';
        }, 100 + index * 50);
      }
    });
  });

  // Scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
  });

  // Smooth reveal for education card
  const educationCard = document.querySelector('.education-card');
  
  const educationObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      educationCard.style.transform = 'translateZ(0) scale(1)';
      educationCard.style.opacity = '1';
    }
  }, { threshold: 0.3 });

  educationCard.style.opacity = '0';
  educationCard.style.transform = 'translateZ(-30px) scale(0.9)';
  educationCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  educationObserver.observe(educationCard);

  // Button ripple effect with 3D
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 0;
        height: 0;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      ripple.animate([
        { width: '0', height: '0', opacity: 1 },
        { width: '300px', height: '300px', opacity: 0 }
      ], {
        duration: 600,
        easing: 'ease-out'
      }).onfinish = () => ripple.remove();
    });
  });

  // Initialize first section as visible
  document.querySelector('.hero-section').classList.add('visible');

  // Social icons 3D pop effect
  const socialIcons = document.querySelectorAll('.social-icon, .social-profile');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateZ(30px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'translateZ(0) scale(1)';
    });
  });

  // Dynamic year in footer
  const footerYear = document.querySelector('.footer p');
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} Subham Supriya Mohapatra. All rights reserved.`;
  }

  // Preload images and fonts for smooth experience
  if (document.readyState === 'complete') {
    document.body.style.opacity = '1';
  } else {
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });
  }
});

// Add CSS for loading state
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Add smooth anchor scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});