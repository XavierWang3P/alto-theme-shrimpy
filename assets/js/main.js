function initNavigation() {
    var burger = document.querySelector('.gh-burger');

    if (burger) {
        burger.addEventListener('click', function () {
            document.body.classList.toggle('is-head-open');
        });
    }

    var mediaQuery = window.matchMedia('(max-width: 767px)');
    var menu = document.querySelector('.gh-head-menu');
    var nav = menu && menu.querySelector('.nav');

    if (!nav) {
        return;
    }

    var logoImage = document.querySelector('.gh-head-logo img');
    var navHTML = nav.innerHTML;
    var resizeTimer;
    var outsideClickHandler;

    function makeDropdown() {
        if (mediaQuery.matches) {
            nav.querySelectorAll('li').forEach(function (item, index) {
                item.style.transitionDelay = 0.03 * (index + 1) + 's';
            });
            document.body.classList.add('is-dropdown-loaded');
            return;
        }

        var submenuItems = [];

        while (nav.offsetWidth + 64 > menu.offsetWidth && nav.lastElementChild) {
            submenuItems.unshift(nav.lastElementChild);
            nav.lastElementChild.remove();
        }

        if (submenuItems.length) {
            var toggle = document.createElement('button');
            var wrapper = document.createElement('div');

            toggle.className = 'nav-more-toggle gh-icon-btn';
            toggle.type = 'button';
            toggle.setAttribute('aria-label', document.body.dataset.moreLabel || 'More');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M21.333 16c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667-1.194 2.667-2.667 2.667S21.333 17.473 21.333 16zm-8 0c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667-1.194 2.667-2.667 2.667S13.333 17.473 13.333 16zm-8 0c0-1.473 1.194-2.667 2.667-2.667S10.667 14.527 10.667 16 9.473 18.667 8 18.667 5.333 17.473 5.333 16z"></path></svg>';
            wrapper.className = 'gh-dropdown';

            if (submenuItems.length >= 10) {
                document.body.classList.add('is-dropdown-mega');
                wrapper.style.gridTemplateRows = 'repeat(' + Math.ceil(submenuItems.length / 2) + ', 1fr)';
            }

            submenuItems.forEach(function (item) {
                wrapper.appendChild(item);
            });

            toggle.appendChild(wrapper);
            nav.appendChild(toggle);

            toggle.addEventListener('click', function (event) {
                event.stopPropagation();
                var isOpen = document.body.classList.toggle('is-dropdown-open');
                toggle.setAttribute('aria-expanded', String(isOpen));
            });

            outsideClickHandler = function () {
                document.body.classList.remove('is-dropdown-open');
                toggle.setAttribute('aria-expanded', 'false');
            };
            window.addEventListener('click', outsideClickHandler);
        }

        document.body.classList.add('is-dropdown-loaded');
    }

    function resetDropdown() {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () {
            if (outsideClickHandler) {
                window.removeEventListener('click', outsideClickHandler);
                outsideClickHandler = null;
            }
            document.body.classList.remove('is-dropdown-open', 'is-dropdown-mega');
            nav.innerHTML = navHTML;
            makeDropdown();
        }, 80);
    }

    if (!logoImage || logoImage.complete) {
        makeDropdown();
    } else {
        logoImage.addEventListener('load', makeDropdown, {once: true});
        logoImage.addEventListener('error', makeDropdown, {once: true});
    }

    window.addEventListener('resize', resetDropdown);
}

function initThemeToggle() {
    var toggles = document.querySelectorAll('[data-theme-toggle]');

    if (!toggles.length) {
        return;
    }

    var storageKey = 'alto-theme';
    var root = document.documentElement;
    var systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

    function getStoredTheme() {
        try {
            return localStorage.getItem(storageKey);
        } catch (error) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {}
    }

    function updateToggleState() {
        var isDark = root.classList.contains('dark-mode');

        toggles.forEach(function (toggle) {
            toggle.setAttribute('aria-pressed', String(isDark));
        });
    }

    function setTheme(theme, shouldStore) {
        root.classList.toggle('dark-mode', theme === 'dark');

        if (shouldStore) {
            setStoredTheme(theme);
        }

        updateToggleState();
    }

    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            setTheme(root.classList.contains('dark-mode') ? 'light' : 'dark', true);
        });
    });

    systemPreference.addEventListener('change', function (event) {
        if (!getStoredTheme() && !root.classList.contains('is-default-dark')) {
            setTheme(event.matches ? 'dark' : 'light', false);
        }
    });

    updateToggleState();
}

function initFeatured() {
    var scroller = document.querySelector('[data-featured-scroll]');

    if (!scroller) {
        return;
    }

    var previous = document.querySelector('[data-featured-previous]');
    var next = document.querySelector('[data-featured-next]');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function scrollFeatured(direction) {
        scroller.scrollBy({
            left: direction * Math.max(scroller.clientWidth * 0.72, 280),
            behavior: reduceMotion.matches ? 'auto' : 'smooth'
        });
    }

    function updateControls() {
        var maximum = scroller.scrollWidth - scroller.clientWidth;

        previous.disabled = scroller.scrollLeft <= 1;
        next.disabled = scroller.scrollLeft >= maximum - 1;
    }

    previous.addEventListener('click', function () {
        scrollFeatured(-1);
    });

    next.addEventListener('click', function () {
        scrollFeatured(1);
    });

    scroller.addEventListener('scroll', updateControls, {passive: true});
    window.addEventListener('resize', updateControls);
    updateControls();
}

function initMouseButtons() {
    var buttons = document.querySelectorAll('.gh-btn, .kg-btn, .kg-product-card-button, .kg-header-card-button, .home-hero-jump, .featured-control, .gh-button-share, .pagination a');

    if (!buttons.length) {
        return;
    }

    function updatePointer(event, button) {
        var rect = button.getBoundingClientRect();

        button.style.setProperty('--button-x', event.clientX - rect.left + 'px');
        button.style.setProperty('--button-y', event.clientY - rect.top + 'px');
    }

    buttons.forEach(function (button) {
        button.addEventListener('pointerenter', function (event) {
            updatePointer(event, button);
        });

        button.addEventListener('pointermove', function (event) {
            updatePointer(event, button);
        });

        button.addEventListener('pointerleave', function () {
            button.style.removeProperty('--button-x');
            button.style.removeProperty('--button-y');
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initNavigation();
    initFeatured();
    initMouseButtons();
});
