<template>
	<div class="c-full-container c-container-bg">
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import {WxService} from "@/service/wx/wx.service";
	import {RESPONSE} from "@/service/httpClient";

	@Component({
		components: {
		},
	})
	export default class PerLogin extends Vue {
		private created(): void{
			const code: string = this.$route.query.code as string ;
			const menuName: string = this.$route.query.name as string ;
			this.getWxConfig( code , menuName ) ;
		}
		private getWxConfig( code: string , menuName: string ): void {
			WxService.config({ code })
				.subscribe( ( res: RESPONSE ) => {
					console.log( res ) ;
				});
		}
	}
</script>
<style scoped>
</style>
