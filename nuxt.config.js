export default defineNuxtConfig({
	css: ["@fortawesome/fontawesome-svg-core/styles.css"],
	modules: [
		[
			"@storyblok/nuxt",
			{
				accessToken: process.env.STORYBLOK_TOKEN,
				bridge: true,
				devtools: true,
				apiOptions: {},
			},
		],
		"@nuxtjs/tailwindcss",
	],
	vite: {
		optimizeDeps: {
			exclude:['fsevents']
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/css/main.scss";',
				},
			},
		},
	},
	nitro: {
		prerender: {
			routes: ["/404.html"],
		},
	},
});
