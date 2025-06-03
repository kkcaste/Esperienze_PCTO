
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Timeline dots functionality
        document.querySelectorAll('.timeline-dot').forEach(dot => {
            dot.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                const section = document.getElementById(target);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation and timeline updates
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a');
        const timelineDots = document.querySelectorAll('.timeline-dot');

        function updateActiveElements() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            // Update navigation
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });

            // Update timeline
            timelineDots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-target') === current) {
                    dot.classList.add('active');
                }
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observe experience cards
        document.querySelectorAll('.experience-card').forEach(card => {
            observer.observe(card);
        });

        // Scroll event listener
        window.addEventListener('scroll', updateActiveElements);

        // Initial call
        updateActiveElements();

        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });

        // Initial setup
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';

