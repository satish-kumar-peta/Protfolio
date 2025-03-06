const initThreeScene = () => {
          const container = document.getElementById('canvas-container');
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          
          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0x0f172a, 1);
          container.appendChild(renderer.domElement);
          
          // Create particles
          const particlesGeometry = new THREE.BufferGeometry();
          const particlesCount = 1000;
          
          const posArray = new Float32Array(particlesCount * 3);
          for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
          }
          
          particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
          
          const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x2563eb,
            transparent: true,
          });
          
          const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
          scene.add(particlesMesh);
          
          camera.position.z = 3;
          
          // Mouse movement effect
          let mouseX = 0;
          let mouseY = 0;
          
          document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          });
          
          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.001;
            particlesMesh.rotation.y += 0.001;
            
            // Subtle mouse following effect
            particlesMesh.rotation.x += mouseY * 0.001;
            particlesMesh.rotation.y += mouseX * 0.001;
            
            renderer.render(scene, camera);
          };
          
          animate();
          
          // Handle window resize
          window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          });
        };
        
        // Page loader
        const loader = document.querySelector('.loader');
        const progress = document.querySelector('.loader-progress');
        
        let loadProgress = 0;
        const loadInterval = setInterval(() => {
          loadProgress += Math.random() * 10;
          if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            
            setTimeout(() => {
              loader.style.opacity = '0';
              setTimeout(() => {
                loader.style.display = 'none';
                
                // Animate hero content
                gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
                gsap.to('.hero-title', { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
                gsap.to('.hero-description', { opacity: 1, y: 0, duration: 0.8, delay: 0.6 });
                gsap.to('.btn', { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
              }, 500);
            }, 500);
          }
          progress.style.width = `${loadProgress}%`;
        }, 200);
        
        // Initialize Three.js scene
        window.addEventListener('load', initThreeScene);
        
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
          mobileMenuBtn.classList.toggle('active');
          navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a nav link on mobile
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
          item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
              mobileMenuBtn.classList.remove('active');
              navLinks.classList.remove('active');
            }
          });
        });
        
        // Scroll header effect
        window.addEventListener('scroll', () => {
          const header = document.querySelector('.header');
          if (window.scrollY > 100) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        });
        
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
              });
            }
          });
        });
        
        // Scroll reveal animations
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (entry.target.classList.contains('skill-card')) {
                gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 * Array.from(entry.target.parentNode.children).indexOf(entry.target) % 4 });
              } else if (entry.target.classList.contains('project-card')) {
                gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 * Array.from(entry.target.parentNode.children).indexOf(entry.target) % 3 });
              } else if (entry.target.classList.contains('timeline-item')) {
                gsap.to(entry.target, { opacity: 1, x: 0, duration: 0.6 });
              } else if (entry.target.classList.contains('achievement-card')) {
                gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 * Array.from(entry.target.parentNode.children).indexOf(entry.target) });
              } else if (entry.target.classList.contains('contact-form')) {
                gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.6 });
              }
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        
        // Set initial states and observe elements
        window.addEventListener('DOMContentLoaded', () => {
          // Initialize GSAP and set initial states
          gsap.set('.skill-card', { y: 50, opacity: 0 });
          gsap.set('.project-card', { y: 50, opacity: 0 });
          gsap.set('.timeline-item:nth-child(odd)', { opacity: 0, x: -50 });
          gsap.set('.timeline-item:nth-child(even)', { opacity: 0, x: 50 });
          gsap.set('.achievement-card', { y: 50, opacity: 0 });
          gsap.set('.contact-form', { y: 50, opacity: 0 });
          
          // Observe elements
          document.querySelectorAll('.skill-card, .project-card, .timeline-item, .achievement-card, .contact-form').forEach(el => {
            observer.observe(el);
          });
        });
        
        // Form submission handling (prevent default)
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Message sent successfully! (This is a demo - no actual message was sent)');
          contactForm.reset();
        });