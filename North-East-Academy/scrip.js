  // Scroll to section
        function scrollToSection(id) {
            const element = document.getElementById(id);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('open')) {
                toggleMobileMenu();
            }

            // Update active nav link
            updateActiveNavLink(id);
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuIcon = document.getElementById('menu-icon');
            
            mobileMenu.classList.toggle('open');
            
            if (mobileMenu.classList.contains('open')) {
                menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        }



        // Update active nav link
        function updateActiveNavLink(section) {
            // Desktop nav
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === section) {
                    link.classList.add('active');
                }
            });

            // Mobile nav
            document.querySelectorAll('.mobile-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === section) {
                    link.classList.add('active');
                }
            });
        }

        // Handle scroll events
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            
            // Add scrolled class
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active section
            const sections = ['home', 'about', 'courses', 'faculty', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });

            if (current) {
                updateActiveNavLink(current);
            }

            lastScrollY = window.scrollY;
        });

        // Handle form submission
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const formContainer = document.getElementById('contactFormContainer');
            
            // Show success message
            formContainer.innerHTML = `
                <div class="success-message">
                    <div class="success-icon">
                        <svg style="width: 2rem; height: 2rem; color: #22c55e;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="success-title">Thank You!</h3>
                    <p class="success-text">We'll get back to you within 24 hours.</p>
                </div>
            `;

            // Reset form after 3 seconds
            setTimeout(() => {
                formContainer.innerHTML = `
                    <form id="contactForm" onsubmit="handleFormSubmit(event)">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" placeholder="John Doe" required>
                        </div>

                        <div class="form-grid">
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" placeholder="john@example.com" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-input" placeholder="+91 98765 43210" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Course Interested In</label>
                            <select class="form-select" required>
                                <option value="">Select a course</option>
                                <option value="jee">JEE Advanced</option>
                                <option value="neet">NEET Preparation</option>
                                <option value="foundation">Foundation Course</option>
                                <option value="crash">Crash Course</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Message</label>
                            <textarea class="form-textarea" placeholder="Tell us about your goals and how we can help..." required></textarea>
                        </div>

                        <button type="submit" class="primary-button" style="width: 100%; height: 3rem; border-radius: 0.75rem;">
                            Submit Enquiry
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </button>
                    </form>
                `;
            }, 3000);
        }

        // Add fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.card, .course-card, .faculty-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });

            // Show hero right on desktop
            if (window.innerWidth >= 1024) {
                const heroRight = document.querySelector('.hero-right');
                if (heroRight) {
                    heroRight.style.display = 'block';
                    heroRight.style.opacity = '0';
                    heroRight.style.animation = 'fadeInUp 0.8s forwards 0.5s';
                }
            }
        });
