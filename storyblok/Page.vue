<template>
	<div v-editable="blok" class="">
		<Nav></Nav>
		<StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
		<Footer></Footer>
	</div>
</template>

<script setup>
	import Footer from '../components/layout/footer.vue';
	import Nav from '../components/layout/nav.vue';

	defineProps({ blok: Object })
</script>
<style lang="scss" scoped>
* {
	font-family: Fairplay, sans-serif;
	;
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