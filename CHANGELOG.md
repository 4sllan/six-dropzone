# Changelog

All notable changes to this project will be documented in this file.

[v0.4.4] - 2025-04-11

## v0.4.10

[compare changes](https://github.com/4sllan/six-dropzone/compare/v0.4.9...v0.4.10)

### 🚀 Enhancements

- **config:** Add autofix workflow and update CI/release ([564f3c5](https://github.com/4sllan/six-dropzone/commit/564f3c5))

### 🩹 Fixes

- **core:** Uncomment ImageCropper.vue component ([f19aeb3](https://github.com/4sllan/six-dropzone/commit/f19aeb3))

### 💅 Refactors

- **test:** Update Vitest and TypeScript config ([97f4dbd](https://github.com/4sllan/six-dropzone/commit/97f4dbd))
- **core:** Improve ImageCropper and Dropzone modules ([1adad2b](https://github.com/4sllan/six-dropzone/commit/1adad2b))
- **core:** Update Vue components and dependencies ([169ee7f](https://github.com/4sllan/six-dropzone/commit/169ee7f))

### ❤️ Contributors

- Aslan.gama <aslan.gama@sixchains.com.br>

## v0.4.9

[compare changes](https://github.com/4sllan/six-dropzone/compare/v1.0.5...v0.4.9)

### 🚀 Enhancements

- **test:** Adiciona configuração inicial do Vitest ([99bb350](https://github.com/4sllan/six-dropzone/commit/99bb350))
- **prettier:** Adiciona configuração e ignorados do Prettier ([46f03da](https://github.com/4sllan/six-dropzone/commit/46f03da))
- **core:** Configura ESLint com formato flat e regras Nuxt ([3926491](https://github.com/4sllan/six-dropzone/commit/3926491))
- **ci/release:** Implementar fluxo de CI/CD para release ([d5e96fd](https://github.com/4sllan/six-dropzone/commit/d5e96fd))
- **test:** Adiciona testes abrangentes para dropzone e utils ([547b0fa](https://github.com/4sllan/six-dropzone/commit/547b0fa))
- **core:** Migra o projeto para PNPM e atualiza dependências ([56f3d0b](https://github.com/4sllan/six-dropzone/commit/56f3d0b))

### 🩹 Fixes

- **assets:** Move imagem checkerboard.jpg ([590f080](https://github.com/4sllan/six-dropzone/commit/590f080))

### 💅 Refactors

- **core:** Move componentes e paginas para app/ ([f5cf26d](https://github.com/4sllan/six-dropzone/commit/f5cf26d))

### ❤️ Contributors

- Aslan.gama <aslan.gama@sixchains.com.br>

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