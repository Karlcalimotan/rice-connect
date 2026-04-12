import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // 1. Check if the page name uses a Module prefix (e.g., "Farmer::HarvestIndex")
        if (name.includes('::')) {
            const [module, page] = name.split('::');
            // This looks inside: Modules/Farmer/resources/assets/js/Pages/HarvestIndex.tsx
            return resolvePageComponent(
                `../../Modules/${module}/resources/assets/js/Pages/${page}.tsx`,
                import.meta.glob('../../Modules/*/resources/assets/js/Pages/**/*.tsx')
            );
        }

        // 2. Default look-up for regular pages in resources/js/Pages
        return resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});