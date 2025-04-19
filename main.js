// // Select all 'Join Now' buttons
// document.querySelectorAll('.price__btn').forEach(button => {
//     button.addEventListener('click', (event) => {
//       // Get the plan details
//       const planCard = event.target.closest('.price__card');
//       const planName = planCard.querySelector('h4').innerText;
//       const planPrice = planCard.querySelector('h3').innerText;
  
//       // Redirect to a payment page with query parameters
//       const paymentUrl = `payment.html?plan=${encodeURIComponent(planName)}&price=${encodeURIComponent(planPrice)}`;
//       window.location.href = paymentUrl;
//     });
//   });
  
  // Wait for DOM to fully load
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeCounters();
    initializeCarousels();
    initializeAnimations();
    initializeParallax();
    initializeDarkMode();
    initializeMembershipCalculator();
    initializeGallery();
    initializeTestimonialCarousel();
    initializeBMICalculator();
    initializeCountdown();
});

// Mobile Navigation & Sticky Header
function initializeNavigation() {
    const mobileMenu = document.querySelector('.mobile__menu');
    const navLinks = document.querySelector('.nav__links');
    const header = document.querySelector('nav');
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon based on state
        const icon = this.querySelector('i');
        if (icon.classList.contains('ri-menu-line')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.querySelector('i').classList.remove('ri-close-line');
                mobileMenu.querySelector('i').classList.add('ri-menu-line');
            }
            
            // Smooth scroll to section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky header with reveal animation
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            // Hide on scroll down, show on scroll up
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add these styles to make the navigation sticky
    const style = document.createElement('style');
    style.textContent = `
        nav.sticky {
            background-color: rgba(15, 14, 23, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }
        
        .nav__links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--primary-color);
            padding: 2rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            z-index: 100;
        }
        
        @media (max-width: 900px) {
            .nav__links.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
}

// Animated Counters for Stats
function initializeCounters() {
    // Create stats section after the about section
    const aboutSection = document.getElementById('about');
    const statsSection = document.createElement('section');
    statsSection.className = 'section__container stats__container';
    statsSection.id = 'stats';
    
    statsSection.innerHTML = `
        <h2 class="section__header">OUR FITNESS IMPACT</h2>
        <p class="section__subheader">
            Our results speak for themselves. Join thousands who have transformed their lives
            with AT's Fitness.
        </p>
        <div class="stats__grid">
            <div class="stats__card">
                <span class="counter" data-target="5000">0</span>
                <p>Happy Members</p>
            </div>
            <div class="stats__card">
                <span class="counter" data-target="25">0</span>
                <p>Expert Trainers</p>
            </div>
            <div class="stats__card">
                <span class="counter" data-target="100">0</span>
                <p>Weekly Classes</p>
            </div>
            <div class="stats__card">
                <span class="counter" data-target="15">0</span>
                <p>Years Experience</p>
            </div>
        </div>
    `;
    
    aboutSection.parentNode.insertBefore(statsSection, aboutSection.nextSibling);
    
    // Add styles for the stats section
    const style = document.createElement('style');
    style.textContent = `
        .stats__grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-top: 4rem;
        }
        
        .stats__card {
            padding: 2rem;
            background-color: var(--primary-color-light);
            border-radius: 15px;
            text-align: center;
            transition: var(--transition);
        }
        
        .stats__card:hover {
            transform: translateY(-10px);
            background-color: var(--primary-color-extra-light);
        }
        
        .stats__card span {
            display: block;
            margin-bottom: 1rem;
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--text-bright);
            background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .stats__card p {
            color: var(--text-light);
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        @media (width < 1024px) {
            .stats__grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (width < 600px) {
            .stats__grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Animate counters when in viewport
    const counters = document.querySelectorAll('.counter');
    let counted = false;
    
    function startCounting() {
        if (counted) return;
        
        if (isInViewport(document.querySelector('.stats__grid'))) {
            counted = true;
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Check on scroll
    window.addEventListener('scroll', startCounting);
    // Also check on page load
    startCounting();
}

// Program/Pricing Carousels & Tabs
function initializeCarousels() {
    // Program carousel functionality
    const exploreCards = document.querySelectorAll('.explore__card');
    const prevBtn = document.querySelector('.explore__nav span:first-child');
    const nextBtn = document.querySelector('.explore__nav span:last-child');
    
    // Create additional programs to demonstrate carousel
    const exploreGrid = document.querySelector('.explore__grid');
    const additionalPrograms = [
        {
            icon: 'ri-mental-health-fill',
            title: 'Yoga & Wellness',
            description: 'Balance body and mind with our holistic yoga sessions designed to improve flexibility, focus and inner peace.',
        },
        {
            icon: 'ri-group-fill',
            title: 'Group Training',
            description: 'Experience the energy of team workouts with specialized group classes that motivate and push your boundaries.',
        },
        {
            icon: 'ri-heart-add-fill',
            title: 'Recovery Sessions',
            description: 'Optimize your training with guided recovery protocols including foam rolling, stretching, and mobility work.',
        },
        {
            icon: 'ri-timer-flash-fill',
            title: 'HIIT Performance',
            description: 'Maximize calorie burn and athletic performance with our intense interval-based sessions for rapid results.',
        }
    ];
    
    // Add additional programs but hide them initially
    additionalPrograms.forEach(program => {
        const card = document.createElement('div');
        card.className = 'explore__card';
        card.style.display = 'none';
        
        card.innerHTML = `
            <span><i class="${program.icon}"></i></span>
            <h4>${program.title}</h4>
            <p>${program.description}</p>
            <a href="#">Explore Program <i class="ri-arrow-right-line"></i></a>
        `;
        
        exploreGrid.appendChild(card);
    });
    
    // All cards including new ones
    const allExploreCards = document.querySelectorAll('.explore__grid .explore__card');
    let currentIndex = 0;
    const cardsPerView = window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 4;
    
    // Update displayed cards
    function updateCarousel() {
        allExploreCards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsPerView) {
                card.style.display = 'block';
                card.classList.add('animate-in');
                setTimeout(() => {
                    card.classList.remove('animate-in');
                }, 300);
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Navigation handlers
    nextBtn.addEventListener('click', () => {
        if (currentIndex + cardsPerView < allExploreCards.length) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 4;
        if (newCardsPerView !== cardsPerView) {
            currentIndex = 0;
            updateCarousel();
        }
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeIn 0.3s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Testimonial carousel
    const testimonials = [
        {
            text: "AT's Fitness completely transformed my approach to health and wellness. The trainers here genuinely care about your progress and create personalized plans that actually work. The community is supportive, the facilities are incredible, and I've achieved results I never thought possible.",
            name: "Sarah Johnson",
            membership: "Premium Member - 2 Years"
        },
        {
            text: "After trying various gyms for years, AT's Fitness is by far the best investment I've made in my health. The trainers are knowledgeable, the equipment is top-notch, and the atmosphere is motivating without being intimidating. I've lost 30 pounds and feel stronger than ever.",
            name: "Michael Torres",
            membership: "Elite Member - 1 Year"
        },
        {
            text: "The personal attention at AT's Fitness is unmatched. They take the time to understand your goals and limitations, then create a program that pushes you just the right amount. The community aspect keeps me accountable, and I look forward to my workouts every day.",
            name: "Jennifer Patel",
            membership: "Ultimate Member - 3 Years"
        }
    ];
    
    const testimonialContent = document.querySelector('.review__content p');
    const memberName = document.querySelector('.review__member__details h4');
    const memberInfo = document.querySelector('.review__member__details p');
    const testimonialprevBtn = document.querySelector('.review__nav span:first-child');
    const testimonialnextBtn = document.querySelector('.review__nav span:last-child');
    
    let currentTestimonial = 0;
    
    function updateTestimonial() {
        // Fade out
        testimonialContent.style.opacity = 0;
        memberName.style.opacity = 0;
        memberInfo.style.opacity = 0;
        
        setTimeout(() => {
            testimonialContent.textContent = testimonials[currentTestimonial].text;
            memberName.textContent = testimonials[currentTestimonial].name;
            memberInfo.textContent = testimonials[currentTestimonial].membership;
            
            // Fade in
            testimonialContent.style.opacity = 1;
            memberName.style.opacity = 1;
            memberInfo.style.opacity = 1;
        }, 300);
    }
    
    testimonialnextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    });
    
    testimonialprevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });
    
    // Add fade transition
    const testimonialStyle = document.createElement('style');
    testimonialStyle.textContent = `
        .review__content p,
        .review__member__details h4,
        .review__member__details p {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(testimonialStyle);
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
}

// Scroll-triggered Animations
function initializeAnimations() {
    // Add Intersection Observer for fade-in animations
    const animatedElements = document.querySelectorAll('.section__header, .section__subheader, .explore__card, .price__card, .join__card, .class__img-1, .class__img-2');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(element => {
        element.classList.add('hidden-element');
        animationObserver.observe(element);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .hidden-element {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .animate-fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });
    
    // Add active link style
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        .active-link {
            color: var(--accent-color) !important;
        }
        
        .active-link::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(navStyle);
}

// Parallax Effects
function initializeParallax() {
    // Add parallax effect to header image and blur elements
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const headerImage = document.querySelector('.header__image img');
        const blurElements = document.querySelectorAll('.bg__blur');
        
        // Parallax for header image
        if (headerImage) {
            headerImage.style.transform = `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0005})`;
        }
        
        // Move blur elements for parallax effect
        blurElements.forEach(element => {
            const speed = element.classList.contains('header__blur-1') ? 0.05 : -0.03;
            element.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
        });
    });
}

// Dark/Light Mode Toggle
function initializeDarkMode() {
    // Create toggle button
    const nav = document.querySelector('.nav__container');
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = '<i class="ri-moon-fill"></i>';
    
    // Insert before mobile menu
    nav.insertBefore(toggleBtn, document.querySelector('.mobile__menu'));
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            margin-left: 1rem;
            font-size: 1.5rem;
            color: var(--text-bright);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .theme-toggle:hover {
            color: var(--accent-color);
        }
        
        /* Light theme variables will be applied when .light-theme is added to body */
        body.light-theme {
            --primary-color: #f8f9fa;
            --primary-color-light: #e9ecef;
            --primary-color-extra-light: #dee2e6;
            --text-light: #6c757d;
            --text-bright: #212529;
        }
        
        body.light-theme .explore__card,
        body.light-theme .price__card,
        body.light-theme .stats__card {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }
        
        body.light-theme nav {
            background-color: rgba(248, 249, 250, 0.9);
        }
        
        body.light-theme .review {
            background-color: #e9ecef;
        }
        
        body.light-theme .footer__socials a,
        body.light-theme .review__nav span {
            background-color: var(--primary-color);
        }
        
        /* Dark theme gets a nice glow effect */
        body:not(.light-theme) .btn,
        body:not(.light-theme) .explore__card span,
        body:not(.light-theme) .join__card span {
            box-shadow: 0 0 20px rgba(255, 46, 99, 0.4);
        }
    `;
    document.head.appendChild(style);
    
    // Toggle functionality
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        // Update icon
        const icon = toggleBtn.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'ri-sun-fill';
        } else {
            icon.className = 'ri-moon-fill';
        }
        
        // Save preference
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
    
    // Check for saved preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        toggleBtn.querySelector('i').className = 'ri-sun-fill';
    }
}

