<template>
	<div class="c-full-container">
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
		components: {},
	})
	export default class PerLogin extends Vue {
		private created(): void{
			console.log( window.location.href ) ;
		}
	}
</script>
<style scoped>
</style>
