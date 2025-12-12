import { defineConfig } from 'vite';

export default defineConfig({
	base: '/GamePortfolio/',
	server: {
		open: true
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					phaser: ['phaser']
				}
			}
		}
	}
});
