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

});
