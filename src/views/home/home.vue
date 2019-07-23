<template>
	<div class="c-full-container c-container-blue">
		<div class="tab-content">
			<div v-show = 'tabName === "home" '>
				<home-index></home-index>
			</div>
			<div v-show = 'tabName === "activity" '>
				activity
			</div>
			<div v-show = 'tabName === "online" '>
				online
			</div>
			<div v-show = 'tabName === "order" '>
				order
			</div>
			<div v-show = 'tabName === "mine" '>
				mine
			</div>
		</div>
		<div class="c-flex-row-start tab-menu">
			<div class="c-flex-column-center"
			     :class="{'tab-active': tabName === 'home' }" @click="tabSwitch('home')">
				<i class="el-icon-house icon"></i>
				首页
			</div>
			<div class="c-flex-column-center"
			     :class="{'tab-active': tabName === 'activity' }" @click="tabSwitch('activity')"
			>
				<i class="el-icon-shopping-bag-1 icon"></i>
				优惠活动
			</div>
			<div class="c-flex-column-center"
			     :class="{'tab-active': tabName === 'online' }" @click="tabSwitch('online')"
			>
				<i class="el-icon-alarm-clock icon"></i>
				线上热抢
			</div>
			<div class="c-flex-column-center"
			     :class="{'tab-active': tabName === 'order' }" @click="tabSwitch('order')"
			>
				<i class="el-icon-notebook-2 icon"></i>
				我的订单
			</div>
			<div class="c-flex-column-center"
			     :class="{'tab-active': tabName === 'mine' }" @click="tabSwitch('mine')"
			>
				<i class="el-icon-user icon"></i>
				我的会员
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
		components: {
		},
	})
	export default class Home extends Vue {
		tabPosition: string = 'bottom' ;
		tabName: string = '';
		galleryList: string[] = [] ;
		private created(): void{
			this.tabName = this.$route.query.tabName as string ;
		}

		private tabSwitch( tabName: string ): void {
			this.tabName = tabName ;
		}
	}
</script>
<style scoped>
	.tab-content{
		height: calc( 100% - 59px );
		overflow: hidden;
	}
	.tab-menu{
		height: 45px;
		padding: 8px 0 5px 0;
		border-top: 1px solid #585858;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.tab-menu>div{
		width: 20%;
		color:#e6e6e6 ;
		font-size: 12px;
		transition: color .2s ease-in;
	}
	.icon{
		font-size: 26px;
		margin-bottom: 5px;
	}
	.tab-active{
		color: #b15353 !important;
	}
	.tab-content>div{
		height: 100%;
		overflow-y: scroll;
	}
</style>
