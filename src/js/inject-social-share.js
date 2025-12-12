/**
 * Social Share Module Injector for Detail Pages
 * Injects social share buttons below page titles
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
    
    // Prevent duplicate injection
    if (!isDetailPage() || document.getElementById('social-share-detail')) {
        return;
    }
    
    // Create share link button SVG
    function getShareLinkIcon() {
        return `
            <svg class="social-share-detail-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
        `;
    }
    
    // Create Facebook icon SVG
    function getFacebookIcon() {
        return `
            <svg class="social-share-detail-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        `;
    }
    
    // Create Instagram icon SVG
    function getInstagramIcon() {
        return `
            <svg class="social-share-detail-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        `;
    }
    
    // Create X (Twitter) icon SVG
    function getXIcon() {
        return `
            <svg class="social-share-detail-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        `;
    }
    
    // Get current page URL and title for sharing
    function getShareData() {
        return {
            url: window.location.href,
            title: document.title || 'PETER LIN',
            text: document.querySelector('h1')?.textContent || document.title || ''
        };
    }
    
    // Copy link to clipboard
    function copyLinkToClipboard(url) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(() => {
                // Show temporary feedback
                const button = document.querySelector('[data-platform="link"]');
                if (button) {
                    const originalColor = button.style.color;
                    button.style.color = '#4CAF50';
                    setTimeout(() => {
                        button.style.color = originalColor || '';
                    }, 1000);
                }
            }).catch(() => {
                fallbackCopy(url);
            });
        } else {
            fallbackCopy(url);
        }
    }
    
    // Fallback copy method
    function fallbackCopy(url) {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            const button = document.querySelector('[data-platform="link"]');
            if (button) {
                const originalColor = button.style.color;
                button.style.color = '#4CAF50';
                setTimeout(() => {
                    button.style.color = originalColor || '';
                }, 1000);
            }
        } catch (err) {
            alert('Failed to copy link. Please copy manually: ' + url);
        } finally {
            document.body.removeChild(textarea);
        }
    }
    
    // Share on Facebook
    function shareOnFacebook(url) {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, 'facebook-share-dialog', 'width=626,height=436');
    }
    
    // Share on Instagram (note: Instagram doesn't support direct web sharing, opens in new tab)
    function shareOnInstagram(url) {
        // Instagram doesn't support web sharing API, so we'll open the URL
        // Users can copy the link manually
        copyLinkToClipboard(url);
    }
    
    // Share on X (Twitter)
    function shareOnX(url, title, text) {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text || title)}`;
        window.open(shareUrl, 'twitter-share-dialog', 'width=626,height=436');
    }
    
    // Create social share module HTML
    function createSocialShareModule() {
        const shareData = getShareData();
        
        return `
            <div class="social-share-detail" id="social-share-detail">
                <button class="social-share-detail-button" 
                        data-platform="link" 
                        aria-label="Copy link"
                        title="Copy link">
                    ${getShareLinkIcon()}
                </button>
                <a class="social-share-detail-button" 
                   data-platform="facebook" 
                   href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Share on Facebook"
                   title="Share on Facebook">
                    ${getFacebookIcon()}
                </a>
                <a class="social-share-detail-button" 
                   data-platform="instagram" 
                   href="${shareData.url}"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Share on Instagram"
                   title="Share on Instagram">
                    ${getInstagramIcon()}
                </a>
                <a class="social-share-detail-button" 
                   data-platform="x" 
                   href="https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text || shareData.title)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Share on X"
                   title="Share on X">
                    ${getXIcon()}
                </a>
            </div>
        `;
    }
    
    // Inject social share module below title
    function injectSocialShare() {
        // Find title element - try multiple selectors
        let titleElement = null;
        
        // For project detail pages
        titleElement = document.getElementById('detailTitle');
        
        // For backpacker detail pages
        if (!titleElement) {
            const storyDetailContainer = document.querySelector('.story-detail-container');
            if (storyDetailContainer) {
                titleElement = storyDetailContainer.querySelector('h1');
            }
        }
        
        if (!titleElement) {
            // Fallback: try to find any h1 in detail content
            const detailContent = document.querySelector('.detail-content');
            if (detailContent) {
                titleElement = detailContent.querySelector('h1');
            }
        }
        
        if (!titleElement) {
            return; // No title found, exit
        }
        
        // Check if already injected
        if (document.getElementById('social-share-detail')) {
            return;
        }
        
        // Create and inject social share module
        const socialShareHTML = createSocialShareModule();
        titleElement.insertAdjacentHTML('afterend', socialShareHTML);
        
        // Add event listeners
        const linkButton = document.querySelector('[data-platform="link"]');
        if (linkButton) {
            linkButton.addEventListener('click', (e) => {
                e.preventDefault();
                copyLinkToClipboard(getShareData().url);
            });
        }
        
        // Prevent default for Instagram (since it doesn't support sharing)
        const instagramButton = document.querySelector('[data-platform="instagram"]');
        if (instagramButton) {
            instagramButton.addEventListener('click', (e) => {
                e.preventDefault();
                copyLinkToClipboard(getShareData().url);
            });
        }
    }
    
    // Wait for DOM and content to be ready
    function initSocialShare() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Wait a bit for dynamic content to load
                setTimeout(injectSocialShare, 300);
            });
        } else {
            // For dynamic content (like backpacker stories)
            setTimeout(injectSocialShare, 300);
        }
        
        // Also listen for dynamic content updates (for backpacker.js)
        if (window.location.pathname.includes('backpacker.html')) {
            const observer = new MutationObserver(() => {
                if (!document.getElementById('social-share-detail')) {
                    const titleElement = document.querySelector('.story-detail-container h1');
                    if (titleElement) {
                        injectSocialShare();
                    }
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            // Also try after a delay
            setTimeout(() => {
                if (!document.getElementById('social-share-detail')) {
                    injectSocialShare();
                }
            }, 1000);
        }
    }
    
    // Initialize
    initSocialShare();
    
    // Expose injector function for backpacker.js to call
    window.socialShareInjector = function() {
        if (!document.getElementById('social-share-detail')) {
            injectSocialShare();
        }
    };
})();









