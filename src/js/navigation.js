// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navBrand = document.getElementById('navBrand');
    const brandLink = document.getElementById('brandLink');
    const languageMenu = document.getElementById('languageMenu');
    const languageOptions = document.querySelectorAll('#languageMenu .dropdown-item');
    const designerDropdown = document.getElementById('designerDropdown');
    const backpackerDropdown = document.getElementById('backpackerDropdown');

    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLang');
    const savedName = localStorage.getItem('preferredName');
    if (savedName && brandLink) {
        brandLink.textContent = savedName.toUpperCase();
    }

    // Toggle language menu on click (for home page only)
    // Check if we're on the home/index page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('home.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/');
    
    // 所有页面都使用手风琴效果，不再区分桌面端和移动端
    // 手风琴效果在 initAccordion 中统一处理

    // Accordion functionality - 适用于所有尺寸（桌面端和移动端）
    let accordionInitialized = false;
    let closeAccordionFn = null; // 用于在语言选择时关闭手风琴
    
    function initAccordion() {
        if (!navBrand || !brandLink || !languageMenu || accordionInitialized) return;
        accordionInitialized = true;
        
        // Toggle accordion
        function toggleAccordion() {
            navBrand.classList.toggle('expanded');
            const isExpanded = navBrand.classList.contains('expanded');
            
            // 强制移除所有可能干扰的内联样式，让CSS完全控制
            if (isExpanded) {
                // 展开时，完全清除内联样式，让CSS的expanded状态控制
                languageMenu.style.removeProperty('opacity');
                languageMenu.style.removeProperty('visibility');
                languageMenu.style.removeProperty('transform');
                languageMenu.style.removeProperty('max-height');
                languageMenu.style.removeProperty('display');
            } else {
                // 收起时，恢复初始隐藏状态
                languageMenu.style.opacity = '0';
                languageMenu.style.visibility = 'hidden';
                // 移动端需要设置max-height为0
                if (window.innerWidth <= 800) {
                    languageMenu.style.maxHeight = '0';
                }
            }
            
            // Update ARIA attributes for accessibility
            brandLink.setAttribute('aria-expanded', isExpanded);
            languageMenu.setAttribute('aria-hidden', !isExpanded);
            
            // Focus management
            if (isExpanded) {
                // Focus first dropdown item when opened
                const firstItem = languageMenu.querySelector('.dropdown-item');
                if (firstItem) {
                    setTimeout(() => firstItem.focus(), 100);
                }
            }
        }
        
        // Close accordion
        function closeAccordion() {
            navBrand.classList.remove('expanded');
            brandLink.setAttribute('aria-expanded', 'false');
            languageMenu.setAttribute('aria-hidden', 'true');
            // 恢复内联样式以确保隐藏
            languageMenu.style.opacity = '0';
            languageMenu.style.visibility = 'hidden';
            // 移动端需要设置max-height为0
            if (window.innerWidth <= 800) {
                languageMenu.style.maxHeight = '0';
            }
            brandLink.focus(); // Return focus to brand button
        }
        
        // 保存 closeAccordion 函数供外部使用
        closeAccordionFn = closeAccordion;
        
        // Click handler for brand button - 适用于所有尺寸
        // 移除移动端限制，让桌面端也使用手风琴效果
        brandLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleAccordion();
        });
        
        // Keyboard navigation for brand button
        brandLink.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion();
            } else if (e.key === 'Escape' && navBrand.classList.contains('expanded')) {
                e.preventDefault();
                closeAccordion();
            }
        });
        
        // Keyboard navigation for dropdown items
        const dropdownItems = languageMenu.querySelectorAll('.dropdown-item');
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    closeAccordion();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = dropdownItems[index + 1] || dropdownItems[0];
                    nextItem.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = dropdownItems[index - 1] || dropdownItems[dropdownItems.length - 1];
                    prevItem.focus();
                }
            });
        });
        
        // Close when clicking outside
        function handleOutsideClick(e) {
            if (navBrand && !navBrand.contains(e.target) && navBrand.classList.contains('expanded')) {
                closeAccordion();
            }
        }
        document.addEventListener('click', handleOutsideClick);
        
        // Initialize ARIA attributes
        brandLink.setAttribute('aria-expanded', 'false');
        brandLink.setAttribute('aria-haspopup', 'true');
        brandLink.setAttribute('role', 'button');
        languageMenu.setAttribute('aria-hidden', 'true');
        languageMenu.setAttribute('role', 'menu');
        dropdownItems.forEach(item => {
            item.setAttribute('role', 'menuitem');
            item.setAttribute('tabindex', '-1');
        });
    }
    
    // Initialize accordion - 适用于所有尺寸
    initAccordion();
    
    // Handle language selection - 在手风琴初始化后处理
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            const name = this.dataset.name;
            
            // Save preference
            localStorage.setItem('preferredLang', lang);
            localStorage.setItem('preferredName', name);
            
            // Set language
            if (typeof LanguageManager !== 'undefined') {
                LanguageManager.setLanguage(lang);
            }
            
            // Update brand name
            if (brandLink) {
                brandLink.textContent = name.toUpperCase();
            }
            
            // Close accordion after language selection
            if (closeAccordionFn) {
                setTimeout(() => {
                    closeAccordionFn();
                }, 100);
            }
        });
    });
    
    // Legacy mobile dropdown handler (for compatibility)
    if (window.innerWidth <= 768) {
        // Keep existing code for other dropdowns if needed

        if (designerDropdown) {
            const designerLink = designerDropdown.querySelector('.nav-link');
            designerLink.addEventListener('click', function(e) {
                e.preventDefault();
                const menu = designerDropdown.querySelector('.dropdown-menu');
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            });
        }

        if (backpackerDropdown) {
            const backpackerLink = backpackerDropdown.querySelector('.nav-link');
            backpackerLink.addEventListener('click', function(e) {
                e.preventDefault();
                const menu = backpackerDropdown.querySelector('.dropdown-menu');
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            });
        }
    }
});

