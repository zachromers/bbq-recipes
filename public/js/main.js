/**
 * BBQ Recipes - Frontend JavaScript
 *
 * Handles mobile menu, dropdowns, and other interactive features
 */

(function() {
    'use strict';

    /**
     * Mobile Menu Toggle
     * Handles the hamburger menu for mobile navigation
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');

        if (!menuToggle || !mainNav) return;

        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuToggle.focus();
            }
        });
    }

    /**
     * Dropdown Menu Toggle
     * Handles dropdown menus in mobile view
     */
    function initDropdowns() {
        const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

        dropdownItems.forEach(function(item) {
            const link = item.querySelector('.nav-link');

            // On mobile, toggle dropdown on click
            link.addEventListener('click', function(event) {
                // Only prevent default on mobile
                if (window.innerWidth < 1024) {
                    event.preventDefault();
                    item.classList.toggle('open');

                    // Close other dropdowns
                    dropdownItems.forEach(function(otherItem) {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                        }
                    });
                }
            });
        });

        // Close dropdowns when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth < 1024) {
                const isClickInside = Array.from(dropdownItems).some(function(item) {
                    return item.contains(event.target);
                });

                if (!isClickInside) {
                    dropdownItems.forEach(function(item) {
                        item.classList.remove('open');
                    });
                }
            }
        });
    }

    /**
     * Ingredient Checkbox Persistence
     * Saves checked ingredients to localStorage
     */
    function initIngredientCheckboxes() {
        const ingredientCheckboxes = document.querySelectorAll('.ingredient-checkbox input[type="checkbox"]');

        if (ingredientCheckboxes.length === 0) return;

        // Get recipe slug from URL for storage key
        const pathParts = window.location.pathname.split('/');
        const recipeSlug = pathParts[pathParts.length - 1];
        const storageKey = 'bbq-recipe-' + recipeSlug;

        // Load saved state
        const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');

        ingredientCheckboxes.forEach(function(checkbox, index) {
            // Restore saved state
            if (savedState[index]) {
                checkbox.checked = true;
            }

            // Save state on change
            checkbox.addEventListener('change', function() {
                const currentState = JSON.parse(localStorage.getItem(storageKey) || '{}');
                currentState[index] = checkbox.checked;
                localStorage.setItem(storageKey, JSON.stringify(currentState));
            });
        });

        // Add clear all button functionality if it exists
        const clearButton = document.querySelector('.clear-ingredients');
        if (clearButton) {
            clearButton.addEventListener('click', function() {
                ingredientCheckboxes.forEach(function(checkbox) {
                    checkbox.checked = false;
                });
                localStorage.removeItem(storageKey);
            });
        }
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Search Form Enhancement
     * Prevents empty searches
     */
    function initSearchForm() {
        const searchForms = document.querySelectorAll('.search-form, .search-form-large');

        searchForms.forEach(function(form) {
            form.addEventListener('submit', function(event) {
                const input = form.querySelector('input[type="search"], input[name="q"]');
                if (input && !input.value.trim()) {
                    event.preventDefault();
                    input.focus();
                }
            });
        });
    }

    /**
     * Lazy Load Images
     * Uses Intersection Observer for lazy loading
     */
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Print Recipe Enhancement
     * Unchecks all ingredients before printing for a clean checklist
     */
    function initPrintButton() {
        const printButtons = document.querySelectorAll('.print-btn');

        printButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Uncheck all ingredients for a fresh checklist
                document.querySelectorAll('.ingredient-checkbox input[type="checkbox"]').forEach(function(checkbox) {
                    checkbox.checked = false;
                });
            });
        });
    }

    /**
     * Handle Window Resize
     * Resets mobile menu state when resizing to desktop
     */
    function initResizeHandler() {
        let resizeTimer;

        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 1024) {
                    // Reset mobile menu state
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    const mainNav = document.querySelector('.main-nav');

                    if (menuToggle && mainNav) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                        menuToggle.classList.remove('active');
                        mainNav.classList.remove('active');
                    }

                    // Close all dropdowns
                    document.querySelectorAll('.nav-item.has-dropdown').forEach(function(item) {
                        item.classList.remove('open');
                    });
                }
            }, 250);
        });
    }

    /**
     * Initialize All Features
     */
    function init() {
        initMobileMenu();
        initDropdowns();
        initIngredientCheckboxes();
        initSmoothScroll();
        initSearchForm();
        initLazyLoad();
        initPrintButton();
        initResizeHandler();

        console.log('BBQ Recipes: JavaScript initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
