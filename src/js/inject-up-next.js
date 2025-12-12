/**
 * Up Next Module Injector for Detail Pages
 * Injects "Up Next" recommendations at the bottom of all detail pages
 */

(function() {
    'use strict';
    
    // Check if current page is a detail page
    function isDetailPage() {
        const path = window.location.pathname;
        const hasProjectDetail = path.includes('project-detail.html') || 
                                document.querySelector('.project-detail-main') !== null;
        const hasBackpackerDetail = path.includes('backpacker.html') && 
                                   new URLSearchParams(window.location.search).has('story');
        
        return hasProjectDetail || hasBackpackerDetail;
    }
    
    // Get Up Next translations
    function getUpNextTranslations() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        return translations[lang]?.upNext || translations['en'].upNext || {
            title: 'Up Next',
            subtitle: 'Continue exploring'
        };
    }
    
    // Get all available projects for recommendations
    function getAllProjects() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const featuredData = translations[lang]?.featured || translations['en'].featured;
        const artData = translations[lang]?.art || translations['en'].art;
        
        return [
            { 
                id: 'hks-puzzle', 
                key: 'hksPuzzle', 
                title: featuredData?.hksPuzzle?.title || 'HK\'S Puzzle',
                description: featuredData?.hksPuzzle?.description || '',
                type: 'project',
                category: 'design'
            },
            { 
                id: 'kenya-locust', 
                key: 'kenyaLocust', 
                title: featuredData?.kenyaLocust?.title || 'Kenya Locust Outbreak',
                description: featuredData?.kenyaLocust?.description || '',
                type: 'project',
                category: 'design'
            },
            { 
                id: 'mariupol-theater', 
                key: 'mariupolTheater', 
                title: featuredData?.mariupolTheater?.title || 'Mariupol Drama Theater',
                description: featuredData?.mariupolTheater?.description || '',
                type: 'project',
                category: 'design'
            },
            { 
                id: 'eiffel-tower', 
                key: 'eiffelTower', 
                title: featuredData?.eiffelTower?.title || 'Reimagining the Eiffel Tower',
                description: featuredData?.eiffelTower?.description || '',
                type: 'project',
                category: 'design'
            },
            { 
                id: 'argentina-museum', 
                key: 'argentinaMuseum', 
                title: featuredData?.argentinaMuseum?.title || 'Argentina Museum of Immigrant',
                description: featuredData?.argentinaMuseum?.description || '',
                type: 'project',
                category: 'design'
            },
            { 
                id: 'about-gaza', 
                key: 'aboutGaza', 
                title: artData?.aboutGaza?.title || 'About Gaza',
                description: artData?.aboutGaza?.description || '',
                type: 'art',
                category: 'art'
            }
        ];
    }
    
    // Get all available stories for recommendations
    function getAllStories() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const storiesData = translations[lang]?.backpacker?.stories || translations['en'].backpacker.stories;
        
        // Get stories that have storyId (detail pages)
        const storiesWithDetails = [];
        
        // Kyiv Winter
        if (storiesData?.kyivWinter) {
            storiesWithDetails.push({
                id: 'kyiv-winter',
                storyId: 'kyiv-winter',
                title: storiesData.kyivWinter.title || 'Kyiv Winter',
                subtitle: storiesData.kyivWinter.subtitle || '',
                description: storiesData.kyivWinter.description || '',
                category: 'europe',
                continent: 'europe'
            });
        }
        
        // Central America
        if (storiesData?.centralAmerica) {
            storiesWithDetails.push({
                id: 'central-america',
                storyId: 'central-america',
                title: storiesData.centralAmerica.title || 'Central America',
                subtitle: storiesData.centralAmerica.subtitle || '',
                description: storiesData.centralAmerica.description || '',
                category: 'americas',
                continent: 'americas'
            });
        }
        
        // Baltic States
        if (storiesData?.balticStates) {
            storiesWithDetails.push({
                id: 'baltic-states',
                storyId: 'baltic-states',
                title: storiesData.balticStates.title || 'Baltic States',
                subtitle: storiesData.balticStates.subtitle || '',
                description: storiesData.balticStates.description || '',
                category: 'europe',
                continent: 'europe'
            });
        }
        
        // Moldova & Transnistria
        if (storiesData?.moldovaTransnistria) {
            storiesWithDetails.push({
                id: 'moldova-transnistria',
                storyId: 'moldova-transnistria',
                title: storiesData.moldovaTransnistria.title || 'Moldova & Transnistria',
                subtitle: storiesData.moldovaTransnistria.subtitle || '',
                description: storiesData.moldovaTransnistria.description || '',
                category: 'europe',
                continent: 'europe'
            });
        }
        
        return storiesWithDetails;
    }
    
    // Get recommendations based on current content
    function getRecommendations(currentId, contentType) {
        if (contentType === 'story') {
            // For stories, recommend other stories
            const allStories = getAllStories();
            const currentStory = allStories.find(s => s.storyId === currentId);
            const availableStories = allStories.filter(s => s.storyId !== currentId);
            
            // Try to match by category/continent first
            let recommendations = [];
            if (currentStory) {
                const sameCategory = availableStories.filter(s => s.category === currentStory.category || s.continent === currentStory.continent);
                if (sameCategory.length >= 3) {
                    recommendations = sameCategory.slice(0, 3);
                } else {
                    recommendations = sameCategory.concat(
                        availableStories.filter(s => s.category !== currentStory.category).slice(0, 3 - sameCategory.length)
                    ).slice(0, 3);
                }
            }
            
            // If not enough, add random ones
            if (recommendations.length < 3) {
                const remaining = availableStories.filter(s => !recommendations.find(r => r.storyId === s.storyId));
                const shuffled = remaining.sort(() => 0.5 - Math.random());
                recommendations = recommendations.concat(shuffled.slice(0, 3 - recommendations.length));
            }
            
            return recommendations.slice(0, 3).map(s => ({
                title: s.title,
                subtitle: s.subtitle || s.description || '',
                url: `backpacker.html?story=${s.storyId}`
            }));
        } else {
            // For projects, recommend other projects
            const allProjects = getAllProjects();
            const currentProject = allProjects.find(p => p.id === currentId);
            const availableProjects = allProjects.filter(p => p.id !== currentId);
            
            // Try to match by category first
            let recommendations = [];
            if (currentProject) {
                const sameCategory = availableProjects.filter(p => p.category === currentProject.category);
                if (sameCategory.length >= 3) {
                    recommendations = sameCategory.slice(0, 3);
                } else {
                    recommendations = sameCategory.concat(
                        availableProjects.filter(p => p.category !== currentProject.category).slice(0, 3 - sameCategory.length)
                    ).slice(0, 3);
                }
            }
            
            // If not enough, add random ones
            if (recommendations.length < 3) {
                const remaining = availableProjects.filter(p => !recommendations.find(r => r.id === p.id));
                const shuffled = remaining.sort(() => 0.5 - Math.random());
                recommendations = recommendations.concat(shuffled.slice(0, 3 - recommendations.length));
            }
            
            return recommendations.slice(0, 3).map(p => ({
                title: p.title,
                subtitle: p.description || '',
                url: `project-detail.html?project=${p.id}`
            }));
        }
    }
    
    // Create Up Next module HTML
    function createUpNextModule(recommendations) {
        const upNextData = getUpNextTranslations();
        
        if (recommendations.length === 0) {
            return '';
        }
        
        let html = `
            <div class="up-next-section" id="up-next-section">
                <div class="up-next-header">
                    <h2>${upNextData.title}</h2>
                </div>
                <div class="up-next-grid">
        `;
        
        recommendations.forEach(rec => {
            html += `
                <div class="up-next-item" onclick="window.location.href='${rec.url}'">
                    <div class="up-next-content">
                        <h3>${rec.title}</h3>
                        ${rec.subtitle ? `<p>${rec.subtitle}</p>` : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        return html;
    }
    
    // Inject Up Next module
    function injectUpNext() {
        // Check if already injected
        if (document.getElementById('up-next-section')) {
            return;
        }
        
        // Determine current content
        const path = window.location.pathname;
        const urlParams = new URLSearchParams(window.location.search);
        let currentId = null;
        let contentType = null;
        
        if (path.includes('project-detail.html')) {
            currentId = urlParams.get('project') || 'hks-puzzle';
            contentType = 'project';
        } else if (path.includes('backpacker.html')) {
            currentId = urlParams.get('story');
            contentType = 'story';
        }
        
        if (!currentId) {
            return;
        }
        
        // Get recommendations
        const recommendations = getRecommendations(currentId, contentType);
        
        if (recommendations.length === 0) {
            return;
        }
        
        // Create module HTML
        const moduleHTML = createUpNextModule(recommendations);
        
        if (!moduleHTML) {
            return;
        }
        
        // Find insertion point - after main element, before contact section
        let insertionPoint = null;
        let insertMethod = 'afterend'; // default insertion method
        
        // For project detail pages - insert after main element
        const projectMain = document.querySelector('main.project-detail-main');
        if (projectMain) {
            insertionPoint = projectMain;
            insertMethod = 'afterend';
        }
        
        // For backpacker detail pages - insert after main element
        if (!insertionPoint) {
            const backpackerMain = document.querySelector('main.home-main');
            if (backpackerMain) {
                insertionPoint = backpackerMain;
                insertMethod = 'afterend';
            }
        }
        
        // Fallback: find main element or insert before contact section
        if (!insertionPoint) {
            const mainElement = document.querySelector('main');
            if (mainElement) {
                insertionPoint = mainElement;
                insertMethod = 'afterend';
            } else {
                // Insert before contact section if exists
                const contactSection = document.querySelector('.detail-contact-section');
                if (contactSection) {
                    insertionPoint = contactSection;
                    insertMethod = 'beforebegin';
                } else {
                    // Last resort: insert at end of body
                    insertionPoint = document.body;
                    insertMethod = 'beforeend';
                }
            }
        }
        
        if (insertionPoint) {
            insertionPoint.insertAdjacentHTML(insertMethod, moduleHTML);
            
            // Adjust padding to align with detail page title
            const upNextSection = document.getElementById('up-next-section');
            if (upNextSection) {
                let targetPaddingLeft = '3rem'; // Default for project detail pages
                
                // Check if this is a backpacker detail page
                const storyDetailContainer = document.querySelector('.story-detail-container');
                if (storyDetailContainer) {
                    // Get the actual padding from inline style or computed style
                    const containerStyle = window.getComputedStyle(storyDetailContainer);
                    const paddingLeft = containerStyle.paddingLeft || '2rem';
                    targetPaddingLeft = paddingLeft;
                } else {
                    // For project detail pages, check detail-content padding
                    const detailContent = document.querySelector('.detail-content');
                    if (detailContent) {
                        const contentStyle = window.getComputedStyle(detailContent);
                        const paddingLeft = contentStyle.paddingLeft || '3rem';
                        targetPaddingLeft = paddingLeft;
                    }
                }
                
                // Apply the padding to align with title
                upNextSection.style.paddingLeft = targetPaddingLeft;
                
                // Adjust the vertical line position to align with text
                const paddingValue = parseFloat(targetPaddingLeft);
                const lineOffset = paddingValue - 0.5; // 0.5rem before text
                
                // Update the ::before pseudo-element position via dynamic style
                const styleId = 'up-next-dynamic-style';
                let dynamicStyle = document.getElementById(styleId);
                if (!dynamicStyle) {
                    dynamicStyle = document.createElement('style');
                    dynamicStyle.id = styleId;
                    document.head.appendChild(dynamicStyle);
                }
                // Calculate mobile padding (both types use 1.5rem on mobile based on CSS)
                const mobilePaddingLeft = '1.5rem';
                const mobilePaddingValue = parseFloat(mobilePaddingLeft);
                const mobileLineOffset = Math.max(0, mobilePaddingValue - 0.5);
                
                // Note: Vertical line is now on .up-next-header, not .up-next-section
                // The dynamic padding adjustment still applies to the section
                dynamicStyle.textContent = `
                    @media (max-width: 768px) {
                        #up-next-section {
                            padding-left: ${mobilePaddingLeft} !important;
                        }
                    }
                `;
            }
            
            // Animate with GSAP if available
            if (typeof gsap !== 'undefined' && upNextSection) {
                const items = upNextSection.querySelectorAll('.up-next-item');
                gsap.from(items, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: upNextSection,
                        start: 'top 85%'
                    }
                });
            }
        }
    }
    
    // Initialize
    function initUpNext() {
        if (!isDetailPage()) {
            return;
        }
        
        // Wait for content to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(injectUpNext, 500);
            });
        } else {
            setTimeout(injectUpNext, 500);
        }
        
        // For dynamic content (backpacker stories), use MutationObserver
        if (window.location.pathname.includes('backpacker.html')) {
            const observer = new MutationObserver(() => {
                if (!document.getElementById('up-next-section')) {
                    const storyDetailContainer = document.querySelector('.story-detail-container');
                    if (storyDetailContainer) {
                        setTimeout(injectUpNext, 300);
                    }
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            // Also try after a delay
            setTimeout(() => {
                if (!document.getElementById('up-next-section')) {
                    injectUpNext();
                }
            }, 1000);
        }
    }
    
    // Expose function for other scripts to call
    window.upNextInjector = function() {
        if (!document.getElementById('up-next-section')) {
            injectUpNext();
        }
    };
    
    // Initialize
    initUpNext();
    
    // Update on language change
    if (typeof LanguageManager !== 'undefined') {
        const originalSetLanguage = LanguageManager.setLanguage;
        LanguageManager.setLanguage = function(lang) {
            originalSetLanguage.call(this, lang);
            // Remove old module
            const oldModule = document.getElementById('up-next-section');
            if (oldModule) {
                oldModule.remove();
            }
            // Re-inject with new language
            setTimeout(injectUpNext, 300);
        };
    }
})();

