export default defineNuxtConfig({
	css: ['@fortawesome/fontawesome-svg-core/styles.css', '@fortawesome/free-brands-svg-icons'],
	modules: [
		['@formkit/nuxt'],
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
    ['nuxt-mail', {
        message: [
					{ name: 'member', to: 'mail@tobiaszimmer.dev' },
					{ name: 'contact', to: 'mail@tobiaszimmer.dev' },
				],
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        },
      },
    }]
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
	build: {
		watch: ["/components/*"],
		transpile: ['@fortawesome/vue-fontawesome']
	},
	formkit: {
		configFile: './formkit.config.js',
	},
});
