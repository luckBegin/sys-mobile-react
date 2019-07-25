<template>
	<div>
		<div class="header-wrapper">
			<img :src="data.typeInfo.cover" alt="">
			<div class="cardNumber">卡号: {{ data.vipInfo.cardNumber }}</div>
			<div class="qrCode" @click="getVipQrCode()">
				<img :src="qrSrc">
			</div>
		</div>
		<div class="c-flex-row-start section-wrapper">
			<div class="section-item c-flex-column-center">
				<div>余额</div>
				<div>
					¥ {{ data.vipInfo.balance }}
				</div>
			</div>
			<div class="section-item c-flex-column-center">
				<div>积分</div>
				<div>
					{{ data.vipInfo.integral }}
				</div>
			</div>
			<div class="section-item c-flex-column-center">
				<div>优惠券</div>
				<div>
					1
				</div>
			</div>
			<div class="section-item c-flex-column-center">
				<div>存酒</div>
				<div>
					1
				</div>
			</div>
		</div>

		<div class="c-flex-row-start section-wrapper">
			<div class='c-flex-column-center operate'>
				<i class="el-icon-bank-card"></i>
				<span>账户充值</span>
			</div>
			<div class="c-flex-column-center operate">
				<i class="el-icon-money"></i>
				<span>扫码买单</span>
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
	.section-item{
		width: 25%;
		box-sizing: border-box;
		padding: 0 10px ;
		margin: 10px 0;
	}
	.section-item>div:nth-of-type(1){
		color:rgb(210, 0, 80) ;
		margin-bottom: 5px;
		font-size: 14px;
	}
	.section-item>div:nth-of-type(2){
		color:#e6e6e6;
		font-size: 12px;
	}

	.section-item:nth-of-type(1) ,
	.section-item:nth-of-type(2) ,
	.section-item:nth-of-type(3) {
		border-right:1px solid rgba(123, 123, 123, 0.5);
	}
	.section-wrapper{
		background: rgb(33, 44, 91) ;
		margin-bottom: 10px;
	}
	.operate{
		width: 50%;
		padding: 10px 0;
	}
	.operate i {
		font-size: 36px;
		color:#d20055
	}
	.operate span{
		font-size: 12px;
		color:#e6e6e6;
	}
</style>