// Interactive Membership Calculator
function initializeMembershipCalculator() {
    // Create membership calculator section
    const calculatorSection = document.createElement('section');
    calculatorSection.className = 'section__container calculator__container';
    calculatorSection.id = 'calculator';
    
    calculatorSection.innerHTML = `
        <h2 class="section__header">MEMBERSHIP CALCULATOR</h2>
        <p class="section__subheader">
            Find the perfect membership plan based on your needs and budget.
            Customize your fitness journey with our interactive calculator.
        </p>
        
        <div class="calculator__form">
            <div class="calculator__row">
                <div class="calculator__option">
                    <label>Membership Type</label>
                    <select id="membershipType">
                        <option value="basic">Basic Pass ($29/month)</option>
                        <option value="premium">Premium Pass ($59/month)</option>
                        <option value="elite">Elite Pass ($99/month)</option>
                        <option value="ultimate">Ultimate Pass ($159/month)</option>
                    </select>
                </div>
                
                <div class="calculator__option">
                    <label>Duration</label>
                    <select id="membershipDuration">
                        <option value="1">1 Month</option>
                        <option value="3">3 Months (5% discount)</option>
                        <option value="6">6 Months (10% discount)</option>
                        <option value="12">12 Months (15% discount)</option>
                    </select>
                </div>
            </div>
            
            <div class="calculator__row">
                <div class="calculator__option">
                    <label>Add Personal Training</label>
                    <select id="personalTraining">
                        <option value="0">No Training</option>
                        <option value="99">1 Session/month ($99)</option>
                        <option value="189">2 Sessions/month ($189)</option>
                        <option value="269">4 Sessions/month ($269)</option>
                    </select>
                </div>
                
                <div class="calculator__option">
                    <label>Add Nutrition Plan</label>
                    <div class="toggle__option">
                        <input type="checkbox" id="nutritionPlan">
                        <span class="toggle__label">Add for $49/month</span>
                    </div>
                </div>
            </div>
            
            <div class="calculator__result">
                <div class="result__card">
                    <div class="result__left">
                        <h3>Your Monthly Investment</h3>
                        <p>Customize options to see your pricing</p>
                    </div>
                    <div class="result__right">
                        <h2 id="monthlyPrice">$29</h2>
                        <p id="totalPrice">Total: $29</p>
                    </div>
                </div>
                <button class="btn calculator__btn">Get Started Now</button>
            </div>
        </div>
    `;
    
    // Insert before pricing section
    const pricingSection = document.getElementById('plan');
    pricingSection.parentNode.insertBefore(calculatorSection, pricingSection);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .calculator__form {
            background-color: var(--primary-color-light);
            border-radius: 15px;
            padding: 2rem;
            margin-top: 2rem;
        }
        
        .calculator__row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .calculator__option label {
            display: block;
            margin-bottom: 0.8rem;
            color: var(--text-bright);
            font-weight: 600;
        }
        
        .calculator__option select {
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
            border: none;
            background-color: var(--primary-color-extra-light);
            color: var(--text-bright);
            font-size: 1rem;
        }
        
        .toggle__option {
            display: flex;
            align-items: center;
        }
        
        .toggle__option input {
            position: relative;
            width: 60px;
            height: 30px;
            appearance: none;
            background-color: var(--primary-color-extra-light);
            border-radius: 30px;
            cursor: pointer;
            margin-right: 1rem;
            transition: var(--transition);
        }
        
        .toggle__option input::before {
            content: "";
            position: absolute;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            background-color: var(--text-light);
            transition: var(--transition);
        }
        
        .toggle__option input:checked {
            background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
        }
        
        .toggle__option input:checked::before {
            left: 32px;
            background-color: white;
        }
        
        .toggle__label {
            color: var(--text-light);
        }
        
        .calculator__result {
            margin-top: 2rem;
        }
        
        .result__card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--primary-color-extra-light);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        
        .result__left h3 {
            color: var(--text-bright);
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }
        
        .result__left p {
            color: var(--text-light);
        }
        
        .result__right h2 {
            color: var(--text-bright);
            font-size: 2.5rem;
            font-weight: 800;
            text-align: right;
            background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .result__right p {
            color: var(--text-light);
            text-align: right;
        }
        
        .calculator__btn {
            width: 100%;
        }
        
        @media (width < 768px) {
            .calculator__row {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .result__card {
                flex-direction: column;
                text-align: center;
                gap: 1rem;
            }
            
            .result__right h2,
            .result__right p {
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Calculator functionality
    function updatePrice() {
        const membershipType = document.getElementById('membershipType').value;
        const duration = parseInt(document.getElementById('membershipDuration').value);
        const personalTraining = parseInt(document.getElementById('personalTraining').value);
        const nutritionPlan = document.getElementById('nutritionPlan').checked;
        
        // Base price
        let basePrice = 0;
        switch (membershipType) {
            case 'basic': basePrice = 29; break;
            case 'premium': basePrice = 59; break;
            case 'elite': basePrice = 99; break;
            case 'ultimate': basePrice = 159; break;
        }
        
        // Apply duration discount
        let discount = 0;
        switch (duration) {
            case 3: discount = 0.05; break;
            case 6: discount = 0.10; break;
            case 12: discount = 0.15; break;
        }
        
        // Calculate total monthly price
        let monthlyPrice = basePrice;
        monthlyPrice += personalTraining;
        if (nutritionPlan) monthlyPrice += 49;
        
        // Apply discount
        const discountedMonthly = monthlyPrice * (1 - discount);
        const totalPrice = discountedMonthly * duration;
        
        // Update display
        document.getElementById('monthlyPrice').textContent = `$${discountedMonthly.toFixed(2)}`;
        document.getElementById('totalPrice').textContent = `Total: $${totalPrice.toFixed(2)} for ${duration} month${duration > 1 ? 's' : ''}`;
        
        // Add animation
        const resultCard = document.querySelector('.result__card');
        resultCard.classList.add('price-updated');
        setTimeout(() => {
            resultCard.classList.remove('price-updated');
        }, 300);
    }
    
    // Add event listeners once the DOM is updated
    setTimeout(() => {
        document.getElementById('membershipType').addEventListener('change', updatePrice);
        document.getElementById('membershipDuration').addEventListener('change', updatePrice);
        document.getElementById('personalTraining').addEventListener('change', updatePrice);
        document.getElementById('nutritionPlan').addEventListener('change', updatePrice);
        
        // Add price update animation
        const animStyle = document.createElement('style');
        animStyle.textContent = `
            @keyframes priceUpdate {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .price-updated {
                animation: priceUpdate 0.3s ease;
            }
        `;
        document.head.appendChild(animStyle);
        
        // Initialize with default values
        updatePrice();
    }, 100);
}

// Interactive Image Gallery
function initializeGallery() {
    // Create gallery section
    const gallerySection = document.createElement('section');
    gallerySection.className = 'section__container gallery__container';
    gallerySection.id = 'gallery';
    
    gallerySection.innerHTML = `
        <h2 class="section__header">GALLERY</h2>
        <p class="section__subheader">
            Take a visual tour of our state-of-the-art facilities, dynamic training sessions, 
            and the vibrant community that makes AT's Fitness special.
        </p>
        
        <div class="gallery__grid">
            <div class="gallery__item" data-category="facilities">
                <img src="https://source.unsplash.com/random/600x400/?gym" alt="Gym Facility">
                <div class="gallery__overlay">
                    <h4>Modern Facilities</h4>
                    <p>State-of-the-art equipment</p>
                </div>
            </div>
            <div class="gallery__item" data-category="classes">
                <img src="https://source.unsplash.com/random/600x400/?fitness-class" alt="Fitness Class">
                <div class="gallery__overlay">
                    <h4>Group Classes</h4>
                    <p>Energetic environment</p>
                </div>
            </div>
            <div class="gallery__item" data-category="trainers">
                <img src="https://source.unsplash.com/random/600x400/?personal-trainer" alt="Personal Trainer">
                <div class="gallery__overlay">
                    <h4>Expert Trainers</h4>
                    <p>Personalized guidance</p>
                </div>
            </div>
            <div class="gallery__item" data-category="facilities">
                <img src="https://source.unsplash.com/random/600x400/?gym-equipment" alt="Gym Equipment">
                <div class="gallery__overlay">
                    <h4>Premium Equipment</h4>
                    <p>Latest fitness technology</p>
                </div>
            </div>
            <div class="gallery__item" data-category="classes">
                <img src="https://source.unsplash.com/random/600x400/?yoga" alt="Yoga Class">
                <div class="gallery__overlay">
                    <h4>Yoga & Wellness</h4>
                    <p>Mind-body balance</p>
                </div>
            </div>
            <div class="gallery__item" data-category="members">
                <img src="https://source.unsplash.com/random/600x400/?gym-members" alt="Gym Members">
                <div class="gallery__overlay">
                    <h4>Community</h4>
                    <p>Supportive atmosphere</p>
                </div>
            </div>
        </div>
        
        <div class="gallery__filter">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="facilities">Facilities</button>
            <button class="filter-btn" data-filter="classes">Classes</button>
            <button class="filter-btn" data-filter="trainers">Trainers</button>
            <button class="filter-btn" data-filter="members">Members</button>
        </div>
        
        <div class="gallery__modal">
            <span class="modal__close"><i class="ri-close-line"></i></span>
            <img src="" alt="Gallery Image">
            <div class="modal__nav">
                <span class="modal__prev"><i class="ri-arrow-left-s-line"></i></span>
                <span class="modal__next"><i class="ri-arrow-right-s-line"></i></span>
            </div>
        </div>
    `;
    
    // Insert before trainer section or another appropriate location
    const trainerSection = document.getElementById('trainers') || document.getElementById('class');
    trainerSection.parentNode.insertBefore(gallerySection, trainerSection);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .gallery__grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-top: 3rem;
        }
        
        .gallery__item {
            position: relative;
            overflow: hidden;
            border-radius: 15px;
            cursor: pointer;
            height: 250px;
            transition: var(--transition);
        }
        
        .gallery__item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .gallery__item:hover img {
            transform: scale(1.1);
        }
        
        .gallery__overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            padding: 1.5rem;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        
        .gallery__item:hover .gallery__overlay {
            transform: translateY(0);
        }
        
        .gallery__overlay h4 {
            color: white;
            margin-bottom: 0.5rem;
        }
        
        .gallery__overlay p {
            color: rgba(255,255,255,0.8);
            font-size: 0.9rem;
        }
        
        .gallery__filter {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .filter-btn {
            background: var(--primary-color-light);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 30px;
            color: var(--text-light);
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .filter-btn.active, .filter-btn:hover {
            background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
            color: white;
        }
        
        .gallery__modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .gallery__modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .gallery__modal img {
            max-width: 80%;
            max-height: 80%;
            border-radius: 8px;
        }
        
        .modal__close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2rem;
            color: white;
            cursor: pointer;
        }
        
        .modal__nav {
            position: absolute;
            bottom: 20px;
            display: flex;
            gap: 1rem;
        }
        
        .modal__prev, .modal__next {
            background-color: rgba(255,255,255,0.2);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 1.5rem;
            color: white;
            transition: var(--transition);
        }
        
        .modal__prev:hover, .modal__next:hover {
            background-color: rgba(255,255,255,0.4);
        }
        
        @media (width < 1024px) {
            .gallery__grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (width < 600px) {
            .gallery__grid {
                grid-template-columns: 1fr;
            }
            
            .gallery__filter {
                flex-direction: column;
                align-items: center;
            }
            
            .filter-btn {
                width: 100%;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Gallery functionality
    setTimeout(() => {
        const galleryItems = document.querySelectorAll('.gallery__item');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const modal = document.querySelector('.gallery__modal');
        const modalImg = document.querySelector('.gallery__modal img');
        const modalClose = document.querySelector('.modal__close');
        const modalPrev = document.querySelector('.modal__prev');
        const modalNext = document.querySelector('.modal__next');
        
        let currentIndex = 0;
        let filteredItems = [...galleryItems];
        
        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                // Filter items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-fade-in');
                        setTimeout(() => {
                            item.classList.remove('animate-fade-in');
                        }, 500);
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Update filtered items array for modal navigation
                filteredItems = [...galleryItems].filter(item => 
                    filter === 'all' || item.dataset.category === filter
                );
            });
        });
        
        // Modal functionality
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                currentIndex = filteredItems.indexOf(item);
                
                modalImg.src = imgSrc;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        modalNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % filteredItems.length;
            modalImg.src = filteredItems[currentIndex].querySelector('img').src;
            animateModalImage();
        });
        
        modalPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
            modalImg.src = filteredItems[currentIndex].querySelector('img').src;
            animateModalImage();
        });
        
        function animateModalImage() {
            modalImg.style.opacity = '0';
            setTimeout(() => {
                modalImg.style.opacity = '1';
            }, 200);
        }
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Add modal image transition
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .gallery__modal img {
                transition: opacity 0.2s ease;
            }
        `;
        document.head.appendChild(modalStyle);
    }, 100);
}

// Testimonial Carousel Enhancement
function initializeTestimonialCarousel() {
    // We already have this functionality in initializeCarousels(),
    // but we'll enhance it with user-submitted testimonials
    
    // Create testimonial submission form at the bottom of Reviews section
    const reviewSection = document.querySelector('.review');
    const testimonialForm = document.createElement('div');
    testimonialForm.className = 'testimonial__form';
    
    testimonialForm.innerHTML = `
        <h3>Share Your Experience</h3>
        <p>We'd love to hear about your fitness journey with us!</p>
        
        <form id="testimonialForm">
            <div class="form__group">
                <label for="testimonialName">Your Name</label>
                <input type="text" id="testimonialName" required>
            </div>
            
            <div class="form__group">
                <label for="testimonialMembership">Membership Type</label>
                <select id="testimonialMembership" required>
                    <option value="">Select your membership</option>
                    <option value="Basic Member">Basic Member</option>
                    <option value="Premium Member">Premium Member</option>
                    <option value="Elite Member">Elite Member</option>
                    <option value="Ultimate Member">Ultimate Member</option>
                </select>
            </div>
            
            <div class="form__group">
                <label for="testimonialText">Your Testimonial</label>
                <textarea id="testimonialText" rows="4" required></textarea>
            </div>
            
            <div class="form__group">
                <label for="testimonialRating">Your Rating</label>
                <div class="rating__stars">
                    <i class="ri-star-line" data-value="1"></i>
                    <i class="ri-star-line" data-value="2"></i>
                    <i class="ri-star-line" data-value="3"></i>
                    <i class="ri-star-line" data-value="4"></i>
                    <i class="ri-star-line" data-value="5"></i>
                    <input type="hidden" id="testimonialRating" value="0">
                </div>
            </div>
            
            <button type="submit" class="btn">Submit Testimonial</button>
        </form>
        
        <div class="submission__message"></div>
    `;
    
    reviewSection.appendChild(testimonialForm);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .testimonial__form {
            max-width: 600px;
            margin: 3rem auto 0;
            background-color: var(--primary-color-light);
            border-radius: 15px;
            padding: 2rem;
        }
        
        .testimonial__form h3 {
            color: var(--text-bright);
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }
        
        .testimonial__form p {
            color: var(--text-light);
            margin-bottom: 1.5rem;
        }
        
        .form__group {
            margin-bottom: 1.5rem;
        }
        
        .form__group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-bright);
            font-weight: 500;
        }
        
        .form__group input,
        .form__group select,
        .form__group textarea {
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
            border: none;
            background-color: var(--primary-color-extra-light);
            color: var(--text-bright);
            font-size: 1rem;
        }
        
        .form__group textarea {
            resize: vertical;
        }
        
        .rating__stars {
            display: flex;
            gap: 0.5rem;
            font-size: 1.5rem;
            color: var(--text-light);
        }
        
        .rating__stars i {
            cursor: pointer;
            transition: var(--transition);
        }
        
        .rating__stars i.active {
            color: #ffca28;
        }
        
        .submission__message {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            display: none;
        }
        
        .submission__message.success {
            background-color: rgba(46, 213, 115, 0.2);
            color: #2ed573;
            display: block;
        }
        
        .submission__message.error {
            background-color: rgba(255, 71, 87, 0.2);
            color: #ff4757;
            display: block;
        }
    `;
    document.head.appendChild(style);
    
    // Testimonial form functionality
    setTimeout(() => {
        const ratingStars = document.querySelectorAll('.rating__stars i');
        const ratingInput = document.getElementById('testimonialRating');
        const testimonialForm = document.getElementById('testimonialForm');
        const submissionMessage = document.querySelector('.submission__message');
        
        // Star rating functionality
        ratingStars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const value = parseInt(star.dataset.value);
                
                ratingStars.forEach(s => {
                    const starValue = parseInt(s.dataset.value);
                    
                    if (starValue <= value) {
                        s.classList.remove('ri-star-line');
                        s.classList.add('ri-star-fill', 'active');
                    } else {
                        s.classList.remove('ri-star-fill', 'active');
                        s.classList.add('ri-star-line');
                    }
                });
            });
            
            star.addEventListener('mouseout', () => {
                const currentRating = parseInt(ratingInput.value);
                
                ratingStars.forEach(s => {
                    const starValue = parseInt(s.dataset.value);
                    
                    if (starValue <= currentRating) {
                        s.classList.remove('ri-star-line');
                        s.classList.add('ri-star-fill', 'active');
                    } else {
                        s.classList.remove('ri-star-fill', 'active');
                        s.classList.add('ri-star-line');
                    }
                });
            });
            
            star.addEventListener('click', () => {
                const value = parseInt(star.dataset.value);
                ratingInput.value = value;
            });
        });
        
        // Form submission
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('testimonialName').value;
            const membership = document.getElementById('testimonialMembership').value;
            const text = document.getElementById('testimonialText').value;
            const rating = parseInt(document.getElementById('testimonialRating').value);
            
            if (!name || !membership || !text || rating === 0) {
                submissionMessage.textContent = 'Please fill in all fields and provide a rating.';
                submissionMessage.className = 'submission__message error';
                return;
            }
            
            // In a real implementation, this would send data to a server
            // Here we'll just show a success message and reset the form
            submissionMessage.textContent = 'Thank you for your testimonial! It will be reviewed and may appear on our site soon.';
            submissionMessage.className = 'submission__message success';
            
            // Reset form
            testimonialForm.reset();
            ratingStars.forEach(s => {
                s.classList.remove('ri-star-fill', 'active');
                s.classList.add('ri-star-line');
            });
            ratingInput.value = 0;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                submissionMessage.style.display = 'none';
            }, 5000);
        });
    }, 100);
}

