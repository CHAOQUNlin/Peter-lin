/**
 * Detail Contact Module Injector
 * Injects black full-width contact section to all detail pages
 */

(function() {
    'use strict';
    
    // Check if current page is a detail page
    function isDetailPage() {
        const path = window.location.pathname;
        const isProjectDetail = path.includes('project-detail.html') || 
                                document.querySelector('.project-detail-main') !== null;
        const isBackpackerDetail = path.includes('backpacker.html') && 
                                   new URLSearchParams(window.location.search).has('story');
        
        return isProjectDetail || isBackpackerDetail;
    }
    
    // Prevent duplicate injection
    if (document.getElementById('detail-contact-section') || !isDetailPage()) {
        return;
    }
    
    // Get contact text from translations
    function getContactText() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const contactData = translations[lang]?.contact || translations['en'].contact;
        return contactData?.homeIntro || 'If you\'d like to reach out, collaborate, or simply exchange ideas, I\'m here.\n\nTogether, perhaps we can form a small island of meaning amid the noise.';
    }
    
    // Get contact title from translations
    function getContactTitle() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const navData = translations[lang]?.nav || translations['en'].nav;
        return navData?.contact || 'CONTACT';
    }
    
    // Create email modal HTML
    function createEmailModal() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const homePageData = translations[lang]?.homePage?.modal || translations['en'].homePage?.modal || {};
        
        const modalTitle = homePageData.title || 'EMAIL CONTACT';
        const copyText = homePageData.copy || 'Copy Email';
        const openMailText = homePageData.openMail || 'Open Email App';
        const closeText = homePageData.close || 'Close';
        const emailAddress = 'boutros@myyahoo.com';
        
        return `
            <div class="detail-contact-email-modal" id="detail-contact-email-modal">
                <div class="detail-contact-email-content">
                    <h3>${modalTitle}</h3>
                    <p class="detail-contact-email-address">${emailAddress}</p>
                    <div class="detail-contact-modal-actions">
                        <button class="detail-contact-modal-action-btn detail-contact-copy-email-btn" type="button" data-email="${emailAddress}">${copyText}</button>
                        <button class="detail-contact-modal-action-btn detail-contact-modal-mail-btn" type="button">${openMailText}</button>
                    </div>
                    <button class="detail-contact-modal-close-btn" type="button">${closeText}</button>
                </div>
            </div>
        `;
    }
    
    // Create social icons HTML (same order as index.html)
    function createSocialIcons() {
        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
        const socialData = translations[lang]?.social || translations['en'].social || {};
        
        // Icon order: Email, Instagram, Behance, WeChat, GitHub, OnlyFans
        const icons = [
            {
                type: 'email',
                href: '#',
                ariaLabel: socialData.email || 'Email',
                className: 'detail-contact-email-trigger',
                svg: '<path fill="currentColor" d="M6 14h36a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2zm0 2v.4l18 11 18-11V16H6zm36 18V19.7L24 30 6 19.7V34h36z"/>',
                viewBox: '0 0 48 48'
            },
            {
                type: 'instagram',
                href: 'https://www.instagram.com/',
                ariaLabel: socialData.instagram || 'Instagram',
                className: '',
                svg: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M15 11c-3.3 0-6 2.7-6 6v14c0 3.3 2.7 6 6 6h18c3.3 0 6-2.7 6-6V17c0-3.3-2.7-6-6-6H15Zm0 3h18c1.7 0 3 1.3 3 3v14c0 1.7-1.3 3-3 3H15c-1.7 0-3-1.3-3-3V17c0-1.7 1.3-3 3-3Zm9 4.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm11.5-4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>',
                viewBox: '0 0 48 48',
                width: '24',
                height: '24'
            },
            {
                type: 'behance',
                href: 'https://www.behance.net/pedrolam',
                ariaLabel: socialData.behance || 'Behance',
                className: '',
                svg: '<path fill="currentColor" d="M12 14h11.5c5 0 8.8 2.9 8.8 7.1 0 2.6-1.4 4.7-3.7 5.9 3.2 1 5.5 3.9 5.5 7.4 0 5.1-4.1 8.6-9.7 8.6H12V14Zm10.5 11.1c2 0 3.6-1.2 3.6-3s-1.6-3-3.6-3H16v6h6.5Zm1.3 12.8c2.3 0 4.1-1.5 4.1-3.6 0-2.1-1.8-3.5-4.1-3.5H16v7.1h7.8Z"></path><path fill="currentColor" d="M34 18h10v3.5H34z"></path><path fill="currentColor" d="M34 24h7.2c4.5 0 8.8 3.3 8.8 8.4S45.7 41 41.2 41H34V24Zm7.3 12c1.8 0 3.1-1.4 3.1-3.4s-1.3-3.4-3.1-3.4h-3.3v6.8h3.3Z"></path>',
                viewBox: '0 0 48 48',
                width: '24',
                height: '24'
            },
            {
                type: 'wechat',
                href: 'https://wechat.com',
                ariaLabel: socialData.wechat || 'WeChat',
                className: '',
                svg: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M30 12c-7.5 0-13.5 4.8-13.5 10.8 0 3.2 1.7 6 4.5 8l-1.2 4.1 4.3-2.7c1.8.5 3.6.8 5.9.8 7.5 0 13.5-4.8 13.5-10.8S37.5 12 30 12ZM24 18.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M17.7 26.8c-6.8 0-12.2 4.3-12.2 9.8 0 2.8 1.3 5.3 3.7 7.1l-.9 3.1 4.1-2.4c1.7.4 3.3.6 5 .6 6.8 0 12.2-4.3 12.2-9.8s-5.4-8.4-12.2-8.4ZM13.2 33.7a1.8 1.8 0 1 0 0 3.7 1.8 1.8 0 0 0 0-3.7Zm7 0a1.8 1.8 0 1 0 0 3.7 1.8 1.8 0 0 0 0-3.7Z"></path>',
                viewBox: '0 0 48 48',
                width: '24',
                height: '24'
            },
            {
                type: 'github',
                href: 'https://github.com/CHAOQUNlin/Peter-lin',
                ariaLabel: socialData.github || 'GitHub',
                className: '',
                svg: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M24 7c-8.8 0-16 7.3-16 16.2 0 7.2 4.6 13.3 10.9 15.5.8.2 1.1-.3 1.1-.8v-3.4c-3.7.8-4.5-1.8-4.5-1.8-.7-1.7-1.6-2.2-1.6-2.2-1.3-.9.1-.9.1-.9 1.5.1 2.4 1.6 2.4 1.6 1.3 2.3 3.4 1.6 4.2 1.2.1-.9.5-1.6.9-2-3.3-.4-6.7-1.7-6.7-7.2 0-1.6.5-2.9 1.5-3.9-.2-.4-.7-1.9.1-3.9 0 0 1.3-.4 4.2 1.6 1.2-.3 2.4-.4 3.6-.4s2.4.1 3.6.4c3-2 4.2-1.6 4.2-1.6.8 2 .3 3.5.1 3.9 1 .9 1.5 2.3 1.5 3.9 0 5.5-3.4 6.8-6.7 7.2.5.5.9 1.4.9 2.9v4.2c0 .5.3 1 1.1.8C35.4 36.5 40 30.4 40 23.2 40 14.3 32.8 7 24 7Z"></path>',
                viewBox: '0 0 48 48',
                width: '24',
                height: '24'
            },
            {
                type: 'onlyfans',
                href: 'https://onlyfans.com/peterlin',
                ariaLabel: socialData.onlyfans || 'OnlyFans',
                className: '',
                dataHaram: 'true',
                svg: '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M24 10c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14Zm0 4.2c5.4 0 9.8 4.6 9.8 10.3 0 .5 0 1-.1 1.5h4.5v4.4h-7.2c-1.8 2.5-4.6 4.1-7.4 4.1-5.4 0-9.8-4.6-9.8-10.3s4.4-10 9.8-10Zm-.2 6.8c-2.8 0-5 2.3-5 5.1s2.2 5.1 5 5.1 5-2.3 5-5.1-2.2-5.1-5-5.1Zm11.5-4.4-7.6 9.5h4.6c.3-.6.5-1.6.5-2.4 0-2.8-1-5.2-2.5-7.1Z"></path>',
                viewBox: '0 0 48 48',
                width: '24',
                height: '24'
            }
        ];
        
        return icons.map(icon => {
            const svgAttrs = icon.width ? `viewBox="${icon.viewBox}" width="${icon.width}" height="${icon.height}"` : `viewBox="${icon.viewBox}"`;
            const dataAttrs = icon.dataHaram ? 'data-haram="true"' : '';
            const relAttrs = icon.href !== '#' ? 'target="_blank" rel="noopener noreferrer"' : '';
            
            return `
                <a class="detail-contact-icon-link ${icon.className}" href="${icon.href}" ${relAttrs} aria-label="${icon.ariaLabel}" ${dataAttrs}>
                    <svg class="detail-contact-icon" ${svgAttrs} aria-hidden="true" focusable="false">
                        ${icon.svg}
                    </svg>
                </a>
            `;
        }).join('');
    }
    
    // Create contact section HTML
    function createContactSection() {
        const title = getContactTitle();
        const intro = getContactText();
        const icons = createSocialIcons();
        
        return `
            <section class="detail-contact-section" id="detail-contact-section">
                <div class="detail-contact-container">
                    <h2 class="detail-contact-title">${title}</h2>
                    <p class="detail-contact-intro">${intro}</p>
                    <div class="detail-contact-icons">
                        ${icons}
                    </div>
                </div>
            </section>
            ${createEmailModal()}
        `;
    }
    
    // Initialize email modal functionality
    function initEmailModal() {
        const emailTrigger = document.querySelector('.detail-contact-email-trigger');
        const emailModal = document.getElementById('detail-contact-email-modal');
        const copyButton = document.querySelector('.detail-contact-copy-email-btn');
        const closeButton = document.querySelector('.detail-contact-modal-close-btn');
        const mailButton = document.querySelector('.detail-contact-modal-mail-btn');
        const emailAddress = copyButton?.dataset.email || 'boutros@myyahoo.com';
        
        if (!emailTrigger || !emailModal || !copyButton) {
            return;
        }
        
        const openModal = () => {
            emailModal.classList.add('open');
        };
        
        const closeModal = () => {
            emailModal.classList.remove('open');
        };
        
        emailTrigger.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
        
        copyButton.addEventListener('click', () => {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(emailAddress)
                    .then(() => {
                        const originalText = copyButton.textContent;
                        copyButton.textContent = 'Copied!';
                        setTimeout(() => {
                            copyButton.textContent = originalText;
                        }, 2000);
                    })
                    .catch(() => {
                        // Fallback for older browsers
                        const textarea = document.createElement('textarea');
                        textarea.value = emailAddress;
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                            document.execCommand('copy');
                            const originalText = copyButton.textContent;
                            copyButton.textContent = 'Copied!';
                            setTimeout(() => {
                                copyButton.textContent = originalText;
                            }, 2000);
                        } catch (err) {
                            alert(`Please copy manually: ${emailAddress}`);
                        } finally {
                            document.body.removeChild(textarea);
                        }
                    });
            }
        });
        
        mailButton?.addEventListener('click', () => {
            window.location.href = `mailto:${emailAddress}`;
        });
        
        closeButton?.addEventListener('click', closeModal);
        emailModal.addEventListener('click', (event) => {
            if (event.target === emailModal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && emailModal.classList.contains('open')) {
                closeModal();
            }
        });
    }
    
    // Handle haram links (OnlyFans)
    function initHaramLinks() {
        document.querySelectorAll('[data-haram="true"]').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                alert('Haram!');
            });
        });
    }
    
    // Inject contact section
    function injectContactSection() {
        // Check if already injected
        if (document.getElementById('detail-contact-section')) {
            return;
        }
        
        // Always insert at the very end of body (before closing body tag)
        // This ensures contact module is always at the bottom of the page
        const body = document.body;
        body.insertAdjacentHTML('beforeend', createContactSection());
        
        // Initialize functionality
        initEmailModal();
        initHaramLinks();
        
        // Update on language change
        if (typeof LanguageManager !== 'undefined') {
            const originalSetLanguage = LanguageManager.setLanguage;
            LanguageManager.setLanguage = function(lang) {
                originalSetLanguage.call(this, lang);
                // Update contact section content
                const section = document.getElementById('detail-contact-section');
                if (section) {
                    const titleEl = section.querySelector('.detail-contact-title');
                    const introEl = section.querySelector('.detail-contact-intro');
                    if (titleEl) titleEl.textContent = getContactTitle();
                    if (introEl) introEl.textContent = getContactText();
                    
                    // Update modal text
                    const modal = document.getElementById('detail-contact-email-modal');
                    if (modal) {
                        const lang = typeof LanguageManager !== 'undefined' ? LanguageManager.currentLang : 'en';
                        const homePageData = translations[lang]?.homePage?.modal || translations['en'].homePage?.modal || {};
                        const modalTitle = modal.querySelector('h3');
                        const copyBtn = modal.querySelector('.detail-contact-copy-email-btn');
                        const mailBtn = modal.querySelector('.detail-contact-modal-mail-btn');
                        const closeBtn = modal.querySelector('.detail-contact-modal-close-btn');
                        if (modalTitle) modalTitle.textContent = homePageData.title || 'EMAIL CONTACT';
                        if (copyBtn) copyBtn.textContent = homePageData.copy || 'Copy Email';
                        if (mailBtn) mailBtn.textContent = homePageData.openMail || 'Open Email App';
                        if (closeBtn) closeBtn.textContent = homePageData.close || 'Close';
                    }
                }
            };
        }
    }
    
    // Try to inject immediately
    function tryInject() {
        if (isDetailPage() && !document.getElementById('detail-contact-section')) {
            // For backpacker detail pages, wait a bit for dynamic content
            const storyDetailContainer = document.querySelector('.story-detail-container');
            if (storyDetailContainer || !window.location.pathname.includes('backpacker.html') || !new URLSearchParams(window.location.search).has('story')) {
                injectContactSection();
            } else {
                // Retry for backpacker detail pages (dynamic content)
                setTimeout(() => {
                    if (!document.getElementById('detail-contact-section')) {
                        injectContactSection();
                    }
                }, 500);
            }
        }
    }
    
    // Expose injector function globally for backpacker.js to call
    window.detailContactInjector = function() {
        if (isDetailPage() && !document.getElementById('detail-contact-section')) {
            injectContactSection();
        }
    };
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInject);
    } else {
        tryInject();
    }
    
    // Also listen for dynamic content updates (for backpacker.js)
    if (window.location.pathname.includes('backpacker.html')) {
        // Use MutationObserver to detect when story-detail-container is added
        const observer = new MutationObserver(() => {
            if (!document.getElementById('detail-contact-section') && 
                document.querySelector('.story-detail-container') && 
                new URLSearchParams(window.location.search).has('story')) {
                injectContactSection();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Also try after a delay for backpacker detail pages
        if (new URLSearchParams(window.location.search).has('story')) {
            setTimeout(() => {
                if (!document.getElementById('detail-contact-section')) {
                    injectContactSection();
                }
            }, 1000);
        }
    }
})();

