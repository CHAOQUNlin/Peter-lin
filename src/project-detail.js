// Project Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get project from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project') || 'hks-puzzle';

    // Get project data from language file
    function getProjectData(projectId) {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        
        // Check if it's an art piece
        if (projectId === 'about-gaza') {
            try {
                // Get translations with fallback - use direct access
                const defaultLang = 'en';
                const currentLangData = translations[lang] || translations[defaultLang];
                
                // Access art data
                const artData = (currentLangData && currentLangData.art) ? currentLangData.art : translations[defaultLang].art;
                
                // Access aboutGaza data
                const aboutGazaData = (artData && artData.aboutGaza) ? artData.aboutGaza : translations[defaultLang].art.aboutGaza;
                
                const title = (aboutGazaData && aboutGazaData.title) ? aboutGazaData.title : 'About Gaza';
                const fullContent = (aboutGazaData && aboutGazaData.fullContent) ? aboutGazaData.fullContent : null;
                const paragraphs = (fullContent && fullContent.paragraphs) ? fullContent.paragraphs : [];
                
                // Define About Gaza images array
                const aboutGazaImages = [
                    'images/Art/About Gaza/gaza1.jpg',
                    'images/Art/About Gaza/gaza2.mp4',
                    'images/Art/About Gaza/gaza3.jpg',
                    'images/Art/About Gaza/gaza4.jpg',
                    'images/Art/About Gaza/gaza5.jpg'
                ];
                
                if (paragraphs.length === 0) {
                    // Try direct access to English version
                    const enAboutGaza = translations['en'].art.aboutGaza;
                    if (enAboutGaza && enAboutGaza.fullContent && enAboutGaza.fullContent.paragraphs) {
                        const enParagraphs = enAboutGaza.fullContent.paragraphs;
                        const combinedContent = enParagraphs.join('\n\n');
                        return {
                            title: title,
                            heroImage: 'videos/about-gaza-video.mp4',
                            isVideo: true,
                            images: aboutGazaImages,
                            sections: [{
                                title: '',
                                content: combinedContent
                            }]
                        };
                    }
                }
                
                // Combine all paragraphs into a single section with line breaks
                const combinedContent = paragraphs.length > 0 ? paragraphs.join('\n\n') : 'Content is loading...';
                return {
                    title: title,
                    heroImage: 'videos/about-gaza-video.mp4',
                    isVideo: true,
                    images: aboutGazaImages,
                    sections: [{
                        title: '',
                        content: combinedContent
                    }]
                };
            } catch (error) {
                console.error('Error loading About Gaza data:', error);
                // Fallback to English
                try {
                    const enAboutGaza = translations['en'].art.aboutGaza;
                    if (enAboutGaza && enAboutGaza.fullContent && enAboutGaza.fullContent.paragraphs) {
                        const enParagraphs = enAboutGaza.fullContent.paragraphs;
                        const combinedContent = enParagraphs.join('\n\n');
                        // Define About Gaza images array for fallback
                        const aboutGazaImages = [
                            'images/Art/About Gaza/gaza1.jpg',
                            'images/Art/About Gaza/gaza2.mp4',
                            'images/Art/About Gaza/gaza3.jpg',
                            'images/Art/About Gaza/gaza4.jpg',
                            'images/Art/About Gaza/gaza5.jpg'
                        ];
                        return {
                            title: 'About Gaza',
                            heroImage: 'videos/about-gaza-video.mp4',
                            isVideo: true,
                            images: aboutGazaImages,
                            sections: [{
                                title: '',
                                content: combinedContent
                            }]
                        };
                    }
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError);
                }
                // Define About Gaza images array for error fallback
                const aboutGazaImages = [
                    'images/Art/About Gaza/gaza1.jpg',
                    'images/Art/About Gaza/gaza2.mp4',
                    'images/Art/About Gaza/gaza3.jpg',
                    'images/Art/About Gaza/gaza4.jpg',
                    'images/Art/About Gaza/gaza5.jpg'
                ];
                return {
                    title: 'About Gaza',
                    heroImage: 'videos/about-gaza-video.mp4',
                    isVideo: true,
                    images: aboutGazaImages,
                    sections: [{
                        title: '',
                        content: 'Error loading content.'
                    }]
                };
            }
        }
        
        // Regular project handling
        const projectKey = projectId === 'hks-puzzle' ? 'hksPuzzle' : 
                          projectId === 'kenya-locust' ? 'kenyaLocust' : 
                          projectId === 'mariupol-theater' ? 'mariupolTheater' :
                          projectId === 'eiffel-tower' ? 'eiffelTower' :
                          'argentinaMuseum';
        
        const title = translations[lang]?.project?.[projectKey]?.title || 
                     translations['en'].project[projectKey].title;
        const overview = translations[lang]?.project?.[projectKey]?.overview || 
                        translations['en'].project[projectKey].overview;
        const overviewTitle = translations[lang]?.project?.overview || 
                             translations['en'].project.overview;
        
        const heroImages = {
            'hks-puzzle': 'images/projects/hks-puzzle/hks-puzzle.png',
            'kenya-locust': 'videos/kenya-locust-video.mp4',
            'mariupol-theater': 'images/projects/mariupol-theater/mariupol-theater.jpg',
            'eiffel-tower': 'images/projects/Reimagining the Eiffel Tower/eiffel-tower.jpg',
            'argentina-museum': 'images/projects/argentina-museum/argentina-museum.jpg'
        };
        
        const heroVideos = {
            'kenya-locust': true
        };
        
        return {
            title: title,
            heroImage: heroImages[projectId] || heroImages['hks-puzzle'],
            isVideo: heroVideos[projectId] || false,
            sections: [
                {
                    title: overviewTitle,
                    content: overview
                }
            ]
        };
    }

    const project = getProjectData(projectId);
    
    // Debug: Log project data
    console.log('Project ID:', projectId);
    console.log('Project Data:', project);
    console.log('Is Video:', project.isVideo);
    console.log('Hero Image Path:', project.heroImage);
    
    // Set hero image or video
    const heroImage = document.getElementById('heroImage');
    const detailHero = document.getElementById('detailHero');
    
    console.log('Hero Image Element:', heroImage);
    console.log('Detail Hero Element:', detailHero);
    
    if (project.isVideo && detailHero) {
        // Replace img with video
        if (heroImage) {
            heroImage.remove();
        }
        
        // Clear any existing content in detailHero
        detailHero.innerHTML = '';
        
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.display = 'block';
        
        const source = document.createElement('source');
        source.src = project.heroImage;
        source.type = 'video/mp4';
        video.appendChild(source);
        
        // Add error handler
        video.addEventListener('error', function(e) {
            console.error('Video error:', e);
            console.error('Video error code:', video.error);
            console.error('Video src:', project.heroImage);
            // Show error message or fallback
            detailHero.innerHTML = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; color: #fff;">
                <p>Video failed to load: ${project.heroImage}</p>
            </div>`;
        });
        
        // Ensure video plays when loaded
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded, attempting to play');
            video.play().catch(function(error) {
                console.log('Autoplay prevented, trying to play:', error);
                // If autoplay fails, try again on user interaction
                document.addEventListener('click', function playVideo() {
                    video.play().catch(function(e) {
                        console.log('Video play failed:', e);
                    });
                    document.removeEventListener('click', playVideo);
                }, { once: true });
            });
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video can play, attempting to play');
            video.play().catch(function(error) {
                console.log('Video play error:', error);
            });
        });
        
        video.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded');
        });
        
        // Append video to DOM first
        detailHero.appendChild(video);
        console.log('Video appended to detailHero');
        
        // Try to load and play after video is in DOM
        setTimeout(function() {
            video.load();
            console.log('Video load() called');
            
            // Attempt to play after load
            setTimeout(function() {
                console.log('First play attempt');
                video.play().catch(function(error) {
                    console.log('First play attempt failed:', error);
                });
            }, 200);
        }, 50);
        
        // Also try after a longer delay
        setTimeout(function() {
            console.log('Second delayed play attempt');
            video.play().catch(function(error) {
                console.log('Second delayed play attempt failed:', error);
            });
        }, 1000);
    } else if (heroImage) {
        heroImage.src = project.heroImage;
        heroImage.alt = project.title;
        heroImage.onerror = function() {
            this.src = `https://via.placeholder.com/1920x1080?text=${encodeURIComponent(project.title)}`;
        };
    }

    // Set title
    const detailTitle = document.getElementById('detailTitle');
    if (detailTitle) {
        detailTitle.textContent = project.title;
    }

    // Create sections
    const detailSections = document.getElementById('detailSections');
    if (detailSections) {
        detailSections.innerHTML = '';
        
        project.sections.forEach((section, index) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'detail-section';
            const isAboutGaza = projectId === 'about-gaza';
            const shouldExpand = isAboutGaza || index === 0;
            // Process content to handle [IMAGE:X] and [VIDEO:path] markers
            function processContent(content) {
                if (!content) return 'Content not available';
                
                // Replace video placeholders [VIDEO:path] with video elements
                const videoPlaceholderRegex = /\[VIDEO:([^\]]+)\]/g;
                content = content.replace(videoPlaceholderRegex, (match, videoPath) => {
                    const trimmedPath = videoPath.trim();
                    return `<div style="margin: 2rem 0; text-align: center;">
                        <video autoplay muted loop playsinline preload="auto" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
                            <source src="${trimmedPath}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>`;
                });
                
                // Handle [IMAGE:X] markers for About Gaza project
                if (projectId === 'about-gaza' && project.images) {
                    const imagePlaceholderRegex = /\[IMAGE:([\d,]+)\]/g;
                    content = content.replace(imagePlaceholderRegex, (match, indices) => {
                        const indexList = indices.split(',').map(idx => parseInt(idx.trim())).filter(idx => !isNaN(idx));
                        const validImages = indexList
                            .map(idx => project.images && project.images[idx] ? { index: idx, src: project.images[idx] } : null)
                            .filter(img => img !== null);
                        
                        if (validImages.length === 0) return '';
                        
                        // If single image, display normally
                        if (validImages.length === 1) {
                            const img = validImages[0];
                            // Check if it's a video file
                            if (img.src.endsWith('.mp4')) {
                                return `<div style="margin: 2rem 0; text-align: center;">
                                    <video autoplay muted loop playsinline preload="auto" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
                                        <source src="${img.src}" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                </div>`;
                            } else {
                                return `<div style="margin: 2rem 0; text-align: center;">
                                    <img src="${img.src}" alt="${project.title}" loading="lazy" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                </div>`;
                            }
                        }
                        
                        // If exactly 2 images, display side-by-side
                        if (validImages.length === 2) {
                            return `<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                                ${validImages.map(img => {
                                    if (img.src.endsWith('.mp4')) {
                                        return `<div style="width: 100%; aspect-ratio: 3/2; overflow: hidden; border-radius: 10px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                                            <video autoplay muted loop playsinline preload="auto" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px;">
                                                <source src="${img.src}" type="video/mp4">
                                            </video>
                                        </div>`;
                                    } else {
                                        return `<div style="width: 100%; aspect-ratio: 3/2; overflow: hidden; border-radius: 10px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                                            <img src="${img.src}" alt="${project.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                        </div>`;
                                    }
                                }).join('')}
                            </div>`;
                        }
                        
                        // If multiple images (3+), display side-by-side with consistent height
                        return `<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(${validImages.length > 3 ? 3 : validImages.length}, 1fr); gap: 1.5rem;">
                            ${validImages.map(img => {
                                if (img.src.endsWith('.mp4')) {
                                    return `<div style="width: 100%; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                                        <video autoplay muted loop playsinline preload="auto" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px;">
                                            <source src="${img.src}" type="video/mp4">
                                        </video>
                                    </div>`;
                                } else {
                                    return `<div style="width: 100%; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                                        <img src="${img.src}" alt="${project.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                    </div>`;
                                }
                            }).join('')}
                        </div>`;
                    });
                }
                
                return content;
            }
            
            // For About Gaza, don't create section-header if no title
            if (!section.title) {
                // Process content and replace newlines with paragraph breaks for plain text parts
                let processedContent = processContent(section.content || 'Content not available');
                // Only split by double newlines if content doesn't contain HTML tags
                if (!processedContent.includes('<')) {
                    processedContent = processedContent.split('\n\n').map(p => p.trim()).filter(p => p).map(p => `<p>${p}</p>`).join('');
                }
                sectionElement.innerHTML = `
                    <div class="section-content no-header expanded">
                        ${processedContent}
                    </div>
                `;
            } else {
                let processedContent = processContent(section.content || 'Content not available');
                // Only wrap in <p> if content doesn't contain HTML tags
                if (!processedContent.includes('<')) {
                    processedContent = `<p>${processedContent}</p>`;
                }
                sectionElement.innerHTML = `
                    <div class="section-header" data-index="${index}">
                        <h2>${section.title}</h2>
                        <span class="section-toggle">▼</span>
                    </div>
                    <div class="section-content ${shouldExpand ? 'expanded' : ''}">
                        ${processedContent}
                    </div>
                `;
            }
            detailSections.appendChild(sectionElement);
        });

        // Add click handlers for expand/collapse (only for sections with headers)
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            const toggle = header.querySelector('.section-toggle');
            // Only add click handler if there's a toggle (meaning it has a title)
            if (toggle) {
                header.addEventListener('click', function() {
                    const index = this.dataset.index;
                    const content = this.nextElementSibling;

                    if (content.classList.contains('expanded')) {
                        content.classList.remove('expanded');
                        toggle.classList.remove('expanded');
                    } else {
                        // Close all other sections
                        document.querySelectorAll('.section-content').forEach(sec => {
                            sec.classList.remove('expanded');
                        });
                        document.querySelectorAll('.section-toggle').forEach(tog => {
                            tog.classList.remove('expanded');
                        });
                        // Open clicked section
                        content.classList.add('expanded');
                        toggle.classList.add('expanded');
                    }
                });
            }
        });
    }

    // Animate hero image or video on load
    const heroMedia = project.isVideo ? detailHero.querySelector('video') : heroImage;
    if (heroMedia) {
        gsap.from(heroMedia, {
            scale: 1.2,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    }

    // Animate title
    if (detailTitle) {
        gsap.from(detailTitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
        });
    }
    
    // Function to reload project content when language changes
    function reloadProjectContent() {
        const updatedProject = getProjectData(projectId);
        
        // Update title
        if (detailTitle) {
            detailTitle.textContent = updatedProject.title;
        }
        
        // Update sections
        if (detailSections) {
            detailSections.innerHTML = '';
            updatedProject.sections.forEach((section, index) => {
                const sectionElement = document.createElement('div');
                sectionElement.className = 'detail-section';
                const isAboutGaza = projectId === 'about-gaza';
                const shouldExpand = isAboutGaza || index === 0;
                // Process content to handle [IMAGE:X] and [VIDEO:path] markers
                function processContent(content) {
                    if (!content) return 'Content not available';
                    
                    // Replace video placeholders [VIDEO:path] with video elements
                    const videoPlaceholderRegex = /\[VIDEO:([^\]]+)\]/g;
                    content = content.replace(videoPlaceholderRegex, (match, videoPath) => {
                        const trimmedPath = videoPath.trim();
                        return `<div style="margin: 2rem 0; text-align: center;">
                            <video autoplay muted loop playsinline preload="auto" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
                                <source src="${trimmedPath}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>`;
                    });
                    
                    // Note: [IMAGE:X] markers are handled in backpacker.js for travel stories
                    // Project detail pages use direct <img> tags in the HTML content
                    
                    return content;
                }
                
                // For About Gaza, don't create section-header if no title
                if (!section.title) {
                    // Process content and replace newlines with paragraph breaks for plain text parts
                    let processedContent = processContent(section.content || 'Content not available');
                    // Only split by double newlines if content doesn't contain HTML tags
                    if (!processedContent.includes('<')) {
                        processedContent = processedContent.split('\n\n').map(p => p.trim()).filter(p => p).map(p => `<p>${p}</p>`).join('');
                    }
                    sectionElement.innerHTML = `
                        <div class="section-content no-header expanded">
                            ${processedContent}
                        </div>
                    `;
                } else {
                    let processedContent = processContent(section.content || 'Content not available');
                    // Only wrap in <p> if content doesn't contain HTML tags
                    if (!processedContent.includes('<')) {
                        processedContent = `<p>${processedContent}</p>`;
                    }
                    sectionElement.innerHTML = `
                        <div class="section-header" data-index="${index}">
                            <h2>${section.title}</h2>
                            <span class="section-toggle">▼</span>
                        </div>
                        <div class="section-content ${shouldExpand ? 'expanded' : ''}">
                            ${processedContent}
                        </div>
                    `;
                }
                detailSections.appendChild(sectionElement);
            });
            
            // Re-add click handlers (only for sections with headers)
            const sectionHeaders = document.querySelectorAll('.section-header');
            sectionHeaders.forEach(header => {
                const toggle = header.querySelector('.section-toggle');
                // Only add click handler if there's a toggle (meaning it has a title)
                if (toggle) {
                    header.addEventListener('click', function() {
                        const index = this.dataset.index;
                        const content = this.nextElementSibling;

                        if (content.classList.contains('expanded')) {
                            content.classList.remove('expanded');
                            toggle.classList.remove('expanded');
                        } else {
                            document.querySelectorAll('.section-content').forEach(sec => {
                                sec.classList.remove('expanded');
                            });
                            document.querySelectorAll('.section-toggle').forEach(tog => {
                                tog.classList.remove('expanded');
                            });
                            content.classList.add('expanded');
                            toggle.classList.add('expanded');
                        }
                    });
                }
            });
        }
    }
    
    // Listen for language changes
    if (typeof LanguageManager !== 'undefined') {
        const originalSetLanguage = LanguageManager.setLanguage;
        LanguageManager.setLanguage = function(lang) {
            originalSetLanguage.call(this, lang);
            reloadProjectContent();
            // Update Up Next module on language change
            if (typeof window.upNextInjector !== 'undefined') {
                setTimeout(() => {
                    const oldModule = document.getElementById('up-next-section');
                    if (oldModule) oldModule.remove();
                    window.upNextInjector();
                }, 300);
            }
        };
    }
    
    // Trigger Up Next injection after content loads
    setTimeout(() => {
        if (typeof window.upNextInjector !== 'undefined') {
            window.upNextInjector();
        }
    }, 500);
});

