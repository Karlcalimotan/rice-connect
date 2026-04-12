# Fix Vite Babel Import Error in Welcome.tsx

## Steps:
- [x] 1. Update root vite.config.js: Remove 'Modules/Farmer/resources/assets/js/app.js' from input (modules have own configs), import path and fix alias to path.resolve(__dirname, 'resources/js'), add server: { fs: { allow: ['..'] } }, place react() before laravel().
- [ ] 2. Test by running `npm run dev` - error should be gone.
- [ ] 3. If modules need integration, enable react() in module vite.config.js later.

Current progress: Step 1 completed. Ready for `npm run dev` test (step 2).
