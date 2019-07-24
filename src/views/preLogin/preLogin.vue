<template>
	<div class="c-full-container c-container-bg">
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import {WxService} from "@/service/wx/wx.service";
	import {RESPONSE} from "@/service/httpClient";
	import {map} from 'rxjs/operators';
	import {SesssionStorageService} from "@/service/storage";
	import {UserService} from "@/service/user/user.service";

	@Component({
		components: {
		},
	})
	export default class PerLogin extends Vue {
		private created(): void{
			const code: string = this.$route.query.code as string ;
			const wxConfig = SesssionStorageService.get('wxConfig') ;
			if( wxConfig ) {

			} else {
				// this.getWxConfig( code , menuName ) ;
			}
			this.getUserInfo( 5 ) ;
		}
		private getWxConfig( code: string): void {
			WxService.config({ code })
				.pipe(map( ( res: RESPONSE) => res.data ))
				.subscribe( ( data: any ) => {
					SesssionStorageService.set('wxConfig' , data );
					this.getUserInfo( data.uid ) ;
				});
		}

		private getUserInfo( uid: number ): void {
			const menuName: string = this.$route.query.name as string ;
			UserService.wxLogin({ uid })
				.pipe( map( (res:RESPONSE) => res.data ))
				.subscribe( ( data: any) => {
					SesssionStorageService.set('userInfo' , data ) ;
					this.$router.push( menuName ) ;
				});
		}
	}
</script>
<style scoped>
</style>
