document.addEventListener('DOMContentLoaded', () => {
  // Typing animation with multiple statements
  const typedTextElement = document.querySelector('.typed-text');
  const phrases = [
    'Frontend Developer',
    'Java Backend Developer',
    'Software Engineer',
    'FullStack Developer'
  ];
  // test vercel deploy test
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

  // Navbar scroll effect - glass morphism
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
  }

  // Social icons pop effect
  const socialIcons = document.querySelectorAll('.social-icon, .social-profile');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1)';
    });
  });

  // Dynamic year in footer
  const footerYear = document.querySelector('.footer p');
  if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} Subham Supriya Mohapatra. All rights reserved.`;
  }

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  const API_URL = '/api/contact';

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        purpose: document.getElementById('purpose').value,
        description: document.getElementById('description').value
      };

      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoader.style.display = 'inline';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
          contactForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = data.error || 'Something went wrong. Please try again.';
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Server error. Please try again later.';
      }

      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
    });
  }
});