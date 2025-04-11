# Changelog

All notable changes to this project will be documented in this file.

[v0.4.4] - 2025-04-11

### Added
- 🎉 Standalone Component Support
- six-dropzone can now be used outside of Nuxt 3, directly in Vue 3 projects.

- Exported the SixDropzone component separately.

- New entry point: `six-dropzone/vue`.

### Changed
- 📦 Updated package.json:

- Added multiple exports (module for Nuxt, component for Vue).

- 🛠️ Separated build using Vite to generate index.mjs and index.cjs.

----

## [v0.4.1] - 2025-04-09

### ✨New Features

- Improved the UI experience with dynamic background image updates that automatically refresh visual previews when content changes.
Chores

- Upgraded the package version to 0.4.1 to ensure continued system stability and performance.

---

## [v0.3.6] - 2025-04-08

### ✨ Added

- Basic drag and drop file upload

- `accept` prop to restrict file types (String | String[])

---

## [0.3.5] - 2025-04-07

### New Features

- Introduced updated file upload components with enhanced drag-and-drop support and improved image handling.
- Enhanced the playground interface with simplified URL management and additional UI slot features.
- Enhanced the file uploader to validate accepted file types, ensuring only valid files are processed.
- Added customization options with a new slot to adjust or replace icons.
- Improved component integration through streamlined exports.
- 
### Chores

- Streamlined linting configuration and updated CI/CD workflows for automated release creation.
- Upgraded project dependencies, bumped the version, and added npm authentication settings.
- 
### Tests

- Implemented an automated testing process with a new Vitest-based test suite.

### Documentation

- Added a changelog to document project updates.
- Refined formatting and layout for property and event details to improve clarity and usability.

---