// BMI Calculator
function initializeBMICalculator() {
    // Create BMI calculator section inside the calculators container
    const calculatorSection = document.querySelector('.calculator__container');
    
    if (calculatorSection) {
        const bmiCalculator = document.createElement('div');
        bmiCalculator.className = 'bmi__calculator';
        
        bmiCalculator.innerHTML = `
            <h3>BMI Calculator</h3>
            <p>Check your Body Mass Index (BMI) to understand your body composition better.</p>
            
            <div class="calculator__tabs">
                <button class="tab__btn active" data-tab="metric">Metric</button>
                <button class="tab__btn" data-tab="imperial">Imperial</button>
            </div>
            
            <div class="tab__content metric active">
                <div class="form__group">
                    <label>Height (cm)</label>
                    <input type="number" id="height-cm" min="100" max="250" placeholder="e.g. 175">
                </div>
                
                <div class="form__group">
                    <label>Weight (kg)</label>
                    <input type="number" id="weight-kg" min="30" max="300" placeholder="e.g. 70">
                </div>
            </div>
            
            <div class="tab__content imperial">
                <div class="imperial__height">
                    <div class="form__group">
                        <label>Height (ft)</label>
                        <input type="number" id="height-ft" min="3" max="8" placeholder="e.g. 5">
                    </div>
                    
                    <div class="form__group">
                        <label>Height (in)</label>
                        <input type="number" id="height-in" min="0" max="11" placeholder="e.g. 10">
                    </div>
                </div>
                
                <div class="form__group">
                    <label>Weight (lbs)</label>
                    <input type="number" id="weight-lb" min="60" max="700" placeholder="e.g. 154">
                </div>
            </div>
            
            <button class="btn calculate__bmi">Calculate BMI</button>
            
            <div class="bmi__result">
                <div class="result__chart">
                    <div class="chart__bar">
                        <div class="chart__segment underweight" data-range="Underweight (<18.5)"></div>
                        <div class="chart__segment normal" data-range="Normal (18.5-24.9)"></div>
                        <div class="chart__segment overweight" data-range="Overweight (25-29.9)"></div>
                        <div class="chart__segment obese" data-range="Obese (≥30)"></div>
                        <div class="chart__indicator"></div>
                    </div>
                    <div class="chart__labels">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                    </div>
                </div>
                
                <div class="bmi__value">
                    <h4>Your BMI: <span id="bmi-value">--</span></h4>
                    <p id="bmi-category">Calculate your BMI</p>
                </div>
                
                <div class="bmi__info">
                    <p>This calculator provides a BMI estimation. For a more comprehensive assessment of your health, please consult with a healthcare professional.</p>
                </div>
            </div>
        `;
        
        // Add the BMI calculator after the membership calculator form
        calculatorSection.appendChild(bmiCalculator);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .bmi__calculator {
                background-color: var(--primary-color-light);
                border-radius: 15px;
                padding: 2rem;
                margin-top: 2rem;
            }
            
            .bmi__calculator h3 {
                color: var(--text-bright);
                margin-bottom: 0.5rem;
                font-size: 1.5rem;
            }
            
            .bmi__calculator > p {
                color: var(--text-light);
                margin-bottom: 1.5rem;
            }
            
            .calculator__tabs {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .tab__btn {
                padding: 0.8rem 1.5rem;
                background-color: var(--primary-color-extra-light);
                border: none;
                border-radius: 8px;
                color: var(--text-light);
                font-weight: 500;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .tab__btn.active {
                background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
                color: white;
            }
            
            .tab__content {
                display: none;
                margin-bottom: 1.5rem;
            }
            
            .tab__content.active {
                display: block;
            }
            
            .imperial__height {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .calculate__bmi {
                width: 100%;
                margin-bottom: 1.5rem;
            }
            
            .bmi__result {
                background-color: var(--primary-color-extra-light);
                border-radius: 8px;
                padding: 1.5rem;
            }
            
            .result__chart {
                margin-bottom: 1.5rem;
            }
            
            .chart__bar {
                position: relative;
                display: flex;
                height: 20px;
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            
            .chart__segment {
                height: 100%;
                position: relative;
            }
            
            .chart__segment::after {
                content: attr(data-range);
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.7rem;
                white-space: nowrap;
                color: var(--text-light);
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .chart__segment:hover::after {
                opacity: 1;
            }
            
            .chart__segment.underweight {
                background-color: #3498db;
                width: 20%;
            }
            
            .chart__segment.normal {
                background-color: #2ecc71;
                width: 30%;
            }
            
            .chart__segment.overweight {
                background-color: #f39c12;
                width: 25%;
            }
            
            .chart__segment.obese {
                background-color: #e74c3c;
                width: 25%;
            }
            
            .chart__indicator {
                position: absolute;
                top: 0;
                left: 0;
                width: 3px;
                height: 100%;
                background-color: white;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                transform: translateX(-100%);
                transition: transform 0.5s ease;
            }
            
            .chart__labels {
                display: flex;
                justify-content: space-between;
                font-size: 0.75rem;
                color: var(--text-light);
            }
            
            .bmi__value {
                text-align: center;
                margin-bottom: 1.5rem;
            }
            
            .bmi__value h4 {
                color: var(--text-bright);
                margin-bottom: 0.5rem;
                font-size: 1.2rem;
            }
            
            .bmi__value h4 span {
                font-size: 1.5rem;
                background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .bmi__info p {
                font-size: 0.9rem;
                color: var(--text-light);
                text-align: center;
            }
        `;
        document.head.appendChild(style);
        
        // BMI calculator functionality
        setTimeout(() => {
            const tabBtns = document.querySelectorAll('.tab__btn');
            const tabContents = document.querySelectorAll('.tab__content');
            const calculateBtn = document.querySelector('.calculate__bmi');
            const bmiValue = document.getElementById('bmi-value');
            const bmiCategory = document.getElementById('bmi-category');
            const chartIndicator = document.querySelector('.chart__indicator');
            
            // Tab switching
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    btn.classList.add('active');
                    document.querySelector(`.tab__content.${btn.dataset.tab}`).classList.add('active');
                });
            });
            
            // Calculate BMI
            calculateBtn.addEventListener('click', () => {
                let bmi;
                const activeTab = document.querySelector('.tab__btn.active').dataset.tab;
                
                if (activeTab === 'metric') {
                    const height = parseFloat(document.getElementById('height-cm').value) / 100; // convert to meters
                    const weight = parseFloat(document.getElementById('weight-kg').value);
                    
                    if (!height || !weight || height <= 0 || weight <= 0) {
                        alert('Please enter valid height and weight values.');
                        return;
                    }
                    
                    bmi = weight / (height * height);
                } else {
                    const heightFt = parseFloat(document.getElementById('height-ft').value) || 0;
                    const heightIn = parseFloat(document.getElementById('height-in').value) || 0;
                    const weightLb = parseFloat(document.getElementById('weight-lb').value);
                    
                    if (!heightFt || !weightLb || heightFt <= 0 || weightLb <= 0) {
                        alert('Please enter valid height and weight values.');
                        return;
                    }
                    
                    // Continuation of the BMI calculator function
                    // Convert to inches and calculate BMI using imperial formula
                    const totalHeightInches = (heightFt * 12) + heightIn;
                    bmi = (weightLb * 703) / (totalHeightInches * totalHeightInches);
                }
                
                // Display result
                bmiValue.textContent = bmi.toFixed(1);
                
                // Determine category and update indicator position
                let category, position;
                
                if (bmi < 18.5) {
                    category = 'Underweight';
                    position = (bmi / 18.5) * 20; // Position within the underweight segment (0-20%)
                } else if (bmi < 25) {
                    category = 'Normal weight';
                    position = 20 + ((bmi - 18.5) / 6.5) * 30; // Position within normal segment (20-50%)
                } else if (bmi < 30) {
                    category = 'Overweight';
                    position = 50 + ((bmi - 25) / 5) * 25; // Position within overweight segment (50-75%)
                } else {
                    category = 'Obese';
                    const maxBMI = 40; // Cap for visual purposes
                    const cappedBMI = Math.min(bmi, maxBMI);
                    position = 75 + ((cappedBMI - 30) / 10) * 25; // Position within obese segment (75-100%)
                }
                
                // Update UI
                bmiCategory.textContent = category;
                chartIndicator.style.transform = `translateX(${position}%)`;
                
                // Add animation effect
                const resultContainer = document.querySelector('.bmi__result');
                resultContainer.classList.add('result-updated');
                setTimeout(() => {
                    resultContainer.classList.remove('result-updated');
                }, 300);
            });
            
            // Add animation style
            const animStyle = document.createElement('style');
            animStyle.textContent = `
                @keyframes resultPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
                
                .result-updated {
                    animation: resultPulse 0.3s ease;
                }
            `;
            document.head.appendChild(animStyle);
        }, 100);
    }
}

// Countdown Timer for Special Promotion
function initializeCountdown() {
    // Create promotion countdown banner at the top of the page
    const header = document.querySelector('header');
    const promoBar = document.createElement('div');
    promoBar.className = 'promo__bar';
    
    // Set end date to 7 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    promoBar.innerHTML = `
        <div class="promo__container">
            <div class="promo__text">
                <span class="highlight">Spring Special:</span> 50% OFF Enrollment Fee - Limited Time Offer!
            </div>
            <div class="promo__countdown">
                <div class="countdown__item">
                    <span id="countdown-days">00</span>
                    <span>Days</span>
                </div>
                <div class="countdown__item">
                    <span id="countdown-hours">00</span>
                    <span>Hours</span>
                </div>
                <div class="countdown__item">
                    <span id="countdown-minutes">00</span>
                    <span>Minutes</span>
                </div>
                <div class="countdown__item">
                    <span id="countdown-seconds">00</span>
                    <span>Seconds</span>
                </div>
            </div>
            <a href="#plan" class="promo__btn">Claim Now</a>
            <span class="promo__close"><i class="ri-close-line"></i></span>
        </div>
    `;
    
    // Insert at the top of the page
    document.body.insertBefore(promoBar, document.body.firstChild);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .promo__bar {
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            padding: 0.8rem 0;
            position: relative;
            z-index: 100;
        }
        
        .promo__container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;
        }
        
        .promo__text {
            color: white;
        }
        
        .highlight {
            font-weight: 700;
            color: var(--accent-color);
        }
        
        .promo__countdown {
            display: flex;
            gap: 1rem;
        }
        
        .countdown__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
        }
        
        .countdown__item span:first-child {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--accent-color);
        }
        
        .countdown__item span:last-child {
            font-size: 0.7rem;
            text-transform: uppercase;
        }
        
        .promo__btn {
            background-color: var(--accent-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-weight: 500;
            text-decoration: none;
            transition: var(--transition);
        }
        
        .promo__btn:hover {
            background-color: white;
            color: var(--accent-color);
        }
        
        .promo__close {
            margin-left: 1rem;
            cursor: pointer;
            color: white;
            font-size: 1.2rem;
        }
        
        @media (width < 900px) {
            .promo__container {
                flex-wrap: wrap;
                gap: 0.5rem;
                justify-content: center;
                text-align: center;
            }
            
            .promo__countdown {
                width: 100%;
                justify-content: center;
            }
        }
        
        @media (width < 500px) {
            .countdown__item {
                font-size: 0.8rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Countdown functionality
    setTimeout(() => {
        const daysEl = document.getElementById('countdown-days');
        const hoursEl = document.getElementById('countdown-hours');
        const minutesEl = document.getElementById('countdown-minutes');
        const secondsEl = document.getElementById('countdown-seconds');
        const closeBtn = document.querySelector('.promo__close');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const timeDiff = endDate - now;
            
            if (timeDiff <= 0) {
                // Offer expired
                document.querySelector('.promo__bar').style.display = 'none';
                return;
            }
            
            // Calculate time units
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            // Update display with leading zeros
            daysEl.textContent = days < 10 ? `0${days}` : days;
            hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
            minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
            secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
        }
        
        // Initial update
        updateCountdown();
        
        // Update every second
        const countdownInterval = setInterval(updateCountdown, 1000);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            document.querySelector('.promo__bar').style.display = 'none';
            clearInterval(countdownInterval);
        });
    }, 100);
}

// Additional performance optimizations and final tweaks
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback with Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Smooth scrolling performance improvement
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add preconnect for external resources
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://source.unsplash.com';
    document.head.appendChild(preconnect);
    
    // Add favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff2e63' d='M21 12.5C21 9.46 18.54 7 15.5 7H13V12.5C13 13.88 11.88 15 10.5 15C9.12 15 8 13.88 8 12.5C8 11.12 9.12 10 10.5 10C10.67 10 10.84 10.03 11 10.08V7.03C10.84 7.01 10.67 7 10.5 7C7.46 7 5 9.46 5 12.5C5 15.54 7.46 18 10.5 18H15.5C18.54 18 21 15.54 21 12.5Z'/%3E%3C/svg%3E";
    document.head.appendChild(favicon);
    
    // Add meta description for SEO
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = "AT's Fitness - Your premium gym for personal training, group classes, and modern fitness facilities. Join our community and transform your life today.";
    document.head.appendChild(metaDescription);
    
    // Create cookie consent notification
    const cookieConsent = document.createElement('div');
    cookieConsent.className = 'cookie__consent';
    cookieConsent.innerHTML = `
        <div class="cookie__content">
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <div class="cookie__buttons">
                <button class="cookie__accept">Accept</button>
                <button class="cookie__settings">Cookie Settings</button>
            </div>
        </div>
    `;
    document.body.appendChild(cookieConsent);
    
    // Add cookie consent styles
    const cookieStyle = document.createElement('style');
    cookieStyle.textContent = `
        .cookie__consent {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: var(--primary-color);
            padding: 1rem 2rem;
            box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
        }
        
        .cookie__content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .cookie__content p {
            color: var(--text-light);
            margin: 0;
        }
        
        .cookie__buttons {
            display: flex;
            gap: 1rem;
        }
        
        .cookie__accept {
            background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
            color: white;
            border: none;
            padding: 0.5rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
        }
        
        .cookie__settings {
            background-color: transparent;
            border: 1px solid var(--text-light);
            color: var(--text-light);
            padding: 0.5rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
        }
        
        @media (width < 768px) {
            .cookie__content {
                flex-direction: column;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(cookieStyle);
    
    // Show cookie consent after 2 seconds if not accepted before
    setTimeout(() => {
        if (!localStorage.getItem('cookieConsent')) {
            document.querySelector('.cookie__consent').style.display = 'block';
        }
    }, 2000);
    
    // Cookie consent buttons
    document.querySelector('.cookie__accept').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        document.querySelector('.cookie__consent').style.display = 'none';
    });
    
    document.querySelector('.cookie__settings').addEventListener('click', () => {
        alert('Cookie settings functionality would be implemented here in a production environment.');
    });
    
    // Add back to top button
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="ri-arrow-up-s-line"></i>';
    document.body.appendChild(backToTop);
    
    // Add back to top styles
    const topButtonStyle = document.createElement('style');
    topButtonStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 99;
            box-shadow: 0 5px 15px rgba(255, 46, 99, 0.3);
        }
        
        .back-to-top.active {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(topButtonStyle);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Enhance accessibility
    const accessibilityStyles = document.createElement('style');
    accessibilityStyles.textContent = `
        /* High contrast focus styles */
        a:focus, button:focus, input:focus, select:focus, textarea:focus {
            outline: 3px solid var(--accent-color);
            outline-offset: 2px;
        }
        
        /* Skip to content link for keyboard users */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--accent-color);
            color: white;
            padding: 8px;
            z-index: 1001;
            transition: top 0.3s;
        }
        
        .skip-link:focus {
            top: 0;
        }
    `;
    document.head.appendChild(accessibilityStyles);
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to content';
    document.body.prepend(skipLink);
    
    // Add main id to main content for skip link
    document.querySelector('main') ? document.querySelector('main').id = 'main' : document.querySelector('header').nextElementSibling.id = 'main';
    
    // Add keyboard accessibility to navigation
    document.querySelectorAll('.nav__links a').forEach(link => {
        link.setAttribute('tabindex', '0');
    });
    
    // Print styles for better printing
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            nav, footer, .promo__bar, .back-to-top, .cookie__consent, .mobile__menu {
                display: none !important;
            }
            
            body {
                color: #000;
                background: #fff;
            }
            
            .section__container {
                padding: 1rem 0;
                page-break-inside: avoid;
            }
            
            a {
                text-decoration: underline;
                color: #000;
            }
            
            @page {
                margin: 2cm;
            }
        }
    `;
    document.head.appendChild(printStyles);
    
    // Now that all functionality is complete, trigger initialization
    // This could potentially replace the DOMContentLoaded event listener at the top
    // of your script, but we'll leave both for safety
    console.log('AT Fitness website fully initialized with enhanced features!');
});