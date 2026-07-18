# Changelog

All notable changes to this project are documented in this file.

## Unreleased

### Changed

- Refined post-card and featured-card frame labels so the capsule stays aligned to the border line in both default and hover states.
- Improved dark-mode readability for global buttons and frame labels by correcting text and icon colors.
- Increased article hero title contrast on bright feature images with a stronger overlay and text shadow treatment.

## 1.1.1 - 2026-07-18

### Changed

- Renamed the theme package to `alto-shrimpy`.
- Updated repository metadata to `XavierWang3P/alto-theme-shrimpy`.

## 1.1.0 - 2026-07-18

### Added

- Added a personalized full-width homepage hero that uses Ghost publication title, description, cover image, and accent color.
- Added a lightweight featured-post scroller powered by native JavaScript.
- Added full-screen article heroes for posts with feature images.
- Added Chinese locale coverage for package-local theme usage.
- Added source and built assets for article-page-only JavaScript in `assets/js/post.js` and `assets/built/post.min.js`.
- Added project context in `PRODUCT.md` for the personal-blog design direction.

### Changed

- Updated the theme version to `1.1.0`.
- Improved Chinese typography, phrase wrapping, line height, and mobile reading rhythm.
- Refined image presentation with rounded image corners and offset outline treatment.
- Split global JavaScript from article-page lightbox and embed behavior.
- Deferred theme scripts to reduce parser blocking.
- Added `font-display: swap` to local fonts.
- Added eager/high-priority loading for homepage and article hero images.
- Added lazy/asynchronous decoding behavior for non-critical images.
- Added `content-visibility` for non-first-screen post lists, related posts, and comments.
- Rebuilt `assets/built/` files and regenerated `dist/alto.zip`.

### Removed

- Removed jQuery from the default template.
- Removed Owl Carousel JavaScript and CSS from the theme build.

### Verified

- `pnpm test` passes with Ghost 6.x compatibility.
- `pnpm zip` builds the theme package.
- `git diff --check` passes.

## 1.0.0 - Initial release

- Original Alto Ghost theme baseline.
