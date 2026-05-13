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
