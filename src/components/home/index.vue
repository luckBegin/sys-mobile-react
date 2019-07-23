<template>
	<div>
		<el-carousel height="220px">
			<el-carousel-item v-for=" item in galleryList " >
				<img :src="item.url" class="gallery-img">
			</el-carousel-item>
		</el-carousel>

		<div class="shopContainer" v-for=" item in shops ">
			<div class="title">
				{{ item.name }}
			</div>
			<div class="content">
				{{ item.remark }}
			</div>
			<div class="footer">
				<div class="c-flex-row-start">
					<i class="el-icon-phone-outline"></i>
					<a :href="'tel:' + item.tel">{{ item.tel }}</a>
				</div>
				<div class="c-flex-row-start" @click="location( item )">
					<i class="el-icon-location-outline"></i>
					<span>
						{{ item.address }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {ShopService} from '@/service/shop/shop.service';
	import {filter, map} from 'rxjs/operators';
	import {RESPONSE} from '@/service/httpClient';

	@Component
	export default class HomeIndex extends Vue {
		galleryList: string[] = [] ;
		shops: any[] = [] ;

		private created(): void{
			this.getGalleryAndShop() ;
		}

		private getGalleryAndShop(): void {
			ShopService.galleryAndShop()
			.pipe(
				filter( (res:RESPONSE) => {
					return res.success ;
				}),
				map( ( res: RESPONSE ) => res.data )
			)
			.subscribe( ( data: { [key: string]: any } ) => {
				this.galleryList = data.gallery ;
				this.shops = data.shopInfo ;
			})
		}

		private location( $event: any): void{
			window.location.href = `http://3gimg.qq.com/lightmap/v1/wxmarker/index.html?marker=coord:${$event.lng},${$event.lat}`;
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.gallery-img{
		height: 220px;
		width: 100%;
		display: block;
	}
	.shopContainer{
		width: 90%;
		margin: 20px 5% 20px 5% ;
		background: -webkit-gradient(linear,65% 0%, 0% 100%, from(#4e205b), to(#011563));
		-webkit-box-shadow: 4px 4px 12px #333333;
		box-shadow: 4px 4px 12px #333333;
		border-radius: 10px;
		color:#fdfdfc
	}
	.title{
		border-bottom: 1px solid rgba(204, 204, 204, 0.24);
		padding: 10px 20px;
		font-size: 15px;
		font-weight: bold;
	}
	.content{
		font-size: 13px;
		padding:10px 20px ;
	}
	.footer{
		padding:10px 20px 5px 20px;
		font-size: 13px;
	}
	.footer i{
		font-size: 20px;
		margin-right: 14px;
	}
	.footer a {
		color:#fdfdfc ;
		text-decoration: none ;
	}
	.footer>div{
		margin-bottom: 15px;
	}
</style>
