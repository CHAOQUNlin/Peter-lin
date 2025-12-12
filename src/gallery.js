// Home Page Functionality - New 6-Section Layout
document.addEventListener('DOMContentLoaded', function() {
    // 1. Hero Section Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrevBtn = document.getElementById('heroPrevBtn');
    const heroNextBtn = document.getElementById('heroNextBtn');
    const heroIndicators = document.querySelectorAll('.hero-indicator');
    let currentHeroSlide = 0;
    let heroAutoSlideInterval;

    if (heroSlides.length > 0) {
        function showHeroSlide(index) {
            // Pause all videos first
            heroSlides.forEach(slide => {
                slide.classList.remove('active');
                const video = slide.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
            heroIndicators.forEach(indicator => indicator.classList.remove('active'));

            if (heroSlides[index]) {
                heroSlides[index].classList.add('active');
                // Play video only for active slide
                const activeVideo = heroSlides[index].querySelector('video');
                if (activeVideo) {
                    activeVideo.play().catch(e => console.log('Video autoplay prevented:', e));
                }
            }
            if (heroIndicators[index]) {
                heroIndicators[index].classList.add('active');
            }

            currentHeroSlide = index;
        }

        function nextHeroSlide() {
            const next = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(next);
        }

        function prevHeroSlide() {
            const prev = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
            showHeroSlide(prev);
        }

        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                nextHeroSlide();
                resetHeroAutoSlide();
            });
        }

        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                prevHeroSlide();
                resetHeroAutoSlide();
            });
        }

        heroIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                showHeroSlide(index);
                resetHeroAutoSlide();
            });
        });

        // Click on title to navigate with animation
        const clickableTitles = document.querySelectorAll('.clickable-title');
        clickableTitles.forEach(title => {
            title.addEventListener('click', function(e) {
                e.stopPropagation();
                const project = this.dataset.project;
                if (project && project !== 'intro-video') {
                    // Add animation effect
                    gsap.to(this, {
                        x: 20,
                        opacity: 0.5,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: function() {
                            // Check if it's an art project
                            if (project === 'about-gaza' || project === 'phoenix-lab') {
                                window.location.href = 'art.html';
                            } else {
                                window.location.href = `project-detail.html?project=${project}`;
                            }
                        }
                    });
                }
            });
        });

        function startHeroAutoSlide() {
            heroAutoSlideInterval = setInterval(nextHeroSlide, 6000);
        }

        function resetHeroAutoSlide() {
            clearInterval(heroAutoSlideInterval);
            startHeroAutoSlide();
        }

        startHeroAutoSlide();
        
        // Initialize first video if it exists
        const firstSlide = heroSlides[0];
        if (firstSlide) {
            const firstVideo = firstSlide.querySelector('video');
            if (firstVideo) {
                firstVideo.play().catch(e => console.log('Video autoplay prevented:', e));
            }
        }

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', function() {
                clearInterval(heroAutoSlideInterval);
            });

            heroSection.addEventListener('mouseleave', function() {
                startHeroAutoSlide();
            });
        }
    }

    // Scroll animations for featured cards
    const featuredCards = document.querySelectorAll('.featured-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    featuredCards.forEach(card => {
        cardObserver.observe(card);
        
        // Handle video autoplay for featured cards
        const video = card.querySelector('.featured-image video');
        if (video) {
            // For About Gaza video, autoplay when in viewport
            if (card.dataset.project === 'about-gaza') {
                const videoObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(e => console.log('Video autoplay prevented:', e));
                        } else {
                            video.pause();
                        }
                    });
                }, {
                    threshold: 0.5
                });
                videoObserver.observe(card);
            } else {
                // For other videos, play on hover
                card.addEventListener('mouseenter', function() {
                    video.play().catch(e => console.log('Video play prevented:', e));
                });
                card.addEventListener('mouseleave', function() {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        }
    });

    // Scroll animations for story preview items
    const storyPreviewItems = document.querySelectorAll('.story-preview-item');
    const storyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                storyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    storyPreviewItems.forEach(item => {
        storyObserver.observe(item);
    });
});
