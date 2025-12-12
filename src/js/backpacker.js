// Backpacker Page Functionality - Story Format
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoStories = document.getElementById('photoStories');
    
    // Helper function to safely encode image paths
    // Encodes spaces and special characters in filenames for proper URL handling
    function encodeImagePath(path) {
        if (!path) return '';
        // If path contains no spaces or special characters, return as-is
        // Only encode if necessary (spaces or special characters exist)
        if (path.indexOf(' ') === -1 && path.indexOf('%') === -1) {
            return path;
        }
        // Split the path into directory and filename for proper encoding
        const lastSlashIndex = path.lastIndexOf('/');
        if (lastSlashIndex === -1) {
            // No directory, just filename - encode only if needed
            return path.indexOf(' ') === -1 ? path : encodeURIComponent(path);
        }
        const directory = path.substring(0, lastSlashIndex + 1);
        const filename = path.substring(lastSlashIndex + 1);
        // Only encode filename if it contains spaces or special characters
        if (filename.indexOf(' ') === -1 && filename.indexOf('%') === -1) {
            return directory + filename;
        }
        // Encode directory with encodeURI (preserves /) and filename with encodeURIComponent (encodes spaces as %20)
        return encodeURI(directory) + encodeURIComponent(filename);
    }
    
    // Get story data from language file
    function getStoriesData() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const storiesData = translations[lang]?.backpacker?.stories || translations['en']?.backpacker?.stories || {};
        
        return {
            all: [
                // Stories with detail pages (storyId) first
                {
                    continent: 'europe',
                    storyId: 'kyiv-winter',
                    title: storiesData.kyivWinter?.title || 'Kyiv Winter',
                    subtitle: storiesData.kyivWinter?.subtitle || '',
                    description: storiesData.kyivWinter?.description || '',
                    images: [
                        'images/Travel/kyiv-winter/kiev street.jpeg',
                        'images/Travel/kyiv-winter/Kiev street1.jpeg',
                        'images/Travel/kyiv-winter/Kiev street2.jpeg',
                        'images/Travel/kyiv-winter/Kiev street3.jpeg',
                        'images/Travel/kyiv-winter/Kiev independence plaza main.jpeg',
                        'images/Travel/kyiv-winter/Kiev independence plaza.jpeg',
                        'images/Travel/kyiv-winter/Kiev independence plaza2.jpeg',
                        'images/Travel/kyiv-winter/Kiev main church.jpeg',
                        'images/Travel/kyiv-winter/Kiev Church.jpeg',
                        'images/Travel/kyiv-winter/Kiev central street.jpeg',
                        'images/Travel/kyiv-winter/Kiev art center.jpeg',
                        'images/Travel/kyiv-winter/Kiev art center2.jpeg',
                        'images/Travel/kyiv-winter/Kiev cultural.jpeg',
                        'images/Travel/kyiv-winter/Kiev underground metro1.jpeg',
                        'images/Travel/kyiv-winter/Kiev underground2.jpeg',
                        'images/Travel/kyiv-winter/Kiev underground3.jpeg'
                    ]
                },
                {
                    continent: 'americas',
                    storyId: 'central-america',
                    title: storiesData.centralAmerica?.title || 'Central America',
                    subtitle: storiesData.centralAmerica?.subtitle || '',
                    description: storiesData.centralAmerica?.description || '',
                    images: [
                        'images/Travel/central-america/guatemala-cover.jpg',
                        'images/Travel/central-america/MAP.jpeg',
                        'images/Travel/central-america/Mexico temple.jpeg',
                        'images/Travel/central-america/MEXICO OXAHAKA.jpeg',
                        'images/Travel/central-america/Guadalajra zocalo.jpg',
                        'images/Travel/central-america/Puebla1.jpeg',
                        'images/Travel/central-america/Puebla2.jpeg',
                        'images/Travel/central-america/Puebla3.jpeg',
                        'images/Travel/central-america/Puebla4.jpeg',
                        'images/Travel/central-america/Puebla5.jpeg',
                        'images/Travel/central-america/Puebla6.jpeg',
                        'images/Travel/central-america/guatemala  mexico border.jpeg',
                        'images/Travel/central-america/GUATEMALA BORDER WITH MEXICO.jpeg',
                        'images/Travel/central-america/GUATEMALA BORDER BUS.jpeg',
                        'images/Travel/central-america/night bus indian.jpeg',
                        'images/Travel/central-america/Guatemala bus station.jpeg',
                        'images/Travel/central-america/guatemala bus1.jpeg',
                        'images/Travel/central-america/GUATEMALA HOSTEL.jpeg',
                        'images/Travel/central-america/guatemala antigua city.jpeg',
                        'images/Travel/central-america/guatemala stree1.jpeg',
                        'images/Travel/central-america/guatemala-1.jpg',
                        'images/Travel/central-america/guatemala-2.jpg',
                        'images/Travel/central-america/Guatemala1.jpeg',
                        'images/Travel/central-america/Guatemala1.jpg',
                        'images/Travel/central-america/Guatemala3.jpeg',
                        'images/Travel/central-america/Guatemala4.jpeg',
                        'images/Travel/central-america/Solona1.jpeg',
                        'images/Travel/central-america/El savado 1.jpeg',
                        'images/Travel/central-america/El savado 2.jpeg',
                        'images/Travel/central-america/El savado 4.jpeg',
                        'images/Travel/central-america/el savado bus station.jpeg',
                        'images/Travel/central-america/honduras street.jpeg',
                        'images/Travel/central-america/beliz.jpeg',
                        'images/Travel/central-america/2017 Guatemala.jpeg',
                        'images/Travel/central-america/2017 Guatemala1.jpeg'
                    ]
                },
                {
                    continent: 'europe',
                    storyId: 'baltic-states',
                    title: storiesData.balticStates?.title || 'Baltic States',
                    subtitle: storiesData.balticStates?.subtitle || '',
                    description: storiesData.balticStates?.description || '',
                    images: [
                        'images/Travel/baltic-states/Estonia.jpeg',
                        'images/Travel/baltic-states/Estonia old town.jpeg',
                        'images/Travel/baltic-states/Estonia street.jpeg',
                        'images/Travel/baltic-states/Estonia street2.jpeg',
                        'images/Travel/baltic-states/Estonia street4.jpeg',
                        'images/Travel/baltic-states/Estonia streescape.jpeg',
                        'images/Travel/baltic-states/Estonia1.jpeg',
                        'images/Travel/baltic-states/Estonia3 grassland.jpeg',
                        'images/Travel/baltic-states/cec8aba025abbb2ce5619967ace20358.jpeg',
                        'images/Travel/baltic-states/Estoniamap.jpeg',
                        'images/Travel/baltic-states/Balticstatesregionsmap.png',
                        'images/Travel/baltic-states/from Estonia to Lithuania.jpeg',
                        'images/Travel/baltic-states/riga bus station.jpeg',
                        'images/Travel/baltic-states/riga central market.jpeg',
                        'images/Travel/baltic-states/riga central market 2.jpeg',
                        'images/Travel/baltic-states/riga central market3.jpeg',
                        'images/Travel/baltic-states/riga russian.jpeg',
                        'images/Travel/baltic-states/riga russian 1.jpeg',
                        'images/Travel/baltic-states/riga street.jpeg',
                        'images/Travel/baltic-states/riga2.jpeg',
                        'images/Travel/baltic-states/uzupio respublika1 Lithuania.jpeg',
                        'images/Travel/baltic-states/uzupio respublika2 Lithuania.jpeg',
                        'images/Travel/baltic-states/Lithuania.jpeg',
                        'images/Travel/baltic-states/Lithuania2.jpeg',
                        'images/Travel/baltic-states/Lithuania 10.jpeg',
                        'images/Travel/baltic-states/Lithuania8.jpeg',
                        'images/Travel/baltic-states/Lithuania main street.jpeg',
                        'images/Travel/baltic-states/Lithuania street.jpeg',
                        'images/Travel/baltic-states/lithuania church.jpeg',
                        'images/Travel/baltic-states/lithuania church2.jpeg',
                        'images/Travel/baltic-states/HOSTELlithuania.jpeg',
                        'images/Travel/baltic-states/street art mural in Vilnius.jpeg'
                    ]
                },
                {
                    continent: 'europe',
                    storyId: 'moldova-transnistria',
                    title: storiesData.moldovaTransnistria?.title || 'Moldova Transnistria',
                    subtitle: storiesData.moldovaTransnistria?.subtitle || '',
                    description: storiesData.moldovaTransnistria?.description || '',
                    images: [
                        'images/Travel/moldova-transnistria/Moldova market.JPG',
                        'images/Travel/moldova-transnistria/map.jpeg',
                        'images/Travel/moldova-transnistria/border card.jpg',
                        'images/Travel/moldova-transnistria/Moldva1.jpeg',
                        'images/Travel/moldova-transnistria/Moldva2.jpg',
                        'images/Travel/moldova-transnistria/moldova street.jpg',
                        'images/Travel/moldova-transnistria/Moldova street1.JPG',
                        'images/Travel/moldova-transnistria/Moldova street4.JPG',
                        'images/Travel/moldova-transnistria/Moldova market main.JPG',
                        'images/Travel/moldova-transnistria/Moldova merket2.JPG',
                        'images/Travel/moldova-transnistria/moldova undergound.png',
                        'images/Travel/moldova-transnistria/moldva underground entrance.jpeg',
                        'images/Travel/moldova-transnistria/transnistra checkpoint.jpeg',
                        'images/Travel/moldova-transnistria/transnistria checkpoint main.jpeg',
                        'images/Travel/moldova-transnistria/transnistra1.jpeg',
                        'images/Travel/moldova-transnistria/transnistra military sign.jpeg',
                        'images/Travel/moldova-transnistria/transnistra military sign1.jpeg',
                        'images/Travel/moldova-transnistria/transnistra market.jpeg'
                    ]
                },
                // Coming soon (no storyId) after
                {
                    continent: 'europe',
                    title: storiesData.balkan?.title || 'Balkan',
                    description: storiesData.balkan?.description || '',
                    images: [
                        'images/Travel/kosovo/kosovo-1.jpg',
                        'images/Travel/moldova-transnistria/moldova-1.jpg',
                        'images/Travel/kosovo/Kosovo.JPG'
                    ]
                },
                {
                    continent: 'asia',
                    title: storiesData.southeastAsia?.title || 'Southeast Asia',
                    description: storiesData.southeastAsia?.description || '',
                    images: [
                        'images/Travel/southeast-asia/South East  Asia.jpeg'
                    ]
                },
                {
                    continent: 'europe',
                    title: storiesData.turkey?.title || 'Turkey',
                    description: storiesData.turkey?.description || '',
                    images: [
                        'images/Travel/turkey/Turkey.jpeg'
                    ]
                }
            ],
            asia: [],
            africa: [],
            europe: [],
            americas: [],
            oceania: []
        };
    }
    
    let stories = getStoriesData();

    // Organize stories by continent
    stories.all.forEach(story => {
        if (stories[story.continent]) {
            stories[story.continent].push(story);
        }
    });

    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const continentParam = urlParams.get('continent');
    const storyParam = urlParams.get('story');
    let currentFilter = continentParam || 'all';

    // Function to convert kebab-case to camelCase
    function kebabToCamel(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    // Function to render story detail
    function renderStoryDetail(storyId) {
        if (!photoStories) return;
        
        // Find the story in stories.all to get images
        const story = stories.all.find(s => s.storyId === storyId || s.continent === storyId);
        if (!story) {
            photoStories.innerHTML = '<div style="text-align: center; padding: 4rem; color: #666;"><p>Story not found</p></div>';
            return;
        }
        
        // If story doesn't have storyId or content, show "Coming soon"
        if (!story.storyId) {
            const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
            const comingSoonText = translations[lang]?.backpacker?.comingSoon || translations['en'].backpacker.comingSoon || 'Coming soon...';
            photoStories.innerHTML = `
                <div class="story-detail-container" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
                    <div style="margin-bottom: 2rem;">
                        <a href="backpacker.html" style="color: #c00000; text-decoration: none; font-size: 0.9rem; margin-bottom: 2rem; display: inline-block;">← Back to Stories</a>
                    </div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: 300;">${story.title}</h1>
                    <div style="text-align: center; padding: 4rem; color: #666;">
                        <p style="font-size: 1.2rem;">${comingSoonText}</p>
                    </div>
                </div>
            `;
            return;
        }
        
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        // Convert kebab-case storyId to camelCase for translation key lookup
        const translationKey = kebabToCamel(storyId);
        const storyData = translations[lang]?.backpacker?.stories?.[translationKey] || translations['en'].backpacker.stories[translationKey];
        
        if (!storyData || !storyData.content) {
            const comingSoonText = translations[lang]?.backpacker?.comingSoon || translations['en'].backpacker.comingSoon || 'Coming soon...';
            photoStories.innerHTML = `
                <div class="story-detail-container" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
                    <div style="margin-bottom: 2rem;">
                        <a href="backpacker.html" style="color: #c00000; text-decoration: none; font-size: 0.9rem; margin-bottom: 2rem; display: inline-block;">← Back to Stories</a>
                    </div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: 300;">${story.title}</h1>
                    <div style="text-align: center; padding: 4rem; color: #666;">
                        <p style="font-size: 1.2rem;">${comingSoonText}</p>
                    </div>
                </div>
            `;
            return;
        }
        
        // Process content and insert images at placeholders [IMAGE:index] or [IMAGE:index1,index2] for side-by-side
        let processedContent = storyData.content || storyData.description;
        const imagePlaceholderRegex = /\[IMAGE:([\d,]+)\]/g;
        const usedImageIndices = new Set();
        
        // Replace video placeholders [VIDEO:path] with video elements
        const videoPlaceholderRegex = /\[VIDEO:([^\]]+)\]/g;
        processedContent = processedContent.replace(videoPlaceholderRegex, (match, videoPath) => {
            const trimmedPath = videoPath.trim();
            const encodedPath = encodeImagePath(trimmedPath);
            return `<div style="margin: 2rem 0; text-align: center;">
                <video autoplay muted loop playsinline preload="auto" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
                    <source src="${encodedPath}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>`;
        });
        
        // Replace image placeholders with actual images
        processedContent = processedContent.replace(imagePlaceholderRegex, (match, indices) => {
            const indexList = indices.split(',').map(idx => parseInt(idx.trim())).filter(idx => !isNaN(idx));
            const validImages = indexList
                .map(idx => story.images && story.images[idx] ? { index: idx, src: story.images[idx] } : null)
                .filter(img => img !== null);
            
            if (validImages.length === 0) return '';
            
            // Mark images as used
            validImages.forEach(img => usedImageIndices.add(img.index));
            
            // If single image, display normally
            if (validImages.length === 1) {
                const encodedSrc = encodeImagePath(validImages[0].src);
                return `<div style="margin: 2rem 0; text-align: center;">
                    <img src="${encodedSrc}" alt="${storyData.title}" loading="lazy" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                </div>`;
            }
            
            // If exactly 2 images, display side-by-side with larger size
            if (validImages.length === 2) {
                return `<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                    ${validImages.map(img => {
                        const encodedSrc = encodeImagePath(img.src);
                        return `
                        <div style="width: 100%; aspect-ratio: 3/2; overflow: hidden; border-radius: 10px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                            <img src="${encodedSrc}" alt="${storyData.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        </div>`;
                    }).join('')}
                </div>`;
            }
            
            // If multiple images (3+), display side-by-side with consistent height
            // Limit to max 3 images per row, ensure consistent height and spacing
            // Auto-wrap if more than 3 images
            return `<div style="margin: 2rem 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                ${validImages.map(img => {
                    const encodedSrc = encodeImagePath(img.src);
                    return `
                    <div style="width: 100%; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                        <img src="${encodedSrc}" alt="${storyData.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    </div>`;
                }).join('')}
            </div>`;
        });
        
        // Get unused images to display at the end (if any)
        const unusedImages = story.images ? story.images.filter((img, idx) => !usedImageIndices.has(idx)) : [];
        
        // Function to render unused images with smart layout
        // Optimized to avoid mixing landscape and portrait, and ensure consistent heights
        function renderUnusedImages(images) {
            if (images.length === 0) return '';
            
            // Remove duplicates
            const uniqueImages = [...new Set(images)];
            
            let html = '<div style="margin-top: 3rem;" class="unused-images-container">';
            
            // Use a simple grid layout that ensures consistent heights
            // All images in the same row will have the same height
            let i = 0;
            while (i < uniqueImages.length) {
                const remaining = uniqueImages.length - i;
                
                if (remaining >= 3) {
                    // Group of 3: ensure all have same height using aspect-ratio
                    html += `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                        ${uniqueImages.slice(i, i + 3).map(img => {
                            const encodedSrc = encodeImagePath(img);
                            return `
                            <div style="width: 100%; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; background: #f0f0f0;">
                                <img src="${encodedSrc}" alt="${storyData.title}" loading="lazy" 
                                     style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px;">
                            </div>`;
                        }).join('')}
                    </div>`;
                    i += 3;
                } else if (remaining === 2) {
                    // Two images: ensure same height with larger size
                    html += `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 1.5rem;">
                        ${uniqueImages.slice(i, i + 2).map(img => {
                            const encodedSrc = encodeImagePath(img);
                            return `
                            <div style="width: 100%; aspect-ratio: 3/2; overflow: hidden; border-radius: 10px; background: #f0f0f0;">
                                <img src="${encodedSrc}" alt="${storyData.title}" loading="lazy" 
                                     style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            </div>`;
                        }).join('')}
                    </div>`;
                    i += 2;
                } else {
                    // Single image: use consistent 4:3 aspect ratio
                    const encodedSrc = encodeImagePath(uniqueImages[i]);
                    html += `<div style="margin-bottom: 1.5rem; width: 100%; max-width: 800px; margin-left: auto; margin-right: auto;">
                        <div style="width: 100%; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; background: #f0f0f0;">
                            <img src="${encodedSrc}" alt="${storyData.title}" loading="lazy" 
                                 style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px;">
                        </div>
                    </div>`;
                    i += 1;
                }
            }
            
            html += '</div>';
            return html;
        }
        
        // Render detailed story view
        photoStories.innerHTML = `
            <div class="story-detail-container" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
                <div style="margin-bottom: 2rem;">
                    <a href="backpacker.html" style="color: #c00000; text-decoration: none; font-size: 0.9rem; margin-bottom: 2rem; display: inline-block;">← Back to Stories</a>
                </div>
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: 300;">${storyData.title}</h1>
                <div class="magazine" style="margin-top: 2rem;">
                    ${processedContent}
                </div>
                ${unusedImages.length > 0 ? renderUnusedImages(unusedImages) : ''}
            </div>
        `;
        
        // Trigger social share injection if not already present
        if (typeof window.socialShareInjector !== 'undefined') {
            setTimeout(() => {
                window.socialShareInjector();
            }, 100);
        }
        
        // Trigger Up Next injection if not already present
        if (typeof window.upNextInjector !== 'undefined') {
            setTimeout(() => {
                window.upNextInjector();
            }, 200);
        }
        
        // Trigger contact module injection if not already present
        if (typeof window.detailContactInjector !== 'undefined') {
            setTimeout(() => {
                window.detailContactInjector();
            }, 100);
        }
    }
    // Function to render stories
    function renderStories(continent) {
        if (!photoStories) return;

        const storiesToShow = continent === 'all' ? stories.all : stories[continent] || [];
        
        photoStories.innerHTML = '';
        
        if (storiesToShow.length === 0) {
            const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
            const comingSoonText = translations[lang]?.backpacker?.comingSoon || translations['en'].backpacker.comingSoon;
            const continentName = translations[lang]?.backpacker?.[continent] || continent.charAt(0).toUpperCase() + continent.slice(1);
            const displayText = comingSoonText.replace('{continent}', continentName);
            photoStories.innerHTML = `
                <div style="text-align: center; padding: 4rem; color: #666;">
                    <p style="font-size: 1.2rem;">${displayText}</p>
                </div>
            `;
            return;
        }

        storiesToShow.forEach((story, index) => {
            const featuredCard = document.createElement('div');
            featuredCard.className = 'featured-card';
            
            // Use only the first image as cover, or use placeholder if no image available
            const coverImage = story.images && story.images.length > 0 ? story.images[0] : '';
            const altText = `${story.title}`;
            const imageSrc = coverImage ? encodeImagePath(coverImage) : `https://via.placeholder.com/800x600?text=${encodeURIComponent(altText)}`;

            // Check if story has storyId (available) or not (coming soon)
            const hasStoryId = story.storyId;
            const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
            const comingSoonText = translations[lang]?.backpacker?.comingSoon || translations['en'].backpacker.comingSoon || 'Coming soon...';
            
            const overlayContent = hasStoryId 
                ? `<a href="backpacker.html?story=${story.storyId}" class="featured-link" data-i18n="home.featured.viewDetails">View Details</a>`
                : `<span class="featured-link" style="cursor: default; pointer-events: none; opacity: 0.7;">${comingSoonText}</span>`;
            
            featuredCard.innerHTML = `
                <div class="featured-image">
                    <img src="${imageSrc}" alt="${altText}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x600?text=${encodeURIComponent(altText)}'">
                    <div class="featured-overlay">
                        ${overlayContent}
                    </div>
                </div>
                <div class="featured-content">
                    <h3>${story.title}</h3>
                    ${story.subtitle ? `<p class="featured-subtitle">${story.subtitle}</p>` : ''}
                    <p>${story.description}</p>
                </div>
            `;
            
            photoStories.appendChild(featuredCard);

            // Animate in with intersection observer
            setTimeout(() => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                });
                
                observer.observe(featuredCard);
            }, index * 100);
        });
    }

    // Filter button handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get filter value
            const filter = this.dataset.continent;
            currentFilter = filter;

            // Update URL without reload
            const newUrl = filter === 'all' 
                ? 'backpacker.html' 
                : `backpacker.html?continent=${filter}`;
            window.history.pushState({}, '', newUrl);

            // Render stories
            renderStories(filter);
        });
    });

    // Set active filter based on URL
    if (continentParam) {
        filterButtons.forEach(btn => {
            if (btn.dataset.continent === continentParam) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Initial render - check if showing story detail or list
    if (storyParam) {
        renderStoryDetail(storyParam);
    } else {
        renderStories(currentFilter);
    }
    
    // Reload stories when language changes
    if (typeof LanguageManager !== 'undefined') {
        const originalSetLanguage = LanguageManager.setLanguage;
        LanguageManager.setLanguage = function(lang) {
            originalSetLanguage.call(this, lang);
            stories = getStoriesData();
            // Reorganize stories by continent
            ['asia', 'africa', 'europe', 'americas', 'oceania'].forEach(continent => {
                stories[continent] = [];
            });
            stories.all.forEach(story => {
                if (stories[story.continent]) {
                    stories[story.continent].push(story);
                }
            });
            
            // Check if we're on a detail page
            const urlParams = new URLSearchParams(window.location.search);
            const storyId = urlParams.get('story');
            if (storyId) {
                const story = stories.all.find(s => s.storyId === storyId);
                if (story) {
                    // Re-render story detail
                    renderStoryDetail(storyId);
                    // Update Up Next module
                    if (typeof window.upNextInjector !== 'undefined') {
                        setTimeout(() => {
                            const oldModule = document.getElementById('up-next-section');
                            if (oldModule) oldModule.remove();
                            window.upNextInjector();
                        }, 300);
                    }
                }
            } else {
                renderStories(currentFilter);
            }
        };
    }
});
