<template>
	<div>

	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {SesssionStorageService} from "@/service/storage";

	@Component
	export default class VipInfo extends Vue {
		private data: any = {} ;
		private created(): void{
			this.data = SesssionStorageService.get('userInfo') ;
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
