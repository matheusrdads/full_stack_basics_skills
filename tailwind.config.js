// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
    // ... your file paths
];
export const darkMode = 'class';
export const theme = {
    extend: {
        colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
        }
    },
};
export const plugins = [];