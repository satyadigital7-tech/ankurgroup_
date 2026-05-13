document.addEventListener('DOMContentLoaded', () => {

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i]?.classList.remove('active');
        });
        
        slides[index].classList.add('active');
        dots[index]?.classList.add('active');
    }

    const nextBtn = document.querySelector('.next-slide');
    const prevBtn = document.querySelector('.prev-slide');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });

    // Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            accordionItems.forEach(acc => acc.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
        });
    });

    // Tabs
    const tabs = document.querySelectorAll('.tab');
    const projectCards = document.querySelectorAll('.projects-carousel .project-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const targetCategory = tab.dataset.target;
            
            projectCards.forEach(card => {
                if (card.dataset.category === targetCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Simple auto-play for hero slider
    if (slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Signature Developments Dynamic Slider
    const sigPrev = document.querySelector('.sig-prev');
    const sigNext = document.querySelector('.sig-next');
    const sigImg = document.querySelector('.sig-main-img');
    const sigTitle = document.querySelector('.sig-title');
    const sigDesc = document.querySelector('.sig-desc');
    const sigLink = document.querySelector('.sig-link');

    const signatureDevelopments = [
        {
            image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=2000",
            title: "Ankur Group Atmosphere",
            desc: "Luxury residences with life-enriching amenities designed by the Best in the World.",
            link: "Residential.html"
        },
        {
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
            title: "EON Free Zone",
            desc: "State-of-the-art special economic zones and IT business parks.",
            link: "Office Parks.html"
        },
        {
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000",
            title: "The Ritz-Carlton, Pune",
            desc: "World-class luxury hospitality service redefined in the heart of Pune.",
            link: "Hospitality.html"
        },
        {
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000",
            title: "Equinix Ankur Group DC",
            desc: "Premium, hyper-scalable green data centers built to support digital infrastructure.",
            link: "Data Centres.html"
        }
    ];

    let currentSig = 0;

    function updateSigDevelopment(index) {
        if (!sigImg || !sigTitle || !sigDesc || !sigLink) return;
        
        sigImg.style.opacity = 0;
        sigTitle.style.opacity = 0;
        sigDesc.style.opacity = 0;
        sigLink.style.opacity = 0;
        
        setTimeout(() => {
            const dev = signatureDevelopments[index];
            sigImg.src = dev.image;
            sigTitle.textContent = dev.title;
            sigDesc.textContent = dev.desc;
            sigLink.href = dev.link;
            
            sigImg.style.opacity = 1;
            sigTitle.style.opacity = 1;
            sigDesc.style.opacity = 1;
            sigLink.style.opacity = 1;
        }, 350);
    }

    if (sigPrev && sigNext) {
        if (sigImg) sigImg.style.transition = "opacity 0.4s ease";
        if (sigTitle) sigTitle.style.transition = "opacity 0.4s ease";
        if (sigDesc) sigDesc.style.transition = "opacity 0.4s ease";
        if (sigLink) sigLink.style.transition = "opacity 0.4s ease";

        sigPrev.addEventListener('click', () => {
            currentSig = (currentSig - 1 + signatureDevelopments.length) % signatureDevelopments.length;
            updateSigDevelopment(currentSig);
        });

        sigNext.addEventListener('click', () => {
            currentSig = (currentSig + 1) % signatureDevelopments.length;
            updateSigDevelopment(currentSig);
        });
    }

    // Preloader and Page Transitions
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // match CSS transition duration
        }
    });

    // Intercept link clicks for page out transition
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            // If it's not a hash link and not opening in new tab
            if (target && target !== '#' && !target.startsWith('#') && this.target !== '_blank') {
                e.preventDefault();
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.display = 'flex';
                    // Force reflow
                    preloader.offsetHeight;
                    preloader.classList.remove('fade-out');
                    setTimeout(() => {
                        window.location.href = target;
                    }, 500); // Wait for fade in animation
                } else {
                    window.location.href = target;
                }
            }
        });
    });

    // Hamburger Menu Mobile Toggle
    const menuToggle = document.querySelector('.nav-right');
    const menuToggleIcon = document.querySelector('.nav-right i');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon between bars and close X
            if (navLinks.classList.contains('active')) {
                menuToggleIcon.classList.remove('fa-bars');
                menuToggleIcon.classList.add('fa-xmark');
            } else {
                menuToggleIcon.classList.remove('fa-xmark');
                menuToggleIcon.classList.add('fa-bars');
            }
        });
    }

    // Luxury Scroll Reveal System
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    // Dynamic attachment to all premium grids, sections, and structural cards
    const targetsToReveal = document.querySelectorAll(
        '.section-padding, .project-card, .leader-card, .project-list-item, .vm-card, .stat-item, .about-preview, .stats-strip, .services-grid .service-card, .res-hero-stats'
    );
    
    targetsToReveal.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Luxury Project Modal Functionality
    const projectModal = document.getElementById('project-modal');
    const viewProjectBtns = document.querySelectorAll('.project-list-item .proj-actions a:first-child');
    const modalCloseBtn = document.querySelector('#project-modal .modal-close');
    
    const projectDetails = {
        // Residential
        "87 AVENUE": {
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
            desc: "Collaborating with global wellness visionary design houses and landscape architects, 87 Avenue is a testament to the transformative power of premium homes. Nestled in Pune's ultra-premium Koregaon Park, it represents a standard of luxury living without compromise, boasting massive, state-of-the-art facilities.",
            config: "4.5 & 5.5 BHK Residences",
            status: "Under Construction",
            loc: "Koregaon Park, Pune",
            arch: "Kelly Hoppen Interiors",
            thumbs: [
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "TRUMP TOWERS PUNE": {
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
            desc: "Designed to deliver the highest international standards of luxury, style, and status, Trump Towers Pune consists of two exquisite towers standing 22 stories tall. Enjoy breathtaking 360-degree views of Pune city, exclusive custom concierge services, and custom luxury amenities designed by the finest design houses.",
            config: "5 BHK Condominiums",
            status: "Ready to Move-In",
            loc: "Kalyani Nagar, Pune",
            arch: "Studio HBA (Singapore)",
            thumbs: [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "YOO VILLAS": {
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
            desc: "yoo villas is India's first branded villa enclave, offering ultra-luxurious private spaces built for unmatched tranquility. Designed in collaboration with international designer Kelly Hoppen, these beautiful villas exhibit fluid boundaries, high ceiling spacing, and organic materials.",
            config: "4 & 5 BHK Luxury Villas",
            status: "Ready to Move-In",
            loc: "Kharadi, Pune",
            arch: "YOO Design / Kelly Hoppen",
            thumbs: [
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=200"
            ]
        },
        // Office Parks
        "BUSINESS BAY": {
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
            desc: "A premium corporate park offering world-class office spaces with cutting-edge amenities, designed to elevate your business environment, hosting multinational headquarters in a premium central location.",
            config: "Grade-A Commercial Space",
            status: "Ready to Move-In",
            loc: "Airport Road, Pune",
            arch: "DP Architects, Singapore",
            thumbs: [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "ANKUR GROUP BUSINESS PARK (ABP)": {
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
            desc: "An iconic IT/ITeS SEZ campus offering scalable and flexible workspaces for IT and technology giants with pristine workspace systems, recreation decks, and extensive food courts.",
            config: "IT/ITeS SEZ Workspaces",
            status: "Under Construction",
            loc: "Baner, Pune",
            arch: "Studio Symbiosis",
            thumbs: [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "TECH PARK ONE": {
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
            desc: "Tech Park One is a state-of-the-art corporate destination designed to meet the demands of global technology corporations, featuring high efficiency office layouts and absolute tech integration.",
            config: "Custom Built-to-Suit Offices",
            status: "Ready to Occupy",
            loc: "Yerwada, Pune",
            arch: "HOK Architects",
            thumbs: [
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "EON FREE ZONE II": {
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
            desc: "A globally renowned, architectural marvel tech hub featuring modern workspaces, gold-rated green features, and vibrant collaborative zones.",
            config: "IT/ITeS SEZ",
            status: "Ready to Occupy",
            loc: "Kharadi, Pune",
            arch: "DP Architects, Singapore",
            thumbs: [
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=200"
            ]
        },
        // Hospitality
        "THE RITZ-CARLTON, PUNE": {
            image: "https://images.unsplash.com/photo-1542314831-c6a4d14eff8c?auto=format&fit=crop&q=80&w=1200",
            desc: "A symphony of classic luxury and timeless elegance. Elevating the hospitality landscape of Pune with its unparalleled personalized service, award-winning specialty dining, high-end fitness clubs, and sophisticated accommodations.",
            config: "198 Rooms & Suites",
            status: "Operational",
            loc: "Airport Road, Pune",
            arch: "NDA Design Studio",
            thumbs: [
                "https://images.unsplash.com/photo-1542314831-c6a4d14eff8c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "JW MARRIOTT, PUNE": {
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
            desc: "An iconic destination in Pune offering refined luxury, award-winning restaurants, world-class luxury spa, and Pune's most versatile, state-of-the-art event spaces for business and leisure travelers alike.",
            config: "415 Rooms & Suites",
            status: "Operational",
            loc: "S.B. Road, Pune",
            arch: "WATG (USA)",
            thumbs: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1542314831-c6a4d14eff8c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "ANKUR GROUP ATMOSPHERE (MALDIVES)": {
            image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200",
            desc: "An ultra-luxury overwater resort offering absolute privacy, white sandy beaches, and breathtaking ocean views, crafted for the ultimate exclusive getaway in the Maldives.",
            config: "Luxury Villas",
            status: "Operational",
            loc: "Malé Atoll, Maldives",
            arch: "ECO.ID Architects",
            thumbs: [
                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "MARRIOTT SUITES, PUNE": {
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
            desc: "Marriott Suites Pune is the city's premier all-suite luxury hotel, offering elegant living spaces, pet-friendly facilities, and curated services for extended stays.",
            config: "109 Executive Suites",
            status: "Operational",
            loc: "Koregaon Park, Pune",
            arch: "P&T Group, Hong Kong",
            thumbs: [
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "COURTYARD BY MARRIOTT": {
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
            desc: "A perfect blend of comfort and convenience for the smart business traveler, featuring contemporary guest rooms, high-speed connectivity, and modern meeting facilities.",
            config: "153 Rooms & Suites",
            status: "Operational",
            loc: "Chinchwad, Pune",
            arch: "Hirsch Bedner Associates",
            thumbs: [
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1542314831-c6a4d14eff8c?auto=format&fit=crop&q=80&w=200"
            ]
        },
        // Retail & Mall
        "THE PAVILLION, PUNE": {
            image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=1200",
            desc: "A premium shopping and entertainment destination offering an unparalleled mix of high-street fashion, flagship stores, fine dining restaurants, and family entertainment experiences in the heart of Pune.",
            config: "Retail, F&B & Cinema Multiplex",
            status: "Operational",
            loc: "S.B. Road, Pune",
            arch: "CallisonRTKL",
            thumbs: [
                "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1567345484835-5157baafdd2c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1576402431718-2e0618ffbb59?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "SGS MALL": {
            image: "https://images.unsplash.com/photo-1567345484835-5157baafdd2c?auto=format&fit=crop&q=80&w=1200",
            desc: "One of Pune’s most vibrant and popular shopping destinations in the Cantonment area, known for its eclectic mix of global brands, fashion apparel, and lively atmosphere.",
            config: "Bespoke Shopping Hub",
            status: "Operational",
            loc: "Camp, Pune",
            arch: "Architect Hafeez Contractor",
            thumbs: [
                "https://images.unsplash.com/photo-1567345484835-5157baafdd2c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1576402431718-2e0618ffbb59?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "ICC TRADE TOWER RETAIL": {
            image: "https://images.unsplash.com/photo-1576402431718-2e0618ffbb59?auto=format&fit=crop&q=80&w=1200",
            desc: "Premium high-street retail spaces strategically located at the base of the prestigious ICC Trade Tower, offering unmatched visibility and footfall.",
            config: "Showrooms & High-Street Retail",
            status: "Operational",
            loc: "S.B. Road, Pune",
            arch: "DP Architects",
            thumbs: [
                "https://images.unsplash.com/photo-1576402431718-2e0618ffbb59?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "CITRUS / F&B SPACES": {
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200",
            desc: "Curated culinary destinations and upscale dining experiences designed to cater to the diverse palates of modern urbanites and professionals.",
            config: "Dining & F&B Hubs",
            status: "Operational",
            loc: "Multiple Locations, Pune",
            arch: "Bespoke Local Designers",
            thumbs: [
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1567345484835-5157baafdd2c?auto=format&fit=crop&q=80&w=200"
            ]
        },
        // Data Centres
        "EQUINIX ANKUR GROUP DC - (BOM1)": {
            image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=1200",
            desc: "A highly advanced and secure data centre facility designed to support the growing digital needs of global enterprises with superior uptime, absolute physical and cybersecurity systems, and dense connectivity.",
            config: "Tier-IV Data Centre",
            status: "Operational",
            loc: "Mumbai",
            arch: "Equinix Global Infrastructure Team",
            thumbs: [
                "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "EQUINIX ANKUR GROUP DC - (BOM2)": {
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
            desc: "Expanding the digital footprint with a next-generation data centre built for scale, sustainability, and unparalleled operational excellence with high-efficiency direct expansion cooling.",
            config: "Tier-IV Data Centre Hub",
            status: "Under Development",
            loc: "Mumbai",
            arch: "Equinix Global Design Standards",
            thumbs: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "NTT DATA AIDC DC - PUNE": {
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
            desc: "A colossal campus dedicated to IT and data services, featuring robust infrastructure and massive scalability for hyperscalers, running on 100% green energy options.",
            config: "Hyperscale Campus",
            status: "Under Development",
            loc: "Pune",
            arch: "NTT DATA Global Architects",
            thumbs: [
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200"
            ]
        },
        // International Projects
        "ANKUR GROUP TOWERS, LONDON": {
            image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
            desc: "Super-tall luxury residential high-rise situated in prime Central London, offering state-of-the-art residences, modern automated penthouses, and classic British skyline views.",
            config: "Super-Premium Residences",
            status: "Ready to Move-In",
            loc: "Central London, UK",
            arch: "Foster + Partners",
            thumbs: [
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "ATMOSPHERE, MALDIVES": {
            image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200",
            desc: "An ultra-luxury overwater resort offering absolute privacy, white sandy beaches, and breathtaking ocean views, crafted for the ultimate exclusive getaway in the Maldives.",
            config: "Luxury Villas",
            status: "Operational",
            loc: "Malé Atoll, Maldives",
            arch: "ECO.ID Architects",
            thumbs: [
                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=200"
            ]
        },
        "DUBAI SKYLINE PLAZA": {
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200",
            desc: "Modern luxury apartments and office spaces located next to downtown Dubai, featuring state-of-the-art temperature control systems, sky pools, and absolute architectural superiority.",
            config: "Ultra-Luxury Condos",
            status: "Ready to Occupy",
            loc: "Downtown Dubai, UAE",
            arch: "Zaha Hadid Architects",
            thumbs: [
                "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=200"
            ]
        }
    };

    if (projectModal && viewProjectBtns.length > 0) {
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectItem = btn.closest('.project-list-item');
                if (!projectItem) return;
                
                const titleEl = projectItem.querySelector('.proj-title');
                const projectTitle = titleEl ? titleEl.textContent.trim().toUpperCase() : '';
                
                const data = projectDetails[projectTitle];
                if (data) {
                    document.getElementById('modal-img').src = data.image;
                    document.getElementById('modal-title').textContent = projectTitle;
                    document.getElementById('modal-desc').textContent = data.desc;
                    document.getElementById('modal-spec-config').textContent = data.config;
                    document.getElementById('modal-spec-status').textContent = data.status;
                    document.getElementById('modal-spec-loc').textContent = data.loc;
                    document.getElementById('modal-spec-arch').textContent = data.arch;
                    
                    const thumbElements = document.querySelectorAll('#project-modal .gallery-thumbs .thumb');
                    thumbElements.forEach((thumb, i) => {
                        if (data.thumbs && data.thumbs[i]) {
                            thumb.style.display = 'block';
                            thumb.src = data.thumbs[i];
                            thumb.classList.remove('active');
                            if (i === 0) thumb.classList.add('active');
                            
                            thumb.onclick = () => {
                                thumbElements.forEach(t => t.classList.remove('active'));
                                thumb.classList.add('active');
                                document.getElementById('modal-img').src = data.thumbs[i].replace('&w=200', '&w=1200');
                            };
                        } else {
                            thumb.style.display = 'none';
                        }
                    });

                    projectModal.style.display = 'flex';
                    projectModal.offsetHeight;
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeModal = () => {
            projectModal.classList.remove('active');
            setTimeout(() => {
                projectModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 400);
        };

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    }

});
