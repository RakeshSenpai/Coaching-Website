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

