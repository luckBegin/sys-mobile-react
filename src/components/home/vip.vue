<template>
	<div>
		<div class="header-wrapper">
			<img :src="data.typeInfo.cover" alt="">
			<div class="cardNumber">卡号: {{ data.vipInfo.cardNumber }}</div>
			<div class="qrCode">
				<img :src="qrSrc">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {SesssionStorageService} from "@/service/storage";
	import {UserService} from "@/service/user/user.service";
	import {RESPONSE} from "@/service/httpClient";
	import {filter, map} from 'rxjs/operators';

	@Component
	export default class VipInfo extends Vue {
		private data: any = {};
		private qrSrc:string = '' ;
		private created(): void {
			this.data = SesssionStorageService.get('userInfo');
			this.getVipQrCode()
		}

		private getVipQrCode(): void{
			UserService.vipQrCode()
				.pipe(
					filter( ( res:RESPONSE ) => res.success ) ,
					map( ( res:RESPONSE ) => res.data )
				)
				.subscribe( ( data:string ) => this.qrSrc = data ) ;
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header-wrapper {
		width: 100%;
		height: 230px;
		position: relative;
	}

	.header-wrapper > img ,
	.qrCode > img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.cardNumber {
		position: absolute;
		top: 10%;
		left: 10%;
		background: rgba(0, 0, 0, 0.6);;
		padding: 5px 10px;
		border-radius: 5px;
		color: #fff;
	}

	.qrCode {
		width: 100px;
		height: 100px;
		padding: 5px;
		background: rgba(0, 0, 0, 0.6);;
		position: absolute;
		bottom: 20px;
		right: 20px;
		border-radius: 5px;
	}
</style>
