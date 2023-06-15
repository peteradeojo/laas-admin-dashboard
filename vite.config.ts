import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		envDir: './',
		plugins: [react()],
		define: {
			__APP_ENV__: env,
		},
		resolve: {
			alias: {
				'@': '/src',
				'@components': '/src/components',
				'@pages': '/src/pages',
				'@utils': '/src/utils',
				'@layouts': '/src/layouts',
				'@assets': '/src/assets',
				'@styles': '/src/styles',
			}
		}
	};
});
