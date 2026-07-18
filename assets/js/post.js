lightbox('.kg-image-card > .kg-image[width][height], .kg-gallery-image > img');

reframe(document.querySelectorAll([
    '.gh-content iframe[src*="youtube.com"]',
    '.gh-content iframe[src*="youtube-nocookie.com"]',
    '.gh-content iframe[src*="player.vimeo.com"]',
    '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
    '.gh-content object',
    '.gh-content embed'
].join(',')));
