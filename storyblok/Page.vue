<template>
	<div v-editable="blok" class="">
		<Navigation :items="headermenu" :logo="logo" />
		<StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
		<Footer :items="footermenu" />
	</div>
</template>

<script setup>
import Footer from '../components/organisms/footer.vue'
import Navigation from '../components/organisms/Navigation.vue'
defineProps({ blok: Object })

const storyblokApi = useStoryblokApi()
const headermenu = ref([])
const footermenu = ref([])
const logo = ref('')

const { data } = await storyblokApi.get('cdn/stories/config', {
	version: 'draft',
	resolve_links: 'url',
})



headermenu.value = data.story.content.header_menu
footermenu.value = data.story.content.footer_menu
logo.value = data.story.content.logo
</script>
<style lang="scss">
* {
	font-family: Fairplay, sans-serif;
}

section {
	&:first-of-type {
		padding-top: 0;

		&:not(.keyvisual) {
			padding-top: 10vh;

			@include desktop {
				padding-top: 30vh;
			}
		}

		@include desktop {
			padding-top: 10vh;
		}

	}

	&:last-of-type {
		padding-bottom: 10vh;

		@include desktop {
			padding-bottom: 0;
		}
	}
}
</style>