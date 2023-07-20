<template>
	<div v-editable="blok" class="">
		<Navigation :items="headermenu" :logo="logo" />
		<StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
		<Footer :logo="logo" :footer_start="footerstart" :footer_middle="footermiddle" :footer_end="footerend" :socials="footersocial" />
	</div>
</template>

<script setup>
import Footer from '../components/organisms/footer.vue'
import Navigation from '../components/organisms/Navigation.vue'
defineProps({ blok: Object })

const storyblokApi = useStoryblokApi()
const headermenu = ref([])
const footermiddle = ref([])
const footerstart = ref([])
const footerend = ref([])
const footersocial = ref([])
const logo = ref('')

const { data } = await storyblokApi.get('cdn/stories/config', {
	version: 'draft',
	resolve_links: 'url',
	resolve_relations: ''
})
headermenu.value = data.story.content.header_menu
footerstart.value = data.story.content.footer_row_start
footermiddle.value = data.story.content.footer_row_middle
footerend.value = data.story.content.footer_row_end
footersocial.value = data.story.content.socials
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