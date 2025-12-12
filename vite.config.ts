import { defineConfig } from 'vite';

export default defineConfig({
	base: '/GamePortfolio/',
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
