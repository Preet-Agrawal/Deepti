// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavbar();
    initCarousel();
    initTestimonials();
    initStatsCounter();
    initContactForm();
    initBackToTop();
    initScrollReveal();
    initChart();
  });
  
  // Loading Screen
  function initLoader() {
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 1500);
    });
  }
  
  // Navbar Scroll Effect
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
  
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Carousel/Slider
  function initCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselNav = document.querySelector('.carousel-nav');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
  
    // Carousel data
    const carouselItems = [
      {
        image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Model E',
        description: 'Luxury electric sedan with 400+ miles range'
      },
      {
        image: 'https://images.unsplash.com/photo-1622419388331-391e2f6a0a7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Model X',
        description: 'Spacious electric SUV for the whole family'
      },
      {
        image: 'https://images.unsplash.com/photo-1629256698230-ecb8acd0b4a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        title: 'Model S',
        description: 'High-performance electric sports car'
      }
    ];
  
    let currentIndex = 0;
  
    // Create carousel items
    function createCarousel() {
      carouselTrack.innerHTML = '';
      carouselNav.innerHTML = '';
  
      carouselItems.forEach((item, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="carousel-caption">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `;
        carouselTrack.appendChild(slide);
  
        // Create navigation dots
        const dot = document.createElement('div');
        dot.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
          goToSlide(index);
        });
        carouselNav.appendChild(dot);
      });
  
      updateCarousel();
    }
  
    // Update carousel position
    function updateCarousel() {
      const slideWidth = document.querySelector('.carousel-slide').offsetWidth;
      carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      // Update active dot
      document.querySelectorAll('.carousel-indicator').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    // Go to specific slide
    function goToSlide(index) {
      currentIndex = (index + carouselItems.length) % carouselItems.length;
      updateCarousel();
    }
  
    // Next slide
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }
  
    // Previous slide
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }
  
    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
  
    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);
  
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
  
    carouselContainer.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  
    // Handle window resize
    window.addEventListener('resize', updateCarousel);
  
    // Initialize the carousel
    createCarousel();
  }
  
  // Testimonials
  function initTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-grid');
  
    const testimonials = [
      {
        text: 'Switching to an electric vehicle was the best decision I\'ve made. The savings on fuel and maintenance are incredible!',
        author: 'Sarah Johnson',
        role: 'Model E Owner',
        image: 'https://randomuser.me/api/portraits/women/43.jpg'
      },
      {
        text: 'The performance of my electric car is outstanding. Instant torque and smooth acceleration make every drive enjoyable.',
        author: 'Michael Chen',
        role: 'Model S Owner',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        text: 'As a family, we love our electric SUV. Plenty of space, advanced safety features, and no more gas station stops!',
        author: 'The Rodriguez Family',
        role: 'Model X Owners',
        image: 'https://randomuser.me/api/portraits/women/65.jpg'
      }
    ];
  
    // Create testimonial cards
    testimonials.forEach(testimonial => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
        <div class="testimonial-text">${testimonial.text}</div>
        <div class="testimonial-author">
          <img src="${testimonial.image}" alt="${testimonial.author}">
          <div class="author-info">
            <h4>${testimonial.author}</h4>
            <p>${testimonial.role}</p>
          </div>
        </div>
      `;
      testimonialsContainer.appendChild(card);
    });
  }
  
  // Animated Counter for Stats
  function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    const statsSection = document.querySelector('.stats');
    let animationStarted = false;
  
    function startCounters() {
      if (animationStarted) return;
      
      statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            stat.textContent = Math.round(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target.toLocaleString();
          }
        };
        
        updateCounter();
      });
      
      animationStarted = true;
    }
  
    // Start counters when stats section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(statsSection);
  }
  
  // Contact Form
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      });
    }
  }
  
  // Back to Top Button
  function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Scroll Reveal Animation
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Chart.js Integration
  function initChart() {
    const ctx = document.getElementById('emissionsChart');
    
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'CO2 Emissions (tons)',
          data: [120, 100, 85, 70, 55, 40],
          borderColor: '#00a8e8',
          backgroundColor: 'rgba(0, 168, 232, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
              size: 13
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: "'Poppins', sans-serif"
              }
            }
          }
        }
      }
    });
  }
  
  // Add reveal class to sections for scroll animations
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('reveal');
    });
  });